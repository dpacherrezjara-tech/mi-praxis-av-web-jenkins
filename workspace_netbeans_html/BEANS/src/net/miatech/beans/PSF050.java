/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author crios
 */
public class PSF050 implements Serializable{
    
    private String strCCUST;
    private String strNAID;
    private String strSTVAL;
    private String strCCIA;
    private String strFINVOICE;
    private String strPERMONT;
    private String strINVOICE;
    private String strTCOMP;
    private String strCURRENC;
    private double dblINETO;
    private String cadINETO;
    private String strCURRENP;
    private double dblTNETO;
    private String cadTNETO;
    private String strFEMBAR;
    private String strFRECEP;
    private String strFWARN1;
    private String strFWARN2;
    private String strFRECEPT;
    private String strFRECEPL;
    private String strNGUIA;

    private String strDSCANER;
    private String strNRORM;
    private int intDias;
    //Campos de Informacion **********
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strUSAC;
    private String strFEAC;
    private String strHOAC;
    //Campos de Filtro ***************
    private String strYearFrom;
    private String strMonthFrom;
    private String strYearTo;
    private String strMonthTo;
    private String strDayFrom;
    private String strDayTo;
    //Campos Cantidades **************
    private long lngQtySTB;
    private long lngQtySTBTLS;
    private long lngQtyPhysical;
    private long lngQtyClose;
    private long lngQtyReject;
    private long lngQtyScanner;
    private long lngQtyTotal;
    private long lngQtyInvoices;
    private long lngQtyTickets;
    private long lngQtyTKTxLink;
    private double dblAmtTotbyPeriod;
    
    private String strMensajeError;
    private String strCampoError;
    
    private String strFPERIO4;
    private String strEstilo;

    private String colorTotal;
    private String strTUSO;
    private String strGRUPO;
    
    public PSF050() {

        strCCUST = "";
        strNAID = "";
        strSTVAL = "";
        strCCIA = "";
        strFINVOICE = "";
        strPERMONT = "";
        strINVOICE = "";
        strTCOMP = "";
        strCURRENC = "";
        dblINETO = 0.0;
        cadINETO = "";
        strCURRENP = "";
        dblTNETO = 0.0;
        cadTNETO = "";
        strFEMBAR = "";
        strFRECEP = "";
        strFWARN1 = "";
        strFWARN2 = "";
        strFRECEPT = "";
        strFRECEPL = "";
        strNGUIA = "";
        strUSCR = "";
        strFECR = "";
        strDSCANER = "";
        strNRORM = "";
        intDias = 0;
        strYearFrom = "";
        strMonthFrom = "";
        strYearTo = "";
        strMonthTo = "";
        lngQtySTB = 0;
        lngQtySTBTLS = 0;
        lngQtyPhysical = 0;
        lngQtyClose = 0;
        lngQtyReject = 0;
        lngQtyScanner = 0;
        lngQtyTotal = 0;
        dblAmtTotbyPeriod = 0;
        strMensajeError = "";
        strCampoError = "";
        strDayFrom = "";
        strDayTo = "";
        strFPERIO4 = "";
        strEstilo = "";
        lngQtyInvoices = 0;
        lngQtyTickets = 0;
        lngQtyTKTxLink = 0;
        colorTotal = "";
        strTUSO = "";
        strGRUPO = "";

    }

