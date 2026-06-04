import chart from "../chart/chart";
import {getHitType, HitType} from "./hit-type";
import {addToStatistics} from "./stats";
import {DROP_AFTER_SECONDS, NUM_LANES, SPAWN_BEFORE_SECONDS} from "../constants";

// Each element is a list of notes in this lane
let lanes = [];
for (let i = 0; i < NUM_LANES; i++) {
    lanes[i] = [];
}

export function updateNotes(audioTime) {
    spawnNotes(audioTime);
    dropOldNotes(audioTime);
}

export function getCurrentLanes() {
    return lanes;
}

export function registerHit(hitTime, lane) {
    const note = getClosestNote(hitTime, lane)
    let diff = Number.MAX_VALUE;
    if (note)
        diff = Math.abs(note.hitTime - hitTime);

    const hitType = getHitType(diff)

    if (hitType !== HitType.MISS)
        removeNote(note, lane);

    addToStatistics(hitType)
}

export function resetNotes() {
    chart.resetLanes();
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
            addToStatistics(HitType.MISS);
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
    lanes[lane].splice(lanes[lane].indexOf(note), 1);
}