(() => {
  // js/audio.js
  var audio = new Audio("resources/audio/placeholder.mp4");
  function playAudio() {
    audio.play();
  }
  function pauseAudio() {
    audio.pause();
  }
  function getAudioTime() {
    return audio.currentTime;
  }

  // js/chart.js
  var chart = {
    "notes": [
      {
        "hitTime": 6
      },
      {
        "hitTime": 7
      }
    ],
    "index": 0,
    "next": function() {
      return this.notes[this.index];
    },
    "incrementIndex": function() {
      this.index++;
    }
  };
  var chart_default = chart;

  // js/state.js
  var FALL_TIME_SECONDS = 1.5;
  var SURVIVE_TIME_SECONDS = 2;
  var activeNotes = [];
  function updateState(audioTime) {
    spawnNotes(audioTime);
    dropOldNotes(audioTime);
  }
  function spawnNotes(audioTime) {
    while (chart_default.next() && chart_default.next().hitTime <= audioTime + FALL_TIME_SECONDS) {
      chart_default.next().isHit = false;
      activeNotes.push(chart_default.next());
      chart_default.incrementIndex();
    }
  }
  function dropOldNotes(audioTime) {
    activeNotes = activeNotes.filter((note) => note.isHit === true || note.hitTime < audioTime + SURVIVE_TIME_SECONDS);
  }

  // js/graphics.js
  var HIT_Y = 100;
  var NOTE_WIDTH = 15;
  var NOTE_HEIGHT = 5;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  function updateCanvas(audioTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHitLine();
    drawNotes(audioTime);
  }
  function drawNotes(audioTime) {
    ctx.fillStyle = "black";
    chart_default.notes.forEach((note) => {
      const currFallTime = note.hitTime - audioTime - FALL_TIME_SECONDS;
      const currFallPercent = currFallTime / FALL_TIME_SECONDS;
      ctx.fillRect(10, -(currFallPercent * HIT_Y), NOTE_WIDTH, NOTE_HEIGHT);
    });
  }
  function drawHitLine() {
    ctx.fillStyle = "red";
    ctx.fillRect(10, HIT_Y, NOTE_WIDTH, NOTE_HEIGHT);
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
  var rafId = requestAnimationFrame(gameLoop);
  function gameLoop() {
    const audioTime = getAudioTime();
    updateState(audioTime);
    updateCanvas();
    requestAnimationFrame(gameLoop);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      playAudio();
      cancelAnimationFrame(rafId);
    } else {
      pauseAudio();
      rafId = requestAnimationFrame(gameLoop);
    }
  });
})();
