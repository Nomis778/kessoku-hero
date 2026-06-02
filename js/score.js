import {getClosestNote} from "./state";
import {HitType} from "./hit-type";

const Reward = {
    "PERFECT": 400,
    "GOOD": 200,
    "MEDIOCRE": 100,
    "MISS": -100
}
Object.freeze(Reward);

let totalPoints = 0

export function addPoints(hitType) {
    switch (hitType) {
        case HitType.PERFECT:
            totalPoints += Reward.PERFECT;
            break;
        case HitType.GOOD:
            totalPoints += Reward.GOOD;
            break;
        case HitType.MEDIOCRE:
            totalPoints += Reward.MEDIOCRE;
            break;
        case HitType.MISS:
            totalPoints += Reward.MISS;
            break;
    }
}