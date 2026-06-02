import {getAudioTime, pauseAudio, playAudio} from "./game/audio.js";
import updateCanvas from "./game/graphics/render";
import {registerHit, updateNotes} from "./game/state/notes";
import {getPoints} from "./game/state/score";
import {KEYBINDS} from "./game/constants";

playAudio();

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
    updateNotes(audioTime);
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