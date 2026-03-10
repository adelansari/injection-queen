import type { Treatment } from '../types';

export const gummysmile: Treatment = {
    slug: 'gummysmile',
    category: 'botox',
    categorySlug: 'botox',
    categoryLabel: { nl: 'Botox Behandeling', en: 'Botox Treatment' },
    name: { nl: 'Gummy Smile', en: 'Gummy Smile' },
    shortDesc: { nl: 'Evenwichtiger lach', en: 'More balanced smile' },
    metaDescription: {
        nl: 'Gummy smile Botox behandeling bij Injection Queen Amsterdam. Minder tandvlees zichtbaar bij het lachen. Natuurlijk resultaat. Boek nu.',
        en: 'Gummy smile Botox treatment at Injection Queen Amsterdam. Less gum visible when smiling. Natural result. Book now.',
    },
    description: {
        nl: 'Bij een gummy smile is er te veel tandvlees zichtbaar als je lacht. Door de spier die je bovenlip te ver optilt te ontspannen met Botox, creëren we een elegantere, evenwichtiger lach.',
        en: 'With a gummy smile, too much gum is visible when you smile. By relaxing the muscle that lifts your upper lip too high with Botox, we create a more elegant, balanced smile.',
    },
    details: {
        nl: [
            'Een gummy smile ontstaat doordat de levator labii superioris — de spier die je bovenlip optilt — overactief is. Bij het lachen komt hierdoor meer tandvlees bloot dan esthetisch gewenst. Veel mensen ervaren dit als storend bij het praten, lachen of op foto\'s.',
            'Met een kleine, gerichte hoeveelheid Botox ontspannen we deze spier, waardoor je bovenlip bij het lachen minder hoog optilt. Het resultaat is een mooiere, gebalanceerde glimlach. De behandeling is snel, vrijwel pijnloos en duurt maximaal 10 minuten. Het effect houdt 3 tot 6 maanden aan.',
        ],
        en: [
            'A gummy smile occurs because the levator labii superioris — the muscle that lifts your upper lip — is overactive. When smiling, this exposes more gum than aesthetically desired. Many people find this bothersome when talking, laughing or in photos.',
            'With a small, targeted amount of Botox, we relax this muscle so your upper lip lifts less high when smiling. The result is a more beautiful, balanced smile. Treatment is quick, virtually painless and takes a maximum of 10 minutes. The effect lasts 3 to 6 months.',
        ],
    },
    aftercare: {
        nl: ['Vermijd de eerste 4 uur platliggen en bukken.', 'Niet roken, geen alcohol, en geen lichaamsbeweging gedurende de eerste 24 uur.', 'Blijf 2 weken uit de zon en vermijd zonnebanken.', 'Geen sauna, spa of hammam gedurende 2 weken.'],
        en: ['Avoid lying flat or bending for the first 4 hours.', 'No smoking, alcohol or intense exercise for 24 hours.', 'Stay out of the sun and avoid tanning beds for 2 weeks.', 'No sauna, spa or hammam for 2 weeks.'],
    },
    image: '/images/treatments/botox/gummysmile/hero.jpg',
    duration: '10 min',
    resultDuration: '3-6 maanden',
};
