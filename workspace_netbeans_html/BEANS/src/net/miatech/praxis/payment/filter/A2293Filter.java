/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2293;

/**
 *
 * @author claudia
 */
public class A2293Filter extends A2293 {

    public long RN = 0;
    public String strDate = "";
    public String strYearFrom = "";
    public String strYearTo = "";
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strFormatDate = "";
    public String IN_TDOC = "";
    public String IN_FNOBANK = "";
    
    public long lngTOTSET = 0;
    public long lngTOTBNK = 0;
    
    public long lngTotQMATCH = 0;
    public double dblTotSVFOPM = 0;
    public long lngTotQSTWPY = 0;
    public double dblTotASTWPY = 0;
    public long lngTotQPYWST = 0;
    public double dblTotAPYWST = 0;
    public long lngTotQACCEP = 0;
    public double dblTotAACCEP = 0;
    public long lngTotQREJEC = 0;
    public double dblTotAREJEC = 0;
    public long lngTotQSUSPE = 0;
    public double dblTotASUSPE = 0;
    public long lngTotTOTSET = 0;
    public long lngTotTOTBNK = 0;
    
    
    public Pagination page = new Pagination();
}
