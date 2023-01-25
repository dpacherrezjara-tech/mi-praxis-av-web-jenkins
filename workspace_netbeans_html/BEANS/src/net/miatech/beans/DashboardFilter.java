/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libpass.IMF080;
import net.miatech.libpass.IMF081;
import net.miatech.utils.Functions;

/**
 *
 * @author rmayta
 */
public class DashboardFilter {

    public static byte P_SALES_PER_MONTH_TOTALS = 0;
    public static byte P_SALES_PER_MONTH_DATA = 1;
    public static byte P_SALES_PER_CHANNELS_TOTALS = 2;
    public static byte P_SALES_PER_CHANNELS_DATA = 3;
    public static byte P_SALES_PER_COUNTRYS_DATA = 4;
    public long RN = 0;
    public int RN_C = 0;
    public String strPag = "";
    public String PrimerstrTicket = "";
    public String strTicket = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_PAIS = "";
    public String IN_CITYPAIR = "";
    public String IN_FIELD = "";
    public String IN_ORDER = "";
    public String IN_TSALES = "";//Domestico/Internacional
    public String IN_ONOFF = "";
    public String IN_ALLIC = "";
    public String IN_TOP = "";
    public String IN_NR = "";
    public String IN_CARD1 = "";
    public String IN_CARD2 = "";
    public String FAREBASE = "";
    public String TYPE = "";
    public String ZONA = "";
    public String CARRIER = "";
    public String DATE_FROM = "";
    public String DATE_TO = "";
    public String COUNTRY = "";
    public String COUNTRY_NAME = "";
    public String COUNTRYO = "";
    public String COUNTRYD = "";
    public String CITYO = "";
    public String CITYD = "";
    public byte TOP = 0;
    public String DSALES = "";
    public Double TARIFA = 0d;
    public String COMENTARIO = "";
    public String CANAV = "";
    public String ALLIC = "";
    public String GDS = "";
    public String FTE = "";
    public String CANAVT = "";
    public String strDescription = "";
    public String strDescriptionZone = "";
    public String strDescription1 = "";
    public String strDescription2 = "";
    public String strDescription3 = "";
    public String strDescription4 = "";
    public String strDescription5 = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strCITYO = "";
    public String strCITYD = "";
    public String strSelectedBy = "";
    public String strYearFrom = "";
    public String strMonthFrom = "";
    public String strYearTo = "";
    public String strMonthTo = "";
    public String VENDOR = "";
    public String FLAG = "";
    public String strCiudadBase = "";
    public String strTIPO = "";
    public String strCountryS = "";
    public String strCityS = "";
    public String strDSALES = "";
    public double ValMax = 0;
    public Double AMOUNT = 0d;
    public Double AMOUNT_AVG_RATE = 0d;
    public Double AMOUNT_OFF = 0d;
    public Double AMOUNT_OFF_PERCENT = 0d;
    public Double AMOUNT_OFF_AVG = 0d;
    public Double AMOUNT_OFF_AVG_RATE = 0d;
    public Double AMOUNT_ON = 0d;
    public Double AMOUNT_PERCENT = 0d;
    public Double AMOUNT_ON_PERCENT = 0d;
    public Double AMOUNT_ON_AVG = 0d;
    public Double AMOUNT_ON_AVG_RATE = 0d;
    public long QCPNS = 0;
    public long CUPONS = 0;
    
    public long QCPNS1 = 0;
    public long CUPONS1 = 0;
    public long QCPNS2 = 0;
    public long CUPONS2 = 0;
    
