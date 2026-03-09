import { useState } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const POSTS = [
  { id: 'DUJAfaZjD56', image: '/images/blog/Voor-na-lip-fillers-1.jpg', likes: 234, comments: 18, caption: 'Natural lip enhancement', size: 'large' },
  { id: 'DU8IC8cDUlH', image: '/images/blog/Voor-na-lip-fillers-2.jpg', likes: 189, comments: 24, caption: 'Lip filler transformation', size: 'small' },
  { id: 'DVVnhRtjXFf', image: '/images/blog/Voor-na-1.jpg', likes: 567, comments: 42, caption: 'Botox before & after', size: 'small' },
  { id: 'DVJoHeNjdRX', image: '/images/blog/Voor-na-traangoten.jpg', likes: 445, comments: 31, caption: 'Tear trough treatment', size: 'medium' },
  { id: 'DUvT3NqDS3D', image: '/images/blog/Skinboosters-injection-queen.jpg', likes: 312, comments: 22, caption: 'Glowing skin goals', size: 'small' },
];

export function InstagramFeed() {
  const [selected, setSelected] = useState<typeof POSTS[0] | null>(null);

  return (
    <section id="instagram" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            @injectionsqueen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm mt-1"
          >
            14K followers · 370 posts
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[180px]">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(post)}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                post.size === 'large' ? 'col-span-2 row-span-2' :
                post.size === 'medium' ? 'col-span-2 row-span-1' :
                'col-span-1 row-span-1'
              }`}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{post.caption}</p>
                <div className="flex items-center gap-3 mt-2 text-white/80 text-xs">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com/injectionsqueen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
          >
            View all posts on Instagram <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-square">
                <img src={selected.image} alt={selected.caption} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
                    <div>
                      <p className="font-semibold text-sm">injectionsqueen</p>
                      <p className="text-xs text-gray-500">Amsterdam</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1 text-sm">
                      <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                      {selected.likes}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <MessageCircle className="w-4 h-4" />
                      {selected.comments}
                    </span>
                  </div>
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-sm mb-4">{selected.caption}</p>
                <a
                  href={`https://instagram.com/p/${selected.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-sm font-semibold rounded-xl text-center"
                >
                  View on Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
