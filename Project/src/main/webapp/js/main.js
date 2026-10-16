const xHiddenInput = document.getElementById('x_val');
const yInput = document.getElementById('y_val');
const rInput = document.getElementById('r_val');
const xButtons = document.querySelectorAll('.x-btn');
const pointForm = document.getElementById('pointForm');
const submitBtn = document.getElementById('submitBtn');

const xError = document.getElementById('x_error');
const yError = document.getElementById('y_error');
const rError = document.getElementById('r_error');
const canvasError = document.getElementById('canvas_error');

const MAX_FRACTION_DIGITS = 5;

let yTouched = false;
let rTouched = false;

function getFractionLength(valStr) {
    const parts = valStr.split('.');
    return parts.length > 1 ? parts[1].length : 0;
}

function checkX(showError = true) {
    const val = parseFloat(xHiddenInput.value);
    const isValid = Boolean(xHiddenInput.value && !isNaN(val) && val >= -3 && val <= 5);

    if (xError) {
        if (!isValid && showError) {
            xError.innerText = 'Брат надо X тыкать на такой кнопка слушай';
        } else {
            xError.innerText = "";
        }
    }
    return isValid;
}

function checkY(showError = true) {
    const str = yInput.value.trim().replace(',', '.');

    if (!str) {
        if (yError) yError.innerText = showError ? 'Лее брат Y вообще нет как арбузов в декабре слыш!' : "";
        return false;
    }
    if (!/^-?\d+(\.\d+)?$/.test(str)) {
        if (yError) yError.innerText = showError ? 'Лее субо братик в Y надо вводить число, а ты воду мутишь вводишь буквы!' : "";
        return false;
    }
    if (getFractionLength(str) > MAX_FRACTION_DIGITS) {
        if (yError) yError.innerText = showError ? 'Братик ' + MAX_FRACTION_DIGITS + ' знаков после запятой для игоря' : "";
        return false;
    }
    const val = parseFloat(str);
    if (val <= -3 || val >= 3) {
        if (yError) yError.innerText = showError ? 'Лее брат надо тыкать Y внутри (-3, 3)' : "";
        return false;
    }

    if (yError) yError.innerText = "";
    return true;
}

function checkR(showError = true) {
    const str = rInput.value.trim().replace(',', '.');

    if (!str) {
        if (rError) rError.innerText = showError ? 'Братка мне нужен R и тд' : "";
        return false;
    }
    if (!/^-?\d+(\.\d+)?$/.test(str)) {
        if (rError) rError.innerText = showError ? 'Ты чё шибуршишь напиши число в R ' : "";
        return false;
    }
    if (getFractionLength(str) > MAX_FRACTION_DIGITS) {
        if (rError) rError.innerText = showError ? 'Субо братик ' + MAX_FRACTION_DIGITS + ' знаков после запятой в R пиши' : "";
        return false;
    }
    const val = parseFloat(str);
    if (val <= 2 || val >= 5) {
        if (rError) rError.innerText = showError ? 'Неет брат слушай R в (2,5) делай лее' : "";
        return false;
    }

    if (rError) rError.innerText = "";
    return true;
}

function updateSubmitState() {
    const okY = checkY(yTouched);
    const okR = checkR(rTouched);
    const okX = checkX(okY && okR);

    if (submitBtn) {
        submitBtn.disabled = !(okX && okY && okR);
    }
}

/**
 * Выбор кнопки x
 */
xButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // сбрасываем подсветку у всех бро
        xButtons.forEach(b => b.classList.remove('active'));

        // делаем подсветку у нашего бро
        this.classList.add('active');

        xHiddenInput.value = this.value;

        if (xError) xError.innerText = "";
        updateSubmitState();
    });
});

/**
 * Перерисовка графика при изменении R
 */
rInput.addEventListener('input', function() {
    rTouched = true;
    updateSubmitState();

    const rStr = this.value.trim().replace(',', '.');

    if (/^-?\d+(\.\d+)?$/.test(rStr) && getFractionLength(rStr) <= MAX_FRACTION_DIGITS) {
        const rVal = parseFloat(rStr);
        if (rVal > 2 && rVal < 5) {
            redrawCanvas(rVal);
            return;
        }
    }
    redrawCanvas(null);
});

yInput.addEventListener('input', function() {
    yTouched = true;
    updateSubmitState();
});

/**
 * Отправка формы через кнопку
 */
pointForm.addEventListener('submit', function(e) {
    e.preventDefault();

    yTouched = true;
    rTouched = true;
    const okX = checkX(true);
    const okY = checkY(true);
    const okR = checkR(true);

    if (!okX || !okY || !okR) {
        updateSubmitState();
        return;
    }

    const xStr = xHiddenInput.value;
    const yStr = yInput.value.trim().replace(',', '.');
    const rStr = rInput.value.trim().replace(',', '.');

    const url = `${pointForm.getAttribute('action')}?x=${encodeURIComponent(xStr)}&y=${encodeURIComponent(yStr)}&r=${encodeURIComponent(rStr)}`;
    window.location.href = url;
});

/**
 * Клик по графику
 */
canvas.addEventListener('click', function (e) {
    rTouched = true;
    if (!checkR(true)) {
        rInput.focus();
        return;
    }

    const rStr = rInput.value.trim().replace(',', '.');
    const rVal = parseFloat(rStr);

    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * width / rect.width;
    const clickY = (e.clientY - rect.top) * height / rect.height;

    const mathX = Number(((clickX - center) / scale).toFixed(MAX_FRACTION_DIGITS));
    const mathY = Number(((center - clickY) / scale).toFixed(MAX_FRACTION_DIGITS));

    if (mathX < -3 || mathX > 5 || mathY <= -3 || mathY >= 3) {
        if (canvasError) canvasError.innerText = 'Брат точка должна быть в X [-3 ... 5] и Y (-3 ... 3)';
        return;
    }
    if (canvasError) canvasError.innerText = "";

    // отправка запроса контроллер сервлету
    const url = `${pointForm.getAttribute('action')}?x=${mathX}&y=${mathY}&r=${rVal}`;

    //переход по ссылке на корвлет
    window.location.href = url;
});

//эта штука в случае, если в поле R чёто уже было, то мы перерисовываем
window.addEventListener('DOMContentLoaded', () => {
    if (submitBtn) submitBtn.disabled = true;

    const rStr = rInput.value.trim().replace(',', '.');

    if (/^-?\d+(\.\d+)?$/.test(rStr) && getFractionLength(rStr) <= MAX_FRACTION_DIGITS) {
        const initialR = parseFloat(rStr);
        if (initialR > 2 && initialR < 5) {
            redrawCanvas(initialR);
        }
    }
});