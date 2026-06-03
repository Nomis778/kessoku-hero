import {CANVAS_PAD_RATIO, HIT_Y_RATIO, NOTE_H_RATIO, NOTE_W_RATIO, NUM_LANES} from "../constants";

export let HIT_Y, NOTE_WIDTH, NOTE_HEIGHT, LANE_WIDTH, NOTE_OFFSET, CANVAS_PADDING;

const canvas = document.getElementById("canvas");

export function initResizeListeners() {
    const observer = new ResizeObserver(() => updateLayout());
    observer.observe(canvas);

    document.addEventListener('fullscreenchange', updateLayout);
}

export function updateLayout() {
    // Stops overflow before recalculation,
    // so clientWidth can't exceed window size
    canvas.width  = 0;
    canvas.height = 0;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    HIT_Y = canvas.height * HIT_Y_RATIO;
    NOTE_HEIGHT = canvas.height * NOTE_H_RATIO;
    CANVAS_PADDING = canvas.width * CANVAS_PAD_RATIO;
    LANE_WIDTH = (canvas.width - (CANVAS_PADDING * 2)) / NUM_LANES;
    NOTE_WIDTH = LANE_WIDTH * NOTE_W_RATIO;
    NOTE_OFFSET = (LANE_WIDTH - NOTE_WIDTH) / 2;
}