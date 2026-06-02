import {getAudioTime, playAudio} from "./audio.js";
import updateCanvas from "./graphics";

$("#start-btn").click(function () {
    playAudio();
})

addEventListener("keydown", logKeyPressed)

function logKeyPressed(event) {
    const time = getAudioTime();
    console.log(event.key, "Pressed at", time)
}

requestAnimationFrame(updateCanvas);