import { useState } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Instagram posts data - using blog images as placeholders
// Replace these with actual Instagram post images when available
const INSTAGRAM_POSTS = [
  {
    id: 'DUJAfaZjD56',
    url: 'https://www.instagram.com/p/DUJAfaZjD56/',
    imageUrl: '/images/blog/Voor-na-lip-fillers-1.jpg',
    caption: 'Natural lip enhancement ✨ Subtle volume for a beautiful smile',
    likes: 156,
    comments: 12,
    isReel: false
  },
  {
    id: 'DU8IC8cDUlH',
    url: 'https://www.instagram.com/p/DU8IC8cDUlH/',
    imageUrl: '/images/blog/Voor-na-lip-fillers-2.jpg',
    caption: 'Lip filler transformation 🌟 Defined, hydrated, gorgeous',
    likes: 203,
    comments: 18,
    isReel: false
  },
  {
    id: 'DVVnhRtjXFf',
    url: 'https://www.instagram.com/p/DVVnhRtjXFf/',
    imageUrl: '/images/blog/Voor-na-1.jpg',
    caption: 'Botox before & after 🌟 Smooth, refreshed, natural-looking results',
    likes: 389,
    comments: 27,
    isReel: false
  },
  {
    id: 'DVJoHeNjdRX',
    url: 'https://www.instagram.com/p/DVJoHeNjdRX/',
    imageUrl: '/images/blog/Voor-na-traangoten.jpg',
    caption: 'Tear trough treatment 💫 Bright, rested, youthful eyes',
    likes: 445,
    comments: 31,
    isReel: false
  },
  {
    id: 'DUvT3NqDS3D',
    url: 'https://www.instagram.com/p/DUvT3NqDS3D/',
    imageUrl: '/images/blog/Skinboosters-injection-queen.jpg',
    caption: 'Glowing skin goals achieved ✨ Microneedling results',
    likes: 312,
    comments: 22,
    isReel: false
  }
];

export function InstagramFeed() {
  const [selectedPost, setSelectedPost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  return (
    <section id="instagram" className="py-16 md:py-24 bg-gradient-to-b from-white to-pink-50/30 dark:from-gray-900 dark:to-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 mb-6 shadow-lg shadow-pink-500/25"
          >
            <Instagram className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Follow Us on Instagram
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-2"
          >
            @injectionsqueen
          </motion.p>
          
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            href="https://instagram.com/injectionsqueen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-medium rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105"
          >
            Visit Profile <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {INSTAGRAM_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
              onClick={() => setSelectedPost(post)}
            >
              {/* Image */}
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-medium line-clamp-2 mb-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-4 text-white/90">
                  <span className="flex items-center gap-1 text-sm">
                    <Heart className="w-4 h-4 fill-current" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </span>
                </div>
              </div>

              {/* Reel Badge */}
              {post.isReel && (
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 rounded-full p-1.5">
                  <Play className="w-4 h-4 text-pink-500 fill-current" />
                </div>
              )}

              {/* Instagram Icon on Hover */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Blijf op de hoogte van onze nieuwste behandelingen en resultaten
          </p>
        </motion.div>
      </div>

      {/* Modal for selected post */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="aspect-square">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Heart className="w-5 h-5 text-pink-500 fill-current" />
                    {selectedPost.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-5 h-5" />
                    {selectedPost.comments} comments
                  </span>
                </div>
                
                <p className="text-gray-800 dark:text-gray-200 mb-4">
                  {selectedPost.caption}
                </p>

                <a
                  href={selectedPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                >
                  View on Instagram <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
