import { motion } from 'framer-motion';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Link } from 'react-router-dom';

export function Kraaienpootjes() {
  return (
    <div className="pt-20">
      <Breadcrumbs />
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">Botox Behandeling</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              Kraaienpootjes Botox
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Voor veel mensen die vaak glimlachen en hun geluk graag tonen, kunnen kraaienpootjes een bijwerking zijn van hun vreugde. Bij Injection Queen hebben we de perfecte oplossing: de kraaienpootjes Botox-behandeling.
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

      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">Wat zijn kraaienpootjes?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Kraaienpootjes is de term die wordt gebruikt om de fijne lijntjes en rimpels aan de buitenhoeken van uw ogen te beschrijven. Er zijn twee varianten van deze rimpels: <strong>dynamische en statische</strong>.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Dynamische rimpels worden voornamelijk veroorzaakt door gezichtsuitdrukkingen. Elke lach, frons en opgetrokken wenkbrauw heeft bijgedragen tot het ontstaan van kleine plooitjes in de ooghoeken. Statische rimpels daarentegen worden veroorzaakt door natuurlijke verschijnselen, zoals zwaartekracht en veroudering.
            </p>

            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6 mt-12">Waarom heb ik kraaienpootjes?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Naarmate we ouder worden, begint onze huid twee onmisbare eiwitten te verliezen: <strong>elastine en collageen</strong>. Collageen houdt de huid soepel en stevig, terwijl elastine de huid helpt 'terug te veren' na het maken van gezichtsuitdrukkingen.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Enkele factoren die veroudering versnellen en kraaienpootjes dieper maken zijn blootstelling aan UV-straling, een ongezond dieet en ongezonde slaapgewoonten.
            </p>

            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">De behandeling</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              De kraaienpootjes Botox-behandeling bij Injection Queen is een relatief eenvoudige behandeling. We beginnen met een consult, waarin we u door het proces leiden. Uw wensen en behoeften staan voorop, en we zullen altijd eerlijk en transparant zijn over wat er mogelijk is.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Voor deze behandeling zijn meestal meerdere injecties nodig, maar het duurt niet lang. Inclusief uw consult duurt het ongeveer 10 tot 20 minuten.
            </p>

            <div className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">Resultaat en nazorg</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-2">Wanneer zie je resultaat?</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Na ongeveer 3 tot 4 dagen zult u de eerste resultaten zien. De uiteindelijke resultaten zijn duidelijk binnen 14 dagen.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-2">Hoe lang houdt het effect aan?</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Na ongeveer 3 tot 6 maanden is het effect uitgewerkt en kunt u de behandeling herhalen.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#c9a961]/10 rounded-2xl p-8 mt-8">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-4">Wat te doen na de behandeling?</h3>
              <ul className="space-y-2">
                {[
                  'Vermijd gedurende de eerste 4 uur platliggen en bukken',
                  'Onthoud u gedurende de eerste 24 uur van roken, alcoholconsumptie en intensieve lichaamsbeweging',
                  'Vermijd blootstelling aan direct zonlicht gedurende 2 weken',
                  'Wacht minstens 2 weken voordat u een sauna, spa of hammam bezoekt',
                  'Geen gezichtsbehandelingen zoals laserbehandelingen of peelings gedurende 2 weken'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#c9a961] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
