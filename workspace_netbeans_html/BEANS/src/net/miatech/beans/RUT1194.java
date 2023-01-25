/*
 * RUT1194.java
 *
 * Created on 19 de Marzo de 2010, 10:47 AM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.utils.Functions;

/**
 *
 * @author claudia
 */
public class RUT1194 implements Serializable {

    /** Creates a new instance of RUT1194 */
    /*Procedure para el ingreso del Log Passus (PSF015)*/
    
    //CCUST        PIC X(03).
    private String strCCUST;
    //TDOC         PIC X(02). 
    private String strTDOC;
    //TTRAN        PIC X(02).
    private String strTTRAN;
    //NTRAN        PIC X(12).
    private String strNTRAN;
    //NGUIA        PIC X(12)
    private String strNGUIA;
    //PROCEID      PIC X(10).
    private String strPROCEID;
    //DREFR        PIC X(12).
    private String strDREFR;
    //STATU        PIC XX .
    private String strSTATU;
    //STREXEC      PIC X(08).
    private String strSTREXEC;
    //STRTIME      PIC X(06).
    private String strSTRTIME;
    //USERP        PIC X(10).
    private String strUSERP;
    //ENDEXEC      PIC X(08).
    private String strENDEXEC;
    //ENDTIME      PIC X(06).
    private String strENDTIME;
    //TREAD        PIC 9(05).
    private long lngTREAD;
    //TLOAD        PIC 9(05).
    private long lngTLOAD;
    //MSG          PIC X(30).
    private String strMSG;
    
    
    
    public RUT1194() {

        strCCUST = "";
        strTDOC = "";
        strTTRAN = "";
        strNTRAN = "";
        strNGUIA = "";
        strPROCEID = "";
        strDREFR = "";
        strSTATU = "";
        strSTREXEC = "";
        strSTRTIME = "";
        strUSERP = "";
        strENDEXEC = "";
        strENDTIME = "";
        lngTREAD = 1;
        lngTLOAD = 1;
        strMSG = "";

    }
    
    
    /*********************************************************/
    /*********************************************************/
    
    public String toString() {

        StringBuffer strValue = new StringBuffer("");

        //CCUST        PIC X(03).
        strValue.append(Functions.fillString(this.strCCUST, 3));
        //TDOC         PIC X(02). 
        strValue.append(Functions.fillString(this.strTDOC, 2));
        //TTRAN        PIC X(02).
        strValue.append(Functions.fillString(this.strTTRAN, 2));
        //NTRAN        PIC X(10).
        strValue.append(Functions.fillString(this.strNTRAN, 10));
        //PROCEID      PIC X(10).
        strValue.append(Functions.fillString(this.strPROCEID, 10));
        //DREF         PIC X(12).
        strValue.append(Functions.fillString(this.strDREFR, 12));
        //NGUIA        PIC X(10).
        strValue.append(Functions.fillString(this.strNGUIA, 10));
        //STATU        PIC XX .
        strValue.append(Functions.fillString(this.strSTATU, 2));
        //STREXEC      PIC X(08).
        strValue.append(Functions.fillString(this.strSTREXEC, 8));
        //STRTIME      PIC X(06).
        strValue.append(Functions.fillString(this.strSTRTIME, 6));
        //USERP        PIC X(10).
        strValue.append(Functions.fillString(this.strUSERP, 10));
        //ENDEXEC      PIC X(08).
        strValue.append(Functions.fillString(this.strENDEXEC, 8));
        //ENDTIME      PIC X(06).
        strValue.append(Functions.fillString(this.strENDTIME, 6));
        //TREAD        PIC 9(05).
        strValue.append(Functions.fillZeros(5, String.valueOf(this.lngTREAD).trim()));
        //TLOAD        PIC 9(05).
        strValue.append(Functions.fillZeros(5, String.valueOf(this.lngTLOAD).trim()));
        //MSG          PIC X(30).
        strValue.append(Functions.fillString(this.strMSG, 30));
        
        return String.valueOf(strValue).toUpperCase();

    }

