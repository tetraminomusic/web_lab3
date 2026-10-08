const xHiddenInput = document.getElementById('x_val');
const yInput = document.getElementById('y_val');
const rInput = document.getElementById('r_val');
const xButtons = document.querySelectorAll('.x-btn');
const pointForm = document.getElementById('pointForm');

/**
 * Выбор кнопки x
 */
xButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        xButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        xHiddenInput.value = this.value;
    });
});

/**
 * Перерисовка графика при изменении R
 */
rInput.addEventListener('input', function() {
    const rStr = this.value.trim().replace(',', '.');

    if (/^-?\d+(\.\d+)?$/.test(rStr)) {
        const rVal = parseFloat(rStr);
        if (rVal > 2 && rVal < 5) {
            redrawCanvas(rVal);
            return;
        }
    }
    redrawCanvas(null);
});

/**
 * Валидация значений
 */
function validateValues(xStr, yStr, rStr) {
    const numberPattern = /^-?\d+(\.\d+)?$/.test(xStr);

    if (!xStr || xStr === "") {
        alert('Брат надо X тыкать на такой кнопка слушай');
        return false;
    }

    if (!/^-?\d+(\.\d+)?$/.test(xStr)) {
        alert('Ле бля брат напиши норм X');
        return false;
    }

    const xVal = parseFloat(xStr);
    if (xVal < -3 || xVal > 5) {
        alert('Брат, X должен быть от -3 до 5!');
        return false;
    }

    if (!yStr || yStr === "") {
        alert('Лее брат, Y вообще пустой!');
        return false;
    }

    if (!/^-?\d+(\.\d+)?$/.test(yStr)) {
        alert('Лее брат, в Y надо вводить число, а не буквы!');
        return false;
    }

    const yVal = parseFloat(yStr);
    if (yVal <= -3 || yVal >= 3) {
        alert('Лее брат надо тыкать Y внутри (-3, 3)');
        return false;
    }

    if (!rStr || rStr === "") {
        alert('Братка мне нужен R и тд');
        return false;
    }

    if (!/^-?\d+(\.\d+)?$/.test(rStr)) {
        alert('Ты чё не по понятием шибуршишь напиши число в R ');
        return false;
    }

    const rVal = parseFloat(rStr);
    if (rVal <= 2 || rVal >= 5) {
        alert('Неет брат слушай R то внутри (2,5) делай лее');
        return false;
    }

    return true;
}

/**
 * Отправка формы через кнопку
 */
pointForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const xStr = xHiddenInput.value;
    const yStr = yInput.value.trim().replace(',', '.');
    const rStr = rInput.value.trim().replace(',', '.');

    if (validateValues(xStr, yStr, rStr)) {
        const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf('/', 1));
        const url = `${contextPath}/controller?x=${parseFloat(xStr)}&y=${parseFloat(yStr)}&r=${parseFloat(rStr)}`;
        window.location.href = url;
    }
});

/**
 * Клик по графику
 */
canvas.addEventListener('click', function (e) {
    const rStr = rInput.value.trim().replace(',', '.');

    if (!rStr || !/^-?\d+(\.\d+)?$/.test(rStr) || parseFloat(rStr) <= 2 || parseFloat(rStr) >= 5) {
        alert("Ле братка я ни магу R определить сделай его по русски по человечески слыш");
        return;
    }

    const rVal = parseFloat(rStr);
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const mathX = ((clickX - center) / scale).toFixed(2);
    const mathY = ((center - clickY) / scale).toFixed(2);

    const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf('/', 1));
    const url = `${contextPath}/controller?x=${mathX}&y=${mathY}&r=${rVal}`;

    window.location.href = url;
});

window.addEventListener('DOMContentLoaded', () => {
    const rStr = rInput.value.trim().replace(',', '.');

    if (/^-?\d+(\.\d+)?$/.test(rStr)) {
        const initialR = parseFloat(rStr);
        if (initialR > 2 && initialR < 5) {
            redrawCanvas(initialR);
        }
    }
});