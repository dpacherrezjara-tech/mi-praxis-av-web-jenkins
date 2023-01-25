/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.libmiatec.A1178;
import net.miatech.libmiatec.A1241;
import net.miatech.libmiatec.WRF001;
import net.miatech.beans.Pagination;

/**
 *
 * @author claudia
 */
public class WRF001Filter extends WRF001 {

    public String strYearFrom = "";
    public String strYearTo = "";
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strDayFrom = "";
    public String strDayTo = "";
    public String strAirlineName = "";
    public String strASIGNED = "";
    public String strIDWORK = "";
    public String strFDWORK = "";
    public int intRank = 0;
    public long QTYINV = 0;
    public long lngPROF = 0;
    public double dblPerRev = 0;
    public double dblPerRec = 0;
    public double dblTOTDAY = 0;
    public double dblCOXDAY = 0;
    public double dblCOXHOU = 0;
    public double dblTOTHOU = 0;
    public long RN = 0;
    public String DES_FTE = "";
    public String IN_TKT = "";
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "";
    public String IN_DATE = "";
    public String strDATE = "";
    public String IN_AIRLINE = "";
    public String IN_TUSO = "";
    public String IN_TDOC = "";
    public String IN_CURRENP = "";
    public String IN_STVAL = "";
    public String IN_TOP = "";
    public long lnQCUPON = 0;
    public long lnQSFIM = 0;
    public long lnQAUDI = 0;
    public long lnQSUPAUD = 0;
    public long lnQRMSPA = 0;
    public long lnVALMPA = 0;
    public long lnQSPA = 0;
    public long lnPROF = 0;
    public double perQSPA = 0;
    public double perQRMSPA = 0;
    public double dbQRM = 0;
    public double dbNETI = 0;
    public double dbRMVSPA = 0;
    public double dbNETO = 0;
    public double dbVALSRP = 0;
    public double dbVALSPA = 0;
    //WRF002
    
    public Pagination page = new Pagination();
    public boolean boFlagAdj = false;
    public A1241 recA1241 = new A1241();
    public List<A1178> lstDataA1178 = new ArrayList<A1178>();
}
