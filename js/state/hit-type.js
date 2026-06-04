import {ALLOWED_DIFF} from "../constants";

export const HitType = {
    PERFECT: 1,
    GOOD: 2,
    OK: 3,
    MISS: 4
}
Object.freeze(HitType)

export function getHitType(diff) {
    if (diff < ALLOWED_DIFF.PERFECT) {
        return HitType.PERFECT;
    } else if (diff < ALLOWED_DIFF.GOOD) {
        return HitType.GOOD;
    } else if (diff < ALLOWED_DIFF.OK) {
        return HitType.OK;
    } else {
        return HitType.MISS;
    }
}