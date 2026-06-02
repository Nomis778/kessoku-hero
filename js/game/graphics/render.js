import {getCurrentLanes} from "../state/notes";
import {CANVAS_PADDING, HIT_Y, LANE_WIDTH, NOTE_HEIGHT, NOTE_OFFSET, NOTE_WIDTH, updateLayout} from "./layout";
import {FALL_TIME_SECONDS, HIT_LINE_COLOR, NOTE_COLOR} from "../constants";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

updateLayout(canvas);
addEventListener("resize", () => {
    updateLayout(canvas);
})

export default function updateCanvas(audioTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHitLine();
    drawNotes(audioTime);
}

function drawNotes(audioTime) {
    ctx.fillStyle = NOTE_COLOR
    const lanes = getCurrentLanes();
    for (let i = 0; i < lanes.length; i++) {
        lanes[i].forEach(note => {
            const currFallTime = (note.hitTime - audioTime) - FALL_TIME_SECONDS;
            const currFallPercent = currFallTime / FALL_TIME_SECONDS;
            ctx.fillRect(getLaneX(i), -(currFallPercent * HIT_Y), NOTE_WIDTH, NOTE_HEIGHT);
        })
    }
}

function drawHitLine() {
    ctx.fillStyle = HIT_LINE_COLOR;
    ctx.fillRect(0, HIT_Y, canvas.width, NOTE_HEIGHT);
}

function getLaneX(lane) {
    return CANVAS_PADDING + (lane * LANE_WIDTH) + NOTE_OFFSET;
}