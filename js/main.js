import {getAudioTime, pauseAudio, playAudio} from "./audio.js";
import updateCanvas from "./graphics";
import {registerHit, updateState} from "./state";
import {getPoints} from "./score";

$("#start-btn").click(function () {
    playAudio();
});

const keybinds = {
    "a": 0,
    "w": 1,
    "d": 2,
    "ArrowLeft": 3,
    "ArrowRight": 4
}

addEventListener("keydown", onKeyPress);

function onKeyPress(event) {
    const audioTime = getAudioTime();
    const lane = keybinds[event.key];
    if(lane === undefined)
        return;

    registerHit(audioTime, lane);
    console.log(getPoints());
}

let rafId = requestAnimationFrame(gameLoop);

function gameLoop() {
    const audioTime = getAudioTime();
    updateState(audioTime);
    updateCanvas(audioTime);
    requestAnimationFrame(gameLoop);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        playAudio();
        cancelAnimationFrame(rafId);
    } else {
        pauseAudio();
        rafId = requestAnimationFrame(gameLoop);
    }
});