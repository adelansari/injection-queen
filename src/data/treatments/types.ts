export interface FAQ {
    question: { nl: string; en: string };
    answer: { nl: string; en: string };
}

export interface TreatmentStep {
    title: { nl: string; en: string };
    description: { nl: string; en: string };
}

export interface Treatment {
    slug: string;
    category: 'botox' | 'fillers' | 'boosters' | 'fat-dissolving';
    categorySlug: string;
    categoryLabel: { nl: string; en: string };
    name: { nl: string; en: string };
    shortDesc: { nl: string; en: string };
    description: { nl: string; en: string };
    metaDescription?: { nl: string; en: string };
    details: { nl: string[]; en: string[] };
    steps?: TreatmentStep[];
    faq?: FAQ[];
    aftercare: { nl: string[]; en: string[] };
    image?: string;
    duration?: string;
    resultDuration?: string;
}

export const categorySlugs: Record<Treatment['category'], string> = {
    botox: 'botox',
    fillers: 'filler-behandelingen',
    boosters: 'hair-skin-boosters',
    'fat-dissolving': 'fat-dissolving',
};

export const categoryNames: Record<Treatment['category'], { nl: string; en: string }> = {
    botox: { nl: 'Botox', en: 'Botox' },
    fillers: { nl: 'Fillers', en: 'Fillers' },
    boosters: { nl: 'Hair & Skin Boosters', en: 'Hair & Skin Boosters' },
    'fat-dissolving': { nl: 'Fat Dissolving', en: 'Fat Dissolving' },
};

export const categoryDescriptions: Record<Treatment['category'], { nl: string; en: string }> = {
    botox: {
        nl: 'Botox is een merknaam voor botulinetoxine, een stof die tijdelijk de spieractiviteit vermindert. Door kleine hoeveelheden in specifieke spieren te injecteren, ontspannen deze zich en worden rimpels zichtbaar verzacht.',
        en: 'Botox is a brand name for botulinum toxin, a substance that temporarily reduces muscle activity. By injecting small amounts into specific muscles, they relax and wrinkles are visibly softened.',
    },
    fillers: {
        nl: 'Fillers zijn injecteerbare gels op basis van hyaluronzuur, een lichaamseigen stof die helpt om de huid te hydrateren en volume te geven. Ze worden gebruikt om rimpels te verzachten en gezichtscontouren te verbeteren.',
        en: 'Fillers are injectable gels based on hyaluronic acid, a naturally occurring substance that helps hydrate the skin and provide volume. They are used to soften wrinkles and improve facial contours.',
    },
    boosters: {
        nl: 'Hair & Skin boosters pakken huidveroudering en haarverlies aan bij de kern. In plaats van tijdelijk opvullen, werken ze aan structurele verbetering van de huid of hoofdhuid van binnenuit.',
        en: 'Hair & Skin boosters address skin aging and hair loss at the core. Instead of temporary filling, they work on structural improvement of the skin or scalp from within.',
    },
    'fat-dissolving': {
        nl: 'Fat dissolving behandelingen verminderen hardnekkig vet op specifieke zones zonder chirurgische ingreep. De vetcellen worden permanent vernietigd voor een blijvend resultaat.',
        en: 'Fat dissolving treatments reduce stubborn fat in specific areas without surgery. The fat cells are permanently destroyed for lasting results.',
    },
};
