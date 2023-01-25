/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.entities.yopt;

import java.io.Serializable;

/**
 *
 * @author zperez
 */
public class A1933Hst implements Serializable {
    
    public String TICKET = "";
    public String PASSENGERS = "";
    public String CCUST = "";
    public String CCIA = "";
    public String FORMA = "";
    public String SERIE = "";
    public String CUPON = "";
    public String SUBLEG = "";
    public String DFLIGHT = "";
    public String NFLIGHT = "";
    public String FBASE = "";
    public String CLASE = "";
    public String AGTIA = "";
    public String PAIVTA = "";
    public float USDRVN = 0;
    public double VCPNUSD = 0d;
    public String VNR = "";
    public String CABINA = "";
    public String ORIGDEST = "";
    public String STVAL = "";
    public double FARE = 0d;
    public String NOMPAIS = "";
    
    public String FIELD = "";
    
    public int QTYCUPONJ = 0;
    public int QTYCUPONY = 0;
    public int TOTQTYCUP = 0;
    public double TOTNVRJ = 0d;
    public double TOTNVRY = 0d;
    public double TOTNVR = 0d;

    public String getTICKET() {
        return TICKET;
    }

    public void setTICKET(String TICKET) {
        this.TICKET = TICKET;
    }

    public String getPASSENGERS() {
        return PASSENGERS;
    }

    public void setPASSENGERS(String PASSENGERS) {
        this.PASSENGERS = PASSENGERS;
    }

    public String getCCUST() {
        return CCUST;
    }

    public void setCCUST(String CCUST) {
        this.CCUST = CCUST;
    }

    public String getCCIA() {
        return CCIA;
    }

    public void setCCIA(String CCIA) {
        this.CCIA = CCIA;
    }

    public String getFORMA() {
        return FORMA;
    }

    public void setFORMA(String FORMA) {
        this.FORMA = FORMA;
    }

    public String getSERIE() {
        return SERIE;
    }

    public void setSERIE(String SERIE) {
        this.SERIE = SERIE;
    }

    public String getCUPON() {
        return CUPON;
    }

    public void setCUPON(String CUPON) {
        this.CUPON = CUPON;
    }

    public String getSUBLEG() {
        return SUBLEG;
    }

    public void setSUBLEG(String SUBLEG) {
        this.SUBLEG = SUBLEG;
    }

    public String getDFLIGHT() {
        return DFLIGHT;
    }

    public void setDFLIGHT(String DFLIGHT) {
        this.DFLIGHT = DFLIGHT;
    }

    public String getNFLIGHT() {
        return NFLIGHT;
    }

    public void setNFLIGHT(String NFLIGHT) {
        this.NFLIGHT = NFLIGHT;
    }

    public String getFBASE() {
        return FBASE;
    }

    public void setFBASE(String FBASE) {
        this.FBASE = FBASE;
    }

    public String getCLASE() {
        return CLASE;
    }

    public void setCLASE(String CLASE) {
        this.CLASE = CLASE;
    }

    public String getAGTIA() {
        return AGTIA;
    }

    public void setAGTIA(String AGTIA) {
        this.AGTIA = AGTIA;
    }

    public String getPAIVTA() {
        return PAIVTA;
    }

    public void setPAIVTA(String PAIVTA) {
        this.PAIVTA = PAIVTA;
    }

    public float getUSDRVN() {
        return USDRVN;
    }

    public void setUSDRVN(float USDRVN) {
        this.USDRVN = USDRVN;
    }

    public String getVNR() {
        return VNR;
    }

    public void setVNR(String VNR) {
        this.VNR = VNR;
    }

    public String getCABINA() {
        return CABINA;
    }

    public void setCABINA(String CABINA) {
        this.CABINA = CABINA;
    }

    public String getORIGDEST() {
        return ORIGDEST;
    }

    public void setORIGDEST(String ORIGDEST) {
        this.ORIGDEST = ORIGDEST;
    }

}