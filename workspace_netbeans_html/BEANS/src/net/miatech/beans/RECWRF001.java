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
public class RECWRF001 implements Serializable {

    private String billingMonthFrom;
    private String typeDoc;
    private long totalInv;
    private long qtyDoc;
    private long qtyDocPhysical;
    private long qtyAudit;
    private double percReviewed;
    private String invCurrency;
    private double invAmount;
    private double rejectAmount;
    private double percRecovery;
    private String timeLimit;
    private String billingMonthTo;
    private String billingYearFrom;
    private String billingYearTo;
    private String strUse;
    private String strAirline;
    private String strStatus;
    private String strCCUST;
    private String strDATE;
    private long qtyRM;
    private long qtyInvoice;
    private String strInvoice;
    private String strAirlineName;
    private String strDateEnv;
    private double dblInvGross;
    private double dblInvTax;
    private double dblInvISC;
    private double dblInvNet;
    private long LngRM;
    private long LngCpns;
    private double dblMIAGross;
    private double dblMiaTax;
    private double dblMiaIsc;
    private double dblMiaNet;
    private double dblPerc;
    private double dblPercG;
    private double dblPercT;
    private double dblPercI;
    private String strTreg;
    private long qtyIMG;
    private long qtyETKT;
    private String billingDayFrom;
    private volatile String billingDayTo;
    private volatile String dateClose;
    private String period;
    private String group;
    private String paidCurrency;
    private String strClearingDate;
    private double dblAcceptNet;
    private long qtyRMGross;
    private long qtyRMISC;
    private long qtyRMTax;
    private long adjQtyCoupons;
    private double adjGross;
    private double adjISC;
    private double adjTax;
    private double adjOther;
    private double adjNet;
    private String adjComment01;
    private String adjComment02;
    private boolean adjFlag;
    private String codeRM;
    private String path;
    private long qtyRMSPA;
    private double valMPA;
    private double valSRP;
    private double valSPA;
    private String strTypeValue;
    private double valQRMSPA;
    private long valProfitability;
    private long qtySPA;
    private long qtyQSFIM;
    private long qtyOthers;
    private long qtyQCGROSS;
    private long qtyQCISC;
    private long qtyQCTAX;
    private String strFlag;
    private String strDateAudit;
    private String strUserAuditAsignado;
    private long lngQtyAutomat;
    private String strHoraIni;
    private String strHoraFin;
    private long lngUniversoAuditados;
    private double percReviewedAmt;
    private double percRecoveryAmt;
    private String strFechaIni;
    private String strFechaFin;
    private String strDateEnvCadena;
    private String strInvAmount;
    private String strRejectAmount;
    private long lngQtyUnder;
    private long lngQtyAudManual;
    private long lngQtyPending;
    private String strAerolineaIA;
    private String strAuditados1;
    private String strRechazados1;
    private String strAuditados2;
    private String strRechazados2;
    private String strAuditados3;
    private String strRechazados3;
    private String strAuditados4;
    private String strRechazados4;
    private String strAuditados5;
    private String strRechazados5;
    private String strAuditados6;
    private String strRechazados6;
    private String strInvCouponsIA;
    private String strAuditCouponsIA;
    private String strPercentRevIA;
    private String strRejectCouponsIA;
    private String strCupones1;
    private String strCupones2;
    private String strCupones3;
    private String strCupones4;
    private String strCupones5;
    private int intRank;
    private String strDateCAD;
    private String strQtyDocCAD;
    private String strQtyAuditCAD;
    private String strQtyRMCAD;
    private String strPercReviewed;
    private String strInvAmountCAD;
    private String strRejectAmountCAD;
    private String strPercRecoveryCAD;
    private String strQtyQSFIMCAD;
    private double dblGrossNeto;
    private double dblIscNeto;
    private double dblTaxNeto;
    private double dblRejectedAmt;
    private double dblPercGrossN;
    private double dblPercIscN;
    private double dblPercTaxN;
    private String strDateOption;
    private String strCIA;
    private String strForma;
    private String strSerie;
    private String strCupon;
    private boolean flagHold;
    private String strFMethod;
    private long lngQSOPAUD;
    private long lngQSOPRM;
    private long lngQCORR;
    private String strNAID;
    private String strNROPRE;
    private String strDREF;
    private String strSGUIA;
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strFSUPU;
    private String strAIRLINS;
    private String strAIRLINR;
    private String strTipoSIRAX;
    private String strGroupBy;
    private double dblTotICH;
    private double dblTotIDEC;
    private String strCountry;
    private String strCity;
    private String strAgente;
    //Monto Neto para TDOC = 1
    private double dblNetoDoc1;
    //Monto Neto para TDOC = 4
    private double dblNetoDoc4;

