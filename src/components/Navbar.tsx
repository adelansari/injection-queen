import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon, Crown, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'nl' ? 'en' : 'nl';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.treatments'), href: '/behandelingen' },
    { label: t('nav.about'), href: '/over-ons' },
    { label: t('nav.prices'), href: '/prijzen' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#c9a961] text-white px-4 py-2 rounded-lg z-50">
        {i18n.language === 'nl' ? 'Ga naar inhoud' : 'Skip to content'}
      </a>
      <motion.header 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.6 }} 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-[#0f0f1a]/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <Crown className="w-8 h-8 text-[#c9a961]" />
              <span className="text-xl font-serif font-bold text-[#1a1a2e] dark:text-white">
                Injection<span className="text-[#c9a961]">Queen</span>
              </span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  to={item.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive(item.href) 
                      ? 'text-[#c9a961]' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#c9a961]'
                  }`}>
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#c9a961] transition-all ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button 
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
                aria-label={i18n.language === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands'}>
                <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                  {i18n.language === 'nl' ? 'NL' : 'EN'}
                </span>
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={theme === 'light' ? 'Schakel naar donker thema' : 'Switch to light theme'}>
                {theme === 'light' ? <Moon className="w-5 h-5 text-gray-700" /> : <Sun className="w-5 h-5 text-yellow-400" />}
              </button>
              
              <Link 
                to="/contact"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#c9a961] hover:bg-[#b8944f] text-white font-medium rounded-full transition-all">
                {t('nav.bookNow')}
              </Link>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isMenuOpen ? 'Sluit menu' : 'Open menu'}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-[#0f0f1a] border-t border-gray-100 dark:border-gray-800">
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    to={item.href}
                    className={`block text-lg font-medium ${
                      isActive(item.href) 
                        ? 'text-[#c9a961]' 
                        : 'text-gray-800 dark:text-gray-200 hover:text-[#c9a961]'
                    }`}>
                    {item.label}
                  </Link>
                ))}
                <Link 
                  to="/contact"
                  className="block w-full text-center px-5 py-3 bg-[#c9a961] text-white font-medium rounded-full">
                  {t('nav.bookNow')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