    public void loadData(String strData, UserView user) {

        try {

            //CCUST        PIC X(03).
            this.strCCUST = strData.substring(0, 3);
            //TDOC         PIC X(02). 
            this.strTDOC = strData.substring(3, 5);
            //TTRAN        PIC X(02).
            this.strTTRAN = strData.substring(5, 7);
            //NTRAN        PIC X(10).
            this.strNTRAN = strData.substring(7, 17);
            //PROCEID      PIC X(10).
            this.strPROCEID = strData.substring(17, 27);
            //DREF         PIC X(12).
            this.strPROCEID = strData.substring(27, 39);
            //NGUIA        PIC X(10).
            this.strNGUIA = strData.substring(39, 49);
            //STATU        PIC XX .
            this.strSTATU = strData.substring(49, 51);
            //STREXEC      PIC X(08).
            this.strSTREXEC = strData.substring(51, 59);
            //STRTIME      PIC X(06).
            this.strSTRTIME = strData.substring(59, 65);
            //USERP        PIC X(10).
            this.strUSERP = strData.substring(65, 75);
            //ENDEXEC      PIC X(08).
            this.strENDEXEC = strData.substring(75, 83);
            //ENDTIME      PIC X(06).
            this.strENDTIME = strData.substring(83, 89);
            //TREAD        PIC 9(05).
            this.lngTREAD = Long.parseLong(strData.substring(89, 94));
            //TLOAD        PIC 9(05).
            this.lngTLOAD = Long.parseLong(strData.substring(94, 99));
            //MSG          PIC X(30).
            this.strMSG = strData.substring(99, 129);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /*********************************************************/
    /*********************************************************/

    public String getStrCCUST() {
        return strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public String getStrTDOC() {
        return strTDOC;
    }

    public void setStrTDOC(String strTDOC) {
        this.strTDOC = strTDOC;
    }

    public String getStrTTRAN() {
        return strTTRAN;
    }

    public void setStrTTRAN(String strTTRAN) {
        this.strTTRAN = strTTRAN;
    }

    public String getStrNTRAN() {
        return strNTRAN;
    }

    public void setStrNTRAN(String strNTRAN) {
        this.strNTRAN = strNTRAN;
    }

    public String getStrPROCEID() {
        return strPROCEID;
    }

    public void setStrPROCEID(String strPROCEID) {
        this.strPROCEID = strPROCEID;
    }

    public String getStrSTATU() {
        return strSTATU;
    }

    public void setStrSTATU(String strSTATU) {
        this.strSTATU = strSTATU;
    }

    public String getStrSTREXEC() {
        return strSTREXEC;
    }

    public void setStrSTREXEC(String strSTREXEC) {
        this.strSTREXEC = strSTREXEC;
    }

    public String getStrSTRTIME() {
        return strSTRTIME;
    }

    public void setStrSTRTIME(String strSTRTIME) {
        this.strSTRTIME = strSTRTIME;
    }

    public String getStrUSERP() {
        return strUSERP;
    }

    public void setStrUSERP(String strUSERP) {
        this.strUSERP = strUSERP;
    }

    public String getStrENDEXEC() {
        return strENDEXEC;
    }

    public void setStrENDEXEC(String strENDEXEC) {
        this.strENDEXEC = strENDEXEC;
    }

    public String getStrENDTIME() {
        return strENDTIME;
    }

    public void setStrENDTIME(String strENDTIME) {
        this.strENDTIME = strENDTIME;
    }

    public String getStrMSG() {
        return strMSG;
    }

    public void setStrMSG(String strMSG) {
        this.strMSG = strMSG;
    }

    public long getLngTREAD() {
        return lngTREAD;
    }

    public void setLngTREAD(long lngTREAD) {
        this.lngTREAD = lngTREAD;
    }

    public long getLngTLOAD() {
        return lngTLOAD;
    }

    public void setLngTLOAD(long lngTLOAD) {
        this.lngTLOAD = lngTLOAD;
    }

    public String getStrDREFR() {
        return strDREFR;
    }

    public void setStrDREFR(String strDREFR) {
        this.strDREFR = strDREFR;
    }

    public String getStrNGUIA() {
        return strNGUIA;
    }

    public void setStrNGUIA(String strNGUIA) {
        this.strNGUIA = strNGUIA;
    }
    
    


}
