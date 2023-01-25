/*
 * RECWRF011.java
 *
 * Created on 7 de abril de 2008, 12:01 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;
import net.miatech.libmiatec.WRF011;


public class WRF011Filter extends WRF011 implements Serializable {
    
    public String billingMonthFrom = "";
    public String billingMonthTo = "";
    public String billingYearFrom = "";
    public String billingYearTo = "";
    public String billingDayFrom = "";
    public String billingDayTo = "";
    public String strAirName = "";
    public String strTReg = "";
    public String strDescDoc = "";
    public String strFlag = "";
    public int intQTYINV = 0;
    public double dblPercRev = 0;
    public double dblPerc = 0;
    public double dblPercG = 0;
    public double dblPercT = 0;
    public double dblPercI = 0;
    public double dblPercQInv = 0;
    public double dblPercQAud = 0;
    public double dblPercQObs = 0;
    public double dblPercInv = 0;
    public double dblPercObs = 0;
    
}
