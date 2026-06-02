import {HitType} from "./hit-type";
import {REWARD} from "../constants";

let totalPoints = 0

export function addPoints(hitType) {
    switch (hitType) {
        case HitType.PERFECT:
            totalPoints += REWARD.PERFECT;
            break;
        case HitType.GOOD:
            totalPoints += REWARD.GOOD;
            break;
        case HitType.MEDIOCRE:
            totalPoints += REWARD.MEDIOCRE;
            break;
        case HitType.MISS:
            totalPoints += REWARD.MISS;
            break;
    }
}

export function getPoints() {
    return totalPoints;
}