    public String CLASS = "";
    public Double CUPONS_AVG = 0d;
    public Double CUPONS_RATE = 0d;
    public long CUPONS_OFF = 0;
    public double CUPONS_OFF_AVG = 0;
    public Double CUPONS_OFF_PERCENT = 0d;
    public long CUPONS_ON = 0;
    public double CUPONS_ON_AVG = 0;
    public double CUPONS_PERCENT = 0d;
    public Double CUPONS_ON_PERCENT = 0d;
    public long CUPONS_MEX = 0;
    public long CUPONS_OTHER = 0;
    public long CUPONS_ASR = 0;
    public long CUPONS_ARC = 0;
    public long CUPONS_BSP = 0;
    public double AMOUNT_ASR = 0;
    public double AMOUNT_ARC = 0;
    public double AMOUNT_BSP = 0;
    public Double TOTAL_AMOUNT = 0d;
    public Double TOTAL_AMOUNT_OFF = 0d;
    public Double TOTAL_AMOUNT_OFF_AVG_RATE = 0d;
    public Double TOTAL_AMOUNT_ON = 0d;
    public Double TOTAL_AMOUNT_ON_AVG_RATE = 0d;
    public long TOTAL_CUPONS = 0;
    public long TOTAL_CUPONS_OFF = 0;
    public long TOTAL_CUPONS_ON = 0;
    public Double TOTAL_CUPONS_ON_PERCEN = 0d;
    public Double TOTAL_CUPONS_OFF_PERCEN = 0d;
    /*Cabin*/
    public long CUPON_F = 0;
    public long CUPON_J = 0;
    public long CUPON_Y = 0;
    public long CUPON_O = 0;
    public long TOTCUPON_F = 0;
    public long TOTCUPON_J = 0;
    public long TOTCUPON_Y = 0;
    public long TOTCUPON_O = 0;
    //PORCENTAJES
    public double CUPON_F_PER = 0;
    public double CUPON_J_PER = 0;
    public double CUPON_Y_PER = 0;
    public double CUPON_O_PER = 0;
    public double TOTCUPON_F_PER = 0;
    public double TOTCUPON_J_PER = 0;
    public double TOTCUPON_Y_PER = 0;
    public double TOTCUPON_O_PER = 0;
    //PORCENTAJES AMOUNT
    public double AMOUNT_F_PER = 0;
    public double AMOUNT_J_PER = 0;
    public double AMOUNT_Y_PER = 0;
    public double AMOUNTO_PER = 0;
    public double TOTAMOUNT_F_PER = 0;
    public double TOTAMOUNT_J_PER = 0;
    public double TOTAMOUNT_Y_PER = 0;
    public double TOTAMOUNT_O_PER = 0;
    public double AMOUNT_F = 0;
    public double AMOUNT_J = 0;
    public double AMOUNT_Y = 0;
    public double AMOUNT_O = 0;
    public double TOTAMOUNT_F = 0;
    public double TOTAMOUNT_J = 0;
    public double TOTAMOUNT_Y = 0;
    public double TOTAMOUNT_O = 0;
    public double TOTAL_AMOUNTF = 0;
    public double TOTAL_AVG = 0;
    //Flown
    public long QCPNSF = 0;
    public double AMOUNTF = 0;
    public long TOT_QCPNSF = 0;
    public double TOT_AMOUNTF = 0;
    public double CUPONS_PERCENTF = 0;
    public double AMOUNT_PERCENTF = 0;
    public double TOTAL_CUPONS_PERCENTF = 0;
    public double TOTAL_AMOUNT_PERCENTF = 0;
    /*Cabin Flown*/
    public long CUPONF_F = 0;
    public long CUPONF_J = 0;
    public long CUPONF_Y = 0;
    public long CUPONF_O = 0;
    public long TOTCUPONF_F = 0;
    public long TOTCUPONF_J = 0;
    public long TOTCUPONF_Y = 0;
    public long TOTCUPONF_O = 0;
    public long TOTAL_CUPONSF = 0;
    public double AMOUNTF_F = 0;
    public double AMOUNTF_J = 0;
    public double AMOUNTF_Y = 0;
    public double AMOUNTF_O = 0;
    public double TOTAMOUNTF_F = 0;
    public double TOTAMOUNTF_J = 0;
    public double TOTAMOUNTF_Y = 0;
    public double TOTAMOUNTF_O = 0;
    public double Perc1 = 0;
    public double Perc2 = 0;
    public double Perc3 = 0;
    public double Perc4 = 0;
    public double Perc5 = 0;
    public double Perc6 = 0;
    //public double tot_Perc1 = 0;
    //public double tot_Perc2 = 0;
    public double TOTAL_AMOUNT_ON_PERCENT = 0;
    public double TOTAL_AMOUNT_OFF_PERCENT = 0;
    public double tot_Perc3 = 0;
    public double tot_Perc4 = 0;
    public double tot_Perc5 = 0;
    public double tot_Perc6 = 0;
    //PMP
    public double PMP = 0;
    public double AVG_PMP = 0;
    public double AVG = 0;
    public double totAVG = 0;
    public double RevMil = 0;
    public long TKT = 0;
    public long totTKT = 0;
    public long KM = 0;
    public long totKM = 0;
    //TOTALES
    public long totCUPONS_ASR = 0;
    public long totCUPONS_ARC = 0;
    public long totCUPONS_BSP = 0;
    public double totAMOUNT_ASR = 0;
    public double totAMOUNT_ARC = 0;
    public double totAMOUNT_BSP = 0;
    public double COMISION = 0;
    public double TAX = 0;
    public double AYQ = 0;
    public double totCOMISION = 0;
    public double totTAX = 0;
    public double totAYQ = 0;

