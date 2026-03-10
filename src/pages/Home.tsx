import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Heart, MapPin, Phone, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { InstagramFeed } from '../components/InstagramFeed';

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50 pt-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a961]/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#c9a961]" />
                <span className="text-sm font-medium text-[#b8944f]">{t('home.hero.tagline')}</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#1a1a2e] dark:text-white leading-tight mb-6">
                {t('home.hero.title').split(' ').map((word, i) =>
                  word === 'schoonheid' || word === 'beauty' ?
                    <span key={i} className="bg-gradient-to-r from-[#c9a961] to-[#d4a574] bg-clip-text text-transparent">{word} </span> :
                    <span key={i}>{word} </span>
                )}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                {t('home.hero.subtitle')}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link to="/contact" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                  {t('home.hero.ctaPrimary')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/behandelingen" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#1a1a2e] dark:border-white/30 text-[#1a1a2e] dark:text-white font-semibold rounded-full hover:bg-[#1a1a2e] hover:text-white dark:hover:bg-white dark:hover:text-[#0f0f1a] transition-all">
                  {t('home.hero.ctaSecondary')}
                </Link>
              </motion.div>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '500+', label: t('home.stats.clients'), icon: Heart },
                  { value: '100%', label: t('home.stats.satisfaction'), icon: Shield },
                  { value: '5+', label: t('home.stats.experience'), icon: Sparkles }
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-[#c9a961]" />
                      <span className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] dark:text-white">{stat.value}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="hidden lg:block">
              <div className="relative">
                <img
                  src="/images/home/hero02.jpg"
                  alt="Injection Queen Kliniek"
                  className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.classList.add('placeholder-active');
                  }}
                />
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-[#1a1a2e] rounded-xl shadow-xl p-4 flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-[#c9a961]/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#c9a961]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a2e] dark:text-white">BIG Geregistreerd</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Officiële erkenning</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Treatments Preview */}
      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">{t('home.treatments.title')}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-4">{t('home.treatments.title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('home.treatments.subtitle')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('home.treatments.lipFillers'), desc: t('home.treatments.lipFillersDesc'), link: '/lippen', img: '/images/treatments/lip-fillers.jpg' },
              { title: t('home.treatments.forehead'), desc: t('home.treatments.foreheadDesc'), link: '/voorhoofdrimpels', img: '/images/blog/close-up-beautician-hands-protective-gloves-making-injection-female-forehead-scaled.jpg' },
              { title: t('home.treatments.chin'), desc: t('home.treatments.chinDesc'), link: '/kin', img: '/images/blog/beauty-injection-woman-making-correction-her-nose-lips-salonxd-scaled.jpg' },
              { title: t('home.treatments.crowsFeet'), desc: t('home.treatments.crowsFeetDesc'), link: '/kraaienpootjes', img: '/images/blog/Behandeling-cosmetisch-kraaienpootjes-1.jpg' },
            ].map((treatment, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }} className="group bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={treatment.img}
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-2 group-hover:text-[#c9a961] transition-colors">{treatment.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{treatment.desc}</p>
                  <Link to={treatment.link} className="inline-flex items-center gap-2 text-[#c9a961] font-medium text-sm">{t('home.treatments.moreInfo')} <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-gradient-to-b from-white via-[#faf8f5]/30 to-white dark:from-[#0f0f1a] dark:via-[#1a1a2e]/30 dark:to-[#0f0f1a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">{t('home.about.tagline')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6 leading-tight">
                {t('home.about.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t('home.about.description')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t('home.about.description2')}
              </p>
              <Link to="/over-ons" className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] text-white font-semibold rounded-full transition-all shadow-lg">
                {t('home.about.cta')} <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative">
                <img
                  src="/images/about/zainab-haidari.jpg"
                  alt="Zainab Haidari - Injection Queen"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {/* Experience Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-4 -right-4 sm:right-4 bg-[#c9a961] text-white rounded-xl shadow-xl p-4"
                >
                  <p className="text-3xl font-bold">5+</p>
                  <p className="text-sm">Jaar ervaring</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">
              <Instagram className="w-4 h-4" />
              Instagram
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-4">
              Volg ons op Instagram
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Blijf op de hoogte van de nieuwste behandelingen, resultaten en nieuws van Injection Queen
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <InstagramFeed />
          </motion.div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="py-24 bg-gradient-to-b from-white via-[#faf8f5]/30 to-white dark:from-[#0f0f1a] dark:via-[#1a1a2e]/30 dark:to-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">{t('home.locations.tagline')}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-4">{t('home.locations.title')}</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/images/locations/amsterdam.jpg"
                  alt="Injection Queen Amsterdam"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#c9a961]/10 rounded-xl flex items-center justify-center"><MapPin className="w-7 h-7 text-[#c9a961]" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-2">{t('home.locations.amsterdam')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{t('home.locations.amsterdamAddress')}</p>
                    <a href="tel:+31638604547" className="inline-flex items-center gap-2 text-[#c9a961]"><Phone className="w-4 h-4" /> +31 6 386 045 47</a>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src="/images/locations/amsterdam.jpg"
                  alt="Injection Queen Spijkenisse - Binnenkort"
                  className="w-full h-full object-cover opacity-50"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-4 py-2 bg-[#c9a961] text-white font-semibold rounded-full">Binnenkort</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#c9a961]/10 rounded-xl flex items-center justify-center"><MapPin className="w-7 h-7 text-[#c9a961]" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-2">{t('home.locations.spijkenisse')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{t('home.locations.comingSoon')}</p>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#c9a961]/10 rounded-full text-sm text-[#c9a961]">Coming soon</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
