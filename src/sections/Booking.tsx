import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Send, Check, Loader2 } from 'lucide-react';
import { submitBooking, type BookingData } from '../services/bookingApi';

export function Booking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: '',
    date: '',
    time: '',
    message: ''
  });

  const treatments = [
    { value: 'lipfillers', label: 'Lipfillers' },
    { value: 'botox-forehead', label: 'Botox - Voorhoofd' },
    { value: 'botox-crowsfeet', label: 'Botox - Kraaienpootjes' },
    { value: 'botox-frown', label: 'Botox - Fronsrimpels' },
    { value: 'chin-fillers', label: 'Kin Fillers' },
    { value: 'cheek-fillers', label: 'Jukbeenderen Fillers' },
    { value: 'jawline', label: 'Kaaklijn' },
    { value: 'skinboosters', label: 'Skinboosters' },
    { value: 'morpheus8', label: 'Morpheus8' },
    { value: 'consult', label: 'Gratis consult' },
    { value: 'other', label: 'Anders' },
  ];

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const bookingData: BookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        treatment: formData.treatment,
        date: formData.date,
        time: formData.time,
        message: formData.message,
      };

      const result = await submitBooking(bookingData);
      
      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', treatment: '', date: '', time: '', message: '' });
        }, 5000);
      } else {
        setSubmitError(result.error || 'Failed to submit booking');
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="booking" className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Info */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">
              Afspraak maken
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              Maak een afspraak
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Vul het formulier in om een afspraak te maken. We nemen binnen 24 uur contact met je op om de afspraak te bevestigen.
            </p>
            <div className="space-y-4 mb-8">
              {[
                'Gratis intake gesprek',
                'Persoonlijk advies op maat', 
                'Binnen 24 uur reactie',
                'Geen verplichtingen'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="p-6 bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg">
              <h3 className="font-bold text-[#1a1a2e] dark:text-white mb-4">Direct contact?</h3>
              <div className="space-y-3">
                <a href="tel:+31638604547" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-[#c9a961]">
                  <Phone className="w-5 h-5 text-[#c9a961]" /> +31 6 386 045 47
                </a>
                <a href="mailto:info@injectionqueen.nl" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-[#c9a961]">
                  <Mail className="w-5 h-5 text-[#c9a961]" /> info@injectionqueen.nl
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Bedankt!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Je wordt nu doorgestuurd naar WhatsApp om de afspraak te bevestigen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl">
                      <p className="text-red-600 dark:text-red-400 text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Naam *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent text-gray-900 dark:text-white disabled:opacity-50" 
                        placeholder="Uw naam" 
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          value={formData.email} 
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent text-gray-900 dark:text-white disabled:opacity-50" 
                          placeholder="uw@email.nl" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Telefoon</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent text-gray-900 dark:text-white disabled:opacity-50" 
                          placeholder="+31 6 12345678" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Treatment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Behandeling *</label>
                    <select 
                      name="treatment" 
                      required
                      value={formData.treatment} 
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent text-gray-900 dark:text-white disabled:opacity-50"
                    >
                      <option value="">Selecteer een behandeling</option>
                      {treatments.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Datum *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="date" 
                          name="date" 
                          required
                          value={formData.date} 
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent text-gray-900 dark:text-white disabled:opacity-50" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tijd</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select 
                          name="time" 
                          value={formData.time} 
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent text-gray-900 dark:text-white disabled:opacity-50"
                        >
                          <option value="">Selecteer tijd</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bericht</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea 
                        name="message" 
                        rows={4} 
                        value={formData.message} 
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent text-gray-900 dark:text-white resize-none disabled:opacity-50" 
                        placeholder="Vertel ons meer over uw wensen..." 
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all shadow-lg disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Versturen...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Afspraak aanvragen</>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Je wordt doorgestuurd naar WhatsApp om de afspraak te bevestigen.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
