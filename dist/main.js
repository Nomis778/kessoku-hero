(() => {
  // js/chart/chart.js
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
    "bpm": 190,
    "source": "../resources/audio/seishun.mp3",
    // Useful to create space before song starts.
    // Audio file needs to match this value.
    "startTimeSeconds": 0,
    "lanes": [
      new Lane([
        // Intro
        { "hitBeat": 13.5 },
        { "hitBeat": 15.5 },
        { "hitBeat": 21.5 },
        { "hitBeat": 29.5 },
        { "hitBeat": 31.5 },
        { "hitBeat": 36.5 },
        { "hitBeat": 38 },
        // Verse
        { "hitBeat": 45.5 },
        { "hitBeat": 47.5 },
        { "hitBeat": 53.5 },
        { "hitBeat": 61.5 },
        { "hitBeat": 63.5 },
        // Verse lick
        { "hitBeat": 80.5 },
        { "hitBeat": 83 },
        // Verse 2
        { "hitBeat": 93.5, "holdBeat": 0.5 },
        { "hitBeat": 94.5 },
        { "hitBeat": 103 },
        { "hitBeat": 109.5, "holdBeat": 0.5 },
        { "hitBeat": 110.5 }
      ]),
      new Lane([
        // Intro
        { "hitBeat": 14 },
        { "hitBeat": 15 },
        { "hitBeat": 22, "holdBeat": 1 },
        { "hitBeat": 30 },
        { "hitBeat": 31 },
        { "hitBeat": 36.5 },
        { "hitBeat": 37.5 },
        { "hitBeat": 38.5 },
        // Verse
        { "hitBeat": 46 },
        { "hitBeat": 47 },
        { "hitBeat": 54, "holdBeat": 1 },
        { "hitBeat": 62 },
        { "hitBeat": 63 },
        // Verse lick
        { "hitBeat": 73.5 },
        { "hitBeat": 75 },
        { "hitBeat": 75.5 },
        { "hitBeat": 76.5 },
        { "hitBeat": 77.5 },
        { "hitBeat": 80 },
        { "hitBeat": 81 },
        // Verse 2
        { "hitBeat": 89.5, "holdBeat": 0.5 },
        { "hitBeat": 90.5 },
        { "hitBeat": 93.5, "holdBeat": 0.5 },
        { "hitBeat": 97.5, "holdBeat": 0.5 },
        { "hitBeat": 98.5 },
        { "hitBeat": 102.5 },
        { "hitBeat": 105.5, "holdBeat": 0.5 },
        { "hitBeat": 106.5 },
        { "hitBeat": 109.5, "holdBeat": 0.5 },
        { "hitBeat": 112, "holdBeat": 2 },
        // "Bridge"
        { "hitBeat": 121 },
        { "hitBeat": 123 }
      ]),
      new Lane([
        //Intro
        { "hitBeat": 14.5 },
        { "hitBeat": 30.5 },
        { "hitBeat": 37 },
        { "hitBeat": 39 },
        // Verse
        { "hitBeat": 46.5 },
        { "hitBeat": 62.5 },
        // Verse lick
        { "hitBeat": 72 },
        { "hitBeat": 72.5 },
        { "hitBeat": 73 },
        { "hitBeat": 74 },
        { "hitBeat": 76 },
        { "hitBeat": 82.5 },
        // Verse 2
        { "hitBeat": 89.5, "holdBeat": 0.5 },
        { "hitBeat": 97.5, "holdBeat": 0.5 },
        { "hitBeat": 102 },
        { "hitBeat": 105.5, "holdBeat": 0.5 },
        { "hitBeat": 114, "holdBeat": 2 },
        { "hitBeat": 117 },
        { "hitBeat": 118 },
        { "hitBeat": 119 },
        // "Bridge"
        { "hitBeat": 121 },
        { "hitBeat": 123 }
      ]),
      new Lane([
        // Intro
        { "hitBeat": 9.5 },
        { "hitBeat": 17.5 },
        { "hitBeat": 25.5 },
        { "hitBeat": 33.5 },
        // Verse
        { "hitBeat": 41.5 },
        { "hitBeat": 49.5 },
        { "hitBeat": 57.5 },
        { "hitBeat": 65.5 },
        // Verse lick
        { "hitBeat": 78 },
        { "hitBeat": 79 },
        // Verse 2
        { "hitBeat": 88, "holdBeat": 0.5 },
        { "hitBeat": 89 },
        { "hitBeat": 92, "holdBeat": 0.5 },
        { "hitBeat": 93 },
        { "hitBeat": 96, "holdBeat": 0.5 },
        { "hitBeat": 97 },
        { "hitBeat": 101.5 },
        { "hitBeat": 104, "holdBeat": 0.5 },
        { "hitBeat": 105 },
        { "hitBeat": 108, "holdBeat": 0.5 },
        { "hitBeat": 109 },
        { "hitBeat": 116.5 },
        { "hitBeat": 117.5 },
        { "hitBeat": 118.5 },
        // "Bridge"
        { "hitBeat": 120 },
        { "hitBeat": 122 }
      ]),
      new Lane([
        // Intro
        { "hitBeat": 8 },
        { "hitBeat": 8.5 },
        { "hitBeat": 9 },
        { "hitBeat": 9.5 },
        { "hitBeat": 10.5 },
        { "hitBeat": 11.5 },
        { "hitBeat": 12.5 },
        { "hitBeat": 16 },
        { "hitBeat": 16.5 },
        { "hitBeat": 17 },
        { "hitBeat": 17.5 },
        { "hitBeat": 18.5 },
        { "hitBeat": 19.5 },
        { "hitBeat": 20.5 },
        { "hitBeat": 24 },
        { "hitBeat": 24.5 },
        { "hitBeat": 25 },
        { "hitBeat": 25.5 },
        { "hitBeat": 26.5 },
        { "hitBeat": 27.5 },
        { "hitBeat": 28.5 },
        { "hitBeat": 32 },
        { "hitBeat": 32.5 },
        { "hitBeat": 33 },
        { "hitBeat": 33.5 },
        { "hitBeat": 34.5 },
        { "hitBeat": 35.5 },
        // Verse
        { "hitBeat": 40 },
        { "hitBeat": 40.5 },
        { "hitBeat": 41 },
        { "hitBeat": 41.5 },
        { "hitBeat": 42.5 },
        { "hitBeat": 43.5 },
        { "hitBeat": 44.5 },
        { "hitBeat": 48 },
        { "hitBeat": 48.5 },
        { "hitBeat": 49 },
        { "hitBeat": 49.5 },
        { "hitBeat": 50.5 },
        { "hitBeat": 51.5 },
        { "hitBeat": 52.5 },
        { "hitBeat": 56 },
        { "hitBeat": 56.5 },
        { "hitBeat": 57 },
        { "hitBeat": 57.5 },
        { "hitBeat": 58.5 },
        { "hitBeat": 59.5 },
        { "hitBeat": 60.5 },
        { "hitBeat": 64 },
        { "hitBeat": 64.5 },
        { "hitBeat": 65 },
        { "hitBeat": 65.5 },
        { "hitBeat": 66.5 },
        { "hitBeat": 67.5 },
        { "hitBeat": 68.5 },
        // Verse lick
        { "hitBeat": 78.5 },
        { "hitBeat": 82 },
        { "hitBeat": 84, "holdBeat": 2 },
        // Verse 2
        { "hitBeat": 88, "holdBeat": 0.5 },
        { "hitBeat": 92, "holdBeat": 0.5 },
        { "hitBeat": 96, "holdBeat": 0.5 },
        { "hitBeat": 100 },
        { "hitBeat": 101 },
        { "hitBeat": 104, "holdBeat": 0.5 },
        { "hitBeat": 108, "holdBeat": 0.5 },
        { "hitBeat": 116 },
        // "Bridge"
        { "hitBeat": 120 },
        { "hitBeat": 122 }
      ])
    ],
    // Translates the chart from beats into audioTime, which is used by the game
    "init": function() {
      this.lanes.forEach((lane) => {
        lane.notes.forEach((note) => {
          note.hitTime = this.startTimeSeconds + note.hitBeat / (this.bpm / 60);
        });
      });
    },
    "resetLanes": function() {
      this.lanes.forEach((lane) => {
        lane.index = 0;
      });
    }
  };
  chart.init();
  var chart_default = chart;

  // js/state/audio.js
  var audio = new Audio(chart_default.source);
  function playAudio() {
    audio.play();
  }
  function pauseAudio() {
    audio.pause();
  }
  function resetAudio() {
    audio.pause();
    audio.currentTime = 0;
  }
  function getAudioTime() {
    return audio.currentTime;
  }
  function addAudioListener(eventName, listener) {
    audio.addEventListener(eventName, listener);
  }

  // js/constants.js
  var NUM_LANES = 5;
  var KEYBINDS = {
    "a": 0,
    "s": 1,
    "d": 2,
    "ArrowLeft": 3,
    "ArrowDown": 4
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
    "PERFECT": 0.035,
    "GOOD": 0.1,
    "OK": 0.3
  };
  Object.freeze(ALLOWED_DIFF);
  var REWARD = {
    "PERFECT": 400,
    "GOOD": 200,
    "OK": 100,
    "MISS": -100
  };
  Object.freeze(REWARD);

  // js/state/hit-type.js
  var HitType = {
    PERFECT: 1,
    GOOD: 2,
    OK: 3,
    MISS: 4
  };
  Object.freeze(HitType);
  function getHitType(diff) {
    if (diff < ALLOWED_DIFF.PERFECT) {
      return HitType.PERFECT;
    } else if (diff < ALLOWED_DIFF.GOOD) {
      return HitType.GOOD;
    } else if (diff < ALLOWED_DIFF.OK) {
      return HitType.OK;
    } else {
      return HitType.MISS;
    }
  }

  // js/state/stats.js
  var statistics = {
    "points": 0,
    "totalHits": 0,
    "numPerfect": 0,
    "numGood": 0,
    "numOk": 0,
    "numMiss": 0
  };
  var highScore = 0;
  var onUpdateCallback = null;
  function addToStatistics(hitType) {
    statistics.totalHits++;
    switch (hitType) {
      case HitType.PERFECT:
        statistics.points += REWARD.PERFECT;
        statistics.numPerfect++;
        break;
      case HitType.GOOD:
        statistics.points += REWARD.GOOD;
        statistics.numGood++;
        break;
      case HitType.OK:
        statistics.points += REWARD.OK;
        statistics.numOk++;
        break;
      case HitType.MISS:
        statistics.points += REWARD.MISS;
        statistics.numMiss++;
        break;
    }
    onUpdateCallback?.();
  }
  function getStatistics() {
    return Object.freeze({ ...statistics });
  }
  function checkAndSetHighScore() {
    if (statistics.points > highScore)
      highScore = statistics.points;
    onUpdateCallback?.();
  }
  function getHighScore() {
    return highScore;
  }
  function onStatisticsUpdate(callback) {
    onUpdateCallback = callback;
  }
  function resetStatistics() {
    for (let key in statistics) {
      statistics[key] = 0;
    }
    onUpdateCallback?.();
  }

  // js/state/notes.js
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
    let diff = Number.MAX_VALUE;
    if (note)
      diff = Math.abs(note.hitTime - hitTime);
    const hitType = getHitType(diff);
    if (hitType !== HitType.MISS)
      removeNote(note, lane);
    addToStatistics(hitType);
  }
  function resetNotes() {
    lanes = [];
    for (let i = 0; i < NUM_LANES; i++) {
      lanes[i] = [];
    }
    chart_default.resetLanes();
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
          addToStatistics(HitType.MISS);
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

  // js/graphics/layout.js
  var HIT_Y;
  var NOTE_WIDTH;
  var NOTE_HEIGHT;
  var LANE_WIDTH;
  var NOTE_OFFSET;
  var CANVAS_PADDING;
  var canvas = document.getElementById("canvas");
  function initResizeListeners() {
    const observer = new ResizeObserver(() => updateLayoutForCurrentWindowSize());
    observer.observe(canvas);
    document.addEventListener("fullscreenchange", updateLayoutForCurrentWindowSize);
  }
  function updateLayoutForCurrentWindowSize() {
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

  // js/graphics/render.js
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

  // js/graphics/stats-ui.js
  function initStatisticsListeners() {
    const points = document.querySelector("#points");
    const perfect = document.querySelector("#perfect");
    const good = document.querySelector("#good");
    const ok = document.querySelector("#ok");
    const miss = document.querySelector("#miss");
    const highScore2 = document.querySelector("#high-score");
    onStatisticsUpdate(function() {
      const stats = getStatistics();
      points.innerHTML = stats.points;
      const total = stats.totalHits;
      perfect.innerHTML = `${stats.numPerfect} (${percentageOf(stats.numPerfect, total)}%)`;
      good.innerHTML = `${stats.numGood} (${percentageOf(stats.numGood, total)}%)`;
      ok.innerHTML = `${stats.numOk} (${percentageOf(stats.numOk, total)}%)`;
      miss.innerHTML = `${stats.numMiss} (${percentageOf(stats.numMiss, total)}%)`;
      highScore2.innerHTML = getHighScore();
    });
    function percentageOf(numerator, denominator) {
      if (denominator === 0)
        return 0;
      const quotient = numerator / denominator;
      return (quotient * 100).toFixed();
    }
  }

  // js/main.js
  init();
  function init() {
    updateLayoutForCurrentWindowSize();
    initResizeListeners();
    initStatisticsListeners();
    initInputHandling();
    initGameLoop();
    addAudioListener("ended", checkAndSetHighScore);
    addAudioListener("ended", reset);
  }
  document.querySelector("#start").addEventListener("click", start);
  document.querySelector("#reset").addEventListener("click", reset);
  var isStarted = false;
  function start() {
    if (!isStarted) {
      isStarted = true;
      playAudio();
    }
  }
  function reset() {
    if (isStarted) {
      resetNotes();
      resetStatistics();
      resetAudio();
      isStarted = false;
    }
  }
  function initInputHandling() {
    addEventListener("keydown", onKeyPress);
    function onKeyPress(event) {
      const audioTime = getAudioTime();
      const lane = KEYBINDS[event.key];
      if (lane === void 0)
        return;
      registerHit(audioTime, lane);
    }
  }
  function initGameLoop() {
    let rafId = requestAnimationFrame(gameLoop);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (isStarted)
          pauseAudio();
        cancelAnimationFrame(rafId);
      } else {
        if (isStarted)
          playAudio();
        rafId = requestAnimationFrame(gameLoop);
      }
    });
  }
  function gameLoop() {
    const audioTime = getAudioTime();
    updateNotes(audioTime);
    updateCanvas(audioTime);
    requestAnimationFrame(gameLoop);
  }
})();
