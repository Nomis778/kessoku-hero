import {getHighScore, getStatistics, onStatisticsUpdate} from "../state/stats";

export function initStatisticsListeners() {
    const points = document.querySelector("#points");
    const perfect = document.querySelector("#perfect");
    const good = document.querySelector("#good");
    const mediocre = document.querySelector("#mediocre");
    const miss = document.querySelector("#miss");
    const highScore = document.querySelector("#high-score");

    onStatisticsUpdate(function() {
        const stats = getStatistics()
        points.innerHTML = stats.points;

        const total = stats.totalHits;
        perfect.innerHTML = `${stats.numPerfect} (${percentageOf(stats.numPerfect, total)}%)`;
        good.innerHTML = `${stats.numGood} (${percentageOf(stats.numGood, total)}%)`;
        mediocre.innerHTML = `${stats.numMediocre} (${percentageOf(stats.numMediocre, total)}%)`;
        miss.innerHTML = `${stats.numMiss} (${percentageOf(stats.numMiss, total)}%)`;

        highScore.innerHTML = getHighScore();
    })

    function percentageOf(numerator, denominator) {
        if(denominator === 0)
            return 0;

        const quotient = numerator / denominator;
        return (quotient * 100).toFixed();
    }
}

