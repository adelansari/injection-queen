import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Phone, Sparkles, Syringe, Droplets, Scissors, ChevronDown, HelpCircle } from 'lucide-react';
import { treatments, categorySlugs, categoryNames, categoryDescriptions, type Treatment } from '../../data/treatments/index';
import { Breadcrumbs } from '../../components/Breadcrumbs';

// ── Category page content ──────────────────────────────────────────

interface CategoryContent {
    heroImage: string;
    intro: { nl: string[]; en: string[] };
    suitability: { nl: string[]; en: string[] };
    steps: Array<{ title: { nl: string; en: string }; description: { nl: string; en: string } }>;
    faq: Array<{ question: { nl: string; en: string }; answer: { nl: string; en: string } }>;
}

const categoryContent: Record<string, CategoryContent> = {
    botox: {
        heroImage: '/images/treatments/botox/fronsrimpels/hero.jpg',
        intro: {
            nl: [
                'Botox is een merknaam voor botuline toxine, een stof die tijdelijk de spieractiviteit vermindert. Door kleine hoeveelheden in specifieke spieren te injecteren, ontspannen deze zich. Hierdoor worden rimpels die ontstaan door herhaalde spierbewegingen – zoals fronsen of lachen – zichtbaar verzacht.',
                'De werking is tijdelijk en houdt meestal drie tot zes maanden aan. Botox wordt voornamelijk gebruikt voor cosmetische doeleinden, maar kent ook medische toepassingen, zoals bij overmatig zweten of spanningshoofdpijn. Bij correct gebruik blijft je mimiek behouden, terwijl je gezicht een uitgeruste en frissere uitstraling krijgt.',
            ],
            en: [
                'Botox is a brand name for botulinum toxin, a substance that temporarily reduces muscle activity. By injecting small amounts into specific muscles, they relax. This visibly softens wrinkles caused by repeated muscle movements — such as frowning or laughing.',
                'The effect is temporary and usually lasts three to six months. Botox is primarily used for cosmetic purposes, but also has medical applications, such as for excessive sweating or tension headaches. With correct use, your facial expressions are preserved, while your face gets a well-rested, fresher appearance.',
            ],
        },
        suitability: {
            nl: [
                'Botox is geschikt voor mensen die zich storen aan lijntjes of rimpels die ontstaan door spierspanning.',
                'Denk aan een frons die een boze uitstraling geeft, een voorhoofd met diepe lijnen of kraaienpootjes rond de ogen.',
                'Maar ook bij heel andere klachten, zoals overmatig zweten of migraine, kan Botox effectief zijn.',
                'Het resultaat is tijdelijk en omkeerbaar, waardoor het ook geschikt is voor wie voor het eerst kennismaakt met cosmetische behandelingen.',
            ],
            en: [
                'Botox is suitable for people who are bothered by lines or wrinkles caused by muscle tension.',
                'Think of a frown that gives an angry appearance, a forehead with deep lines, or crow\'s feet around the eyes.',
                'But Botox can also be effective for completely different complaints, such as excessive sweating or migraines.',
                'The result is temporary and reversible, making it suitable for those new to cosmetic treatments.',
            ],
        },
        steps: [
            { title: { nl: 'Intake en analyse', en: 'Intake and analysis' }, description: { nl: 'We starten met een persoonlijk gesprek. Er wordt gekeken naar je mimiek, spierspanning en de gebieden die je wilt behandelen. Op basis daarvan wordt een behandelplan opgesteld.', en: 'We start with a personal conversation. We look at your facial expressions, muscle tension and the areas you want to treat. Based on this, a treatment plan is drawn up.' } },
            { title: { nl: 'Voorbereiding van de huid', en: 'Skin preparation' }, description: { nl: 'De huid wordt gereinigd en indien nodig verdoofd met een verkoelende gel of crème. Dit maakt de behandeling comfortabeler.', en: 'The skin is cleaned and if necessary numbed with a cooling gel or cream. This makes the treatment more comfortable.' } },
            { title: { nl: 'Injectie met Botox', en: 'Botox injection' }, description: { nl: 'Met een fijne naald wordt de Botox op specifieke punten in de spier geïnjecteerd. De behandeling duurt meestal tussen de 10 en 20 minuten.', en: 'Using a fine needle, the Botox is injected at specific points in the muscle. The treatment usually takes between 10 and 20 minutes.' } },
            { title: { nl: 'Advies en nazorg', en: 'Advice and aftercare' }, description: { nl: 'Na de behandeling krijg je uitleg over wat je de eerste uren beter kunt vermijden. Je kunt direct weer door met je dag.', en: 'After the treatment you receive advice on what to avoid in the first hours. You can continue with your day immediately.' } },
        ],
        faq: [
            { question: { nl: 'Is Botox veilig?', en: 'Is Botox safe?' }, answer: { nl: 'Ja. Botox is wereldwijd een van de meest onderzochte en toegepaste medische behandelingen. Bij Injection Queen werken we uitsluitend met goedgekeurde A-merken en volgen we medische protocollen.', en: 'Yes. Botox is one of the most researched and applied medical treatments worldwide. At Injection Queen we work exclusively with approved A-brands and follow medical protocols.' } },
            { question: { nl: 'Wordt Botox altijd uitgevoerd door een arts?', en: 'Is Botox always performed by a doctor?' }, answer: { nl: 'Ja, bij Injection Queen worden Botoxbehandelingen uitsluitend uitgevoerd door een BIG-geregistreerde behandelaar met ervaring in cosmetische geneeskunde.', en: 'Yes, at Injection Queen, Botox treatments are performed exclusively by a BIG-registered practitioner with experience in cosmetic medicine.' } },
            { question: { nl: 'Hoelang blijft het resultaat van Botox zichtbaar?', en: 'How long does the Botox result last?' }, answer: { nl: 'Gemiddeld blijft het resultaat 3 tot 4 maanden zichtbaar. Dit kan variëren per persoon, afhankelijk van je stofwisseling, spieractiviteit en leefstijl.', en: 'On average, the result remains visible for 3 to 4 months. This can vary per person, depending on your metabolism, muscle activity and lifestyle.' } },
            { question: { nl: 'Doet een Botoxbehandeling pijn?', en: 'Does a Botox treatment hurt?' }, answer: { nl: 'Nee, de meeste cliënten ervaren slechts een licht prikje. We gebruiken fijne naaldjes en desgewenst een verdovende crème.', en: 'No, most clients only experience a slight prick. We use fine needles and numbing cream if desired.' } },
            { question: { nl: 'Kan ik nog natuurlijk lachen na Botox?', en: 'Can I still smile naturally after Botox?' }, answer: { nl: 'Ja, onze stijl is gericht op subtiele, verfijnde resultaten. Het doel is om je expressie te verzachten, niet te blokkeren.', en: 'Yes, our style focuses on subtle, refined results. The goal is to soften your expression, not block it.' } },
            { question: { nl: 'Wat is het verschil tussen Botox en fillers?', en: 'What is the difference between Botox and fillers?' }, answer: { nl: 'Botox ontspant de spieren die rimpels veroorzaken, terwijl fillers volume terugbrengen of contouren verbeteren. Ze worden vaak gecombineerd.', en: 'Botox relaxes the muscles that cause wrinkles, while fillers restore volume or improve contours. They are often combined.' } },
            { question: { nl: 'Wanneer zie ik resultaat?', en: 'When will I see results?' }, answer: { nl: 'Het effect wordt zichtbaar na ongeveer 2 tot 5 dagen. Na 10 tot 14 dagen is het uiteindelijke resultaat bereikt.', en: 'The effect becomes visible after about 2 to 5 days. After 10 to 14 days, the final result is achieved.' } },
            { question: { nl: 'Kan ik direct weer aan het werk?', en: 'Can I go back to work immediately?' }, answer: { nl: 'Ja. Botox is een non-invasieve behandeling zonder hersteltijd. Je kunt na de behandeling vrijwel meteen je dag vervolgen.', en: 'Yes. Botox is a non-invasive treatment without recovery time. You can continue your day almost immediately after treatment.' } },
        ],
    },
    'filler-behandelingen': {
        heroImage: '/images/treatments/filler-behandelingen/lip-fillers/hero.jpg',
        intro: {
            nl: [
                'Fillers zijn injecteerbare gels op basis van hyaluronzuur, een lichaamseigen stof die helpt om de huid te hydrateren en volume te geven. Ze worden gebruikt om rimpels te verzachten, gezichtscontouren te verbeteren of bepaalde zones zoals de lippen, kaaklijn of jukbeenderen, subtiel te accentueren.',
                'De meeste fillers zijn tijdelijk en worden op natuurlijke wijze door het lichaam afgebroken. Dat maakt de behandeling veilig en omkeerbaar. Het doel is nooit een ander gezicht, maar een frissere versie van jezelf. Mits goed uitgevoerd, blijft het resultaat natuurlijk en in harmonie met jouw unieke uitstraling.',
            ],
            en: [
                'Fillers are injectable gels based on hyaluronic acid, a naturally occurring substance that helps hydrate the skin and provide volume. They are used to soften wrinkles, improve facial contours or subtly accentuate certain areas such as the lips, jawline or cheekbones.',
                'Most fillers are temporary and are naturally broken down by the body. This makes the treatment safe and reversible. The goal is never a different face, but a fresher version of yourself. When properly performed, the result remains natural and in harmony with your unique appearance.',
            ],
        },
        suitability: {
            nl: [
                'Fillers zijn geschikt voor wie zich stoort aan volumeverlies, fijne lijnen of verzakte gezichtscontouren.',
                'Je bent een goede kandidaat als je volume mist in je lippen, wangen of kaaklijn.',
                'Of als je rimpels of schaduwen zachter wilt maken, er vermoeid uitziet terwijl je je fit voelt.',
                'De behandeling is tijdelijk en veilig, ideaal voor wie op zoek is naar een natuurlijk resultaat zonder drastische ingreep.',
            ],
            en: [
                'Fillers are suitable for those who are bothered by volume loss, fine lines or sagging facial contours.',
                'You are a good candidate if you miss volume in your lips, cheeks or jawline.',
                'Or if you want to soften wrinkles or shadows, look tired while feeling fit.',
                'The treatment is temporary and safe, ideal for those looking for a natural result without drastic intervention.',
            ],
        },
        steps: [
            { title: { nl: 'Consult en analyse', en: 'Consultation and analysis' }, description: { nl: 'We bespreken je wensen, analyseren je gezicht en adviseren over de meest geschikte aanpak. Je krijgt uitleg over de techniek, het product en het te verwachten resultaat.', en: 'We discuss your wishes, analyze your face and advise on the most suitable approach. You receive explanation about the technique, product and expected result.' } },
            { title: { nl: 'Voorbereiding', en: 'Preparation' }, description: { nl: 'De huid wordt gereinigd en desgewenst verdoofd met een verdovende crème. Hierdoor is de behandeling goed te verdragen.', en: 'The skin is cleaned and numbed with cream if desired. This makes the treatment well tolerable.' } },
            { title: { nl: 'Injecteren van de filler', en: 'Injecting the filler' }, description: { nl: 'Met een fijne naald of canule wordt de filler nauwkeurig ingebracht in de juiste huidlaag. Afhankelijk van het gebied duurt dit ongeveer 20 tot 45 minuten.', en: 'Using a fine needle or cannula, the filler is precisely introduced into the correct skin layer. Depending on the area, this takes about 20 to 45 minutes.' } },
            { title: { nl: 'Controle en nazorgadvies', en: 'Check and aftercare advice' }, description: { nl: 'Na de behandeling bekijken we het resultaat en krijg je instructies mee voor de nazorg. Eventuele zwelling of blauwe plekjes verdwijnen meestal binnen enkele dagen.', en: 'After treatment, we review the result and provide aftercare instructions. Any swelling or bruising usually disappears within a few days.' } },
        ],
        faq: [
            { question: { nl: 'Zijn fillers veilig?', en: 'Are fillers safe?' }, answer: { nl: 'Ja. We werken uitsluitend met hyaluronzuur-fillers van gerenommeerde, medisch gecertificeerde A-merken. Deze zijn biologisch afbreekbaar en worden wereldwijd veilig toegepast.', en: 'Yes. We work exclusively with hyaluronic acid fillers from renowned, medically certified A-brands. These are biodegradable and safely applied worldwide.' } },
            { question: { nl: 'Wie voert de fillerbehandeling uit?', en: 'Who performs the filler treatment?' }, answer: { nl: 'Bij Injection Queen worden alle behandelingen uitgevoerd door een BIG-geregistreerde behandelaar met ruime ervaring in cosmetische geneeskunde.', en: 'At Injection Queen, all treatments are performed by a BIG-registered practitioner with extensive experience in cosmetic medicine.' } },
            { question: { nl: 'Hoelang blijven fillers zichtbaar?', en: 'How long do fillers last?' }, answer: { nl: 'Afhankelijk van het type filler en het behandelde gebied blijft het resultaat meestal 6 tot 18 maanden zichtbaar.', en: 'Depending on the type of filler and the treated area, the result usually remains visible for 6 to 18 months.' } },
            { question: { nl: 'Doet een fillerbehandeling pijn?', en: 'Does a filler treatment hurt?' }, answer: { nl: 'Nee, de meeste cliënten ervaren slechts lichte druk of een kort prikje. We gebruiken fijne naaldjes of canules en desgewenst verdoving.', en: 'No, most clients only experience slight pressure or a brief prick. We use fine needles or cannulas and numbing if desired.' } },
            { question: { nl: 'Ga ik er onnatuurlijk uitzien?', en: 'Will I look unnatural?' }, answer: { nl: 'Niet bij ons. We streven altijd naar subtiele, verfijnde resultaten die passen bij jouw gezicht. Je blijft jezelf, alleen frisser en in balans.', en: 'Not with us. We always strive for subtle, refined results that suit your face. You stay yourself, just fresher and in balance.' } },
            { question: { nl: 'Kan ik fillers combineren met andere behandelingen?', en: 'Can I combine fillers with other treatments?' }, answer: { nl: 'Ja. Fillers worden vaak gecombineerd met Botox of skin boosters voor een meer allround resultaat.', en: 'Yes. Fillers are often combined with Botox or skin boosters for a more all-round result.' } },
            { question: { nl: 'Wanneer zie ik resultaat?', en: 'When will I see results?' }, answer: { nl: 'Het resultaat is meestal direct zichtbaar, al kan er tijdelijk lichte zwelling of roodheid optreden. Na enkele dagen is het eindresultaat goed te beoordelen.', en: 'The result is usually immediately visible, although temporary slight swelling or redness may occur. After a few days, the final result can be properly assessed.' } },
            { question: { nl: 'Is er een hersteltijd?', en: 'Is there recovery time?' }, answer: { nl: 'Nee, de meeste cliënten kunnen direct hun dag vervolgen. Wel kunnen er kleine blauwe plekjes of zwelling optreden die binnen enkele dagen wegtrekken.', en: 'No, most clients can continue their day immediately. Small bruises or swelling may occur but disappear within a few days.' } },
        ],
    },
    'hair-skin-boosters': {
        heroImage: '/images/treatments/hair-skin-boosters/profhilo/hero.jpg',
        intro: {
            nl: [
                'Naarmate we ouder worden, neemt de natuurlijke aanmaak van collageen, elastine en hyaluronzuur af. Dat merk je aan een doffere huid, fijne lijntjes of haar dat dunner wordt. Hair & Skin boosters pakken deze processen aan bij de kern, zonder dat je hoeft te kiezen voor ingrijpende ingrepen.',
                'Wat deze behandelingen bijzonder maakt, is hun subtiele maar effectieve werking van binnenuit. In plaats van tijdelijk opvullen, werken ze aan structurele verbetering van de huid of hoofdhuid. Zo kies je voor langdurige kwaliteit, met een natuurlijk resultaat dat past bij wie je bent.',
            ],
            en: [
                'As we age, the natural production of collagen, elastin, and hyaluronic acid decreases. You notice this through duller skin, fine lines, or thinning hair. Hair & Skin boosters address these processes at their core, without requiring invasive procedures.',
                'What makes these treatments special is their subtle yet effective action from within. Instead of temporary filling, they work on structural improvement of the skin or scalp. This way you choose lasting quality, with a natural result that suits who you are.',
            ],
        },
        suitability: {
            nl: [
                'Hair & Skin boosters zijn geschikt voor wie de huidkwaliteit van binnenuit wil verbeteren.',
                'Ideaal bij verlies van elasticiteit, een doffe of verouderde huid, of dunner wordend haar.',
                'De behandelingen stimuleren je eigen herstelprocessen voor een natuurlijk, langdurig resultaat.',
                'Geschikt als op zichzelf staande behandeling of in combinatie met Botox of fillers.',
            ],
            en: [
                'Hair & Skin boosters are suitable for those who want to improve skin quality from within.',
                'Ideal for loss of elasticity, dull or aging skin, or thinning hair.',
                'The treatments stimulate your own repair processes for a natural, long-lasting result.',
                'Suitable as a standalone treatment or in combination with Botox or fillers.',
            ],
        },
        steps: [
            { title: { nl: 'Consult', en: 'Consultation' }, description: { nl: 'We bespreken je wensen, beoordelen je huid- of haarconditie en adviseren welke booster het beste bij jou past.', en: 'We discuss your wishes, assess your skin or hair condition and advise which booster suits you best.' } },
            { title: { nl: 'Voorbereiding', en: 'Preparation' }, description: { nl: 'De huid wordt gereinigd en desgewenst verdoofd. We tekenen de behandelzones af voor een nauwkeurig resultaat.', en: 'The skin is cleaned and numbed if desired. We mark the treatment zones for an accurate result.' } },
            { title: { nl: 'Behandeling', en: 'Treatment' }, description: { nl: 'De booster wordt met fijne injecties aangebracht op de specifieke punten. De behandeling duurt gemiddeld 15-30 minuten.', en: 'The booster is applied with fine injections at specific points. Treatment typically takes 15-30 minutes.' } },
            { title: { nl: 'Nazorg', en: 'Aftercare' }, description: { nl: 'Je ontvangt nazorginstructies en we plannen eventuele vervolgbehandelingen. Het resultaat bouwt zich geleidelijk op.', en: 'You receive aftercare instructions and we schedule any follow-up treatments. The result builds up gradually.' } },
        ],
        faq: [
            { question: { nl: 'Wat is het verschil met fillers?', en: 'What is the difference with fillers?' }, answer: { nl: 'Boosters voegen geen volume toe maar verbeteren de huidkwaliteit van binnenuit door collageen- en elastineproductie te stimuleren.', en: 'Boosters don\'t add volume but improve skin quality from within by stimulating collagen and elastin production.' } },
            { question: { nl: 'Hoeveel behandelingen zijn nodig?', en: 'How many treatments are needed?' }, answer: { nl: 'Dit verschilt per booster. Gemiddeld zijn 2-4 sessies nodig voor optimaal resultaat. Tijdens het consult bespreken we een persoonlijk behandelplan.', en: 'This varies per booster. On average 2-4 sessions are needed for optimal results. During the consultation we discuss a personal treatment plan.' } },
            { question: { nl: 'Zijn boosters pijnlijk?', en: 'Are boosters painful?' }, answer: { nl: 'De meeste cliënten ervaren minimaal ongemak. We gebruiken fijne naalden en verdoving voor maximaal comfort.', en: 'Most clients experience minimal discomfort. We use fine needles and numbing for maximum comfort.' } },
            { question: { nl: 'Kan ik boosters combineren met andere behandelingen?', en: 'Can I combine boosters with other treatments?' }, answer: { nl: 'Ja, boosters worden vaak gecombineerd met Botox of fillers voor een compleet verjonging programma.', en: 'Yes, boosters are often combined with Botox or fillers for a complete rejuvenation program.' } },
        ],
    },
    'fat-dissolving': {
        heroImage: '/images/treatments/fat-dissolving/lemon-bottle/hero.jpg',
        intro: {
            nl: [
                'Fat dissolving behandelingen bieden een niet-chirurgische oplossing voor hardnekkige vetophopingen die niet reageren op dieet en beweging. Door middel van gerichte injecties worden vetcellen in specifieke zones afgebroken en op natuurlijke wijze door het lichaam afgevoerd.',
                'De behandelingen zijn veilig, effectief en vereisen geen hersteltijd. De vetcellen die worden behandeld, worden permanent vernietigd — ze keren niet terug. Dit maakt fat dissolving ideaal voor wie gericht vet wil verminderen op plekken zoals de onderkin, kaaklijn of buikzone, zonder chirurgische ingreep.',
            ],
            en: [
                'Fat dissolving treatments offer a non-surgical solution for stubborn fat deposits that don\'t respond to diet and exercise. Through targeted injections, fat cells in specific zones are broken down and naturally eliminated by the body.',
                'The treatments are safe, effective and require no recovery time. The treated fat cells are permanently destroyed — they do not return. This makes fat dissolving ideal for those who want to reduce targeted fat in areas such as the double chin, jawline or belly zone, without surgery.',
            ],
        },
        suitability: {
            nl: [
                'Fat dissolving behandelingen zijn geschikt voor wie lokale vetophopingen wil verminderen die niet reageren op sport en voeding.',
                'Ideaal voor zones zoals de onderkin, kaaklijn en onderbuik.',
                'Het is geen methode voor algeheel gewichtsverlies, maar voor gerichte contouring.',
                'Een stabiele leefstijl is belangrijk om het resultaat langdurig te behouden.',
            ],
            en: [
                'Fat dissolving treatments are suitable for those who want to reduce localized fat deposits that don\'t respond to exercise and nutrition.',
                'Ideal for zones such as the double chin, jawline and lower belly.',
                'It is not a method for overall weight loss, but for targeted contouring.',
                'A stable lifestyle is important to maintain long-lasting results.',
            ],
        },
        steps: [
            { title: { nl: 'Consult en beoordeling', en: 'Consultation and assessment' }, description: { nl: 'We bespreken je doelen, beoordelen het behandelgebied en stellen een persoonlijk behandelplan op met een realistische verwachting.', en: 'We discuss your goals, assess the treatment area and create a personal treatment plan with realistic expectations.' } },
            { title: { nl: 'Markering en voorbereiding', en: 'Marking and preparation' }, description: { nl: 'De huid wordt gereinigd en het te behandelen gebied precies afgetekend voor nauwkeurige injecties.', en: 'The skin is cleaned and the area to be treated is precisely marked for accurate injections.' } },
            { title: { nl: 'Injectiebehandeling', en: 'Injection treatment' }, description: { nl: 'De vetoplossende vloeistof wordt met kleine injecties in het vetweefsel geplaatst. De behandeling duurt meestal 15-30 minuten.', en: 'The fat-dissolving solution is placed in the fat tissue with small injections. Treatment usually takes 15-30 minutes.' } },
            { title: { nl: 'Nazorg en vervolg', en: 'Aftercare and follow-up' }, description: { nl: 'Je ontvangt nazorgadvies en we plannen indien nodig een vervolgbehandeling. Het lichaam voert de afgebroken vetcellen geleidelijk af.', en: 'You receive aftercare advice and we schedule a follow-up treatment if needed. The body gradually eliminates the broken-down fat cells.' } },
        ],
        faq: [
            { question: { nl: 'Is fat dissolving veilig?', en: 'Is fat dissolving safe?' }, answer: { nl: 'Ja, de behandelingen zijn veilig wanneer ze worden uitgevoerd door een ervaren BIG-geregistreerde behandelaar. Tijdens het consult beoordelen we of je geschikt bent.', en: 'Yes, the treatments are safe when performed by an experienced BIG-registered practitioner. During the consultation we assess whether you are suitable.' } },
            { question: { nl: 'Komt het vet terug na behandeling?', en: 'Does the fat return after treatment?' }, answer: { nl: 'De behandelde vetcellen worden permanent vernietigd. Maar als je aankomt in gewicht kunnen overgebleven vetcellen in omvang toenemen. Een stabiele leefstijl is belangrijk.', en: 'The treated fat cells are permanently destroyed. But if you gain weight, remaining fat cells can increase in size. A stable lifestyle is important.' } },
            { question: { nl: 'Hoeveel behandelingen zijn nodig?', en: 'How many treatments are needed?' }, answer: { nl: 'Dit hangt af van de dikte van het vetweefsel en het gewenste resultaat. Meestal zijn 2-4 sessies nodig met een interval van 2-4 weken.', en: 'This depends on the thickness of the fat tissue and the desired result. Usually 2-4 sessions are needed at intervals of 2-4 weeks.' } },
            { question: { nl: 'Is fat dissolving hetzelfde als liposuctie?', en: 'Is fat dissolving the same as liposuction?' }, answer: { nl: 'Nee. Fat dissolving is niet-chirurgisch en bedoeld voor kleinere, lokale vetophopingen. Het vervangt geen liposuctie bij grotere vetophopingen.', en: 'No. Fat dissolving is non-surgical and intended for smaller, localized fat deposits. It does not replace liposuction for larger fat accumulations.' } },
        ],
    },
};

