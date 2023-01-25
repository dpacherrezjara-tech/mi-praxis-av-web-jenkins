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
public class PSF015 implements Serializable {

    private int IntNro;
    private String strCCUST;
    private String strTDOC;
    private String strTTRAN;
    private String strNTRAN;
    private String strDREF;
    private String strNGUIA;
    private String strPROCEID;
    private String strSTATU;
    private String strMSG;
    private String strSTREXEC;
    private String strSTRTIME;
    private String strUSERPROI;
    private String strENDEXEC;
    private String strENDTIME;
    private String strUSERP;
    private long lngTREAD;
    private long lngTLOAD;
    //Campos de Filtro ***************
    private String strYearFrom;
    private String strMonthFrom;
    private String strDayFrom;
    private String strYearTo;
    private String strMonthTo;
    private String strDayTo;
    private String strRutaBack;
    private String[] lstStrOpciones;
    private String strEstadoCampRec;

    public PSF015() {

        IntNro = 0;
        strCCUST = "";
        strTDOC = "";
        strTTRAN = "";
        strNTRAN = "";
        strDREF = "";
        strNGUIA = "";
        strPROCEID = "";
        strSTATU = "";
        strMSG = "";
        strSTREXEC = "";
        strSTRTIME = "";
        strUSERPROI = "";
        strENDEXEC = "";
        strENDTIME = "";
        strUSERP = "";
        lngTREAD = 0;
        lngTLOAD = 0;
        //Campos de Filtro ***************
        strYearFrom = "";
        strMonthFrom = "";
        strDayFrom = "";
        strYearTo = "";
        strMonthTo = "";
        strDayTo = "";
        strRutaBack = "/PASSUS/MenuServlet?page=1";
        lstStrOpciones = new String[1];
        lstStrOpciones[0] = "1Save";
        strEstadoCampRec = "disabled";

    }

    public int getIntNro() {
        return IntNro;
    }

    public void setIntNro(int IntNro) {
        this.IntNro = IntNro;
    }

    public String getStrCCUST() {
        return strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public String getStrTDOC() {
        return strTDOC;
    }

    public void setStrTDOC(String strTDOC) {
        this.strTDOC = strTDOC;
    }

    public String getStrTTRAN() {
        return strTTRAN;
    }

    public void setStrTTRAN(String strTTRAN) {
        this.strTTRAN = strTTRAN;
    }

    public String getStrNTRAN() {
        return strNTRAN;
    }

    public void setStrNTRAN(String strNTRAN) {
        this.strNTRAN = strNTRAN;
    }

    public String getStrDREF() {
        return strDREF;
    }

    public void setStrDREF(String strDREF) {
        this.strDREF = strDREF;
    }

    public String getStrNGUIA() {
        return strNGUIA;
    }

    public void setStrNGUIA(String strNGUIA) {
        this.strNGUIA = strNGUIA;
    }

    public String getStrPROCEID() {
        return strPROCEID;
    }

    public void setStrPROCEID(String strPROCEID) {
        this.strPROCEID = strPROCEID;
    }

    public String getStrSTATU() {
        return strSTATU;
    }

    public void setStrSTATU(String strSTATU) {
        this.strSTATU = strSTATU;
    }

    public String getStrMSG() {
        return strMSG;
    }

    public void setStrMSG(String strMSG) {
        this.strMSG = strMSG;
    }

    public String getStrSTREXEC() {
        return strSTREXEC;
    }

    public void setStrSTREXEC(String strSTREXEC) {
        this.strSTREXEC = strSTREXEC;
    }

    public String getStrSTRTIME() {
        return strSTRTIME;
    }

    public void setStrSTRTIME(String strSTRTIME) {
        this.strSTRTIME = strSTRTIME;
    }

    public String getStrUSERPROI() {
        return strUSERPROI;
    }

    public void setStrUSERPROI(String strUSERPROI) {
        this.strUSERPROI = strUSERPROI;
    }

    public String getStrENDEXEC() {
        return strENDEXEC;
    }

    public void setStrENDEXEC(String strENDEXEC) {
        this.strENDEXEC = strENDEXEC;
    }

    public String getStrENDTIME() {
        return strENDTIME;
    }

    public void setStrENDTIME(String strENDTIME) {
        this.strENDTIME = strENDTIME;
    }

    public String getStrUSERP() {
        return strUSERP;
    }

    public void setStrUSERP(String strUSERP) {
        this.strUSERP = strUSERP;
    }

    public long getLngTREAD() {
        return lngTREAD;
    }

    public void setLngTREAD(long lngTREAD) {
        this.lngTREAD = lngTREAD;
    }

    public long getLngTLOAD() {
        return lngTLOAD;
    }

    public void setLngTLOAD(long lngTLOAD) {
        this.lngTLOAD = lngTLOAD;
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

    public String getStrRutaBack() {
        return strRutaBack;
    }

    public void setStrRutaBack(String strRutaBack) {
        this.strRutaBack = strRutaBack;
    }

    public String[] getLstStrOpciones() {
        return lstStrOpciones;
    }

    public void setLstStrOpciones(String[] lstStrOpciones) {
        this.lstStrOpciones = lstStrOpciones;
    }

    public String getStrEstadoCampRec() {
        return strEstadoCampRec;
    }

    public void setStrEstadoCampRec(String strEstadoCampRec) {
        this.strEstadoCampRec = strEstadoCampRec;
    }
    
}
