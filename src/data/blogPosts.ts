export interface BlogPost {
  id: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  slug: string;
  image?: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    date: "2026-02-25",
    title: "Hoe vaak moet je Botox herhalen voor het beste resultaat?",
    category: "Botox",
    excerpt: "Botox is tijdelijk en veel mensen twijfelen over het juiste moment om een behandeling te herhalen. We leggen je graag uit hoelang Botox gemiddeld werkt en wat de beste aanpak is voor een natuurlijk en stabiel resultaat.",
    author: "Zainab Haidari",
    slug: "hoe-vaak-moet-je-botox-herhalen-voor-het-beste-resultaat",
    image: "/images/blog/Botox_header.jpg"
  },
  {
    id: "2",
    date: "2026-02-05",
    title: "Waaraan herken je een betrouwbare cosmetische arts?",
    category: "Informatie",
    excerpt: "Of het nu om een subtiele rimpelbehandeling of een contourverbetering gaat: elke cosmetische ingreep valt onder medische handelingen. Dat vraagt om een zorgvuldige afweging. Toch is het voor cliënten vaak lastig om te beoordelen wie écht gekwalificeerd is...",
    author: "Zainab Haidari",
    slug: "waaraan-herken-je-een-betrouwbare-cosmetische-arts",
    image: "/images/blog/doctor-cosmetologist-makes-rejuvenating-facial-injections-procedure-tightening-smoothing-wrinkles-face-skin-women-beauty-salon-cosmetology-skin-care-2048x1365.jpg"
  },
  {
    id: "3",
    date: "2026-01-21",
    title: "Fillers oplossen met hyaluronidase",
    category: "Fillers",
    excerpt: "Hoewel fillers bedoeld zijn voor subtiele verjonging en volumeherstel, is het soms nodig om een behandeling ongedaan te maken met hyaluronidase. In deze blog leggen we uit wat het is, hoe het werkt en wanneer het een verstandige keuze is.",
    author: "Zainab Haidari",
    slug: "fillers-oplossen-met-hyaluronidase",
    image: "/images/blog/Resultaat-bekijken-cosmetische-behandeling-1.jpg"
  },
  {
    id: "4",
    date: "2026-01-08",
    title: "Botox op jonge leeftijd: preventie of overbodig?",
    category: "Botox",
    excerpt: "Botox is allang niet meer alleen voor mensen met diepe rimpels. Ook twintigers en dertigers kiezen steeds vaker voor preventieve Botox om fijne lijntjes te voorkomen. In deze blog kijken we kritisch naar Botox op jonge leeftijd.",
    author: "Zainab Haidari",
    slug: "botox-op-jonge-leeftijd-preventie-of-overbodig",
    image: "/images/blog/smooth-hair-woman-long-hair-beauty-girl-with-pink-lips-color-background-brown-2048x1288.jpg"
  },
  {
    id: "5",
    date: "2025-12-01",
    title: "De anatomie van veroudering: waar verdwijnt ons volume eerst?",
    category: "Fillers",
    excerpt: "Veroudering is meer dan rimpels. Een van de eerste dingen die verandert, is het volume in je gezicht. In deze blog lees je waar dat volumeverlies het eerst optreedt, wat het met je uitstraling doet en hoe je dit kunt aanpakken.",
    author: "Zainab Haidari",
    slug: "de-anatomie-van-veroudering-waar-verdwijnt-ons-volume-eerst",
    image: "/images/blog/veroudering-vrouw-rimpels-2048x1024.jpg"
  },
  {
    id: "6",
    date: "2025-11-18",
    title: "Russian lips vs. natural shape: wat past het best bij jouw gezicht?",
    category: "Lipfillers",
    excerpt: "De ene lip filler is de andere niet. Lees alles over Russian lips vs. natural shape, inclusief voor- en nadelen, esthetisch effect en waar je op moet letten als je een keuze maakt.",
    author: "Zainab Haidari",
    slug: "russian-lips-vs-natural-shape-wat-past-het-best-bij-jouw-gezicht",
    image: "/images/blog/smooth-hair-woman-long-hair-beauty-girl-with-pink-lips-color-background-brown-2048x1288.jpg"
  },
  {
    id: "7",
    date: "2025-09-17",
    title: "Waarom steeds meer mensen kiezen voor Sculptra",
    category: "Skinboosters",
    excerpt: "Wat is Sculptra precies en waarom kiezen steeds meer mensen hiervoor? Dit innovatieve product biedt een unieke aanpak die verder gaat dan de standaard filler.",
    author: "Zainab Haidari",
    slug: "waarom-steeds-meer-mensen-kiezen-voor-sculptra",
    image: "/images/blog/Resultaat-bekijken-cosmetische-behandeling-1.jpg"
  },
  {
    id: "8",
    date: "2025-08-15",
    title: "Lippen opvullen in Amsterdam",
    category: "Fillers",
    excerpt: "Zoek je subtiele, natuurlijk ogende lipfillers in Amsterdam, dan ben je bij Injection Queen aan het juiste adres. We richten ons op zachte verfijning, zodat jouw lippen voller en frisser ogen.",
    author: "injectionqueen_webmaster",
    slug: "lippen-opvullen-in-amsterdam",
    image: "/images/blog/smooth-hair-woman-long-hair-beauty-girl-with-pink-lips-color-background-brown-2048x1288.jpg"
  },
  {
    id: "9",
    date: "2025-06-23",
    title: "Wat is de traangoot en waarom ontstaan er donkere kringen?",
    category: "Fillers",
    excerpt: "De traangoot is het gebied tussen de binnenhoek van je oog en je wangen. Naarmate je ouder wordt, neemt het volume in dit gebied af. Dit kan leiden tot schaduwen, donkere kringen of een vermoeide blik.",
    author: "Zainab Haidari",
    slug: "wat-is-de-traangoot-en-waarom-ontstaan-er-donkere-kringen",
    image: "/images/blog/veroudering-vrouw-rimpels-2048x1024.jpg"
  },
  {
    id: "10",
    date: "2025-02-11",
    title: "Wat te doen tegen gerimpelde handen?",
    category: "Fillers",
    excerpt: "Hoewel je gerimpelde handen nooit kunt voorkomen, zijn er verschillende manieren om de jeugdigheid van je handen te herstellen, bijvoorbeeld door een behandeling met handfillers.",
    author: "Zainab Haidari",
    slug: "wat-te-doen-tegen-gerimpelde-handen",
    image: "/images/blog/doctor-cosmetologist-makes-rejuvenating-facial-injections-procedure-tightening-smoothing-wrinkles-face-skin-women-beauty-salon-cosmetology-skin-care-2048x1365.jpg"
  },
  {
    id: "11",
    date: "2024-12-16",
    title: "Masseter Botox voor faceslimming: ontdek de voordelen en mogelijkheden",
    category: "Botox",
    excerpt: "Masseter Botox voor faceslimming biedt een niet-invasieve manier om je kaaklijn subtiel te verfijnen. Hoe werkt deze behandeling precies, is het veilig, en is het iets voor jou?",
    author: "Zainab Haidari",
    slug: "masseter-botox-voor-faceslimming-ontdek-de-voordelen-en-mogelijkheden",
    image: "/images/blog/Botox_header.jpg"
  },
  {
    id: "12",
    date: "2024-12-13",
    title: "Wat helpt echt tegen rimpels?",
    category: "Fillers",
    excerpt: "Veel mensen willen weten hoe ze rimpels kunnen voorkomen en wat ze kunnen doen tegen bestaande rimpels. Er zijn gelukkig verschillende dingen die je zelf kunt doen.",
    author: "Zainab Haidari",
    slug: "wat-helpt-echt-tegen-rimpels",
    image: "/images/blog/veroudering-vrouw-rimpels-2048x1024.jpg"
  },
  {
    id: "13",
    date: "2024-12-13",
    title: "Dikke aders op handen? Ontdek oorzaken en effectieve oplossingen",
    category: "Fillers",
    excerpt: "Naarmate je ouder wordt, wordt de huid steeds dunner, waardoor je aderen zichtbaarder worden. Gelukkig kun je dikke aders op de handen makkelijk behandelen met fillers.",
    author: "Zainab Haidari",
    slug: "dikke-aders-op-handen-ontdek-oorzaken-en-effectieve-oplossingen",
    image: "/images/blog/doctor-cosmetologist-makes-rejuvenating-facial-injections-procedure-tightening-smoothing-wrinkles-face-skin-women-beauty-salon-cosmetology-skin-care-2048x1365.jpg"
  },
  {
    id: "14",
    date: "2024-12-13",
    title: "De voordelen van faceslimming",
    category: "Fillers",
    excerpt: "Faceslimming helpt het gezicht slanker en gedefinieerder te maken. Zo kunnen we de vorm van de kaaklijn verfijnen en in balans brengen met de rest van je gezicht.",
    author: "Zainab Haidari",
    slug: "de-voordelen-van-faceslimming",
    image: "/images/blog/Botox_header.jpg"
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentSlug: string, limit: number = 3): BlogPost[] => {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === currentPost.category)
    .slice(0, limit);
};
