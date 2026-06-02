const PERFECT_DIFF = 0.1;
const GOOD_DIFF = 0.3;
const MEDIOCRE_DIFF = 0.5;
const MISS_DIFF = 2;

export const HitType = {
    PERFECT: 1,
    GOOD: 2,
    MEDIOCRE: 3,
    MISS: 4
}
Object.freeze(HitType)

export function getHitType(diff) {
    if (diff < PERFECT_DIFF) {
        return HitType.PERFECT;
    } else if (diff < GOOD_DIFF) {
        return HitType.GOOD;
    } else if (diff < MEDIOCRE_DIFF) {
        return HitType.MEDIOCRE;
    } else if (diff < MISS_DIFF) {
        return HitType.MISS;
    }
}