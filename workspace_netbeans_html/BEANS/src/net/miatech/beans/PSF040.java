/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;

public class PSF040 implements Serializable {


    private String strCCUST;
    private String strNAID;   
    private String strCARR;
    private String strNFLIGHT;
    private String strDFLIGHT;
    private String strCDEPART;
    private String strCARRIVA;
    private String strCCIA;
    private String strFORMA;
    private String strSERIE;
    private String strCUPON;
    private String strSEQ;
    private String strDCHEQ;
    private String strISSUED;
    private String strCURRENP;
    private double dblAMOUNT;
    private String strFVAT;
    private String strSTVAL;
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strUSAC;
    private String strFEAC;
    private String strHOAC;
    private String strMensajeError;
    private String strRuta;

    private String strTDOC;
    private String strFIMG;
    private String strDPROCES;
    private String strSEQPROC;

    //Campos de Filtro ***************
    private String strYearFrom;
    private String strMonthFrom;
    private String strDayFrom;
    private String strYearTo;
    private String strMonthTo;
    private String strDayTo;

    //Campos de totales
    private long lngQtySTDBY;
    private long lngQtyPROCE;
    private long lngQtyCupons;
    
    private boolean isDifferen;    
    
    public PSF040() {

        strCCUST = "";
        strNAID = ""; 
        strCARR = "";
        strNFLIGHT = "";
        strDFLIGHT = "";
        strCDEPART = "";
        strCARRIVA = "";
        strCCIA = "";
        strFORMA = "";
        strSERIE = "";
        strCUPON = "";
        strSEQ = "";
        strDCHEQ = "";
        strISSUED = "";
        strCURRENP = "";
        dblAMOUNT = 0;
        strFVAT = "";
        strSTVAL = "";
        strUSCR = "";
        strFECR = "";
        strHOCR = "";
        strUSAC = "";
        strFEAC = "";
        strHOAC = "";
        strMensajeError = "";
        strRuta = "";
        strYearFrom = "";
        strMonthFrom = "";
        strDayFrom = "";
        strYearTo = "";
        strMonthTo = "";
        strDayTo = "";

        strTDOC = "";
        strFIMG = "";
        strDPROCES = "";
        strSEQPROC = "";
        lngQtySTDBY = 0;
        lngQtyPROCE = 0;
        lngQtyCupons = 0;
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

    public String getStrNFLIGHT() {
        return strNFLIGHT;
    }

    public void setStrNFLIGHT(String strNFLIGHT) {
        this.strNFLIGHT = strNFLIGHT;
    }

    public String getStrDFLIGHT() {
        return strDFLIGHT;
    }

    public void setStrDFLIGHT(String strDFLIGHT) {
        this.strDFLIGHT = strDFLIGHT;
    }

    public String getStrCDEPART() {
        return strCDEPART;
    }

    public void setStrCDEPART(String strCDEPART) {
        this.strCDEPART = strCDEPART;
    }

    public String getStrCARRIVA() {
        return strCARRIVA;
    }

    public void setStrCARRIVA(String strCARRIVA) {
        this.strCARRIVA = strCARRIVA;
    }

    public String getStrCCIA() {
        return strCCIA;
    }

    public void setStrCCIA(String strCCIA) {
        this.strCCIA = strCCIA;
    }

    public String getStrCUPON() {
        return strCUPON;
    }

    public void setStrCUPON(String strCUPON) {
        this.strCUPON = strCUPON;
    }

    public String getStrISSUED() {
        return strISSUED;
    }

    public void setStrISSUED(String strISSUED) {
        this.strISSUED = strISSUED;
    }

    public String getStrCURRENP() {
        return strCURRENP;
    }

    public void setStrCURRENP(String strCURRENP) {
        this.strCURRENP = strCURRENP;
    }

    public double getDblAMOUNT() {
        return dblAMOUNT;
    }

    public void setDblAMOUNT(double dblAMOUNT) {
        this.dblAMOUNT = dblAMOUNT;
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

    public String getStrCARR() {
        return strCARR;
    }

    public void setStrCARR(String strCARR) {
        this.strCARR = strCARR;
    }

    public String getStrFORMA() {
        return strFORMA;
    }

    public void setStrFORMA(String strFORMA) {
        this.strFORMA = strFORMA;
    }

    public String getStrSERIE() {
        return strSERIE;
    }

    public void setStrSERIE(String strSERIE) {
        this.strSERIE = strSERIE;
    }

    public String getStrSEQ() {
        return strSEQ;
    }

    public void setStrSEQ(String strSEQ) {
        this.strSEQ = strSEQ;
    }

    public String getStrMensajeError() {
        return strMensajeError;
    }

    public void setStrMensajeError(String strMensajeError) {
        this.strMensajeError = strMensajeError;
    }

    public String getStrRuta() {
        return strRuta;
    }

    public void setStrRuta(String strRuta) {
        this.strRuta = strRuta;
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

    public String getStrDayFrom() {
        return strDayFrom;
    }

    public void setStrDayFrom(String strDayFrom) {
        this.strDayFrom = strDayFrom;
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

    public String getStrDayTo() {
        return strDayTo;
    }

    public void setStrDayTo(String strDayTo) {
        this.strDayTo = strDayTo;
    }

    public String getStrSTVAL() {
        return strSTVAL;
    }

    public void setStrSTVAL(String strSTVAL) {
        this.strSTVAL = strSTVAL;
    }

    public String getStrFVAT() {
        return strFVAT;
    }

    public void setStrFVAT(String strFVAT) {
        this.strFVAT = strFVAT;
    }

    public String getStrDCHEQ() {
        return strDCHEQ;
    }

    public void setStrDCHEQ(String strDCHEQ) {
        this.strDCHEQ = strDCHEQ;
    }
    
    public boolean isIsDifferen() {
        return isDifferen;
    }

    public void setIsDifferen(boolean isDifferen) {
        this.isDifferen = isDifferen;
    }

    public long getLngQtyCupons() {
        return lngQtyCupons;
    }

    public void setLngQtyCupons(long lngQtyCupons) {
        this.lngQtyCupons = lngQtyCupons;
    }

    public long getLngQtyPROCE() {
        return lngQtyPROCE;
    }

    public void setLngQtyPROCE(long lngQtyPROCE) {
        this.lngQtyPROCE = lngQtyPROCE;
    }

    public long getLngQtySTDBY() {
        return lngQtySTDBY;
    }

    public void setLngQtySTDBY(long lngQtySTDBY) {
        this.lngQtySTDBY = lngQtySTDBY;
    }

    public String getStrDPROCES() {
        return strDPROCES;
    }

    public void setStrDPROCES(String strDPROCES) {
        this.strDPROCES = strDPROCES;
    }

    public String getStrFIMG() {
        return strFIMG;
    }

    public void setStrFIMG(String strFIMG) {
        this.strFIMG = strFIMG;
    }

    public String getStrSEQPROC() {
        return strSEQPROC;
    }

    public void setStrSEQPROC(String strSEQPROC) {
        this.strSEQPROC = strSEQPROC;
    }

    public String getStrTDOC() {
        return strTDOC;
    }

    public void setStrTDOC(String strTDOC) {
        this.strTDOC = strTDOC;
    }



    
}
