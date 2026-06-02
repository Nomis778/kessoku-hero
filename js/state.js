import chart from "./chart";

export const FALL_TIME_SECONDS = 1.5
export const SURVIVE_TIME_SECONDS = 2

let activeNotes = [];

export function updateState(audioTime) {
    spawnNotes(audioTime);
    dropOldNotes(audioTime);
}

function spawnNotes(audioTime) {
    while (chart.next() && chart.next().hitTime <= audioTime + FALL_TIME_SECONDS) {
        chart.next().isHit = false;
        activeNotes.push(chart.next());
        chart.incrementIndex();
    }
}

function dropOldNotes(audioTime) {
    activeNotes = activeNotes.filter(note => (note.isHit === true || note.hitTime < audioTime + SURVIVE_TIME_SECONDS));
}