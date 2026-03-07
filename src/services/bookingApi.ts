/**
 * Booking API Service
 * 
 * This service handles booking form submissions.
 * Configure the endpoint below to match your backend.
 * 
 * Supported backend options:
 * 1. EmailJS - For sending emails directly from frontend
 * 2. Formspree/FormSubmit - Form handling services
 * 3. Custom API - Your own backend endpoint
 * 4. WhatsApp API - Direct to WhatsApp Business
 */

// ============================================
// CONFIGURATION - Update these values
// ============================================

// Option 1: Custom API Endpoint (recommended for production)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.injectionqueen.nl';
const BOOKING_ENDPOINT = `${API_BASE_URL}/api/bookings`;

// Option 2: EmailJS Configuration (for email-based bookings)
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_booking',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// Option 3: WhatsApp Business API (for direct WhatsApp bookings)
const WHATSAPP_CONFIG = {
  phoneNumber: '31638604547', // Injection Queen's WhatsApp
  apiKey: import.meta.env.VITE_WHATSAPP_API_KEY || '',
};

// ============================================
// TYPES
// ============================================

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  message?: string;
  preferredContact?: 'email' | 'phone' | 'whatsapp';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  error?: string;
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Submit booking to custom API endpoint
 */
export async function submitBookingToAPI(data: BookingData): Promise<ApiResponse> {
  try {
    const response = await fetch(BOOKING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
        source: 'website',
        language: navigator.language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Booking submitted successfully',
      bookingId: result.bookingId || result.id,
    };
  } catch (error) {
    console.error('Booking API error:', error);
    return {
      success: false,
      message: 'Failed to submit booking',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Submit contact form to custom API endpoint
 */
export async function submitContactToAPI(data: ContactFormData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
        source: 'website-contact-form',
        language: navigator.language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Message sent successfully',
      bookingId: result.id,
    };
  } catch (error) {
    console.error('Contact API error:', error);
    return {
      success: false,
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Submit booking via EmailJS
 * Note: Requires @emailjs/browser package to be installed
 */
export async function submitBookingViaEmailJS(
  data: BookingData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emailjs: any
): Promise<ApiResponse> {
  try {
    if (!EMAILJS_CONFIG.publicKey) {
      throw new Error('EmailJS public key not configured');
    }

    const templateParams = {
      to_name: 'Injection Queen Team',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      treatment: data.treatment,
      date: data.date,
      time: data.time,
      message: data.message || 'Geen extra bericht',
      reply_to: data.email,
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    if (result.status === 200) {
      return {
        success: true,
        message: 'Booking request sent via email',
        bookingId: result.text,
      };
    } else {
      throw new Error('EmailJS returned non-200 status');
    }
  } catch (error) {
    console.error('EmailJS error:', error);
    return {
      success: false,
      message: 'Failed to send booking email',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate WhatsApp booking message and open WhatsApp
 */
export function openWhatsAppBooking(data: BookingData): void {
  const message = encodeURIComponent(
    `Hallo Injection Queen!%0A%0A` +
    `Ik wil graag een afspraak maken:%0A` +
    `• Naam: ${data.name}%0A` +
    `• Behandeling: ${data.treatment}%0A` +
    `• Gewenste datum: ${data.date}%0A` +
    `• Gewenste tijd: ${data.time || 'Geen voorkeur'}%0A` +
    `• Telefoon: ${data.phone}%0A` +
    `• Email: ${data.email}%0A` +
    `${data.message ? `• Bericht: ${data.message}%0A` : ''}` +
    `%0ATot snel!`
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Generate WhatsApp contact message
 */
export function openWhatsAppContact(data: ContactFormData): void {
  const message = encodeURIComponent(
    `Hallo Injection Queen!%0A%0A` +
    `Ik heb een vraag:%0A` +
    `• Naam: ${data.name}%0A` +
    `• Email: ${data.email}%0A` +
    `• Telefoon: ${data.phone}%0A` +
    `• Bericht: ${data.message}%0A` +
    `%0ATot snel!`
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Submit to Formspree (simple form handling service)
 */
export async function submitToFormspree(
  data: BookingData | ContactFormData,
  formId: string
): Promise<ApiResponse> {
  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Form submitted successfully',
      };
    } else {
      throw new Error('Formspree submission failed');
    }
  } catch (error) {
    console.error('Formspree error:', error);
    return {
      success: false,
      message: 'Failed to submit form',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================
// MAIN EXPORT FUNCTIONS
// ============================================

/**
 * Main booking submission function
 * Automatically selects the best available method
 */
export async function submitBooking(data: BookingData): Promise<ApiResponse> {
  // Priority 1: Try custom API if configured
  if (import.meta.env.VITE_API_URL) {
    return submitBookingToAPI(data);
  }

  // Priority 2: Try EmailJS if configured
  // if (EMAILJS_CONFIG.publicKey) {
  //   const emailjs = await import('@emailjs/browser');
  //   return submitBookingViaEmailJS(data, emailjs);
  // }

  // Priority 3: Fall back to WhatsApp
  openWhatsAppBooking(data);
  return {
    success: true,
    message: 'Redirecting to WhatsApp to complete booking',
  };
}

/**
 * Main contact form submission function
 */
export async function submitContact(data: ContactFormData): Promise<ApiResponse> {
  // Priority 1: Try custom API if configured
  if (import.meta.env.VITE_API_URL) {
    return submitContactToAPI(data);
  }

  // Priority 2: Fall back to WhatsApp
  openWhatsAppContact(data);
  return {
    success: true,
    message: 'Redirecting to WhatsApp',
  };
}
