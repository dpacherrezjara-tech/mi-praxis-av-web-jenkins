/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.beans.lists.CadenaList;

public class PSF003 implements Serializable {

    private String strCCUST; 
    private String strCCIA;
    private String strFORMA;
    private String strSERIE;
    private String strCUPON;
    private String strDCHEQ;
    private String strSEQ;
    private String strDSCAN;
    private String strNGUIA;
    private String strTDOC;
    private String strDOC1;
    private String strDOC2;
    private String strCDEPART;
    private String strCARRIVA;
    private String strNFLIGHT;
    private String strDFLIGHT;
    private String strNDOC;
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strUSUP;
    private String strFEUP;
    private String strHOUP;
    private String strFLAG;
    private String strRecordType;
    private String strEstilo;
    private String strMensajeError;
    private String strIdImg;
    private String strDOCOrig;
    private long lngDocEscaneados;
    private long lngDocXEscanear;
    private CadenaList lstFims;
    //Campos de Filtro **********
    private String strYear;
    private String strMonth;
    private String strDay;
    //Campos de Filtro ***************
    private String strYearFrom;
    private String strMonthFrom;
    private String strDayFrom;
    private String strYearTo;
    private String strMonthTo;
    private String strDayTo;
    private String strDate;
    private String strTIPOLISTA;
    private String strNomImg;
    private String strAccion;
    
    private String strTUFOR;
    private String strFILENAME;
    private String strDREF;
    private long lngQCUPOW;
    private long lngQCUPOAL;
    
    public PSF003() {

        strCCUST = "";
        strCCIA = "";
        strFORMA = "";
        strSERIE = "";
        strCUPON = "";
        strDCHEQ = "";
        strSEQ = "01";
        strDSCAN = "";
        strNGUIA = "";
        strDOC1 = "";
        strDOC2 = "";
        strTDOC = "";
        strCDEPART = "";
        strCARRIVA = "";
        strNFLIGHT = "";
        strDFLIGHT = "";
        strNDOC = "";
        strUSCR = "";
        strFECR = "";
        strHOCR = "";
        strUSUP = "";
        strFEUP = "";
        strHOUP = "";
        strFLAG = "";
        strRecordType="";
        strEstilo = "clsTextBlueBold";
        strMensajeError = "";
        strIdImg = "";
        strDOCOrig = "";
        lngDocEscaneados = 0;
        lngDocXEscanear = 0;
        lstFims = null;
        //Campos de Filtro ***********
        strYear = "";
        strMonth = "";
        strDay = "";
        strYearFrom = "";
        strMonthFrom = "";
        strDayFrom = "";
        strYearTo = "";
        strMonthTo = "";
        strDayTo = "";
        strDate = "DFLIGHT";
        strTIPOLISTA = "";
        strNomImg = "";
        strAccion = "";
        strTUFOR = "";
        strFILENAME = "";
        strDREF = "";
        lngQCUPOAL = 0;
        lngQCUPOW = 0;
    }

    /**
     * @return the strCCUST
     */
    public String getStrCCUST() {
        return strCCUST;
    }

    /**
     * @param strCCUST the strCCUST to set
     */
    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    /**
     * @return the strCCIA
     */
    public String getStrCCIA() {
        return strCCIA;
    }

    /**
     * @param strCCIA the strCCIA to set
     */
    public void setStrCCIA(String strCCIA) {
        this.strCCIA = strCCIA;
    }

    /**
     * @return the strFORMA
     */
    public String getStrFORMA() {
        return strFORMA;
    }

    /**
     * @param strFORMA the strFORMA to set
     */
    public void setStrFORMA(String strFORMA) {
        this.strFORMA = strFORMA;
    }

    /**
     * @return the strSERIE
     */
    public String getStrSERIE() {
        return strSERIE;
    }

    /**
     * @param strSERIE the strSERIE to set
     */
    public void setStrSERIE(String strSERIE) {
        this.strSERIE = strSERIE;
    }

    /**
     * @return the strCUPON
     */
    public String getStrCUPON() {
        return strCUPON;
    }

    /**
     * @param strCUPON the strCUPON to set
     */
    public void setStrCUPON(String strCUPON) {
        this.strCUPON = strCUPON;
    }

