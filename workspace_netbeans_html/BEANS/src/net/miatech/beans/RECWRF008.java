/*
 * RECWRF008.java
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
public class RECWRF008 implements Serializable {
    
    private String strCCUST;
    private String strGrupo;
    private String strUse;
    private String clearingDate;
    private String strAirline;
    private String typeDoc;
    private String strTipoRechazo;
    private String strClaseRechazo;
    private String strInvoice;
    private String strDATE;
    private String strDateEnv;
    private String timeLimit;
    private String strPeriod;
    private String strCamara;
    private String strIndTipoAcuerdo;
    private String invCurrency;
    private String strCurrencyList;
    private long qtyRM;
    private double dblGross;
    private double dblISC;
    private double dblSISC;
    private double dblTAX;
    private double dblNeto;
    private long qtySFIM;
    private long qtyRMGROSS;
    private long qtyRMISC;
    private long qtyRMTAX;
    private long qtyRMOTHERS;
    private String billingMonthFrom;
    private String billingMonthTo;
    private String billingYearFrom;
    private String billingYearTo;
    private long qtyRMN;
    private long qtyRMV;
    private long qtyRMXL;
    private double dblNetoN;
    private double dblNetoV;
    private double dblNetoXL;
    private double dblNetoOthers;
    
    /** Creates a new instance of RECWRF008 */
    public RECWRF008() {
        
    strCCUST = "";
    strGrupo = "";
    strUse = "";
    clearingDate = "";
    strAirline = "";
    typeDoc = "";
    strTipoRechazo = "";
    strClaseRechazo = "";
    strInvoice = "";
    strDATE = "";
    strDateEnv = "";
    timeLimit = "";
    strPeriod = "";
    strCamara = "";
    strIndTipoAcuerdo = "";
    invCurrency = "";
    strCurrencyList = "";
    qtyRM = 0;
    dblGross = 0;
    dblISC = 0;
    dblSISC = 0;
    dblTAX = 0;
    dblNeto = 0;
    qtySFIM = 0;
    qtyRMGROSS = 0;
    qtyRMISC = 0;
    qtyRMTAX = 0;
    qtyRMOTHERS = 0;
    billingMonthFrom = "";
    billingMonthTo = "";
    billingYearFrom = "";
    billingYearTo = "";
    qtyRMN = 0;
    qtyRMV = 0;
    qtyRMXL = 0;
    dblNetoN = 0;
    dblNetoV = 0;
    dblNetoXL = 0;
    dblNetoOthers = 0;
        
    }
    
    
    
    public String getStrCCUST() {
        return this.strCCUST;
    }
    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }
    
    
    public String getStrGrupo() {
        return this.strGrupo;
    }
    public void setStrGrupo(String strGrupo) {
        this.strGrupo = strGrupo;
    }

    
    public String getStrUse() {
        return this.strUse;
    }
    public void setStrUse(String strUse) {
        this.strUse = strUse;
    }

    
    public String getClearingDate() {
        return this.clearingDate;
    }
    public void setClearingDate(String clearingDate) {
        this.clearingDate = clearingDate;
    }
    
       
    public String getStrAirline(){
        return this.strAirline;
    }
    public void setStrAirline(String strAirline) {
        this.strAirline = strAirline;
    }
    
    
    public String getTypeDoc() {
        return this.typeDoc;
    }
    public void setTypeDoc(String typeDoc) {
        this.typeDoc = typeDoc;
    }
    
    
    public String getStrTipoRechazo() {
        return this.strTipoRechazo;
    }
    public void setStrTipoRechazo(String strTipoRechazo) {
        this.strTipoRechazo = strTipoRechazo;
    }
    
    
    public String getStrClaseRechazo() {
        return this.strClaseRechazo;
    }
    public void setStrClaseRechazo(String strClaseRechazo) {
        this.strClaseRechazo = strClaseRechazo;
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
    
    
    public String getStrDateEnv() {
        return this.strDateEnv;
    }
    public void setStrDateEnv(String strDateEnv) {
        this.strDateEnv = strDateEnv;
    }
    
    
    public String getTimeLimit() {
        return this.timeLimit;
    }
    public void setTimeLimit(String timeLimit) {
        this.timeLimit = timeLimit;
    }

    
    public String getStrPeriod() {
        return this.strPeriod;
    }
    public void setStrPeriod(String strPeriod) {
        this.strPeriod = strPeriod;
    }
    
    
    public String getStrCamara() {
        return this.strCamara;
    }
    public void setStrCamara(String strCamara) {
        this.strCamara = strCamara;
    }
    
    
    public String getStrIndTipoAcuerdo() {
        return this.strIndTipoAcuerdo;
    }
    public void setStrIndTipoAcuerdo(String strIndTipoAcuerdo) {
        this.strIndTipoAcuerdo = strIndTipoAcuerdo;
    }

    
    public String getInvCurrency() {
        return this.invCurrency;
    }
    public void setInvCurrency(String invCurrency) {
        this.invCurrency = invCurrency;
    }
    
    
    public String getStrCurrencyList() {
        return this.strCurrencyList;
    }
    public void setStrCurrencyList(String strCurrencyList) {
        this.strCurrencyList = strCurrencyList;
    }
    
    
    public long getQtyRM() {
        return this.qtyRM;
    }
    public void setQtyRM(long qtyRM) {
        this.qtyRM = qtyRM;
    }
    
    
    public double getDblGross() {
        return this.dblGross;
    }
    public void setDblGross(double dblGross) {
        this.dblGross = dblGross;
    }
    
    
    public double getDblISC(){
        return this.dblISC;
    }
    public void setDblISC(double dblISC) {
        this.dblISC = dblISC;
    }
    
    
    public double getDblSISC(){
        return this.dblSISC;
    }
    public void setDblSISC(double dblSISC) {
        this.dblSISC = dblSISC;
    }
    
    
    public double getDblTAX(){
        return this.dblTAX;
    }
    public void setDblTAX(double dblTAX) {
        this.dblTAX = dblTAX;
    }
    
    
    public double getDblNeto(){
        return this.dblNeto;
    }
    public void setDblNeto(double dblNeto) {
        this.dblNeto = dblNeto;
    }

    
    public long getQtySFIM() {
        return this.qtySFIM;
    }
    public void setQtySFIM(long qtySFIM) {
        this.qtySFIM = qtySFIM;
    }
    
    
    public long getQtyRMGROSS() {
        return this.qtyRMGROSS;
    }
    public void setQtyRMGROSS(long qtyRMGROSS) {
        this.qtyRMGROSS = qtyRMGROSS;
    }
    
    
    public long getQtyRMISC() {
        return this.qtyRMISC;
    }
    public void setQtyRMISC(long qtyRMISC) {
        this.qtyRMISC = qtyRMISC;
    }
    
    
    public long getQtyRMTAX() {
        return this.qtyRMTAX;
    }
    public void setQtyRMTAX(long qtyRMTAX) {
        this.qtyRMTAX = qtyRMTAX;
    }
    
    
    public long getQtyRMOTHERS() {
        return this.qtyRMOTHERS;
    }
    public void setQtyRMOTHERS(long qtyRMOTHERS) {
        this.qtyRMOTHERS = qtyRMOTHERS;
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
    
    
    public long getQtyRMN() {
        return this.qtyRMN;
    }
    public void setQtyRMN(long qtyRMN) {
        this.qtyRMN = qtyRMN;
    }
    
    
    public long getQtyRMV() {
        return this.qtyRMV;
    }
    public void setQtyRMV(long qtyRMV) {
        this.qtyRMV = qtyRMV;
    }
    
    
    public long getQtyRMXL() {
        return this.qtyRMXL;
    }
    public void setQtyRMXL(long qtyRMXL) {
        this.qtyRMXL = qtyRMXL;
    }
    
    
    public double getDblNetoN(){
        return this.dblNetoN;
    }
    public void setDblNetoN(double dblNetoN) {
        this.dblNetoN = dblNetoN;
    }
    
    
    public double getDblNetoV(){
        return this.dblNetoV;
    }
    public void setDblNetoV(double dblNetoV) {
        this.dblNetoV = dblNetoV;
    }
    
    
    public double getDblNetoXL(){
        return this.dblNetoXL;
    }
    public void setDblNetoXL(double dblNetoXL) {
        this.dblNetoXL = dblNetoXL;
    }
    
    
    public double getDblNetoOthers(){
        return this.dblNetoOthers;
    }
    public void setDblNetoOthers(double dblNetoOthers) {
        this.dblNetoOthers = dblNetoOthers;
    }
    
}
