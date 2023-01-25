/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author vhidalgo
 */
public class SQP01548Filter {    
    
    public String VP_CCUST = "";
    public String VP_PER = "";
    
    public int QTY_ON_ALL = 0;
    public int KM_ON_ALL = 0;
    public double FARE_ON_ALL = 0d;
    public int QTY_OFF_ALL = 0;
    public int KM_OFF_ALL = 0;
    public double FARE_OFF_ALL = 0d;
    
    public String MES = "";
    public int QTY_ON = 0;
    public int KM_ON = 0;
    public double FARE_ON = 0d;
    public int QTY_OFF = 0;
    public int KM_OFF = 0;
    public double FARE_OFF = 0d;
    public double VAL_EST_OFF = 0d;
    public double DIFF = 0d;
    
    public int typeColumn = 0;
    
    // Campos para paginar SQL
    public Pagination page = new Pagination();
    
}
