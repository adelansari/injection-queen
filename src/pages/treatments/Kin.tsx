import { motion } from 'framer-motion';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Link } from 'react-router-dom';

export function Kin() {
  return (
    <div className="pt-20">
      <Breadcrumbs />
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">Filler Behandeling</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              Kin Fillers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Kin fillers bieden uw kin extra volume, waardoor deze prominenter wordt en uw zijprofiel wordt verfraaid. De kin is een essentieel onderdeel van uw gelaatstrekken en heeft een aanzienlijke invloed op de basisvorm van uw gezicht.
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
            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">Waarom de kin belangrijk is</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Hoewel veel mensen precies weten hoe ze willen dat hun neus, lippen, ogen, wenkbrauwen, kaaklijn en jukbeenderen eruitzien, lijken velen zich niet bewust van de cruciale rol die de kin speelt in het totale uiterlijk van hun gezicht.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Bij Injection Queen streven we ernaar om hoogwaardige resultaten te leveren, en we geloven dat echte schoonheid voortkomt uit harmonie en evenwicht. De kin is een fundamenteel onderdeel van deze balans.
            </p>

            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6 mt-12">De belangrijkheid voor mannen</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Voor mannen is de kin even belangrijk, zo niet nog belangrijker. Een krachtige, goed gevormde kaaklijn met een mannelijke kin kan een opmerkelijke transformatie teweegbrengen. Onderzoek heeft aangetoond dat scherpe kaken en krachtige kinnen als mannelijker en universeel aantrekkelijker worden beschouwd.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              In een onderzoek uit 2015 bleek dat 94% van de CEO's op de Fortune 500-lijst een bovengemiddeld sterke kin had. Een opvallende kin wordt geassocieerd met macht.
            </p>

            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">Welke filler gebruiken wij?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Bij Injection Queen maken we gebruik van hyaluronzuur om uw nieuwe kin te vormen. Hyaluronzuur is een natuurlijke stof die van nature in uw lichaam voorkomt. We maken gebruik van Stylage, een filler die de elasticiteit van de huid verbetert en mannitol bevat, waardoor de kans op bijwerkingen minimaal is.
            </p>

            <div className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">Het behandelproces</h3>
              <div className="space-y-4">
                {[
                  'Consult: We bespreken uw wensen en doelen',
                  'Foto\'s: We maken foto\'s van verschillende hoeken',
                  'Verdoving: We passen een verdovende crème toe',
                  'Injectie: De filler wordt geplaatst met een ultradunne canule',
                  'Nazorg: U krijgt duidelijke instructies mee'
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#c9a961] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#c9a961]/10 rounded-2xl p-8 mt-8">
              <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-4">Nazorginstructies</h3>
              <ul className="space-y-2">
                {[
                  'Roken, alcoholgebruik en intensieve lichaamsbeweging vermijden gedurende de eerste 24 uur',
                  'Beperk blootstelling aan de zon en vermijd zonnebanken gedurende de eerste 2 weken',
                  'Vermijd sauna\'s, spa\'s en hammams gedurende de eerste 2 weken',
                  'Geen gezichtsbehandelingen zoals laserbehandelingen of peelings gedurende de eerste 2 weken'
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
