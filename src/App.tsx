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
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Voorhoofdrimpels } from './pages/treatments/Voorhoofdrimpels';
import { Lippen } from './pages/treatments/Lippen';
import { Kin } from './pages/treatments/Kin';
import { Kraaienpootjes } from './pages/treatments/Kraaienpootjes';
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
                <Route path="/prijzen" element={<Prijzen />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/voorhoofdrimpels" element={<Voorhoofdrimpels />} />
                <Route path="/lippen" element={<Lippen />} />
                <Route path="/kin" element={<Kin />} />
                <Route path="/kraaienpootjes" element={<Kraaienpootjes />} />
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
