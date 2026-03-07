import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Lippen() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">Filler Behandeling</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              Lipfillers Amsterdam
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Zoek je subtiele, natuurlijk ogende lipfillers in Amsterdam, dan ben je bij Injection Queen aan het juiste adres. We richten ons op zachte verfijning, zodat jouw lippen voller en frisser ogen zonder hun eigen karakter te verliezen.
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
            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">Waarom Injection Queen</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We starten altijd met een eerlijk gesprek over jouw wens. We kijken naar de verhoudingen van je gezicht, je lipcontour en je huidkwaliteit, zodat het resultaat past bij jou en niet voelt als een filter.
            </p>

            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6 mt-12">De behandeling stap voor stap</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Vooraf maken we foto's, bespreken we de aanpak en leggen we uit wat je kunt verwachten. De filler op basis van hyaluronzuur wordt heel gericht geplaatst om volume toe te voegen waar dat het mooist uitkomt. De behandeling is doorgaans kort en je kunt meestal snel weer verder met je dag.
            </p>

            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6 mt-12">Veiligheid en comfort</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Hygiëne, techniek en een zorgvuldige dosering staan centraal. We nemen de tijd voor je vragen en geven je duidelijke uitleg, zodat je precies weet wat we doen en waarom.
            </p>

            <div className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-8 shadow-lg mt-8">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">Behandelopties en verwachtingen</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 text-[#1a1a2e] dark:text-white">Wens</th>
                      <th className="text-left py-3 px-2 text-[#1a1a2e] dark:text-white">Aanpak</th>
                      <th className="text-left py-3 px-2 text-[#1a1a2e] dark:text-white">Verwacht effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { wens: 'Hydratatie en glans', aanpak: 'Fijne, oppervlakkige plaatsing', effect: 'Zachtere, soepelere lippen' },
                      { wens: 'Subtiel meer volume', aanpak: 'Gericht toevoegen langs natuurlijke contour', effect: 'Frisse, natuurlijke vollere look' },
                      { wens: 'Duidelijkere liprand', aanpak: 'Accentueren van de cupidoboog en randen', effect: 'Strakkere definitie en vorm' },
                      { wens: 'Symmetrie verbeteren', aanpak: 'Correctie van kleine ongelijkheden', effect: 'Evenwichtiger aanzicht' },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{row.wens}</td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{row.aanpak}</td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{row.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#c9a961]/10 rounded-2xl p-8 mt-8">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-4">Veelgestelde vragen</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-1">Hoe lang blijft het mooi?</h4>
                  <p className="text-gray-600 dark:text-gray-400">De meeste mensen genieten maandenlang van het resultaat. We bespreken wat voor jou realistisch is en wanneer onderhoud logisch is.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-1">Doet het pijn?</h4>
                  <p className="text-gray-600 dark:text-gray-400">Het voelt wat gevoelig maar is goed te doen. We werken rustig en zorgvuldig.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-1">Wanneer kan ik weer werken?</h4>
                  <p className="text-gray-600 dark:text-gray-400">Meestal dezelfde dag, rekening houdend met wat zwelling.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
