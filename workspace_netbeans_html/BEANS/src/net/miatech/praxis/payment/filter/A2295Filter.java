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
    public String IN_PRDA = "";
    public String IN_CCIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_FCONCEP = "";
    public String IN_FSELEC = "";
    public String IN_CURRENCY1 = "";
    public String IN_SCURRENCY = "";
    public String IN_CURRENCY2 = "";
    public String IN_SPAYMENT = "";
    public String IN_TKT = "";
    public String IN_SAGENT = "";
    public String IN_SPNR = "";
    public String IN_PNR = "";
    public String IN_SCARDN1 = "";
    public String IN_SCARDN2 = "";
    public String IN_SVFOT = "";
    public String IN_CARDN = "";
    public String IN_FTE = "";
    public String IN_PAYMENT = "";
    public String IN_TDOC = "";
    public String IN_SCARDNCOR = "";
    public String IN_CARDC = "";
    public String IN_STVAL = "";
    public String IN_TRANL = "";
    public String IN_SEQ = "";
    public String IN_COUNTRY = "";
    public String IN_SDATE = "";
    public String IN_TICKET = "";
    public String IN_MERCHN = "";
    public String IN_SAUTHOC = "";
    public String IN_STVALU = "";
    public String IN_DATE = "";
    public String IN_STATT = "";
    public String IN_SCOUNTRY = "";
    public String IN_CARDTYPE = "";
    public String IN_ADMNUM = "";
    public String strTicket = "";
    public String strFormatDate = "";
    public String strDescripcion = "";
    public String strSCARF = "";
    public String strDescCountry = "";
    public String strDescCard = "";
    public String strNUMREF = "";
    public String IN_TITLE = "";
    public String periodo = "";
    public String mail_notificacion = "";
    
//NEW VIEW ADM
    public String IN_FSEND = "";
    public String IN_FRCV = "";
    public String IN_SCARCOD = "";
    
    public  double dblAMOUNT = 0;
    public  double dblTotAMOUNT = 0;
    public  double dblTotAUTAMOUNT = 0;
    public  double dblTotDISAMOUNT= 0;
    public  double dblTotIMPAMOUNT= 0;
    
    public  double dblTotOPEAMOUNT = 0;
    public  double dblToIVA   = 0;
    public  double SVFOPUSD   = 0;
    public  double SVFOPC1   = 0;
    public  String SPAYMENT   = "";
    public  int intToQTYTRNX  = 0;
    public String MCLOS = "";
    public String SCURREVEN = "";
    public String FDESD = "";
    public String F_STVAL = "";
    
                
    public long lngDays = 0;
    public long CANT = 0;
    
    public long RN = 0;
    public Pagination page = new Pagination();
    
}
