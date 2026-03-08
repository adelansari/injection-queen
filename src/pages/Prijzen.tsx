import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Prijzen() {
  const { t } = useTranslation();
  
  const pricing = {
    botox: [
      { name: 'Brotox', price: '€20,00' },
      { name: 'Bunnylines', price: '€69,00' },
      { name: 'Kin/putjes Botox', price: '€69,00' },
      { name: 'Gummysmile', price: '€69,00' },
      { name: 'Mondhoeken', price: '€69,00' },
      { name: 'Neuspuntlift', price: '€69,00' },
      { name: 'Lipflip', price: '€79,00' },
      { name: 'Browlift', price: '€119,00' },
      { name: 'Frons', price: '€119,00' },
      { name: 'Kraaienpootjes', price: '€119,00' },
      { name: 'Voorhoofd', price: '€119,00' },
      { name: 'Botox Frons en voorhoofd', price: '€179,00' },
      { name: 'Faceslimming/Tandenknarsen', price: '€249,00' },
      { name: 'Botox 3 zones', price: '€269,00' },
      { name: 'Overmatig transpireren oksels', price: '€319,00' },
      { name: 'Overmatig transpireren handen', price: '€349,00' },
      { name: 'Kaaklijn Botox', price: '€179,00' },
      { name: 'Neusvleugels', price: '€69,00' },
      { name: 'Hoofdpijn/Migraine Botox', price: 'vanaf €119,00' },
      { name: 'Jelly Eyes', price: '€69,00' },
      { name: 'Schouderpijn/Barbie Botox/Traptox', price: '€299,00' },
    ],
    fillers: [
      { name: 'Lippen (0.5ml)', price: '€249,00' },
      { name: 'Lippen (1ml)', price: '€349,00' },
      { name: 'Kin', price: 'vanaf €299,00' },
      { name: 'Jukbeenderen', price: 'vanaf €399,00' },
      { name: 'Kaaklijn', price: 'vanaf €599,00' },
      { name: 'Traangoot', price: 'vanaf €349,00' },
      { name: 'Mondhoeken', price: 'vanaf €249,00' },
      { name: 'Neuslippenplooi', price: 'vanaf €249,00' },
    ],
    packages: [
      { name: 'Lips & Lines', desc: 'Lippen + nasolabiale plooien', price: '€549,00' },
      { name: 'Fresh Face', desc: '3 zones Botox + skinbooster', price: '€449,00' },
      { name: 'Contour Package', desc: 'Kin + kaaklijn fillers', price: '€849,00' },
      { name: 'Full Facial', desc: 'Complete gezichtsbehandeling', price: '€1.249,00' },
    ]
  };

  return (
    <div className="pt-20">
      <Breadcrumbs />
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">{t('nav.prices')}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              {t('pricesPage.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('pricesPage.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Botox */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-8">{t('pricesPage.categories.botox')}</h2>
            <div className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl shadow-lg overflow-hidden">
              {pricing.botox.map((item, index) => (
                <div key={index} className={`flex items-center justify-between py-4 px-6 ${index !== pricing.botox.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="font-bold text-[#c9a961]">{item.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fillers */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-8">{t('pricesPage.categories.fillers')}</h2>
            <div className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl shadow-lg overflow-hidden">
              {pricing.fillers.map((item, index) => (
                <div key={index} className={`flex items-center justify-between py-4 px-6 ${index !== pricing.fillers.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="font-bold text-[#c9a961]">{item.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Packages */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-8">{t('pricesPage.categories.packages')}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {pricing.packages.map((pkg, index) => (
                <div key={index} className="bg-gradient-to-br from-[#c9a961]/10 to-[#c9a961]/5 rounded-2xl p-6 border border-[#c9a961]/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white">{pkg.name}</h3>
                    <span className="font-bold text-[#c9a961]">{pkg.price}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{pkg.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#c9a961] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">{t('pricesPage.cta.title')}</h3>
            <p className="text-white/90 mb-6">{t('pricesPage.cta.subtitle')}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#c9a961] font-semibold rounded-full hover:bg-gray-100 transition-all">
              {t('pricesPage.cta.button')} <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
