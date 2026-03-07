import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Heart } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '500+', label: t('hero.stats.clients'), icon: Heart },
    { value: '100%', label: t('hero.stats.satisfaction'), icon: Shield },
    { value: '5+', label: t('hero.stats.experience'), icon: Sparkles },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cream via-white to-accent/30 dark:from-dark-bg dark:via-dark-card dark:to-secondary/50 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-rose/10 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-dark dark:text-primary">{t('hero.tagline')}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-secondary dark:text-white leading-tight mb-6">
              Jouw <span className="gradient-text">schoonheid</span> is onze prioriteit
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a href="#booking" onClick={(e) => { e.preventDefault(); scrollToSection('#booking'); }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                {t('hero.ctaPrimary')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#treatments" onClick={(e) => { e.preventDefault(); scrollToSection('#treatments'); }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-secondary dark:border-white/30 text-secondary dark:text-white font-semibold rounded-full hover:bg-secondary hover:text-white dark:hover:bg-white dark:hover:text-dark-bg transition-all">
                {t('hero.ctaSecondary')}
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className="w-4 h-4 text-primary" />
                    <span className="text-2xl lg:text-3xl font-bold text-secondary dark:text-white">{stat.value}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative hidden lg:block">
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/20 to-rose/20 rounded-full aspect-square flex items-center justify-center">
                <div className="text-center p-12">
                  <div className="text-8xl font-serif font-bold gradient-text mb-4">IQ</div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Injection Queen</p>
                  <p className="text-sm text-primary mt-2">Amsterdam</p>
                </div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white dark:bg-dark-card shadow-xl rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">BIG Geregistreerd</p>
                    <p className="text-sm font-bold text-secondary dark:text-white">100% Veilig</p>
                  </div>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-card shadow-xl rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-rose" />
                  <div>
                    <p className="text-xs text-gray-500">Tevreden Klanten</p>
                    <p className="text-sm font-bold text-secondary dark:text-white">500+ Reviews</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
