const audio = new Audio("../resources/audio/seishun.mp3");

export function playAudio() {
    audio.play();
}

export function pauseAudio() {
    audio.pause();
}

export function restartAudio() {
    console.log("restart audio");
    audio.pause()
    audio.currentTime = 0;
    audio.play();
}

export function getAudioTime() {
    return audio.currentTime;
}