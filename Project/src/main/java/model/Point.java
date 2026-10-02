package model;

import java.io.Serializable;

public class Point implements Serializable {
    private static final long serialVersionUID = 1L;

    // поля

    private double x;
    private double y;
    private double r;
    private boolean hit;
    private String checkTime;
    private long executionTime;

    // Нужная штучка для джавы фасоли, так как объект часто создаётся через рефлексию
    public Point() {
    }

    public Point(double x, double y, double r, boolean hit, String checkTime, long executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.checkTime = checkTime;
        this.executionTime = executionTime;
    }

    // X

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    // Y

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    // R

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    // hit

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    // checkTime

    public String getCheckTime() {
        return checkTime;
    }

    public void setCheckTime(String checkTime) {
        this.checkTime = checkTime;
    }

    // executionTime

    public long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }
}
