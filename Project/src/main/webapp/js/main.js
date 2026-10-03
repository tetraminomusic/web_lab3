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
        // сбрасываем подсветку у всех бро
        xButtons.forEach(b => b.classList.remove('active'));

        // делаем подсветку у нашего бро
        this.classList.add('active');

        xHiddenInput.value = this.value;
    });
});


/**
 * Перерисовка графика при изменении R
 */
rInput.addEventListener('input', function() {
    const rVal = parseFloat(this.value.trim().replace(",", "."));
    if (!isNaN(rVal) && rVal > 2 && rVal < 5) {
        redrawCanvas(rVal);
    } else {
        redrawCanvas(null);
    }
});

/**
 * Валидация значений
 */
function validateValues(x, y, r) {
    if (isNaN(x) || x < -3 || x > 5) {
        alert('Брат надо X тыкать на такой кнопка слушай')
        return false;
    }

    if (isNaN(y) || y <= -3 || y >= 3) {
        alert('Лее брат надо тыкать Y внутри (-3, 3)')
        return false;
    }

    if (isNaN(r) || r <= 2 || r >= 5) {
        alert('Неет брат слушай R то внутри (2,5) делай лее')
        return false;
    }

    return true;
}

/**
 * Отправка формы через кнопку
 */
pointForm.addEventListener('submit', function(e) {
    const x = parseFloat(xHiddenInput.value);
    const y = parseFloat(yInput.value.trim().replace(',','.'));
    const r = parseFloat(rInput.value.trim().replace(',', '.'));

    if (!validateValues(x, y, r)) {
        e.preventDefault(); //стопаем данные если данные говно
    }
});

/**
 * Клик по графику
 */
canvas.addEventListener('click', function (e) {
    const rVal = parseFloat(rInput.value.trim().replace(',','.'));

    if (isNaN(rVal) || rVal <= 2 || rVal >= 5) {
        alert("Ле братка я ни магу R определить сделай его по русски по человечески слыш");
        return false;
    }

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const mathX = ((clickX - center) / scale).toFixed(2);
    const mathY = ((center - clickY) / scale).toFixed(2);

    // отправка запроса контроллер сервлету
    const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf('/', 1));
    const url = `${contextPath}/controller?x=${mathX}&y=${mathY}&r=${rVal}`;

    //переход по ссылке на корвлет
    window.location.href = url;
});

//эта штука в случае, если в поле R чёто уже было, то мы перерисовываем
window.addEventListener('DOMContentLoaded', () => {
    const initialR = parseFloat(rInput.value.trim().replace(',', '.'));

    if (!isNaN(initialR) && initialR > 2 && initialR < 5) {
        redrawCanvas(initialR);
    }
});
