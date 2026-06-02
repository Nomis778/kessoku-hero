import {getAudioTime, pauseAudio, playAudio} from "./audio.js";
import updateCanvas from "./graphics";
import {registerHit, updateState} from "./state";
import {getPoints} from "./score";
import {KEYBINDS} from "./constants";

$("#start-btn").click(function () {
    playAudio();
});

addEventListener("keydown", onKeyPress);

function onKeyPress(event) {
    const audioTime = getAudioTime();
    const lane = KEYBINDS[event.key];
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
        pauseAudio();
        cancelAnimationFrame(rafId);
    } else {
        playAudio();
        rafId = requestAnimationFrame(gameLoop);
    }
});