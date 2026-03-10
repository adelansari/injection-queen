export interface TreatmentPrice {
    name: string;
    price: string;
    note?: string;
}

export interface Treatment {
    slug: string;
    category: 'botox' | 'fillers' | 'boosters' | 'fat-dissolving';
    categoryLabel: { nl: string; en: string };
    name: { nl: string; en: string };
    shortDesc: { nl: string; en: string };
    description: { nl: string; en: string };
    details: { nl: string[]; en: string[] };
    prices: TreatmentPrice[];
    image?: string;
}

const botoxCategory = { nl: 'Botox Behandeling', en: 'Botox Treatment' };
const fillersCategory = { nl: 'Filler Behandeling', en: 'Filler Treatment' };
const boostersCategory = { nl: 'Hair & Skin Boosters', en: 'Hair & Skin Boosters' };
const fatCategory = { nl: 'Fat Dissolving', en: 'Fat Dissolving' };

export const treatments: Treatment[] = [
    // ===== BOTOX =====
    {
        slug: 'fronsrimpels',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Fronsrimpels', en: 'Frown Lines' },
        shortDesc: { nl: 'Glad voorhoofd', en: 'Smooth forehead' },
        description: {
            nl: 'Fronsrimpels zijn de verticale lijnen tussen je wenkbrauwen die ontstaan door herhaald fronsen. Met Botox ontspannen we de spieren zodat deze rimpels zichtbaar verminderen.',
            en: 'Frown lines are the vertical lines between your eyebrows caused by repeated frowning. With Botox, we relax the muscles to visibly reduce these wrinkles.',
        },
        details: {
            nl: [
                'Fronsrimpels geven je gezicht vaak een boze of vermoeide uitdrukking, terwijl je dat helemaal niet bent. Door de spieren tussen je wenkbrauwen te ontspannen met een gerichte Botox-injectie, wordt je blik zachter en frisser.',
                'Bij Injection Queen behandelen we met precisie en oog voor balans. We zorgen ervoor dat je gezicht er ontspannen uitziet zonder dat je mimiek verdwijnt.',
            ],
            en: [
                'Frown lines often give your face an angry or tired expression, even when you don\'t feel that way. By relaxing the muscles between your eyebrows with targeted Botox injections, your expression becomes softer and fresher.',
                'At Injection Queen, we treat with precision and an eye for balance. We ensure your face looks relaxed without losing your natural expression.',
            ],
        },
        prices: [{ name: 'Frons', price: '€119,00' }, { name: 'Botox 3 zones', price: '€269,00' }],
    },
    {
        slug: 'voorhoofdrimpels',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Voorhoofdrimpels', en: 'Forehead Wrinkles' },
        shortDesc: { nl: 'Verfrissende uitstraling', en: 'Refreshed appearance' },
        description: {
            nl: 'Heb je last van voorhoofdrimpels wanneer je je wenkbrauwen optrekt? De oplossing is te vinden in de voorhoofdrimpels Botox-behandeling bij Injection Queen.',
            en: 'Do you suffer from forehead wrinkles when raising your eyebrows? The solution can be found in the forehead wrinkles Botox treatment at Injection Queen.',
        },
        details: {
            nl: [
                'Voorhoofdrimpels zijn een veelvoorkomend verschijnsel en treffen bijna iedereen op een bepaald moment. Onze Botox-behandeling is speciaal ontwikkeld om deze rimpels aan te pakken en je een gladde, jeugdige uitstraling te geven.',
                'Bij Injection Queen begrijpen we dat elke persoon uniek is, en daarom passen we onze behandelingen aan om ervoor te zorgen dat je je natuurlijke expressie behoudt terwijl we de zichtbaarheid van deze rimpels verminderen.',
            ],
            en: [
                'Forehead wrinkles are a common phenomenon that affects almost everyone at some point. Our Botox treatment is specially designed to address these wrinkles and give you a smooth, youthful appearance.',
                'At Injection Queen, we understand that each person is unique, which is why we customize treatments to ensure you maintain your natural expression while reducing wrinkle visibility.',
            ],
        },
        prices: [{ name: 'Voorhoofd', price: '€119,00' }, { name: 'Frons en voorhoofd', price: '€179,00' }, { name: 'Botox 3 zones', price: '€269,00' }],
        image: '/images/blog/close-up-beautician-hands-protective-gloves-making-injection-female-forehead-scaled.jpg',
    },
    {
        slug: 'kraaienpootjes',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Kraaienpootjes', en: "Crow's Feet" },
        shortDesc: { nl: 'Jeugdige oogopslag', en: 'Youthful eye area' },
        description: {
            nl: 'Kraaienpootjes zijn de fijne lijntjes die rond je ogen verschijnen, vooral als je lacht. Met Botox kunnen we deze lijntjes effectief verminderen.',
            en: "Crow's feet are the fine lines that appear around your eyes, especially when you smile. With Botox, we can effectively reduce these lines.",
        },
        details: {
            nl: [
                'De huid rondom de ogen is zeer dun en kwetsbaar, waardoor rimpels hier snel zichtbaar worden. Door de spieren rondom je ogen te ontspannen met Botox, worden kraaienpootjes zachter en krijg je een frissere, jongere uitstraling.',
                'Onze behandeling is subtiel en nauwkeurig, zodat je lach natuurlijk blijft maar de rimpels verminderen.',
            ],
            en: [
                'The skin around the eyes is very thin and delicate, making wrinkles quickly visible. By relaxing the muscles around your eyes with Botox, crow\'s feet soften and you get a fresher, younger appearance.',
                'Our treatment is subtle and precise, so your smile stays natural while wrinkles diminish.',
            ],
        },
        prices: [{ name: 'Kraaienpootjes', price: '€119,00' }, { name: 'Botox 3 zones', price: '€269,00' }],
        image: '/images/blog/Behandeling-cosmetisch-kraaienpootjes-1.jpg',
    },
    {
        slug: 'faceslimming-tandenknarsen',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Faceslimming / Tandenknarsen', en: 'Face Slimming / Teeth Grinding' },
        shortDesc: { nl: 'Slanker gelaat', en: 'Slimmer face' },
        description: {
            nl: 'Faceslimming Botox vermindert de kaakspier, waardoor je gelaat slanker wordt. Tevens helpt het bij tandenknarsen (bruxisme).',
            en: 'Face slimming Botox reduces the jaw muscle, making your face slimmer. It also helps with teeth grinding (bruxism).',
        },
        details: {
            nl: [
                'Een brede kaaklijn kan ontstaan door overactieve kaakspieren. Door Botox in de masseter (kaakspier) te injecteren, ontspant de spier en wordt je gezicht geleidelijk slanker.',
                'Deze behandeling is ook uiterst effectief bij tandenknarsen. Door de spier te ontspannen, vermindert de druk op je tanden en kaken, wat klachten als hoofdpijn en kaakpijn kan verhelpen.',
            ],
            en: [
                'A wide jawline can result from overactive jaw muscles. By injecting Botox into the masseter (jaw muscle), the muscle relaxes and your face gradually becomes slimmer.',
                'This treatment is also highly effective for teeth grinding. By relaxing the muscle, pressure on your teeth and jaws decreases, which can relieve complaints such as headaches and jaw pain.',
            ],
        },
        prices: [{ name: 'Faceslimming/Tandenknarsen', price: '€249,00' }],
    },
    {
        slug: 'overmatig-transpireren-oksels',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Overmatig transpireren', en: 'Excessive Sweating' },
        shortDesc: { nl: 'Droog en comfortabel', en: 'Dry and comfortable' },
        description: {
            nl: 'Last van overmatig zweten? Botox-injecties in de oksels of handen blokkeren de zweetklieren tijdelijk voor langdurig comfort.',
            en: 'Suffering from excessive sweating? Botox injections in the armpits or hands temporarily block sweat glands for lasting comfort.',
        },
        details: {
            nl: [
                'Overmatig transpireren (hyperhidrose) kan je dagelijks leven enorm beïnvloeden. Botox biedt een effectieve oplossing door de zenuwen die zweetklieren activeren tijdelijk te blokkeren.',
                'Het resultaat houdt gemiddeld 6 tot 9 maanden aan. De behandeling is snel, vrijwel pijnloos en je kunt direct je dagelijkse activiteiten hervatten.',
            ],
            en: [
                'Excessive sweating (hyperhidrosis) can enormously impact your daily life. Botox offers an effective solution by temporarily blocking the nerves that activate sweat glands.',
                'Results last on average 6 to 9 months. The treatment is quick, virtually painless, and you can immediately resume your daily activities.',
            ],
        },
        prices: [{ name: 'Oksels', price: '€319,00' }, { name: 'Handen', price: '€349,00' }],
    },
    {
        slug: 'browlift',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Browlift', en: 'Brow Lift' },
        shortDesc: { nl: 'Open blik', en: 'Open look' },
        description: {
            nl: 'Een Botox browlift tilt de wenkbrauwen subtiel op voor een frissere, meer open blik zonder chirurgische ingreep.',
            en: 'A Botox brow lift subtly lifts the eyebrows for a fresher, more open look without surgery.',
        },
        details: {
            nl: [
                'Met de jaren kunnen je wenkbrauwen zakken, waardoor je er vermoeid kunt uitzien. Door zorgvuldig geplaatste Botox-injecties trekken de opheffende spieren de wenkbrauwen subtiel omhoog.',
                'Het resultaat is een alertere, frissere blik die je hele gezicht opent. De behandeling is snel en het effect is direct zichtbaar.',
            ],
            en: [
                'Over the years, your eyebrows can droop, making you look tired. With carefully placed Botox injections, the lifting muscles subtly raise the eyebrows.',
                'The result is a more alert, fresher look that opens up your entire face. The treatment is quick and the effect is immediately visible.',
            ],
        },
        prices: [{ name: 'Browlift', price: '€119,00' }],
    },
    {
        slug: 'mondhoeken',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Mondhoeken', en: 'Mouth Corners' },
        shortDesc: { nl: 'Vrolijkere uitdrukking', en: 'Happier expression' },
        description: {
            nl: 'Hangende mondhoeken geven een verdrietige of vermoeide uitdrukking. Met Botox tillen we de mondhoeken subtiel op.',
            en: 'Drooping mouth corners give a sad or tired expression. With Botox, we subtly lift the mouth corners.',
        },
        details: {
            nl: [
                'De spier die je mondhoeken naar beneden trekt (de DAO-spier) kan overactief zijn, waardoor je een sombere uitdrukking krijgt. Door deze spier te ontspannen met Botox, worden je mondhoeken subtiel opgetild.',
                'Het resultaat is een vriendelijkere, frissere uitstraling. De behandeling wordt vaak gecombineerd met fillers voor een optimaal resultaat.',
            ],
            en: [
                'The muscle that pulls your mouth corners down (the DAO muscle) can be overactive, giving you a somber expression. By relaxing this muscle with Botox, your mouth corners are subtly lifted.',
                'The result is a friendlier, fresher appearance. The treatment is often combined with fillers for optimal results.',
            ],
        },
        prices: [{ name: 'Mondhoeken', price: '€69,00' }],
    },
    {
        slug: 'lipflip',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Lipflip', en: 'Lip Flip' },
        shortDesc: { nl: 'Subtiele lipverfijning', en: 'Subtle lip refinement' },
        description: {
            nl: 'Een lipflip met Botox ontspant de spier boven je bovenlip, waardoor je lip subtiel naar buiten draait voor een voller effect zonder fillers.',
            en: 'A lip flip with Botox relaxes the muscle above your upper lip, causing it to subtly flip outward for a fuller effect without fillers.',
        },
        details: {
            nl: [
                'De lipflip is ideaal als je een subtiel voller effect wilt zonder filler. Door kleine hoeveelheden Botox in de orbicularis oris spier te injecteren, ontspant de bovenlip en draait deze licht naar buiten.',
                'Het effect is verfijnd en natuurlijk. Ideaal voor wie net dat beetje extra volume wil of als aanvulling op lipfillers.',
            ],
            en: [
                'The lip flip is ideal if you want a subtly fuller effect without filler. By injecting small amounts of Botox into the orbicularis oris muscle, the upper lip relaxes and flips slightly outward.',
                'The effect is refined and natural. Ideal for those who want just that little extra volume or as a complement to lip fillers.',
            ],
        },
        prices: [{ name: 'Lipflip', price: '€79,00' }],
    },
    {
        slug: 'gummysmile',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Gummy Smile', en: 'Gummy Smile' },
        shortDesc: { nl: 'Minder tandvlees zichtbaar', en: 'Less gum visibility' },
        description: {
            nl: 'Bij een gummy smile is er veel tandvlees zichtbaar als je lacht. Botox ontspant de spier die je bovenlip optilt, voor een evenwichtiger lach.',
            en: 'With a gummy smile, a lot of gum is visible when you smile. Botox relaxes the muscle that lifts your upper lip, for a more balanced smile.',
        },
        details: {
            nl: [
                'Een gummy smile ontstaat doordat de spier die je bovenlip optilt te sterk is. Met een kleine hoeveelheid Botox ontspannen we deze spier, waardoor je bovenlip niet meer zo ver omhoog gaat als je lacht.',
                'Het resultaat is een mooiere, evenwichtiger lach. De behandeling is snel, vrijwel pijnloos en het effect houdt drie tot zes maanden aan.',
            ],
            en: [
                'A gummy smile occurs because the muscle that lifts your upper lip is too strong. With a small amount of Botox, we relax this muscle so your upper lip no longer rises as high when you smile.',
                'The result is a more beautiful, balanced smile. The treatment is quick, virtually painless, and the effect lasts three to six months.',
            ],
        },
        prices: [{ name: 'Gummysmile', price: '€69,00' }],
    },
    {
        slug: 'kin-putjes',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Kin/Putjes Botox', en: 'Chin Dimpling Botox' },
        shortDesc: { nl: 'Gladde kin', en: 'Smooth chin' },
        description: {
            nl: 'Putjes in de kin (sinaasappelhuid) kunnen met Botox worden gladgestreken door de mentalis-spier te ontspannen.',
            en: 'Chin dimpling (orange peel skin) can be smoothed with Botox by relaxing the mentalis muscle.',
        },
        details: {
            nl: [
                'Een hobbelige of onregelmatige kin ontstaat door overactiviteit van de mentalis-spier. Door deze spier met Botox te ontspannen, wordt de huid op de kin glad en egaal.',
                'De behandeling is subtiel en wordt vaak gecombineerd met een kinfiller voor een optimaal resultaat.',
            ],
            en: [
                'A bumpy or irregular chin results from overactivity of the mentalis muscle. By relaxing this muscle with Botox, the skin on the chin becomes smooth and even.',
                'The treatment is subtle and is often combined with chin filler for optimal results.',
            ],
        },
        prices: [{ name: 'Kin/putjes Botox', price: '€69,00' }],
    },
    {
        slug: 'bunny-lines',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Bunny Lines', en: 'Bunny Lines' },
        shortDesc: { nl: 'Rimpels op neus', en: 'Nose wrinkles' },
        description: {
            nl: 'Bunny lines zijn de rimpeltjes op je neus die verschijnen als je lacht of je neus optrekt. Botox maakt deze lijntjes zachter.',
            en: 'Bunny lines are the wrinkles on your nose that appear when you smile or scrunch your nose. Botox softens these lines.',
        },
        details: {
            nl: [
                'Bunny lines ontstaan door de nasalis-spier en worden zichtbaar wanneer je je neus rimpelt of lacht. Na een Botox-behandeling in het frons- of voorhoofdsgebied kunnen bunny lines soms prominenter worden als compensatie.',
                'Met een paar gerichte injecties ontspannen we de spier, waardoor de lijntjes verdwijnen en je neus gladder oogt.',
            ],
            en: [
                'Bunny lines are caused by the nasalis muscle and become visible when you wrinkle your nose or smile. After Botox treatment in the frown or forehead area, bunny lines can sometimes become more prominent as compensation.',
                'With a few targeted injections, we relax the muscle, making the lines disappear and your nose appear smoother.',
            ],
        },
        prices: [{ name: 'Bunnylines', price: '€69,00' }],
    },
    {
        slug: 'traptox-of-barbie-botox',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Traptox / Barbie Botox', en: 'Trap Tox / Barbie Botox' },
        shortDesc: { nl: 'Schouders ontspannen', en: 'Shoulder relaxation' },
        description: {
            nl: 'Traptox ontspant de trapeziusspier voor slankere schouders, een langere nek en verlichting van spanningsklachten.',
            en: 'Trap tox relaxes the trapezius muscle for slimmer shoulders, a longer neck, and relief from tension complaints.',
        },
        details: {
            nl: [
                'De trapeziusspier (trapezius) kan door stress, slechte houding of intensief sporten overontwikkeld raken. Dit kan leiden tot brede schouders, een korte nek en chronische spanning.',
                'Met Botox-injecties in de trapezius ontspannen we de spier, waardoor je schouders slanker worden en je nek langer lijkt. Bijkomend voordeel: minder spanning en hoofdpijnklachten.',
            ],
            en: [
                'The trapezius muscle can become overdeveloped due to stress, poor posture, or intensive exercise. This can lead to broad shoulders, a short neck, and chronic tension.',
                'With Botox injections in the trapezius, we relax the muscle, making your shoulders slimmer and your neck appear longer. Added benefit: less tension and headache complaints.',
            ],
        },
        prices: [{ name: 'Traptox / Barbie Botox', price: '€299,00' }],
    },
    {
        slug: 'baby-botox',
        category: 'botox',
        categoryLabel: botoxCategory,
        name: { nl: 'Baby Botox', en: 'Baby Botox' },
        shortDesc: { nl: 'Subtiel & natuurlijk', en: 'Subtle & natural' },
        description: {
            nl: 'Baby Botox is een zachte variant van Botox met lagere doseringen voor een ultranatureel resultaat met behoud van mimiek.',
            en: 'Baby Botox is a gentle variant of Botox with lower dosages for an ultra-natural result while preserving facial expression.',
        },
        details: {
            nl: [
                'Baby Botox gebruikt lagere doseringen dan een standaard Botox-behandeling. Het doel is om fijne lijntjes te verzachten terwijl je volledige mimiek behouden blijft.',
                'Ideaal voor jongere huidtypes of voor wie een heel subtiel resultaat wenst. Het effect is licht en verfijnd – perfect als eerste kennismaking met Botox.',
            ],
            en: [
                'Baby Botox uses lower dosages than a standard Botox treatment. The goal is to soften fine lines while maintaining your full facial expression.',
                'Ideal for younger skin types or for those who desire a very subtle result. The effect is light and refined – perfect as a first introduction to Botox.',
            ],
        },
        prices: [{ name: 'Brotox / Baby Botox', price: '€20,00', note: 'Per eenheid' }],
    },
    // ===== FILLERS =====
    {
        slug: 'lip-fillers',
        category: 'fillers',
        categoryLabel: fillersCategory,
        name: { nl: 'Lipfillers', en: 'Lip Fillers' },
        shortDesc: { nl: 'Natuurlijk volle lippen', en: 'Naturally full lips' },
        description: {
            nl: 'Lipfillers geven je lippen meer volume, definitie en symmetrie met hyaluronzuur. Bij Injection Queen staan natuurlijke resultaten centraal.',
            en: 'Lip fillers give your lips more volume, definition, and symmetry with hyaluronic acid. At Injection Queen, natural results are central.',
        },
        details: {
            nl: [
                'Lipfillers op basis van hyaluronzuur zijn de meest gevraagde esthetische behandeling. Of je nu subtiel volume wilt, meer definitie in je cupidsboog, of symmetrie wilt verbeteren – wij stemmen de behandeling volledig af op jouw wensen.',
                'Bij Injection Queen gebruiken we premium A-merken en werken we desgewenst met echo/ultrasound voor maximale veiligheid en nauwkeurigheid.',
            ],
            en: [
                'Hyaluronic acid lip fillers are the most requested aesthetic treatment. Whether you want subtle volume, more definition in your cupid\'s bow, or improved symmetry – we fully customize the treatment to your wishes.',
                'At Injection Queen, we use premium A-brands and optionally use echo/ultrasound for maximum safety and accuracy.',
            ],
        },
        prices: [
            { name: 'Lippen 0,5 ml', price: '€179,00' },
            { name: 'Lippen 1 ml', price: '€249,00' },
            { name: 'Signature Queen Lips 0,5 ml', price: '€229,00', note: 'Met Juvederm & echo' },
            { name: 'Signature Queen Lips 1 ml', price: '€349,00', note: 'Met Juvederm & echo' },
        ],
        image: '/images/treatments/lip-fillers.jpg',
    },
    {
        slug: 'traangoot',
        category: 'fillers',
        categoryLabel: fillersCategory,
        name: { nl: 'Traangoten', en: 'Tear Troughs' },
        shortDesc: { nl: 'Minder wallen', en: 'Reduced dark circles' },
        description: {
            nl: 'Traangoot fillers vullen de holle zone onder de ogen op, waardoor wallen en donkere kringen verminderen.',
            en: 'Tear trough fillers fill the hollow area under the eyes, reducing bags and dark circles.',
        },
        details: {
            nl: [
                'De traangoot is het gebied tussen het onderste ooglid en de wang. Wanneer hier volume verloren gaat, ontstaan er schaduwen die je er vermoeid uit laten zien.',
                'Met een lichte filler vullen we dit gebied subtiel op. Bij Injection Queen wordt deze behandeling altijd met echo/ultrasound uitgevoerd voor maximale veiligheid.',
            ],
            en: [
                'The tear trough is the area between the lower eyelid and the cheek. When volume is lost here, shadows develop that make you look tired.',
                'With a light filler, we subtly fill this area. At Injection Queen, this treatment is always performed with echo/ultrasound for maximum safety.',
            ],
        },
        prices: [{ name: 'Traangoot 1 ml', price: '€329,00' }],
    },
    {
        slug: 'kin',
        category: 'fillers',
        categoryLabel: fillersCategory,
        name: { nl: 'Kin', en: 'Chin' },
        shortDesc: { nl: 'Harmonie in gelaat', en: 'Facial harmony' },
        description: {
            nl: 'Een kinfiller brengt balans en harmonie in je gezicht door de kin te verlengen, te projecteren of te verfijnen.',
            en: 'A chin filler brings balance and harmony to your face by lengthening, projecting, or refining the chin.',
        },
        details: {
            nl: [
                'De kin speelt een belangrijke rol in de balans van je gezicht. Een terugwijkende of korte kin kan het profiel onharmonisch maken. Met hyaluronzuur filler brengen we meer projectie en definitie aan.',
                'Een kinfiller wordt vaak gecombineerd met een kaaklijnbehandeling voor een optimaal profielresultaat.',
            ],
            en: [
                'The chin plays an important role in facial balance. A receding or short chin can make the profile look unharmonious. With hyaluronic acid filler, we add more projection and definition.',
                'A chin filler is often combined with jawline treatment for optimal profile results.',
            ],
        },
        prices: [{ name: 'Kin vanaf 1 ml', price: '€249,00' }],
        image: '/images/blog/beauty-injection-woman-making-correction-her-nose-lips-salonxd-scaled.jpg',
    },
    {
        slug: 'jukbeenderen',
        category: 'fillers',
        categoryLabel: fillersCategory,
        name: { nl: 'Jukbeenderen', en: 'Cheekbones' },
        shortDesc: { nl: 'Hogere jukbeenderen', en: 'Higher cheekbones' },
        description: {
            nl: 'Jukbeenderen fillers herstellen volume en geven je gezicht een gedefinieerde, gelifde uitstraling.',
            en: 'Cheekbone fillers restore volume and give your face a defined, lifted appearance.',
        },
        details: {
            nl: [
                'Volle, goed gedefinieerde jukbeenderen worden geassocieerd met jeugdigheid en schoonheid. Met de jaren kan hier volume verloren gaan, waardoor je gezicht platter of vermoeider oogt.',
                'Met strategisch geplaatste fillers herstellen we het volume en creëren we een natuurlijke liftende werking in het middengelaat.',
            ],
            en: [
                'Full, well-defined cheekbones are associated with youthfulness and beauty. Over the years, volume can be lost here, making your face appear flatter or more tired.',
                'With strategically placed fillers, we restore volume and create a natural lifting effect in the midface.',
            ],
        },
        prices: [{ name: 'Jukbeenderen vanaf 1 ml', price: '€249,00' }],
    },
    {
        slug: 'neuslippenplooi',
        category: 'fillers',
        categoryLabel: fillersCategory,
        name: { nl: 'Neuslippenplooi', en: 'Nasolabial Folds' },
        shortDesc: { nl: 'Minder diepe plooien', en: 'Reduced deep folds' },
        description: {
            nl: 'De neuslippenplooi loopt van de neus naar de mondhoeken. Met fillers verzachten we deze lijnen voor een frissere uitstraling.',
            en: 'The nasolabial fold runs from the nose to the mouth corners. With fillers, we soften these lines for a fresher appearance.',
        },
        details: {
            nl: [
                'Neuslippen plooien worden dieper naarmate je ouder wordt door volumeverlies in de wangen. Ze kunnen je gezicht een vermoeide of oudere uitstraling geven.',
                'Met een gerichte filler-injectie vullen we de plooi op en creëren we een zachter, frisser resultaat. Dit wordt vaak gecombineerd met jukbeenderen voor een optimaal liftend effect.',
            ],
            en: [
                'Nasolabial folds deepen as you age due to volume loss in the cheeks. They can give your face a tired or older appearance.',
                'With a targeted filler injection, we fill the fold and create a softer, fresher result. This is often combined with cheekbone treatment for an optimal lifting effect.',
            ],
        },
        prices: [{ name: 'Neuslippenplooi 0,5 ml', price: '€179,00' }, { name: 'Neuslippenplooi 1 ml', price: '€249,00' }],
    },
    {
        slug: 'bovenliplijntjes',
        category: 'fillers',
        categoryLabel: fillersCategory,
        name: { nl: 'Bovenliplijntjes', en: 'Upper Lip Lines' },
        shortDesc: { nl: 'Gladde bovenlip', en: 'Smooth upper lip' },
        description: {
            nl: 'Bovenliplijntjes (rokerslijntjes) zijn verticale rimpeltjes boven de bovenlip die met filler verzacht worden.',
            en: 'Upper lip lines (smoker\'s lines) are vertical wrinkles above the upper lip that are softened with filler.',
        },
        details: {
            nl: [
                'Bovenliplijntjes ontstaan door herhaalde spierbewegingen, zon en veroudering. Ze worden ook wel rokerslijntjes of barcode-lijntjes genoemd.',
                'Met een lichte hyaluronzuur filler vullen we de lijntjes op, waardoor de bovenlip glad en jong oogt. Het resultaat is subtiel en natuurlijk.',
            ],
            en: [
                'Upper lip lines develop from repeated muscle movements, sun exposure, and aging. They are also called smoker\'s lines or barcode lines.',
                'With a light hyaluronic acid filler, we fill these lines, making the upper lip appear smooth and young. The result is subtle and natural.',
            ],
        },
        prices: [{ name: 'Bovenliplijntjes vanaf 1 ml', price: '€249,00' }],
    },
    {
        slug: 'marionetlijnen',
        category: 'fillers',
        categoryLabel: fillersCategory,
        name: { nl: 'Marionetlijnen', en: 'Marionette Lines' },
        shortDesc: { nl: 'Verfijnd ondergelaat', en: 'Refined lower face' },
        description: {
            nl: 'Marionetlijnen lopen van de mondhoeken naar de kaak. Fillers vullen deze op voor een jongere, vrolijkere uitstraling.',
            en: 'Marionette lines run from the mouth corners to the jaw. Fillers fill these for a younger, happier appearance.',
        },
        details: {
            nl: [
                'Marionetlijnen geven je gezicht een droevige of vermoeide uitdrukking. Ze ontstaan door volumeverlies en het verslappen van de huid in het onderste deel van je gezicht.',
                'Met hyaluronzuur fillers vullen we deze lijnen op en herstellen we de contouren van het ondergelaat. Dit resulteert in een frissere, vrolijkere uitstraling.',
            ],
            en: [
                'Marionette lines give your face a sad or tired expression. They develop from volume loss and skin laxity in the lower part of your face.',
                'With hyaluronic acid fillers, we fill these lines and restore the contours of the lower face. This results in a fresher, happier appearance.',
            ],
        },
        prices: [{ name: 'Mondhoeken/marionetlijnen vanaf', price: '€249,00' }],
    },
    {
        slug: 'handfillers',
        category: 'fillers',
        categoryLabel: fillersCategory,
        name: { nl: 'Hand Fillers', en: 'Hand Fillers' },
        shortDesc: { nl: 'Jeugdige handen', en: 'Youthful hands' },
        description: {
            nl: 'Handfillers herstellen verloren volume in je handen, waardoor aderen en pezen minder zichtbaar worden.',
            en: 'Hand fillers restore lost volume in your hands, making veins and tendons less visible.',
        },
        details: {
            nl: [
                'Handen verraden vaak als eerste je leeftijd. Door volumeverlies worden aderen, pezen en botten zichtbaarder, waardoor ze er ouder uitzien.',
                'Met hyaluronzuur fillers herstellen we het volume in de handruggen. Het resultaat is een jongere, vollere uitstraling van je handen.',
            ],
            en: [
                'Hands often reveal your age first. Due to volume loss, veins, tendons, and bones become more visible, making them look older.',
                'With hyaluronic acid fillers, we restore volume in the backs of the hands. The result is a younger, fuller appearance of your hands.',
            ],
        },
        prices: [{ name: 'Hand fillers vanaf 1 ml', price: '€299,00', note: 'Met echo' }],
    },
    {
        slug: 'kaaklijn',
        category: 'fillers',
        categoryLabel: fillersCategory,
        name: { nl: 'Kaaklijn', en: 'Jawline' },
        shortDesc: { nl: 'Gedefinieerde kaaklijn', en: 'Defined jawline' },
        description: {
            nl: 'Een kaaklijn filler geeft je gezicht meer structuur en een scherper profiel met hyaluronzuur.',
            en: 'A jawline filler gives your face more structure and a sharper profile with hyaluronic acid.',
        },
        details: {
            nl: [
                'Een gedefinieerde kaaklijn draagt bij aan een sterk, evenwichtig profiel. Door veroudering of genetica kan de kaaklijn minder scherp zijn.',
                'Met strategisch geplaatste fillers creëren we meer definitie en structuur langs de kaaklijn. Dit geeft je gezicht een jeugdiger, sterker uiterlijk.',
            ],
            en: [
                'A defined jawline contributes to a strong, balanced profile. Due to aging or genetics, the jawline may be less sharp.',
                'With strategically placed fillers, we create more definition and structure along the jawline. This gives your face a more youthful, stronger appearance.',
            ],
        },
        prices: [{ name: 'Kaaklijn/kaakhoek vanaf 1 ml', price: '€249,00' }],
    },
    // ===== HAIR & SKIN BOOSTERS =====
    {
        slug: 'sculptra',
        category: 'boosters',
        categoryLabel: boostersCategory,
        name: { nl: 'Sculptra', en: 'Sculptra' },
        shortDesc: { nl: 'Collageen stimulatie', en: 'Collagen stimulation' },
        description: {
            nl: 'Sculptra stimuleert je eigen collageenproductie voor een geleidelijke, natuurlijke verjonging van je huid.',
            en: 'Sculptra stimulates your own collagen production for a gradual, natural rejuvenation of your skin.',
        },
        details: {
            nl: [
                'Sculptra is geen filler, maar een bio-stimulator. Het bevat poly-L-melkzuur dat je eigen collageen aanmaak stimuleert. Het resultaat bouwt zich geleidelijk op over maanden.',
                'Een kuur bestaat uit 2-3 behandelingen. Het resultaat ziet er zeer natuurlijk uit en kan tot 2 jaar aanhouden.',
            ],
            en: [
                'Sculptra is not a filler but a bio-stimulator. It contains poly-L-lactic acid that stimulates your own collagen production. Results build gradually over months.',
                'A course consists of 2-3 treatments. Results look very natural and can last up to 2 years.',
            ],
        },
        prices: [{ name: 'Sculptra gezicht', price: '€499,00', note: 'Kuur van 2-3 behandelingen nodig' }],
    },
    {
        slug: 'profhilo',
        category: 'boosters',
        categoryLabel: boostersCategory,
        name: { nl: 'Profhilo', en: 'Profhilo' },
        shortDesc: { nl: 'Diepe hydratatie', en: 'Deep hydration' },
        description: {
            nl: 'Profhilo is een bio-remodelling behandeling die de huid van binnenuit hydrateert en verstevig.',
            en: 'Profhilo is a bio-remodelling treatment that hydrates and firms the skin from within.',
        },
        details: {
            nl: [
                'Profhilo bevat een hoge concentratie zuiver hyaluronzuur dat zich onder de huid verspreidt. Het stimuleert collageen en elastine voor een zichtbaar strakker, gehydrateerd resultaat.',
                'De behandeling bestaat uit 2 sessies met 4 weken ertussen. Het is ideaal voor het gezicht, de hals en decolleté.',
            ],
            en: [
                'Profhilo contains a high concentration of pure hyaluronic acid that spreads beneath the skin. It stimulates collagen and elastin for a visibly firmer, hydrated result.',
                'Treatment consists of 2 sessions 4 weeks apart. It is ideal for the face, neck, and décolletage.',
            ],
        },
        prices: [
            { name: 'Profhilo 1 behandeling', price: '€299,00', note: '2 ml' },
            { name: 'Profhilo 3 behandelingen', price: '€749,00', note: 'Om de 3-4 weken' },
        ],
    },
    {
        slug: 'stylage-hydromax',
        category: 'boosters',
        categoryLabel: boostersCategory,
        name: { nl: 'Stylage HydroMax', en: 'Stylage HydroMax' },
        shortDesc: { nl: 'Hydratatie boost', en: 'Hydration boost' },
        description: {
            nl: 'Stylage HydroMax is een skinbooster die de huid intensief hydrateert en de elasticiteit verbetert.',
            en: 'Stylage HydroMax is a skin booster that intensely hydrates the skin and improves elasticity.',
        },
        details: {
            nl: [
                'Stylage HydroMax combineert hyaluronzuur met antioxidanten en aminozuren voor een intensieve hydratatie van de huid. Het verbetert de huidkwaliteit, elasticiteit en uitstraling.',
                'Een kuur van 3 behandelingen geeft het beste resultaat. De behandelingen worden om de 3-4 weken uitgevoerd.',
            ],
            en: [
                'Stylage HydroMax combines hyaluronic acid with antioxidants and amino acids for intensive skin hydration. It improves skin quality, elasticity, and radiance.',
                'A course of 3 treatments gives the best results. Treatments are performed every 3-4 weeks.',
            ],
        },
        prices: [
            { name: 'Stylage HydroMax 1 behandeling', price: '€199,00' },
            { name: 'Stylage HydroMax 3 behandelingen', price: '€549,00', note: 'Om de 3-4 weken' },
        ],
    },
    {
        slug: 'hairfillers',
        category: 'boosters',
        categoryLabel: boostersCategory,
        name: { nl: 'Hair Fillers', en: 'Hair Fillers' },
        shortDesc: { nl: 'Dikker, voller haar', en: 'Thicker, fuller hair' },
        description: {
            nl: 'Hair fillers stimuleren haargroei en verbeteren de haarkwaliteit door middel van injecties in de hoofdhuid.',
            en: 'Hair fillers stimulate hair growth and improve hair quality through injections into the scalp.',
        },
        details: {
            nl: [
                'Hair fillers bevatten een peptidecomplex dat haarverlies tegengaat en haargroei stimuleert. De behandeling is geschikt voor zowel mannen als vrouwen met dunner wordend haar.',
                'Een kuur van 4 behandelingen wordt aanbevolen voor optimaal resultaat. Het haar wordt dikker, sterker en voller.',
            ],
            en: [
                'Hair fillers contain a peptide complex that counteracts hair loss and stimulates hair growth. The treatment is suitable for both men and women with thinning hair.',
                'A course of 4 treatments is recommended for optimal results. Hair becomes thicker, stronger, and fuller.',
            ],
        },
        prices: [{ name: 'Hair filler DR.CYJ 1x', price: '€249,00', note: 'Kuur van 4x nodig' }],
    },
    {
        slug: 'prp-behandelingen',
        category: 'boosters',
        categoryLabel: boostersCategory,
        name: { nl: 'PRP Behandelingen', en: 'PRP Treatments' },
        shortDesc: { nl: 'Eigen groeifactoren', en: 'Own growth factors' },
        description: {
            nl: 'PRP (Platelet Rich Plasma) gebruikt je eigen bloed om huid- en haarverjonging te stimuleren.',
            en: 'PRP (Platelet Rich Plasma) uses your own blood to stimulate skin and hair rejuvenation.',
        },
        details: {
            nl: [
                'Bij PRP wordt een kleine hoeveelheid bloed afgenomen en gecentrifugeerd om bloedplaatjesrijk plasma te verkrijgen. Dit plasma, rijk aan groeifactoren, wordt terug geïnjecteerd in de huid of hoofdhuid.',
                'PRP stimuleert celvernieuwing, collageenproductie en haargroei op een 100% natuurlijke manier – met je eigen lichaamseigen stoffen.',
            ],
            en: [
                'With PRP, a small amount of blood is drawn and centrifuged to obtain platelet-rich plasma. This plasma, rich in growth factors, is injected back into the skin or scalp.',
                'PRP stimulates cell renewal, collagen production, and hair growth in a 100% natural way – using your own body\'s substances.',
            ],
        },
        prices: [{ name: 'PRP behandeling', price: 'Op aanvraag' }],
    },
    {
        slug: 'xl-hair',
        category: 'boosters',
        categoryLabel: boostersCategory,
        name: { nl: 'XL Hair', en: 'XL Hair' },
        shortDesc: { nl: 'Haaruitval behandeling', en: 'Hair loss treatment' },
        description: {
            nl: 'XL Hair is een geavanceerde haargroeibehandeling die dunner wordend haar stimuleert en haaruitval tegengaat.',
            en: 'XL Hair is an advanced hair growth treatment that stimulates thinning hair and counteracts hair loss.',
        },
        details: {
            nl: [
                'XL Hair is een intensieve haargroeibehandeling met een combinatie van groeifactoren en voedingsstoffen die rechtstreeks in de hoofdhuid worden geïnjecteerd.',
                'Mannen volgen een kuur van 6 behandelingen, vrouwen 8 behandelingen, voor het meest optimale resultaat.',
            ],
            en: [
                'XL Hair is an intensive hair growth treatment with a combination of growth factors and nutrients injected directly into the scalp.',
                'Men follow a course of 6 treatments, women 8 treatments, for the most optimal results.',
            ],
        },
        prices: [
            { name: 'XL Hair 1x behandeling', price: '€199,00' },
            { name: 'XL Hair 6x (mannen)', price: '€899,00' },
            { name: 'XL Hair 8x (vrouwen)', price: '€1199,00' },
        ],
    },
    {
        slug: 'morpheus8',
        category: 'boosters',
        categoryLabel: boostersCategory,
        name: { nl: 'Morpheus8', en: 'Morpheus8' },
        shortDesc: { nl: 'Huidverjonging', en: 'Skin rejuvenation' },
        description: {
            nl: 'Morpheus8 combineert microneedling met radiofrequentie voor diepe huidverjonging en huidverstrakking.',
            en: 'Morpheus8 combines microneedling with radiofrequency for deep skin rejuvenation and skin tightening.',
        },
        details: {
            nl: [
                'Morpheus8 is een geavanceerde behandeling die microneedling combineert met fractionele radiofrequentie-energie. De naaldjes dringen diep in de huid door en geven gecontroleerde warmte af.',
                'Dit stimuleert collageenproductie en huidvernieuwing op een dieper niveau dan traditionele behandelingen. Ideaal voor huidverslapping, grove poriën, acnelittekens en textuurverbetering.',
            ],
            en: [
                'Morpheus8 is an advanced treatment combining microneedling with fractional radiofrequency energy. The needles penetrate deep into the skin and deliver controlled heat.',
                'This stimulates collagen production and skin renewal at a deeper level than traditional treatments. Ideal for skin laxity, large pores, acne scars, and texture improvement.',
            ],
        },
        prices: [{ name: 'Morpheus8', price: 'Vanaf €299,00' }],
    },
    // ===== FAT DISSOLVING =====
    {
        slug: 'lemon-bottle',
        category: 'fat-dissolving',
        categoryLabel: fatCategory,
        name: { nl: 'Lemon Bottle', en: 'Lemon Bottle' },
        shortDesc: { nl: 'Vet verminderen', en: 'Fat reduction' },
        description: {
            nl: 'Lemon Bottle is een vetoplossende injectie die hardnekkig vet vermindert op specifieke zones zonder chirurgie.',
            en: 'Lemon Bottle is a fat-dissolving injection that reduces stubborn fat in specific areas without surgery.',
        },
        details: {
            nl: [
                'Lemon Bottle bevat een combinatie van riboflavine (vitamine B2), lecithine en bromelaine die vetcellen afbreken. Het is ideaal voor kleine, hardnekkige vetdepots zoals de onderkin, kaken of buik.',
                'De behandeling is minimaal invasief en je kunt direct na de behandeling je dagelijkse activiteiten hervatten. Meerdere sessies kunnen nodig zijn voor optimaal resultaat.',
            ],
            en: [
                'Lemon Bottle contains a combination of riboflavin (vitamin B2), lecithin, and bromelain that break down fat cells. It is ideal for small, stubborn fat deposits such as the double chin, jowls, or abdomen.',
                'The treatment is minimally invasive and you can immediately resume your daily activities afterward. Multiple sessions may be needed for optimal results.',
            ],
        },
        prices: [{ name: 'Lemon Bottle', price: 'Vanaf €149,00' }],
    },
    {
        slug: 'kybella',
        category: 'fat-dissolving',
        categoryLabel: fatCategory,
        name: { nl: 'Kybella (Belkyra)', en: 'Kybella (Belkyra)' },
        shortDesc: { nl: 'Onderkin verminderen', en: 'Double chin reduction' },
        description: {
            nl: 'Kybella (Belkyra) is een goedgekeurd vetoplossend middel specifiek ontwikkeld voor het verminderen van een onderkin.',
            en: 'Kybella (Belkyra) is an approved fat-dissolving agent specifically developed for reducing a double chin.',
        },
        details: {
            nl: [
                'Kybella bevat deoxycholzuur, een stof die ook van nature in je lichaam voorkomt en helpt bij de afbraak van vet. Het is specifiek goedgekeurd voor submentaal vet (de onderkin).',
                'Na injectie worden de vetcellen permanent vernietigd. Het resultaat is blijvend, mits je gewicht stabiel blijft. Meestal zijn 2-4 behandelingen nodig.',
            ],
            en: [
                'Kybella contains deoxycholic acid, a substance that also occurs naturally in your body and helps break down fat. It is specifically approved for submental fat (the double chin).',
                'After injection, fat cells are permanently destroyed. The result is lasting, provided your weight remains stable. Usually 2-4 treatments are needed.',
            ],
        },
        prices: [{ name: 'Kybella (Belkyra)', price: 'Op aanvraag' }],
    },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
    return treatments.find((t) => t.slug === slug);
}

export function getTreatmentsByCategory(category: Treatment['category']): Treatment[] {
    return treatments.filter((t) => t.category === category);
}

export const categoryNames: Record<Treatment['category'], { nl: string; en: string }> = {
    botox: { nl: 'Botox', en: 'Botox' },
    fillers: { nl: 'Fillers', en: 'Fillers' },
    boosters: { nl: 'Hair & Skin Boosters', en: 'Hair & Skin Boosters' },
    'fat-dissolving': { nl: 'Fat Dissolving', en: 'Fat Dissolving' },
};
