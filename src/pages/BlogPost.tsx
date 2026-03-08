import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts, blogPosts } from '../data/blogPosts';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title;

  return (
    <div className="pt-20">
      <Breadcrumbs />
      
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
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
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {post.author}
                </span>
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
            className="prose prose-lg max-w-none dark:prose-invert"
          >
            {/* Introduction */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Main Content Placeholder */}
            <div className="bg-gray-50 dark:bg-[#1a1a2e] rounded-2xl p-8 my-8 text-center">
              <p className="text-gray-500 mb-4">
                Volledige artikelinhoud binnenkort beschikbaar
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a961] text-white rounded-xl font-medium hover:bg-[#b8944f] transition-colors"
              >
                Maak een afspraak
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
              <span className="text-gray-500 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Delen:
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
              Terug naar alle artikelen
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-[#1a1a2e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-8">
              Gerelateerde artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-white dark:bg-[#0f0f1a] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    {relatedPost.image ? (
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#c9a961]/20 to-[#d4a5a5]/20" />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-[#c9a961] font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-bold text-[#1a1a2e] dark:text-white mt-1 line-clamp-2 group-hover:text-[#c9a961] transition-colors">
                      {relatedPost.title}
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
            Ontdek meer artikelen
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Bekijk ons volledige archief met {blogPosts.length} artikelen over cosmetische behandelingen, tips en trends.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a961] text-white rounded-xl font-medium hover:bg-[#b8944f] transition-colors"
            >
              Bekijk alle artikelen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#c9a961] text-[#c9a961] rounded-xl font-medium hover:bg-[#c9a961] hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
