import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check, MessageCircle, Loader2, Calendar, ChevronDown, X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  SERVICES, 
  fetchAvailability, 
  calculateEstimate, 
  formatPrice, 
  formatDuration,
  createBooking,
  type DayAvailability,
  type Service
} from '../services/bookingService';

interface CartItem {
  service: Service;
  quantity: number;
}

export function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showServiceSelector, setShowServiceSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Availability state
  const [availability, setAvailability] = useState<DayAvailability | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  
  // Calculate estimate
  const estimate = useMemo(() => {
    const serviceIds = cart.flatMap(item => Array(item.quantity).fill(item.service.id));
    return calculateEstimate(serviceIds);
  }, [cart]);
  
  // Fetch availability when date changes
  useEffect(() => {
    if (!formData.date) {
      setAvailability(null);
      return;
    }
    
    setLoadingAvailability(true);
    fetchAvailability(formData.date)
      .then(setAvailability)
      .finally(() => setLoadingAvailability(false));
  }, [formData.date]);
  
  // Reset time when date changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, time: '' }));
  }, [formData.date]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      if (cart.length === 0) {
        throw new Error('Selecteer minimaal één behandeling');
      }
      
      const serviceIds = cart.flatMap(item => Array(item.quantity).fill(item.service.id));
      
      await createBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        services: serviceIds,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
      });
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
        setCart([]);
      }, 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const addToCart = (service: Service) => {
    setCart(prev => {
      const existing = prev.find(item => item.service.id === service.id);
      if (existing) {
        return prev.map(item => 
          item.service.id === service.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { service, quantity: 1 }];
    });
    setShowServiceSelector(false);
  };
  
  const removeFromCart = (serviceId: string) => {
    setCart(prev => prev.filter(item => item.service.id !== serviceId));
  };
  
  const updateQuantity = (serviceId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.service.id === serviceId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };
  
  const categories = [
    { id: 'all', label: 'Alle' },
    { id: 'botox', label: 'Botox' },
    { id: 'fillers', label: 'Fillers' },
    { id: 'skin', label: 'Skin' },
    { id: 'other', label: 'Overige' },
  ];
  
  const filteredServices = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedCategory);
  
  const getAvailableTimeSlots = () => {
    if (!availability?.isOpen) return [];
    
    const totalDuration = estimate.totalDuration;
    return availability.slots.filter(slot => {
      if (!slot.available) return false;
      
      // Check if there's enough consecutive time
      const [hour, min] = slot.time.split(':').map(Number);
      const startMinutes = hour * 60 + min;
      const endMinutes = startMinutes + totalDuration;
      
      for (let m = startMinutes; m < endMinutes; m += 15) {
        const h = Math.floor(m / 60);
        const mn = m % 60;
        const timeStr = `${h.toString().padStart(2, '0')}:${mn.toString().padStart(2, '0')}`;
        const checkSlot = availability.slots.find(s => s.time === timeStr);
        if (!checkSlot?.available) return false;
      }
      return true;
    });
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">
              {t('contactPage.title')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              Afspraak Maken
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Kies je behandelingen, selecteer een beschikbaar tijdstip en boek direct.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Cart & Estimate */}
            <div className="lg:col-span-1 space-y-6">
              {/* Cart Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="w-5 h-5 text-[#c9a961]" />
                  <h3 className="font-bold text-[#1a1a2e] dark:text-white">Gekozen behandelingen</h3>
                </div>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">Nog geen behandelingen geselecteerd</p>
                    <button 
                      onClick={() => setShowServiceSelector(true)}
                      className="mt-3 text-[#c9a961] text-sm font-medium hover:underline"
                    >
                      + Behandeling toevoegen
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.service.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0f0f1a] rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#1a1a2e] dark:text-white text-sm truncate">{item.service.name}</p>
                          <p className="text-xs text-gray-500">{formatPrice(item.service.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.service.id, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.service.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.service.id)}
                            className="ml-2 text-red-500 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      onClick={() => setShowServiceSelector(true)}
                      className="w-full py-2 text-[#c9a961] text-sm font-medium border border-dashed border-[#c9a961] rounded-lg hover:bg-[#c9a961]/5"
                    >
                      + Nog een behandeling toevoegen
                    </button>
                  </div>
                )}
              </motion.div>
              
              {/* Estimate Card */}
              {cart.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-[#c9a961]/10 to-[#c9a961]/5 rounded-2xl p-6 border border-[#c9a961]/20"
                >
                  <h3 className="font-bold text-[#1a1a2e] dark:text-white mb-4">Kostenoverzicht</h3>
                  
                  <div className="space-y-2 mb-4">
                    {estimate.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {item.service.name} {item.quantity > 1 && `x${item.quantity}`}
                        </span>
                        <span className="font-medium">{formatPrice(item.subtotal)}</span>
                      </div>
                    ))}
                  </div>
                  
                  {estimate.discount && (
                    <div className="flex justify-between text-sm text-green-600 py-2 border-t border-green-200 dark:border-green-800">
                      <span>Korting (combo)</span>
                      <span>-{formatPrice(estimate.discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Totaal</span>
                      <p className="text-xs text-gray-500">{formatDuration(estimate.totalDuration)}</p>
                    </div>
                    <span className="text-2xl font-bold text-[#c9a961]">{formatPrice(estimate.total)}</span>
                  </div>
                </motion.div>
              )}
              
              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-bold text-[#1a1a2e] dark:text-white mb-4">Contact</h3>
                <div className="space-y-3 text-sm">
                  <a href="tel:+31638604547" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-[#c9a961]">
                    <Phone className="w-4 h-4" /> +31 6 386 045 47
                  </a>
                  <a href="mailto:info@injectionqueen.nl" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-[#c9a961]">
                    <Mail className="w-4 h-4" /> info@injectionqueen.nl
                  </a>
                  <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mt-0.5" /> 
                    <span>Pieter Calandlaan 1193<br/>1069 SE Amsterdam</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Booking Form */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 shadow-xl"
              >
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Bedankt!</h3>
                    <p className="text-gray-600 dark:text-gray-400">Je wordt doorgestuurd naar WhatsApp om de afspraak te bevestigen.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl">
                        <p className="text-red-600 dark:text-red-400 text-sm">{submitError}</p>
                      </div>
                    )}
                    
                    {/* Personal Info */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Naam *</label>
                        <input 
                          type="text" required value={formData.name} 
                          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent disabled:opacity-50"
                          placeholder="Je naam"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail *</label>
                        <input 
                          type="email" required value={formData.email}
                          onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent disabled:opacity-50"
                          placeholder="je@email.nl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Telefoon</label>
                        <input 
                          type="tel" value={formData.phone}
                          onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent disabled:opacity-50"
                          placeholder="+31 6 12345678"
                        />
                      </div>
                    </div>
                    
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Kies een datum *
                      </label>
                      <input 
                        type="date" required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent disabled:opacity-50"
                      />
                      {availability && !availability.isOpen && (
                        <p className="mt-2 text-sm text-red-500">Gesloten op deze dag</p>
                      )}
                    </div>
                    
                    {/* Time Selection */}
                    {formData.date && availability?.isOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Kies een tijdstip *
                          {estimate.totalDuration > 0 && (
                            <span className="ml-2 text-xs text-gray-500">(nodig: {formatDuration(estimate.totalDuration)})</span>
                          )}
                        </label>
                        
                        {loadingAvailability ? (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" /> Tijden laden...
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {getAvailableTimeSlots().map(slot => (
                              <button
                                key={slot.time}
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, time: slot.time }))}
                                disabled={isSubmitting}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                  formData.time === slot.time
                                    ? 'bg-[#c9a961] text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {getAvailableTimeSlots().length === 0 && !loadingAvailability && (
                          <p className="text-sm text-red-500">Geen beschikbare tijden voor deze datum</p>
                        )}
                      </motion.div>
                    )}
                    
                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        Opmerkingen
                      </label>
                      <textarea 
                        rows={3}
                        value={formData.notes}
                        onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent disabled:opacity-50 resize-none"
                        placeholder="Speciale wensen of vragen..."
                      />
                    </div>
                    
                    {/* Submit */}
                    <button 
                      type="submit"
                      disabled={isSubmitting || cart.length === 0 || !formData.date || !formData.time}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] disabled:bg-gray-300 text-white font-semibold rounded-xl transition-all shadow-lg disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Versturen...</>
                      ) : (
                        <><Send className="w-5 h-5" /> Bevestig afspraak</>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Selector Modal */}
      <AnimatePresence>
        {showServiceSelector && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowServiceSelector(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#1a1a2e] rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white">Behandeling kiezen</h3>
                  <button onClick={() => setShowServiceSelector(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Category Filter */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-[#c9a961] text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <div className="space-y-3">
                  {filteredServices.map(service => (
                    <button
                      key={service.id}
                      onClick={() => addToCart(service)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f0f1a] rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#1a1a2e] dark:text-white">{service.name}</span>
                          {service.popular && (
                            <span className="px-2 py-0.5 bg-[#c9a961]/20 text-[#c9a961] text-xs rounded-full">Populair</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{service.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDuration(service.duration)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#c9a961]">{formatPrice(service.price)}</p>
                        <Plus className="w-5 h-5 text-gray-400 mx-auto mt-1" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
