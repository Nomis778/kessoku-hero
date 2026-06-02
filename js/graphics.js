import {getCurrentLanes} from "./state";
import {FALL_TIME_SECONDS, HIT_Y, NOTE_HEIGHT, NOTE_WIDTH, SPACE_BETWEEN_NOTES} from "./constants";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export default function updateCanvas(audioTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHitLine();
    drawNotes(audioTime);
}

function drawNotes(audioTime) {
    ctx.fillStyle = "black"
    const lanes = getCurrentLanes();
    for(let i = 0; i < lanes.length; i++) {
        lanes[i].forEach(note => {
            const currFallTime = (note.hitTime - audioTime) - FALL_TIME_SECONDS;
            const currFallPercent = currFallTime / FALL_TIME_SECONDS;
            ctx.fillRect((i * NOTE_WIDTH) + (i * SPACE_BETWEEN_NOTES), -(currFallPercent * HIT_Y), NOTE_WIDTH, NOTE_HEIGHT);
        })
    }
}

function drawHitLine() {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, HIT_Y, canvas.width, NOTE_HEIGHT);
}