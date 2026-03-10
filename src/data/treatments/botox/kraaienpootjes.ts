import type { Treatment } from '../types';

export const kraaienpootjes: Treatment = {
    slug: 'kraaienpootjes',
    category: 'botox',
    categorySlug: 'botox',
    categoryLabel: { nl: 'Botox Behandeling', en: 'Botox Treatment' },
    name: { nl: 'Kraaienpootjes', en: "Crow's Feet" },
    shortDesc: { nl: 'Jeugdige, frisse oogopslag', en: 'Youthful, fresh eye area' },
    metaDescription: {
        nl: 'Kraaienpootjes Botox behandeling bij Injection Queen Amsterdam. Orbicularis oculi ontspannen voor frissere ogen. BIG-geregistreerd. Boek nu.',
        en: "Crow's feet Botox treatment at Injection Queen Amsterdam. Relax the orbicularis oculi for fresher eyes. BIG-registered. Book now.",
    },
    description: {
        nl: 'Kraaienpootjes zijn de fijne lijntjes aan de buitenhoeken van je ogen die zichtbaar worden bij lachen of gluren. Bij Injection Queen behandelen we ze met precisie-Botox voor een frissere, jongere oogopslag.',
        en: "Crow's feet are the fine lines at the outer corners of your eyes that become visible when smiling or squinting. At Injection Queen, we treat them with precision Botox for a fresher, younger eye area.",
    },
    details: {
        nl: [
            'De huid rond je ogen is het dunste ter plekke van je gezicht. Elke lach, frons en opgetrokken wenkbrauw draagt bij aan fijne plooitjes in de ooghoeken. Naarmate de productie van collageen en elastine afneemt, worden deze lijntjes steeds permanenter. UV-straling, slaapgebrek en een ongezond dieet versnellen dit proces.',
            'De kraaienpootjes Botox-behandeling bij Injection Queen richt zich op de orbicularis oculi — de ringspier rond het oog. Door deze spier gecontroleerd te ontspannen, worden de lijntjes zachter en oogt het ooggebied frisser, zonder dat je gezichtsuitdrukking onnatuurlijk wordt.',
            'De behandeling duurt circa 10 tot 20 minuten inclusief consult. Na 3-4 dagen zie je de eerste resultaten, het volledige effect na 14 dagen. Het effect houdt 3 tot 6 maanden aan en duurt bij herhaling steeds langer.',
        ],
        en: [
            'The skin around your eyes is the thinnest on your face. Every smile, frown and raised eyebrow contributes to fine creases at the eye corners. As collagen and elastin production decreases, these lines become increasingly permanent. UV radiation, lack of sleep and an unhealthy diet accelerate this process.',
            "The crow's feet Botox treatment at Injection Queen targets the orbicularis oculi — the ring muscle around the eye. By relaxing this muscle in a controlled manner, the lines soften and the eye area looks fresher, without making your facial expression unnatural.",
            'Treatment takes approximately 10 to 20 minutes including consultation. You will see initial results after 3-4 days, full effect after 14 days. The effect lasts 3 to 6 months and lasts progressively longer with repeat treatments.',
        ],
    },
    steps: [
        { title: { nl: 'Consult', en: 'Consultation' }, description: { nl: 'Analyse van de lijntjes rond je ogen en bespreking van je wensen.', en: 'Analysis of the lines around your eyes and discussion of your wishes.' } },
        { title: { nl: 'Voorbereiding', en: 'Preparation' }, description: { nl: 'Reiniging van het behandelgebied en eventueel verdovende crème.', en: 'Cleaning the treatment area and optional numbing cream.' } },
        { title: { nl: 'Injectie', en: 'Injection' }, description: { nl: 'Gerichte injecties in de orbicularis oculi spier.', en: 'Targeted injections into the orbicularis oculi muscle.' } },
        { title: { nl: 'Nazorg', en: 'Aftercare' }, description: { nl: 'Beoordeling en nazorginstructies.', en: 'Assessment and aftercare instructions.' } },
    ],
    aftercare: {
        nl: ['Vermijd de eerste 4 uur platliggen en bukken.', 'Niet roken, geen alcohol, en geen lichaamsbeweging gedurende de eerste 24 uur.', 'Blijf 2 weken uit de zon en vermijd zonnebanken.', 'Geen sauna, spa of hammam gedurende 2 weken.', 'Geen gezichtsbehandelingen (laser, peeling) gedurende 2 weken.'],
        en: ['Avoid lying flat or bending for the first 4 hours.', 'No smoking, alcohol or intense exercise for 24 hours.', 'Stay out of the sun and avoid tanning beds for 2 weeks.', 'No sauna, spa or hammam for 2 weeks.', 'No facial treatments (laser, peeling) for 2 weeks.'],
    },
    image: '/images/treatments/botox/kraaienpootjes/hero.jpg',
    duration: '10-20 min',
    resultDuration: '3-6 maanden',
};
