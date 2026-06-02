import {getCurrentLanes} from "./state";
import {
    CANVAS_PADDING, CANVAS_WIDTH,
    FALL_TIME_SECONDS, HIT_LINE_COLOR,
    HIT_Y, LANE_WIDTH, NOTE_COLOR,
    NOTE_HEIGHT, NOTE_OFFSET,
    NOTE_WIDTH,
} from "./constants";

const canvas = document.getElementById("canvas");
canvas.width = CANVAS_WIDTH;
const ctx = canvas.getContext("2d");

for(let i = 0; i < 5; i++) {
    console.log(CANVAS_PADDING + (i * LANE_WIDTH) + NOTE_OFFSET);
}

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