    public String getStrCCUST() {
        return strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public String getStrNAID() {
        return strNAID;
    }

    public void setStrNAID(String strNAID) {
        this.strNAID = strNAID;
    }

    public String getStrSTVAL() {
        return strSTVAL;
    }

    public void setStrSTVAL(String strSTVAL) {
        this.strSTVAL = strSTVAL;
    }

    public String getStrCCIA() {
        return strCCIA;
    }

    public void setStrCCIA(String strCCIA) {
        this.strCCIA = strCCIA;
    }

    public String getStrFINVOICE() {
        return strFINVOICE;
    }

    public void setStrFINVOICE(String strFINVOICE) {
        this.strFINVOICE = strFINVOICE;
    }

    public String getStrPERMONT() {
        return strPERMONT;
    }

    public void setStrPERMONT(String strPERMONT) {
        this.strPERMONT = strPERMONT;
    }

    public String getStrINVOICE() {
        return strINVOICE;
    }

    public void setStrINVOICE(String strINVOICE) {
        this.strINVOICE = strINVOICE;
    }

    public String getStrTCOMP() {
        return strTCOMP;
    }

    public void setStrTCOMP(String strTCOMP) {
        this.strTCOMP = strTCOMP;
    }

    public String getStrCURRENC() {
        return strCURRENC;
    }

    public void setStrCURRENC(String strCURRENC) {
        this.strCURRENC = strCURRENC;
    }

    public double getDblINETO() {
        return dblINETO;
    }

    public void setDblINETO(double dblINETO) {
        this.dblINETO = dblINETO;
    }

    public String getCadINETO() {
        return cadINETO;
    }

    public void setCadINETO(String cadINETO) {
        this.cadINETO = cadINETO;
    }

    public String getStrCURRENP() {
        return strCURRENP;
    }

    public void setStrCURRENP(String strCURRENP) {
        this.strCURRENP = strCURRENP;
    }

    public double getDblTNETO() {
        return dblTNETO;
    }

    public void setDblTNETO(double dblTNETO) {
        this.dblTNETO = dblTNETO;
    }

    public String getCadTNETO() {
        return cadTNETO;
    }

    public void setCadTNETO(String cadTNETO) {
        this.cadTNETO = cadTNETO;
    }

    public String getStrFEMBAR() {
        return strFEMBAR;
    }

    public void setStrFEMBAR(String strFEMBAR) {
        this.strFEMBAR = strFEMBAR;
    }

    public String getStrFRECEP() {
        return strFRECEP;
    }

    public void setStrFRECEP(String strFRECEP) {
        this.strFRECEP = strFRECEP;
    }

    public String getStrFWARN1() {
        return strFWARN1;
    }

    public void setStrFWARN1(String strFWARN1) {
        this.strFWARN1 = strFWARN1;
    }

    public String getStrFWARN2() {
        return strFWARN2;
    }

    public void setStrFWARN2(String strFWARN2) {
        this.strFWARN2 = strFWARN2;
    }

    public String getStrFRECEPT() {
        return strFRECEPT;
    }

    public void setStrFRECEPT(String strFRECEPT) {
        this.strFRECEPT = strFRECEPT;
    }

    public String getStrFRECEPL() {
        return strFRECEPL;
    }

    public void setStrFRECEPL(String strFRECEPL) {
        this.strFRECEPL = strFRECEPL;
    }

    public String getStrNGUIA() {
        return strNGUIA;
    }

    public void setStrNGUIA(String strNGUIA) {
        this.strNGUIA = strNGUIA;
    }

    public int getIntDias() {
        return intDias;
    }

    public void setIntDias(int intDias) {
        this.intDias = intDias;
    }

    public String getStrUSCR() {
        return strUSCR;
    }

    public void setStrUSCR(String strUSCR) {
        this.strUSCR = strUSCR;
    }

    public String getStrFECR() {
        return strFECR;
    }

    public void setStrFECR(String strFECR) {
        this.strFECR = strFECR;
    }

    public String getStrDSCANER() {
        return strDSCANER;
    }

    public void setStrDSCANER(String strDSCANER) {
        this.strDSCANER = strDSCANER;
    }

    public String getStrNRORM() {
        return strNRORM;
    }

    public void setStrNRORM(String strNRORM) {
        this.strNRORM = strNRORM;
    }

    public String getStrYearFrom() {
        return strYearFrom;
    }

    public void setStrYearFrom(String strYearFrom) {
        this.strYearFrom = strYearFrom;
    }

    public String getStrMonthFrom() {
        return strMonthFrom;
    }

    public void setStrMonthFrom(String strMonthFrom) {
        this.strMonthFrom = strMonthFrom;
    }

    public String getStrYearTo() {
        return strYearTo;
    }

    public void setStrYearTo(String strYearTo) {
        this.strYearTo = strYearTo;
    }

    public String getStrMonthTo() {
        return strMonthTo;
    }

    public void setStrMonthTo(String strMonthTo) {
        this.strMonthTo = strMonthTo;
    }

    public long getLngQtySTB() {
        return lngQtySTB;
    }

    public void setLngQtySTB(long lngQtySTB) {
        this.lngQtySTB = lngQtySTB;
    }

    public long getLngQtySTBTLS() {
        return lngQtySTBTLS;
    }

    public void setLngQtySTBTLS(long lngQtySTBTLS) {
        this.lngQtySTBTLS = lngQtySTBTLS;
    }

    public long getLngQtyPhysical() {
        return lngQtyPhysical;
    }

    public void setLngQtyPhysical(long lngQtyPhysical) {
        this.lngQtyPhysical = lngQtyPhysical;
    }

    public long getLngQtyClose() {
        return lngQtyClose;
    }

    public void setLngQtyClose(long lngQtyClose) {
        this.lngQtyClose = lngQtyClose;
    }

    public long getLngQtyReject() {
        return lngQtyReject;
    }

    public void setLngQtyReject(long lngQtyReject) {
        this.lngQtyReject = lngQtyReject;
    }

    public long getLngQtyTotal() {
        return lngQtyTotal;
    }

    public void setLngQtyTotal(long lngQtyTotal) {
        this.lngQtyTotal = lngQtyTotal;
    }

    public double getDblAmtTotbyPeriod() {
        return dblAmtTotbyPeriod;
    }

    public void setDblAmtTotbyPeriod(double dblAmtTotbyPeriod) {
        this.dblAmtTotbyPeriod = dblAmtTotbyPeriod;
    }

    public long getLngQtyScanner() {
        return lngQtyScanner;
    }

    public void setLngQtyScanner(long lngQtyScanner) {
        this.lngQtyScanner = lngQtyScanner;
    }

    public String getStrMensajeError() {
        return strMensajeError;
    }

    public void setStrMensajeError(String strMensajeError) {
        this.strMensajeError = strMensajeError;
    }

    public String getStrCampoError() {
        return strCampoError;
    }

    public void setStrCampoError(String strCampoError) {
        this.strCampoError = strCampoError;
    }

    public String getStrFEAC() {
        return strFEAC;
    }

    public void setStrFEAC(String strFEAC) {
        this.strFEAC = strFEAC;
    }

    public String getStrHOAC() {
        return strHOAC;
    }

    public void setStrHOAC(String strHOAC) {
        this.strHOAC = strHOAC;
    }

    public String getStrHOCR() {
        return strHOCR;
    }

    public void setStrHOCR(String strHOCR) {
        this.strHOCR = strHOCR;
    }

    public String getStrUSAC() {
        return strUSAC;
    }

    public void setStrUSAC(String strUSAC) {
        this.strUSAC = strUSAC;
    }

    public String getStrDayFrom() {
        return strDayFrom;
    }

    public void setStrDayFrom(String strDayFrom) {
        this.strDayFrom = strDayFrom;
    }

    public String getStrDayTo() {
        return strDayTo;
    }

    public void setStrDayTo(String strDayTo) {
        this.strDayTo = strDayTo;
    }

    public String getStrFPERIO4() {
        return strFPERIO4;
    }

    public void setStrFPERIO4(String strFPERIO4) {
        this.strFPERIO4 = strFPERIO4;
    }

    public String getStrEstilo() {
        return strEstilo;
    }

    public void setStrEstilo(String strEstilo) {
        this.strEstilo = strEstilo;
    }

    public long getLngQtyInvoices() {
        return lngQtyInvoices;
    }

    public void setLngQtyInvoices(long lngQtyInvoices) {
        this.lngQtyInvoices = lngQtyInvoices;
    }

    public long getLngQtyTickets() {
        return lngQtyTickets;
    }

    public void setLngQtyTickets(long lngQtyTickets) {
        this.lngQtyTickets = lngQtyTickets;
    }

    public long getLngQtyTKTxLink() {
        return lngQtyTKTxLink;
    }

    public void setLngQtyTKTxLink(long lngQtyTKTxLink) {
        this.lngQtyTKTxLink = lngQtyTKTxLink;
    }

    public String getColorTotal() {
        return colorTotal;
    }

    public void setColorTotal(String colorTotal) {
        this.colorTotal = colorTotal;
    }

    public String getStrTUSO() {
        return strTUSO;
    }

    public void setStrTUSO(String strTUSO) {
        this.strTUSO = strTUSO;
    }

    /**
     * @return the strGRUPO
     */
    public String getStrGRUPO() {
        return strGRUPO;
    }

    /**
     * @param strGRUPO the strGRUPO to set
     */
    public void setStrGRUPO(String strGRUPO) {
        this.strGRUPO = strGRUPO;
    }

    

    


}
