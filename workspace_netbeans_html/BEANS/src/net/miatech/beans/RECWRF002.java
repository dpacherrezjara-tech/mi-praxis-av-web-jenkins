/*
 * RECWRF002.java
 *
 * Created on 14 de febrero de 2008, 12:01 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;
import net.miatech.beans.lists.RECA728List;

/**
 *
 * @author claudia
 */
public class RECWRF002 implements Serializable {
    
    
    private String strDocumento;
    private String strAirline;
    private String strDATE;
    private String invCurrency;
    private String numPreMemo;
    private String strCCIA;
    private String strForma;
    private String strSerie;
    private String lngCupon;
    private String strRM;
    private String strGroup;
    private String strInvoice;
    private String strTypeDoc;
    private String strRuta;
    private String strStatus;
    private String strUse;
    private String billingMonthFrom;
    private String billingMonthTo;
    private String billingYearFrom;
    private String billingYearTo;
    private String strFlag;
    private String strNRORM;
    private String strClearingDate;
    private String strFMethod;
    private String strIndETKT;
    private String strRejectedDate;
    private String strSaleDate;
    private String strUseDate;
    private String strFareBasis;
    private String strCarrier;
    private String strNroVuelo;
    private String strCodComment;
    private String strCodFamily;

    private String strCODOB1;
    private String strNNRPRT;
    private String strPENAL;

    private double invNet;
    private double acceptNet;
    private double totalNet;
    private double valMPA;
    private double valSPA;
    private double valSRP;
    private double dblPercAudited;
    private double dblPercRecovery;
    private double dblGrossNeto;
    private double dblIscNeto;
    private double dblTaxNeto;
    private double dblGrossi;
    private double dblIsci;
    private double dblTaxi;
    private double dblGrossm;
    private double dblIscm;
    private double dblTaxm;
    private double dblGrossn;
    private double dblIscn;
    private double dblTaxn;
    private double dblNeto;
    private double dblRateI;
    private double dblRateM;
    private long lngQtyDoc;
    private long lngQtyaudit;
    private long lngQtyRM;
    private long lngQCORR;
    private int intRank;
    private RECA728List lstFimsHijos;
    
    /** Creates a new instance of RECWRF002 */
    public RECWRF002() {

        strDocumento = "";
        strAirline = "";
        strDATE = "";
        invCurrency = "";
        numPreMemo = "";
        strCCIA = "";
        strForma = "";
        strSerie = "";
        lngCupon = "";
        strRM = "";
        strGroup = "";
        strInvoice = "";
        strTypeDoc = "";
        strRuta = "";
        strStatus = "";
        strUse = "";
        billingMonthFrom = "";
        billingMonthTo = "";
        billingYearFrom = "";
        billingYearTo = "";
        strFlag = "";
        strNRORM = "";
        strClearingDate = "";
        strFMethod = "";
        strIndETKT = "";
        strRejectedDate = "";
        strSaleDate = "";
        strUseDate = "";
        strFareBasis = "";
        strCarrier = "";
        strNroVuelo = "";
        strCodComment = "";
        strCodFamily = "";
        strCODOB1 = "";
        strNNRPRT = "";
        strPENAL = "";

        invNet = 0;
        acceptNet = 0;
        totalNet = 0;
        valMPA = 0;
        valSPA = 0;
        valSRP = 0;
        dblPercAudited = 0;
        dblPercRecovery = 0;
        dblGrossNeto = 0;
        dblIscNeto = 0;
        dblTaxNeto = 0;
        dblGrossi = 0;
        dblIsci = 0;
        dblTaxi = 0;
        dblGrossm = 0;
        dblIscm = 0;
        dblTaxm = 0;
        dblGrossn = 0;
        dblIscn = 0;
        dblTaxn = 0;
        dblNeto = 0;
        dblRateI = 0;
        dblRateM = 0;
        lngQtyDoc = 0;
        lngQtyaudit = 0;
        lngQtyRM = 0;
        intRank = 0;
        lngQCORR = 0;
        lstFimsHijos = null;

    }
    
    
    
    
       
    public String getStrDocumento(){
        return this.strDocumento;
    }
    public void setStrDocumento(String strDocumento) {
        this.strDocumento = strDocumento;
    }
    
    
    
    public String getStrAirline(){
        return this.strAirline;
    }
    public void setStrAirline(String strAirline) {
        this.strAirline = strAirline;
    }
    
    
    
    public String getStrDATE() {
        return this.strDATE;
    }
    public void setStrDATE(String strDATE) {
        this.strDATE = strDATE;
    }
    
    
    
    
    public String getInvCurrency() {
        return this.invCurrency;
    }
    public void setInvCurrency(String invCurrency) {
        this.invCurrency = invCurrency;
    }
    
    
    
