import type { Treatment } from '../types';

export const handfillers: Treatment = {
    slug: 'handfillers',
    category: 'fillers',
    categorySlug: 'filler-behandelingen',
    categoryLabel: { nl: 'Filler Behandeling', en: 'Filler Treatment' },
    name: { nl: 'Hand Fillers', en: 'Hand Fillers' },
    shortDesc: { nl: 'Jeugdige handen', en: 'Youthful hands' },
    metaDescription: { nl: 'Hand filler behandeling bij Injection Queen Amsterdam. Herstel verloren volume en verminder zichtbare aderen. BIG-geregistreerd.', en: 'Hand filler treatment at Injection Queen Amsterdam. Restore lost volume and reduce visible veins. BIG-registered.' },
    description: {
        nl: 'Handen verraden vaak je leeftijd het eerst. Hand fillers herstellen het verloren volume, verminderen zichtbare aderen en pezen, en geven je handen een jeugdiger, voller uiterlijk.',
        en: 'Hands often reveal your age first. Hand fillers restore lost volume, reduce visible veins and tendons, and give your hands a more youthful, fuller appearance.',
    },
    details: {
        nl: [
            'De huid op je handen is dun en verliest sneller volume dan andere gebieden. Na verloop van tijd worden aderen, pezen en botten steeds zichtbaarder. Zon, water en dagelijkse blootstelling versnellen dit verouderingsproces.',
            'Bij Injection Queen injecteren we hyaluronzuur filler in de handrug om volume te herstellen. De huid oogt voller, gladder en jeugdiger. De behandeling is snel en de resultaten zijn direct zichtbaar.',
        ],
        en: [
            'The skin on your hands is thin and loses volume faster than other areas. Over time, veins, tendons and bones become increasingly visible. Sun, water and daily exposure accelerate this aging process.',
            'At Injection Queen, we inject hyaluronic acid filler into the back of the hand to restore volume. The skin looks fuller, smoother and more youthful. Treatment is quick and results are immediately visible.',
        ],
    },
    aftercare: {
        nl: ['Vermijd intensieve handbewegingen gedurende 24 uur.', 'Niet roken en geen alcohol gedurende 24 uur.', 'Beperkte blootstelling aan de zon gedurende 2 weken.', 'Geen sauna gedurende 2 weken.'],
        en: ['Avoid intense hand movements for 24 hours.', 'No smoking or alcohol for 24 hours.', 'Limited sun exposure for 2 weeks.', 'No sauna for 2 weeks.'],
    },
    image: '/images/treatments/filler-behandelingen/handfillers/hero.jpg',
    duration: '15-20 min',
    resultDuration: '6-12 maanden',
};
