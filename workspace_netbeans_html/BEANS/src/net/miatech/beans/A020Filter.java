/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libmiatec.A020;
import net.miatech.libmiatec.A1199;

/**
 *
 * @author claudia
 */
public class A020Filter extends A020 {

    public int IN_TIPOFECHA = 0;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_CIA = "";
    public String IN_CODOBO = "";
    public String IN_STATUS = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4 = "";
    public String strFormatDate5 = "";
    public String strDescripcion = "";
    public String strDescripcion1 = "";
    public String strDescripcion2 = "";
    public String strDescripcion3 = "";
    public String strDescripcion4 = "";
    public String strDescripcion5 = "";
    public String strTUSO = "";
    public String strFlag = "";
    public String strTDOC = "";
    public String strInvoice = "";
    public String strStval = "";
    public String strCurrenc = "";
    public String strAirlineName = "";
    public String strAlfa = "";
    public String strCHS = "";
    public String strIndSPA = "";
    public String strTaxes = "";
    public String strMonTax = "";
    public String strTicket = "";
    public String strTKT = "";
    public String strSQL = "";
    public String strMsgError = "";
    public String strFileName = "";
    public String strFileNameOrg = "";
    public String strETKT = "";
    public String strUSAC = "";
    public String strAddInfo = "";
    public String A021CONCEP1 = "";
    public String A021CONCEP2 = "";
    public String A021CONCEP3 = "";
    public String A021CONCEP4 = "";
    public String A021CONCEP5 = "";
    public int intRank = 0;
    public int pos = 0;
    public long lngQCUPON = 0;
    public long lngICUPON = 0;
    public long lngPCUPON = 0;
    public long lngQOVER = 0;
    public long lngQREV = 0;
    public long lngQPRO = 0;
    public long lngQOW1 = 0;
    public long lngQOW2 = 0;
    public long lngQRT1 = 0;
    public long lngQRT2 = 0;
    public long lngQRM = 0;
    public long lngQOTAX = 0;
    public long lngQMISS = 0;
    public long lngQDUP = 0;
    public long lngQLIMIT = 0;
    public long lngQNSPA = 0;
    public long lngQSSPA = 0;
    public long lngQEXC = 0;
    public long lngQPPAGO = 0;
    public long lngQMATCH = 0;
    public long lngQPGROSS = 0;
    public long lngQPTAX = 0;
    public long lngQUNDER = 0;
    public long lngQPEND = 0;
    public long lngQOTROS = 0;
    public long lngQFFLYER = 0;
    public long lngQIT = 0;
    public double dblTCFACT = 0;
    public double dblTCSIST = 0;
    public double dblNETI = 0;
    public double dblNETM = 0;
    public double dblNETO = 0;
    public double dblMinTarifa = 0;
    public double dblMinTax = 0;
    //Campos A728
    public String A728XO = "";
    public String A728CTYVTA = "";
    public String A728CTYEMI = "";
    public String A728RERUT = "";
    public String A728RUTORG = "";
    public String A728TDESC = "";
    public String A728BOOKI1 = "";
    public String A728CARRA1 = "";
    public String A728COUVTA = "";
    public String A728NVLO1 = "";
    public String A728FVLO1 = "";
    public String A728NRODOC = "";
    public String A728NROPRT = "";
    public String A728CLASE1 = "";
    public double A728ACUEO1 = 0d;
    //Campos A050
    public double A050TUA = 0;
    public String A050CRTR = "";
    public String A050FCONTA = "";
    public String A050AIRLI3 = "";
    public String A050FVUELO = "";
    public String A050NVUELO = "";
    public String A050RUTVOL = "";
    public String A050FBILLE = "";
    public long A050QPAX=0;
    public String DES_BAIR = "";
    public double A050OVRAMT = 0;
    public double A050OVRISC = 0;
    
    //Campos del A097 ============
    public double A097IMPO = 0;
    public double A097ISC = 0;
    public double A097TAX = 0;
    public double A097UATP = 0;
    public double A097OTROS = 0;

    //Campos del A1199
    public A1199 fileA1199 = new A1199();
   
    public Pagination page = new Pagination();
}