    public RECWRF001() {

        billingMonthFrom = "";
        typeDoc = "";
        totalInv = 0;
        qtyDoc = 0;
        qtyDocPhysical = 0;
        qtyAudit = 0;
        percReviewed = 0;
        invCurrency = "";
        invAmount = 0;
        rejectAmount = 0;
        percRecovery = 0;
        timeLimit = "";
        billingMonthTo = "";
        billingYearFrom = "";
        billingYearTo = "";
        strUse = "";
        strAirline = "";
        strStatus = "";
        strCCUST = "";
        strDATE = "";
        qtyRM = 0;
        qtyInvoice = 0;
        strInvoice = "";
        strAirlineName = "";
        strDateEnv = "";
        dblInvGross = 0;
        dblInvTax = 0;
        dblInvISC = 0;
        dblInvNet = 0;
        LngRM = 0;
        LngCpns = 0;
        dblMIAGross = 0;
        dblMiaTax = 0;
        dblMiaIsc = 0;
        dblMiaNet = 0;
        dblPerc = 0;
        dblPercG = 0;
        dblPercT = 0;
        dblPercI = 0;
        strTreg = "";
        qtyIMG = 0;
        qtyETKT = 0;
        billingDayFrom = "";
        billingDayTo = "";
        dateClose = "";
        period = "";
        group = "";
        paidCurrency = "";
        strClearingDate = "";
        dblAcceptNet = 0;
        qtyRMGross = 0;
        qtyRMISC = 0;
        qtyRMTax = 0;
        adjQtyCoupons = 0;
        adjGross = 0;
        adjISC = 0;
        adjTax = 0;
        adjOther = 0;
        adjNet = 0;
        adjComment01 = "";
        adjComment02 = "";
        adjFlag = false;
        codeRM = "";
        path = "";
        qtyRMSPA = 0;
        valMPA = 0;
        valSRP = 0;
        valSPA = 0;
        strTypeValue = "";
        valQRMSPA = 0;
        valProfitability = 0;
        qtySPA = 0;
        qtyQSFIM = 0;
        qtyOthers = 0;
        qtyQCGROSS = 0;
        qtyQCISC = 0;
        qtyQCTAX = 0;
        strFlag = "";
        strDateAudit = "";
        strUserAuditAsignado = "";
        lngQtyAutomat = 0;
        strHoraIni = "";
        strHoraFin = "";
        lngUniversoAuditados = 0;
        percReviewedAmt = 0;
        percRecoveryAmt = 0;
        strFechaIni = "";
        strFechaFin = "";
        strDateEnvCadena = "";
        strInvAmount = "";
        strRejectAmount = "";
        lngQtyUnder = 0;
        lngQtyAudManual = 0;
        lngQtyPending = 0;
        strAerolineaIA = "";
        strAuditados1 = "";
        strRechazados1 = "";
        strAuditados2 = "";
        strRechazados2 = "";
        strAuditados3 = "";
        strRechazados3 = "";
        strAuditados4 = "";
        strRechazados4 = "";
        strAuditados5 = "";
        strRechazados5 = "";
        strAuditados6 = "";
        strRechazados6 = "";
        strInvCouponsIA = "";
        strAuditCouponsIA = "";
        strPercentRevIA = "";
        strRejectCouponsIA = "";
        strCupones1 = "";
        strCupones2 = "";
        strCupones3 = "";
        strCupones4 = "";
        strCupones5 = "";
        intRank = 0;
        strDateCAD = "";
        strQtyDocCAD = "";
        strQtyAuditCAD = "";
        strQtyRMCAD = "";
        strPercReviewed = "";
        strInvAmountCAD = "";
        strRejectAmountCAD = "";
        strPercRecoveryCAD = "";
        strQtyQSFIMCAD = "";
        dblGrossNeto = 0;
        dblIscNeto = 0;
        dblTaxNeto = 0;
        dblRejectedAmt = 0;
        dblPercGrossN = 0;
        dblPercIscN = 0;
        dblPercTaxN = 0;
        strDateOption = "";
        strCIA = "";
        strForma = "";
        strSerie = "";
        strCupon = "";
        flagHold = false;
        strFMethod = "";
        lngQSOPAUD = 0;
        lngQSOPRM = 0;
        lngQCORR = 0;
        strNAID = "";
        strNROPRE = "";
        strDREF = "";
        strSGUIA = "";
        strUSCR = "";
        strFECR = "";
        strHOCR = "";
        strFSUPU = "";
        strAIRLINS = "";
        strAIRLINR = "";
        strTipoSIRAX = "";
        strGroupBy = "";
        dblTotICH = 0;
        dblTotIDEC = 0;
        strCountry = "";
        strCity = "";
        strAgente = "";
        dblNetoDoc1 = 0;
        dblNetoDoc4 = 0;

    }

