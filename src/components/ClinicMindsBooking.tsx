import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, User, Mail, Phone, MessageSquare, Check, Loader2,
  ChevronLeft, ChevronRight, ExternalLink, Info,
  Sparkles, X, CreditCard, Calendar
} from 'lucide-react';
import {
  fetchServices,
  fetchAppointmentTypes,
  fetchAvailability,
  generateWhatsAppBooking,
  getClinicMindsBookingUrl,
  formatPrice,
  getAppointmentTypeLabel,
  getPrepaymentForType,
  type CMService,
  type CMServiceCategory,
  type CMAppointmentTypesResponse,
  type CMAvailabilitySlot,
  type AppointmentType,
} from '../services/clinicMindsApi';

// ============================================
// TYPES
// ============================================

type Step = 'service' | 'appointmentType' | 'datetime' | 'details' | 'confirm';

// ============================================
// COMPONENT
// ============================================

export function ClinicMindsBooking() {
  // --- Step state ---
  const [step, setStep] = useState<Step>('service');

  // --- Data state ---
  const [categories, setCategories] = useState<CMServiceCategory[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // --- Selection state ---
  const [selectedServices, setSelectedServices] = useState<CMService[]>([]);
  const [appointmentTypesData, setAppointmentTypesData] = useState<CMAppointmentTypesResponse | null>(null);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<AppointmentType | null>(null);
  const [availabilitySlots, setAvailabilitySlots] = useState<CMAvailabilitySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<CMAvailabilitySlot | null>(null);

  // --- Patient form ---
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  // --- UI state ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // LOAD SERVICES ON MOUNT
  // ============================================

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchServices();
        if (!cancelled) {
          setCategories(data.categories);
        }
      } catch {
        if (!cancelled) setError('Kon behandelingen niet laden. Probeer het later opnieuw.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ============================================
  // HANDLERS
  // ============================================

  const toggleServiceSelection = useCallback((service: CMService) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) return prev.filter(s => s.id !== service.id);
      return [...prev, service];
    });
  }, []);

  const handleServicesNext = useCallback(async () => {
    if (selectedServices.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      // Fetch appointment types for the first selected service
      const data = await fetchAppointmentTypes(selectedServices[0].id);
      setAppointmentTypesData(data);

      // If only one appointment type, auto-select it
      if (data.appointmentTypes.length === 1) {
        setSelectedAppointmentType(data.appointmentTypes[0]);
        // Skip appointment type step, go straight to availability
        await loadAvailability(data.appointmentTypes[0]);
        setStep('datetime');
      } else {
        setStep('appointmentType');
      }
    } catch {
      setError('Kon afspraaktypes niet laden.');
    } finally {
      setLoading(false);
    }
  }, [selectedServices]);

  const loadAvailability = useCallback(async (appointmentType: AppointmentType) => {
    setLoading(true);
    setError(null);
    setAvailabilitySlots([]);
    setSelectedSlot(null);
    try {
      const services = selectedServices.map(s => ({
        serviceId: s.id,
        appointmentType,
      }));
      const slots = await fetchAvailability(services);
      setAvailabilitySlots(slots);
    } catch {
      setError('Kon beschikbare tijden niet laden.');
    } finally {
      setLoading(false);
    }
  }, [selectedServices]);

  const handleAppointmentTypeSelect = useCallback(async (type: AppointmentType) => {
    setSelectedAppointmentType(type);
    await loadAvailability(type);
    setStep('datetime');
  }, [loadAvailability]);

  const handleSlotSelect = useCallback((slot: CMAvailabilitySlot) => {
    setSelectedSlot(slot);
  }, []);

  const handleDateTimeNext = useCallback(() => {
    if (selectedSlot) setStep('details');
  }, [selectedSlot]);

  const handleDetailsNext = useCallback(() => {
    if (formData.firstName && formData.lastName && formData.email) {
      setStep('confirm');
    }
  }, [formData]);

  const handleConfirmBooking = useCallback(() => {
    // Redirect to ClinicMinds for payment + final booking
    const url = getClinicMindsBookingUrl(selectedServices[0]?.id);
    window.open(url, '_blank');
  }, [selectedServices]);

  const handleWhatsAppFallback = useCallback(() => {
    if (!selectedServices.length || !selectedSlot) return;
    const slotDate = new Date(selectedSlot.start);
    const dateStr = slotDate.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const timeStr = slotDate.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    const serviceNames = selectedServices.map(s => s.name).join(', ');
    const url = generateWhatsAppBooking(serviceNames, dateStr, timeStr, `${formData.firstName} ${formData.lastName}`);
    window.open(url, '_blank');
  }, [selectedServices, selectedSlot, formData]);

  const goBack = useCallback(() => {
    if (step === 'appointmentType') {
      setStep('service');
      setAppointmentTypesData(null);
      setSelectedAppointmentType(null);
    } else if (step === 'datetime') {
      if (appointmentTypesData && appointmentTypesData.appointmentTypes.length > 1) {
        setStep('appointmentType');
      } else {
        setStep('service');
        setAppointmentTypesData(null);
        setSelectedAppointmentType(null);
      }
      setAvailabilitySlots([]);
      setSelectedSlot(null);
    } else if (step === 'details') {
      setStep('datetime');
    } else if (step === 'confirm') {
      setStep('details');
    }
  }, [step, appointmentTypesData]);

  const resetBooking = useCallback(() => {
    setStep('service');
    setSelectedServices([]);
    setAppointmentTypesData(null);
    setSelectedAppointmentType(null);
    setAvailabilitySlots([]);
    setSelectedSlot(null);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', notes: '' });
    setError(null);
  }, []);

  // ============================================
  // DERIVED DATA
  // ============================================

  // Group availability slots by date
  const slotsByDate = useMemo(() => {
    const map: Record<string, CMAvailabilitySlot[]> = {};
    for (const slot of availabilitySlots) {
      const d = new Date(slot.start);
      const key = d.toISOString().split('T')[0];
      if (!map[key]) map[key] = [];
      map[key].push(slot);
    }
    return map;
  }, [availabilitySlots]);

  const availableDates = useMemo(() => Object.keys(slotsByDate).sort(), [slotsByDate]);

  const [selectedDate, setSelectedDate] = useState<string>('');

  // Reset selected date when availability changes
  useEffect(() => {
    if (availableDates.length > 0 && !availableDates.includes(selectedDate)) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  const slotsForSelectedDate = useMemo(
    () => (selectedDate ? slotsByDate[selectedDate] || [] : []),
    [slotsByDate, selectedDate]
  );

  // Current prepayment fee
  const currentPrepayment = useMemo(() => {
    if (!selectedAppointmentType || !appointmentTypesData) return null;
    return getPrepaymentForType(selectedAppointmentType, appointmentTypesData);
  }, [selectedAppointmentType, appointmentTypesData]);

  // ============================================
  // STEP DEFINITIONS FOR PROGRESS BAR
  // ============================================

  const allSteps: Step[] = ['service', 'appointmentType', 'datetime', 'details', 'confirm'];
  const currentStepIdx = allSteps.indexOf(step);

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="w-full overflow-hidden">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-6 sm:mb-8">
        {['Behandeling', 'Type', 'Datum & Tijd', 'Gegevens', 'Bevestig'].map((label, idx) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`
                w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-colors
                ${idx === currentStepIdx ? 'bg-[#c9a961] text-white' :
                  idx < currentStepIdx ? 'bg-green-500 text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-500'}
              `}>
                {idx < currentStepIdx ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : idx + 1}
              </div>
              <span className="text-[9px] sm:text-[10px] text-gray-400 mt-1 hidden sm:block">{label}</span>
            </div>
            {idx < 4 && (
              <div className={`w-5 sm:w-12 h-0.5 mx-0.5 sm:mx-2 ${idx < currentStepIdx ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-start gap-3"
          >
            <Info className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto">
              <X className="w-4 h-4 text-red-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================= */}
      {/* STEP 1: SELECT SERVICES                   */}
      {/* ========================================= */}
      {step === 'service' && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Kies een behandeling</h3>
          <p className="text-sm sm:text-base text-gray-500 mb-6">Selecteer de behandeling(en) die je wilt boeken</p>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#c9a961]" />
            </div>
          ) : (
            <div className="space-y-3">
              {categories.map(cat => (
                <div key={cat.name} className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                  {/* Category header */}
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a2e] hover:bg-gray-100 dark:hover:bg-[#1a1a2e]/80 transition-colors"
                  >
                    <span className="font-semibold text-[#1a1a2e] dark:text-white">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{cat.services.length} behandelingen</span>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedCategory === cat.name ? 'rotate-90' : ''}`} />
                    </div>
                  </button>

                  {/* Services in category */}
                  <AnimatePresence>
                    {expandedCategory === cat.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 space-y-2">
                          {cat.services.map(service => {
                            const isSelected = selectedServices.some(s => s.id === service.id);
                            return (
                              <button
                                key={service.id}
                                onClick={() => toggleServiceSelection(service)}
                                className={`w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg text-left transition-all ${isSelected
                                    ? 'bg-[#c9a961]/10 border-2 border-[#c9a961]'
                                    : 'bg-white dark:bg-[#0f0f1a] border-2 border-gray-100 dark:border-gray-800 hover:border-[#c9a961]/50'
                                  }`}
                              >
                                {/* Checkbox */}
                                <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-[#c9a961] border-[#c9a961]' : 'border-gray-300 dark:border-gray-600'
                                  }`}>
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>

                                {/* Service info */}
                                <div className="flex-1 min-w-0 overflow-hidden">
                                  <p className="font-medium text-sm sm:text-base text-[#1a1a2e] dark:text-white break-words">{service.name}</p>
                                  {service.explanation && (
                                    <p className="text-xs text-gray-500 mt-0.5 truncate">{service.explanation}</p>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* Selected services summary */}
          {selectedServices.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              <div className="bg-[#c9a961]/10 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">Geselecteerd ({selectedServices.length})</p>
                <div className="space-y-1">
                  {selectedServices.map(s => (
                    <div key={s.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#1a1a2e] dark:text-white">{s.name}</span>
                      <button
                        onClick={() => toggleServiceSelection(s)}
                        className="text-red-400 hover:text-red-500 text-xs"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={handleServicesNext}
                disabled={loading}
                className="w-full py-3 bg-[#c9a961] text-white font-semibold rounded-xl hover:bg-[#b8944f] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5" />}
                Volgende
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ========================================= */}
      {/* STEP 2: SELECT APPOINTMENT TYPE            */}
      {/* ========================================= */}
      {step === 'appointmentType' && appointmentTypesData && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-[#c9a961] mb-4">
            <ChevronLeft className="w-4 h-4" /> Terug
          </button>

          <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Selecteer een optie</h3>
          <p className="text-gray-500 mb-6">Kies het type afspraak dat je wilt maken</p>

          <div className="space-y-3">
            {appointmentTypesData.appointmentTypes.map(type => {
              const fee = getPrepaymentForType(type, appointmentTypesData);
              return (
                <button
                  key={type}
                  onClick={() => handleAppointmentTypeSelect(type)}
                  disabled={loading}
                  className="w-full p-4 bg-white dark:bg-[#0f0f1a] border-2 border-gray-100 dark:border-gray-800 rounded-xl text-left hover:border-[#c9a961] transition-all group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-[#1a1a2e] dark:text-white group-hover:text-[#c9a961] transition-colors">
                        {getAppointmentTypeLabel(type)}
                      </h5>
                      {fee !== null && fee > 0 && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <CreditCard className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-sm text-amber-600 dark:text-amber-400">
                            Betaling vereist: {formatPrice(fee)}
                          </span>
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#c9a961]" />
                  </div>
                </button>
              );
            })}
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 mt-6 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" /> Beschikbaarheid laden...
            </div>
          )}
        </motion.div>
      )}

      {/* ========================================= */}
      {/* STEP 3: DATE & TIME SELECTION              */}
      {/* ========================================= */}
      {step === 'datetime' && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-[#c9a961] mb-4">
            <ChevronLeft className="w-4 h-4" /> Terug
          </button>

          {/* Selection summary */}
          <div className="bg-[#c9a961]/10 rounded-xl p-3 sm:p-4 mb-6">
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="text-sm text-gray-500">Behandeling</p>
                <p className="font-semibold text-[#1a1a2e] dark:text-white">
                  {selectedServices.map(s => s.name).join(' + ')}
                </p>
              </div>
              {currentPrepayment !== null && currentPrepayment > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Aanbetaling</p>
                  <p className="font-bold text-[#c9a961]">{formatPrice(currentPrepayment)}</p>
                </div>
              )}
            </div>
            {selectedAppointmentType && (
              <p className="text-xs text-gray-400 mt-1">{getAppointmentTypeLabel(selectedAppointmentType)}</p>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 inline-block mr-1 sm:mr-2 text-[#c9a961]" />
            Kies een datum & tijd
          </h3>

          {loading ? (
            <div className="flex items-center gap-2 py-8 justify-center text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" /> Beschikbare tijden laden...
            </div>
          ) : availableDates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Geen beschikbare tijden gevonden.</p>
              <p className="text-sm text-gray-400 mt-2">Probeer een ander afspraaktype of neem contact op.</p>
            </div>
          ) : (
            <>
              {/* Date scroll */}
              <div className="mb-6 -mx-1">
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
                  {availableDates.map(dateStr => {
                    const d = new Date(dateStr + 'T12:00:00');
                    const dayLabel = d.toLocaleDateString('nl-NL', { weekday: 'short' });
                    const dayNum = d.getDate();
                    const monthLabel = d.toLocaleDateString('nl-NL', { month: 'short' });
                    return (
                      <button
                        key={dateStr}
                        onClick={() => { setSelectedDate(dateStr); setSelectedSlot(null); }}
                        className={`flex-shrink-0 w-16 sm:w-20 p-2 sm:p-3 rounded-xl border-2 text-center transition-all ${selectedDate === dateStr
                            ? 'border-[#c9a961] bg-[#c9a961]/10'
                            : 'border-gray-100 dark:border-gray-800 hover:border-[#c9a961]/50'
                          }`}
                      >
                        <p className={`text-[10px] sm:text-xs ${selectedDate === dateStr ? 'text-[#c9a961]' : 'text-gray-500'}`}>
                          {dayLabel}
                        </p>
                        <p className={`text-base sm:text-lg font-bold ${selectedDate === dateStr ? 'text-[#c9a961]' : 'text-[#1a1a2e] dark:text-white'}`}>
                          {dayNum}
                        </p>
                        <p className={`text-[10px] sm:text-xs ${selectedDate === dateStr ? 'text-[#c9a961]' : 'text-gray-400'}`}>
                          {monthLabel}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDate && slotsForSelectedDate.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h4 className="font-semibold text-[#1a1a2e] dark:text-white mb-3">
                    <Clock className="w-4 h-4 inline-block mr-1 text-[#c9a961]" />
                    Beschikbare tijden
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap gap-2">
                    {slotsForSelectedDate.map(slot => {
                      const t = new Date(slot.start);
                      const timeStr = t.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
                      const isSelected = selectedSlot?.start === slot.start;
                      return (
                        <button
                          key={slot.start}
                          onClick={() => handleSlotSelect(slot)}
                          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all text-center ${isSelected
                              ? 'bg-[#c9a961] text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                          {timeStr}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </>
          )}

          <button
            onClick={handleDateTimeNext}
            disabled={!selectedSlot}
            className="w-full mt-6 py-3 bg-[#c9a961] text-white font-semibold rounded-xl disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-[#b8944f] transition-colors"
          >
            Volgende
          </button>
        </motion.div>
      )}

      {/* ========================================= */}
      {/* STEP 4: PATIENT DETAILS                    */}
      {/* ========================================= */}
      {step === 'details' && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-[#c9a961] mb-4">
            <ChevronLeft className="w-4 h-4" /> Terug
          </button>

          <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-6">Jouw gegevens</h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-1" /> Voornaam *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:outline-none"
                placeholder="Voornaam"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Achternaam *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:outline-none"
                placeholder="Achternaam"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4 inline mr-1" /> E-mail *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:outline-none"
                placeholder="je@email.nl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-1" /> Telefoon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:outline-none"
                placeholder="+31 6 12345678"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-1" /> Opmerkingen
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:outline-none resize-none"
              placeholder="Speciale wensen of vragen..."
            />
          </div>

          <button
            onClick={handleDetailsNext}
            disabled={!formData.firstName || !formData.lastName || !formData.email}
            className="w-full py-3 bg-[#c9a961] text-white font-semibold rounded-xl disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-[#b8944f] transition-colors"
          >
            Bevestig afspraak
          </button>
        </motion.div>
      )}

      {/* ========================================= */}
      {/* STEP 5: CONFIRMATION                       */}
      {/* ========================================= */}
      {step === 'confirm' && selectedSlot && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-[#c9a961] mb-4">
            <ChevronLeft className="w-4 h-4" /> Terug
          </button>

          <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-6">Controleer je afspraak</h3>

          <div className="bg-gray-50 dark:bg-[#0f0f1a] rounded-xl p-6 mb-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Behandeling</span>
              <span className="font-semibold text-[#1a1a2e] dark:text-white text-right">
                {selectedServices.map(s => s.name).join(' + ')}
              </span>
            </div>
            {selectedAppointmentType && (
              <div className="flex justify-between">
                <span className="text-gray-500">Type</span>
                <span className="font-semibold text-[#1a1a2e] dark:text-white">
                  {getAppointmentTypeLabel(selectedAppointmentType)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Datum</span>
              <span className="font-semibold text-[#1a1a2e] dark:text-white">
                {new Date(selectedSlot.start).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tijd</span>
              <span className="font-semibold text-[#1a1a2e] dark:text-white">
                {new Date(selectedSlot.start).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                {' – '}
                {new Date(selectedSlot.end).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {currentPrepayment !== null && currentPrepayment > 0 && (
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <span className="text-gray-500 flex items-center gap-1">
                  <CreditCard className="w-4 h-4" /> Aanbetaling
                </span>
                <span className="font-bold text-[#c9a961] text-xl">{formatPrice(currentPrepayment)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <span className="text-gray-500">Naam</span>
              <p className="font-semibold text-[#1a1a2e] dark:text-white">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <span className="text-gray-500">Contact</span>
              <p className="text-[#1a1a2e] dark:text-white">{formData.email}</p>
              {formData.phone && <p className="text-[#1a1a2e] dark:text-white">{formData.phone}</p>}
            </div>
          </div>

          {currentPrepayment !== null && currentPrepayment > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">Aanbetaling vereist</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    Je wordt doorgestuurd naar ClinicMinds om de aanbetaling van {formatPrice(currentPrepayment)} te voldoen en je afspraak te bevestigen.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleConfirmBooking}
              className="w-full py-4 bg-[#c9a961] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8944f] transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Boek via ClinicMinds
            </button>

            <button
              onClick={handleWhatsAppFallback}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Boek via WhatsApp
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={resetBooking}
              className="text-sm text-gray-400 hover:text-[#c9a961] flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Nieuwe afspraak starten
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Door te boeken ga je akkoord met onze annuleringsvoorwaarden.
          </p>
        </motion.div>
      )}
    </div>
  );
}
