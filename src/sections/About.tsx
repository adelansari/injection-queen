import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Heart, UserCheck, Award, ArrowRight } from 'lucide-react';

export function About() {
  const { t } = useTranslation();

  const features = [
    { key: 'honest', icon: Heart },
    { key: 'doctors', icon: Shield },
    { key: 'personal', icon: UserCheck },
    { key: 'quality', icon: Award },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white via-cream/30 to-white dark:from-dark-bg dark:via-dark-card/30 dark:to-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-full h-full bg-primary/10 rounded-3xl" />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-rose/10 rounded-3xl" />
              <div className="relative bg-white dark:bg-dark-card rounded-3xl p-8 shadow-2xl">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-rose/10 to-primary/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center animate-spin-slow">
                      <Shield className="w-16 h-16 text-primary" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-secondary dark:text-white mb-2">BIG Geregistreerd</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Medisch verantwoord & 100% veilig</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[{ value: '5+', label: 'Jaar ervaring' }, { value: '500+', label: 'Tevreden klanten' }, { value: '100%', label: 'Veiligheid' }].map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="text-xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 bg-primary text-white rounded-2xl p-4 shadow-xl">
                <Award className="w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">{t('about.title')}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-secondary dark:text-white mb-6 leading-tight">{t('about.subtitle')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{t('about.description')}</p>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div key={feature.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-dark-card shadow-lg">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary dark:text-white mb-1">{t(`about.features.${feature.key}.title`)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t(`about.features.${feature.key}.description`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <a href="#booking" onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all shadow-lg">
              {t('about.cta')} <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
