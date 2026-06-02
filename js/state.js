import chart from "./chart";

const SPAWN_BEFORE_SECONDS = 2;
export const FALL_TIME_SECONDS = 1.5;
const DROP_AFTER_SECONDS = 1;

let activeNotes = [];

export function updateState(audioTime) {
    spawnNotes(audioTime);
    dropNotes(audioTime);
}

export function getActiveNotes() {
    return activeNotes;
}

function spawnNotes(audioTime) {
    while (chart.next() && chart.next().hitTime <= audioTime + SPAWN_BEFORE_SECONDS) {
        chart.next().isHit = false;
        activeNotes.push(chart.next());
        chart.incrementIndex();
    }
}

function dropNotes(audioTime) {
    activeNotes = activeNotes.filter(note => (note.isHit === true || audioTime < note.hitTime + DROP_AFTER_SECONDS));
}