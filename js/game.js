import {getAudioTime, pauseAudio, playAudio} from "./game/audio.js";
import updateCanvas from "./game/graphics/render";
import {registerHit, updateNotes} from "./game/state/notes";
import {getPoints} from "./game/state/score";
import {KEYBINDS} from "./game/constants";
import {initResizeListeners, updateLayout} from "./game/graphics/layout";

$("#start").click(function () {
    playAudio();
})

updateLayout();
initResizeListeners();

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

// Pauses game if window is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseAudio();
        cancelAnimationFrame(rafId);
    } else {
        playAudio();
        rafId = requestAnimationFrame(gameLoop);
    }
});