package net.miatech.beans;

import java.io.Serializable;
import net.miatech.utils.Functions;

/**
 *
 * @author claudia
 */
public class SPRUT1084 implements Serializable {

    private String strTIPO;
    private String strMDAIN;
    private String strMDAOUT;
    private String strFECHA;
    private double dblUDSRATE;
    private double dblGBPRATE;
    private double dblEURRATE;
    private double dblRATE;
    
    public SPRUT1084() {

        strTIPO = "";
        strMDAIN = "";
        strMDAOUT = "";
        strFECHA = "";
        dblUDSRATE = 0;
        dblGBPRATE = 0;
        dblEURRATE = 0;
        dblRATE = 0;

    }
    
    /**********************************************/
    /**********************************************/
    
    
    public String toString() {

        StringBuffer strValue = new StringBuffer("");

        // WS-TIPO               PIC X(02).
        strValue.append(Functions.fillString(this.strTIPO, 2));
        // WS-MDAIN              PIC X(03).  
        strValue.append(Functions.fillString(this.strMDAIN, 3));
        //WS-MDAOUT              PIC X(03). 
        strValue.append(Functions.fillString(this.strMDAOUT, 3));
        //WS-FECHA               PIC X(06). 
        strValue.append(Functions.fillString(this.strFECHA, 6));
        //WS-UDSRATE             PIC S9(08)v9(5).
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblUDSRATE * 100000))));
        //WS-GBPRATE             PIC S9(08)v9(5).
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblGBPRATE * 100000))));
        //WS-EURRATE             PIC S9(08)v9(5).
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblEURRATE * 100000))));
        //WS-RATE                PIC S9(08)v9(5).
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblRATE * 100000))));
        
        return String.valueOf(strValue).toUpperCase();
    }
    
    public void loadData(String strData) {

        try {
            //WS-TIPO               PIC X(02).
            this.strTIPO = strData.substring(0, 2);
            //WS-MDAIN              PIC X(03). 
            this.strMDAIN = strData.substring(2, 5);
            //WS-MDAOUT             PIC X(03). 
            this.strMDAOUT = strData.substring(5, 8);
            //WS-FECHA              PIC X(06). 
            this.strFECHA = strData.substring(8, 14);
            //WS-UDSRATE            PIC S9(08)v9(5).
            this.dblUDSRATE = Double.parseDouble(strData.substring(14, 27)) / 100000;
            //WS-GBPRATE            PIC S9(08)v9(5).
            this.dblGBPRATE = Double.parseDouble(strData.substring(27, 40)) / 100000;
            //WS-EURRATE            PIC S9(08)v9(5).
            this.dblEURRATE = Double.parseDouble(strData.substring(40, 53)) / 100000;
            //WS-RATE               PIC S9(08)v9(5).
            this.dblRATE = Double.parseDouble(strData.substring(53, 66)) / 100000;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    /**********************************************/
    /**********************************************/
    
    public String getStrTIPO() {
        return this.strTIPO;
    }

    public void setStrTIPO(String strTIPO) {
        this.strTIPO = strTIPO;
    }
    

    public String getStrMDAIN() {
        return this.strMDAIN;
    }

    public void setStrMDAIN(String strMDAIN) {
        this.strMDAIN = strMDAIN;
    }
    

    public String getStrMDAOUT() {
        return this.strMDAOUT;
    }

    public void setStrMDAOUT(String strMDAOUT) {
        this.strMDAOUT = strMDAOUT;
    }
    
    
    public String getStrFECHA() {
        return this.strFECHA;
    }

    public void setStrFECHA(String strFECHA) {
        this.strFECHA = strFECHA;
    }
    
    
    public double getDblUDSRATE() {
        return this.dblUDSRATE;
    }

    public void setDblUDSRATE(double dblUDSRATE) {
        this.dblUDSRATE = dblUDSRATE;
    }
    

    public double getDblGBPRATE() {
        return this.dblGBPRATE;
    }

    public void setDblGBPRATE(double dblGBPRATE) {
        this.dblGBPRATE = dblGBPRATE;
    }
    

    public double getDblEURRATE() {
        return this.dblEURRATE;
    }

    public void setDblEURRATE(double dblEURRATE) {
        this.dblEURRATE = dblEURRATE;
    }
    

    public double getDblRATE() {
        return this.dblRATE;
    }

    public void setDblRATE(double dblRATE) {
        this.dblRATE = dblRATE;
    }
    
    
}