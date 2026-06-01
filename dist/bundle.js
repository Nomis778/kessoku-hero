(() => {
  // js/audio.js
  var audio = new Audio("resources/audio/placeholder.mp4");
  function playAudio() {
    audio.play();
  }
  function getAudioTime() {
    return audio.currentTime;
  }

  // js/main.js
  $("#start-btn").click(function() {
    playAudio();
  });
  addEventListener("keydown", logKeyPressed);
  function logKeyPressed(event) {
    const time = getAudioTime();
    console.log(event.key, "Pressed at", time);
  }
})();