    public String getBillingMonthFrom() {
        return this.billingMonthFrom;
    }

    public void setBillingMonthFrom(String billingMonthFrom) {
        this.billingMonthFrom = billingMonthFrom;
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

    public String getTimeLimit() {
        return this.timeLimit;
    }

    public void setTimeLimit(String timeLimit) {
        this.timeLimit = timeLimit;
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

    public String getStrUse() {
        return this.strUse;
    }

    public void setStrUse(String strUse) {
        this.strUse = strUse;
    }

    public String getStrAirline() {
        return this.strAirline;
    }

    public void setStrAirline(String strAirline) {
        this.strAirline = strAirline;
    }

    public String getStrStatus() {
        return this.strStatus;
    }

    public void setStrStatus(String strStatus) {
        this.strStatus = strStatus;
    }

    public String getStrCCUST() {
        return this.strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public String getStrDATE() {
        return this.strDATE;
    }

    public void setStrDATE(String strDATE) {
        this.strDATE = strDATE;
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

    public double getDblPerc() {
        return this.dblPerc;
    }

    public void setDblPerc(double dblPerc) {
        this.dblPerc = dblPerc;
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

    public String getGroup() {
        return this.group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getPaidCurrency() {
        return this.paidCurrency;
    }

    public void setPaidCurrency(String paidCurrency) {
        this.paidCurrency = paidCurrency;
    }

    public String getStrClearingDate() {
        return this.strClearingDate;
    }

    public void setStrClearingDate(String strClearingDate) {
        this.strClearingDate = strClearingDate;
    }

    public double getDblAcceptNet() {
        return this.dblAcceptNet;
    }

    public void setDblAcceptNet(double dblAcceptNet) {
        this.dblAcceptNet = dblAcceptNet;
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

    public String getCodeRM() {
        return this.codeRM;
    }

    public void setCodeRM(String codeRM) {
        this.codeRM = codeRM;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath(String path) {
        this.path = path;
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

    public String getStrTypeValue() {
        return this.strTypeValue;
    }

    public void setStrTypeValue(String strTypeValue) {
        this.strTypeValue = strTypeValue;
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

    public long getQtyQSFIM() {
        return this.qtyQSFIM;
    }

    public void setQtyQSFIM(long qtyQSFIM) {
        this.qtyQSFIM = qtyQSFIM;
    }

    public long getQtyOthers() {
        return this.qtyOthers;
    }

    public void setQtyOthers(long qtyOthers) {
        this.qtyOthers = qtyOthers;
    }

    public long getQtyQCGROSS() {
        return this.qtyQCGROSS;
    }

    public void setQtyQCGROSS(long qtyQCGROSS) {
        this.qtyQCGROSS = qtyQCGROSS;
    }

    public long getQtyQCISC() {
        return this.qtyQCISC;
    }

    public void setQtyQCISC(long qtyQCISC) {
        this.qtyQCISC = qtyQCISC;
    }

    public long getQtyQCTAX() {
        return this.qtyQCTAX;
    }

    public void setQtyQCTAX(long qtyQCTAX) {
        this.qtyQCTAX = qtyQCTAX;
    }

    public String getStrFlag() {
        return this.strFlag;
    }

    public void setStrFlag(String strFlag) {
        this.strFlag = strFlag;
    }

    public String getStrDateAudit() {
        return this.strDateAudit;
    }

    public void setStrDateAudit(String strDateAudit) {
        this.strDateAudit = strDateAudit;
    }

    public String getStrUserAuditAsignado() {
        return this.strUserAuditAsignado;
    }

    public void setStrUserAuditAsignado(String strUserAuditAsignado) {
        this.strUserAuditAsignado = strUserAuditAsignado;
    }

    public long getLngQtyAutomat() {
        return this.lngQtyAutomat;
    }

    public void setLngQtyAutomat(long lngQtyAutomat) {
        this.lngQtyAutomat = lngQtyAutomat;
    }

    public String getStrHoraIni() {
        return this.strHoraIni;
    }

    public void setStrHoraIni(String strHoraIni) {
        this.strHoraIni = strHoraIni;
    }

    public String getStrHoraFin() {
        return this.strHoraFin;
    }

    public void setStrHoraFin(String strHoraFin) {
        this.strHoraFin = strHoraFin;
    }

    public long getLngUniversoAuditados() {
        return this.lngUniversoAuditados;
    }

    public void setLngUniversoAuditados(long lngUniversoAuditados) {
        this.lngUniversoAuditados = lngUniversoAuditados;
    }

    public double getPercReviewedAmt() {
        return this.percReviewedAmt;
    }

    public void setPercReviewedAmt(double percReviewedAmt) {
        this.percReviewedAmt = percReviewedAmt;
    }

    public double getPercRecoveryAmt() {
        return this.percRecoveryAmt;
    }

    public void setPercRecoveryAmt(double percRecoveryAmt) {
        this.percRecoveryAmt = percRecoveryAmt;
    }

    //**************************************************************************
    //*************** Datos del A1176H (Auditores Tax) *************************
    public String getStrFechaIni() {
        return this.strFechaIni;
    }

    public void setStrFechaIni(String strFechaIni) {
        this.strFechaIni = strFechaIni;
    }

    public String getStrFechaFin() {
        return this.strFechaFin;
    }

    public void setStrFechaFin(String strFechaFin) {
        this.strFechaFin = strFechaFin;
    }

    //**** Para el Display Tag (Paginacion) *************
    public String getStrDateEnvCadena() {
        return this.strDateEnvCadena;
    }

    public void setStrDateEnvCadena(String strDateEnvCadena) {
        this.strDateEnvCadena = strDateEnvCadena;
    }

    public String getStrInvAmount() {
        return this.strInvAmount;
    }

    public void setStrInvAmount(String strInvAmount) {
        this.strInvAmount = strInvAmount;
    }

    public String getStrRejectAmount() {
        return this.strRejectAmount;
    }

    public void setStrRejectAmount(String strRejectAmount) {
        this.strRejectAmount = strRejectAmount;
    }

    //**************************************************************    
    public long getLngQtyUnder() {
        return this.lngQtyUnder;
    }

    public void setLngQtyUnder(long lngQtyUnder) {
        this.lngQtyUnder = lngQtyUnder;
    }

    public long getLngQtyAudManual() {
        return this.lngQtyAudManual;
    }

    public void setLngQtyAudManual(long lngQtyAudManual) {
        this.lngQtyAudManual = lngQtyAudManual;
    }

    public long getLngQtyPending() {
        return this.lngQtyPending;
    }

    public void setLngQtyPending(long lngQtyPending) {
        this.lngQtyPending = lngQtyPending;
    }

    /*********************[ InvoiceVSAirline ]****************************/
    public String getStrAerolineaIA() {
        return this.strAerolineaIA;
    }

    public void setStrAerolineaIA(String strAerolineaIA) {
        this.strAerolineaIA = strAerolineaIA;
    }

    public String getStrAuditados1() {
        return this.strAuditados1;
    }

    public void setStrAuditados1(String strAuditados1) {
        this.strAuditados1 = strAuditados1;
    }

    public String getStrRechazados1() {
        return this.strRechazados1;
    }

    public void setStrRechazados1(String strRechazados1) {
        this.strRechazados1 = strRechazados1;
    }

    public String getStrAuditados2() {
        return this.strAuditados2;
    }

    public void setStrAuditados2(String strAuditados2) {
        this.strAuditados2 = strAuditados2;
    }

    public String getStrRechazados2() {
        return this.strRechazados2;
    }

    public void setStrRechazados2(String strRechazados2) {
        this.strRechazados2 = strRechazados2;
    }

    public String getStrAuditados3() {
        return this.strAuditados3;
    }

    public void setStrAuditados3(String strAuditados3) {
        this.strAuditados3 = strAuditados3;
    }

    public String getStrRechazados3() {
        return this.strRechazados3;
    }

    public void setStrRechazados3(String strRechazados3) {
        this.strRechazados3 = strRechazados3;
    }

    public String getStrAuditados4() {
        return this.strAuditados4;
    }

    public void setStrAuditados4(String strAuditados4) {
        this.strAuditados4 = strAuditados4;
    }

    public String getStrRechazados4() {
        return this.strRechazados4;
    }

    public void setStrRechazados4(String strRechazados4) {
        this.strRechazados4 = strRechazados4;
    }

    public String getStrAuditados5() {
        return this.strAuditados5;
    }

    public void setStrAuditados5(String strAuditados5) {
        this.strAuditados5 = strAuditados5;
    }

    public String getStrRechazados5() {
        return this.strRechazados5;
    }

    public void setStrRechazados5(String strRechazados5) {
        this.strRechazados5 = strRechazados5;
    }

    public String getStrAuditados6() {
        return this.strAuditados6;
    }

    public void setStrAuditados6(String strAuditados6) {
        this.strAuditados6 = strAuditados6;
    }

    public String getStrRechazados6() {
        return this.strRechazados6;
    }

    public void setStrRechazados6(String strRechazados6) {
        this.strRechazados6 = strRechazados6;
    }

    public String getStrInvCouponsIA() {
        return this.strInvCouponsIA;
    }

    public void setStrInvCouponsIA(String strInvCouponsIA) {
        this.strInvCouponsIA = strInvCouponsIA;
    }

    public String getStrAuditCouponsIA() {
        return this.strAuditCouponsIA;
    }

    public void setStrAuditCouponsIA(String strAuditCouponsIA) {
        this.strAuditCouponsIA = strAuditCouponsIA;
    }

    public String getStrPercentRevIA() {
        return this.strPercentRevIA;
    }

    public void setStrPercentRevIA(String strPercentRevIA) {
        this.strPercentRevIA = strPercentRevIA;
    }

    public String getStrRejectCouponsIA() {
        return this.strRejectCouponsIA;
    }

    public void setStrRejectCouponsIA(String strRejectCouponsIA) {
        this.strRejectCouponsIA = strRejectCouponsIA;
    }

    public String getStrCupones1() {
        return this.strCupones1;
    }

    public void setStrCupones1(String strCupones1) {
        this.strCupones1 = strCupones1;
    }

    public String getStrCupones2() {
        return this.strCupones2;
    }

    public void setStrCupones2(String strCupones2) {
        this.strCupones2 = strCupones2;
    }

    public String getStrCupones3() {
        return this.strCupones3;
    }

    public void setStrCupones3(String strCupones3) {
        this.strCupones3 = strCupones3;
    }

    public String getStrCupones4() {
        return this.strCupones4;
    }

    public void setStrCupones4(String strCupones4) {
        this.strCupones4 = strCupones4;
    }

    public String getStrCupones5() {
        return this.strCupones5;
    }

    public void setStrCupones5(String strCupones5) {
        this.strCupones5 = strCupones5;
    }

    /**********************************************************************/
    public int getIntRank() {
        return this.intRank;
    }

    public void setIntRank(int intRank) {
        this.intRank = intRank;
    }

    public String getStrDateCAD() {
        return this.strDateCAD;
    }

    public void setStrDateCAD(String strDateCAD) {
        this.strDateCAD = strDateCAD;
    }

    public String getStrQtyDocCAD() {
        return this.strQtyDocCAD;
    }

    public void setStrQtyDocCAD(String strQtyDocCAD) {
        this.strQtyDocCAD = strQtyDocCAD;
    }

    public String getStrQtyAuditCAD() {
        return this.strQtyAuditCAD;
    }

    public void setStrQtyAuditCAD(String strQtyAuditCAD) {
        this.strQtyAuditCAD = strQtyAuditCAD;
    }

    public String getStrQtyRMCAD() {
        return this.strQtyRMCAD;
    }

    public void setStrQtyRMCAD(String strQtyRMCAD) {
        this.strQtyRMCAD = strQtyRMCAD;
    }

    public String getStrPercReviewed() {
        return this.strPercReviewed;
    }

    public void setStrPercReviewed(String strPercReviewed) {
        this.strPercReviewed = strPercReviewed;
    }

    public String getStrInvAmountCAD() {
        return this.strInvAmountCAD;
    }

    public void setStrInvAmountCAD(String strInvAmountCAD) {
        this.strInvAmountCAD = strInvAmountCAD;
    }

    public String getStrRejectAmountCAD() {
        return this.strRejectAmountCAD;
    }

    public void setStrRejectAmountCAD(String strRejectAmountCAD) {
        this.strRejectAmountCAD = strRejectAmountCAD;
    }

    public String getStrPercRecoveryCAD() {
        return this.strPercRecoveryCAD;
    }

    public void setStrPercRecoveryCAD(String strPercRecoveryCAD) {
        this.strPercRecoveryCAD = strPercRecoveryCAD;
    }

    public String getStrQtyQSFIMCAD() {
        return this.strQtyQSFIMCAD;
    }

    public void setStrQtyQSFIMCAD(String strQtyQSFIMCAD) {
        this.strQtyQSFIMCAD = strQtyQSFIMCAD;
    }

    public double getDblGrossNeto() {
        return this.dblGrossNeto;
    }

    public void setDblGrossNeto(double dblGrossNeto) {
        this.dblGrossNeto = dblGrossNeto;
    }

    public double getDblIscNeto() {
        return this.dblIscNeto;
    }

    public void setDblIscNeto(double dblIscNeto) {
        this.dblIscNeto = dblIscNeto;
    }

    public double getDblTaxNeto() {
        return this.dblTaxNeto;
    }

    public void setDblTaxNeto(double dblTaxNeto) {
        this.dblTaxNeto = dblTaxNeto;
    }

    public double getDblRejectedAmt() {
        return this.dblRejectedAmt;
    }

    public void setDblRejectedAmt(double dblRejectedAmt) {
        this.dblRejectedAmt = dblRejectedAmt;
    }

    public double getDblPercGrossN() {
        return this.dblPercGrossN;
    }

    public void setDblPercGrossN(double dblPercGrossN) {
        this.dblPercGrossN = dblPercGrossN;
    }

    public double getDblPercIscN() {
        return this.dblPercIscN;
    }

    public void setDblPercIscN(double dblPercIscN) {
        this.dblPercIscN = dblPercIscN;
    }

    public double getDblPercTaxN() {
        return this.dblPercTaxN;
    }

    public void setDblPercTaxN(double dblPercTaxN) {
        this.dblPercTaxN = dblPercTaxN;
    }

    public String getStrDateOption() {
        return this.strDateOption;
    }

    public void setStrDateOption(String strDateOption) {
        this.strDateOption = strDateOption;
    }

    public String getStrCIA() {
        return this.strCIA;
    }

    public void setStrCIA(String strCIA) {
        this.strCIA = strCIA;
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

    public String getStrCupon() {
        return this.strCupon;
    }

    public void setStrCupon(String strCupon) {
        this.strCupon = strCupon;
    }

    public boolean getFlagHold() {
        return this.flagHold;
    }

    public void setFlagHold(boolean flagHold) {
        this.flagHold = flagHold;
    }

    public String getStrFMethod() {
        return this.strFMethod;
    }

    public void setStrFMethod(String strFMethod) {
        this.strFMethod = strFMethod;
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

    public String getStrNAID() {
        return strNAID;
    }

    public void setStrNAID(String strNAID) {
        this.strNAID = strNAID;
    }

    public String getStrNROPRE() {
        return strNROPRE;
    }

    public void setStrNROPRE(String strNROPRE) {
        this.strNROPRE = strNROPRE;
    }

    public String getStrDREF() {
        return strDREF;
    }

    public void setStrDREF(String strDREF) {
        this.strDREF = strDREF;
    }

    public String getStrSGUIA() {
        return strSGUIA;
    }

    public void setStrSGUIA(String strSGUIA) {
        this.strSGUIA = strSGUIA;
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

    public String getStrFSUPU() {
        return strFSUPU;
    }

    public void setStrFSUPU(String strFSUPU) {
        this.strFSUPU = strFSUPU;
    }

    public String getStrAIRLINS() {
        return strAIRLINS;
    }

    public void setStrAIRLINS(String strAIRLINS) {
        this.strAIRLINS = strAIRLINS;
    }

    public String getStrAIRLINR() {
        return strAIRLINR;
    }

    public void setStrAIRLINR(String strAIRLINR) {
        this.strAIRLINR = strAIRLINR;
    }

    public String getStrTipoSIRAX() {
        return strTipoSIRAX;
    }

    public void setStrTipoSIRAX(String strTipoSIRAX) {
        this.strTipoSIRAX = strTipoSIRAX;
    }

    /**
     * @return the strGroupBy
     */
    public String getStrGroupBy() {
        return strGroupBy;
    }

    /**
     * @param strGroupBy the strGroupBy to set
     */
    public void setStrGroupBy(String strGroupBy) {
        this.strGroupBy = strGroupBy;
    }

    /**
     * @return the dblTotICH
     */
    public double getDblTotICH() {
        return dblTotICH;
    }

    /**
     * @param dblTotICH the dblTotICH to set
     */
    public void setDblTotICH(double dblTotICH) {
        this.dblTotICH = dblTotICH;
    }

    /**
     * @return the dblTotIDEC
     */
    public double getDblTotIDEC() {
        return dblTotIDEC;
    }

    /**
     * @param dblTotIDEC the dblTotIDEC to set
     */
    public void setDblTotIDEC(double dblTotIDEC) {
        this.dblTotIDEC = dblTotIDEC;
    }

    /**
     * @return the strCountry
     */
    public String getStrCountry() {
        return strCountry;
    }

    /**
     * @param strCountry the strCountry to set
     */
    public void setStrCountry(String strCountry) {
        this.strCountry = strCountry;
    }

    /**
     * @return the strCity
     */
    public String getStrCity() {
        return strCity;
    }

    /**
     * @param strCity the strCity to set
     */
    public void setStrCity(String strCity) {
        this.strCity = strCity;
    }

    /**
     * @return the strAgente
     */
    public String getStrAgente() {
        return strAgente;
    }

    /**
     * @param strAgente the strAgente to set
     */
    public void setStrAgente(String strAgente) {
        this.strAgente = strAgente;
    }

    /**
     * @return the dblNetoDoc1
     */
    public double getDblNetoDoc1() {
        return dblNetoDoc1;
    }

    /**
     * @param dblNetoDoc1 the dblNetoDoc1 to set
     */
    public void setDblNetoDoc1(double dblNetoDoc1) {
        this.dblNetoDoc1 = dblNetoDoc1;
    }

    /**
     * @return the dblNetoDoc4
     */
    public double getDblNetoDoc4() {
        return dblNetoDoc4;
    }

    /**
     * @param dblNetoDoc4 the dblNetoDoc4 to set
     */
    public void setDblNetoDoc4(double dblNetoDoc4) {
        this.dblNetoDoc4 = dblNetoDoc4;
    }
}
