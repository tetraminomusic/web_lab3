package model;

import java.util.regex.Pattern;

public class AreaChecker {

    private static final int MAX_FRACTION_DIGITS = 5;
    private static final Pattern NUMBER_PATTERN = Pattern.compile("-?\\d+(\\.\\d+)?");

    // X: Button {-3, -2, -1, 0, 1, 2, 3, 4, 5}
    // Y: Text (-3 ... 3)
    // R: Text (2 ... 5)

    public static double parse(String raw, String name) {
        if (raw == null || raw.trim().isEmpty()) {
            throw new IllegalArgumentException("Параметр " + name + " не передан");
        }

        String s = raw.trim().replace(',', '.');

        if (!NUMBER_PATTERN.matcher(s).matches()) {
            throw new IllegalArgumentException("Параметр " + name + " должен быть числом");
        }

        checkFractionDigits(s, name);

        return Double.parseDouble(s);
    }

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

    private static void checkFractionDigits(String s, String name) {
        int dotIdx = s.indexOf('.');
        if (dotIdx != -1) {
            int digits = s.length() - dotIdx - 1;
            if (digits > MAX_FRACTION_DIGITS) {
                throw new IllegalArgumentException("Параметр " + name + " содержит больше " + MAX_FRACTION_DIGITS + " знаков после запятой!");
            }
        }
    }

    /**
     * Проверка, попал ли дебилиус по точке
     */
    public static boolean checkHit(double x, double y, double r) {
        if (x >= 0 && y >= 0) {
            return (x * x + y * y) <= (r * r);
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
