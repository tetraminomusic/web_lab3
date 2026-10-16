const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const logicalSize = 400;
const dpr = window.devicePixelRatio || 1;

canvas.width = logicalSize * dpr;
canvas.height = logicalSize * dpr;

canvas.style.width = '100%';
canvas.style.maxWidth = logicalSize + 'px';
canvas.style.height = 'auto';
canvas.style.aspectRatio = '1 / 1';

ctx.scale(dpr, dpr);

const width = logicalSize;
const height = logicalSize;
const center = width / 2;
const scale = 36; // масштаб под сетку -5, 5
const graphInfo = document.getElementById('graphInfo');
const SIZE_DIGITS = 5;
let currentR = null;

function drawShape(r) {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#3399FF';

    // 1 четверть (сектор круга)
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, r * scale, -Math.PI / 2, 0, false);
    ctx.fill();

    // 3 четверть (треугольник)
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center - r * scale, center);
    ctx.lineTo(center, center + r * scale);
    ctx.closePath();
    ctx.fill();

    // 4 четверть (прямоугольник)
    ctx.fillRect(center, center, (r / 2) * scale, r * scale);
}

// отрисовка осей
function drawAxes() {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.font = '11px Arial';

    ctx.beginPath();

    // Ось X
    ctx.moveTo(10, center);
    ctx.lineTo(width - 10, center);

    // Ось Y
    ctx.moveTo(center, 10);
    ctx.lineTo(center, height - 10);

    // Стрелка оси X
    ctx.moveTo(width - 18, center - 4);
    ctx.lineTo(width - 10, center);
    ctx.lineTo(width - 18, center + 4);

    // Стрелка оси Y
    ctx.moveTo(center - 4, 18);
    ctx.lineTo(center, 10);
    ctx.lineTo(center + 4, 18);

    ctx.stroke();

    const values = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];

    values.forEach(val => {
        const pos = center + val * scale;

        ctx.beginPath();
        ctx.moveTo(pos, center - 3);
        ctx.lineTo(pos, center + 3);

        if (val !== 0) {
            ctx.fillText(val, pos - 4, center + 15);
        }

        ctx.moveTo(center - 3, center - val * scale);
        ctx.lineTo(center + 3, center - val * scale);

        if (val !== 0) {
            ctx.fillText(val, center + 6, center - val * scale + 4);
        }
        ctx.stroke();
    });

    // подписи осей и нуля
    ctx.fillText("X", width - 5, center - 8);
    ctx.fillText("Y", center + 8, 18);
    ctx.fillText("0", center - 10, center + 14);
}

// достаем точки из таблицы сессии
function drawPointsFromTable(currentR) {
    const rows = document.querySelectorAll("#resultsTable tbody tr");

    rows.forEach(row => {
        if (row.dataset.x !== undefined) {
            const x = parseFloat(row.dataset.x);
            const y = parseFloat(row.dataset.y);
            const r = parseFloat(row.dataset.r);
            const isHit = row.dataset.hit === 'true';

            const xPx = center + x * scale;
            const yPx = center - y * scale;

            ctx.beginPath();
            ctx.arc(xPx, yPx, 4, 0, 2 * Math.PI);

            if (currentR && Math.abs(r - currentR) < 0.0001) {
                ctx.fillStyle = isHit ? '#27ae60' : '#ef4444';
            } else {
                ctx.fillStyle = '#94a3b8';
            }

            ctx.fill();
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    });
}

function isValidR(r) {
    return r !== null && !isNaN(r) && r > 2 && r < 5;
}

function redrawCanvas(r) {
    currentR = r;
    if (isValidR(r)) {
        drawShape(r);
    } else {
        ctx.clearRect(0, 0, width, height);
    }
    drawAxes();
    drawPointsFromTable(r);
    logGraphMetrics(r);
}

redrawCanvas(null);

function formatPx(value) {
    return Number(value.toFixed(SIZE_DIGITS));
}

function getGraphMetrics(r) {
    const rect = canvas.getBoundingClientRect();
    const displayRatio = rect.width / width;

    return {
        radius: formatPx(r * scale * displayRatio),
        halfRadius: formatPx((r / 2) * scale * displayRatio),
        radiusPhysical: formatPx(r * scale * displayRatio * dpr),
        halfRadiusPhysical: formatPx((r / 2) * scale * displayRatio * dpr),
        canvasSize: formatPx(rect.width)
    };
}

function updateGraphInfo(r) {
    if (!graphInfo) return;

    if (!isValidR(r)) {
        graphInfo.textContent =
            'R вне диапазона (2 ... 5)\n' +
            'Круг: —\n' +
            'Треугольник: —\n' +
            'Прямоугольник: —';
        return;
    }

    const m = getGraphMetrics(r);
    graphInfo.textContent =
        `R = ${r}, график ${m.canvasSize}x${m.canvasSize} px\n` +
        `Круг: радиус ${m.radius} px\n` +
        `Треугольник: катеты ${m.radius}x${m.radius} px\n` +
        `Прямоугольник: ${m.halfRadius}x${m.radius} px`;
}

function logGraphMetrics(r) {
    updateGraphInfo(r);

    console.group(`R = ${r !== null && !isNaN(r) ? r : 'не задан'}`);
    if (isValidR(r)) {
        const m = getGraphMetrics(r);

        console.log(`График: ${m.canvasSize}x${m.canvasSize} px, devicePixelRatio = ${dpr}`);
        console.log(`Круг: радиус = ${m.radius} px (${m.radiusPhysical} физ. px)`);
        console.log(`Треугольник: катеты = ${m.radius}x${m.radius} px (${m.radiusPhysical}x${m.radiusPhysical} физ. px)`);
        console.log(`Прямоугольник: ширина = ${m.halfRadius} px, высота = ${m.radius} px (${m.halfRadiusPhysical}x${m.radiusPhysical} физ. px)`);
    } else {
        console.log(`Область не построена R вне диапазона (2 ... 5)`);
    }
    console.groupEnd();
}

window.addEventListener('resize', () => updateGraphInfo(currentR));