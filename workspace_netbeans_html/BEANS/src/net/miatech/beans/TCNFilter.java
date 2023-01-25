package net.miatech.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author claudia
 */
public class TCNFilter implements Serializable {

    /**
     * Creates a new instance of TCNFilter
     */
    public String strIssuedBy = "";
    public String strEndorsRest = "";
    public String strPassenger = "";
    public String strOrigIssue = "";
    public String strPassBagg = "";
    public String strTourCode = "";
    public String strOrigDestin = "";
    public String strBooking = "";
    public String strIssueExc1 = "";
    public String strIssueExc2 = "";
    public String strDatePlaceIssue = "";
    public String strAgentNumber = "";
    public String strItinerario = "";
    public String strFare = "";
    public String strEquivFare = "";
    public String strTax01 = "";
    public String strTax02 = "";
    public String strTax03 = "";
    public String strTotal = "";
    public String strNumTkt = "";
    public String strFareCal = "";
    public String strFormPay = "";
    public String strConjTkts = "";
    public String msgError = "";
    public String[] lstConjunciones;
    public String[] lstExchanges;
    public String strTotalTaxes = "";
    public String strNumDocumento = "";
    // *** Linea de Taxes *******
    public String strFareAmt = "";
    public String strCurrFare = "";
    public String strEqvFarePaid = "";
    public String strCurrEqvFarePaid = "";
    public String strTaxType1 = "";
    public String strTaxAmt1 = "";
    public String strTaxType2 = "";
    public String strTaxAmt2 = "";
    public String strTaxType3 = "";
    public String strTaxAmt3 = "";
    public String strTaxType4 = "";
    public String strTaxAmt4 = "";
    public String strTaxType5 = "";
    public String strTaxAmt5 = "";
    public String strTaxType6 = "";
    public String strTaxAmt6 = "";
    public String strTaxType7 = "";
    public String strTaxAmt7 = "";
    public String strTaxType8 = "";
    public String strTaxAmt8 = "";
    public String strTaxType9 = "";
    public String strTaxAmt9 = "";
    public String strTaxCommision = "";
    public List lstCupones = new ArrayList(0);
}
