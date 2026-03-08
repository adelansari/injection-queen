import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, User, Mail, Phone, MessageSquare, Check, Loader2, 
  ChevronLeft, ExternalLink, Info,
  Sparkles, X
} from 'lucide-react';
import { 
  fetchServices, 
  fetchAvailability,
  createBooking,
  generateWhatsAppBooking,
  getClinicMindsBookingUrl,
  formatPrice,
  formatDuration,
  getCategoryLabel,
  type ClinicMindsService,
  type ClinicMindsAvailability
} from '../services/clinicMindsApi';

type Step = 'service' | 'datetime' | 'details' | 'confirm' | 'success';

export function ClinicMindsBooking() {
  const [step, setStep] = useState<Step>('service');
  const [services, setServices] = useState<ClinicMindsService[]>([]);
  const [selectedService, setSelectedService] = useState<ClinicMindsService | null>(null);
  const [availability, setAvailability] = useState<ClinicMindsAvailability | null>(null);
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<{
    success: boolean;
    bookingId?: string;
    confirmationUrl?: string;
  } | null>(null);

  // Load services on mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (err) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  // Load availability when date is selected
  useEffect(() => {
    if (selectedDate && selectedService) {
      loadAvailability(selectedDate, selectedService.id);
    }
  }, [selectedDate, selectedService]);

  const loadAvailability = async (date: string, serviceId: string) => {
    setLoading(true);
    setAvailability(null);
    setSelectedTime('');
    try {
      const data = await fetchAvailability(date, serviceId);
      setAvailability(data);
    } catch (err) {
      setError('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  // Group services by category
  const servicesByCategory = useMemo(() => {
    const grouped: Record<string, ClinicMindsService[]> = {};
    services.forEach(service => {
      const cat = service.category || 'other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(service);
    });
    return grouped;
  }, [services]);

  const categories = Object.keys(servicesByCategory).sort((a, b) => {
    if (a === 'consultatie') return -1;
    if (b === 'consultatie') return 1;
    return a.localeCompare(b);
  });

  const handleServiceSelect = (service: ClinicMindsService) => {
    setSelectedService(service);
    setStep('datetime');
  };

  const handleDateTimeConfirm = () => {
    if (selectedDate && selectedTime) {
      setStep('details');
    }
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await createBooking({
        serviceId: selectedService.id,
        date: selectedDate,
        time: selectedTime,
        patient: formData,
      });
      
      if (result.success) {
        setBookingResult({
          success: true,
          bookingId: result.bookingId,
          confirmationUrl: result.confirmationUrl,
        });
        setStep('success');
      } else {
        setError(result.message || 'Booking failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppFallback = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    
    const url = generateWhatsAppBooking(
      selectedService,
      selectedDate,
      selectedTime,
      `${formData.firstName} ${formData.lastName}`
    );
    window.open(url, '_blank');
  };

  const goBack = () => {
    if (step === 'datetime') setStep('service');
    else if (step === 'details') setStep('datetime');
    else if (step === 'confirm') setStep('details');
  };

  // Generate next 30 days
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' }),
        dayName: date.toLocaleDateString('nl-NL', { weekday: 'long' }),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
      });
    }
    return dates;
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {['service', 'datetime', 'details', 'confirm'].map((s, idx) => (
          <div key={s} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${step === s ? 'bg-[#c9a961] text-white' : 
                ['datetime', 'details', 'confirm', 'success'].indexOf(step) > idx ? 'bg-green-500 text-white' : 
                'bg-gray-200 dark:bg-gray-700 text-gray-500'}
            `}>
              {['datetime', 'details', 'confirm', 'success'].indexOf(step) > idx ? <Check className="w-4 h-4" /> : idx + 1}
            </div>
            {idx < 3 && (
              <div className={`w-12 h-0.5 mx-2 ${['datetime', 'details', 'confirm', 'success'].indexOf(step) > idx ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Error Display */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-start gap-3"
        >
          <Info className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-4 h-4 text-red-400" />
          </button>
        </motion.div>
      )}

      {/* Step 1: Select Service */}
      {step === 'service' && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Kies een behandeling</h3>
          <p className="text-gray-500 mb-6">Selecteer de behandeling die je wilt boeken</p>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#c9a961]" />
            </div>
          ) : (
            <div className="space-y-8">
              {categories.map(category => (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {getCategoryLabel(category)}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {servicesByCategory[category].map(service => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className="group relative p-4 bg-white dark:bg-[#1a1a2e] border-2 border-gray-100 dark:border-gray-800 rounded-xl text-left hover:border-[#c9a961] transition-all"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-[#1a1a2e] dark:text-white group-hover:text-[#c9a961] transition-colors">
                            {service.name}
                          </h5>
                          <span className="font-bold text-[#c9a961]">{formatPrice(service.price)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {formatDuration(service.duration)}
                          </span>
                          {service.requiresConsultation && (
                            <span className="text-amber-500 flex items-center gap-1">
                              <Info className="w-3 h-3" /> Consultatie verplicht
                            </span>
                          )}
                        </div>
                        <div className="absolute inset-0 border-2 border-[#c9a961] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === 'datetime' && selectedService && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-[#c9a961] mb-4">
            <ChevronLeft className="w-4 h-4" /> Terug
          </button>
          
          <div className="bg-[#c9a961]/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">Geselecteerde behandeling</p>
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-[#1a1a2e] dark:text-white">{selectedService.name}</h4>
              <span className="font-bold text-[#c9a961]">{formatPrice(selectedService.price)}</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Kies een datum</h3>
          
          {/* Date Selection */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {availableDates.map(date => (
                <button
                  key={date.value}
                  onClick={() => setSelectedDate(date.value)}
                  disabled={date.isWeekend && date.dayName === 'zondag'}
                  className={`flex-shrink-0 w-20 p-3 rounded-xl border-2 text-center transition-all ${
                    selectedDate === date.value
                      ? 'border-[#c9a961] bg-[#c9a961]/10'
                      : date.isWeekend && date.dayName === 'zondag'
                      ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-100 hover:border-[#c9a961]/50'
                  }`}
                >
                  <p className={`text-xs ${selectedDate === date.value ? 'text-[#c9a961]' : 'text-gray-500'}`}>
                    {date.label.split(' ')[0]}
                  </p>
                  <p className={`text-lg font-bold ${selectedDate === date.value ? 'text-[#c9a961]' : 'text-[#1a1a2e] dark:text-white'}`}>
                    {date.label.split(' ')[1]}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h4 className="font-semibold text-[#1a1a2e] dark:text-white mb-3">
                Beschikbare tijden <span className="text-gray-400 font-normal">({formatDuration(selectedService.duration)} nodig)</span>
              </h4>
              
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" /> Tijden laden...
                </div>
              ) : availability?.available ? (
                <div className="flex flex-wrap gap-2">
                  {availability.slots
                    .filter(slot => slot.available)
                    .map(slot => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedTime === slot.time
                            ? 'bg-[#c9a961] text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                </div>
              ) : (
                <p className="text-red-500">Geen beschikbare tijden voor deze datum</p>
              )}
            </motion.div>
          )}

          <button
            onClick={handleDateTimeConfirm}
            disabled={!selectedDate || !selectedTime}
            className="w-full mt-6 py-3 bg-[#c9a961] text-white font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#b8944f] transition-colors"
          >
            Volgende
          </button>
        </motion.div>
      )}

      {/* Step 3: Patient Details */}
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
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961]"
                placeholder="Voornaam"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Achternaam *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961]"
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
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961]"
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
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961]"
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
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] resize-none"
              placeholder="Speciale wensen of vragen..."
            />
          </div>

          <button
            onClick={() => setStep('confirm')}
            disabled={!formData.firstName || !formData.lastName || !formData.email}
            className="w-full py-3 bg-[#c9a961] text-white font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#b8944f] transition-colors"
          >
            Bevestig afspraak
          </button>
        </motion.div>
      )}

      {/* Step 4: Confirm */}
      {step === 'confirm' && selectedService && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-[#c9a961] mb-4">
            <ChevronLeft className="w-4 h-4" /> Terug
          </button>

          <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-6">Controleer je afspraak</h3>

          <div className="bg-gray-50 dark:bg-[#0f0f1a] rounded-xl p-6 mb-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Behandeling</span>
              <span className="font-semibold text-[#1a1a2e] dark:text-white text-right">{selectedService.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Datum</span>
              <span className="font-semibold text-[#1a1a2e] dark:text-white">
                {new Date(selectedDate).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tijd</span>
              <span className="font-semibold text-[#1a1a2e] dark:text-white">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Duur</span>
              <span className="font-semibold text-[#1a1a2e] dark:text-white">{formatDuration(selectedService.duration)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Prijs</span>
              <span className="font-bold text-[#c9a961] text-xl">{formatPrice(selectedService.price)}</span>
            </div>
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

          <div className="space-y-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-[#c9a961] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8944f] transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
              {loading ? 'Bezig met boeken...' : 'Bevestig boeking'}
            </button>
            
            <button
              onClick={handleWhatsAppFallback}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Boek via WhatsApp
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Door te boeken ga je akkoord met onze annuleringsvoorwaarden.
          </p>
        </motion.div>
      )}

      {/* Step 5: Success */}
      {step === 'success' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Afspraak aangevraagd!</h3>
          <p className="text-gray-500 mb-6">
            We hebben je boekingsaanvraag ontvangen. Je ontvangt binnen 24 uur een bevestiging.
          </p>
          
          {bookingResult?.bookingId && (
            <p className="text-sm text-gray-400 mb-6">Boekingsnummer: {bookingResult.bookingId}</p>
          )}

          <div className="flex gap-3 justify-center">
            <a
              href={getClinicMindsBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#c9a961] text-white rounded-xl font-medium hover:bg-[#b8944f] transition-colors inline-flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Bekijk in ClinicMinds
            </a>
            <button
              onClick={() => {
                setStep('service');
                setSelectedService(null);
                setSelectedDate('');
                setSelectedTime('');
                setFormData({ firstName: '', lastName: '', email: '', phone: '', notes: '' });
              }}
              className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Nieuwe afspraak
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
