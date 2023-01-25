/*
 * RECWRF001.java
 *
 * Created on 14 de febrero de 2008, 12:01 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author claudia
 */
public class RECWRF012 implements Serializable {

    private String strCCUST;
    private String strAirline;
    private String strGroup;
    private String strUse;
    private String strDocumento;
    private String strInvoice;
    private String strDATE;
    private String billingMonthFrom;
    private String billingMonthTo;
    private String billingYearFrom;
    private String billingYearTo;
    private String strFCruce;
    private String strFClear;
    private double dblTarifa;
    private String strMonfare;
    private double dblPDISC;
    private String strTDISC;
    private String strDOC;
    private String strCCIA;
    private String strForma;
    private String strSerie;
    private String lngCupon;
    private String strDCHEQ;
    private String strCurrenp;
    private double dblCurexc;
    private double dblGrossi;
    private double dblISCI;
    private double dblSISCI;
    private double dblTAXI;
    private double dblNETI;
    private String strRUTAP;
    private String strNroPrt;
    private double dblGROSSM;
    private double dblISCM;
    private double dblSISCM;
    private double dblTAXM;
    private double dblNETM;
    private double dblGROSSN;
    private double dblISCN;
    private double dblSISCN;
    private double dblTAXN;
    private double dblNETO;
    private String strNroRM;
    private String strRMACCEPT;
    private String strDOCStatus;
    private String strFechaCrea;
    private long lngTtlInv;
    private long lngTtlDoc;
    private long lngTtlAudi;
    private long lngTtlObs;
    private double dblPercAmt;
    private double dblPercAudi;
    
    /** Creates a new instance of RECWRF012 */
    public RECWRF012() {
        
    strCCUST = "";
    strAirline = "";
    strGroup = "";
    strUse = "";
    strDocumento = "";
    strInvoice = "";
    strDATE = "";
    billingMonthFrom = "";
    billingMonthTo = "";
    billingYearFrom = "";
    billingYearTo = "";
    strFCruce = "";
    strFClear = "";
    strMonfare = "";
    strTDISC = "";
    strDOC = "";
    strCCIA = "";
    strForma = "";
    strSerie = "";
    lngCupon = "";
    strDCHEQ = "";
    strCurrenp = "";
    strRUTAP = "";
    strNroPrt = "";
    strNroRM = "";
    strRMACCEPT = "";
    strDOCStatus = "";
    strFechaCrea = "";
    dblPDISC = 0;
    dblTarifa = 0;
    dblCurexc = 0;
    dblGrossi = 0;
    dblISCI = 0;
    dblSISCI = 0;
    dblTAXI = 0;
    dblNETI = 0;
    dblGROSSM = 0;
    dblISCM = 0;
    dblSISCM = 0;
    dblTAXM = 0;
    dblNETM = 0;
    dblGROSSN = 0;
    dblISCN = 0;
    dblSISCN = 0;
    dblTAXN = 0;
    dblNETO = 0;
    dblPercAmt = 0;
    lngTtlInv = 0;
    lngTtlDoc = 0;
    lngTtlAudi = 0;
    lngTtlObs = 0;
    dblPercAudi = 0;
    }
    
    
    
