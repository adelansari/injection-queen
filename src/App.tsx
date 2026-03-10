import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Footer } from './sections/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { BackToTop } from './components/BackToTop';
import { Home } from './pages/Home';
import { OverOns } from './pages/OverOns';
import { Behandelingen } from './pages/Behandelingen';
import { Prijzen } from './pages/Prijzen';
import { Contact } from './pages/Contact';
import { BlogIndex } from './pages/BlogIndex';
import { BlogDetail } from './pages/BlogDetail';
import { TreatmentDetail } from './pages/treatments/TreatmentDetail';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] dark:bg-[#0f0f1a]">
            <div className="w-16 h-16 border-4 border-[#c9a961] border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <div className="min-h-screen bg-white dark:bg-[#0f0f1a] transition-colors">
            <ScrollToTop />
            <Navbar />
            <main id="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/over-ons" element={<OverOns />} />
                <Route path="/behandelingen" element={<Behandelingen />} />
                <Route path="/behandelingen/:category/:slug" element={<TreatmentDetail />} />
                <Route path="/prijzen" element={<Prijzen />} />
                <Route path="/contact" element={<Contact />} />

                {/* Blog Routes - Date-based URLs with slug for SEO */}
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:datetime/:slug" element={<BlogDetail />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
