import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, MessageCircle, Sparkles } from 'lucide-react';

export function Location() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">{t('location.title')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-secondary dark:text-white mb-4">{t('location.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('location.subtitle')}</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="bg-gradient-to-br from-cream to-white dark:from-dark-card dark:to-secondary/20 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center"><MapPin className="w-7 h-7 text-primary" /></div>
                <div>
                  <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">Amsterdam</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{t('location.address')}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-sm text-primary"><Sparkles className="w-4 h-4" /> {t('location.soon')}</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-cream to-white dark:from-dark-card dark:to-secondary/20 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center"><Clock className="w-7 h-7 text-primary" /></div>
                <div>
                  <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">{t('location.hours.title')}</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>{t('location.hours.monFri')}</li>
                    <li>{t('location.hours.saturday')}</li>
                    <li className="text-gray-400">{t('location.hours.sunday')}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-cream to-white dark:from-dark-card dark:to-secondary/20 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center"><Phone className="w-7 h-7 text-primary" /></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">{t('location.contact.title')}</h3>
                  <ul className="space-y-3">
                    <li><a href="tel:+31612345678" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary"><Phone className="w-5 h-5 text-primary" /> +31 6 12345678</a></li>
                    <li><a href="mailto:info@injectionqueen.nl" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary"><Mail className="w-5 h-5 text-primary" /> info@injectionqueen.nl</a></li>
                    <li><a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary"><MessageCircle className="w-5 h-5 text-primary" /> WhatsApp</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="relative bg-gradient-to-br from-primary/5 to-rose/5 dark:from-primary/10 dark:to-rose/10 rounded-3xl p-8 h-full min-h-[500px] flex items-center justify-center overflow-hidden">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="relative z-10 text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl"><MapPin className="w-12 h-12 text-white" /></div>
                </div>
                <div className="mt-6 bg-white dark:bg-dark-card rounded-2xl p-6 shadow-xl">
                  <h4 className="font-bold text-secondary dark:text-white mb-2">Injection Queen</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Amsterdam, Nederland</p>
                  <a href="https://maps.google.com/?q=Amsterdam" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-medium"><MapPin className="w-4 h-4" /> Route plannen</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
