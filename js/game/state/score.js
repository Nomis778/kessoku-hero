import {HitType} from "./hit-type";
import {REWARD} from "../constants";

const statistics = {
    "points": 0,
    "totalHits": 0,
    "numPerfect": 0,
    "numGood": 0,
    "numMediocre": 0,
    "numMiss": 0
}

export function addToStatistics(hitType) {
    statistics.totalHits++;
    switch (hitType) {
        case HitType.PERFECT:
            statistics.points += REWARD.PERFECT;
            statistics.numPerfect++;
            break;
        case HitType.GOOD:
            statistics.points += REWARD.GOOD;
            statistics.numGood++;
            break;
        case HitType.MEDIOCRE:
            statistics.points += REWARD.MEDIOCRE;
            statistics.numMediocre++;
            break;
        case HitType.MISS:
            statistics.points += REWARD.MISS;
            statistics.numMiss++;
            break;
    }
}

export function getPoints() {
    return totalPoints;
}