// Game logic
export const NUM_LANES = 5;

// Keys mapped to their respective lanes
export const KEYBINDS = {
    "a": 0,
    "w": 1,
    "d": 2,
    "ArrowLeft": 3,
    "ArrowRight": 4
}

// Note lifetime logic
export const SPAWN_BEFORE_SECONDS = 2;
export const FALL_TIME_SECONDS = 1.5;
export const DROP_AFTER_SECONDS = 1;

// Graphics
export const HIT_Y = 100;
export const NOTE_WIDTH = 50;
export const NOTE_HEIGHT = 10;
export const SPACE_BETWEEN_NOTES = 15;
export const CANVAS_PADDING = 15;
export const CANVAS_WIDTH = (CANVAS_PADDING * 2) +
    (NUM_LANES * NOTE_WIDTH) +
    ((NUM_LANES - 1) * SPACE_BETWEEN_NOTES);

// Allowed time difference between button press
// and note timing
export const ALLOWED_DIFF = {
    "PERFECT": 0.1,
    "GOOD": 0.3,
    "MEDIOCRE": 0.5,
    "MISS": 2
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