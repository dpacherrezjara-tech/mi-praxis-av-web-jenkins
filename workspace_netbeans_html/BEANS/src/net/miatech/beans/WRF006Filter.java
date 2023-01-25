/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.beans.lists.RECA728List;

/**
 *
 * @author claudia
 */
public class WRF006Filter extends net.miatech.libmiatec.WRF006 {

    public String strYearFrom = "";
    public String strYearTo = "";
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strDayFrom = "";
    public String strDayTo = "";
    public String strFormatDate = "";
    public String strTipoSIRAX = "";
    public String strAirlineName = "";
    public String strDateCAD = "";
    public String strTREG = "";
    public String strFlag = "";
    public String strDateOpt = "";
    public String strComentario1 = "";
    public String strComentario2 = "";
    public String strNETI = "";
    public String strNETO = "";
    public String strIndAgr = "";
    public String strAirlineIA = "";
    public String strCupones1 = "";
    public String strCupones2 = "";
    public String strCupones3 = "";
    public String strCupones4 = "";
    public String strAuditados1 = "";
    public String strAuditados2 = "";
    public String strAuditados3 = "";
    public String strAuditados4 = "";
    public String strRechazados1 = "";
    public String strRechazados2 = "";
    public String strRechazados3 = "";
    public String strRechazados4 = "";
    public String strInvCpnsIA = "";
    public String strAudCpnsIA = "";
    public String strRejCpnsIA = "";
    public String strPercRevIA = "";
    public String strTop = "";
    public String strOrden = "";
    //Campos WRF002 ============================================================
    public String NROPRT = "";
    public String RMACCEPT = "";
    public String IPENAL = "";
    public String TICKET = "";
    public String NRORM = "";
    public String ETKT = "";
    //Campos A020 ==============================================================
    public String A020SDATE = "";
    public String A020BASE = "";
    public String A020RMSN = "";
    public String A020FVENTA = "";
    public String A020FUSO = "";
    public String A020RMANT = "";
    public String A020TRANSP = "";
    public String A020VUELO = "";
    public String A020PENAL = "";
    public double A020ANALIZ = 0;
    public double A020COMISP = 0;
    // =========================================================================
    public int intCol = 0;
    public int intRank = 0;
    public long QTYINV = 0;
    public long lngTotDoc = 0;
    public long lngPROF = 0;
    public double dblPerRev = 0;
    public double dblPerRec = 0;
    public double dblPerRevAmt = 0;
    public double dblPerRecAmt = 0;
    public double dblPerc = 0;
    public double dblPercAmt = 0;
    public double dblPercG = 0;
    public double dblPercT = 0;
    public double dblPercI = 0;
    public double dblPercGrossN = 0;
    public double dblPercIscN = 0;
    public double dblPercTaxN = 0;
    public double dblPercSpa = 0;
    public double dblPercRMSpa = 0;
    public boolean boFlagHold = false;    
    //Campos del A1241 =========================================================
    public long ICUPON = 0;
    public double IFARE = 0;
    public double IISC = 0;
    public double ITAX = 0;
    public double IOTHER = 0;
    public double INETO = 0;
    public String COMENT1 = "";
    public String COMENT2 = "";
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    // =========================================================================
    public RECA728List lstFimsHijos;
    
}
