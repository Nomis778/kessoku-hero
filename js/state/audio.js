let audio;

let listeners = [];

export function setAudioSource(url) {
    audio = new Audio(url);

    listeners.forEach(listener => {
        audio.addEventListener(listener.eventName, listener.function);
    })
}

export function playAudio() {
    audio.play();
}

export function pauseAudio() {
    audio.pause();
}

export function resetAudio() {
    audio.pause()
    audio.currentTime = 0;
}

export function getAudioTime() {
    return audio ? audio.currentTime : 0;
}

export function addAudioListener(eventName, listener) {
    listeners.push({"eventName": eventName, "function": listener});

    if(audio != null)
        audio.addEventListener(eventName, listener);
}