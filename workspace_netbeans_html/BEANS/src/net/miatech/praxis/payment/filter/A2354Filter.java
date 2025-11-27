/*
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/
package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.A2354;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4202;

/**
*
* @author andrea
*/
public class A2354Filter extends A2354 {

public String IN_MERCHN = "";
public String IN_OPTION = "";
public String IN_QTY_OR_AMOUNT = "";
public String IN_DETAIL_TYPE = "";
public String IN_DESCR = "";
public String IN_RSOCIAL = "";
public String IN_UNIOPE = "";
public String IN_CANAL = "";
public String IN_SOURCE = "";
public String IN_ACCREDITATION = "";
public String IN_RISK = "";
public String strFecha = "";
public String strDescrip = "";
public String A003CANAL = "";
public String A003IATA = "";
public long RN = 0;
public String strDescripCtry = "";
public String strDescripUNIOPE = "";
public String STATUS = "";
public String desSTATUS = "";
public String IN_STATUS = "";
public String IN_COUNTRY = "";
public String IN_NOTFOUND = "";
public String IN_COREP = "";
public String CODE = "";
public String COREP = "";
public String NAME = "";
public String IN_CMERCHAN = "";
public String IN_SUCMERCH = "";
public String IN_ACCNUMB = "";
public String IN_SAGENT = "";
public String IN_FPAYMENT = "";
public String IN_DSALES = "";
public String IN_BMERCHAN = "";
public String IN_SCARCOD = "";
public String IN_CTABANK = "";
public String IN_CODEBANK = "";
public String IN_CODEBANKA = "";
public String IN_BANKNAM = "";
public String IN_DREPORT = "";
public String IN_TABNAME = "";
public String IN_CODE = "";
public String IN_CORE = "";
public String IN_FRANC1 = "";
public String IN_FRANC2 = "";
public String IN_FRANC3 = "";
public String IN_FRANC4 = "";
public String IN_BANKCM = "";
public String IN_BANKCUR = "";
public String IN_ACCNUMOLD = "";
public String IN_DDISCON = "";
public String IN_IDFISCAL = "";
public String IN_ACCNUMA = "";
public String IN_BENCEN = "";
public String IN_DEUSAP = "";
public String IN_PROCES = "";
public String IN_SCOUNTRY = "";
public String IN_SOCIETY = "";
public String IN_FROM_SETT = "";
public String IN_FROM_UP = "";
public String IN_TO_SETT = "";
public String IN_TO_UP = "";
public String IN_FILE_NAME = "";
public String IN_DATE = "";
public String IN_INVOICE = "";
public String IN_SCURRENCY = "";
public String IN_SBENCEN = "";
public String IN_COSTCEN = "";
public String IN_IDFBENEF = "";
public String IN_CODPRO = "";

public String IN_EQUIVA1 = "";
public String IN_EQUIVA2 = "";
public String IN_EQUIVA3 = "";
public String IN_EQUIVA4 = "";
public String IN_EQUIVA5 = "";
public String IN_EQUIVA6 = "";
public String IN_EQUIVA7 = "";
public String IN_EQUIVA8 = "";
public String IN_EQUIVA9 = "";

public String IN_FECHA_FROM = "";
public String IN_FECHA_TO = "";

public String OPTION = "";
public String NEGOC = "";
public String CMERCHAN = "";
public String BMERCHAN = "";
public String SCARCOD = "";
public String CTABANK = "";
public String CODEBANK = "";
public String CODEBANKA = "";
public String COUNTRY = "";
public String CUSTOMER = "";
public String DATEPROC = "";
public String DATESETT = "";
public String DATEUPLO = "";
public String NAMEFILE = "";
public String TYPEFILE = "";
public String SIZEFILE = "";
public String SUCMERCH = "";
public String IN_CODPRO_2 = "";
public String CODPRO = "";

public String CORE = "";
public String DREPORT = "";
public String VACIO = "";
public String FRANC1 = "";
public String FRANC2 = "";
public String FRANC3 = "";
public String FRANC4 = "";


public String EQUIVA1 = "";
public String EQUIVA2 = "";
public String EQUIVA3 = "";
public String EQUIVA4 = "";
public String EQUIVA5 = "";
public String EQUIVA6 = "";
public String EQUIVA7 = "";
public String EQUIVA8 = "";
public String EQUIVA9 = "";

public String BANKNAM = "";
public String BANKCM = "";
public String BANKCUR = "";
public String ACCNUMB = "";
public String ACCNUMOLD = "";
public String DDISCON = "";
public String IDFISCAL = "";
public String ACCNUMA = "";
public String BENCEN = "";
public String DEUSAP = "";
public String SAGENT = "";



public String O_CCUST = "";
public String O_SAGENT = "";
public String O_FUENTE = "";
public String O_PAIS_VENTA = "";
public String O_MES = "";
public String O_FORMAPAGO = "";
public String O_VFOP = "";
public String O_QTYTKTS = "";
public String O_FPAYMENT = "";




public String A_CCUST = "";
public String A_TICKET = "";
public String A_A720FECVTA = "";
public String A_A720PAIVTA = "";
public String A_A720TRNCU = "";
public String A_A720TDOC = "";
public String A_A720AGENTE = "";
public String A_ORIGEN = "";
public String A_A1531VFOPR = "";
public String A_A1531MFOPR = "";




public String CANALM = "";
public String PROCES = "";

public String SOCIETY = "";
public String SCURRENCY = "";
public String SBENCEN = "";
public String COSTCEN = "";
public String IDFBENEF = "";
public String DEFFEC = "";
public String DFINAL = "";
public String SEQ = "";

public String PAIS = "";
public String IATA = "";
public String IATANAME = "";
public String INVOICE = "";
public String CLASEDOC = "";
public String SDATE = "";
public String SCURRENCYL = "";
public String CURUSD = "";
public String strFormatDate = "";
public String CURRENCY = "";

public double SVFOPUSD = 0;
public double SVFOPL = 0;
public double SUM_ACTIVE = 0;
public double SUM_MPF100 = 0;
public double DIFFERENCE = 0;
public double DIFFERENCE_100 = 0;
public double PENDING_MPF100 = 0;
public double SUM_GENCON = 0;

public double AMOUNT_TOTAL_USD = 0;
public double AMOUNT_TOTAL_ACTIVE = 0;
public double AMOUNT_TOTAL_DIFFERENCE = 0;
public double AMOUNT_TOTAL_MPF100 = 0;
public double AMOUNT_TOTAL_DIFFERENCE_100 = 0;
public double AMOUNT_TOTAL_PENDING_MPF100 = 0;
public double QTY_TICKETS_SALES_AGENT = 0;

public int QTY = 0;
public int QTY_INVOICES = 0;
public int QTY_100_ALL = 0;
public int QTY_100_PENDING = 0;
public int QTY_NOT_FOUND = 0;
public int QTY_TOTAL= 0;









public List<A4202> lstDetalle = new ArrayList<A4202>(0);
//public List lstBank = new ArrayList<>(0);
//public List lstIata = new ArrayList<>(0);

//A003
public String A003KEY1 = "";
public Pagination page = new Pagination(); 

    public String DSALES = "";
    public String AGENT = "";
    public String NAME_AGENT = "";
    public String PSALF = "";
     public double AMOUNT_SALE = 0;


}
