import {FALL_TIME_SECONDS, getCurrentLanes} from "./state";

const HIT_Y = 100;
const NOTE_WIDTH = 15;
const NOTE_HEIGHT = 5;
const SPACE_BETWEEN_NOTES = 10

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