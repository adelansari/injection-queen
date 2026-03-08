import { motion } from 'framer-motion';
import { Shield, Heart, UserCheck, Award, MapPin, Clock, Phone } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useTranslation } from 'react-i18next';

export function OverOns() {
  const { t } = useTranslation();
  
  return (
    <div className="pt-20">
      <Breadcrumbs />
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">{t('nav.about')}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              {t('aboutPage.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('aboutPage.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
                {t('aboutPage.mission.title')}
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('aboutPage.mission.p1')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('aboutPage.mission.p2')}
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#c9a961]/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#c9a961]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white">{t('aboutPage.approach.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{t('aboutPage.approach.subtitle')}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-[#0f0f1a] rounded-xl">
                  <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-2">{t('aboutPage.approach.attention.title')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('aboutPage.approach.attention.desc')}</p>
                </div>
                <div className="p-4 bg-white dark:bg-[#0f0f1a] rounded-xl">
                  <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-2">{t('aboutPage.approach.safety.title')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('aboutPage.approach.safety.desc')}</p>
                </div>
                <div className="p-4 bg-white dark:bg-[#0f0f1a] rounded-xl">
                  <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-2">{t('aboutPage.approach.results.title')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('aboutPage.approach.results.desc')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zainab Section */}
      <section className="py-24 bg-gradient-to-b from-white via-[#faf8f5]/30 to-white dark:from-[#0f0f1a] dark:via-[#1a1a2e]/30 dark:to-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-[#c9a961]/20 to-[#d4a5a5]/20 rounded-3xl p-8 sm:p-12 aspect-square sm:aspect-auto lg:aspect-square flex items-center justify-center max-w-md mx-auto lg:max-w-none">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white dark:bg-[#1a1a2e] flex items-center justify-center shadow-xl">
                    <UserCheck className="w-16 h-16 text-[#c9a961]" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-2">Zainab Haidari</h3>
                  <p className="text-[#c9a961] font-medium">Cosmetisch specialist</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">{t('aboutPage.specialist.tagline')}</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
                {t('aboutPage.specialist.title')}
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('aboutPage.specialist.p1')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('aboutPage.specialist.p2')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('aboutPage.specialist.p3')}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#c9a961]/10 rounded-full">
                  <Award className="w-5 h-5 text-[#c9a961]" />
                  <span className="text-sm font-medium text-[#1a1a2e] dark:text-white">{t('aboutPage.specialist.badges.big')}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#c9a961]/10 rounded-full">
                  <Heart className="w-5 h-5 text-[#c9a961]" />
                  <span className="text-sm font-medium text-[#1a1a2e] dark:text-white">{t('aboutPage.specialist.badges.training')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clinic Section */}
      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              {t('aboutPage.clinic.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('aboutPage.clinic.subtitle')}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#c9a961]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-[#c9a961]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-2">Amsterdam</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Pieter Calandlaan 1193, 1069 SE Amsterdam</p>
                  <div className="flex items-center gap-2 text-[#c9a961]">
                    <Phone className="w-4 h-4" />
                    <a href="tel:+31638604547" className="font-medium">+31 6 386 045 47</a>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#c9a961]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-[#c9a961]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-2">{t('aboutPage.clinic.openingHours')}</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex justify-between"><span>{t('contactPage.weekdays')}</span> <span>08:00 – 16:00</span></li>
                    <li className="flex justify-between"><span>{t('contactPage.weekend')}</span> <span>09:00 – 17:00</span></li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
