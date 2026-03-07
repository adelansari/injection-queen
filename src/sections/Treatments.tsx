import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Zap, ArrowRight, Check } from 'lucide-react';

type Category = 'all' | 'fillers' | 'botox' | 'skin';

const treatments = [
  { id: '1', key: 'lipFillers', category: 'fillers', icon: Heart, features: ['Hyaluronzuur', 'Natuurlijk resultaat'] },
  { id: '2', key: 'cheekFillers', category: 'fillers', icon: Star, features: ['Volumeherstel', 'Lift effect'] },
  { id: '3', key: 'jawline', category: 'fillers', icon: Zap, features: ['Definitie', 'Contouring'] },
  { id: '4', key: 'nose', category: 'fillers', icon: Sparkles, features: ['Non-chirurgisch', 'Direct resultaat'] },
  { id: '5', key: 'forehead', category: 'botox', icon: Zap, features: ['Fronsrimpels', 'Voorhoofd'] },
  { id: '6', key: 'crowFeet', category: 'botox', icon: Heart, features: ['Ooghoeken', 'Jeugdige blik'] },
  { id: '7', key: 'skinBooster', category: 'skin', icon: Sparkles, features: ['Hydratatie', 'Huidkwaliteit'] },
  { id: '8', key: 'profhilo', category: 'skin', icon: Star, features: ['Verstrakking', 'Intense hydratatie'] },
];

export function Treatments() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t('treatments.categories.all') },
    { key: 'fillers', label: t('treatments.categories.fillers') },
    { key: 'botox', label: t('treatments.categories.botox') },
    { key: 'skin', label: t('treatments.categories.skin') },
  ];

  const filteredTreatments = activeCategory === 'all' ? treatments : treatments.filter(t => t.category === activeCategory);

  return (
    <section id="treatments" className="py-24 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            {t('treatments.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-secondary dark:text-white mb-4">
            {t('treatments.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('treatments.subtitle')}</p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeCategory === cat.key ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              {cat.label}
            </button>
          ))}
        </div>
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((treatment, index) => (
              <motion.div key={treatment.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }} whileHover={{ y: -8 }}
                className="group bg-gradient-to-br from-cream to-white dark:from-dark-card dark:to-secondary/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 dark:border-gray-800">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <treatment.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-secondary dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {t(`treatments.items.${treatment.key}.title`)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{t(`treatments.items.${treatment.key}.description`)}</p>
                <ul className="space-y-1.5 mb-4">
                  {treatment.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Check className="w-3.5 h-3.5 text-green-500" /> {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                  {t('treatments.bookTreatment')} <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
