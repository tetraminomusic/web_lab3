package model;

public class AreaChecker {

    // X: Button {-3, -2, -1, 0, 1, 2, 3, 4, 5}
    // Y: Text (-3 ... 3)
    // R: Text (2 ... 5)

    /**
     * Валидация емае
     */

    public static void validate(double x, double y, double r) {
        if (r <= 2 || r >= 5) {
            throw new IllegalArgumentException("R должен быть в диапазоне (2 ... 5)");
        }

        if (x < -3 || x > 5) {
            throw new IllegalArgumentException("X должен быть в пределах [-3 ... 5]");
        }

        if (y <= -3 || y >= 3) {
            throw new IllegalArgumentException("Y должен быть в диапазоне (-3 ... 3)");
        }
    }

    /**
     * Проверка, попал ли дебилиус по точке
     */
    public static boolean checkHit(double x, double y, double r) {
        if (x >= 0 && y >= 0) {
            return (x * x + y * y) <= (r * r);
        }

        if (x <= 0 && y >= 0) {
            return false;
        }

        if (x <= 0 && y <= 0) {
            return y >= (-x - r);
        }

        if (x >= 0 && y <= 0) {
            return (x <= r / 2) && (y >= -r);
        }

        return false;
    }
}
