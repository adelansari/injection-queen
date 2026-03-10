import type { Treatment } from './types';

// Botox treatments
import { fronsrimpels } from './botox/fronsrimpels';
import { voorhoofdrimpels } from './botox/voorhoofdrimpels';
import { kraaienpootjes } from './botox/kraaienpootjes';
import { faceslimmingTandenknarsen } from './botox/faceslimming-tandenknarsen';
import { overmatigTranspireren } from './botox/overmatig-transpireren-oksels';
import { browlift } from './botox/browlift';
import { mondhoeken } from './botox/mondhoeken';
import { lipflip } from './botox/lipflip';
import { gummysmile } from './botox/gummysmile';
import { kinPutjes } from './botox/kin-putjes';
import { bunnyLines } from './botox/bunny-lines';
import { traptoxBarbieBotox } from './botox/traptox-of-barbie-botox';
import { babyBotox } from './botox/baby-botox';

// Filler treatments
import { lipFillers } from './filler-behandelingen/lip-fillers';
import { traangoot } from './filler-behandelingen/traangoot';
import { kin } from './filler-behandelingen/kin';
import { jukbeenderen } from './filler-behandelingen/jukbeenderen';
import { neuslippenplooi } from './filler-behandelingen/neuslippenplooi';
import { bovenliplijntjes } from './filler-behandelingen/bovenliplijntjes';
import { marionetlijnen } from './filler-behandelingen/marionetlijnen';
import { handfillers } from './filler-behandelingen/handfillers';
import { kaaklijn } from './filler-behandelingen/kaaklijn';

// Hair & Skin Boosters
import { sculptra } from './hair-skin-boosters/sculptra';
import { profhilo } from './hair-skin-boosters/profhilo';
import { stylageHydroMax } from './hair-skin-boosters/stylage-hydromax';
import { hairfillers } from './hair-skin-boosters/hairfillers';
import { prpBehandelingen } from './hair-skin-boosters/prp-behandelingen';
import { xlHair } from './hair-skin-boosters/xl-hair';
import { morpheus8 } from './hair-skin-boosters/morpheus8';

// Fat Dissolving
import { lemonBottle } from './fat-dissolving/lemon-bottle';
import { kybella } from './fat-dissolving/kybella';

// Re-export types and metadata
export type { Treatment, FAQ, TreatmentStep } from './types';
export { categoryNames, categoryDescriptions, categorySlugs } from './types';

// All treatments combined
export const treatments: Treatment[] = [
    // Botox (13)
    fronsrimpels,
    voorhoofdrimpels,
    kraaienpootjes,
    faceslimmingTandenknarsen,
    overmatigTranspireren,
    browlift,
    mondhoeken,
    lipflip,
    gummysmile,
    kinPutjes,
    bunnyLines,
    traptoxBarbieBotox,
    babyBotox,
    // Fillers (9)
    lipFillers,
    traangoot,
    kin,
    jukbeenderen,
    neuslippenplooi,
    bovenliplijntjes,
    marionetlijnen,
    handfillers,
    kaaklijn,
    // Boosters (7)
    sculptra,
    profhilo,
    stylageHydroMax,
    hairfillers,
    prpBehandelingen,
    xlHair,
    morpheus8,
    // Fat Dissolving (2)
    lemonBottle,
    kybella,
];

// Helper functions
export function getTreatmentBySlug(slug: string): Treatment | undefined {
    return treatments.find((t) => t.slug === slug);
}

export function getTreatmentByCategoryAndSlug(categorySlug: string, slug: string): Treatment | undefined {
    return treatments.find((t) => t.categorySlug === categorySlug && t.slug === slug);
}

export function getTreatmentsByCategory(category: Treatment['category']): Treatment[] {
    return treatments.filter((t) => t.category === category);
}
