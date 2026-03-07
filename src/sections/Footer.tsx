import { motion } from 'framer-motion';
import { Crown, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#1a1a2e] dark:bg-[#0a0a14] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Crown className="w-8 h-8 text-[#c9a961]" />
              <span className="text-xl font-serif font-bold text-white">
                Injection<span className="text-[#c9a961]">Queen</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/injectionsqueen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#c9a961] rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://facebook.com/Injection-Queen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#c9a961] rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">{t('footer.company')}</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/over-ons" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/behandelingen" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('nav.treatments')}</Link></li>
              <li><Link to="/prijzen" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('nav.prices')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-white font-bold mb-6">{t('footer.treatments')}</h3>
            <ul className="space-y-3">
              <li><Link to="/lippen" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('home.treatments.lipFillers')}</Link></li>
              <li><Link to="/voorhoofdrimpels" className="text-gray-400 hover:text-[#c9a961] transition-colors">Botox {t('home.treatments.forehead')}</Link></li>
              <li><Link to="/kin" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('home.treatments.chin')}</Link></li>
              <li><Link to="/kraaienpootjes" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('home.treatments.crowsFeet')}</Link></li>
              <li><Link to="/behandelingen" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('treatmentsPage.cta')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Pieter Calandlaan 1193<br />1069 SE Amsterdam</li>
              <li><a href="tel:+31638604547" className="hover:text-[#c9a961] transition-colors">+31 6 386 045 47</a></li>
              <li><a href="mailto:info@injectionqueen.nl" className="hover:text-[#c9a961] transition-colors">info@injectionqueen.nl</a></li>
            </ul>
            <div className="mt-6 p-4 bg-[#c9a961]/10 rounded-xl">
              <p className="text-[#c9a961] font-medium text-sm">Because you deserve it, queen/king.</p>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/" className="text-gray-400 hover:text-[#c9a961] transition-colors">Privacy policy</Link>
              <Link to="/" className="text-gray-400 hover:text-[#c9a961] transition-colors">{t('nav.language') === 'Contact' ? 'Terms & conditions' : 'Algemene voorwaarden'}</Link>
            </div>
            <motion.button 
              onClick={scrollToTop} 
              whileHover={{ scale: 1.1 }} 
              className="w-10 h-10 bg-[#c9a961] hover:bg-[#b8944f] rounded-full flex items-center justify-center transition-colors"
              aria-label="Terug naar boven">
              <ArrowUp className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
