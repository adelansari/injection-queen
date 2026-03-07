/**
 * Advanced Booking Service
 * 
 * Features:
 * - Real-time availability checking
 * - Dynamic pricing calculator
 * - Service catalog with prices
 * - Time slot management
 */

import { submitBooking as submitBookingApi, submitContact as submitContactApi } from './bookingApi';

// ============================================
// SERVICE CATALOG WITH PRICING
// ============================================

export interface Service {
  id: string;
  name: string;
  nameEn: string;
  category: 'botox' | 'fillers' | 'skin' | 'other';
  price: number;
  duration: number; // in minutes
  description: string;
  popular?: boolean;
}

export const SERVICES: Service[] = [
  // Botox Treatments
  { id: 'brotox', name: 'Brotox', nameEn: 'Brotox', category: 'botox', price: 20, duration: 15, description: 'Botox voor mannen' },
  { id: 'botox-bunnylines', name: 'Bunnylines', nameEn: 'Bunny Lines', category: 'botox', price: 69, duration: 15, description: 'Rimpels op neus' },
  { id: 'botox-chin', name: 'Kin/putjes Botox', nameEn: 'Chin Botox', category: 'botox', price: 69, duration: 15, description: 'Verminderen putjes' },
  { id: 'botox-gummy', name: 'Gummysmile', nameEn: 'Gummy Smile', category: 'botox', price: 69, duration: 15, description: 'Minder tandvlees zichtbaar' },
  { id: 'botox-mouth', name: 'Mondhoeken', nameEn: 'Mouth Corners', category: 'botox', price: 69, duration: 15, description: 'Vrolijkere uitstraling' },
  { id: 'botox-nose', name: 'Neuspuntlift', nameEn: 'Nose Tip Lift', category: 'botox', price: 69, duration: 15, description: 'Neuspunt lifting' },
  { id: 'botox-lipflip', name: 'Lipflip', nameEn: 'Lip Flip', category: 'botox', price: 79, duration: 15, description: 'Subtiele lipverfijning' },
  { id: 'botox-brow', name: 'Browlift', nameEn: 'Brow Lift', category: 'botox', price: 119, duration: 20, description: 'Open blik' },
  { id: 'botox-frown', name: 'Frons', nameEn: 'Frown Lines', category: 'botox', price: 119, duration: 20, description: 'Fronsrimpels' },
  { id: 'botox-crows', name: 'Kraaienpootjes', nameEn: "Crow's Feet", category: 'botox', price: 119, duration: 20, description: 'Jeugdige oogopslag', popular: true },
  { id: 'botox-forehead', name: 'Voorhoofd', nameEn: 'Forehead', category: 'botox', price: 119, duration: 20, description: 'Voorhoofdrimpels', popular: true },
  { id: 'botox-forehead-frown', name: 'Botox Frons en voorhoofd', nameEn: 'Frown & Forehead', category: 'botox', price: 179, duration: 30, description: 'Combinatie behandeling' },
  { id: 'botox-slimming', name: 'Faceslimming/Tandenknarsen', nameEn: 'Face Slimming', category: 'botox', price: 249, duration: 30, description: 'Slanker gelaat' },
  { id: 'botox-3zones', name: 'Botox 3 zones', nameEn: 'Botox 3 Zones', category: 'botox', price: 269, duration: 45, description: 'Voorhoofd, frons, kraaienpootjes', popular: true },
  { id: 'botox-sweat-armpits', name: 'Overmatig transpireren oksels', nameEn: 'Hyperhidrosis Armpits', category: 'botox', price: 319, duration: 30, description: 'Tegen overmatig zweten' },
  { id: 'botox-sweat-hands', name: 'Overmatig transpireren handen', nameEn: 'Hyperhidrosis Hands', category: 'botox', price: 349, duration: 30, description: 'Tegen overmatig zweten handen' },
  { id: 'botox-jawline', name: 'Kaaklijn Botox', nameEn: 'Jawline Botox', category: 'botox', price: 179, duration: 30, description: 'Definieerde kaaklijn' },
  { id: 'botox-nose-wings', name: 'Neusvleugels', nameEn: 'Nose Wings', category: 'botox', price: 69, duration: 15, description: 'Neusvleugels' },
  { id: 'botox-migraine', name: 'Hoofdpijn/Migraine Botox', nameEn: 'Migraine Botox', category: 'botox', price: 119, duration: 30, description: 'Tegen migraine', popular: true },
  { id: 'botox-jelly-eyes', name: 'Jelly Eyes', nameEn: 'Jelly Eyes', category: 'botox', price: 69, duration: 15, description: 'Oogverfraaiing' },
  { id: 'botox-traptox', name: 'Schouderpijn/Barbie Botox/Traptox', nameEn: 'Traptox', category: 'botox', price: 299, duration: 45, description: 'Schouders ontspannen', popular: true },
  
  // Fillers
  { id: 'filler-lips-05', name: 'Lippen (0.5ml)', nameEn: 'Lips (0.5ml)', category: 'fillers', price: 249, duration: 30, description: 'Natuurlijk volle lippen' },
  { id: 'filler-lips-1', name: 'Lippen (1ml)', nameEn: 'Lips (1ml)', category: 'fillers', price: 349, duration: 45, description: 'Volle lippen', popular: true },
  { id: 'filler-chin', name: 'Kin', nameEn: 'Chin', category: 'fillers', price: 299, duration: 45, description: 'Harmonie in gelaat', popular: true },
  { id: 'filler-cheeks', name: 'Jukbeenderen', nameEn: 'Cheeks', category: 'fillers', price: 399, duration: 45, description: 'Hogere jukbeenderen' },
  { id: 'filler-jawline', name: 'Kaaklijn', nameEn: 'Jawline', category: 'fillers', price: 599, duration: 60, description: 'Definieerde kaaklijn', popular: true },
  { id: 'filler-tear-trough', name: 'Traangoot', nameEn: 'Tear Trough', category: 'fillers', price: 349, duration: 45, description: 'Minder wallen' },
  { id: 'filler-mouth', name: 'Mondhoeken', nameEn: 'Mouth Corners', category: 'fillers', price: 249, duration: 30, description: 'Vrolijkere uitstraling' },
  { id: 'filler-nasolabial', name: 'Neuslippenplooi', nameEn: 'Nasolabial Folds', category: 'fillers', price: 249, duration: 30, description: 'Minder diepe plooien' },
  
  // Other
  { id: 'skinboosters', name: 'Skinboosters', nameEn: 'Skinboosters', category: 'skin', price: 199, duration: 45, description: 'Hydratatie boost' },
  { id: 'morpheus8', name: 'Morpheus8', nameEn: 'Morpheus8', category: 'skin', price: 299, duration: 60, description: 'Huidverjonging' },
  { id: 'fat-dissolve', name: 'Fat dissolving', nameEn: 'Fat Dissolving', category: 'other', price: 149, duration: 45, description: 'Vet verminderen' },
  { id: 'consult', name: 'Gratis consult', nameEn: 'Free Consultation', category: 'other', price: 0, duration: 30, description: 'Vrijblijvend adviesgesprek' },
];

