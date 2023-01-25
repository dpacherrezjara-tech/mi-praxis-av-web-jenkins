/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2324;

/**
 *
 * @author ggutierrez
 */
public class A2324Filter extends A2324 {

    public long RN = 0;
    public String strFecFiltro = "";
    public String IN_TDOC = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String DATE = "";
    public String desSTVAL = "";
    public String IN_PNR = "";
    public String IN_REFNUMBER = "";
    public String IN_STVAL = "";
    public String IN_DATSET = "";
    public String IN_WEEKMO = "";
    public int FACUMULADO = 0;
    public long AMTSET = 0;
    public double tot_SVFOP = 0.0;

    // Qty
    public long QMATCH = 0;
    public long QPAYMENT_WO = 0;
    public long QSALES_WO = 0;
    public long QMATCH_DIFF = 0;
    public long QTOTSAL = 0;

    // tot
    public long totQMATCH = 0;
    public long totQPAYMENT_WO = 0;
    public long totQSALES_WO = 0;
    public long totQMATCH_DIFF = 0;
    public long totQTOTSAL = 0;

    public String strFormatDate = "";
    public long totSVFOP = 0;
    public long totSVFOP_COMPLEMENTO = 0;
    public long totSVFOPS = 0;
    public long difSVFOP = 0;
    public long totdifSVFOP = 0;

    //CAMPOS PARA SETTLEMENT VS BOOMER
    public String IN_SDATE = "";
    public String IN_REFNBR = "";

    //SETTLEMENT
    public String TDOCA = "";
    public String descTDOCA = "";
    public double SVFOPA = 0.0;
    public double SVFOPN = 0.0;
    public double totSVFOPN = 0.0;
    public double SVFOPAB = 0.0;
    public double totSVFOPA = 0.0;
    public double totSVFOPAB = 0.0;
    public String SCARCODA = "";
    public String CUR = "";
    public String SCARDNA = "";
    public String SAUTHOCA = "";
    public String TPAYA = "";
    public String BANKA = "";
    public String ABCDA = "";
    public String SCURRENCYA = "";
    public String FSELECA = "";
    public String REVCON = "";
    public double GENCOMIPAY = 0.0;
    public double totGENCOMIPAY = 0.0;
    public double COMISIPROV = 0.0;
    public double totCOMISIPROV = 0.0;
    public double COSTVERIFI = 0.0;
    public double totCOSTVERIFI = 0.0;
    public double VALCOLLECT = 0.0;
    public double totVALCOLLECT = 0.0;
    public double TOTCOMISI = 0.0;
    public double totTOTCOMISI = 0.0;
    public double IVA = 0.0;    
    public double totIVA = 0.0;   
    public double SVFOPOL = 0.0;
    public double totSVFOPOL = 0.0;
    public double TOT_DESC = 0.0;
    public double totTOT_DESC = 0.0;
    public double NET = 0.0;    
    public double totNET = 0.0;    
    public double difIMPORT = 0.0;    
    public double IMPORT = 0.0;    

    //BOOMER
    public String TDOCB = "";
    public String SCURRENCYB = "";
    public double SVFOPB = 0.0;
    public double totSVFOPB = 0.0;
    public String DOCTYPEB = "";
    public String CCIAB = "";
    public String CHANNELID = "";
    public String FORMAB = "";
    public String SERIEB = "";
    public String TKT = "";
    public String SEQNUM = "";
    public String SCARCODB = "";
    public String SCARDNB = "";
    public String SAUTHOCB = "";
    public String SPNRB = "";
    public String option = "";
    public String estadoTitulo = "";
    public String FCOMPLEMENTO = "";
    
    //BOOMER UPDATE
    public String NEW_SDATE = "";
    public String NEW_REFNBR = "";
    public String NEW_DATSET = "";
    public String NEW_WEEKMO = "";
    public String NEW_CCIA = "";
    public String NEW_FORMA = "";
    public String NEW_SERIE = "";
    public String NEW_TDOC = "";
    public String NEW_SCARCOD = "";
    public String NEW_SCARDN = "";
    public String NEW_SAUTHOC = "";
    public String NEW_SPNR = "";
    public String NEW_SCOUNTRY = "";
    public String NEW_STVAL = "";
    public String NEW_SCURRENCY = "";
    public long NEW_SVFOP = 0;

    //TABLA PNR
    public String TICKET = "";
    public String A1531NREF = "";
    public String A720AGENTE = "";
    public double A1531VFOP = 0.0;

    public Pagination page = new Pagination();
    
}
