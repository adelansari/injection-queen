import type { Treatment } from '../types';

export const prpBehandelingen: Treatment = {
    slug: 'prp-behandelingen',
    category: 'boosters',
    categorySlug: 'hair-skin-boosters',
    categoryLabel: { nl: 'Hair & Skin Booster', en: 'Hair & Skin Booster' },
    name: { nl: 'PRP Behandelingen', en: 'PRP Treatments' },
    shortDesc: { nl: 'Eigen bloedplaatjes voor verjonging', en: 'Own platelets for rejuvenation' },
    metaDescription: { nl: 'PRP (Platelet Rich Plasma) behandeling bij Injection Queen Amsterdam. Huid- en haarverjonging met je eigen bloedplaatjes.', en: 'PRP (Platelet Rich Plasma) treatment at Injection Queen Amsterdam. Skin and hair rejuvenation with your own platelets.' },
    description: {
        nl: 'PRP (Platelet Rich Plasma) maakt gebruik van je eigen bloedplaatjes om huid en haar te verjongen. Het plaatjesrijke plasma stimuleert stamcellen, collageenproductie en celvernieuwing voor natuurlijke resultaten.',
        en: 'PRP (Platelet Rich Plasma) uses your own blood platelets to rejuvenate skin and hair. The platelet-rich plasma stimulates stem cells, collagen production and cell renewal for natural results.',
    },
    details: {
        nl: [
            'Bij een PRP-behandeling wordt een kleine hoeveelheid bloed afgenomen en in een centrifuge verwerkt. Het plaatjesrijke plasma (PRP) wordt gescheiden en bevat een hoge concentratie groeifactoren die celvernieuwing en herstel stimuleren.',
            'PRP kan worden ingezet voor huidverjonging (fijne lijntjes, textuur, teint) en haargroei (dunner wordend haar, alopecia). Het plasma wordt met micro-injecties aangebracht in het behandelgebied. Omdat het lichaamseigen materiaal betreft, zijn allergische reacties vrijwel uitgesloten.',
            'Er zijn doorgaans 3 tot 4 sessies nodig met 4 weken tussenpozen. De resultaten bouwen geleidelijk op en zijn het meest zichtbaar na de volledige behandelcyclus.',
        ],
        en: [
            'During a PRP treatment, a small amount of blood is drawn and processed in a centrifuge. The platelet-rich plasma (PRP) is separated and contains a high concentration of growth factors that stimulate cell renewal and repair.',
            'PRP can be used for skin rejuvenation (fine lines, texture, complexion) and hair growth (thinning hair, alopecia). The plasma is applied with micro-injections to the treatment area. Because it uses your own body material, allergic reactions are virtually impossible.',
            'Typically 3 to 4 sessions are needed with 4-week intervals. Results build gradually and are most visible after the complete treatment cycle.',
        ],
    },
    aftercare: {
        nl: ['Vermijd intensieve sport gedurende 24 uur.', 'Vermijd directe zon gedurende een week.', 'Geen make-up gedurende 24 uur (bij gezichtsbehandeling).', 'Was uw haar niet gedurende 24 uur (bij haargroei-behandeling).'],
        en: ['Avoid intense exercise for 24 hours.', 'Avoid direct sun for one week.', 'No makeup for 24 hours (for facial treatment).', 'Do not wash your hair for 24 hours (for hair growth treatment).'],
    },
    image: '/images/treatments/hair-skin-boosters/prp-behandelingen/hero.jpg',
    duration: '30-45 min',
    resultDuration: '6-12 maanden',
};
