(() => {
  // js/state/audio.js
  var audio;
  var listeners = [];
  function setAudioSource(url) {
    audio = new Audio(url);
    listeners.forEach((listener) => {
      audio.addEventListener(listener.eventName, listener.function);
    });
  }
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
    return audio ? audio.currentTime : 0;
  }
  function addAudioListener(eventName, listener) {
    listeners.push({ "eventName": eventName, "function": listener });
    if (audio != null)
      audio.addEventListener(eventName, listener);
  }

  // js/constants.js
  var CHART_NAME = "seishun";
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

  // js/chart/chart.js
  var chart;
  var songLabel = document.querySelector("#song");
  function loadChart(name) {
    fetch(`../resources/charts/${name}.json`).then((response) => response.json().then((data) => {
      chart = data;
      chart.lanes.forEach((lane) => {
        lane.forEach((note) => {
          note.hitTime = chart.startTimeSeconds + note.hitBeat / (chart.bpm / 60);
        });
      });
      setAudioSource(chart.source);
      loadNotes();
      songLabel.innerHTML = `${chart.band} - ${chart.name}`;
    }));
  }
  function getCurrentChart() {
    return chart;
  }

  // js/state/note-state.js
  var ChartLane = class {
    index = 0;
    constructor(notes) {
      if (!notes)
        this.notes = [];
      else
        this.notes = notes;
    }
    next() {
      return this.notes[this.index];
    }
    incrementIndex() {
      this.index++;
    }
  };
  var currentLanes = [];
  var chartLanes = [];
  function updateNotes(audioTime) {
    spawnNotes(audioTime);
    dropOldNotes(audioTime);
  }
  function getCurrentLanes() {
    return currentLanes;
  }
  function registerHit(hitTime, lane) {
    const note = getClosestNote(hitTime, lane);
    let diff = note ? Math.abs(note.hitTime - hitTime) : Number.MAX_VALUE;
    const hitType = getHitType(diff);
    if (hitType !== HitType.MISS)
      removeNote(note, lane);
    addToStatistics(hitType);
  }
  function resetNotes() {
    loadNotes();
  }
  function loadNotes() {
    const chart2 = getCurrentChart();
    for (let i = 0; i < NUM_LANES; i++) {
      currentLanes[i] = [];
      chartLanes[i] = new ChartLane(chart2.lanes[i]);
    }
  }
  function spawnNotes(audioTime) {
    for (let i = 0; i < chartLanes.length; i++) {
      const lane = chartLanes[i];
      while (lane.next() && lane.next().hitTime <= audioTime + SPAWN_BEFORE_SECONDS) {
        currentLanes[i].push(lane.next());
        lane.incrementIndex();
      }
    }
  }
  function dropOldNotes(audioTime) {
    currentLanes.forEach(
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
    currentLanes[lane].forEach((note) => {
      const diff = Math.abs(note.hitTime - audioTime);
      if (diff < closestDiff) {
        closest = note;
        closestDiff = diff;
      }
    });
    return closest;
  }
  function removeNote(note, lane) {
    currentLanes[lane].splice(currentLanes[lane].indexOf(note), 1);
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
    const lanes = getCurrentLanes();
    for (let i = 0; i < lanes.length; i++) {
      lanes[i].forEach((note) => {
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
    loadChart(CHART_NAME);
    addAudioListener("ended", checkAndSetHighScore);
    addAudioListener("ended", reset);
    initStatisticsListeners();
    initInputHandling();
    initGameLoop();
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
    addEventListener("keydown", (event) => {
      if (!isStarted)
        return;
      const audioTime = getAudioTime();
      const lane = KEYBINDS[event.key];
      if (lane === void 0)
        return;
      registerHit(audioTime, lane);
    });
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
