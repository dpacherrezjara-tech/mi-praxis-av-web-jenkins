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
public class PSF051 implements Serializable{
    
    private String strCCUST;
    private String strNAID;
    private String strCCIA;
    private String strFINVOICE;
    private String strPERMONT;
    private String strINVOICE;
    private String strTUSO;
    private String strNPAG;
    private String strDSCANER;
    private String strFILENAME;
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strUSAC;
    private String strFEAC;
    private String strHOAC;
    private String strMensajeError;
    private long lngInvoices;
    private long lngDocuments;
    private long lngTotDocs;
    private long lngTotInvFound;
    private int  qtyTickets;
    private String strTIPOLISTA;
    private String strNumDoc;
    //Campos de Filtro ***************
    private String strYearFrom;
    private String strMonthFrom;
    private String strYearTo;
    private String strMonthTo;
    private String strSEQ;
    
    public PSF051() {

        strCCUST = "";
        strNAID = "";
        strCCIA = "";
        strFINVOICE = "";
        strPERMONT = "";
        strINVOICE = "";
        strTUSO = "";
        strNPAG = "";
        strDSCANER = "";
        strFILENAME = "";
        strUSCR = "";
        strFECR = "";
        strHOCR = "";
        strUSAC = "";
        strFEAC = "";
        strHOAC = "";
        strMensajeError = "";
        lngInvoices = 0;
        lngDocuments = 0;
        lngTotDocs = 0;
        lngTotInvFound = 0;
        strTIPOLISTA = "";
        strYearFrom = "";
        strMonthFrom = "";
        strYearTo = "";
        strMonthTo = "";
        strNumDoc = "";
        strSEQ = "";
        qtyTickets = 0;

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

    public String getStrTUSO() {
        return strTUSO;
    }

    public void setStrTUSO(String strTUSO) {
        this.strTUSO = strTUSO;
    }

    public String getStrNPAG() {
        return strNPAG;
    }

    public void setStrNPAG(String strNPAG) {
        this.strNPAG = strNPAG;
    }

    public String getStrDSCANER() {
        return strDSCANER;
    }

    public void setStrDSCANER(String strDSCANER) {
        this.strDSCANER = strDSCANER;
    }

    public String getStrFILENAME() {
        return strFILENAME;
    }

    public void setStrFILENAME(String strFILENAME) {
        this.strFILENAME = strFILENAME;
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

    public long getLngInvoices() {
        return lngInvoices;
    }

    public void setLngInvoices(long lngInvoices) {
        this.lngInvoices = lngInvoices;
    }

    public long getLngDocuments() {
        return lngDocuments;
    }

    public void setLngDocuments(long lngDocuments) {
        this.lngDocuments = lngDocuments;
    }

    public long getLngTotDocs() {
        return lngTotDocs;
    }

    public void setLngTotDocs(long lngTotDocs) {
        this.lngTotDocs = lngTotDocs;
    }

    public long getLngTotInvFound() {
        return lngTotInvFound;
    }

    public void setLngTotInvFound(long lngTotInvFound) {
        this.lngTotInvFound = lngTotInvFound;
    }

    public String getStrTIPOLISTA() {
        return strTIPOLISTA;
    }

    public void setStrTIPOLISTA(String strTIPOLISTA) {
        this.strTIPOLISTA = strTIPOLISTA;
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

    public String getStrNumDoc() {
        return strNumDoc;
    }

    public void setStrNumDoc(String strNumDoc) {
        this.strNumDoc = strNumDoc;
    }

    public String getStrSEQ() {
        return strSEQ;
    }

    public void setStrSEQ(String strSEQ) {
        this.strSEQ = strSEQ;
    }

    public int getQtyTickets() {
        return qtyTickets;
    }

    public void setQtyTickets(int qtyTickets) {
        this.qtyTickets = qtyTickets;
    }

    


}
