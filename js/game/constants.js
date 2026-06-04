// Game logic
export const NUM_LANES = 5;

// Keys mapped to their respective lanes
export const KEYBINDS = {
    "a": 0,
    "s": 1,
    "d": 2,
    "ArrowLeft": 3,
    "ArrowDown": 4
}

// Note lifetime logic
export const SPAWN_BEFORE_SECONDS = 2;
export const FALL_TIME_SECONDS = 1.5;
export const DROP_AFTER_SECONDS = 1;

// Graphics, calculated from what works at 600 width and 900 height
export const HIT_Y_RATIO = 700 / 900;
export const NOTE_W_RATIO = 65 / 100; // 100 lane width
export const NOTE_H_RATIO = 35 / 900;
export const CANVAS_PAD_RATIO = 50 / 600;

// Colors
export const NOTE_COLOR = "#FFF600";
export const HIT_LINE_COLOR = "#9067C6"

// Allowed time difference between button press
// and note timing
export const ALLOWED_DIFF = {
    "PERFECT": 0.035,
    "GOOD": 0.1,
    "MEDIOCRE": 0.3,
}
Object.freeze(ALLOWED_DIFF);

// Point rewards for different timings
export const REWARD = {
    "PERFECT": 400,
    "GOOD": 200,
    "MEDIOCRE": 100,
    "MISS": -100
}
Object.freeze(REWARD);