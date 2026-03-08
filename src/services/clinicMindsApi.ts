/**
 * ClinicMinds Booking Integration
 * 
 * This service integrates with ClinicMinds online booking system
 * Endpoint: https://schedule.clinicminds.com/
 * 
 * Features:
 * - Fetch services from ClinicMinds API
 * - Check real-time availability
 * - Create bookings through their system
 * - Embedded widget alternative with custom styling
 */

const CLINICMINDS_CONFIG = {
  baseUrl: 'https://schedule.clinicminds.com',
  clinicId: import.meta.env.VITE_CLINICMINDS_CLINIC_ID || '',
  locale: import.meta.env.VITE_CLINICMINDS_LOCALE || 'nl-NL',
  currency: 'EUR',
};

// ============================================
// TYPES
// ============================================

export interface ClinicMindsService {
  id: string;
  name: string;
  description?: string;
  duration: number; // in minutes
  price: number;
  currency: string;
  category?: string;
  requiresConsultation?: boolean;
  imageUrl?: string;
  color?: string;
}

export interface ClinicMindsAvailability {
  date: string;
  available: boolean;
  slots: {
    time: string;
    available: boolean;
    practitioners?: string[];
  }[];
}

export interface ClinicMindsPractitioner {
  id: string;
  name: string;
  title?: string;
  imageUrl?: string;
  bio?: string;
}

export interface BookingRequest {
  serviceId: string;
  date: string;
  time: string;
  practitionerId?: string;
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes?: string;
  };
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
  confirmationUrl?: string;
  error?: string;
}

// ============================================
// MOCK DATA (Based on Injection Queen's actual services)
// In production, these would come from the ClinicMinds API
// ============================================

