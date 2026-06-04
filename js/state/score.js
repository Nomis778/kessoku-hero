import {HitType} from "./hit-type";
import {REWARD} from "../constants";

const statistics = {
    "points": 0,
    "totalHits": 0,
    "numPerfect": 0,
    "numGood": 0,
    "numMediocre": 0,
    "numMiss": 0
};

let onUpdateCallback = null;

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

    onUpdateCallback?.();
}

export function getStatistics() {
    return Object.freeze({...statistics});
}

export function onStatisticsUpdate(callback) {
    onUpdateCallback = callback;
}

export function resetStatistics() {
    for (let key in statistics) {
        statistics[key] = 0;
    }
    onUpdateCallback?.();
}