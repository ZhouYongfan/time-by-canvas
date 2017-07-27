var WINDOW_WIDTH = 1100;
var WINDOW_HEIGHT = 750;
var RADIUS = 8;
var MARGIN_TOP = 300;
var MARGIN_LEFT = 30;
var DAYS_MARGIN_TOP = 60;
var DAYS_MARGIN_LEFT = 300;

const endTime = new Date(2017, 7, 4, 20, 0, 0);
var curShowTimeSeconds = 0;

var balls =[];

window.onload = function() {

    DAYS_MARGIN_TOP = Math.round(WINDOW_HEIGHT / 20);

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    MARGIN_TOP = DAYS_MARGIN_TOP + 2 * 10 * RADIUS + 10 * RADIUS;

    DAYS_MARGIN_LEFT = MARGIN_LEFT + 2 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1));

    var canvas = document.getElementById("canvas");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    var context = canvas.getContext("2d");

    // context.fillStyle = '#'+(~~(Math.random()*(1<<24))).toString(16);

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function() {
        render(context);
        update();
    }, 16.7);
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
        if(~~(curDays / 10) !== ~~(nextDays / 10)) {
            addBalls(DAYS_MARGIN_LEFT, DAYS_MARGIN_TOP, ~~(curDays / 10));
        }
        if((curDays % 10) !== (nextDays % 10)) {
            addBalls(DAYS_MARGIN_LEFT  + 2 * (7 * 2 * (RADIUS + 1) + 3 * (RADIUS + 1)), DAYS_MARGIN_TOP, (curDays % 10));
        }

        if(~~(curHours / 10) !== ~~(nextHours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, ~~(curHours / 10));
        }
        if((curHours % 10) !== (nextHours % 10)) {
            addBalls(MARGIN_LEFT + 7 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, (curHours % 10));
        }

        if(~~(curMinutes / 10) !== ~~(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 2 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 4 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, ~~(curMinutes / 10));
        }
        if((curMinutes % 10) !== (nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 3 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 4 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, (curHours % 10));
        }

        if(~~(curSeconds / 10) !== ~~(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 4 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 2 * 4 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, ~~(curSeconds / 10));
        }
        if((curSeconds % 10) !== (nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 5 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 2 * 4 * 2 * (RADIUS + 1) + (RADIUS + 1), MARGIN_TOP, (curSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;

    }

    updateBalls();
}

function updateBalls() {
    for(let i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT -RADIUS;
            balls[i].vy = - balls[i].vy * 0.7;
        }
    }

    var cnt = 0;
    for(let i = 0; i < balls.length; i++) {
        if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }

    while(balls.length > Math.min(cnt, 300)) {
        balls.pop();
    }
}

function addBalls(x, y, num) {
    for(let i = 0; i < digit[num].length; i++) {
        for(let j = 0; j < digit[num][i].length; j++) {
            if(digit[num][i][j] === 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 0.98 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: '#'+(~~(Math.random()*(1<<24))).toString(16)
                }

                balls.push(aBall);
            }
        }
    }
}

function render(cxt) {
    cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);

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

    renderDigit(MARGIN_LEFT + 4 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 2 * 4 * 2 * (RADIUS + 1) + 2 * (RADIUS + 1), MARGIN_TOP, ~~(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 5 * (7 * 2 * (RADIUS + 1) + (RADIUS + 1)) + 2 * 4 * 2 * (RADIUS + 1) + 2 * (RADIUS + 1), MARGIN_TOP, seconds % 10, cxt);

    for(let i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
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