package servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// Эта аннотация нужна, что автоматически url связать с этим классом, топ
@WebServlet(name = "AreaCheckServlet", value = "/area-check")
public class AreaCheckServlet extends HttpServlet {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long startTime = System.nanoTime();

        String xStr = request.getParameter("x");
        String yStr = request.getParameter("y");
        String rStr = request.getParameter("r");

        try {
            double x = Double.parseDouble(xStr.trim().replace(',', '.'));
            double y = Double.parseDouble((yStr.trim().replace(',', '.')));
            double r = Double.parseDouble(rStr.trim().replace(',', '.'));

            AreaChecker.validate(x, y, r);

            boolean hit = AreaChecker.checkHit(x, y, r);

            long executionTimeNs = System.nanoTime() - startTime;
            String currentTime = LocalDateTime.now().format(DATE_FORMATTER);

            Point point = new Point(x, y, r, hit, currentTime, executionTimeNs);

            // создаём или получаем текущую сессию пользователья
            HttpSession session = request.getSession();

            // пробуем достать наши точки
            ResultsBean resultsBean = (ResultsBean) session.getAttribute("results");

            // если первый раз в первый класс ёпта
            if (resultsBean == null) {
                resultsBean = new ResultsBean();

                session.setAttribute("results", resultsBean);
            }

            resultsBean.addPoint(point);

            request.setAttribute("currentPoint", point);

            //перенаправляем на страницу результатов
            request.getRequestDispatcher("/result.jsp").forward(request, response);
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Координаты должны быть числами!");
        } catch (IllegalArgumentException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }
    }
}