    /**
     * @return the strSEQ
     */
    public String getStrSEQ() {
        return strSEQ;
    }

    /**
     * @param strSEQ the strSEQ to set
     */
    public void setStrSEQ(String strSEQ) {
        this.strSEQ = strSEQ;
    }

    /**
     * @return the strDSCAN
     */
    public String getStrDSCAN() {
        return strDSCAN;
    }

    /**
     * @param strDSCAN the strDSCAN to set
     */
    public void setStrDSCAN(String strDSCAN) {
        this.strDSCAN = strDSCAN;
    }

    /**
     * @return the strCDEPART
     */
    public String getStrCDEPART() {
        return strCDEPART;
    }

    /**
     * @param strCDEPART the strCDEPART to set
     */
    public void setStrCDEPART(String strCDEPART) {
        this.strCDEPART = strCDEPART;
    }

    /**
     * @return the strCARRIVA
     */
    public String getStrCARRIVA() {
        return strCARRIVA;
    }

    /**
     * @param strCARRIVA the strCARRIVA to set
     */
    public void setStrCARRIVA(String strCARRIVA) {
        this.strCARRIVA = strCARRIVA;
    }

    /**
     * @return the strNFLIGHT
     */
    public String getStrNFLIGHT() {
        return strNFLIGHT;
    }

    /**
     * @param strNFLIGHT the strNFLIGHT to set
     */
    public void setStrNFLIGHT(String strNFLIGHT) {
        this.strNFLIGHT = strNFLIGHT;
    }

    /**
     * @return the strDFLIGHT
     */
    public String getStrDFLIGHT() {
        return strDFLIGHT;
    }

    /**
     * @param strDFLIGHT the strDFLIGHT to set
     */
    public void setStrDFLIGHT(String strDFLIGHT) {
        this.strDFLIGHT = strDFLIGHT;
    }

    /**
     * @return the strUSCR
     */
    public String getStrUSCR() {
        return strUSCR;
    }

    /**
     * @param strUSCR the strUSCR to set
     */
    public void setStrUSCR(String strUSCR) {
        this.strUSCR = strUSCR;
    }

    /**
     * @return the strFECR
     */
    public String getStrFECR() {
        return strFECR;
    }

    /**
     * @param strFECR the strFECR to set
     */
    public void setStrFECR(String strFECR) {
        this.strFECR = strFECR;
    }

    /**
     * @return the strHOCR
     */
    public String getStrHOCR() {
        return strHOCR;
    }

    /**
     * @param strHOCR the strHOCR to set
     */
    public void setStrHOCR(String strHOCR) {
        this.strHOCR = strHOCR;
    }

    /**
     * @return the strUSUP
     */
    public String getStrUSUP() {
        return strUSUP;
    }

    /**
     * @param strUSUP the strUSUP to set
     */
    public void setStrUSUP(String strUSUP) {
        this.strUSUP = strUSUP;
    }

    /**
     * @return the strFEUP
     */
    public String getStrFEUP() {
        return strFEUP;
    }

    /**
     * @param strFEUP the strFEUP to set
     */
    public void setStrFEUP(String strFEUP) {
        this.strFEUP = strFEUP;
    }

    /**
     * @return the strHOUP
     */
    public String getStrHOUP() {
        return strHOUP;
    }

    /**
     * @param strHOUP the strHOUP to set
     */
    public void setStrHOUP(String strHOUP) {
        this.strHOUP = strHOUP;
    }

    /**
     * @return the strRecordType
     */
    public String getStrRecordType() {
        return strRecordType;
    }

    /**
     * @param strRecordType the strRecordType to set
     */
    public void setStrRecordType(String strRecordType) {
        this.strRecordType = strRecordType;
    }
    
    /**
     * @return the strEstilo
     */
    public String getStrEstilo() {
        return strEstilo;
    }

    /**
     * @param strEstilo the strEstilo to set
     */
    public void setStrEstilo(String strEstilo) {
        this.strEstilo = strEstilo;
    }

    public String getStrYear() {
        return strYear;
    }

    public void setStrYear(String strYear) {
        this.strYear = strYear;
    }

    
    public String getStrMonth() {
        return strMonth;
    }

