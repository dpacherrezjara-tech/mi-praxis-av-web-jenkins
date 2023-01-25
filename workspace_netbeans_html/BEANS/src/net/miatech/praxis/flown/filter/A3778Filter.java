/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.flown.filter;

import net.miatech.beans.*;
import net.miatech.praxis.flown.A3778;

/**
 *
 * @author jsolano
 */
public class A3778Filter extends A3778 {

    public long RN;
    public String DATE = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_SEQ = "";
    public String FLAG_ALL = "";
    public String IN_DATE = "";
    public String IN_DATEF = "";
    public String IN_DATET = "";
    public String IN_TKT = "";
    public String IN_SEQRO = "";
    public String IN_STVAL = "";
    public String IN_TYPE = "";
    public String IN_FVAL = "";
    public String IN_CARR = "";
    public String IN_ZONA = "";
    public String strFVAL = "";
    public String IN_NFLIGHT = "";
    public int IN_TIPOFECHA = 0;
    public String CUPONNEW = "";
    public String STNEW = "";
    public String PRDA = "";
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatFVTA = "";
    public String fecha = "";
    public String strTicket = "";
    public String strDescCDEPART = "";
    public String strDescCARRIVA = "";
    public String strDescPSVVTA = "";
    public String strFuente = "";
    public String strDescripcion = "";
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String strSQL = "";
    public String TIPOC = "";
    public String TOPER = "";
    public String BATCHP = "";
    public String strDescSTVAL = "";
    public String strDescFVAL = "";
    public String strDescSTNEW = "";
    public String strDescSTCON = "";
    public String strFCON = "";
    public String FILENAME = "";
    public String strZona = "";
    public String strDescAgente = "";
    public int difDiasFvlo = 0;
    public int difDiasFvta = 0;
    public String FOPERZUL = "";
    public String strFormatFECVAL = "";
    public double difVakues = 0;
    public String strFFLOW = "";
    //Campos para Yield Report
    public String PASSNG = "";
    public String RPK = "";
    public String RVNUE = "";
    public String YIELD = "";
    public String RVNPAX = "";
    public String KMS = "";
    public String STATUS = "" ; 
    //A1818
    public String RECODE = "";
    public String RFIC = "";
    public String TKTASO = "";
    public String TEMD = "";
    //A1772
    public String DES_RECODE = "";
    //A1437
    public String A1437FEVAL = "";
    public double GROSS = 0;
    public double ISC = 0;
    public double TAX = 0;
    public double NETO = 0;
    public double A1437RATE = 0;
    public double A1437RCOMI = 0;
    public double totGROSS = 0;
    public double totISC = 0;
    public double totOCOMIS = 0;
    public double totTAX = 0;
    public double totNETO = 0;
    //Billed , Not Billed
    public int CPN_Billed = 0;
    public int CPN_NoBilled = 0;
    public long CPN_TOT = 0;
    public double VCPN_Billed = 0;
    public double VCPN_NoBilled = 0;
    public double VCPN_TOT = 0;
    public long CPN_Proc = 0;
    public double VCPN_Proc = 0;
    public long totCPN_Proc = 0;
    public double totVCPN_Proc = 0;
    public long CPN_Aud = 0;
    public double VCPN_Aud = 0;
    public long totCPN_Aud = 0;
    public double totVCPN_Aud = 0;
    public long CPN_Bill = 0;
    public double VCPN_Bill = 0;
    public long totCPN_Bill = 0;
    public double totVCPN_Bill = 0;
    public double totVCPMX = 0;
    public double totVCPUS = 0;
    public double totVYQ = 0;
    //A1716
    public double A1692DEBTOTAL = 0.0;
    public double A1692CREDTOTAL = 0.0;
    public Pagination page = new Pagination();
    public int pos = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;

    public int QTY_CUPONES = 0;
    public int QTY_CUPONES_CONT = 0;
    public int QTY_CUPONES_PEND = 0;
    public double VALOR_CUPONES_CONT = 0;
    public double VALOR_CUPONES_PEND = 0;
    public double PROMEDIO_CUPONES_CONT = 0;
    public double PROMEDIO_CUPONES_PEND = 0;
    public String DESCZONA = "";
    public String DESC_ORIG = "";
    public String DESC_ARRI = "";
    public String COD_DESC_ZONA = "";
    public String COD_DESC_ORIG = "";
    public String COD_DESC_ARRI = "";
    public String IN_CCIA = "";
    public String FLAGLEG = "";
    //CAMPOS PARA TARIFA PROMEDIO POR ZONAS
    public double AVRG_ASI = 0;
    public double AVRG_CAM = 0;
    public double AVRG_CAN = 0;
    public double AVRG_CAR = 0;
    public double AVRG_EUR = 0;
    public double AVRG_FRO = 0;
    public double AVRG_LOC = 0;
    public double AVRG_PLA = 0;
    public double AVRG_SUD = 0;
    public double AVRG_USA = 0;
    public String LOCDEP = "";
    public String LOCARR = "";
    public String UTCDEP = "";
    public String UTCARR = "";
    
}
