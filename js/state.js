import chart from "./chart";
import {getHitType, HitType} from "./hit-type";
import {addPoints} from "./score";

const SPAWN_BEFORE_SECONDS = 2;
export const FALL_TIME_SECONDS = 1.5;
const DROP_AFTER_SECONDS = 1;

let activeNotes = [];

export function updateState(audioTime) {
    spawnNotes(audioTime);
    dropOldNotes(audioTime);
}

export function getActiveNotes() {
    return activeNotes;
}

export function registerHit(hitTime) {
    const note = getClosestNote(hitTime)
    if (!note)
        return;

    const diff = Math.abs(note.hitTime - hitTime);
    const hitType = getHitType(diff)

    if(hitType !== HitType.MISS)
        removeNote(note);

    addPoints(hitType)
}

function spawnNotes(audioTime) {
    while (chart.next() && chart.next().hitTime <= audioTime + SPAWN_BEFORE_SECONDS) {
        activeNotes.push(chart.next());
        chart.incrementIndex();
    }
}

function dropOldNotes(audioTime) {
    activeNotes = activeNotes.filter(note => (audioTime < note.hitTime + DROP_AFTER_SECONDS));
}

function getClosestNote(audioTime) {
    let closest = null
    let closestDiff = Number.MAX_VALUE
    activeNotes.forEach(note => {
        const diff = Math.abs(note.hitTime - audioTime);
        if(diff < closestDiff) {
            closest = note;
            closestDiff = diff;
        }
    })
    return closest;
}

function removeNote(note){
    activeNotes.splice(activeNotes.indexOf(note), 1);
}