    public void setStrMonth(String strMonth) {
        this.strMonth = strMonth;
    }

    
    public String getStrDay() {
        return strDay;
    }

    public void setStrDay(String strDay) {
        this.strDay = strDay;
    }

    
    public String getStrMensajeError() {
        return strMensajeError;
    }

    public void setStrMensajeError(String strMensajeError) {
        this.strMensajeError = strMensajeError;
    }

    
    public String getStrDCHEQ() {
        return strDCHEQ;
    }

    public void setStrDCHEQ(String strDCHEQ) {
        this.strDCHEQ = strDCHEQ;
    }

    
    public String getStrNDOC() {
        return strNDOC;
    }

    public void setStrNDOC(String strNDOC) {
        this.strNDOC = strNDOC;
    }

    public String getStrNGUIA() {
        return strNGUIA;
    }

    public void setStrNGUIA(String strNGUIA) {
        this.strNGUIA = strNGUIA;
    }

    public String getStrIdImg() {
        return strIdImg;
    }

    public void setStrIdImg(String strIdImg) {
        this.strIdImg = strIdImg;
    }

    public long getLngDocEscaneados() {
        return lngDocEscaneados;
    }

    public void setLngDocEscaneados(long lngDocEscaneados) {
        this.lngDocEscaneados = lngDocEscaneados;
    }

    public long getLngDocXEscanear() {
        return lngDocXEscanear;
    }

    public void setLngDocXEscanear(long lngDocXEscanear) {
        this.lngDocXEscanear = lngDocXEscanear;
    }

    public String getStrTDOC() {
        return strTDOC;
    }

    public void setStrTDOC(String strTDOC) {
        this.strTDOC = strTDOC;
    }

    public String getStrDOC1() {
        return strDOC1;
    }

    public void setStrDOC1(String strDOC1) {
        this.strDOC1 = strDOC1;
    }

    public String getStrDOC2() {
        return strDOC2;
    }

    public void setStrDOC2(String strDOC2) {
        this.strDOC2 = strDOC2;
    }

    public String getStrDOCOrig() {
        return strDOCOrig;
    }

    public void setStrDOCOrig(String strDOCOrig) {
        this.strDOCOrig = strDOCOrig;
    }

    public CadenaList getLstFims() {
        return lstFims;
    }

    public void setLstFims(CadenaList lstFims) {
        this.lstFims = lstFims;
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

    public String getStrDate() {
        return strDate;
    }

    public void setStrDate(String strDate) {
        this.strDate = strDate;
    }

    public String getStrFLAG() {
        return strFLAG;
    }

    public void setStrFLAG(String strFLAG) {
        this.strFLAG = strFLAG;
    }

    public String getStrTIPOLISTA() {
        return strTIPOLISTA;
    }

    public void setStrTIPOLISTA(String strTIPOLISTA) {
        this.strTIPOLISTA = strTIPOLISTA;
    }

    public String getStrNomImg() {
        return strNomImg;
    }

    public void setStrNomImg(String strNomImg) {
        this.strNomImg = strNomImg;
    }

    public String getStrAccion() {
        return strAccion;
    }

    public void setStrAccion(String strAccion) {
        this.strAccion = strAccion;
    }

    public String getStrTUFOR() {
        return strTUFOR;
    }

    public void setStrTUFOR(String strTUFOR) {
        this.strTUFOR = strTUFOR;
    }

    public String getStrFILENAME() {
        return strFILENAME;
    }

    public void setStrFILENAME(String strFILENAME) {
        this.strFILENAME = strFILENAME;
    }

    public String getStrDREF() {
        return strDREF;
    }

    public void setStrDREF(String strDREF) {
        this.strDREF = strDREF;
    }

    public long getLngQCUPOW() {
        return lngQCUPOW;
    }

    public void setLngQCUPOW(long lngQCUPOW) {
        this.lngQCUPOW = lngQCUPOW;
    }

    public long getLngQCUPOAL() {
        return lngQCUPOAL;
    }

    public void setLngQCUPOAL(long lngQCUPOAL) {
        this.lngQCUPOAL = lngQCUPOAL;
    }

    
    
}
