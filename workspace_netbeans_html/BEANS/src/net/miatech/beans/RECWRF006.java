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
public class RECWRF006 implements Serializable {
    
    private String clearingDate;
    private String strUse;
    private String strAirline;
    private String strPeriod;
    private String typeDoc;
    private long totalInv;
    private long qtyDoc;
    private String billingMonthFrom;
    private String billingMonthTo;
    private String billingYearFrom;
    private String billingYearTo;
    private String strCCUST;
    private long qtyRM;
    private long qtyInvoice;
    private long qtyAudit;
    private double percReviewed;
    private String invCurrency;
    private double invAmount;
    private double rejectAmount;
    private double percRecovery;  
    private String strInvoice;
    private String strAirlineName;
    private String strDateEnv;
    private String timeLimit;
    private String strDATE;
    private long qtyDocPhysical;
    private double dblGross;
    private double dblISC;
    private double dblTAX;
    private long qtyQSFIM;
    private long qtyPendientes;
    private double dblNETIAudit;
    private String strGrupo;
    private long lngEstado01;
    private long lngEstado02;
    private long lngEstado03;
    private long lngEstado04;
    private long lngEstado05;
    private long lngEstado06;
    private long lngEstado07;
    private long lngEstado08;
    private long lngEstado09;
    private long lngEstado10;
    private long totalDocumentos;
    private double dblNETUA;
    private double dblNETMA;
    private long lngQAUDIU;
    private long lngQAUDIM;
    private double dblPorcNETO;
    private double dblPorcNETUA;
    private double dblPorcNETMA;
    private double dblPorcQRM;
    private double dblPorcQAUDIU;
    private double dblPorcQAUDIM;
    private long lngQSOPAUD;
    private long lngQSOPRM;
    private long lngQCORR;
    private String strTipoSIRAX;
    
    /** Creates a new instance of RECWRF006 */
    public RECWRF006() {

        clearingDate = "";
        strUse = "";
        strAirline = "";
        strPeriod = "";
        typeDoc = "";
        totalInv = 0;
        qtyDoc = 0;
        billingMonthFrom = "";
        billingMonthTo = "";
        billingYearFrom = "";
        billingYearTo = "";
        strCCUST = "";
        qtyRM = 0;
        qtyInvoice = 0;
        qtyAudit = 0;
        percReviewed = 0;
        invCurrency = "";
        invAmount = 0;
        rejectAmount = 0;
        percRecovery = 0;
        strInvoice = "";
        strAirlineName = "";
        strDateEnv = "";
        timeLimit = "";
        strDATE = "";
        qtyDocPhysical = 0;
        dblGross = 0;
        dblISC = 0;
        dblTAX = 0;
        qtyQSFIM = 0;
        qtyPendientes = 0;
        dblNETIAudit = 0;
        strGrupo = "";
        lngEstado01 = 0;
        lngEstado02 = 0;
        lngEstado03 = 0;
        lngEstado04 = 0;
        lngEstado05 = 0;
        lngEstado06 = 0;
        lngEstado07 = 0;
        lngEstado08 = 0;
        lngEstado09 = 0;
        lngEstado10 = 0;
        totalDocumentos = 0;
        dblNETUA = 0;
        dblNETMA = 0;
        lngQAUDIU = 0;
        lngQAUDIM = 0;
        dblPorcNETO = 0;
        dblPorcNETUA = 0;
        dblPorcNETMA = 0;
        dblPorcQAUDIU = 0;
        dblPorcQAUDIM = 0;
        dblPorcQRM = 0;
        lngQSOPAUD = 0;
        lngQSOPRM = 0;
        lngQCORR = 0;
        strTipoSIRAX = "";

    }

    
    
