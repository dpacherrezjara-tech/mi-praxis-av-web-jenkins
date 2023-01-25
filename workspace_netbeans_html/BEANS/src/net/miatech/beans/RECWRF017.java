/*
 * RECWRF017.java
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
public class RECWRF017 implements Serializable {
    
    private String strCCUST;
    private String strUserWeb;
    private String strOpcionWeb;
    private String strFechaVisit;
    private String strHoraVisit;
    private String billingDayFrom;
    private String billingDayTo;
    private String billingMonthFrom;
    private String billingMonthTo;
    private String billingYearFrom;
    private String billingYearTo;
    private String strEstilo;
    private long lngQtyLogon;
    private long lngQtyVisitOpc;
    private String strCity;
    
    /** Creates a new instance of RECWRF017 */
    public RECWRF017() {

        strCCUST = "";
        strUserWeb = "";
        strOpcionWeb = "";
        strFechaVisit = "";
        strHoraVisit = "";
        billingDayFrom = "";
        billingDayTo = "";
        billingMonthFrom = "";
        billingMonthTo = "";
        billingYearFrom = "";
        billingYearTo = "";
        strEstilo = "";
        lngQtyLogon = 0;
        lngQtyVisitOpc = 0;
        strCity = "";

    }
    
    
    public String getStrCCUST() {
        return this.strCCUST;
    }
    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }
    
    public String getStrUserWeb() {
        return this.strUserWeb;
    }
    public void setStrUserWeb(String strUserWeb) {
        this.strUserWeb = strUserWeb;
    }
    
    
    
    public String getStrOpcionWeb() {
        return this.strOpcionWeb;
    }
    public void setStrOpcionWeb(String strOpcionWeb) {
        this.strOpcionWeb = strOpcionWeb;
    }
    
    
    
    public String getStrFechaVisit() {
        return this.strFechaVisit;
    }
    public void setStrFechaVisit(String strFechaVisit) {
        this.strFechaVisit = strFechaVisit;
    }
    
    
    
    public String getStrHoraVisit() {
        return this.strHoraVisit;
    }
    public void setStrHoraVisit(String strHoraVisit) {
        this.strHoraVisit = strHoraVisit;
    }
    
    
    
    public String getBillingDayFrom() {
        return this.billingDayFrom;
    }
    public void setBillingDayFrom(String billingDayFrom) {
        this.billingDayFrom = billingDayFrom;
    }
    
    
    
    public String getBillingDayTo() {
        return this.billingDayTo;
    }
    public void setBillingDayTo(String billingDayTo) {
        this.billingDayTo = billingDayTo;
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
        
    
    
    public String getStrEstilo() {
        return this.strEstilo;
    }
    public void setStrEstilo(String strEstilo) {
        this.strEstilo = strEstilo;
    }
    
    
    
    
    public long getLngQtyLogon() {
        return this.lngQtyLogon;
    }
    public void setLngQtyLogon(long lngQtyLogon) {
        this.lngQtyLogon = lngQtyLogon;
    }
    
    
    
    public long getLngQtyVisitOpc() {
        return this.lngQtyVisitOpc;
    }
    public void setLngQtyVisitOpc(long lngQtyVisitOpc) {
        this.lngQtyVisitOpc = lngQtyVisitOpc;
    }

    public String getStrCity() {
        return strCity;
    }

    public void setStrCity(String strCity) {
        this.strCity = strCity;
    }
    
    
}
