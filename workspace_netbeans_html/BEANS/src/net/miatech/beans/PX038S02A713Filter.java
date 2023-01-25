/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A713;

/**
 *
 * @author jmeiggs
 */
public class PX038S02A713Filter extends A713 {
    public int IN_OPCION = 0;
    public String IN_AIRLIN = "";
    public String IN_GRUPO = "";
    public String IN_TKT = "";
    public String IN_IATA = "";
    
    public String DOCUMENTO = "";
    public String CNJ = "";
    public String CUPON = "";
    
    public String CURADC = "";
    public double ADC = 0.00;
    
    public int QTY_ERROR = 0;
    
    public Pagination page = new Pagination();
}
