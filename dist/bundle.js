(() => {
  // js/audio.js
  var audio = new Audio("resources/audio/placeholder.mp4");
  function playAudio() {
    audio.play();
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
      return notes[index];
    },
    "incrementIndex": function() {
      index++;
    }
  };
  var chart_default = chart;

  // js/graphics.js
  var FALL_TIME_SECONDS = 1.5;
  var HIT_Y = 100;
  var NOTE_WIDTH = 15;
  var NOTE_HEIGHT = 5;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHitLine();
    drawNotes();
    requestAnimationFrame(updateCanvas);
  }
  function drawNotes() {
    const audioTime = getAudioTime();
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
  requestAnimationFrame(updateCanvas);
})();
