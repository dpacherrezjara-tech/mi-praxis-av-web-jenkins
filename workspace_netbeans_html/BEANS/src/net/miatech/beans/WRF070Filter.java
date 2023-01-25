/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.WRF070;
import net.miatech.beans.Pagination;

/**
 *
 * @author rmayta
 */
public class WRF070Filter extends WRF070 {

    public int QTYDOC = 0;
    public double COM = 0;
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "";
    public String IN_DATE = "";
    public String strDATE = "";
    public String IN_TYPE = "";
    public String IN_MONED = "";
    public String IN_CAREA = "";
    public String IN_REGIO = "";
    public String IN_CPISO = "";
    public String IN_CCITY = "";
    public String IN_CIA = "";
    public String IN_GROUPA = "";
    public String IN_CZONA = "";
    public long lngTotQdoc = 0;
    public double dblTotGross = 0;
    public double dblTotIsc = 0;
    public double dblTotTax = 0;
    public double dblTotNeto = 0;
    public double dblTotCom = 0;
    public double dblTotAvg = 0;
    public double dblTotPer = 0;
    public double AVG = 0;
    public String DES_CIA = "";
    public String DES_CPISO = "";
    public String DES_AGENTE = "";
    public long RN = 0;
    public String DES_FTE = "";
    public String IN_TKT = "";
    
    
    public Pagination page =new Pagination();
}
