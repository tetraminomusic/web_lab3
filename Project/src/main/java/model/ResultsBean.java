package model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ResultsBean implements Serializable {
    private static final long serialVersionUID = 1L;
    private final List<Point> points;

    public ResultsBean() {
        this.points = Collections.synchronizedList(new ArrayList<>());
    }

    /**
     * Метод для добавления точки в эррей
     */
    public void addPoint(Point point) {
        points.add(0, point);
    }

    /**
     * Метод получения точек из массива
     */
    public List<Point> getPoints() {
        return points;
    }

    /**
     * Метод проверки, пустой ли массив
     */
    public boolean isEmpty() {
        return points.isEmpty();
    }
}
