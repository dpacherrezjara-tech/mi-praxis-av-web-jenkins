/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author crios
 */
public class PSF055 implements Serializable{

    private String strCCUST;
    private String strNAID;
    private String strCCIA;
    private String strFINVOICE;
    private String strPERMONT;
    private String strINVOICE;
    private String strCURRENC;
    private String dblINETO;
    private String strCURRENP;
    private double dblTNETO;

    //Campos Montos
    private String dblUATP;
    private String dblCARGO;
    private String dblMISC;
    private String dblTCREDITS;
    private String dblBALANCE;
    private String dblEXCHRATE;

    //Campos de Informacion **********
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strUSAC;
    private String strFEAC;
    private String strHOAC;

    public PSF055() {
        strCCUST = "";
        strNAID = "";
        strCCIA = "";
        strFINVOICE = "";
        strPERMONT = "";
        strINVOICE = "";
        strCURRENC = "";
        /*dblINETO = 0.0;*/
        strCURRENP = "";
        dblTNETO = 0.0;
        dblINETO = "";
        /*dblUATP = 0.0;
        dblCARGO = 0.0;
        dblMISC   = 0.0;
        dblCREDITS  = 0.0;
        dblBALANCE  = 0.0;*/

        dblUATP   = "";
        dblCARGO  = "";
        dblMISC   = "";
        dblTCREDITS  = "";
        dblBALANCE  = "";
        dblEXCHRATE = "";

        strUSCR = "";
        strFECR = "";
        strHOCR = "";
        strUSAC = "";
        strFEAC = "";
        strHOAC = "";
    }



    public double getDblTNETO() {
        return dblTNETO;
    }

    public void setDblTNETO(double dblTNETO) {
        this.dblTNETO = dblTNETO;
    }

    public String getStrCCIA() {
        return strCCIA;
    }

    public void setStrCCIA(String strCCIA) {
        this.strCCIA = strCCIA;
    }

    public String getStrCCUST() {
        return strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public String getStrCURRENC() {
        return strCURRENC;
    }

    public void setStrCURRENC(String strCURRENC) {
        this.strCURRENC = strCURRENC;
    }

    public String getStrCURRENP() {
        return strCURRENP;
    }

    public void setStrCURRENP(String strCURRENP) {
        this.strCURRENP = strCURRENP;
    }

    public String getStrFEAC() {
        return strFEAC;
    }

    public void setStrFEAC(String strFEAC) {
        this.strFEAC = strFEAC;
    }

    public String getStrFECR() {
        return strFECR;
    }

    public void setStrFECR(String strFECR) {
        this.strFECR = strFECR;
    }

    public String getStrFINVOICE() {
        return strFINVOICE;
    }

    public void setStrFINVOICE(String strFINVOICE) {
        this.strFINVOICE = strFINVOICE;
    }

    public String getStrHOAC() {
        return strHOAC;
    }

    public void setStrHOAC(String strHOAC) {
        this.strHOAC = strHOAC;
    }

    public String getStrHOCR() {
        return strHOCR;
    }

    public void setStrHOCR(String strHOCR) {
        this.strHOCR = strHOCR;
    }

    public String getStrINVOICE() {
        return strINVOICE;
    }

    public void setStrINVOICE(String strINVOICE) {
        this.strINVOICE = strINVOICE;
    }

    public String getStrNAID() {
        return strNAID;
    }

    public void setStrNAID(String strNAID) {
        this.strNAID = strNAID;
    }

    public String getStrPERMONT() {
        return strPERMONT;
    }

    public void setStrPERMONT(String strPERMONT) {
        this.strPERMONT = strPERMONT;
    }

    public String getStrUSAC() {
        return strUSAC;
    }

    public void setStrUSAC(String strUSAC) {
        this.strUSAC = strUSAC;
    }

    public String getStrUSCR() {
        return strUSCR;
    }

    public void setStrUSCR(String strUSCR) {
        this.strUSCR = strUSCR;
    }

    public String getDblEXCHRATE() {
        return dblEXCHRATE;
    }

    public void setDblEXCHRATE(String dblEXCHRATE) {
        this.dblEXCHRATE = dblEXCHRATE;
    }




    public String getDblBALANCE() {
        return dblBALANCE;
    }

    public void setDblBALANCE(String dblBALANCE) {
        this.dblBALANCE = dblBALANCE;
    }

    public String getDblCARGO() {
        return dblCARGO;
    }

    public void setDblCARGO(String dblCARGO) {
        this.dblCARGO = dblCARGO;
    }

    public String getDblTCREDITS() {
        return dblTCREDITS;
    }

    public void setDblTCREDITS(String dblTCREDITS) {
        this.dblTCREDITS = dblTCREDITS;
    }

 

    public String getDblINETO() {
        return dblINETO;
    }

    public void setDblINETO(String dblINETO) {
        this.dblINETO = dblINETO;
    }

    public String getDblMISC() {
        return dblMISC;
    }

    public void setDblMISC(String dblMISC) {
        this.dblMISC = dblMISC;
    }

    public String getDblUATP() {
        return dblUATP;
    }

    public void setDblUATP(String dblUATP) {
        this.dblUATP = dblUATP;
    }





    

}
