import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Scan, Shield, Sparkles, Crown, ArrowRight, Check } from 'lucide-react';

export function VIP() {
  const { t } = useTranslation();

  const benefits = [
    'Doppler-echografie tijdens behandeling',
    'Visualisatie van bloedvaten',
    'Precieze filler plaatsing',
    'Extra veilige procedure',
    'Optimale controle',
    'Premium ervaring',
  ];

  return (
    <section id="vip" className="py-24 relative overflow-hidden bg-secondary dark:bg-dark-bg">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-rose/5" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-primary rounded-full mb-6">
              <Crown className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-sm">VIP Experience</span>
            </motion.div>
            <span className="block text-primary text-sm font-medium uppercase tracking-wider mb-2">{t('vip.tagline')}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">{t('vip.title')}</h2>
            <p className="text-lg text-gray-300 mb-8">{t('vip.description')}</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[{ icon: Scan, key: 'ultrasound' }, { icon: Shield, key: 'safety' }, { icon: Sparkles, key: 'results' }].map((feature) => (
                <div key={feature.key} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-bold text-white text-sm mb-1">{t(`vip.features.${feature.key}.title`)}</h3>
                  <p className="text-xs text-gray-400">{t(`vip.features.${feature.key}.description`)}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-gray-300 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href="#booking" onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-gold hover:from-primary-dark text-white font-semibold rounded-full transition-all shadow-lg">
                {t('vip.cta')} <ArrowRight className="w-5 h-5" />
              </a>
              <span className="text-2xl font-bold text-primary">{t('vip.price')}</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-16 h-16 bg-gradient-to-br from-gold to-primary rounded-2xl flex items-center justify-center shadow-2xl">
                  <Crown className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <div className="pt-8 text-center">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">VIP Package</h3>
                <p className="text-gray-400 mb-6">De ultieme behandelingservaring</p>
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-rose/20 rounded-2xl mb-6 overflow-hidden flex items-center justify-center">
                  <Scan className="w-16 h-16 text-white" />
                </div>
                <ul className="space-y-3 text-left">
                  {['Ultrasound-guided injections', 'Real-time vessel visualization', 'Maximum safety protocols', 'Premium aftercare included'].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-primary" /></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
