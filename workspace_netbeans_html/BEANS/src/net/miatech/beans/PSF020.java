/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author claudia
 */
public class PSF020 implements Serializable {
    //Tabla Miscelaneo
    private String strCCUST;
    private String strTREG;
    private String strCODI;
    private String strDESCRI1;
    private String strDESCRI2;
    private long lngCANTID;
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strUSUP;
    private String strFEUP;
    private String strHOUP;
    

    public PSF020() {
        strCCUST = "";
        strTREG = "";
        strCODI = "";
        strDESCRI1 = "";
        strDESCRI2 = "";
        lngCANTID = 0;
        strUSCR = "";
        strFECR = "";
        strHOCR = "";
        strUSUP = "";
        strFEUP = "";
        strHOUP = "";
    }

    public String getStrCCUST() {
        return strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public String getStrTREG() {
        return strTREG;
    }

    public void setStrTREG(String strTREG) {
        this.strTREG = strTREG;
    }

    public String getStrCODI() {
        return strCODI;
    }

    public void setStrCODI(String strCODI) {
        this.strCODI = strCODI;
    }

    public String getStrDESCRI1() {
        return strDESCRI1;
    }

    public void setStrDESCRI1(String strDESCRI1) {
        this.strDESCRI1 = strDESCRI1;
    }

    public String getStrDESCRI2() {
        return strDESCRI2;
    }

    public void setStrDESCRI2(String strDESCRI2) {
        this.strDESCRI2 = strDESCRI2;
    }

    public long getLngCANTID() {
        return lngCANTID;
    }

    public void setLngCANTID(long lngCANTID) {
        this.lngCANTID = lngCANTID;
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

    public String getStrUSUP() {
        return strUSUP;
    }

    public void setStrUSUP(String strUSUP) {
        this.strUSUP = strUSUP;
    }

    public String getStrFEUP() {
        return strFEUP;
    }

    public void setStrFEUP(String strFEUP) {
        this.strFEUP = strFEUP;
    }

    public String getStrHOUP() {
        return strHOUP;
    }

    public void setStrHOUP(String strHOUP) {
        this.strHOUP = strHOUP;
    }
    
    
    
}
