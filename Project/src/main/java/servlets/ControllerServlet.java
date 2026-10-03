package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ControllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {

    /**
     * Выполнение транзакции запроса с методом GET
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String xParam = request.getParameter("x");
        String yParam = request.getParameter("y");
        String rParam = request.getParameter("r");

        // Проверка на, а пришли ли эти данные или нет.

        if (xParam != null && yParam != null && rParam != null && !xParam.trim().isEmpty() && !yParam.trim().isEmpty() && !rParam.trim().isEmpty()) {
            // параметры есть круто топчик
            // отправляем работать area checker, пусть не мается хернёй правильно
            request.getRequestDispatcher("/area-check").forward(request, response);
        } else {
            // параметров нет блина это плохо очень
            // ну кидаем пользователю статику в виде странички
            request.getRequestDispatcher("/index.jsp").forward(request, response);

        }


    }
}
