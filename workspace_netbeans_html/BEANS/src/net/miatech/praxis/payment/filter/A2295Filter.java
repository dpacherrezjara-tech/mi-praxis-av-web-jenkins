/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2295;
/**
 *
 * @author andrea
 */
public class A2295Filter  extends A2295{
    public String strYearFrom = "";
    public String strYearTo = "";
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strDayFrom = "";
    public String strDayTo = "";
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "";
    public String IN_CARDN = "";
    public String IN_FTE = "";
    public String IN_PAYMENT = "";
    public String IN_TDOC = "";
    public String IN_CARDC = "";
    public String IN_STVAL = "";
    public String IN_COUNTRY = "";
    public String IN_SDATE = "";
    public String IN_TICKET = "";
    public String IN_MERCHN = "";
    public String IN_DATE = "";
    public String IN_STATT = "";
    public String strTicket = "";
    public String strFormatDate = "";
    public String strDescripcion = "";
    public String strSCARF = "";
    public String strDescCountry = "";
    public String strDescCard = "";
    public String strNUMREF = "";
    
    public  double dblAMOUNT = 0;
    public  double dblTotAMOUNT = 0;
    public  double dblTotAUTAMOUNT = 0;
    public  double dblTotDISAMOUNT= 0;
    public  double dblTotIMPAMOUNT= 0;
    
    public  double dblTotOPEAMOUNT = 0;
    public  double dblToIVA   = 0;
    public  int intToQTYTRNX  = 0;
    
                
    public long lngDays = 0;
    
    public long RN = 0;
    public Pagination page = new Pagination();
}
