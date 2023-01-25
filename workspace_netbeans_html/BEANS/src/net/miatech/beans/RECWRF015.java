/*
 * RECWRF015.java
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
public class RECWRF015 implements Serializable {
    
    private String strCCUST;
    private String strCCIA;
    private String strGroup;
    private String strStatus;
    private String billingDayFrom;
    private String billingDayTo;
    private String billingMonthFrom;
    private String billingMonthTo;
    private String billingYearFrom;
    private String billingYearTo;
    private String strProced;
    private String strDateStartExec;
    private String strStartTime;
    private String strUserProI;
    private String strDateEndExec;
    private String strEndTime;
    private String strUserP;
    private long lngTRead;
    private long lngTLoad;
    private int intNro;
    private String strMensaje;
    
    /** Creates a new instance of RECWRF015 */
    public RECWRF015() {

        strCCUST = "";
        strCCIA = "";
        strGroup = "";
        strStatus = "";
        billingDayFrom = "";
        billingDayTo = "";
        billingMonthFrom = "";
        billingMonthTo = "";
        billingYearFrom = "";
        billingYearTo = "";
        strProced = "";
        strDateStartExec = "";
        strStartTime = "";
        strUserProI = "";
        strDateEndExec = "";
        strEndTime = "";
        strUserP = "";
        lngTRead = 0;
        lngTLoad = 0;
        intNro = 0;
        strMensaje = "";

    }
    
    
    
    
    public String getStrCCUST() {
        return this.strCCUST;
    }
    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    
    
    public String getStrCCIA() {
        return this.strCCIA;
    }
    public void setStrCCIA(String strCCIA) {
        this.strCCIA = strCCIA;
    }
    
    
    public String getStrGroup() {
        return this.strGroup;
    }
    public void setStrGroup(String strGroup) {
        this.strGroup = strGroup;
    }
    
    
    public String getStrStatus() {
        return this.strStatus;
    }
    public void setStrStatus(String strStatus) {
        this.strStatus = strStatus;
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
    
    
    public String getStrProced() {
        return this.strProced;
    }
    public void setStrProced(String strProced) {
        this.strProced = strProced;
    }
    
    
    
    public String getStrDateStartExec() {
        return this.strDateStartExec;
    }
    public void setStrDateStartExec(String strDateStartExec) {
        this.strDateStartExec = strDateStartExec;
    }
    
    
    public String getStrStartTime() {
        return this.strStartTime;
    }
    public void setStrStartTime(String strStartTime) {
        this.strStartTime = strStartTime;
    }
    
    
    public String getStrUserProI() {
        return this.strUserProI;
    }
    public void setStrUserProI(String strUserProI) {
        this.strUserProI = strUserProI;
    }
    
    
    public String getStrDateEndExec() {
        return this.strDateEndExec;
    }
    public void setStrDateEndExec(String strDateEndExec) {
        this.strDateEndExec = strDateEndExec;
    }
    
    
    public String getStrEndTime() {
        return this.strEndTime;
    }
    public void setStrEndTime(String strEndTime) {
        this.strEndTime = strEndTime;
    }
    
    
    public String getStrUserP() {
        return this.strUserP;
    }
    public void setStrUserP(String strUserP) {
        this.strUserP = strUserP;
    }
    
    
    public long getLngTRead() {
        return this.lngTRead;
    }
    public void setLngTRead(long lngTRead) {
        this.lngTRead = lngTRead;
    }
    
    
    public long getLngTLoad() {
        return this.lngTLoad;
    }
    public void setLngTLoad(long lngTLoad) {
        this.lngTLoad = lngTLoad;
    }
    
    
    public long getIntNro() {
        return this.intNro;
    }
    public void setIntNro(int intNro) {
        this.intNro = intNro;
    }

    /**
     * @return the strMensaje
     */
    public String getStrMensaje() {
        return strMensaje;
    }

    /**
     * @param strMensaje the strMensaje to set
     */
    public void setStrMensaje(String strMensaje) {
        this.strMensaje = strMensaje;
    }
    
    
}