    public String getStrCCUST() {
        return this.strCCUST;
    }
    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }
    
    
    public String getStrAirline() {
        return this.strAirline;
    }
    public void setStrAirline(String strAirline) {
        this.strAirline = strAirline;
    }
    
    
    
    public String getStrGroup() {
        return this.strGroup;
    }
    public void setStrGroup(String strGroup) {
        this.strGroup = strGroup;
    }
    
    
    public String getStrUse() {
        return this.strUse;
    }
    public void setStrUse(String strUse) {
        this.strUse = strUse;
    }
    
    
    public String getStrDocumento() {
        return this.strDocumento;
    }
    public void setStrDocumento(String strDocumento) {
        this.strDocumento = strDocumento;
    }
    
    
    public String getStrInvoice() {
        return this.strInvoice;
    }
    public void setStrInvoice(String strInvoice) {
        this.strInvoice = strInvoice;
    }
    
    
    public String getStrDATE() {
        return this.strDATE;
    }
    public void setStrDATE(String strDATE) {
        this.strDATE = strDATE;
    }
    
    
    public String getBillingMonthFrom() {
        return this.billingMonthFrom;
    }
    public void setBillingMonthFrom(String billingMonthFrom) {
        this.billingMonthFrom = billingMonthFrom;
    }
    
    
    public String getBillingMonthTo() {
        return this.billingMonthTo;
    }
    public void setBillingMonthTo(String billingMonthTo) {
        this.billingMonthTo = billingMonthTo;
    }
    
    
    public String getBillingYearFrom() {
        return this.billingYearFrom;
    }
    public void setBillingYearFrom(String billingYearFrom) {
        this.billingYearFrom = billingYearFrom;
    }
    
    
    public String getBillingYearTo() {
        return this.billingYearTo;
    }
    public void setBillingYearTo(String billingYearTo) {
        this.billingYearTo = billingYearTo;
    }
    
    
    public String getStrFCruce() {
        return this.strFCruce;
    }
    public void setStrFCruce(String strFCruce) {
        this.strFCruce = strFCruce;
    }
    
    
    public String getStrFClear() {
        return this.strFClear;
    }
    public void setStrFClear(String strFClear) {
        this.strFClear = strFClear;
    }
   
            
    public double getDblTarifa() {
        return this.dblTarifa;
    }
    public void setDblTarifa(double dblTarifa) {
        this.dblTarifa = dblTarifa;
    }
    
    
    public String getStrMonfare() {
        return this.strMonfare;
    }
    public void setStrMonfare(String strMonfare) {
        this.strMonfare = strMonfare;
    }
    
    
    public double getDblPDISC() {
        return this.dblPDISC;
    }
    public void setDblPDISC(double dblPDISC) {
        this.dblPDISC = dblPDISC;
    }
    
    
    public String getStrTDISC() {
        return this.strTDISC;
    }
    public void setStrTDISC(String strTDISC) {
        this.strTDISC = strTDISC;
    }
    
    
    public String getStrDOC() {
        return this.strDOC;
    }
    public void setStrDOC(String strDOC) {
        this.strDOC = strDOC;
    }
    
    
    public String getStrCCIA() {
        return this.strCCIA;
    }
    public void setStrCCIA(String strCCIA) {
        this.strCCIA = strCCIA;
    }
    
    
    public String getStrForma() {
        return this.strForma;
    }
    public void setStrForma(String strForma) {
        this.strForma = strForma;
    }
    
    public String getStrSerie() {
        return this.strSerie;
    }
    public void setStrSerie(String strSerie) {
        this.strSerie = strSerie;
    }
    
    
    public String getLngCupon() {
        return this.lngCupon;
    }
    public void setLngCupon(String lngCupon) {
        this.lngCupon = lngCupon;
    }
    
    
    public String getStrDCHEQ() {
        return this.strDCHEQ;
    }
    public void setStrDCHEQ(String strDCHEQ) {
        this.strDCHEQ = strDCHEQ;
    }
    
    
    public String getStrCurrenp() {
        return this.strCurrenp;
    }
    public void setStrCurrenp(String strCurrenp) {
        this.strCurrenp = strCurrenp;
    }
    
    
    public double getDblCurexc() {
        return this.dblCurexc;
    }
    public void setDblCurexc(double dblCurexc) {
        this.dblCurexc = dblCurexc;
    }
    
    
    public double getDblGrossi() {
        return this.dblGrossi;
    }
    public void setDblGrossi(double dblGrossi) {
        this.dblGrossi = dblGrossi;
    }
    
    
    public double getDblISCI() {
        return this.dblISCI;
    }
    public void setDblISCI(double dblISCI) {
        this.dblISCI = dblISCI;
    }
    
    
    public double getDblSISCI() {
        return this.dblSISCI;
    }
    public void setDblSISCI(double dblSISCI) {
        this.dblSISCI = dblSISCI;
    }
    
    
    public double getDblTAXI() {
        return this.dblTAXI;
    }
    public void setDblTAXI(double dblTAXI) {
        this.dblTAXI = dblTAXI;
    }
    
    
    public double getDblNETI() {
        return this.dblNETI;
    }
    public void setDblNETI(double dblNETI) {
        this.dblNETI = dblNETI;
    }
    
    
    public String getStrRUTAP() {
        return this.strRUTAP;
    }
    public void setStrRUTAP(String strRUTAP) {
        this.strRUTAP = strRUTAP;
    }
    
    
    public String getStrNroPrt() {
        return this.strNroPrt;
    }
    public void setStrNroPrt(String strNroPrt) {
        this.strNroPrt = strNroPrt;
    }
    
    
    public double getDblGROSSM() {
        return this.dblGROSSM;
    }
    public void setDblGROSSM(double dblGROSSM) {
        this.dblGROSSM = dblGROSSM;
    }
    
    
    public double getDblISCM() {
        return this.dblISCM;
    }
    public void setDblISCM(double dblISCM) {
        this.dblISCM = dblISCM;
    }
    
    
    public double getDblSISCM() {
        return this.dblSISCM;
    }
    public void setDblSISCM(double dblSISCM) {
        this.dblSISCM = dblSISCM;
    }
    
    
    public double getDblTAXM() {
        return this.dblTAXM;
    }
    public void setDblTAXM(double dblTAXM) {
        this.dblTAXM = dblTAXM;
    }
    
    
    public double getDblNETM() {
        return this.dblNETM;
    }
    public void setDblNETM(double dblNETM) {
        this.dblNETM = dblNETM;
    }
    
    
    public double getDblGROSSN() {
        return this.dblGROSSN;
    }
    public void setDblGROSSN(double dblGROSSN) {
        this.dblGROSSN = dblGROSSN;
    }
    
    
    public double getDblISCN() {
        return this.dblISCN;
    }
    public void setDblISCN(double dblISCN) {
        this.dblISCN = dblISCN;
    }
    
    
    public double getDblSISCN() {
        return this.dblSISCN;
    }
    public void setDblSISCN(double dblSISCN) {
        this.dblSISCN = dblSISCN;
    }
    
    
    public double getDblTAXN() {
        return this.dblTAXN;
    }
    public void setDblTAXN(double dblTAXN) {
        this.dblTAXN = dblTAXN;
    }
    
    
    public double getDblNETO() {
        return this.dblNETO;
    }
    public void setDblNETO(double dblNETO) {
        this.dblNETO = dblNETO;
    }
    
    
    public String getStrNroRM() {
        return this.strNroRM;
    }
    public void setStrNroRM(String strNroRM) {
        this.strNroRM = strNroRM;
    }
    
    
    public String getStrRMACCEPT() {
        return this.strRMACCEPT;
    }
    public void setStrRMACCEPT(String strRMACCEPT) {
        this.strRMACCEPT = strRMACCEPT;
    }
    
    
    public String getStrDOCStatus() {
        return this.strDOCStatus;
    }
    public void setStrDOCStatus(String strDOCStatus) {
        this.strDOCStatus = strDOCStatus;
    }
    
    
    public String getStrFechaCrea() {
        return this.strFechaCrea;
    }
    public void setStrFechaCrea(String strFechaCrea) {
        this.strFechaCrea = strFechaCrea;
    }
    
    
    public long getLngTtlInv() {
        return this.lngTtlInv;
    }
    public void setLngTtlInv(long lngTtlInv) {
        this.lngTtlInv = lngTtlInv;
    }
    
    
    public long getLngTtlDoc() {
        return this.lngTtlDoc;
    }
    public void setLngTtlDoc(long lngTtlDoc) {
        this.lngTtlDoc = lngTtlDoc;
    }
    
    
    public long getLngTtlAudi() {
        return this.lngTtlAudi;
    }
    public void setLngTtlAudi(long lngTtlAudi) {
        this.lngTtlAudi = lngTtlAudi;
    }
    
    
    public long getLngTtlObs() {
        return this.lngTtlObs;
    }
    public void setLngTtlObs(long lngTtlObs) {
        this.lngTtlObs = lngTtlObs;
    }
    
    
    public double getDblPercAmt() {
        return this.dblPercAmt;
    }
    public void setDblPercAmt(double dblPercAmt) {
        this.dblPercAmt = dblPercAmt;
    }

    public double getDblPercAudi() {
        return dblPercAudi;
    }

    public void setDblPercAudi(double dblPercAudi) {
        this.dblPercAudi = dblPercAudi;
    }
    
    
}