    public String getNumPreMemo() {
        return this.numPreMemo;
    }
    public void setNumPreMemo(String numPreMemo) {
        this.numPreMemo = numPreMemo;
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
    
    
    
    public String getStrRM() {
        return this.strRM;
    }
    public void setStrRM(String strRM) {
        this.strRM = strRM;
    }
     
    
    
    
    public String getStrGroup() {
        return this.strGroup;
    }
    public void setStrGroup(String strGroup) {
        this.strGroup = strGroup;
    }
    
    
    
    public String getStrInvoice() {
        return this.strInvoice;
    }
    public void setStrInvoice(String strInvoice) {
        this.strInvoice = strInvoice;
    }
    
    
    
    public String getStrTypeDoc() {
        return this.strTypeDoc;
    }
    public void setStrTypeDoc(String strTypeDoc) {
        this.strTypeDoc = strTypeDoc;
    }
    
    
    
    public String getStrRuta() {
        return this.strRuta;
    }
    public void setStrRuta(String strRuta) {
        this.strRuta = strRuta;
    }
    
    
    
    public String getStrStatus() {
        return this.strStatus;
    }
    public void setStrStatus(String strStatus) {
        this.strStatus = strStatus;
    }
    
    
    
    public String getStrUse() {
        return this.strUse;
    }
    public void setStrUse(String strUse) {
        this.strUse = strUse;
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
    
    
    
    
    public String getStrFlag() {
        return this.strFlag;
    }
    public void setStrFlag(String strFlag) {
        this.strFlag = strFlag;
    }
    
    
    
    public String getStrNRORM() {
        return this.strNRORM;
    }
    public void setStrNRORM(String strNRORM) {
        this.strNRORM = strNRORM;
    }
    
    
    
    public String getStrClearingDate() {
        return this.strClearingDate;
    }
    public void setStrClearingDate(String strClearingDate) {
        this.strClearingDate = strClearingDate;
    }
    
    
    public String getStrFMethod() {
        return this.strFMethod;
    }
    public void setStrFMethod(String strFMethod) {
        this.strFMethod = strFMethod;
    }
    
    
    public String getStrIndETKT() {
        return this.strIndETKT;
    }
    public void setStrIndETKT(String strIndETKT) {
        this.strIndETKT = strIndETKT;
    }
    
    
    public String getStrRejectedDate() {
        return this.strRejectedDate;
    }
    public void setStrRejectedDate(String strRejectedDate) {
        this.strRejectedDate = strRejectedDate;
    }
    
    
    public String getStrSaleDate() {
        return this.strSaleDate;
    }
    public void setStrSaleDate(String strSaleDate) {
        this.strSaleDate = strSaleDate;
    }
    
    
    public String getStrUseDate() {
        return this.strUseDate;
    }
    public void setStrUseDate(String strUseDate) {
        this.strUseDate = strUseDate;
    }
    
    
    public String getStrFareBasis() {
        return this.strFareBasis;
    }
    public void setStrFareBasis(String strFareBasis) {
        this.strFareBasis = strFareBasis;
    }
    
    
    public String getStrCarrier() {
        return this.strCarrier;
    }
    public void setStrCarrier(String strCarrier) {
        this.strCarrier = strCarrier;
    }
    
    
    public String getStrNroVuelo() {
        return this.strNroVuelo;
    }
    public void setStrNroVuelo(String strNroVuelo) {
        this.strNroVuelo = strNroVuelo;
    }
    
    
    public String getStrCodComment() {
        return this.strCodComment;
    }
    public void setStrCodComment(String strCodComment) {
        this.strCodComment = strCodComment;
    }
    
    
    public String getStrCodFamily() {
        return this.strCodFamily;
    }
    public void setStrCodFamily(String strCodFamily) {
        this.strCodFamily = strCodFamily;
    }
    
    
    
    public double getInvNet() {
        return this.invNet;
    }
    public void setInvNet(double invNet) {
        this.invNet = invNet;
    }
    
    
    
    public double getAcceptNet() {
        return this.acceptNet;
    }
    public void setAcceptNet(double acceptNet) {
        this.acceptNet = acceptNet;
    }

    
    
    
    public double getTotalNet() {
        return this.totalNet;
    }
    public void setTotalNet(double totalNet) {
        this.totalNet = totalNet;
    }
    
    
    
    public double getValMPA() {
        return this.valMPA;
    }
    public void setValMPA(double valMPA) {
        this.valMPA = valMPA;
    }
    
    
    
    public double getValSPA() {
        return this.valSPA;
    }
    public void setValSPA(double valSPA) {
        this.valSPA = valSPA;
    }
    
    
    
    public double getValSRP() {
        return this.valSRP;
    }
    public void setValSRP(double valSRP) {
        this.valSRP = valSRP;
    }
    
    
    
    public double getDblPercAudited() {
        return this.dblPercAudited;
    }
    public void setDblPercAudited(double dblPercAudited) {
        this.dblPercAudited = dblPercAudited;
    }
    
    
    
    
    public double getDblPercRecovery() {
        return this.dblPercRecovery;
    }
    public void setDblPercRecovery(double dblPercRecovery) {
        this.dblPercRecovery = dblPercRecovery;
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
    
    
    
    public double getDblGrossi() {
        return this.dblGrossi;
    }
    public void setDblGrossi(double dblGrossi) {
        this.dblGrossi = dblGrossi;
    }
    
    
    
    public double getDblIsci() {
        return this.dblIsci;
    }
    public void setDblIsci(double dblIsci) {
        this.dblIsci = dblIsci;
    }
    
    
    
    public double getDblTaxi() {
        return this.dblTaxi;
    }
    public void setDblTaxi(double dblTaxi) {
        this.dblTaxi = dblTaxi;
    }
    
    
    
    public double getDblGrossm() {
        return this.dblGrossm;
    }
    public void setDblGrossm(double dblGrossm) {
        this.dblGrossm = dblGrossm;
    }
    
    
    
    public double getDblIscm() {
        return this.dblIscm;
    }
    public void setDblIscm(double dblIscm) {
        this.dblIscm = dblIscm;
    }
    
    
    
    public double getDblTaxm() {
        return this.dblTaxm;
    }
    public void setDblTaxm(double dblTaxm) {
        this.dblTaxm = dblTaxm;
    }
    
    
    
    public double getDblGrossn() {
        return this.dblGrossn;
    }
    public void setDblGrossn(double dblGrossn) {
        this.dblGrossn = dblGrossn;
    }
    
    
    
    public double getDblIscn() {
        return this.dblIscn;
    }
    public void setDblIscn(double dblIscn) {
        this.dblIscn = dblIscn;
    }
    
    
    
    public double getDblTaxn() {
        return this.dblTaxn;
    }
    public void setDblTaxn(double dblTaxn) {
        this.dblTaxn = dblTaxn;
    }
    
    
    
    public double getDblNeto() {
        return this.dblNeto;
    }
    public void setDblNeto(double dblNeto) {
        this.dblNeto = dblNeto;
    }
    
    
    
    public double getDblRateI() {
        return this.dblRateI;
    }
    public void setDblRateI(double dblRateI) {
        this.dblRateI = dblRateI;
    }
    
    
    
    public double getDblRateM() {
        return this.dblRateM;
    }
    public void setDblRateM(double dblRateM) {
        this.dblRateM = dblRateM;
    }
    
    
    
    public long getLngQtyDoc() {
        return this.lngQtyDoc;
    }
    public void setLngQtyDoc(long lngQtyDoc) {
        this.lngQtyDoc = lngQtyDoc;
    }
    
    
    
    public long getLngQtyaudit() {
        return this.lngQtyaudit;
    }
    public void setLngQtyaudit(long lngQtyaudit) {
        this.lngQtyaudit = lngQtyaudit;
    }
    
    
    
    public long getLngQtyRM() {
        return this.lngQtyRM;
    }
    public void setLngQtyRM(long lngQtyRM) {
        this.lngQtyRM = lngQtyRM;
    }
    
    
    
    public int getIntRank() {
        return this.intRank;
    }
    public void setIntRank(int intRank) {
        this.intRank = intRank;
    }
    
    
    
    public RECA728List getLstFimsHijos() {
        return this.lstFimsHijos;
    }
    public void setLstFimsHijos(RECA728List lstFimsHijos) {
        this.lstFimsHijos = lstFimsHijos;
    }


    public String getStrCODOB1() {
        return strCODOB1;
    }
    public void setStrCODOB1(String strCODOB1) {
        this.strCODOB1 = strCODOB1;
    }

    
    public String getStrNNRPRT() {
        return strNNRPRT;
    }
    public void setStrNNRPRT(String strNNRPRT) {
        this.strNNRPRT = strNNRPRT;
    }

    public long getLngQCORR() {
        return lngQCORR;
    }

    public void setLngQCORR(long lngQCORR) {
        this.lngQCORR = lngQCORR;
    }

    public String getStrPENAL() {
        return strPENAL;
    }

    public void setStrPENAL(String strPENAL) {
        this.strPENAL = strPENAL;
    }





}