export const MOCK_SERVICES: ClinicMindsService[] = [
  // Consultation
  { 
    id: 'consult-free', 
    name: 'Gratis Consultatie', 
    description: 'Vrijblijvend adviesgesprek om je wensen te bespreken',
    duration: 30, 
    price: 0, 
    currency: 'EUR',
    category: 'consultatie',
    color: '#10b981'
  },
  
  // Botox
  { 
    id: 'botox-zone1', 
    name: 'Botox - 1 Zone', 
    description: 'Voorhoofd, fronsrimpels of kraaienpootjes',
    duration: 20, 
    price: 119, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  { 
    id: 'botox-zone2', 
    name: 'Botox - 2 Zones', 
    description: 'Combinatie van 2 zones',
    duration: 30, 
    price: 179, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  { 
    id: 'botox-zone3', 
    name: 'Botox - 3 Zones', 
    description: 'Voorhoofd, frons en kraaienpootjes',
    duration: 45, 
    price: 269, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  { 
    id: 'botox-lipflip', 
    name: 'Lipflip', 
    description: 'Subtiele lipverfijning met Botox',
    duration: 15, 
    price: 79, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  { 
    id: 'botox-gummy', 
    name: 'Gummy Smile', 
    description: 'Minder tandvlees zichtbaar bij lachen',
    duration: 15, 
    price: 69, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  { 
    id: 'botox-chin', 
    name: 'Kin (putjes)', 
    description: 'Verminderen van putjes in kin',
    duration: 15, 
    price: 69, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  { 
    id: 'botox-slimming', 
    name: 'Face Slimming', 
    description: 'Slanker gelaat door masseter spieren',
    duration: 30, 
    price: 249, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  { 
    id: 'botox-traptox', 
    name: 'Traptox', 
    description: 'Schouders ontspannen (Barbie Botox)',
    duration: 45, 
    price: 299, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  { 
    id: 'botox-sweat', 
    name: 'Overmatig Transpireren', 
    description: 'Tegen overmatig zweten (oksels of handen)',
    duration: 30, 
    price: 319, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  { 
    id: 'botox-migraine', 
    name: 'Migraine Behandeling', 
    description: 'Botox tegen migraine en hoofdpijn',
    duration: 30, 
    price: 299, 
    currency: 'EUR',
    category: 'botox',
    color: '#c9a961'
  },
  
  // Fillers
  { 
    id: 'filler-lips-05', 
    name: 'Lipfillers 0.5ml', 
    description: 'Natuurlijk volle lippen',
    duration: 30, 
    price: 249, 
    currency: 'EUR',
    category: 'fillers',
    requiresConsultation: true,
    color: '#ec4899'
  },
  { 
    id: 'filler-lips-1', 
    name: 'Lipfillers 1.0ml', 
    description: 'Volle, zachte lippen',
    duration: 45, 
    price: 349, 
    currency: 'EUR',
    category: 'fillers',
    requiresConsultation: true,
    color: '#ec4899'
  },
  { 
    id: 'filler-chin', 
    name: 'Kin Filler', 
    description: 'Definieerde kin voor mooi profiel',
    duration: 45, 
    price: 299, 
    currency: 'EUR',
    category: 'fillers',
    requiresConsultation: true,
    color: '#ec4899'
  },
  { 
    id: 'filler-cheeks', 
    name: 'Jukbeenderen', 
    description: 'Hogere jukbeenderen',
    duration: 45, 
    price: 399, 
    currency: 'EUR',
    category: 'fillers',
    requiresConsultation: true,
    color: '#ec4899'
  },
  { 
    id: 'filler-jawline', 
    name: 'Kaaklijn', 
    description: 'Definieerde kaaklijn',
    duration: 60, 
    price: 599, 
    currency: 'EUR',
    category: 'fillers',
    requiresConsultation: true,
    color: '#ec4899'
  },
  { 
    id: 'filler-tear', 
    name: 'Traangoot', 
    description: 'Minder wallen onder ogen',
    duration: 45, 
    price: 349, 
    currency: 'EUR',
    category: 'fillers',
    requiresConsultation: true,
    color: '#ec4899'
  },
  { 
    id: 'filler-nasolabial', 
    name: 'Neuslippenplooi', 
    description: 'Minder diepe plooien',
    duration: 30, 
    price: 249, 
    currency: 'EUR',
    category: 'fillers',
    requiresConsultation: true,
    color: '#ec4899'
  },
  
  // Skin Treatments
  { 
    id: 'skin-boosters', 
    name: 'Skinboosters', 
    description: 'Hydratatie boost voor de huid',
    duration: 45, 
    price: 199, 
    currency: 'EUR',
    category: 'skin',
    color: '#8b5cf6'
  },
  { 
    id: 'skin-morpheus', 
    name: 'Morpheus8', 
    description: 'Huidverjonging met microneedling + RF',
    duration: 60, 
    price: 299, 
    currency: 'EUR',
    category: 'skin',
    color: '#8b5cf6'
  },
  { 
    id: 'skin-fat-dissolve', 
    name: 'Fat Dissolving', 
    description: 'Vet verminderen onder kin/wangen',
    duration: 45, 
    price: 149, 
    currency: 'EUR',
    category: 'skin',
    color: '#8b5cf6'
  },
];

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Fetch services from ClinicMinds
 * In production, this would call their actual API
 */
export async function fetchServices(): Promise<ClinicMindsService[]> {
  // In production:
  // const response = await fetch(
  //   `${CLINICMINDS_CONFIG.baseUrl}/services?clinic=${CLINICMINDS_CONFIG.clinicId}&l=${CLINICMINDS_CONFIG.locale}`
  // );
  // return response.json();
  
  // For now, return mock data
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_SERVICES;
}

/**
 * Fetch available time slots for a specific date
 */
export async function fetchAvailability(
  date: string,
  _serviceId: string
): Promise<ClinicMindsAvailability> {
  // In production:
  // const response = await fetch(
  //   `${CLINICMINDS_CONFIG.baseUrl}/availability?clinic=${CLINICMINDS_CONFIG.clinicId}&date=${date}&service=${serviceId}&l=${CLINICMINDS_CONFIG.locale}`
  // );
  // return response.json();
  
  // Generate realistic availability
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const dateObj = new Date(date);
  const day = dateObj.getDay();
  
  // Closed on Sundays
  if (day === 0) {
    return { date, available: false, slots: [] };
  }
  
  const isWeekend = day === 6;
  const openHour = isWeekend ? 9 : 8;
  const closeHour = isWeekend ? 17 : 16;
  
  const slots: ClinicMindsAvailability['slots'] = [];
  
  for (let hour = openHour; hour < closeHour; hour++) {
    for (let min = 0; min < 60; min += 15) {
      // Skip lunch break
      if (hour === 12) continue;
      
      const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      
      // Randomly make some slots unavailable
      const isBooked = Math.random() < 0.3;
      
      slots.push({
        time,
        available: !isBooked,
        practitioners: isBooked ? [] : ['Zainab Haidari'],
      });
    }
  }
  
  return {
    date,
    available: true,
    slots,
  };
}

/**
 * Create a booking in ClinicMinds
 */
export async function createBooking(
  _request: BookingRequest
): Promise<BookingResponse> {
  // In production:
  // const response = await fetch(
  //   `${CLINICMINDS_CONFIG.baseUrl}/bookings?clinic=${CLINICMINDS_CONFIG.clinicId}`,
  //   {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(request),
  //   }
  // );
  // return response.json();
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate random failures (5% chance)
  if (Math.random() < 0.05) {
    return {
      success: false,
      message: 'Time slot no longer available',
      error: 'CONFLICT',
    };
  }
  
  return {
    success: true,
    bookingId: `BK${Date.now()}`,
    message: 'Booking confirmed',
    confirmationUrl: `${CLINICMINDS_CONFIG.baseUrl}/confirmation/${Date.now()}`,
  };
}

/**
 * Get the direct ClinicMinds booking URL
 */
export function getClinicMindsBookingUrl(serviceId?: string): string {
  let url = `${CLINICMINDS_CONFIG.baseUrl}/?clinic=${CLINICMINDS_CONFIG.clinicId}&l=${CLINICMINDS_CONFIG.locale}`;
  if (serviceId) {
    url += `&service=${serviceId}`;
  }
  return url;
}

/**
 * Generate WhatsApp fallback message
 */
export function generateWhatsAppBooking(
  service: ClinicMindsService,
  date: string,
  time: string,
  patientName: string
): string {
  const message = encodeURIComponent(
    `Hallo Injection Queen!%0A%0A` +
    `Ik wil graag een afspraak maken via jullie website:%0A%0A` +
    `• Naam: ${patientName}%0A` +
    `• Behandeling: ${service.name}%0A` +
    `• Datum: ${date}%0A` +
    `• Tijd: ${time}%0A` +
    `• Prijs: ${formatPrice(service.price)}%0A` +
    `• Duur: ${service.duration} min%0A` +
    `%0AKunnen jullie deze bevestigen?`
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

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'consultatie': 'Consultatie',
    'botox': 'Botox',
    'fillers': 'Fillers',
    'skin': 'Huid',
    'other': 'Overige',
  };
  return labels[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'consultatie': '#10b981',
    'botox': '#c9a961',
    'fillers': '#ec4899',
    'skin': '#8b5cf6',
    'other': '#6b7280',
  };
  return colors[category] || '#6b7280';
}
