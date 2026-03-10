import type { Treatment } from '../types';

export const xlHair: Treatment = {
    slug: 'xl-hair',
    category: 'boosters',
    categorySlug: 'hair-skin-boosters',
    categoryLabel: { nl: 'Hair & Skin Booster', en: 'Hair & Skin Booster' },
    name: { nl: 'XL Hair', en: 'XL Hair' },
    shortDesc: { nl: 'Intensieve haargroei-stimulatie', en: 'Intensive hair growth stimulation' },
    metaDescription: { nl: 'XL Hair behandeling bij Injection Queen Amsterdam. Intensieve haargroei-stimulatie met peptiden en groeifactoren.', en: 'XL Hair treatment at Injection Queen Amsterdam. Intensive hair growth stimulation with peptides and growth factors.' },
    description: {
        nl: 'XL Hair is een geavanceerde haargroei-behandeling die peptiden en groeifactoren combineert om dunner wordend haar te versterken en nieuwe haargroei te stimuleren.',
        en: 'XL Hair is an advanced hair growth treatment combining peptides and growth factors to strengthen thinning hair and stimulate new hair growth.',
    },
    details: {
        nl: [
            'XL Hair is een gespecialiseerde behandeling voor haarverlies en dunner wordend haar. Door een combinatie van groeifactoren, peptiden en voedingsstoffen direct in de hoofdhuid te injecteren, worden de haarfollikels van binnenuit gevoed en gestimuleerd.',
            'De behandeling is geschikt voor mannen en vrouwen met diffuus haarverlies, androgenetische alopecia of stressgebonden haarverlies. Een kuur van 4 tot 6 sessies wordt aanbevolen, met 2 tot 4 weken ertussen.',
        ],
        en: [
            'XL Hair is a specialized treatment for hair loss and thinning hair. By injecting a combination of growth factors, peptides and nutrients directly into the scalp, the hair follicles are nourished and stimulated from within.',
            'Treatment is suitable for men and women with diffuse hair loss, androgenetic alopecia or stress-related hair loss. A course of 4 to 6 sessions is recommended, with 2 to 4 weeks between them.',
        ],
    },
    aftercare: {
        nl: ['Vermijd intensieve sport gedurende 24 uur.', 'Was uw haar niet gedurende 24 uur.', 'Vermijd directe zon op de hoofdhuid.'],
        en: ['Avoid intense exercise for 24 hours.', 'Do not wash your hair for 24 hours.', 'Avoid direct sun on the scalp.'],
    },
    image: '/images/treatments/hair-skin-boosters/xl-hair/hero.jpg',
    duration: '30-45 min',
    resultDuration: '6-12 maanden',
};
