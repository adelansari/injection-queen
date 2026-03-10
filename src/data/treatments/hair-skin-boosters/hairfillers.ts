import type { Treatment } from '../types';

export const hairfillers: Treatment = {
    slug: 'hairfillers',
    category: 'boosters',
    categorySlug: 'hair-skin-boosters',
    categoryLabel: { nl: 'Hair & Skin Booster', en: 'Hair & Skin Booster' },
    name: { nl: 'Hair Fillers', en: 'Hair Fillers' },
    shortDesc: { nl: 'Dikker, voller haar', en: 'Thicker, fuller hair' },
    metaDescription: { nl: 'Hair filler behandeling bij Injection Queen Amsterdam. Stimuleer haargroei en verdikking met peptide-injecties. BIG-geregistreerd.', en: 'Hair filler treatment at Injection Queen Amsterdam. Stimulate hair growth and thickening with peptide injections. BIG-registered.' },
    description: {
        nl: 'Hair fillers zijn injecteerbare behandelingen die de hoofdhuid stimuleren om nieuw haar te groeien en bestaand haar dikker te maken. Ideaal bij dunner wordend haar en beginnende kaalheid.',
        en: 'Hair fillers are injectable treatments that stimulate the scalp to grow new hair and thicken existing hair. Ideal for thinning hair and early baldness.',
    },
    details: {
        nl: [
            'Hair fillers bevatten een combinatie van peptiden, hyaluronzuur en voedingsstoffen die direct in de hoofdhuid worden geïnjecteerd. Dit stimuleert de bloedcirculatie, voedt de haarfollikels en versterkt de haarschacht van binnenuit.',
            'De behandeling is geschikt voor zowel mannen als vrouwen die te maken hebben met diffuse haarverlies, dunner wordend haar of postpartum haarverlies. Er zijn meestal 4 tot 6 sessies nodig met 2 tot 3 weken ertussen voor een optimaal resultaat.',
        ],
        en: [
            'Hair fillers contain a combination of peptides, hyaluronic acid and nutrients injected directly into the scalp. This stimulates blood circulation, nourishes hair follicles and strengthens the hair shaft from within.',
            'Treatment is suitable for both men and women dealing with diffuse hair loss, thinning hair or postpartum hair loss. Usually 4 to 6 sessions are needed with 2 to 3 weeks between them for optimal results.',
        ],
    },
    aftercare: {
        nl: ['Vermijd intensieve sport gedurende 24 uur.', 'Was uw haar niet gedurende 24 uur.', 'Vermijd directe zon op de hoofdhuid gedurende een week.'],
        en: ['Avoid intense exercise for 24 hours.', 'Do not wash your hair for 24 hours.', 'Avoid direct sun on the scalp for one week.'],
    },
    image: '/images/treatments/hair-skin-boosters/hairfillers/hero.jpg',
    duration: '30-45 min',
    resultDuration: '6-12 maanden',
};
