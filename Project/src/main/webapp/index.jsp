<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Лабораторная работа 3 by tetramino</title>

        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/mobile.css" media="(max-width: 767px)">
    </head>
    <body>

        <!-- Шапка сайта -->

        <table class="header-table">
          <tr>
              <td>
                  <strong>ФИО:</strong> Малых Кирилл Романович | <strong>Группа:</strong> P3232 | <strong>Вариант:</strong> 75295708
              </td>
          </tr>
        </table>


        <table class="main-layout">
            <tr>

              <!-- Левая колонвка c графиком -->

              <td class="column" style="width: 60%; text-align: center;">
                <canvas id="graphCanvas" width="800" height="800"></canvas>
              </td>

              <!--Правая колонка -->

              <td class="column" style="width: 40%;">
                <form id="pointForm" action="${pageContext.request.contextPath}/controller" method="GET">
                    <table style="width: 100%;">

                        <!--Про X -->
                        <tr>
                          <td>
                            <strong>Изменение X:</strong>
                          </td>
                          <td>
                            <input type="hidden" id="x_val" name="x" value="">

                            <div class="x-buttons">
                                <button type="button" class="x-btn" value="-3">-3</button>
                                <button type="button" class="x-btn" value="-2">-2</button>
                                <button type="button" class="x-btn" value="-1">-1</button>
                                <button type="button" class="x-btn" value="0">0</button>
                                <button type="button" class="x-btn" value="1">1</button>
                                <button type="button" class="x-btn" value="2">2</button>
                                <button type="button" class="x-btn" value="3">3</button>
                                <button type="button" class="x-btn" value="4">4</button>
                                <button type="button" class="x-btn" value="5">5</button>
                            </div>
                          </td>
                        </tr>

                        <!--Про Y-->
                        <tr>
                          <td>
                              <strong>Изменение Y:</strong>
                          </td>
                          <td>
                              <input type="text" id="y_val" name="y" placeholder="Число от -3 до 3" required>
                          </td>
                        </tr>

                        <!--Про R -->
                        <tr>
                            <td>
                                <strong>Изменение R:</strong>
                            </td>
                            <td>
                                <input type="text" id="r_val" name="r" placeholder="Число от 2 до 5" required>
                            </td>
                        </tr>

                        <!--Кнопка отправки-->
                        <tr>
                          <td colspan="2" class="button-cell">
                              <button type="submit" id="submitBtn">Проверить точку</button>
                          </td>
                        </tr>
                    </table>
                </form>
              </td>
            </tr>
        </table>

        <!--Вывод результатов проверки -->
        <table class="results-table" id="resultsTable">
          <thead>
              <tr>
                  <th>X</th>
                  <th>Y</th>
                  <th>R</th>
                  <th>Результат</th>
                  <th>Время проверки</th>
                  <th>Время работы скрипта</th>
              </tr>
          </thead>
          <tbody>
            <c:forEach items="${sessionScope.results.points}" var="point">
                <tr>
                    <td>${point.x}</td>
                    <td>${point.y}</td>
                    <td>${point.r}</td>
                    <td style="color: ${point.hit ? '#27ae60' : '#e74c3c'}; font-weight: bold;">
                        ${point.hit ? 'Попадание' : 'Промах'}
                    </td>
                    <td>${point.checkTime}</td>
                    <td>${point.executionTime} нс</td>
                </tr>
            </c:forEach>
          </tbody>
        </table>

        <script src="${pageContext.request.contextPath}/js/canvas.js"></script>
        <script src="${pageContext.request.contextPath}/js/main.js"></script>
    </body>
</html>
