import type { ReactElement } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock, ChevronRight, Home } from 'lucide-react';
import { 
  getPostByDateTimeAndSlug,
  getRelatedPosts,
  formatDate,
  getPostUrl,
  sortedPosts 
} from '../blog/registry';
import { MarkdownRenderer } from '../components/blog/MarkdownRenderer';
import { useTranslation } from 'react-i18next';

export function BlogDetail() {
  const { datetime, slug } = useParams<{ datetime: string; slug: string }>();
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'nl' | 'en';

  // Get post by datetime and slug
  const post = (datetime && slug) ? getPostByDateTimeAndSlug(datetime, slug) : undefined;
  
  const relatedPosts = post ? getRelatedPosts(post) : [];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = language === 'nl' ? post.title : post.titleEn;
  const content = language === 'nl' ? post.content : post.contentEn;
  const excerpt = language === 'nl' ? post.excerpt : post.excerptEn;
  const displayTitle = language === 'nl' ? post.title : post.titleEn;

  // Function to render content with inline images
  const renderContentWithImages = () => {
    const paragraphs = content.split('\n\n');
    const images = post.images || [];
    const result: ReactElement[] = [];
    let imageIndex = 0;

    paragraphs.forEach((paragraph, idx) => {
      // Add the paragraph
      result.push(
        <div key={`p-${idx}`} className="mb-4">
          <MarkdownRenderer content={paragraph} />
        </div>
      );

      // Insert an image after every 2-3 paragraphs if available
      if ((idx + 1) % 2 === 0 && imageIndex < images.length) {
        const img = images[imageIndex];
        imageIndex++;
        result.push(
          <figure key={`img-${idx}`} className="my-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={img} 
                alt={`${displayTitle} - afbeelding ${imageIndex}`}
                className="w-full h-auto max-h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </figure>
        );
      }
    });

    // Add remaining images at the end if any
    while (imageIndex < images.length) {
      const img = images[imageIndex];
      result.push(
        <figure key={`img-end-${imageIndex}`} className="my-8">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src={img} 
              alt={`${displayTitle} - afbeelding ${imageIndex + 1}`}
              className="w-full h-auto max-h-[500px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </figure>
      );
      imageIndex++;
    }

    return result;
  };

  return (
    <div className="pt-20">
      {/* Custom Breadcrumbs with Blog Title */}
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
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            <Link 
              to="/blog" 
              className="text-gray-500 hover:text-[#c9a961] transition-colors"
            >
              Blog
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            <span className="text-[#c9a961] font-medium line-clamp-1 max-w-[300px] sm:max-w-[500px]">
              {displayTitle}
            </span>
          </li>
        </ol>
      </motion.nav>
      
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        {post.image ? (
          <img
            src={post.image}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#c9a961]/30 to-[#d4a5a5]/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-3 py-1 bg-[#c9a961] text-white text-sm font-medium rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                {displayTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {formatDate(post.date, language)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {post.readTime}
                </span>
                <span>{post.author}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Introduction */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-medium">
              {excerpt}
            </p>

            {/* Main Content with Inline Images */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {renderContentWithImages()}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-[#c9a961]/10 to-[#e8d5c4]/10 rounded-2xl p-8 my-12 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
                {language === 'nl' 
                  ? 'Wil je meer weten over deze behandeling? Maak een vrijblijvende afspraak voor een persoonlijk consult.'
                  : 'Would you like to know more about this treatment? Make a no-obligation appointment for a personal consultation.'}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a961] text-white rounded-xl font-medium hover:bg-[#b8944f] transition-colors"
              >
                {t('nav.bookNow')}
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
              <span className="text-gray-500 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                {t('blog.share')}:
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#c9a961] font-medium hover:underline"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('blog.backToBlog')}
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-[#1a1a2e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-8">
              {t('blog.relatedPosts')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={getPostUrl(relatedPost)}
                  className="group bg-white dark:bg-[#0f0f1a] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {relatedPost.image ? (
                      <img
                        src={relatedPost.image}
                        alt={language === 'nl' ? relatedPost.title : relatedPost.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#c9a961]/20 to-[#d4a5a5]/20 flex items-center justify-center">
                        <span className="text-4xl">💉</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-[#c9a961] font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-bold text-[#1a1a2e] dark:text-white mt-1 line-clamp-2 group-hover:text-[#c9a961] transition-colors">
                      {language === 'nl' ? relatedPost.title : relatedPost.titleEn}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts CTA */}
      <section className="py-16 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-4">
            {language === 'nl' ? 'Ontdek meer artikelen' : 'Discover more articles'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            {language === 'nl' 
              ? `Bekijk ons volledige archief met ${sortedPosts.length} artikelen over cosmetische behandelingen, tips en trends.`
              : `Browse our complete archive of ${sortedPosts.length} articles about cosmetic treatments, tips and trends.`}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a961] text-white rounded-xl font-medium hover:bg-[#b8944f] transition-colors"
          >
            {language === 'nl' ? 'Bekijk alle artikelen' : 'View all articles'}
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BlogDetail;
