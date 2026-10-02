<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Результат проверки точки</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/mobile.css" media="(max-width: 767px)">
</head>
<body>
    <table class="header-table">
        <tr>
            <td>
                <strong>ФИО:</strong> Малых Кирилл Романович
                | <strong>Группа:</strong> P3232
                | <strong>Вариант:</strong> 75295708
            </td>
        </tr>
    </table>

    <div style="max-width: 600px; margin: 30px auto; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">

        <h2 style="color: #2c3e50; margin-top: 0;">Результат вычислений</h2>

        <table class="results-table" style="margin-top: 15px;">
            <thead>
                <tr>
                    <th>Параметр</th>
                    <th>Значение</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Координата X</strong></td>
                    <td>${currentPoint.x}</td>
                </tr>
                <tr>
                    <td><strong>Координата Y</strong></td>
                    <td>${currentPoint.y}</td>
                </tr>
                <tr>
                    <td><strong>Радиус R</strong></td>
                    <td>${currentPoint.r}</td>
                </tr>
                <tr>
                    <td><strong>Итог</strong></td>
                    <td style="color: ${currentPoint.hit ? '#27ae60' : '#e74c3c'}; font-size: 18px; font-weight: bold;">
                        ${currentPoint.hit ? 'Хорош' : 'Косой'}
                    </td>
                </tr>
                <tr>
                    <td><strong>Время проверки</strong></td>
                    <td>${currentPoint.checkTime}</td>
                </tr>
                <tr>
                    <td><strong>Время расчета</strong></td>
                    <td>${currentPoint.executionTime} нс</td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 25px;">
            <a href="${pageContext.request.contextPath}/controller"
               style="display: inline-block; padding: 12px 28px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
               Вернуться к форме
            </a>
        </div>

    </div>
</body>
</html>