
package net.miatech.beans;
import java.io.Serializable;

/**
 *
 * @author  fcrisostomo
 * ESTA CLASE REPRESENTA A UN CUPON DE UN TICKET, ES DECIR QUE CUANDO SE CONSULTA A UN TICKET CON UNA 
 * CIA FORMA SERIE Y CUPON EN PARTICULAR EL QUERY TE PUEDE DEVOLVER 1, 2, 3 O 4 CUPONES QUE 
 * COMPONEN EL TICKET, ENTONCES EN ESE TAL CASO EL TICKET ESTARIA CONFORMADO POR LA MISMA CANTIDAD
 * DE CLASES ETKTCupon. CABE SE�ALAR QUE ESTA CLASE NO POSEE CAMPOS DE VALORACION A DIFERENCIA DE
 * LA CLASE ETKTTicket COMPLETA.
 */
public class ETKTCupon implements Serializable {
    
    private String strBillingdate;
    private String strDocnbr;
    private String strDocfareamt;
    private String strIndcnj;
    private String strCnjnbr;
    private String strTourcode;
    private String strCurrencyfare;
    private String strEqufarepaid;
    private String strCupon;
    private String strFlightdate;
    private String strFlightnumber;
    private String strCityorig;
    private String strCitydest;
    private String strIndstop;
    private String strCarrier;
    private String strFarebasis;
    private String strClase;
    private String strFarecal;
    private String strTipocupon;
    private String strCuponActual;
    private String strTktOriginal;
    private String strPasajero;
    private String strLugarEmision;
    private String strLugarEmisionCambio;
    private String strTipoPasajero;
    private String strNroprt;
    private String strCcust;
    private String strCia;
    private String strError;
    private String strIssuedate;
    private String strFiltroDoc;
    private String strFiltroCupon;
    
    public ETKTCupon() {

        strBillingdate = "";
        strDocnbr = "";
        strDocfareamt = "";
        strIndcnj = "";
        strCnjnbr = "";
        strTourcode = "";
        strCurrencyfare = "";
        strEqufarepaid = "";
        strCupon = "";
        strFlightdate = "";
        strFlightnumber = "";
        strCityorig = "";
        strCitydest = "";
        strIndstop = "";
        strCarrier = "";
        strFarebasis = "";
        strClase = "";
        strFarecal = "";
        strTipocupon = "";
        strCuponActual = "";
        strTktOriginal = "";
        strPasajero = "";
        strLugarEmision = "";
        strLugarEmisionCambio = "";
        strTipoPasajero = "";
        strNroprt = "";
        strCcust = "";
        strCia = "";
        strError = "";
        strIssuedate = "";
        strFiltroDoc = "";
        strFiltroCupon = "";
    }

    public String getStrBillingdate() {
        return strBillingdate;
    }

    public void setStrBillingdate(String strBillingdate) {
        this.strBillingdate = strBillingdate;
    }

    public String getStrDocnbr() {
        return strDocnbr;
    }

    public void setStrDocnbr(String strDocnbr) {
        this.strDocnbr = strDocnbr;
    }

    public String getStrDocfareamt() {
        return strDocfareamt;
    }

    public void setStrDocfareamt(String strDocfareamt) {
        this.strDocfareamt = strDocfareamt;
    }

    public String getStrIndcnj() {
        return strIndcnj;
    }

    public void setStrIndcnj(String strIndcnj) {
        this.strIndcnj = strIndcnj;
    }

    public String getStrCnjnbr() {
        return strCnjnbr;
    }

    public void setStrCnjnbr(String strCnjnbr) {
        this.strCnjnbr = strCnjnbr;
    }

    public String getStrTourcode() {
        return strTourcode;
    }

    public void setStrTourcode(String strTourcode) {
        this.strTourcode = strTourcode;
    }

    public String getStrCurrencyfare() {
        return strCurrencyfare;
    }

    public void setStrCurrencyfare(String strCurrencyfare) {
        this.strCurrencyfare = strCurrencyfare;
    }

    public String getStrEqufarepaid() {
        return strEqufarepaid;
    }

    public void setStrEqufarepaid(String strEqufarepaid) {
        this.strEqufarepaid = strEqufarepaid;
    }