// ============================================
// PRICING UTILITIES
// ============================================

export interface BookingItem {
  serviceId: string;
  quantity?: number;
  addons?: string[];
}

export interface BookingEstimate {
  items: { service: Service; quantity: number; subtotal: number }[];
  total: number;
  totalDuration: number;
  discount?: number;
}

export function calculateEstimate(itemIds: string[]): BookingEstimate {
  const items: BookingEstimate['items'] = [];
  let total = 0;
  let totalDuration = 0;
  
  // Count occurrences
  const serviceCounts = itemIds.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  for (const [serviceId, quantity] of Object.entries(serviceCounts)) {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) continue;
    
    const subtotal = service.price * quantity;
    items.push({ service, quantity, subtotal });
    total += subtotal;
    totalDuration += service.duration * quantity;
  }
  
  // Apply combo discounts
  let discount = 0;
  const hasBotox = items.some(i => i.service.category === 'botox');
  const hasFillers = items.some(i => i.service.category === 'fillers');
  
  if (hasBotox && hasFillers) {
    discount = total * 0.1; // 10% off for combo
  }
  
  // 3+ zones botox discount
  const botoxZones = items
    .filter(i => i.service.category === 'botox')
    .reduce((sum, i) => sum + i.quantity, 0);
  
  if (botoxZones >= 3) {
    discount = Math.max(discount, total * 0.15); // 15% off for 3+ zones
  }
  
  return {
    items,
    total: total - discount,
    totalDuration,
    discount: discount > 0 ? discount : undefined,
  };
}

export function formatPrice(price: number): string {
  if (price === 0) return 'Gratis';
  return `€${price.toFixed(2).replace('.', ',')}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}u ${mins}m` : `${hours}u`;
}

// ============================================
// AVAILABILITY & TIME SLOTS
// ============================================

export interface TimeSlot {
  time: string;
  available: boolean;
  reason?: string; // e.g., 'Booked', 'Lunch break', 'Outside hours'
}

export interface DayAvailability {
  date: string;
  isOpen: boolean;
  slots: TimeSlot[];
}

// Business hours
const OPENING_HOURS = {
  weekday: { open: '08:00', close: '16:00' },
  weekend: { open: '09:00', close: '17:00' },
};

// Lunch break
const LUNCH_BREAK = { start: '12:00', end: '13:00' };

