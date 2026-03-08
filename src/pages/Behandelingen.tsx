import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function Behandelingen() {
  const { t } = useTranslation();
  
  const treatments = [
    {
      category: 'Botox',
      items: [
        { name: 'Voorhoofdrimpels', desc: 'Verfrissende uitstraling', link: '/voorhoofdrimpels', price: 'vanaf €119' },
        { name: 'Kraaienpootjes', desc: 'Jeugdige oogopslag', link: '/kraaienpootjes', price: 'vanaf €119' },
        { name: 'Fronsrimpels', desc: 'Glad voorhoofd', link: '/voorhoofdrimpels', price: '€119' },
        { name: 'Browlift', desc: 'Open blik', link: '/voorhoofdrimpels', price: '€119' },
        { name: 'Kin', desc: 'Verminderen putjes', link: '/kin', price: '€69' },
        { name: 'Lipflip', desc: 'Subtiele lipverfijning', link: '/lippen', price: '€79' },
        { name: 'Gummy smile', desc: 'Minder tandvlees zichtbaar', link: '/lippen', price: '€69' },
        { name: 'Bunnylines', desc: 'Rimpels op neus', link: '/voorhoofdrimpels', price: '€69' },
        { name: 'Botox 3 zones', desc: 'Voorhoofd, frons, kraaienpootjes', link: '/voorhoofdrimpels', price: '€269' },
        { name: 'Faceslimming', desc: 'Slanker gelaat', link: '/kin', price: '€249' },
        { name: 'Traptox', desc: 'Schouders ontspannen', link: '/voorhoofdrimpels', price: '€299' },
      ]
    },
    {
      category: 'Fillers',
      items: [
        { name: 'Lippen', desc: 'Natuurlijk volle lippen', link: '/lippen', price: 'vanaf €249' },
        { name: 'Kin', desc: 'Harmonie in gelaat', link: '/kin', price: 'vanaf €299' },
        { name: 'Jukbeenderen', desc: 'Hogere jukbeenderen', link: '/behandelingen', price: 'vanaf €399' },
        { name: 'Kaaklijn', desc: 'Definieerde kaaklijn', link: '/kin', price: 'vanaf €599' },
        { name: 'Traangoot', desc: 'Minder wallen', link: '/behandelingen', price: 'vanaf €349' },
        { name: 'Mondhoeken', desc: 'Vrolijkere uitstraling', link: '/lippen', price: 'vanaf €249' },
        { name: 'Neuslippenplooi', desc: 'Minder diepe plooien', link: '/lippen', price: 'vanaf €249' },
      ]
    },
    {
      category: 'Overige',
      items: [
        { name: 'Skinboosters', desc: 'Hydratatie boost', link: '/behandelingen', price: 'vanaf €199' },
        { name: 'Morpheus8', desc: 'Huidverjonging', link: '/behandelingen', price: 'vanaf €299' },
        { name: 'Fat dissolving', desc: 'Vet verminderen', link: '/behandelingen', price: 'vanaf €149' },
      ]
    }
  ];

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
          {treatments.map((category) => (
            <motion.div key={category.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-8">{category.category}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((treatment, index) => (
                  <motion.div key={index} whileHover={{ y: -4 }} className="group bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-[#c9a961]/10 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-[#c9a961]" />
                      </div>
                      <span className="text-sm font-bold text-[#c9a961]">{treatment.price}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-1 group-hover:text-[#c9a961] transition-colors">{treatment.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{treatment.desc}</p>
                    <Link to={treatment.link} className="inline-flex items-center gap-2 text-[#c9a961] font-medium text-sm">
                      {t('home.treatments.moreInfo')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