    public String getStrCupon() {
        return strCupon;
    }

    public void setStrCupon(String strCupon) {
        this.strCupon = strCupon;
    }

    public String getStrFlightdate() {
        return strFlightdate;
    }

    public void setStrFlightdate(String strFlightdate) {
        this.strFlightdate = strFlightdate;
    }

    public String getStrFlightnumber() {
        return strFlightnumber;
    }

    public void setStrFlightnumber(String strFlightnumber) {
        this.strFlightnumber = strFlightnumber;
    }

    public String getStrCityorig() {
        return strCityorig;
    }

    public void setStrCityorig(String strCityorig) {
        this.strCityorig = strCityorig;
    }

    public String getStrCitydest() {
        return strCitydest;
    }

    public void setStrCitydest(String strCitydest) {
        this.strCitydest = strCitydest;
    }

    public String getStrIndstop() {
        return strIndstop;
    }

    public void setStrIndstop(String strIndstop) {
        this.strIndstop = strIndstop;
    }

    public String getStrCarrier() {
        return strCarrier;
    }

    public void setStrCarrier(String strCarrier) {
        this.strCarrier = strCarrier;
    }

    public String getStrFarebasis() {
        return strFarebasis;
    }

    public void setStrFarebasis(String strFarebasis) {
        this.strFarebasis = strFarebasis;
    }

    public String getStrClase() {
        return strClase;
    }

    public void setStrClase(String strClase) {
        this.strClase = strClase;
    }

    public String getStrFarecal() {
        return strFarecal;
    }

    public void setStrFarecal(String strFarecal) {
        this.strFarecal = strFarecal;
    }

    public String getStrTipocupon() {
        return strTipocupon;
    }

    public void setStrTipocupon(String strTipocupon) {
        this.strTipocupon = strTipocupon;
    }

    public String getStrCuponActual() {
        return strCuponActual;
    }

    public void setStrCuponActual(String strCuponActual) {
        this.strCuponActual = strCuponActual;
    }

    public String getStrTktOriginal() {
        return strTktOriginal;
    }

    public void setStrTktOriginal(String strTktOriginal) {
        this.strTktOriginal = strTktOriginal;
    }

    public String getStrPasajero() {
        return strPasajero;
    }

    public void setStrPasajero(String strPasajero) {
        this.strPasajero = strPasajero;
    }

    public String getStrLugarEmision() {
        return strLugarEmision;
    }

    public void setStrLugarEmision(String strLugarEmision) {
        this.strLugarEmision = strLugarEmision;
    }

    public String getStrLugarEmisionCambio() {
        return strLugarEmisionCambio;
    }

    public void setStrLugarEmisionCambio(String strLugarEmisionCambio) {
        this.strLugarEmisionCambio = strLugarEmisionCambio;
    }

    public String getStrTipoPasajero() {
        return strTipoPasajero;
    }

    public void setStrTipoPasajero(String strTipoPasajero) {
        this.strTipoPasajero = strTipoPasajero;
    }

    public String getStrNroprt() {
        return strNroprt;
    }

    public void setStrNroprt(String strNroprt) {
        this.strNroprt = strNroprt;
    }

    public String getStrCcust() {
        return strCcust;
    }

    public void setStrCcust(String strCcust) {
        this.strCcust = strCcust;
    }

    public String getStrCia() {
        return strCia;
    }

    public void setStrCia(String strCia) {
        this.strCia = strCia;
    }

    public String getStrError() {
        return strError;
    }

    public void setStrError(String strError) {
        this.strError = strError;
    }

    public String getStrIssuedate() {
        return strIssuedate;
    }

    public void setStrIssuedate(String strIssuedate) {
        this.strIssuedate = strIssuedate;
    }
    
    public String getStrFiltroDoc() {
        return strFiltroDoc;
    }

    public void setStrFiltroDoc(String strFiltroDoc) {
        this.strFiltroDoc = strFiltroDoc;
    }

    public String getStrFiltroCupon() {
        return strFiltroCupon;
    }

    public void setStrFiltroCupon(String strFiltroCupon) {
        this.strFiltroCupon = strFiltroCupon;
    }
}
