import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Phone, Sparkles, ChevronRight } from 'lucide-react';
import { getTreatmentBySlug, getTreatmentsByCategory, type Treatment } from '../../data/treatments';
import { Breadcrumbs } from '../../components/Breadcrumbs';

function RelatedCard({ t: treatment, lang }: { t: Treatment; lang: string }) {
    const isNl = lang === 'nl';
    return (
        <motion.div whileHover={{ y: -4 }} className="group bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <h4 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-1 group-hover:text-[#c9a961] transition-colors">
                {isNl ? treatment.name.nl : treatment.name.en}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {isNl ? treatment.shortDesc.nl : treatment.shortDesc.en}
            </p>
            <Link
                to={`/behandelingen/${treatment.slug}`}
                className="inline-flex items-center gap-2 text-[#c9a961] font-medium text-sm"
            >
                {isNl ? 'Meer info' : 'More info'} <ArrowRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
}

export function TreatmentDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const isNl = lang === 'nl';

    const treatment = slug ? getTreatmentBySlug(slug) : undefined;

    if (!treatment) {
        return <Navigate to="/behandelingen" replace />;
    }

    const related = getTreatmentsByCategory(treatment.category)
        .filter((t) => t.slug !== treatment.slug)
        .slice(0, 3);

    const name = isNl ? treatment.name.nl : treatment.name.en;
    const categoryLabel = isNl ? treatment.categoryLabel.nl : treatment.categoryLabel.en;
    const description = isNl ? treatment.description.nl : treatment.description.en;
    const details = isNl ? treatment.details.nl : treatment.details.en;

    const benefits = isNl
        ? ['BIG-geregistreerde specialist', 'Natuurlijke resultaten', 'Persoonlijk consult', 'Veilige behandelomgeving', 'Gratis nazorg', 'Eerlijk advies']
        : ['BIG-registered specialist', 'Natural results', 'Personal consultation', 'Safe treatment environment', 'Free aftercare', 'Honest advice'];

    return (
        <div className="pt-20">
            <Breadcrumbs />
            {/* Hero */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center gap-2 mb-6">
                                <Link to="/behandelingen" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#c9a961] transition-colors">
                                    {isNl ? 'Behandelingen' : 'Treatments'}
                                </Link>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-[#c9a961] font-medium">{categoryLabel}</span>
                            </div>
                            <span className="inline-block px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">
                                {categoryLabel}
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6 leading-tight">
                                {name}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    {isNl ? 'Afspraak maken' : 'Book appointment'} <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="tel:+31638604547"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#1a1a2e] dark:border-white/30 text-[#1a1a2e] dark:text-white font-semibold rounded-full hover:bg-[#1a1a2e] hover:text-white dark:hover:bg-white dark:hover:text-[#0f0f1a] transition-all"
                                >
                                    <Phone className="w-5 h-5" /> {isNl ? 'Bel direct' : 'Call us'}
                                </a>
                            </div>
                        </motion.div>

                        {/* Image or decorative element */}
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block">
                            {treatment.image ? (
                                <div className="relative">
                                    <img
                                        src={treatment.image}
                                        alt={name}
                                        className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    <div className="hidden w-full h-[500px] bg-gradient-to-br from-[#c9a961]/20 via-[#e8d5c4]/30 to-[#d4a574]/20 rounded-2xl flex items-center justify-center">
                                        <Sparkles className="w-20 h-20 text-[#c9a961]/40" />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-[500px] bg-gradient-to-br from-[#c9a961]/10 via-[#e8d5c4]/20 to-[#d4a574]/10 dark:from-[#c9a961]/5 dark:via-[#1a1a2e] dark:to-[#c9a961]/5 rounded-2xl flex items-center justify-center shadow-2xl border border-[#c9a961]/10">
                                    <div className="text-center">
                                        <Sparkles className="w-20 h-20 text-[#c9a961]/30 mx-auto mb-4" />
                                        <p className="text-[#c9a961]/50 font-serif text-xl">{name}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 bg-white dark:bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="prose dark:prose-invert max-w-none">
                            {details.map((paragraph, index) => (
                                <p key={index} className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Why Choose Us */}
                        <div className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-8 shadow-lg mt-12">
                            <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
                                {isNl ? 'Waarom kiezen voor Injection Queen?' : 'Why choose Injection Queen?'}
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {benefits.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#c9a961]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-[#c9a961]" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pricing */}
                        {treatment.prices.length > 0 && (
                            <div className="bg-[#c9a961]/10 rounded-2xl p-8 mt-8">
                                <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
                                    {isNl ? 'Tarieven' : 'Prices'}
                                </h3>
                                <div className="space-y-0">
                                    {treatment.prices.map((price, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-between py-4 ${index < treatment.prices.length - 1 ? 'border-b border-[#c9a961]/20' : ''
                                                }`}
                                        >
                                            <div>
                                                <span className="text-gray-700 dark:text-gray-300">{price.name}</span>
                                                {price.note && (
                                                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-0.5">{price.note}</span>
                                                )}
                                            </div>
                                            <span className="font-bold text-[#c9a961] text-lg">{price.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                    {isNl ? '* Prijzen zijn inclusief consult en nazorg' : '* Prices include consultation and aftercare'}
                                </p>
                            </div>
                        )}

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 text-center"
                        >
                            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4e] dark:from-[#1a1a2e] dark:to-[#0f0f1a] rounded-2xl p-10 shadow-xl">
                                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                                    {isNl ? 'Klaar voor jouw behandeling?' : 'Ready for your treatment?'}
                                </h3>
                                <p className="text-gray-300 mb-6">
                                    {isNl
                                        ? 'Plan een gratis consult en ontdek wat we voor jou kunnen doen.'
                                        : 'Schedule a free consultation and discover what we can do for you.'}
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    {isNl ? 'Plan gratis consult' : 'Schedule free consultation'} <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Related Treatments */}
            {related.length > 0 && (
                <section className="py-24 bg-gradient-to-b from-white via-[#faf8f5]/30 to-white dark:from-[#0f0f1a] dark:via-[#1a1a2e]/30 dark:to-[#0f0f1a]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                            <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-4">
                                {isNl ? 'Gerelateerde behandelingen' : 'Related treatments'}
                            </h2>
                        </motion.div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((t) => (
                                <RelatedCard key={t.slug} t={t} lang={lang} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