const categoryIcons: Record<string, typeof Sparkles> = {
    botox: Syringe,
    'filler-behandelingen': Droplets,
    'hair-skin-boosters': Sparkles,
    'fat-dissolving': Scissors,
};

// ── FAQ Component ──────────────────────────────────────────────────

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
            className="border border-gray-200 dark:border-gray-700/50 rounded-xl overflow-hidden"
        >
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <span className="font-medium text-[#1a1a2e] dark:text-white pr-4">{question}</span>
                <ChevronDown className={`w-5 h-5 text-[#c9a961] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ── Main Component ─────────────────────────────────────────────────

export function CategoryDetail() {
    const { category } = useParams<{ category: string }>();
    const { i18n } = useTranslation();
    const isNl = i18n.language === 'nl';

    // Find which internal category this slug maps to
    const internalCategory = Object.entries(categorySlugs).find(([, slug]) => slug === category)?.[0] as Treatment['category'] | undefined;

    if (!category || !categoryContent[category] || !internalCategory) {
        return <Navigate to="/behandelingen" replace />;
    }

    const content = categoryContent[category];
    const catName = isNl ? categoryNames[internalCategory].nl : categoryNames[internalCategory].en;
    const catTreatments = treatments.filter((t) => t.category === internalCategory);
    const Icon = categoryIcons[category] || Sparkles;

    return (
        <div className="pt-20">
            <Breadcrumbs />

            {/* Hero */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-[#faf8f5] via-white to-[#e8d5c4]/30 dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#1a1a2e]/50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#c9a961]/10 text-[#c9a961] text-sm font-medium rounded-full mb-4">
                                <Icon className="w-4 h-4" /> {isNl ? 'Behandelingen' : 'Treatments'}
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6 leading-tight">
                                {catName}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {isNl ? categoryDescriptions[internalCategory].nl : categoryDescriptions[internalCategory].en}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105">
                                    {isNl ? 'Gratis consult' : 'Free consultation'} <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a href="tel:+31638604547" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#1a1a2e] dark:border-white/30 text-[#1a1a2e] dark:text-white font-semibold rounded-full hover:bg-[#1a1a2e] hover:text-white dark:hover:bg-white dark:hover:text-[#0f0f1a] transition-all">
                                    <Phone className="w-5 h-5" /> {isNl ? 'Bel direct' : 'Call us'}
                                </a>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block">
                            <img src={content.heroImage} alt={catName} className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                            />
                            <div className="hidden w-full h-[500px] bg-gradient-to-br from-[#c9a961]/10 via-[#e8d5c4]/20 to-[#d4a574]/10 rounded-2xl flex items-center justify-center shadow-2xl border border-[#c9a961]/10">
                                <Icon className="w-20 h-20 text-[#c9a961]/30" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Intro Content */}
            <section className="py-24 bg-white dark:bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-8">
                            {isNl ? `Wat ${category === 'botox' ? 'is' : 'zijn'} ${catName}?` : `What ${category === 'botox' ? 'is' : 'are'} ${catName}?`}
                        </h2>
                        <div className="space-y-6">
                            {(isNl ? content.intro.nl : content.intro.en).map((p, i) => (
                                <p key={i} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{p}</p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Suitability */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
                        <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-6">
                            {isNl ? `Voor wie ${category === 'botox' ? 'is' : 'zijn'} ${catName} geschikt?` : `Who ${category === 'botox' ? 'is' : 'are'} ${catName} suitable for?`}
                        </h3>
                        <div className="bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl p-8 shadow-lg">
                            <ul className="space-y-4">
                                {(isNl ? content.suitability.nl : content.suitability.en).map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-[#c9a961]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-[#c9a961]" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* All Treatments in Category */}
            <section className="py-24 bg-gradient-to-b from-white via-[#faf8f5]/30 to-white dark:from-[#0f0f1a] dark:via-[#1a1a2e]/30 dark:to-[#0f0f1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-4">
                            {isNl ? `Onze ${catName} behandelingen` : `Our ${catName} treatments`}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {isNl ? 'Ontdek welke behandeling het beste bij jou past.' : 'Discover which treatment suits you best.'}
                        </p>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {catTreatments.map((treatment, index) => (
                            <motion.div key={treatment.slug} whileHover={{ y: -4 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                                className="group bg-gradient-to-br from-[#faf8f5] to-white dark:from-[#1a1a2e] dark:to-[#1a1a2e]/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                            >
                                {treatment.image && (
                                    <div className="aspect-video overflow-hidden">
                                        <img src={treatment.image} alt={isNl ? treatment.name.nl : treatment.name.en}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="w-10 h-10 bg-[#c9a961]/10 rounded-xl flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-[#c9a961]" />
                                        </div>
                                        {treatment.duration && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{treatment.duration}</span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-1 group-hover:text-[#c9a961] transition-colors">
                                        {isNl ? treatment.name.nl : treatment.name.en}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        {isNl ? treatment.shortDesc.nl : treatment.shortDesc.en}
                                    </p>
                                    <Link to={`/behandelingen/${treatment.categorySlug}/${treatment.slug}`}
                                        className="inline-flex items-center gap-2 text-[#c9a961] font-medium text-sm"
                                    >
                                        {isNl ? 'Meer informatie' : 'More info'} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="py-24 bg-white dark:bg-[#0f0f1a]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-8">
                            {isNl ? 'Het behandelproces stap voor stap' : 'The treatment process step by step'}
                        </h2>
                        <div className="space-y-6">
                            {content.steps.map((step, index) => (
                                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-[#c9a961] rounded-full flex items-center justify-center text-white font-bold text-sm">{index + 1}</div>
                                    <div>
                                        <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-1">{isNl ? step.title.nl : step.title.en}</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{isNl ? step.description.nl : step.description.en}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pricing link */}
                    <div className="bg-[#c9a961]/10 rounded-2xl p-8 mt-12 text-center">
                        <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white mb-3">
                            {isNl ? 'Tarieven' : 'Pricing'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {isNl ? 'Bekijk onze actuele tarieven voor alle behandelingen op onze prijzenpagina.' : 'View our current pricing for all treatments on our pricing page.'}
                        </p>
                        <Link to="/prijzen" className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105">
                            {isNl ? 'Bekijk tarieven' : 'View pricing'} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* FAQ */}
                    {content.faq.length > 0 && (
                        <div className="mt-12">
                            <div className="flex items-center gap-3 mb-6">
                                <HelpCircle className="w-6 h-6 text-[#c9a961]" />
                                <h3 className="text-2xl font-serif font-bold text-[#1a1a2e] dark:text-white">
                                    {isNl ? 'Veelgestelde vragen' : 'Frequently Asked Questions'}
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {content.faq.map((faqItem, index) => (
                                    <FAQItem key={index} index={index} question={isNl ? faqItem.question.nl : faqItem.question.en} answer={isNl ? faqItem.answer.nl : faqItem.answer.en} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
                        <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4e] dark:from-[#1a1a2e] dark:to-[#0f0f1a] rounded-2xl p-10 shadow-xl">
                            <h3 className="text-2xl font-serif font-bold text-white mb-3">
                                {isNl ? 'Klaar om te beginnen?' : 'Ready to start?'}
                            </h3>
                            <p className="text-gray-300 mb-6">
                                {isNl ? 'Plan een gratis consult en ontdek wat we voor jou kunnen doen.' : 'Schedule a free consultation and discover what we can do for you.'}
                            </p>
                            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b8944f] text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105">
                                {isNl ? 'Plan gratis consult' : 'Schedule free consultation'} <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
