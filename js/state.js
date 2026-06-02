import chart from "./chart";
import {getHitType, HitType} from "./hit-type";
import {addPoints} from "./score";

const SPAWN_BEFORE_SECONDS = 2;
export const FALL_TIME_SECONDS = 1.5;
const DROP_AFTER_SECONDS = 1;

// Each element is a list of notes in this lane
let lanes = [];
for (let i = 0; i < chart.lanes.length; i++) {
    lanes[i] = [];
}

export function updateState(audioTime) {
    spawnNotes(audioTime);
    dropOldNotes(audioTime);
}

export function getCurrentLanes() {
    return lanes;
}

export function registerHit(hitTime, lane) {
    const note = getClosestNote(hitTime, lane)
    if (!note)
        return;

    const diff = Math.abs(note.hitTime - hitTime);
    const hitType = getHitType(diff)

    if (hitType !== HitType.MISS)
        removeNote(note, lane);

    addPoints(hitType)
}

function spawnNotes(audioTime) {
    for (let i = 0; i < chart.lanes.length; i++) {
        const lane = chart.lanes[i];
        if (lane.next() && lane.next().hitTime <= audioTime + SPAWN_BEFORE_SECONDS) {
            lanes[i].push(lane.next());
            lane.incrementIndex();
        }
    }
}

function dropOldNotes(audioTime) {
    lanes.forEach(lane => {
        while (lane.length && lane[0].hitTime + DROP_AFTER_SECONDS < audioTime) {
            lane.shift();
        }}
    );
}

function getClosestNote(audioTime, lane) {
    let closest = null;
    let closestDiff = Number.MAX_VALUE;
    lanes[lane].forEach(note => {
        const diff = Math.abs(note.hitTime - audioTime);
        if (diff < closestDiff) {
            closest = note;
            closestDiff = diff;
        }
    })
    return closest;
}

function removeNote(note, lane) {
    lanes[lane].splice(lanes.indexOf(note), 1);
}