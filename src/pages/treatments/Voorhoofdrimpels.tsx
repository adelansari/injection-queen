import { motion } from 'framer-motion';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Voorhoofdrimpels() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">Botox Behandeling</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              Voorhoofdrimpels Botox
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Heb je last van voorhoofdrimpels wanneer je je wenkbrauwen optrekt? Deze rimpels kunnen zich voordoen wanneer je gezicht expressief is en emoties toont. De oplossing voor dit probleem is te vinden in de voorhoofdrimpels Botox-behandeling bij Injection Queen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] text-white font-semibold rounded-full transition-all">
                Afspraak maken <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+31638604547" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#1a1a2e] dark:border-white/30 text-[#1a1a2e] dark:text-white font-semibold rounded-full hover:bg-[#1a1a2e] hover:text-white transition-all">
                <Phone className="w-5 h-5" /> Bel direct
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Voorhoofdrimpels zijn een veelvoorkomend verschijnsel en treffen bijna iedereen op een bepaald moment. De House of Bratz voorhoofdrimpels Botox-behandeling is speciaal ontwikkeld om deze rimpels aan te pakken en je een gladde, jeugdige uitstraling te geven.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Bij Injection Queen begrijpen we dat elke persoon uniek is, en daarom passen we onze behandelingen aan om ervoor te zorgen dat je je natuurlijke expressie behoudt terwijl we de zichtbaarheid van deze rimpels verminderen.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Ontdek hoe onze voorhoofdrimpels Botox-behandeling je kan helpen om je zelfvertrouwen te herwinnen en je ware schoonheid te laten stralen.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-8 shadow-lg mt-8">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">Waarom kiezen voor Injection Queen?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'BIG-geregistreerde specialist',
                  'Natuurlijke resultaten',
                  'Persoonlijk consult',
                  'Veilige behandelomgeving',
                  'Gratis nazorg',
                  'Eerlijk advies'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#c9a961]/10 rounded-2xl p-8 mt-8">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-4">Tarieven</h3>
              <div className="flex items-center justify-between py-3 border-b border-[#c9a961]/20">
                <span className="text-gray-700 dark:text-gray-300">Voorhoofd</span>
                <span className="font-bold text-[#c9a961]">€119,00</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#c9a961]/20">
                <span className="text-gray-700 dark:text-gray-300">Frons</span>
                <span className="font-bold text-[#c9a961]">€119,00</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-700 dark:text-gray-300">Botox 3 zones</span>
                <span className="font-bold text-[#c9a961]">€269,00</span>
              </div>
              <p className="text-sm text-gray-500 mt-4">* Prijzen zijn inclusief consult en nazorg</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
