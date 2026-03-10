import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Syringe, Droplets, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { treatments, categoryNames, type Treatment } from '../data/treatments';

const categoryIcons: Record<Treatment['category'], typeof Sparkles> = {
  botox: Syringe,
  fillers: Droplets,
  boosters: Sparkles,
  'fat-dissolving': Scissors,
};

export function Behandelingen() {
  const { t, i18n } = useTranslation();
  const isNl = i18n.language === 'nl';

  const categories: Treatment['category'][] = ['botox', 'fillers', 'boosters', 'fat-dissolving'];

  return (
    <div className="pt-20">
      <Breadcrumbs />
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">{t('treatmentsPage.title')}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              {t('treatmentsPage.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('treatmentsPage.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((cat) => {
            const items = treatments.filter((t) => t.category === cat);
            const Icon = categoryIcons[cat];
            const catName = isNl ? categoryNames[cat].nl : categoryNames[cat].en;

            return (
              <motion.div key={cat} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 last:mb-0">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#c9a961]/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#c9a961]" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white">{catName}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#c9a961]/30 to-transparent" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((treatment, index) => (
                    <motion.div
                      key={treatment.slug}
                      whileHover={{ y: -4 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                    >
                      {treatment.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={treatment.image}
                            alt={isNl ? treatment.name.nl : treatment.name.en}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 bg-[#c9a961]/10 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-[#c9a961]" />
                          </div>
                          {treatment.prices[0] && (
                            <span className="text-sm font-bold text-[#c9a961]">{treatment.prices[0].price}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-1 group-hover:text-[#c9a961] transition-colors">
                          {isNl ? treatment.name.nl : treatment.name.en}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {isNl ? treatment.shortDesc.nl : treatment.shortDesc.en}
                        </p>
                        <Link
                          to={`/behandelingen/${treatment.slug}`}
                          className="inline-flex items-center gap-2 text-[#c9a961] font-medium text-sm"
                        >
                          {isNl ? 'Meer informatie' : 'More info'} <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
