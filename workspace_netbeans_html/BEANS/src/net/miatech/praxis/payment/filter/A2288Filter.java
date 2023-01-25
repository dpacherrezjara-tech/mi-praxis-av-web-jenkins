/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2288;

/**
 *
 * @author claudia
 */
public class A2288Filter extends A2288 {

    public long RN = 0;
    public Pagination page = new Pagination();
    public String strDate = "";
    public String strYearFrom = "";
    public String strYearTo = "";
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strDescReject = "";
    public String strMailTo = "";
    public String strMailCC = "";
    public String strMailSubject = "";
    public String strMailText = "";
    public String strFechaI = "";
    public String strFechaF = "";
    public long lngTotTrans = 0;
    public double dblTotMonto = 0;
}
