(() => {
  // js/game/audio.js
  var audio = new Audio("../resources/audio/placeholder.mp4");
  function playAudio() {
    audio.play();
  }
  function pauseAudio() {
    audio.pause();
  }
  function getAudioTime() {
    return audio.currentTime;
  }

  // js/game/chart.js
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
      new Lane([{ "hitTime": 2 }, { "hitTime": 4 }]),
      new Lane([{ "hitTime": 6 }, { "hitTime": 10 }]),
      new Lane([{ "hitTime": 6 }, { "hitTime": 20 }]),
      new Lane([{ "hitTime": 5 }, { "hitTime": 7 }])
    ]
  };
  var chart_default = chart;

  // js/game/constants.js
  var NUM_LANES = 5;
  var KEYBINDS = {
    "a": 0,
    "s": 1,
    "d": 2,
    "ArrowLeft": 3,
    "ArrowRight": 4
  };
  var SPAWN_BEFORE_SECONDS = 2;
  var FALL_TIME_SECONDS = 1.5;
  var DROP_AFTER_SECONDS = 1;
  var HIT_Y_RATIO = 700 / 900;
  var NOTE_W_RATIO = 65 / 100;
  var NOTE_H_RATIO = 35 / 900;
  var CANVAS_PAD_RATIO = 50 / 600;
  var NOTE_COLOR = "#FFF600";
  var HIT_LINE_COLOR = "#9067C6";
  var ALLOWED_DIFF = {
    "PERFECT": 0.1,
    "GOOD": 0.3,
    "MEDIOCRE": 0.5,
    "MISS": 2
  };
  Object.freeze(ALLOWED_DIFF);
  var REWARD = {
    "PERFECT": 400,
    "GOOD": 200,
    "MEDIOCRE": 100,
    "MISS": -100
  };
  Object.freeze(REWARD);

  // js/game/state/hit-type.js
  var HitType = {
    PERFECT: 1,
    GOOD: 2,
    MEDIOCRE: 3,
    MISS: 4
  };
  Object.freeze(HitType);
  function getHitType(diff) {
    if (diff < ALLOWED_DIFF.PERFECT) {
      return HitType.PERFECT;
    } else if (diff < ALLOWED_DIFF.GOOD) {
      return HitType.GOOD;
    } else if (diff < ALLOWED_DIFF.MEDIOCRE) {
      return HitType.MEDIOCRE;
    } else if (diff < ALLOWED_DIFF.MISS) {
      return HitType.MISS;
    }
  }

  // js/game/state/score.js
  var totalPoints = 0;
  function addPoints(hitType) {
    switch (hitType) {
      case HitType.PERFECT:
        totalPoints += REWARD.PERFECT;
        break;
      case HitType.GOOD:
        totalPoints += REWARD.GOOD;
        break;
      case HitType.MEDIOCRE:
        totalPoints += REWARD.MEDIOCRE;
        break;
      case HitType.MISS:
        totalPoints += REWARD.MISS;
        break;
    }
  }
  function getPoints() {
    return totalPoints;
  }

  // js/game/state/notes.js
  var lanes = [];
  for (let i = 0; i < NUM_LANES; i++) {
    lanes[i] = [];
  }
  function updateNotes(audioTime) {
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
        lanes[i].push(lane.next());
        lane.incrementIndex();
      }
    }
  }
  function dropOldNotes(audioTime) {
    lanes.forEach(
      (lane) => {
        while (lane.length && lane[0].hitTime + DROP_AFTER_SECONDS < audioTime) {
          lane.shift();
        }
      }
    );
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
    lanes[lane].splice(lanes[lane].indexOf(note), 1);
  }

  // js/game/graphics/layout.js
  var HIT_Y;
  var NOTE_WIDTH;
  var NOTE_HEIGHT;
  var LANE_WIDTH;
  var NOTE_OFFSET;
  var CANVAS_PADDING;
  var canvas = document.getElementById("canvas");
  function initResizeListeners() {
    const observer = new ResizeObserver(() => updateLayout());
    observer.observe(canvas);
    document.addEventListener("fullscreenchange", updateLayout);
  }
  function updateLayout() {
    canvas.width = 0;
    canvas.height = 0;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    HIT_Y = canvas.height * HIT_Y_RATIO;
    NOTE_HEIGHT = canvas.height * NOTE_H_RATIO;
    CANVAS_PADDING = canvas.width * CANVAS_PAD_RATIO;
    LANE_WIDTH = (canvas.width - CANVAS_PADDING * 2) / NUM_LANES;
    NOTE_WIDTH = LANE_WIDTH * NOTE_W_RATIO;
    NOTE_OFFSET = (LANE_WIDTH - NOTE_WIDTH) / 2;
  }

  // js/game/graphics/render.js
  var canvas2 = document.getElementById("canvas");
  var ctx = canvas2.getContext("2d");
  function updateCanvas(audioTime) {
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    drawHitLine();
    drawNotes(audioTime);
  }
  function drawNotes(audioTime) {
    ctx.fillStyle = NOTE_COLOR;
    const lanes2 = getCurrentLanes();
    for (let i = 0; i < lanes2.length; i++) {
      lanes2[i].forEach((note) => {
        const currFallTime = note.hitTime - audioTime - FALL_TIME_SECONDS;
        const currFallPercent = currFallTime / FALL_TIME_SECONDS;
        ctx.fillRect(getLaneX(i), -(currFallPercent * HIT_Y), NOTE_WIDTH, NOTE_HEIGHT);
      });
    }
  }
  function drawHitLine() {
    ctx.fillStyle = HIT_LINE_COLOR;
    ctx.fillRect(0, HIT_Y, canvas2.width, NOTE_HEIGHT);
  }
  function getLaneX(lane) {
    return CANVAS_PADDING + lane * LANE_WIDTH + NOTE_OFFSET;
  }

  // js/game.js
  updateLayout();
  initResizeListeners();
  addEventListener("keydown", onKeyPress);
  function onKeyPress(event) {
    const audioTime = getAudioTime();
    const lane = KEYBINDS[event.key];
    if (lane === void 0)
      return;
    registerHit(audioTime, lane);
    console.log(getPoints());
  }
  var rafId = requestAnimationFrame(gameLoop);
  function gameLoop() {
    const audioTime = getAudioTime();
    updateNotes(audioTime);
    updateCanvas(audioTime);
    requestAnimationFrame(gameLoop);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseAudio();
      cancelAnimationFrame(rafId);
    } else {
      playAudio();
      rafId = requestAnimationFrame(gameLoop);
    }
  });
  playAudio();
})();