// Generate all possible time slots
function generateAllTimeSlots(date: Date): string[] {
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const hours = isWeekend ? OPENING_HOURS.weekend : OPENING_HOURS.weekday;
  
  const slots: string[] = [];
  const [openHour, openMin] = hours.open.split(':').map(Number);
  const [closeHour, closeMin] = hours.close.split(':').map(Number);
  const [lunchStartHour, lunchStartMin] = LUNCH_BREAK.start.split(':').map(Number);
  const [lunchEndHour, lunchEndMin] = LUNCH_BREAK.end.split(':').map(Number);
  
  let current = new Date(date);
  current.setHours(openHour, openMin, 0, 0);
  
  const end = new Date(date);
  end.setHours(closeHour, closeMin, 0, 0);
  
  const lunchStart = new Date(date);
  lunchStart.setHours(lunchStartHour, lunchStartMin, 0, 0);
  
  const lunchEnd = new Date(date);
  lunchEnd.setHours(lunchEndHour, lunchEndMin, 0, 0);
  
  while (current < end) {
    // Skip lunch break
    if (current >= lunchStart && current < lunchEnd) {
      current.setMinutes(current.getMinutes() + 15);
      continue;
    }
    
    const timeStr = current.toTimeString().slice(0, 5);
    slots.push(timeStr);
    current.setMinutes(current.getMinutes() + 15);
  }
  
  return slots;
}

// Mock booked slots (in real app, fetch from API)
const MOCK_BOOKED_SLOTS: Record<string, string[]> = {
  // '2025-03-15': ['09:00', '09:15', '10:30', '11:00', '14:00', '14:30'],
};

export async function fetchAvailability(date: string): Promise<DayAvailability> {
  // In production: const response = await fetch(`${API_URL}/api/availability?date=${date}`);
  
  // For now, simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const dateObj = new Date(date);
  const day = dateObj.getDay();
  
  // Closed on Sundays (0)
  if (day === 0) {
    return {
      date,
      isOpen: false,
      slots: [],
    };
  }
  
  const allSlots = generateAllTimeSlots(dateObj);
  const bookedSlots = MOCK_BOOKED_SLOTS[date] || [];
  
  // Randomly mark some slots as booked for demo
  const demoBooked = new Set<string>();
  if (!MOCK_BOOKED_SLOTS[date]) {
    // Simulate some bookings
    allSlots.forEach((slot, index) => {
      if (index % 7 === 0 || index % 11 === 0) {
        demoBooked.add(slot);
      }
    });
  }
  
  const slots: TimeSlot[] = allSlots.map(time => {
    const isBooked = bookedSlots.includes(time) || demoBooked.has(time);
    return {
      time,
      available: !isBooked,
      reason: isBooked ? 'Bezet' : undefined,
    };
  });
  
  return {
    date,
    isOpen: true,
    slots,
  };
}

export function checkTimeFitsAvailability(
  time: string,
  duration: number,
  availability: DayAvailability
): boolean {
  if (!availability.isOpen) return false;
  
  const [hour, min] = time.split(':').map(Number);
  const startMinutes = hour * 60 + min;
  const endMinutes = startMinutes + duration;
  
  // Check each 15-min block
  for (let m = startMinutes; m < endMinutes; m += 15) {
    const h = Math.floor(m / 60);
    const mn = m % 60;
    const timeStr = `${h.toString().padStart(2, '0')}:${mn.toString().padStart(2, '0')}`;
    
    const slot = availability.slots.find(s => s.time === timeStr);
    if (!slot || !slot.available) {
      return false;
    }
  }
  
  return true;
}

// ============================================
// BOOKING SUBMISSION
// ============================================

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  services: string[]; // service IDs
  date: string;
  time: string;
  notes?: string;
}

export async function createBooking(request: BookingRequest) {
  // Verify availability first
  const availability = await fetchAvailability(request.date);
  
  // Calculate total duration
  const estimate = calculateEstimate(request.services);
  
  const fits = checkTimeFitsAvailability(
    request.time,
    estimate.totalDuration,
    availability
  );
  
  if (!fits) {
    throw new Error('Selected time is no longer available. Please choose another time.');
  }
  
  // Format services for submission
  const serviceNames = request.services.map(id => {
    const service = SERVICES.find(s => s.id === id);
    return service ? service.name : id;
  }).join(', ');
  
  // Submit to backend
  const result = await submitBookingApi({
    name: request.name,
    email: request.email,
    phone: request.phone,
    treatment: serviceNames,
    date: request.date,
    time: request.time,
    message: request.notes || `Services: ${serviceNames}\nTotal: ${formatPrice(estimate.total)}\nDuration: ${formatDuration(estimate.totalDuration)}`,
  });
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to create booking');
  }
  
  return {
    ...result,
    estimate,
  };
}

// ============================================
// EXPORT RE-EXPORTS
// ============================================
export { submitContactApi as submitContact };
