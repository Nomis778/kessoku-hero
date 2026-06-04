import {getStatistics, onStatisticsUpdate} from "./score";

export function initStatisticsListeners() {
    const points = document.querySelector("#points");
    const perfect = document.querySelector("#perfect");
    const good = document.querySelector("#good");
    const mediocre = document.querySelector("#mediocre");
    const miss = document.querySelector("#miss");

    onStatisticsUpdate(function() {
        const stats = getStatistics()
        points.innerHTML = stats.points;

        const total = stats.totalHits;
        perfect.innerHTML = `${stats.numPerfect} (${toPercent(stats.numPerfect / total)}%)`;
        good.innerHTML = `${stats.numGood} (${toPercent(stats.numGood / total)}%)`;
        mediocre.innerHTML = `${stats.numMediocre} (${toPercent(stats.numMediocre / total)}%)`;
        miss.innerHTML = `${stats.numMiss} (${toPercent(stats.numMiss / total)}%)`;
    })

    function toPercent(number) {
        return (number * 100).toFixed();
    }
}

