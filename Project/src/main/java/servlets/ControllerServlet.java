package servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
