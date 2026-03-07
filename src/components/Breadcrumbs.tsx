import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') return null;

  const breadcrumbMap: Record<string, string> = {
    'over-ons': 'Over ons',
    'behandelingen': 'Behandelingen',
    'prijzen': 'Prijzen',
    'contact': 'Contact',
    'lippen': 'Lippen',
    'voorhoofdrimpels': 'Voorhoofdrimpels',
    'kin': 'Kin',
    'kraaienpootjes': 'Kraaienpootjes',
  };

  return (
    <nav className="bg-gray-50 dark:bg-[#0a0a14] border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center py-4 space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#c9a961] transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const label = breadcrumbMap[name] || name;

            return (
              <li key={name} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                {isLast ? (
                  <span className="text-[#c9a961] font-medium">{label}</span>
                ) : (
                  <Link 
                    to={routeTo}
                    className="text-gray-500 dark:text-gray-400 hover:text-[#c9a961] transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
