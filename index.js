var WINDOW_WIDTH = 1100;
var WINDOW_HEIGHT = 700;
var RADIUS = 8;
var MARGIN_TOP = 300;
var MARGIN_LEFT = 30;
var DAYS_MARGIN_TOP = 60;
var DAYS_MARGIN_LEFT = 300;

const endTime = new Date(2017, 7, 4, 20, 0, 0);
var curShowTimeSeconds = 0;

window.onload = function() {
    var canvas = document.getElementById("canvas");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    var context = canvas.getContext("2d");

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function() {
        render(context);
        update();
    }, 500);
};

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000);
    return ret > 0 ? ret : 0;
}

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextDays = ~~(nextShowTimeSeconds / 86400);
    var nextHours = ~~((nextShowTimeSeconds - nextDays * 24 * 3600) / 3600);
    var nextMinutes = ~~((nextShowTimeSeconds - nextDays * 24 * 3600 - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curDays = ~~(curShowTimeSeconds / 86400);
    var curHours = ~~((curShowTimeSeconds - curDays * 24 * 3600) / 3600);
    var curMinutes = ~~((curShowTimeSeconds - curDays * 24 * 3600 - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if(nextSeconds !== curSeconds) {
        curShowTimeSeconds = nextShowTimeSeconds;
    }
}

function render(cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    var days = ~~(curShowTimeSeconds / 86400);
    var hours = ~~((curShowTimeSeconds - days * 24 * 3600) / 3600);
    var minutes = ~~((curShowTimeSeconds - days * 24 * 3600 - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    renderDigit(DAYS_MARGIN_LEFT, DAYS_MARGIN_TOP, ~~(days / 10), cxt);
    renderDigit(DAYS_MARGIN_LEFT + 7 * 2 * (RADIUS + 1) + (RADIUS + 1), DAYS_MARGIN_TOP, days % 10, cxt);
    renderDigit(DAYS_MARGIN_LEFT + 2 * (7 * 2 * (RADIUS + 1) + 3 * (RADIUS + 1)), DAYS_MARGIN_TOP, 11, cxt);

    renderDigit(MARGIN_LEFT, MARGIN_TOP, ~~(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 7 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, hours % 10, cxt);
    renderDigit(MARGIN_LEFT + 2 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)), MARGIN_TOP, 10, cxt);

    renderDigit(MARGIN_LEFT + 2 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 4 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, ~~(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 3 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 4 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, minutes % 10, cxt);
    renderDigit(MARGIN_LEFT + 4 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 4 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, 10, cxt);

    renderDigit(MARGIN_LEFT + 4 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 2 * 4 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, ~~(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 5 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 2 * 4 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, seconds % 10, cxt);
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0, 102, 153)";

    for(let i = 0; i < digit[num].length; i++) {
        for(let j = 0; j < digit[num][i].length; j++) {
            if(digit[num][i][j] === 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}