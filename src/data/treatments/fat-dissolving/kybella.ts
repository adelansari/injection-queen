import type { Treatment } from '../types';

export const kybella: Treatment = {
    slug: 'kybella',
    category: 'fat-dissolving',
    categorySlug: 'fat-dissolving',
    categoryLabel: { nl: 'Fat Dissolving', en: 'Fat Dissolving' },
    name: { nl: 'Kybella (Belkyra)', en: 'Kybella (Belkyra)' },
    shortDesc: { nl: 'Dubbele kin verminderen', en: 'Reduce double chin' },
    metaDescription: { nl: 'Kybella (Belkyra) behandeling bij Injection Queen Amsterdam. FDA-goedgekeurde dubbele kin behandeling met deoxycholzuur.', en: 'Kybella (Belkyra) treatment at Injection Queen Amsterdam. FDA-approved double chin treatment with deoxycholic acid.' },
    description: {
        nl: 'Kybella (Belkyra) is een FDA-goedgekeurd injecteerbaar middel op basis van deoxycholzuur dat submentaal vet (dubbele kin) permanent vernietigt. De gouden standaard voor niet-chirurgische dubbele kin-reductie.',
        en: 'Kybella (Belkyra) is an FDA-approved injectable based on deoxycholic acid that permanently destroys submental fat (double chin). The gold standard for non-surgical double chin reduction.',
    },
    details: {
        nl: [
            'Kybella bevat synthetisch deoxycholzuur, een stof die het lichaam van nature gebruikt om voedingsvetten af te breken. Wanneer het in het submentale vetdepot wordt geïnjecteerd, vernietigt het de vetcelmembraan, waardoor de vetcellen permanent worden verwijderd.',
            'In tegenstelling tot liposuctie is Kybella volledig niet-chirurgisch. Na de behandeling verwerkt het lymfatisch systeem de vernietigde vetcellen. De vetcellen komen niet meer terug, waardoor het resultaat permanent is. Er zijn doorgaans 2 tot 4 sessies nodig, afhankelijk van de hoeveelheid vet.',
            'Kybella is specifiek ontworpen voor submentaal vet (de zone onder de kin). Het is de enige FDA-goedgekeurde injecteerbare behandeling voor dit gebied. Na behandeling kan er zwelling, gevoeligheid en lichte verdoving optreden, die in 1-2 weken verdwijnen.',
        ],
        en: [
            'Kybella contains synthetic deoxycholic acid, a substance the body naturally uses to break down dietary fats. When injected into the submental fat deposit, it destroys the fat cell membrane, permanently eliminating the fat cells.',
            'Unlike liposuction, Kybella is completely non-surgical. After treatment, the lymphatic system processes the destroyed fat cells. The fat cells do not return, making the result permanent. Usually 2 to 4 sessions are needed, depending on the amount of fat.',
            'Kybella is specifically designed for submental fat (the area under the chin). It is the only FDA-approved injectable treatment for this area. After treatment, swelling, sensitivity and slight numbness may occur, which disappear within 1-2 weeks.',
        ],
    },
    aftercare: {
        nl: ['Koeling toepassen op het behandelde gebied indien nodig.', 'Vermijd intensieve sport gedurende 48 uur.', 'Vermijd alcohol gedurende 48 uur.', 'Slaap met het hoofd licht verhoogd de eerste nacht.', 'Draag geen strakke kleding rond de kin/hals.'],
        en: ['Apply cooling to the treated area if needed.', 'Avoid intense exercise for 48 hours.', 'Avoid alcohol for 48 hours.', 'Sleep with your head slightly elevated the first night.', 'Do not wear tight clothing around the chin/neck.'],
    },
    image: '/images/treatments/fat-dissolving/kybella/hero.jpg',
    duration: '15-20 min',
    resultDuration: 'Permanent',
};
