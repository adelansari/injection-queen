import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Phone, Sparkles, ChevronRight, ChevronDown, Clock, CalendarCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { getTreatmentByCategoryAndSlug, getTreatmentsByCategory, type Treatment } from '../../data/treatments/index';
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
                to={`/behandelingen/${treatment.categorySlug}/${treatment.slug}`}
                className="inline-flex items-center gap-2 text-[#c9a961] font-medium text-sm"
            >
                {isNl ? 'Meer info' : 'More info'} <ArrowRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border border-gray-200 dark:border-gray-700/50 rounded-xl overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
                <span className="font-medium text-[#1a1a2e] dark:text-white pr-4">{question}</span>
                <ChevronDown className={`w-5 h-5 text-[#c9a961] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function TreatmentDetail() {
    const { category, slug } = useParams<{ category: string; slug: string }>();
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const isNl = lang === 'nl';

    const treatment = category && slug ? getTreatmentByCategoryAndSlug(category, slug) : undefined;

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
                            {/* Duration badges */}
                            {(treatment.duration || treatment.resultDuration) && (
                                <div className="flex flex-wrap gap-4 mt-6">
                                    {treatment.duration && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e]/5 dark:bg-white/5 rounded-full">
                                            <Clock className="w-4 h-4 text-[#c9a961]" />
                                            <span className="text-sm text-gray-600 dark:text-gray-300">{isNl ? 'Behandelduur' : 'Duration'}: <strong>{treatment.duration}</strong></span>
                                        </div>
                                    )}
                                    {treatment.resultDuration && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e]/5 dark:bg-white/5 rounded-full">
                                            <CalendarCheck className="w-4 h-4 text-[#c9a961]" />
                                            <span className="text-sm text-gray-600 dark:text-gray-300">{isNl ? 'Resultaat' : 'Result'}: <strong>{treatment.resultDuration}</strong></span>
                                        </div>
                                    )}
                                </div>
                            )}
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

                        {/* Treatment Steps */}
                        {treatment.steps && treatment.steps.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-8">
                                    {isNl ? 'Het behandelproces' : 'Treatment Process'}
                                </h3>
                                <div className="space-y-6">
                                    {treatment.steps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-4"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 bg-[#c9a961] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-1">
                                                    {isNl ? step.title.nl : step.title.en}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    {isNl ? step.description.nl : step.description.en}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

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

                        {/* Pricing link */}
                        <div className="bg-[#c9a961]/10 rounded-2xl p-8 mt-8 text-center">
                            <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-3">
                                {isNl ? 'Tarieven' : 'Pricing'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {isNl
                                    ? 'Bekijk onze actuele tarieven voor alle behandelingen op onze prijzenpagina.'
                                    : 'View our current pricing for all treatments on our pricing page.'}
                            </p>
                            <Link
                                to="/prijzen"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                {isNl ? 'Bekijk tarieven' : 'View pricing'} <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Aftercare */}
                        {treatment.aftercare && treatment.aftercare[isNl ? 'nl' : 'en'].length > 0 && (
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-[#1a1a2e] dark:to-[#1a1a2e]/80 rounded-2xl p-8 mt-8 border border-amber-200/50 dark:border-[#c9a961]/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertCircle className="w-6 h-6 text-[#c9a961]" />
                                    <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white">
                                        {isNl ? 'Nazorginstructies' : 'Aftercare Instructions'}
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {(isNl ? treatment.aftercare.nl : treatment.aftercare.en).map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-[#c9a961]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3.5 h-3.5 text-[#c9a961]" />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* FAQ Section */}
                        {treatment.faq && treatment.faq.length > 0 && (
                            <div className="mt-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <HelpCircle className="w-6 h-6 text-[#c9a961]" />
                                    <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white">
                                        {isNl ? 'Veelgestelde vragen' : 'Frequently Asked Questions'}
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    {treatment.faq.map((faqItem, index) => (
                                        <FAQItem
                                            key={index}
                                            index={index}
                                            question={isNl ? faqItem.question.nl : faqItem.question.en}
                                            answer={isNl ? faqItem.answer.nl : faqItem.answer.en}
                                        />
                                    ))}
                                </div>
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
