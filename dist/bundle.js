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
  var Lane = class {
    index = 0;
    constructor(notes) {
      this.notes = notes;
    }
    next() {
      return this.notes[this.index];
    }
    incrementIndex() {
      this.index++;
    }
  };
  var chart = {
    "lanes": [
      new Lane([{ "hitTime": 6 }, { "hitTime": 7 }]),
      new Lane([{ "hitTime": 5 }, { "hitTime": 7 }])
    ]
  };
  var chart_default = chart;

  // js/hit-type.js
  var PERFECT_DIFF = 0.1;
  var GOOD_DIFF = 0.3;
  var MEDIOCRE_DIFF = 0.5;
  var MISS_DIFF = 2;
  var HitType = {
    PERFECT: 1,
    GOOD: 2,
    MEDIOCRE: 3,
    MISS: 4
  };
  Object.freeze(HitType);
  function getHitType(diff) {
    if (diff < PERFECT_DIFF) {
      return HitType.PERFECT;
    } else if (diff < GOOD_DIFF) {
      return HitType.GOOD;
    } else if (diff < MEDIOCRE_DIFF) {
      return HitType.MEDIOCRE;
    } else if (diff < MISS_DIFF) {
      return HitType.MISS;
    }
  }

  // js/score.js
  var Reward = {
    "PERFECT": 400,
    "GOOD": 200,
    "MEDIOCRE": 100,
    "MISS": -100
  };
  Object.freeze(Reward);
  var totalPoints = 0;
  function addPoints(hitType) {
    switch (hitType) {
      case HitType.PERFECT:
        totalPoints += Reward.PERFECT;
        break;
      case HitType.GOOD:
        totalPoints += Reward.GOOD;
        break;
      case HitType.MEDIOCRE:
        totalPoints += Reward.MEDIOCRE;
        break;
      case HitType.MISS:
        totalPoints += Reward.MISS;
        break;
    }
  }
  function getPoints() {
    return totalPoints;
  }

  // js/state.js
  var SPAWN_BEFORE_SECONDS = 2;
  var FALL_TIME_SECONDS = 1.5;
  var DROP_AFTER_SECONDS = 1;
  var lanes = [];
  for (let i = 0; i < chart_default.lanes.length; i++) {
    lanes[i] = [];
  }
  console.log(lanes);
  function updateState(audioTime) {
    spawnNotes(audioTime);
    dropOldNotes(audioTime);
  }
  function getCurrentLanes() {
    return lanes;
  }
  function registerHit(hitTime, lane) {
    const note = getClosestNote(hitTime, lane);
    if (!note)
      return;
    const diff = Math.abs(note.hitTime - hitTime);
    const hitType = getHitType(diff);
    if (hitType !== HitType.MISS)
      removeNote(note, lane);
    addPoints(hitType);
  }
  function spawnNotes(audioTime) {
    for (let i = 0; i < chart_default.lanes.length; i++) {
      const lane = chart_default.lanes[i];
      if (lane.next() && lane.next().hitTime <= audioTime + SPAWN_BEFORE_SECONDS) {
        console.log("spawn");
        lanes[i].push(lane.next());
        lane.incrementIndex();
      }
    }
  }
  function dropOldNotes(audioTime) {
    lanes.forEach((lane) => {
      while (lane.length && audioTime > lane[0].hitTime + DROP_AFTER_SECONDS) {
        console.log("drop");
        lane.shift();
      }
    });
  }
  function getClosestNote(audioTime, lane) {
    let closest = null;
    let closestDiff = Number.MAX_VALUE;
    lanes[lane].forEach((note) => {
      const diff = Math.abs(note.hitTime - audioTime);
      if (diff < closestDiff) {
        closest = note;
        closestDiff = diff;
      }
    });
    return closest;
  }
  function removeNote(note, lane) {
    lanes[lane].splice(lanes.indexOf(note), 1);
  }

  // js/graphics.js
  var HIT_Y = 100;
  var NOTE_WIDTH = 15;
  var NOTE_HEIGHT = 5;
  var SPACE_BETWEEN_NOTES = 10;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  function updateCanvas(audioTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHitLine();
    drawNotes(audioTime);
  }
  function drawNotes(audioTime) {
    ctx.fillStyle = "black";
    const lanes2 = getCurrentLanes();
    for (let i = 0; i < lanes2.length; i++) {
      lanes2[i].forEach((note) => {
        const currFallTime = note.hitTime - audioTime - FALL_TIME_SECONDS;
        const currFallPercent = currFallTime / FALL_TIME_SECONDS;
        ctx.fillRect(i * NOTE_WIDTH + i * SPACE_BETWEEN_NOTES, -(currFallPercent * HIT_Y), NOTE_WIDTH, NOTE_HEIGHT);
      });
    }
  }
  function drawHitLine() {
    ctx.fillStyle = "red";
    ctx.fillRect(0, HIT_Y, canvas.width, NOTE_HEIGHT);
  }

  // js/main.js
  $("#start-btn").click(function() {
    playAudio();
  });
  addEventListener("keydown", onKeyPress);
  function onKeyPress(event) {
    const audioTime = getAudioTime();
    registerHit(audioTime);
    console.log(getPoints());
  }
  var rafId = requestAnimationFrame(gameLoop);
  function gameLoop() {
    const audioTime = getAudioTime();
    updateState(audioTime);
    updateCanvas(audioTime);
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
