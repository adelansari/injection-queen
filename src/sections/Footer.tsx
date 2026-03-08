import { motion } from 'framer-motion';
import { Crown, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// TikTok Icon Component (not in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/injectionsqueen/',
      icon: Instagram,
      color: 'hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61553197296268',
      icon: Facebook,
      color: 'hover:bg-blue-600',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@injectionsqueen',
      icon: TikTokIcon,
      color: 'hover:bg-black hover:ring-2 hover:ring-[#c9a961]/50',
    },
  ];

  return (
    <footer className="bg-[#1a1a2e] dark:bg-[#0a0a14] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Social */}
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
            
            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">{t('footer.followUs')}</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
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

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/" className="text-gray-400 hover:text-[#c9a961] transition-colors">Privacy policy</Link>
              <span className="text-gray-600">|</span>
              <Link to="/" className="text-gray-400 hover:text-[#c9a961] transition-colors">Algemene voorwaarden</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
