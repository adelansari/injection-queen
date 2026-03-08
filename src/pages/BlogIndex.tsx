import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search, Clock } from 'lucide-react';
import { 
  getAllCategories, 
  getPostsByCategory,
  searchPosts,
  formatDate,
  getPostUrl,
  sortedPosts 
} from '../blog/registry';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useTranslation } from 'react-i18next';

export function BlogIndex() {
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'nl' | 'en';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = getAllCategories();

  // Filter posts
  let filteredPosts = sortedPosts;
  if (selectedCategory !== 'All') {
    filteredPosts = getPostsByCategory(selectedCategory);
  }
  if (searchTerm) {
    filteredPosts = searchPosts(searchTerm, language);
  }

  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return t('blog.allCategories');
    return cat;
  };

  return (
    <div className="pt-20">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">
              {t('blog.title')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
              Kennis & Inzichten
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white dark:bg-[#0f0f1a] border-b border-gray-100 dark:border-gray-800 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#c9a961] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#c9a961] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-2">{t('blog.noResults')}</p>
              <p className="text-gray-400">{t('blog.tryAdjusting')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white dark:bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={language === 'nl' ? post.title : post.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#c9a961]/20 to-[#d4a5a5]/20 flex items-center justify-center">
                        <span className="text-4xl">💉</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#c9a961] text-white text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.date, language)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-3 group-hover:text-[#c9a961] transition-colors line-clamp-2">
                      {language === 'nl' ? post.title : post.titleEn}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {language === 'nl' ? post.excerpt : post.excerptEn}
                    </p>

                    {/* Read More */}
                    <Link
                      to={getPostUrl(post)}
                      className="inline-flex items-center gap-2 text-[#c9a961] font-medium text-sm group/link"
                    >
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogIndex;
