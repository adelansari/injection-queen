import { motion } from 'framer-motion';
import { Breadcrumbs } from './Breadcrumbs';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  showBreadcrumbs?: boolean;
}

export function PageWrapper({ children, className = '', showBreadcrumbs = true }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {showBreadcrumbs && <Breadcrumbs />}
      {children}
    </motion.div>
  );
}
