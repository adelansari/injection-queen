import { useState } from 'react';
import { Instagram, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const POSTS = [
  {
    id: 'DU8IC8cDUlH',
    image: '/images/instagram/DU8IC8cDUlH/DU8IC8cDUlH.jpg',
    caption: 'With strategically placed jawline and chin filler, you can completely transform your side profile without cosmetic surgery. By adding definition, projection, and balance, we enhance your natural features while keeping the results elegant and refined. No scalpels. No downtime. Just precision and artistry 🫶🏼',
    position: 'left' // 2 rows, 1 column
  },
  {
    id: 'DUJAfaZjD56',
    image: '/images/instagram/DUJAfaZjD56/DUJAfaZjD56.jpg',
    caption: 'A little film roll of our favourite moments from the past month 📸 So many beautiful results, happy faces, and special transformations. We\'re incredibly grateful to all our clients who trust us and allow us to share their stunning results on our socials 🤍 Thank you for making it possible for everyone to enjoy and be inspired by these beautiful outcomes 💉',
    position: 'top'
  },
  {
    id: 'DVeTZ5WjWVj',
    image: '/images/instagram/DVeTZ5WjWVj/DVeTZ5WjWVj.jpg',
    caption: 'Perfectly balanced lips aren\'t always about adding more volume they\'re about harmony and natural beauty✨ Lip fillers can subtly refine your shape, enhance symmetry, and bring balance to your facial features without looking overdone. Sometimes the most beautiful results are the ones that simply look like you, just a little more refreshed and confident. If you\'ve been thinking about lip fillers, remember: it\'s not about bigger it\'s about balance💉',
    position: 'top'
  },
  {
    id: 'DVJoHeNjdRX',
    image: '/images/instagram/DVJoHeNjdRX/DVJoHeNjdRX.jpg',
    caption: 'Subtle and balanced exactly how lip fillers should be. The goal is always enhancement, not overfilling. A natural look that complements your features and boosts your confidence. We are specialized in different lip shapes and advanced techniques from soft hydration and definition to fuller, more sculpted results. Whether you prefer a natural enhancement or a more noticeable volume boost, everything is possible and always customized to you. Ready for your own transformation? Book your appointment now and let\'s create the perfect lips for you 💉💋',
    position: 'top'
  },
  {
    id: 'DUvT3NqDS3D',
    image: '/images/instagram/DUvT3NqDS3D/DUvT3NqDS3D.jpg',
    caption: 'We couldn\'t stay behind on this trend… 👑✨ So we asked ChatGPT what a perfect day at Injection Queen would look like, and this is the result 💉📸💄 Lights on. Camera ready. Beautiful results. Happy patients. Content creation in between treatments and a whole lot of confidence boosting. Do you agree? Is this the perfect Injection Queen day? 💖',
    position: 'top'
  },
  {
    id: 'DU_AmzuDbrT',
    image: '/images/instagram/DU_AmzuDbrT/DU_AmzuDbrT.jpg',
    caption: 'Dreaming of a side profile like this? ✨ This client chose a jawline filler treatment combined with a subtle lip filler touch-up to enhance balance and definition. The result? A more sculpted contour, improved harmony, and a naturally refined profile — without surgery. This is the fully healed result after 3 weeks. 💫 Ready to enhance your profile? Book your consultation and let\'s create your perfect angles together 🫶🏼',
    position: 'right' // 2 rows, 1 column
  }
];

export function InstagramFeed() {
  const [selected, setSelected] = useState<typeof POSTS[0] | null>(null);

  return (
    <section id="instagram" className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
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

        {/* Grid - Desktop: 4 columns, 2 rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Post 1 - Left column, spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            onClick={() => setSelected(POSTS[0])}
            className="group relative overflow-hidden rounded-xl cursor-pointer col-span-1 row-span-2 aspect-[3/4]"
          >
            <img
              src={POSTS[0].image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.div>

          {/* Post 2 - Top row, middle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onClick={() => setSelected(POSTS[1])}
            className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
          >
            <img
              src={POSTS[1].image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.div>

          {/* Post 3 - Top row, middle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={() => setSelected(POSTS[2])}
            className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
          >
            <img
              src={POSTS[2].image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.div>

          {/* Post 6 - Right column, spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => setSelected(POSTS[5])}
            className="group relative overflow-hidden rounded-xl cursor-pointer col-span-1 row-span-2 aspect-[3/4]"
          >
            <img
              src={POSTS[5].image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.div>

          {/* Post 4 - Bottom row, middle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={() => setSelected(POSTS[3])}
            className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
          >
            <img
              src={POSTS[3].image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.div>

          {/* Post 5 - Bottom row, middle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            onClick={() => setSelected(POSTS[4])}
            className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
          >
            <img
              src={POSTS[4].image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
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
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-square">
                <img src={selected.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
                  <div>
                    <p className="font-semibold text-sm">injectionsqueen</p>
                    <p className="text-xs text-gray-500">Amsterdam</p>
                  </div>
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line">{selected.caption}</p>
                <a
                  href={`https://instagram.com/p/${selected.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-4 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-sm font-semibold rounded-xl text-center"
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
