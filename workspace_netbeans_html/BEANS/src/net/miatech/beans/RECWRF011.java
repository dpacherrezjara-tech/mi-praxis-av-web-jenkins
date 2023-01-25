/*
 * RECWRF011.java
 *
 * Created on 7 de abril de 2008, 12:01 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;


public class RECWRF011 implements Serializable {
    
    private String billingMonthFrom;
    private String billingMonthTo;
    private String billingYearFrom;
    private String billingYearTo;
    private String billingDayFrom;
    private volatile String billingDayTo;
    private String strDATE;
    private String strCCUST;
    private String strGrupo;
    private String strUse;
    private String typeDoc;
    private String strStatus;
    private String invCurrency;
    private String strAirline;
    private long totalInv;
    private long qtyDoc;
    private long qtyDocPhysical;
    private long qtyAudit;
    private long qtyRM;
    private long qtyInvoice;
    private double percReviewed;
    private double percRecovery;
    private double invAmount;
    private double rejectAmount;
    private String timeLimit;   
    private String strInvoice;
    private String strAirlineName; 
    private String strDateEnv;
    private double dblInvGross;
    private double dblInvTax; 
    private double dblInvISC;
    private double dblInvNet;
    private double dblMIAGross;
    private double dblMiaTax;
    private double dblMiaIsc;
    private double dblMiaNet;
    private long qtyIMG;
    private long qtyETKT;
    private volatile String dateClose;
    private String period;
    private double dblAcceptNet;
    private long qtyRMSPA;
    private double valMPA;
    private double valSRP;
    private double valSPA;
    private double valQRMSPA;
    private long valProfitability;
    private long qtySPA;
    private double dblPercG;
    private double dblPercT;
    private double dblPercI;
    private String strTreg;
    private long qtyQSFIM;
    private long LngRM;
    private long LngCpns;
    private double dblPerc;
    private String strFlag;
    private String group;
    //*PARA LOS DATOS DE FACTURA*
    private long adjQtyCoupons;
    private double adjGross;
    private double adjISC;
    private double adjTax;
    private double adjOther;
    private double adjNet;
    private String adjComment01;
    private String adjComment02;
    private boolean adjFlag;
    private String strClearingDate;
    private long qtyRMGross;
    private long qtyRMISC;
    private long qtyRMTax;
    private long qtyOthers;
    private double dblNETM;
    private double dblNUNDER;
    private double dblNOVER;
    private double dblPercNUNDER;
    private double dblPercNOVER;
    private double dblGrossNet;
    private double dblIscNet;
    private double dblTaxNet;
    
    /** Creates a new instance of RECWRF011 */
    public RECWRF011() {

        billingMonthFrom = "";
        billingMonthTo = "";
        billingYearFrom = "";
        billingYearTo = "";
        billingDayFrom = "";
        billingDayTo = "";
        strDATE = "";
        strCCUST = "";
        strGrupo = "";
        strUse = "";
        typeDoc = "";
        strStatus = "";
        invCurrency = "";
        strAirline = "";
        totalInv = 0;
        qtyDoc = 0;
        qtyDocPhysical = 0;
        qtyAudit = 0;
        qtyRM = 0;
        qtyInvoice = 0;
        percReviewed = 0;
        percRecovery = 0;
        invAmount = 0;
        rejectAmount = 0;
        timeLimit = "";
        strInvoice = "";
        strAirlineName = "";
        strDateEnv = "";
        dblInvGross = 0;
        dblInvTax = 0;
        dblInvISC = 0;
        dblInvNet = 0;
        dblMIAGross = 0;
        dblMiaTax = 0;
        dblMiaIsc = 0;
        dblMiaNet = 0;
        qtyIMG = 0;
        qtyETKT = 0;
        dateClose = "";
        period = "";
        dblAcceptNet = 0;
        qtyRMSPA = 0;
        valMPA = 0;
        valSRP = 0;
        valSPA = 0;
        valQRMSPA = 0;
        valProfitability = 0;
        qtySPA = 0;
        dblPercG = 0;
        dblPercT = 0;
        dblPercI = 0;
        strTreg = "";
        qtyQSFIM = 0;
        LngRM = 0;
        LngCpns = 0;
        dblPerc = 0;
        strFlag = "";
        group = "";
        //*PARA LOS DATOS DE FACTURA*
        adjQtyCoupons = 0;
        adjGross = 0;
        adjISC = 0;
        adjTax = 0;
        adjOther = 0;
        adjNet = 0;
        adjComment01 = "";
        adjComment02 = "";
        adjFlag = false;
        strClearingDate = "";
        qtyRMGross = 0;
        qtyRMISC = 0;
        qtyRMTax = 0;
        qtyOthers = 0;
        dblNETM = 0;
        dblNUNDER = 0;
        dblNOVER = 0;
        dblPercNUNDER = 0;
        dblPercNOVER = 0;
        dblGrossNet = 0;
        dblIscNet = 0;
        dblTaxNet = 0;

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
    
    
    public String getStrDATE() {
        return this.strDATE;
    }
    public void setStrDATE(String strDATE) {
        this.strDATE = strDATE;
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
    
    
    public String getTypeDoc() {
        return this.typeDoc;
    }
    public void setTypeDoc(String typeDoc) {
        this.typeDoc = typeDoc;
    }
    
    
    public String getStrStatus() {
        return this.strStatus;
    }
    public void setStrStatus(String strStatus) {
        this.strStatus = strStatus;
    }
    
    
    public String getInvCurrency() {
        return this.invCurrency;
    }
    public void setInvCurrency(String invCurrency) {
        this.invCurrency = invCurrency;
    }
    
       
    public String getStrAirline(){
        return this.strAirline;
    }
    public void setStrAirline(String strAirline) {
        this.strAirline = strAirline;
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
    
    
    public long getQtyDocPhysical() {
        return this.qtyDocPhysical;
    }
    public void setQtyDocPhysical(long qtyDocPhysical) {
        this.qtyDocPhysical = qtyDocPhysical;
    }

    
    public long getQtyAudit() {
        return this.qtyAudit;
    }
    public void setQtyAudit(long qtyAudit) {
        this.qtyAudit = qtyAudit;
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

    
    public double getPercReviewed() {
        return this.percReviewed;
    }
    public void setPercReviewed(double percReviewed) {
        this.percReviewed = percReviewed;
    }
    
    
    public double getPercRecovery() {
        return this.percRecovery;
    }
    public void setPercRecovery(double percRecovery) {
        this.percRecovery = percRecovery;
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

    
    public String getTimeLimit() {
        return this.timeLimit;
    }
    public void setTimeLimit(String timeLimit) {
        this.timeLimit = timeLimit;
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
    
    
    public double getDblInvGross() {
        return this.dblInvGross;
    }
    public void setDblInvGross(double dblInvGross) {
        this.dblInvGross = dblInvGross;
    }
    
    
    public double getDblInvTax() {
        return this.dblInvTax;
    }
    public void setDblInvTax(double dblInvTax) {
        this.dblInvTax = dblInvTax;
    }

    
    public double getDblInvISC() {
        return this.dblInvISC;
    }
    public void setDblInvISC(double dblInvISC) {
        this.dblInvISC = dblInvISC;
    }

    
    public double getDblInvNet() {
        return this.dblInvNet;
    }
    public void setDblInvNet(double dblInvNet) {
        this.dblInvNet = dblInvNet;
    }
   
    
    public double getDblMIAGross() {
        return this.dblMIAGross;
    }
    public void setDblMIAGross(double dblMIAGross) {
        this.dblMIAGross = dblMIAGross;
    }

    
    public double getDblMiaTax() {
        return this.dblMiaTax;
    }
    public void setDblMiaTax(double dblMiaTax) {
        this.dblMiaTax = dblMiaTax;
    }
    
    
    public double getDblMiaIsc() {
        return this.dblMiaIsc;
    }
    public void setDblMiaIsc(double dblMiaIsc) {
        this.dblMiaIsc = dblMiaIsc;
    }

    
    public double getDblMiaNet() {
        return this.dblMiaNet;
    }
    public void setDblMiaNet(double dblMiaNet) {
        this.dblMiaNet = dblMiaNet;
    }
    
    
    public long getQtyIMG() {
        return this.qtyIMG;
    }
    public void setQtyIMG(long qtyIMG) {
        this.qtyIMG = qtyIMG;
    }

    
    public long getQtyETKT() {
        return this.qtyETKT;
    }
    public void setQtyETKT(long qtyETKT) {
        this.qtyETKT = qtyETKT;
    }

    
    public String getDateClose() {
        return this.dateClose;
    }
    public void setDateClose(String dateClose) {
        this.dateClose = dateClose;
    }

    
    public String getPeriod() {
        return this.period;
    }
    public void setPeriod(String period) {
        this.period = period;
    }

    
    public double getDblAcceptNet() {
        return this.dblAcceptNet;
    }
    public void setDblAcceptNet(double dblAcceptNet) {
        this.dblAcceptNet = dblAcceptNet;
    }

    
    public long getQtyRMSPA() {
        return this.qtyRMSPA;
    }
    public void setQtyRMSPA(long qtyRMSPA) {
        this.qtyRMSPA = qtyRMSPA;
    }
    
    
    public double getValMPA() {
        return this.valMPA;
    }
    public void setValMPA(double valMPA) {
        this.valMPA = valMPA;
    }
    
    
    public double getValSRP() {
        return this.valSRP;
    }
    public void setValSRP(double valSRP) {
        this.valSRP = valSRP;
    }
    
    
    public double getValSPA() {
        return this.valSPA;
    }
    public void setValSPA(double valSPA) {
        this.valSPA = valSPA;
    }
      
    
    public double getValQRMSPA() {
        return this.valQRMSPA;
    }
    public void setValQRMSPA(double valQRMSPA) {
        this.valQRMSPA = valQRMSPA;
    }
    
    
    public long getValProfitability() {
        return this.valProfitability;
    }
    public void setValProfitability(long valProfitability) {
        this.valProfitability = valProfitability;
    }

    
    public long getQtySPA() {
        return this.qtySPA;
    }
    public void setQtySPA(long qtySPA) {
        this.qtySPA = qtySPA;
    }
    
    
    public double getDblPercG() {
        return this.dblPercG;
    }
    public void setDblPercG(double dblPercG) {
        this.dblPercG = dblPercG;
    }

    
    public double getDblPercT() {
        return this.dblPercT;
    }
    public void setDblPercT(double dblPercT) {
        this.dblPercT = dblPercT;
    }

    
    public double getDblPercI() {
        return this.dblPercI;
    }
    public void setDblPercI(double dblPercI) {
        this.dblPercI = dblPercI;
    }

    
    public String getStrTreg() {
        return this.strTreg;
    }
    public void setStrTreg(String strTreg) {
        this.strTreg = strTreg;
    }
    
    
    public long getQtyQSFIM() {
        return this.qtyQSFIM;
    }
    public void setQtyQSFIM(long qtyQSFIM) {
        this.qtyQSFIM = qtyQSFIM;
    }
    
    
    public long getLngRM() {
        return this.LngRM;
    }
    public void setLngRM(long LngRM) {
        this.LngRM = LngRM;
    }

    
    public long getLngCpns() {
        return this.LngCpns;
    }
    public void setLngCpns(long LngCpns) {
        this.LngCpns = LngCpns;
    }
    
    
    public double getDblPerc() {
        return this.dblPerc;
    }
    public void setDblPerc(double dblPerc) {
        this.dblPerc = dblPerc;
    }
    
    
    public String getStrFlag() {
        return this.strFlag;
    }
    public void setStrFlag(String strFlag) {
        this.strFlag = strFlag;
    }
    
    
    public String getGroup() {
        return this.group;
    }
    public void setGroup(String group) {
        this.group = group;
    }
    
    
    public long getAdjQtyCoupons() {
        return this.adjQtyCoupons;
    }
    public void setAdjQtyCoupons(long adjQtyCoupons) {
        this.adjQtyCoupons = adjQtyCoupons;
    }

    
    public double getAdjGross() {
        return this.adjGross;
    }
    public void setAdjGross(double adjGross) {
        this.adjGross = adjGross;
    }

    
    public double getAdjISC() {
        return this.adjISC;
    }
    public void setAdjISC(double adjISC) {
        this.adjISC = adjISC;
    }

    
    public double getAdjTax() {
        return this.adjTax;
    }
    public void setAdjTax(double adjTax) {
        this.adjTax = adjTax;
    }

    
    public double getAdjOther() {
        return this.adjOther;
    }
    public void setAdjOther(double adjOther) {
        this.adjOther = adjOther;
    }

    
    public double getAdjNet() {
        return this.adjNet;
    }
    public void setAdjNet(double adjNet) {
        this.adjNet = adjNet;
    }

    
    public String getAdjComment01() {
        return this.adjComment01;
    }
    public void setAdjComment01(String adjComment01) {
        this.adjComment01 = adjComment01;
    }

    
    public String getAdjComment02() {
        return this.adjComment02;
    }
    public void setAdjComment02(String adjComment02) {
        this.adjComment02 = adjComment02;
    }

    
    public boolean isAdjFlag() {
        return this.adjFlag;
    }
    public void setAdjFlag(boolean adjFlag) {
        this.adjFlag = adjFlag;
    }
    
    
    public String getStrClearingDate() {
        return this.strClearingDate;
    }
    public void setStrClearingDate(String strClearingDate) {
        this.strClearingDate = strClearingDate;
    }
    
    
    public long getQtyRMGross() {
        return this.qtyRMGross;
    }
    public void setQtyRMGross(long qtyRMGross) {
        this.qtyRMGross = qtyRMGross;
    }

    
    public long getQtyRMISC() {
        return this.qtyRMISC;
    }
    public void setQtyRMISC(long qtyRMISC) {
        this.qtyRMISC = qtyRMISC;
    }

    
    public long getQtyRMTax() {
        return this.qtyRMTax;
    }
    public void setQtyRMTax(long qtyRMTax) {
        this.qtyRMTax = qtyRMTax;
    }
    
    
    public long getQtyOthers() {
        return this.qtyOthers;
    }
    public void setQtyOthers(long qtyOthers) {
        this.qtyOthers = qtyOthers;
    }
    
    
    public double getDblNETM() {
        return this.dblNETM;
    }
    public void setDblNETM(double dblNETM) {
        this.dblNETM = dblNETM;
    }

    public double getDblNUNDER() {
        return dblNUNDER;
    }

    public void setDblNUNDER(double dblNUNDER) {
        this.dblNUNDER = dblNUNDER;
    }

    public double getDblNOVER() {
        return dblNOVER;
    }

    public void setDblNOVER(double dblNOVER) {
        this.dblNOVER = dblNOVER;
    }

    public double getDblPercNUNDER() {
        return dblPercNUNDER;
    }

    public void setDblPercNUNDER(double dblPercNUNDER) {
        this.dblPercNUNDER = dblPercNUNDER;
    }

    public double getDblPercNOVER() {
        return dblPercNOVER;
    }

    public void setDblPercNOVER(double dblPercNOVER) {
        this.dblPercNOVER = dblPercNOVER;
    }

    public double getDblGrossNet() {
        return dblGrossNet;
    }

    public void setDblGrossNet(double dblGrossNet) {
        this.dblGrossNet = dblGrossNet;
    }

    public double getDblIscNet() {
        return dblIscNet;
    }

    public void setDblIscNet(double dblIscNet) {
        this.dblIscNet = dblIscNet;
    }

    public double getDblTaxNet() {
        return dblTaxNet;
    }

    public void setDblTaxNet(double dblTaxNet) {
        this.dblTaxNet = dblTaxNet;
    }
    
}