    public long QTKTS0 = 0;
    public long QCPNS0 = 0;
    public long totQCPNS0 = 0;
    public double AMOUNT0 = 0;
    public double totAMOUNT0 = 0;
    public long TOTAL_QTKTS0 = 0;
    public long TOTAL_QCPNS0 = 0;
    public double TOTAL_AMOUNT0 = 0;

    public long QTKTS5 = 0;
    public long QCPNS5 = 0;
    public double AMOUNT5 = 0;
    public long QTKTS6 = 0;
    public long QCPNS6 = 0;
    public double AMOUNT6 = 0;
    public double QTKTDIFF = 0;
    public double QCPNSDIFF = 0;
    public double AMOUNTDIFF = 0;

    public long totQTKTS5 = 0;
    public long totQCPNS5 = 0;
    public double totAMOUNT5 = 0;
    public long totQTKTS6 = 0;
    public long totQCPNS6 = 0;
    public double totAMOUNT6 = 0;
    public double totQTKTDIFF = 0;
    public double totQCPNSDIFF = 0;
    public double totAMOUNTDIFF = 0;
    public double REVXMI = 0;
    public double TOTAL_REVXMI = 0;

    public double AVG1 = 0;
    public double AVG2 = 0;
    public double AVG3 = 0;
    public double AVG4 = 0;
    public double AVG5 = 0;

    public double totAVG1 = 0;
    public double totAVG2 = 0;
    public double totAVG3 = 0;
    public double totAVG4 = 0;
    public double totAVG5 = 0;

    //FareBasis
    public String RUTAC = "";
    public int QFBASE = 0;
    public int CPN_D = 0;
    public double AMT_D = 0;
    public int CPN_I = 0;
    public double AMT_I = 0;

    public int QTKTS = 0;
    public int QKMS = 0;
    public int QCOMP = 0;

    //totales
    public long totQFBASE = 0;
    public long totCPN_D = 0;
    public double totAMT_D = 0;
    public long totCPN_I = 0;
    public double totAMT_I = 0;

    public long totQTKTS = 0;
    public long totQKMS = 0;
    public long totQCOMP = 0;
    public long totQCPNS = 0;
    public double totPMP = 0.0;
    public double totAMOUNT = 0.0;

    public IMF080 summarySalesByDate = new IMF080();
    public IMF081 summarySalesByDateCountry = new IMF081();
    public Pagination page = new Pagination();

    public String bufferToString(String ccust, String strTicket, String strPag, String tabla) {

        String strValue = "";
        String strKeyUp = "";

        if (tabla.trim().equals("IMF072J")) {
            //03 PROGRAMA    PIC X(10).
            strValue += Functions.fillString("PRO11019", 10);
            //03 TABLA       PIC X(10).
            strValue += Functions.fillString("IMF072J", 10);

            /**
             * **************************************************************
             */
            //06 K-CCUST         PIC X(03).
            strKeyUp += Functions.fillString(ccust, 3);
            //06 K-DSALES      PIC X(06).
            strKeyUp += Functions.fillString(this.DSALES, 6);
            //06 K-COUNTRYS      PIC X(06).
            strKeyUp += Functions.fillString(this.COUNTRY, 3);
            //06 K-VENDOR      PIC X(08).
            strKeyUp += Functions.fillString(this.VENDOR, 8);
            //06 K-TKT      PIC X(14). --ultimo tkt para pag
            strKeyUp += Functions.fillString(strTicket, 14);
            //03 KEYUP         PIC X(100).
            strKeyUp = Functions.fillString(strKeyUp, 100);
            //03 LK-FILTER     PIC X(100).
            strKeyUp = Functions.fillString(strKeyUp, 200);
            //03 PG-DN       PIC X(01).
            strValue += strKeyUp + Functions.fillString(strPag, 1);
            //03 ERR         PIC X(50).
            strValue += Functions.fillString("", 01);
            //03 MSG         PIC X(50).
            strValue += Functions.fillString("", 49);

        }

        //System.out.println(strValue.length());
        return strValue.toUpperCase();
    }

}
