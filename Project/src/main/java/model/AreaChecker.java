package model;

public class AreaChecker {

    private static final int MAX_FRACTION_DIGITS = 7;

    // X: Button {-3, -2, -1, 0, 1, 2, 3, 4, 5}
    // Y: Text (-3 ... 3)
    // R: Text (2 ... 5)

    /**
     * Валидация емае
     */

    public static void validate(double x, double y, double r, String yRaw, String rRaw) {

        checkScale(yRaw, "Y");
        checkScale(rRaw, "R");

        if (r <= 2 || r >= 5) {
            throw new IllegalArgumentException("R должен быть в диапазоне [2 ... 5]");
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

    private static void checkScale(String rawValue, String fieldName) {
        if (rawValue == null) return;
        String normalized = rawValue.trim().replace(',', '.');
        int dotIndex = normalized.indexOf('.');
        if (dotIndex != -1) {
            int fractionLength = normalized.length() - dotIndex - 1;
            if (fractionLength > MAX_FRACTION_DIGITS) {
                throw new IllegalArgumentException("Параметр " + fieldName + " имеет овер много цифр ле брат исправь");
            }
        }
    }
}
