import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Don't show on home page
  if (location.pathname === '/') return null;

  const pathMap: Record<string, string> = {
    'over-ons': 'Over ons',
    'behandelingen': 'Behandelingen',
    'prijzen': 'Prijzen',
    'contact': 'Contact',
    'blog': 'Blog',
    'lippen': 'Lipfillers',
    'kin': 'Kin fillers',
    'voorhoofdrimpels': 'Voorhoofdrimpels',
    'kraaienpootjes': 'Kraaienpootjes',
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        <li>
          <Link 
            to="/" 
            className="flex items-center text-gray-500 hover:text-[#c9a961] transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={name} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              {isLast ? (
                <span className="text-[#c9a961] font-medium">{pathMap[name] || name}</span>
              ) : (
                <Link 
                  to={routeTo} 
                  className="text-gray-500 hover:text-[#c9a961] transition-colors"
                >
                  {pathMap[name] || name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
