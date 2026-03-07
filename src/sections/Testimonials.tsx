import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export function Testimonials() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = ['1', '2', '3', '4'];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-secondary dark:text-white mb-4">{t('testimonials.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
        </motion.div>
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-cream to-white dark:from-dark-card dark:to-secondary/20 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/10" />
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
                </div>
                <blockquote className="text-xl lg:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 font-light italic">"{t(`testimonials.reviews.${testimonials[currentIndex]}.text`)}"</blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center text-white text-xl font-bold">
                    {t(`testimonials.reviews.${testimonials[currentIndex]}.author`).charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-secondary dark:text-white">{t(`testimonials.reviews.${testimonials[currentIndex]}.author`)}</div>
                    <div className="text-sm text-primary">{t(`testimonials.reviews.${testimonials[currentIndex]}.treatment`)}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="p-3 rounded-full bg-white dark:bg-dark-card shadow-lg hover:shadow-xl"><ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" /></button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 dark:bg-gray-600'}`} />
              ))}
            </div>
            <button onClick={next} className="p-3 rounded-full bg-white dark:bg-dark-card shadow-lg hover:shadow-xl"><ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
