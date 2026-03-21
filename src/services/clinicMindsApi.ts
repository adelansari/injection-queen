/**
 * ClinicMinds Booking Integration — Real GraphQL API
 *
 * Uses Vite proxy at /api/clinicminds to avoid CORS issues.
 * In production, configure your hosting (Vercel/Netlify) to proxy
 * /api/clinicminds/* → https://schedule.clinicminds.com/*
 *
 * Flow:
 * 1. fetchServices()            → services grouped by category
 * 2. fetchAppointmentTypes(id)  → CONSULTATION / CONSULTATION_TREATMENT / TREATMENT + fees
 * 3. fetchAvailability(...)     → real time-slot data
 */

// ============================================
// CONFIG (from .env)
// ============================================

const CM_CONFIG = {
  // In dev: Vite proxy rewrites /api/clinicminds → https://schedule.clinicminds.com
  // In production: configure your deployment to do the same proxy rewrite
  get graphqlUrl() {
    return `/api/clinicminds/graphql?l=${this.locale}`;
  },
  schedulerBaseUrl: 'https://schedule.clinicminds.com',
  bearerToken: import.meta.env.VITE_CLINICMINDS_BEARER_TOKEN || '',
  clinicUuid: import.meta.env.VITE_CLINICMINDS_CLINIC_ID || '',
  locationUuid: import.meta.env.VITE_CLINICMINDS_LOCATION_UUID || '',
  locale: import.meta.env.VITE_CLINICMINDS_LOCALE || 'nl-NL',
};

// ============================================
// TYPES
// ============================================

export interface CMService {
  id: number;
  uuid: string;
  name: string;
  group: string;
  explanation: string;
  orderPosition: number;
}

export interface CMServiceCategory {
  name: string;
  services: CMService[];
}

export type AppointmentType = 'CONSULTATION' | 'CONSULTATION_TREATMENT' | 'TREATMENT';

export interface CMAppointmentTypesResponse {
  appointmentTypes: AppointmentType[];
  consultationPrepaymentAmount: number | null;
  consultationTreatmentPrepaymentAmount: number | null;
  treatmentPrepaymentAmount: number | null;
}

export interface CMAvailabilitySlot {
  start: string; // ISO 8601
  end: string;   // ISO 8601
  preferred: boolean;
}

export interface CMLocation {
  uuid: string;
  name: string;
}

// ============================================
// GRAPHQL HELPER
// ============================================

