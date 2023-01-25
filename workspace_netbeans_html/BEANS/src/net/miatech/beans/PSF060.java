/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author claudia
 */
public class PSF060 implements Serializable{
    
    private String strCCUST;
    private String strNAID ;
    private String strSTVAL;
    private String strNGUIA;
    private String strCCIA;
    private String strFINVOICE;
    private String strPERMONT;
    private String strINVOICE;
    private String strTCOMP;
    private String strCURRENC;
    private double dblINETO;
    private String strCURRENP;
    private double dblTNETO;
    private String strNAWB;
    private String strFEMBAR;
    private String strFRECEP;
    private String strFWARN1;
    private String strFWARN2;
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strUSAC;
    private String strFEAC;
    private String strHOAC;
    private String strMensajeError;    
    private String strCampoError;
    //Campos de Filtro ***************    
    private String strYearFrom;
    private String strMonthFrom;
    private String strDayFrom;
    private String strYearTo;
    private String strMonthTo;
    private String strDayTo;
    
    private String strPametro01;
    //Campos Filtro FINVOICE *********
    private String strYearInvoice;
    private String strMonthInvoice;
    
    private int    intQITEMS;
    private double dblIFARE;
    private double dblIISC;
    private double dblIISCTAX;
    private double dblITAX;
    private double dblIVAT;
    private double dblIUATP;
    private String strTUSO;
    
    
    
    public PSF060() {

        strCCUST = "";
        strNAID = "";
        strSTVAL = "";
        strNGUIA = "";
        strCCIA = "";
        strFINVOICE = "";
        strPERMONT = "";
        strINVOICE = "";
        strTCOMP = "";
        strCURRENC = "";
        dblINETO = 0;
        strCURRENP = "";
        dblTNETO = 0;
        strNAWB = "";
        strFEMBAR = "";
        strFRECEP = "";
        strFWARN1 = "";
        strFWARN2 = "";
        strUSCR = "";
        strFECR = "";
        strHOCR = "";
        strUSAC = "";
        strFEAC = "";
        strHOAC = "";
        strMensajeError = "";
        strCampoError = "";
        strYearFrom = "";
        strMonthFrom = "";
        strDayFrom = "";
        strYearTo = "";
        strMonthTo = "";
        strDayTo = "";
        strYearInvoice = "";
        strMonthInvoice = "";
        strPametro01 = "";
        
        intQITEMS = 0;
        dblIFARE = 00;
        dblIISC = 00;
        dblIISCTAX = 00;
        dblITAX = 00;
        dblIVAT = 00;
        dblIUATP = 00;
        strTUSO = "";  

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

    public String getStrNGUIA() {
        return strNGUIA;
    }

    public void setStrNGUIA(String strNGUIA) {
        this.strNGUIA = strNGUIA;
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

    public String getStrNAWB() {
        return strNAWB;
    }

    public void setStrNAWB(String strNAWB) {
        this.strNAWB = strNAWB;
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

    public String getStrMensajeError() {
        return strMensajeError;
    }

    public void setStrMensajeError(String strMensajeError) {
        this.strMensajeError = strMensajeError;
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

    public String getStrYearInvoice() {
        return strYearInvoice;
    }

    public void setStrYearInvoice(String strYearInvoice) {
        this.strYearInvoice = strYearInvoice;
    }

    public String getStrMonthInvoice() {
        return strMonthInvoice;
    }

    public void setStrMonthInvoice(String strMonthInvoice) {
        this.strMonthInvoice = strMonthInvoice;
    }

    public String getStrCampoError() {
        return strCampoError;
    }

    public void setStrCampoError(String strCampoError) {
        this.strCampoError = strCampoError;
    }

    public double getDblIFARE() {
        return dblIFARE;
    }

    public void setDblIFARE(double dblIFARE) {
        this.dblIFARE = dblIFARE;
    }

    public double getDblIISC() {
        return dblIISC;
    }

    public void setDblIISC(double dblIISC) {
        this.dblIISC = dblIISC;
    }

    public double getDblIISCTAX() {
        return dblIISCTAX;
    }

    public void setDblIISCTAX(double dblIISCTAX) {
        this.dblIISCTAX = dblIISCTAX;
    }

    public double getDblITAX() {
        return dblITAX;
    }

    public void setDblITAX(double dblITAX) {
        this.dblITAX = dblITAX;
    }

    public double getDblIUATP() {
        return dblIUATP;
    }

    public void setDblIUATP(double dblIUATP) {
        this.dblIUATP = dblIUATP;
    }

    public double getDblIVAT() {
        return dblIVAT;
    }

    public void setDblIVAT(double dblIVAT) {
        this.dblIVAT = dblIVAT;
    }

    public int getIntQITEMS() {
        return intQITEMS;
    }

    public void setIntQITEMS(int intQITEMS) {
        this.intQITEMS = intQITEMS;
    }

    public String getStrTUSO() {
        return strTUSO;
    }

    public void setStrTUSO(String strTUSO) {
        this.strTUSO = strTUSO;
    }

    public String getStrPametro01() {
        return strPametro01;
    }

    public void setStrPametro01(String strPametro01) {
        this.strPametro01 = strPametro01;
    }

    
    
    

}
