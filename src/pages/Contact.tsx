import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ClinicMindsBooking } from '../components/ClinicMindsBooking';

export function Contact() {
  const { t } = useTranslation();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">
              {t('contactPage.title')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              Afspraak Maken
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Boek direct je behandeling online. Kies je behandeling, datum en tijdstip.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Right Side - Booking Widget (shown first on mobile) */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-4 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800"
              >
                <ClinicMindsBooking />
              </motion.div>
            </div>

            {/* Left Sidebar - Contact Info (shown second on mobile) */}
            <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-bold text-[#1a1a2e] dark:text-white mb-6">Contactgegevens</h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c9a961]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#c9a961]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1a1a2e] dark:text-white">Amsterdam</p>
                      <p className="text-sm text-gray-500">Pieter Calandlaan 1193<br />1069 SE Amsterdam</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c9a961]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#c9a961]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1a1a2e] dark:text-white">Telefoon</p>
                      <a href="tel:+31638604547" className="text-sm text-gray-500 hover:text-[#c9a961]">+31 6 386 045 47</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c9a961]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#c9a961]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1a1a2e] dark:text-white">E-mail</p>
                      <a href="mailto:info@injectionqueen.nl" className="text-sm text-gray-500 hover:text-[#c9a961]">info@injectionqueen.nl</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c9a961]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#c9a961]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1a1a2e] dark:text-white">Openingstijden</p>
                      <p className="text-sm text-gray-500">
                        Ma - Vr: 08:00 - 16:00<br />
                        Za - Zo: 09:00 - 17:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c9a961]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-[#c9a961]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1a1a2e] dark:text-white">WhatsApp</p>
                      <a href="https://wa.me/31638604547" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#c9a961]">+31 6 386 045 47</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800"
              >
                <h3 className="font-bold text-[#1a1a2e] dark:text-white mb-4">Veelgestelde vragen</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-[#1a1a2e] dark:text-white mb-1">Hoe kan ik verzetten?</p>
                    <p className="text-gray-500">Bel of mail minimaal 24 uur van tevoren.</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1a1a2e] dark:text-white mb-1">Is het consult vrijblijvend?</p>
                    <p className="text-gray-500">Ja, je bent tot niets verplicht.</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1a1a2e] dark:text-white mb-1">Hoelang duurt een behandeling?</p>
                    <p className="text-gray-500">Meestal tussen 15-45 minuten.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