async function gql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(CM_CONFIG.graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CM_CONFIG.bearerToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`ClinicMinds API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(`GraphQL error: ${json.errors[0].message}`);
  }

  return json.data;
}

// ============================================
// QUERIES
// ============================================

const SERVICES_QUERY = `
  query ($uuid: ID!, $userId: Int) {
    clinic(uuid: $uuid) {
      services(userId: $userId) {
        id
        uuid
        name
        group
        explanation
        orderPosition
      }
      locations {
        uuid
        name
      }
    }
  }
`;

const APPOINTMENT_TYPES_QUERY = `
  query ($clinicUuid: ID!, $serviceId: Int!, $userId: Int, $withUser: Boolean!) {
    availableAppointmentTypesForUser(serviceId: $serviceId, userId: $userId) @include(if: $withUser)
    clinic(uuid: $clinicUuid) {
      id
      service(id: $serviceId) {
        id
        name
        explanation
      }
      locations {
        uuid
        name
        service(id: $serviceId) {
          appointmentTypes
          service {
            consultationPrepaymentAmount
            consultationTreatmentPrepaymentAmount
            treatmentPrepaymentAmount
          }
          appointmentTypesNotBookable
        }
      }
      currencyCode
    }
  }
`;

const AVAILABILITY_QUERY = `
  query ($clinicUuid: ID!, $services: [SelectedServiceInput!]!, $locationUuid: ID!, $userId: Int) {
    availability: availabilityForServices(
      clinicUuid: $clinicUuid
      services: $services
      locationUuid: $locationUuid
      userId: $userId
    ) {
      start
      end
      preferred
    }
    clinic(uuid: $clinicUuid) {
      id
      timezone
    }
  }
`;

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Fetch all services from ClinicMinds, grouped by category.
 */
export async function fetchServices(): Promise<{
  categories: CMServiceCategory[];
  locations: CMLocation[];
}> {
  const data = await gql<{
    clinic: {
      services: CMService[];
      locations: CMLocation[];
    };
  }>(SERVICES_QUERY, { uuid: CM_CONFIG.clinicUuid, userId: null });

  // Group services by their "group" field
  const grouped: Record<string, CMService[]> = {};
  for (const svc of data.clinic.services) {
    const g = svc.group || 'Overig';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(svc);
  }

  // Sort services within each group by orderPosition
  const categories: CMServiceCategory[] = Object.entries(grouped).map(
    ([name, services]) => ({
      name,
      services: services.sort((a, b) => a.orderPosition - b.orderPosition),
    })
  );

  return { categories, locations: data.clinic.locations };
}

/**
 * Fetch available appointment types & prepayment fees for a specific service.
 */
export async function fetchAppointmentTypes(
  serviceId: number
): Promise<CMAppointmentTypesResponse> {
  const data = await gql<{
    clinic: {
      id: number;
      service: { id: number; name: string; explanation: string };
      locations: Array<{
        uuid: string;
        name: string;
        service: {
          appointmentTypes: AppointmentType[];
          service: {
            consultationPrepaymentAmount: number | null;
            consultationTreatmentPrepaymentAmount: number | null;
            treatmentPrepaymentAmount: number | null;
          };
          appointmentTypesNotBookable: AppointmentType[];
        };
      }>;
      currencyCode: string;
    };
  }>(APPOINTMENT_TYPES_QUERY, {
    clinicUuid: CM_CONFIG.clinicUuid,
    serviceId,
    userId: null,
    withUser: false,
  });

  // Find the location that matches (or use the first one)
  const loc = data.clinic.locations.find(l => l.uuid === CM_CONFIG.locationUuid)
    || data.clinic.locations[0];

  if (!loc?.service) {
    throw new Error('No appointment types available for this service');
  }

  // Filter out non-bookable types
  const bookableTypes = loc.service.appointmentTypes.filter(
    t => !loc.service.appointmentTypesNotBookable.includes(t)
  );

  return {
    appointmentTypes: bookableTypes,
    consultationPrepaymentAmount:
      loc.service.service.consultationPrepaymentAmount,
    consultationTreatmentPrepaymentAmount:
      loc.service.service.consultationTreatmentPrepaymentAmount,
    treatmentPrepaymentAmount:
      loc.service.service.treatmentPrepaymentAmount,
  };
}

/**
 * Fetch real-time availability for selected services at the clinic location.
 */
export async function fetchAvailability(
  services: { serviceId: number; appointmentType: AppointmentType }[],
  locationUuid?: string
): Promise<CMAvailabilitySlot[]> {
  const data = await gql<{
    availability: CMAvailabilitySlot[];
    clinic: { id: number; timezone: string };
  }>(AVAILABILITY_QUERY, {
    clinicUuid: CM_CONFIG.clinicUuid,
    services,
    locationUuid: locationUuid || CM_CONFIG.locationUuid,
    userId: null,
  });

  return data.availability;
}

// ============================================
// URL BUILDERS
// ============================================

/**
 * Build a direct ClinicMinds scheduler URL (for redirect after booking summary).
 */
export function getClinicMindsBookingUrl(serviceId?: number): string {
  let url = `${CM_CONFIG.schedulerBaseUrl}/services?clinic=${CM_CONFIG.clinicUuid}&l=${CM_CONFIG.locale}`;
  if (serviceId) {
    url += `&service=${serviceId}`;
  }
  return url;
}

/**
 * Generate WhatsApp fallback booking message.
 */
export function generateWhatsAppBooking(
  serviceName: string,
  date: string,
  time: string,
  patientName: string
): string {
  const message = encodeURIComponent(
    `Hallo Injection Queen!\n\n` +
    `Ik wil graag een afspraak maken via jullie website:\n\n` +
    `• Naam: ${patientName}\n` +
    `• Behandeling: ${serviceName}\n` +
    `• Datum: ${date}\n` +
    `• Tijd: ${time}\n` +
    `\nKunnen jullie deze bevestigen?`
  );

  return `https://wa.me/31638604547?text=${message}`;
}

// ============================================
// UTILITIES
// ============================================

export function formatPrice(price: number): string {
  if (price === 0) return 'Gratis';
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}u ${mins}m` : `${hours}u`;
}

/**
 * Get a human-readable label for an appointment type.
 */
export function getAppointmentTypeLabel(type: AppointmentType): string {
  const labels: Record<AppointmentType, string> = {
    CONSULTATION: 'Consult',
    CONSULTATION_TREATMENT: 'Consult + behandeling',
    TREATMENT: 'Behandeling',
  };
  return labels[type] || type;
}

/**
 * Get the prepayment amount for a specific appointment type.
 */
export function getPrepaymentForType(
  type: AppointmentType,
  data: CMAppointmentTypesResponse
): number | null {
  switch (type) {
    case 'CONSULTATION':
      return data.consultationPrepaymentAmount;
    case 'CONSULTATION_TREATMENT':
      return data.consultationTreatmentPrepaymentAmount;
    case 'TREATMENT':
      return data.treatmentPrepaymentAmount;
    default:
      return null;
  }
}

export { CM_CONFIG };