    public String getClearingDate() {
        return this.clearingDate;
    }
    public void setClearingDate(String clearingDate) {
        this.clearingDate = clearingDate;
    }

    
    public String getStrUse() {
        return this.strUse;
    }
    public void setStrUse(String strUse) {
        this.strUse = strUse;
    }
    
       
    public String getStrAirline(){
        return this.strAirline;
    }
    public void setStrAirline(String strAirline) {
        this.strAirline = strAirline;
    }

    
    public String getStrPeriod() {
        return this.strPeriod;
    }
    public void setStrPeriod(String strPeriod) {
        this.strPeriod = strPeriod;
    }
    
    
    public String getTypeDoc() {
        return this.typeDoc;
    }
    public void setTypeDoc(String typeDoc) {
        this.typeDoc = typeDoc;
    }

    
    public long getTotalInv() {
        return this.totalInv;
    }
    public void setTotalInv(long totalInv) {
        this.totalInv = totalInv;
    }

    
    public long getQtyDoc() {
        return this.qtyDoc;
    }
    public void setQtyDoc(long qtyDoc) {
        this.qtyDoc = qtyDoc;
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
    
    
    public String getStrCCUST() {
        return this.strCCUST;
    }
    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }
    
    
    public long getQtyRM() {
        return this.qtyRM;
    }
    public void setQtyRM(long qtyRM) {
        this.qtyRM = qtyRM;
    }

    
    public long getQtyInvoice() {
        return this.qtyInvoice;
    }
    public void setQtyInvoice(long qtyInvoice) {
        this.qtyInvoice = qtyInvoice;
    }
   

    
    public long getQtyAudit() {
        return this.qtyAudit;
    }
    public void setQtyAudit(long qtyAudit) {
        this.qtyAudit = qtyAudit;
    }

    
    public double getPercReviewed() {
        return this.percReviewed;
    }
    public void setPercReviewed(double percReviewed) {
        this.percReviewed = percReviewed;
    }

    
    public String getInvCurrency() {
        return this.invCurrency;
    }
    public void setInvCurrency(String invCurrency) {
        this.invCurrency = invCurrency;
    }

    
    public double getInvAmount() {
        return this.invAmount;
    }
    public void setInvAmount(double invAmount) {
        this.invAmount = invAmount;
    }

    
    public double getRejectAmount() {
        return this.rejectAmount;
    }
    public void setRejectAmount(double rejectAmount) {
        this.rejectAmount = rejectAmount;
    }

    
    public double getPercRecovery() {
        return this.percRecovery;
    }
    public void setPercRecovery(double percRecovery) {
        this.percRecovery = percRecovery;
    }
    
    
    public String getStrInvoice() {
        return this.strInvoice;
    }
    public void setStrInvoice(String strInvoice) {
        this.strInvoice = strInvoice;
    }
    
    
    public String getStrAirlineName() {
        return this.strAirlineName;
    }
    public void setStrAirlineName(String strAirlineName) {
        this.strAirlineName = strAirlineName;
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
    
    
    public String getStrDATE() {
        return this.strDATE;
    }
    public void setStrDATE(String strDATE) {
        this.strDATE = strDATE;
    }
    
    
    public long getQtyDocPhysical() {
        return this.qtyDocPhysical;
    }
    public void setQtyDocPhysical(long qtyDocPhysical) {
        this.qtyDocPhysical = qtyDocPhysical;
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
    
    
    public double getDblTAX(){
        return this.dblTAX;
    }
    public void setDblTAX(double dblTAX) {
        this.dblTAX = dblTAX;
    }
    
    
    public long getQtyQSFIM() {
        return this.qtyQSFIM;
    }
    public void setQtyQSFIM(long qtyQSFIM) {
        this.qtyQSFIM = qtyQSFIM;
    }

    
    public long getQtyPendientes() {
        return this.qtyPendientes;
    }
    public void setQtyPendientes(long qtyPendientes) {
        this.qtyPendientes = qtyPendientes;
    }
    
    
    public double getDblNETIAudit() {
        return this.dblNETIAudit;
    }
    public void setDblNETIAudit(double dblNETIAudit) {
        this.dblNETIAudit = dblNETIAudit;
    }
    
    
    public String getStrGrupo() {
        return this.strGrupo;
    }
    public void setStrGrupo(String strGrupo) {
        this.strGrupo = strGrupo;
    }
    
    
    public long getLngEstado01() {
        return this.lngEstado01;
    }
    public void setLngEstado01(long lngEstado01) {
        this.lngEstado01 = lngEstado01;
    }
    
    
    public long getLngEstado02() {
        return this.lngEstado02;
    }
    public void setLngEstado02(long lngEstado02) {
        this.lngEstado02 = lngEstado02;
    }
    
    
    public long getLngEstado03() {
        return this.lngEstado03;
    }
    public void setLngEstado03(long lngEstado03) {
        this.lngEstado03 = lngEstado03;
    }
    
    
    public long getLngEstado04() {
        return this.lngEstado04;
    }
    public void setLngEstado04(long lngEstado04) {
        this.lngEstado04 = lngEstado04;
    }
    
    
    public long getLngEstado05() {
        return this.lngEstado05;
    }
    public void setLngEstado05(long lngEstado05) {
        this.lngEstado05 = lngEstado05;
    }
    
    
    public long getLngEstado06() {
        return this.lngEstado06;
    }
    public void setLngEstado06(long lngEstado06) {
        this.lngEstado06 = lngEstado06;
    }
    
    
    public long getLngEstado07() {
        return this.lngEstado07;
    }
    public void setLngEstado07(long lngEstado07) {
        this.lngEstado07 = lngEstado07;
    }
    
    
    public long getLngEstado08() {
        return this.lngEstado08;
    }
    public void setLngEstado08(long lngEstado08) {
        this.lngEstado08 = lngEstado08;
    }
    
    
    public long getLngEstado09() {
        return this.lngEstado09;
    }
    public void setLngEstado09(long lngEstado09) {
        this.lngEstado09 = lngEstado09;
    }
    
    
    public long getLngEstado10() {
        return this.lngEstado10;
    }
    public void setLngEstado10(long lngEstado10) {
        this.lngEstado10 = lngEstado10;
    }
    
    
    public long getTotalDocumentos() {
        return this.totalDocumentos;
    }
    public void setTotalDocumentos(long totalDocumentos) {
        this.totalDocumentos = totalDocumentos;
    }

    public double getDblNETUA() {
        return dblNETUA;
    }

    public void setDblNETUA(double dblNETUA) {
        this.dblNETUA = dblNETUA;
    }

    public double getDblNETMA() {
        return dblNETMA;
    }

    public void setDblNETMA(double dblNETMA) {
        this.dblNETMA = dblNETMA;
    }

    public long getLngQAUDIU() {
        return lngQAUDIU;
    }

    public void setLngQAUDIU(long lngQAUDIU) {
        this.lngQAUDIU = lngQAUDIU;
    }

    public long getLngQAUDIM() {
        return lngQAUDIM;
    }

    public void setLngQAUDIM(long lngQAUDIM) {
        this.lngQAUDIM = lngQAUDIM;
    }

    public double getDblPorcNETUA() {
        return dblPorcNETUA;
    }

    public void setDblPorcNETUA(double dblPorcNETUA) {
        this.dblPorcNETUA = dblPorcNETUA;
    }

    public double getDblPorcNETMA() {
        return dblPorcNETMA;
    }

    public void setDblPorcNETMA(double dblPorcNETMA) {
        this.dblPorcNETMA = dblPorcNETMA;
    }

    public double getDblPorcQAUDIU() {
        return dblPorcQAUDIU;
    }

    public void setDblPorcQAUDIU(double dblPorcQAUDIU) {
        this.dblPorcQAUDIU = dblPorcQAUDIU;
    }

    public double getDblPorcQAUDIM() {
        return dblPorcQAUDIM;
    }

    public void setDblPorcQAUDIM(double dblPorcQAUDIM) {
        this.dblPorcQAUDIM = dblPorcQAUDIM;
    }

    public double getDblPorcNETO() {
        return dblPorcNETO;
    }

    public void setDblPorcNETO(double dblPorcNETO) {
        this.dblPorcNETO = dblPorcNETO;
    }

    public double getDblPorcQRM() {
        return dblPorcQRM;
    }

    public void setDblPorcQRM(double dblPorcQRM) {
        this.dblPorcQRM = dblPorcQRM;
    }

    public long getLngQSOPAUD() {
        return lngQSOPAUD;
    }

    public void setLngQSOPAUD(long lngQSOPAUD) {
        this.lngQSOPAUD = lngQSOPAUD;
    }

    public long getLngQSOPRM() {
        return lngQSOPRM;
    }

    public void setLngQSOPRM(long lngQSOPRM) {
        this.lngQSOPRM = lngQSOPRM;
    }

    public long getLngQCORR() {
        return lngQCORR;
    }

    public void setLngQCORR(long lngQCORR) {
        this.lngQCORR = lngQCORR;
    }

    /**
     * @return the strTipoSIRAX
     */
    public String getStrTipoSIRAX() {
        return strTipoSIRAX;
    }

    /**
     * @param strTipoSIRAX the strTipoSIRAX to set
     */
    public void setStrTipoSIRAX(String strTipoSIRAX) {
        this.strTipoSIRAX = strTipoSIRAX;
    }
    
}
