package net.miatech.beans;

import net.miatech.beans.lists.SubProrateSectorList;
import net.miatech.utils.Functions;

/**
 *
 * @author claudia
 */
public class SubProrateHeader {
    
    /** Creates a new instance of SubProrateHeader */
    public SubProrateHeader() {
    }
    
    private String NROPRT;
    private String BILLINGDATE;  
    private String airlineName;   
    private String airlineAlfaCode;
    private String ISSUEDATE;
    private String BILLINGAIRLINE;
    private String SELLINGPLACE;
    private String DOCNBR;
    private String ISSUEPLACE;
    private String SORIGIN;
    private String SDESTINY;
    private String FLIGHTDATE;
    private double ATBP;
    private String CURR;
    private String FCURR;
    private String ECURR;
    private double FARE;
    private double EQVFARE;
    private int STOPOVERQ;
    private double STOPOVERC;
    private String PLUSSI;
    private double PLUSSC;
    private double ROE;
    private String MISC;
    private String DISCT;
    private double DISCC;
    private String IT;
    private double NET;
    private String FABASIS;
    private String LOHO;
    private String INIT;
    private String RCURR;
    private SubProrateSectorList SECTORS;
    
    
    public String getNROPRT() {
        return this.NROPRT;
    }
    
    public void setNROPRT(String NROPRT) {
        this.NROPRT = NROPRT;
    }
    
    public String getBILLINGDATE() {
        return this.BILLINGDATE;
    }
    
    public void setBILLINGDATE(String BILLINGDATE) {
        this.BILLINGDATE = BILLINGDATE;
    }  
        
    public String getAirlineName() {
        return this.airlineName;
    }
    
    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }
    
    public String getAirlineAlfaCode() {
        return this.airlineAlfaCode;
    }
    
    public void setAirlineAlfaCode(String airlineAlfaCode) {
        this.airlineAlfaCode = airlineAlfaCode;
    }
    
    public String getISSUEDATE() {
        return this.ISSUEDATE;
    }
    
    public void setISSUEDATE(String ISSUEDATE) {
        this.ISSUEDATE = ISSUEDATE;
    }
    
    public String getBILLINGAIRLINE() {
        return this.BILLINGAIRLINE;
    }
    
    public void setBILLINGAIRLINE(String BILLINGAIRLINE) {
        this.BILLINGAIRLINE = BILLINGAIRLINE;
    }
    
    public String getSELLINGPLACE() {
        return this.SELLINGPLACE;
    }
    
    public void setSELLINGPLACE(String SELLINGPLACE) {
        this.SELLINGPLACE = SELLINGPLACE;
    }
    
    public String getDOCNBR() {
        return this.DOCNBR;
    }
    
    public void setDOCNBR(String DOCNBR) {
        this.DOCNBR = DOCNBR;
    }
    
    public String getISSUEPLACE() {
        return this.ISSUEPLACE;
    }
    
    public void setISSUEPLACE(String ISSUEPLACE) {
        this.ISSUEPLACE = ISSUEPLACE;
    }
    
    public String getSORIGIN() {
        return this.SORIGIN;
    }
    
    public void setSORIGIN(String SORIGIN) {
        this.SORIGIN = SORIGIN;
    }
    
    public String getSDESTINY() {
        return this.SDESTINY;
    }
    
    public void setSDESTINY(String SDESTINY) {
        this.SDESTINY = SDESTINY;
    }
    
    public String getFLIGHTDATE() {
        return this.FLIGHTDATE;
    }
    
    public void setFLIGHTDATE(String FLIGHTDATE) {
        this.FLIGHTDATE = FLIGHTDATE;
    }
    
    public double getATBP() {
        return this.ATBP;
    }
    
    public void setATBP(double ATBP) {
        this.ATBP = ATBP;
    }
    
    public String getCURR() {
        return this.CURR;
    }
    
    public void setCURR(String CURR) {
        this.CURR = CURR;
    }
    
    public String getFCURR() {
        return this.FCURR;
    }
    
    public void setFCURR(String FCURR) {
        this.FCURR = FCURR;
    }
    
    public String getECURR() {
        return this.ECURR;
    }
    
    public void setECURR(String ECURR) {
        this.ECURR = ECURR;
    }
    
    public double getFARE() {
        return this.FARE;
    }
    
    public void setFARE(double FARE) {
        this.FARE = FARE;
    }
    
    public double getEQVFARE() {
        return this.EQVFARE;
    }
    
    public void setEQVFARE(double EQVFARE) {
        this.EQVFARE = EQVFARE;
    }
    
    public int getSTOPOVERQ() {
        return this.STOPOVERQ;
    }
    
    public void setSTOPOVERQ(int STOPOVERQ) {
        this.STOPOVERQ = STOPOVERQ;
    }
    
    public double getSTOPOVERC() {
        return this.STOPOVERC;
    }
    
    public void setSTOPOVERC(double STOPOVERC) {
        this.STOPOVERC = STOPOVERC;
    }
    
    public String getPLUSSI() {
        return this.PLUSSI;
    }
    
    public void setPLUSSI(String PLUSSI) {
        this.PLUSSI = PLUSSI;
    }
    
    public double getPLUSSC() {
        return this.PLUSSC;
    }
    
    public void setPLUSSC(double PLUSSC) {
        this.PLUSSC = PLUSSC;
    }
    
    public double getROE() {
        return this.ROE;
    }
    
    public void setROE(double ROE) {
        this.ROE = ROE;
    }
    
    public String getMISC() {
        return this.MISC;
    }
    
    public void setMISC(String MISC) {
        this.MISC = MISC;
    }
    
    public String getDISCT() {
        return this.DISCT;
    }
    
    public void setDISCT(String DISCT) {
        this.DISCT = DISCT;
    }
    
    public double getDISCC() {
        return this.DISCC;
    }
    
    public void setDISCC(double DISCC) {
        this.DISCC = DISCC;
    }
    
    public String getIT() {
        return this.IT;
    }
    
    public void setIT(String IT) {
        this.IT = IT;
    }
    
    public double getNET() {
        return this.NET;
    }
    
    public void setNET(double NET) {
        this.NET = NET;
    }
    
    public String getFABASIS() {
        return this.FABASIS;
    }
    
    public void setFABASIS(String FABASIS) {
        this.FABASIS = FABASIS;
    }
    
    public String getLOHO() {
        return this.LOHO;
    }
    
    public void setLOHO(String LOHO) {
        this.LOHO = LOHO;
    }
    
    public String getINIT() {
        return this.INIT;
    }
    
    public void setINIT(String INIT) {
        this.INIT = INIT;
    }
    
    public String getRCURR() {
        return this.RCURR;
    }
    
    public void setRCURR(String RCURR) {
        this.RCURR = RCURR;
    }
    
    public SubProrateSectorList getSECTORS() {
        return this.SECTORS;
    }
    
    public void setSECTORS(SubProrateSectorList SECTORS) {
        this.SECTORS = SECTORS;
    }
    
    /**
     * Holds value of property FILENAME.
     */
    private String FILENAME;
    
    public String getFILENAME() {
        return this.FILENAME;
    }
    
    public void setFILENAME(String FILENAME) {
        this.FILENAME = FILENAME;
    }
    
    /**
     * Holds value of property A020SUDEBI.
     */
    private double A020SUDEBI;
    
    public double getA020SUDEBI() {
        return this.A020SUDEBI;
    }
    
    public void setA020SUDEBI(double A020SUDEBI) {
        this.A020SUDEBI = A020SUDEBI;
    }
    
    /**
     * Holds value of property A020IMPNAC.
     */
    private double A020IMPNAC;
    
    public double getA020IMPNAC() {
        return this.A020IMPNAC;
    }
    
    public void setA020IMPNAC(double A020IMPNAC) {
        this.A020IMPNAC = A020IMPNAC;
    }
    
    /**
     * Holds value of property A020TOTDEB.
     */
    private double A020TOTDEB;
    
    public double getA020TOTDEB() {
        return this.A020TOTDEB;
    }
    
    public void setA020TOTDEB(double A020TOTDEB) {
        this.A020TOTDEB = A020TOTDEB;
    }
    
    /**
     * Holds value of property A020ACEPTA.
     */
    private double A020ACEPTA;
    
    public double getA020ACEPTA() {
        return this.A020ACEPTA;
    }
    
    public void setA020ACEPTA(double A020ACEPTA) {
        this.A020ACEPTA = A020ACEPTA;
    }
    
    /**
     * Holds value of property A020IMPINT.
     */
    private double A020IMPINT;
    
    public double getA020IMPINT() {
        return this.A020IMPINT;
    }
    
    public void setA020IMPINT(double A020IMPINT) {
        this.A020IMPINT = A020IMPINT;
    }
    
    /**
     * Holds value of property A020TOTHAB.
     */
    private double A020TOTHAB;
    
    public double getA020TOTHAB() {
        return this.A020TOTHAB;
    }
    
    public void setA020TOTHAB(double A020TOTHAB) {
        this.A020TOTHAB = A020TOTHAB;
    }
    
    /**
     * Holds value of property A020REDEBI.
     */
    private double A020REDEBI;
    
    public double getA020REDEBI() {
        return this.A020REDEBI;
    }
    
    public void setA020REDEBI(double A020REDEBI) {
        this.A020REDEBI = A020REDEBI;
    }
    
    /**
     * Holds value of property A020COMISI.
     */
    private double A020COMISI;
    
    public double getA020COMISI() {
        return this.A020COMISI;
    }
    
    public void setA020COMISI(double A020COMISI) {
        this.A020COMISI = A020COMISI;
    }
    
    /**
     * Holds value of property A020TAX.
     */
    private double A020TAX;
    
    public double getA020TAX() {
        return this.A020TAX;
    }
    
    public void setA020TAX(double A020TAX) {
        this.A020TAX = A020TAX;
    }
    
    /**
     * Holds value of property A020ANALIZ.
     */
    private double A020ANALIZ;
    
    public double getA020ANALIZ() {
        return this.A020ANALIZ;
    }
    
    public void setA020ANALIZ(double A020ANALIZ) {
        this.A020ANALIZ = A020ANALIZ;
    }
    
    /**
     * Holds value of property A020COMISIP.
     */
    private double A020COMISIP;
    
    public double getA020COMISP() {
        return this.A020COMISIP;
    }
    
    public void setA020COMISP(double A020COMISIP) {
        this.A020COMISIP = A020COMISIP;
    }
    
    /**
     * Holds value of property A020TICKET.
     */
    private String A020TICKET;
    
    public String getA020TICKET() {
        return this.A020TICKET;
    }
    
    public void setA020TICKET(String A020TICKET) {
        this.A020TICKET = A020TICKET;
    }
    
    /**
     * Holds value of property A020CODOB1.
     */
    private String A020CODOB1;
    
    public String getA020CODOB1() {
        return this.A020CODOB1;
    }
    
    public void setA020CODOB1(String A020CODOB1) {
        this.A020CODOB1 = A020CODOB1;
    }
    
    /**
     * Holds value of property A020COMME1.
     */
    private String A020COMME1;
    
    public String getA020COMME1() {
        return this.A020COMME1;
    }
    
    public void setA020COMME1(String A020COMME1) {
        this.A020COMME1 = A020COMME1;
    }
    
    /**
     * Holds value of property A020CODOB2.
     */
    private String A020CODOB2;
    
    public String getA020CODOB2() {
        return this.A020CODOB2;
    }
    
    public void setA020CODOB2(String A020CODOB2) {
        this.A020CODOB2 = A020CODOB2;
    }
    
    /**
     * Holds value of property A020COMME2.
     */
    private String A020COMME2;
    
    public String getA020COMME2() {
        return this.A020COMME2;
    }
    
    public void setA020COMME2(String A020COMME2) {
        this.A020COMME2 = A020COMME2;
    }
    
    /**
     * Holds value of property A020CODOB3.
     */
    private String A020CODOB3;
    
    public String getA020CODOB3() {
        return this.A020CODOB3;
    }
    
    public void setA020CODOB3(String A020CODOB3) {
        this.A020CODOB3 = A020CODOB3;
    }
    
    /**
     * Holds value of property A020COMME3.
     */
    private String A020COMME3;
    
    public String getA020COMME3() {
        return this.A020COMME3;
    }
    
    public void setA020COMME3(String A020COMME3) {
        this.A020COMME3 = A020COMME3;
    }
    
    /**
     * Holds value of property A020CODOB4.
     */
    private String A020CODOB4;
    
    public String getA020CODOB4() {
        return this.A020CODOB4;
    }
    
    public void setA020CODOB4(String A020CODOB4) {
        this.A020CODOB4 = A020CODOB4;
    }
    
    /**
     * Holds value of property A020COMME4.
     */
    private String A020COMME4;
    
    public String getA020COMME4() {
        return this.A020COMME4;
    }
    
    public void setA020COMME4(String A020COMME4) {
        this.A020COMME4 = A020COMME4;
    }
    
    /**
     * Holds value of property A020CODOB5.
     */
    private String A020CODOB5;
    
    public String getA020CODOB5() {
        return this.A020CODOB5;
    }
    
    public void setA020CODOB5(String A020CODOB5) {
        this.A020CODOB5 = A020CODOB5;
    }
    
    /**
     * Holds value of property A020COMME5.
     */
    private String A020COMME5;
    
    public String getA020COMME5() {
        return this.A020COMME5;
    }
    
    public void setA020COMME5(String A020COMME5) {
        this.A020COMME5 = A020COMME5;
    }
    
    /**
     * Holds value of property A020COMME6.
     */
    private String A020COMME6;
    
    public String getA020COMME6() {
        return this.A020COMME6;
    }
    
    public void setA020COMME6(String A020COMME6) {
        this.A020COMME6 = A020COMME6;
    }
    
    /**
     * Holds value of property A020NETO.
     */
    private double A020NETO;
    
    public double getA020NETO() {
        return this.A020NETO;
    }
    
    public void setA020NETO(double A020NETO) {
        this.A020NETO = A020NETO;
    }
    
    /**
     * Holds value of property A020GRUPO.
     */
    private String A020GRUPO;
    
    public String getA020GRUPO() {
        return this.A020GRUPO;
    }
    
    public void setA020GRUPO(String A020GRUPO) {
        this.A020GRUPO = A020GRUPO;
    }
    
    /**
     * Holds value of property A020NROPRT.
     */
    private String A020NROPRT;
    
    public String getA020NROPRT() {
        return this.A020NROPRT;
    }
    
    public void setA020NROPRT(String A020NROPRT) {
        this.A020NROPRT = A020NROPRT;
    }
    
    /**
     * Holds value of property A020USER.
     */
    private String A020USER;
    
    public String getA020USER() {
        return this.A020USER;
    }
    
    public void setA020USER(String A020USER) {
        this.A020USER = A020USER;
    }
    
    /**
     * Holds value of property A020SDATE.
     */
    private String A020SDATE;
    
    public String getA020SDATE() {
        return this.A020SDATE;
    }
    
    public void setA020SDATE(String A020SDATE) {
        this.A020SDATE = A020SDATE;
    }
    
    /**
     * Holds value of property A020STIME.
     */
    private String A020STIME;
    
    public String getA020STIME() {
        return this.A020STIME;
    }
    
    public void setA020STIME(String A020STIME) {
        this.A020STIME = A020STIME;
    }
    
    /**
     * Holds value of property A020FRECHA.
     */
    private String A020FRECHA;
    
    public String getA020FRECHA() {
        return this.A020FRECHA;
    }
    
    public void setA020FRECHA(String A020FRECHA) {
        this.A020FRECHA = A020FRECHA;
    }
    
    /**
     * Holds value of property A020PSTRF.
     */
    private String A020PSTRF;
    
    public String getA020PSTRF() {
        return this.A020PSTRF;
    }
    
    public void setA020PSTRF(String A020PSTRF) {
        this.A020PSTRF = A020PSTRF;
    }
    
    /**
     * Holds value of property A020RMSN.
     */
    private String A020RMSN;
    
    public String getA020RMSN() {
        return this.A020RMSN;
    }
    
    public void setA020RMSN(String A020RMSN) {
        this.A020RMSN = A020RMSN;
    }
    
    /**
     * Holds value of property A020RMANT.
     */
    private String A020RMANT;
    
    public String getA020RMANT() {
        return this.A020RMANT;
    }
    
    public void setA020RMANT(String A020RMANT) {
        this.A020RMANT = A020RMANT;
    }
    
    /**
     * Holds value of property SEQPRT.
     */
    private String SEQPRT;
    
    public String getSEQPRT() {
        return this.SEQPRT;
    }
    
    public void setSEQPRT(String SEQPRT) {
        this.SEQPRT = SEQPRT;
    }
    
    /**
     * Holds value of property TUSO.
     */
    private String TUSO;
    
    public String getTUSO() {
        return this.TUSO;
    }
    
    public void setTUSO(String TUSO) {
        this.TUSO = TUSO;
    }
    
    /**
     * Holds value of property DCHEQ.
     */
    private String DCHEQ;
    
    public String getDCHEQ() {
        return this.DCHEQ;
    }
    
    public void setDCHEQ(String DCHEQ) {
        this.DCHEQ = DCHEQ;
    }
    
    /**
     * Holds value of property TVENTA.
     */
    private String TVENTA;
    
    public String getTVENTA() {
        return this.TVENTA;
    }
    
    public void setTVENTA(String TVENTA) {
        this.TVENTA = TVENTA;
    }
    
    /**
     * Holds value of property TCAREG.
     */
    private double TCAREG;
    
    public double getTCAREG() {
        return this.TCAREG;
    }
    
    public void setTCAREG(double TCAREG) {
        this.TCAREG = TCAREG;
    }
    
    /**
     * Holds value of property MONREG.
     */
    private String MONREG;
    
    public String getMONREG() {
        return this.MONREG;
    }
    
    public void setMONREG(String MONREG) {
        this.MONREG = MONREG;
    }
    
    /**
     * Holds value of property TCASYS.
     */
    private double TCASYS;
    
    public double getTCASYS() {
        return this.TCASYS;
    }
    
    public void setTCASYS(double TCASYS) {
        this.TCASYS = TCASYS;
    }
    
    /**
     * Holds value of property INDSAM.
     */
    private String INDSAM;
    
    public String getINDSAM() {
        return this.INDSAM;
    }
    
    public void setINDSAM(String INDSAM) {
        this.INDSAM = INDSAM;
    }
    
    /**
     * Holds value of property INDPRT.
     */
    private int INDPRT;
    
    public int getINDPRT() {
        return this.INDPRT;
    }
    
    public void setINDPRT(int INDPRT) {
        this.INDPRT = INDPRT;
    }
    
    /**
     * Holds value of property TCAPAG.
     */
    private double TCAPAG;
    
    public double getTCAPAG() {
        return this.TCAPAG;
    }
    
    public void setTCAPAG(double TCAPAG) {
        this.TCAPAG = TCAPAG;
    }
    
    /**
     * Holds value of property SELEC.
     */
    private String SELEC;
    
    public String getSELEC() {
        return this.SELEC;
    }
    
    public void setSELEC(String SELEC) {
        this.SELEC = SELEC;
    }
    
    /**
     * Holds value of property GRUPO.
     */
    private String GRUPO;
    
    public String getGRUPO() {
        return this.GRUPO;
    }
    
    public void setGRUPO(String GRUPO) {
        this.GRUPO = GRUPO;
    }
    
    /**
     * Holds value of property COUVTA.
     */
    private String COUVTA;
    
    public String getCOUVTA() {
        return this.COUVTA;
    }
    
    public void setCOUVTA(String COUVTA) {
        this.COUVTA = COUVTA;
    }
    
    /**
     * Holds value of property COUEMI.
     */
    private String COUEMI;
    
    public String getCOUEMI() {
        return this.COUEMI;
    }
    
    public void setCOUEMI(String COUEMI) {
        this.COUEMI = COUEMI;
    }
    
    /**
     * Holds value of property AJTRAM.
     */
    private String AJTRAM;
    
    public String getAJTRAM() {
        return this.AJTRAM;
    }
    
    public void setAJTRAM(String AJTRAM) {
        this.AJTRAM = AJTRAM;
    }
    
    /**
     * Holds value of property strUser.
     */
    private String strUser;
    
    public String getStrUser() {
        return this.strUser;
    }
    
    public void setStrUser(String strUser) {
        this.strUser = strUser;
    }
    
    
    
    public String toString(String strAIRLIN) {
        
        StringBuffer strValue = new StringBuffer("");
        String strTemp = "";
        SubProrateSector sector = null;
        //05 A728AIRLIN       PIC X(03).
        strValue.append(strAIRLIN);
        //05 A728NROPRT       PIC 9(09).
        strValue.append(Functions.fillZeros(9, this.NROPRT));
        //05 A728SEQPRT       PIC 9(02).
        strValue.append(Functions.fillZeros(2, this.SEQPRT));
        //05 A728TUSO         PIC X(02).
        strValue.append(Functions.fillZeros(2, this.TUSO));
        //05 A728CIA          PIC X(03).
        strValue.append(this.DOCNBR.substring(0, 3));
        //05 A728NRODOC       PIC X(10).
        strValue.append(this.DOCNBR.substring(3, 13));
        //05 A728CUPON        PIC X(01).
        strValue.append(this.DOCNBR.substring(13, 14));
        //05 A728DCHEQ        PIC X(01).
        strValue.append(Functions.fillString(this.DCHEQ, 1));
        //05 A728TVENTA       PIC X(01).
        strValue.append(Functions.fillString(this.TVENTA, 1));
        //05 A728CODIT        PIC X(20).
        strValue.append(Functions.fillString(this.IT, 20));
        //05 A728FECVTA       PIC X(08).
        strValue.append(Functions.fillString(this.ISSUEDATE, 8));
        //05 A728FECFAC       PIC X(08).
        strValue.append(Functions.fillString(this.BILLINGDATE, 8));
        //05 A728PORDES       PIC 9(03)V99.
        strValue.append(Functions.fillZeros(5, String.valueOf(Math.round(this.DISCC*100))));
        //05 A728RUTORG       PIC X(03).
        strValue.append(Functions.fillString(this.INIT, 3));
        //05 A728TDESC        PIC X(02).
        strValue.append(Functions.fillString(this.DISCT, 2));
        //05 A728TCAREG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.TCAREG*1000000))));
        //05 A728MONREG       PIC X(03).
        strValue.append(Functions.fillString(this.MONREG, 3));
        //05 A728TCASYS       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.TCASYS*1000000))));
        //05 A728MONSYS       PIC X(03).
        strValue.append(Functions.fillString(this.RCURR, 3));
        //05 A728MONEDA       PIC X(03).
        strValue.append(Functions.fillString(this.FCURR, 3));
        //05 A728TARIFA       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.FARE*100))));
        //05 A728MDAPAG       PIC X(03).
        strValue.append(Functions.fillString(this.ECURR, 3));
        //05 A728TRFPAG       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.EQVFARE*100))));
        //05 A728TCAPAG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.TCAPAG*1000000))));
        //05 A728ATBP         PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.ATBP*100))));
        //05 A728MDAATB       PIC X(03).
        strValue.append(Functions.fillString(this.CURR, 3));
        //05 A728ROE          PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.ROE*1000000))));
        //05 A728CPLUSS       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.PLUSSC*100))));
        //05 A728CSOVER       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.STOPOVERC*100))));
        //05 A728QSOVER       PIC 9(02).
        strValue.append(Functions.fillZeros(2, String.valueOf(Math.round(this.STOPOVERQ))));
        //05 A728TAJUST       PIC 9(11)V99.
        
        if(Functions.fillZeros(13, String.valueOf(Math.round(this.NET*100))).indexOf("-") < 0) {
            strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.NET*100))));
        }else{
            strValue.append("-" + Functions.fillZeros(12, String.valueOf(Math.round(this.NET*100)).replace('-',' ').trim()));
        }
       
      //  strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.NET*100))));
        //05 A728FBASE        PIC X(10).
        strValue.append(Functions.fillString(this.FABASIS, 10));
        //05 A728LOHO         PIC X(3).
        strValue.append(Functions.fillString(this.LOHO, 3));
        //05 A728AIRFAC       PIC X(3).
        strValue.append(this.BILLINGAIRLINE);
        //05 A728INDSAM       PIC X(1).
        strValue.append(Functions.fillString(this.INDSAM, 1));
        //05 A728INDPRT       PIC 9(2).
        strValue.append(Functions.fillZeros(2, String.valueOf(this.INDPRT)));
        //05 A728IPLUS        PIC X(1).
        strValue.append(Functions.fillString(this.PLUSSI, 1));
        //05 A728SECOR        PIC X(3).
        strValue.append(Functions.fillString(this.SORIGIN, 3));
        //05 A728SECDS        PIC X(3).
        strValue.append(Functions.fillString(this.SDESTINY, 3));
        //05 A728SELEC        PIC X(8).
        strValue.append(Functions.fillString(this.PLUSSI, 8));
        //05 A728FVLO1        PIC X(8).
        strValue.append(Functions.fillString(this.FLIGHTDATE, 8));
        //05 FUNC         PIC X(10).
        strValue.append(Functions.fillString(this.FUNC, 10));
        
        for(int i=0;i<SECTORS.size();i++) {
            sector = SECTORS.getSubProrateSector(i);
            if(i!=0) {
                //06 IDENTI       PIC X(2).
                //06 NUMERO       PIC X(2).
                strValue.append("**");
                strValue.append(Functions.fillZeros(2, String.valueOf(i-1)));
                //06 XO       PIC X.
                strValue.append(Functions.fillString(sector.getXO(), 1));
                //06 RUTAO     PIC X(03).
                if(!Functions.fillString(sector.getCARR(), 2).equals("") &&
                        !Functions.fillString(sector.getCARR(), 2).equals("..")) {
                    strValue.append(Functions.fillString(strTemp, 3));
                }else{
                    strValue.append(Functions.fillString("", 3));
                }
                //06 RUTAD     PIC X(03).
                strValue.append(Functions.fillString(sector.getOD(), 3));
                //06 VIA1      PIC X(02).
                strValue.append(Functions.fillString(sector.getVIA(), 2));
                //06 CARRN1    PIC X(03).
                strValue.append(Functions.fillString(sector.getCARRN(), 3));
                //06 CARRA1    PIC X(02).
                strValue.append(Functions.fillString(sector.getCARR(), 2));
                //06 NVLO1     PIC X(05).
                strValue.append(Functions.fillString(sector.getNFLIGHT(), 5));
                //06 FCVLO1    PIC X(08).
                strValue.append(Functions.fillString(sector.getFCVLO(), 8));
                //06 BOOKI1    PIC X(01).
                strValue.append(Functions.fillString(sector.getRBD(), 1));
                //06 CLASE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getCLASE(), 1));
                //06 FBASE1    PIC X(10).
                strValue.append(Functions.fillString(sector.getFBASE(), 10));
                //06 LOHO      PIC X(03).
                strValue.append(Functions.fillString(sector.getLOHO(), 3));
                //06 TBASE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getTBASE(), 1));
                //06 STBAS1    PIC X(02).
                strValue.append(Functions.fillString(sector.getSTBAS(), 2));
                //06 FARE1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getXFARE()*100))));
                //06 TFARE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getTFARE(), 1));
                //06 DIFER1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDIFER()*100))));
                //06 FDIFE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getFDIFE(), 1));
                //06 TRFM1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getTRFM()*100))));
                //06 MNTFM1    PIC X(03).
                strValue.append(Functions.fillString(sector.getMNTFM(), 3));
                //06 SS1       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getSURCHARGE()*100))));
                //06 PLUSS1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getPLUSS()*100))));
                //06 STOP1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getSTOP()*100))));
                //06 MNACU1    PIC X(03).
                strValue.append(Functions.fillString(sector.getMNACU(), 3));
                //06 ACUE1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getACUE()*100))));
                //06 FACT1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getFACTOR()*100))));
                //06 TARI1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getFARE()*100))));
                
                //06 YANQ1     PIC 9(13)V99. //********************************************************
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getYANQ()*100))));
                
                //06 PPRO1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getPROVISOP()*100))));
                //06 SUBPA1    PIC X(20).
                strValue.append(Functions.fillString(sector.getSUBPA(), 20));
                //06 PROV1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getPROVISOC()*100))));
                //06 ACUEO1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getSPA()*100))));
                //06 ACUCO1    PIC X(20).
                strValue.append(Functions.fillString(sector.getACUCO(), 20));
                //06 AJUST1    PIC 9(13)V99.
               
                if(Functions.fillZeros(15, String.valueOf(Math.round(sector.getADJUST()*100))).indexOf("-") < 0) {
                    strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getADJUST()*100))));
                }else{
                    strValue.append("-" + Functions.fillZeros(14, String.valueOf(Math.round(sector.getADJUST()*100)).replace('-',' ').trim()));
                   // strValue.append(Functions.fillZeros(14, String.valueOf(Math.round(sector.getADJUST()*100))).replaceAll("-","") + "-");
                }
               
              //  strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getADJUST()*100))));
                //06 VALOR1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getAMOUNT()*100))));
                //06 SPA       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getSPA()*100))));
                //06 VLMPA1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getVLMPA()*100))));
                //06 VLSRP1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getVLSRP()*100))));
                //06 INDPR1    PIC X.
                strValue.append(Functions.fillString(sector.getINDPR(), 1));
                //06 INDISC    PIC X(1).
                strValue.append(Functions.fillString(sector.getINDISC(), 1));
                //06 ISC       PIC 9(7)V99.
                strValue.append(Functions.fillZeros(9, String.valueOf(Math.round(sector.getISC()*100))));
                //06 COEFIC    PIC 9(8)V9(5).
                strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(sector.getCOEFIC()*100000))));
                //06 ACUBAS    PIC X(4).
                strValue.append(Functions.fillString(sector.getACUBAS(), 4));
                //06 ACUSTS    PIC X(1).
                strValue.append(Functions.fillString(sector.getACUSTS(), 1));
                //06 PRVSTS    PIC X(2).
                strValue.append(Functions.fillString(sector.getPRVSTS(), 2));
            }
            strTemp = sector.getOD();
        }
        for(int i=SECTORS.size();i<51;i++) {
            //06 IDENTI       PIC X(2).
            //06 NUMERO       PIC X(2).
            strValue.append("  00");
            //06 XO       PIC X.
            strValue.append(Functions.fillString("", 1));
            //06 RUTAO     PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 RUTAD     PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 VIA1      PIC X(02).
            strValue.append(Functions.fillString("", 2));
            //06 CARRN1    PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 CARRA1    PIC X(02).
            strValue.append(Functions.fillString("", 2));
            //06 NVLO1     PIC X(05).
            strValue.append(Functions.fillString("", 5));
            //06 FCVLO1    PIC X(08).
            strValue.append(Functions.fillString("", 8));
            //06 BOOKI1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 CLASE1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 FBASE1    PIC X(10).
            strValue.append(Functions.fillString("", 10));
            //06 LOHO      PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 TBASE1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 STBAS1    PIC X(02).
            strValue.append(Functions.fillString("", 2));
            //06 FARE1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 TFARE1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 DIFER1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 FDIFE1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 TRFM1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 MNTFM1    PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 SS1       PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 PLUSS1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 STOP1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 MNACU1    PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 ACUE1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 FACT1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 TARI1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 YANQ1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 PPRO1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 SUBPA1    PIC X(20).
            strValue.append(Functions.fillString("", 20));
            //06 PROV1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 ACUEO1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 ACUCO1    PIC X(20).
            strValue.append(Functions.fillString("", 20));
            //06 AJUST1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 VALOR1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 SPA       PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 VLMPA1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 VLSRP1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 INDPR1    PIC X.
            strValue.append(Functions.fillString("", 1));
            //06 INDISC    PIC X(1).
            strValue.append(Functions.fillString("", 1));
            //06 ISC       PIC 9(7)V99.
            strValue.append(Functions.fillZeros(9, ""));
            //06 COEFIC    PIC 9(8)V9(5).
            strValue.append(Functions.fillZeros(13, ""));
            //06 ACUBAS    PIC X(4).
            strValue.append(Functions.fillString("", 4));
            //06 ACUSTS    PIC X(1).
            strValue.append(Functions.fillString("", 1));
            //06 PRVSTS    PIC X(2).
            strValue.append(Functions.fillString("", 2));
        }
        
        //05 DSCR         PIC X(30).
        strValue.append(Functions.fillString("", 30));
        //05 MSG          PIC X(40).
        strValue.append(Functions.fillString("", 40));
        //05 USER         PIC X(10).
        strValue.append(Functions.fillString(this.strUser, 10));
        //05 A728CODTAX   PIC X(10).
        strValue.append(Functions.fillString(this.MISC, 10));
        //05 A728GRUPO    PIC X(06).
        strValue.append(Functions.fillString(this.GRUPO, 6));
        //05 A728CTYVTA   PIC X(03).
        strValue.append(Functions.fillString(this.SELLINGPLACE, 3));
        //05 A728COUVTA   PIC X(02).
        strValue.append(Functions.fillString(this.COUVTA, 2));
        //05 A728CTYEMI   PIC X(03).
        strValue.append(Functions.fillString(this.ISSUEPLACE, 3));
        //05 A728COUEMI   PIC X(02).
        strValue.append(Functions.fillString(this.COUEMI, 2));
        //05 A728AJTRAM   PIC X(01).
        strValue.append(Functions.fillString(this.AJTRAM, 1));  
        
        
        return String.valueOf(strValue).toUpperCase();
    }
    
    public String toStringTemp(String strAIRLIN) {
        //FUNCIÓN: SAVE
        
        StringBuffer strValue = new StringBuffer("");
        String strTemp = "";
        SubProrateSector sector = null;
        SubProrateSector sectorTemp = null;
        //05 A728AIRLIN       PIC X(03).
        strValue.append(strAIRLIN);
        //05 A728NROPRT       PIC 9(09).
        strValue.append(Functions.fillZeros(9, this.NROPRT));
        //05 A728SEQPRT       PIC 9(02).
        strValue.append(Functions.fillZeros(2, this.SEQPRT));
        //05 A728TUSO         PIC X(02).
        strValue.append(Functions.fillZeros(2, this.TUSO));
        //05 A728CIA          PIC X(03).
        strValue.append(this.DOCNBR.substring(0, 3));
        //05 A728NRODOC       PIC X(10).
        strValue.append(this.DOCNBR.substring(3, 13));
        //05 A728CUPON        PIC X(01).
        strValue.append(this.DOCNBR.substring(13, 14));
        //05 A728DCHEQ        PIC X(01).
        strValue.append(Functions.fillString(this.DCHEQ, 1));
        //05 A728TVENTA       PIC X(01).
        strValue.append(Functions.fillString(this.TVENTA, 1));
        //05 A728CODIT        PIC X(20).
        strValue.append(Functions.fillString(this.IT, 20));
        //05 A728FECVTA       PIC X(08).
        strValue.append(Functions.fillString(this.ISSUEDATE, 8));
        //05 A728FECFAC       PIC X(08).
        strValue.append(Functions.fillString(this.BILLINGDATE, 8));
        //05 A728PORDES       PIC 9(03)V99.
        strValue.append(Functions.fillZeros(5, String.valueOf(Math.round(this.DISCC*100))));
        //05 A728RUTORG       PIC X(03).
        strValue.append(Functions.fillString(this.INIT, 3));
        //05 A728TDESC        PIC X(02).
        strValue.append(Functions.fillString(this.DISCT, 2));
        //05 A728TCAREG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.TCAREG*1000000))));
        //05 A728MONREG       PIC X(03).
        strValue.append(Functions.fillString(this.MONREG, 3));
        //05 A728TCASYS       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.TCASYS*1000000))));
        //05 A728MONSYS       PIC X(03).
        strValue.append(Functions.fillString(this.RCURR, 3));
        //05 A728MONEDA       PIC X(03).
        strValue.append(Functions.fillString(this.FCURR, 3));
        //05 A728TARIFA       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.FARE*100))));
        //05 A728MDAPAG       PIC X(03).
        strValue.append(Functions.fillString(this.ECURR, 3));
        //05 A728TRFPAG       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.EQVFARE*100))));
        //05 A728TCAPAG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.TCAPAG*1000000))));
        //05 A728ATBP         PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.ATBP*100))));
        //05 A728MDAATB       PIC X(03).
        strValue.append(Functions.fillString(this.CURR, 3));
        //05 A728ROE          PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.ROE*1000000))));
        //05 A728CPLUSS       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.PLUSSC*100))));
        //05 A728CSOVER       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.STOPOVERC*100))));
        //05 A728QSOVER       PIC 9(02).
        strValue.append(Functions.fillZeros(2, String.valueOf(Math.round(this.STOPOVERQ))));
        //05 A728TAJUST       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.NET*100))));
        //05 A728FBASE        PIC X(10).
        strValue.append(Functions.fillString(this.FABASIS, 10));
        //05 A728LOHO         PIC X(3).
        strValue.append(Functions.fillString(this.LOHO, 3));
        //05 A728AIRFAC       PIC X(3).
        strValue.append(this.BILLINGAIRLINE);
        //05 A728INDSAM       PIC X(1).
        strValue.append(Functions.fillString(this.INDSAM, 1));
        //05 A728INDPRT       PIC 9(2).
        strValue.append(Functions.fillZeros(2, String.valueOf(this.INDPRT)));
        //05 A728IPLUS        PIC X(1).
        strValue.append(Functions.fillString(this.PLUSSI, 1));
        //05 A728SECOR        PIC X(3).
        strValue.append(Functions.fillString(this.SORIGIN, 3));
        //05 A728SECDS        PIC X(3).
        strValue.append(Functions.fillString(this.SDESTINY, 3));
        //05 A728SELEC        PIC X(8).
        strValue.append(Functions.fillString(this.PLUSSI, 8));
        //05 A728FVLO1        PIC X(8).
        strValue.append(Functions.fillString(this.FLIGHTDATE, 8));
        //05 FUNC         PIC X(10).
        strValue.append(Functions.fillString(this.FUNC, 10));
        //289
        String city="";
        for(int i=0;i<SECTORS.size();i++) {
            sector = SECTORS.getSubProrateSector(i);
            
            if (i != 0) {

                //06 IDENTI       PIC X(2).
                //06 NUMERO       PIC X(2).
                strValue.append("**");
                strValue.append(Functions.fillZeros(2, String.valueOf(i)));
                //06 XO       PIC X.
                //==================================================================
                strTemp = "";
                if (i + 1 < SECTORS.size()) {
                    sectorTemp = SECTORS.getSubProrateSector(i + 1);
                    strTemp = sectorTemp.getXO();
                    sectorTemp = null;
                }
                //==================================================================
                strValue.append(Functions.fillString(strTemp, 1));
                //06 RUTAO     PIC X(03).
                if(!Functions.fillString(sector.getCARR(), 2).equals("") &&
                        !Functions.fillString(sector.getCARR(), 2).equals("..")) {
                    strValue.append(Functions.fillString(city.trim().toUpperCase(), 3));
                }else{
                    strValue.append(Functions.fillString("", 3));
                }
                //06 RUTAD     PIC X(03).
                strValue.append(Functions.fillString(sector.getOD(), 3));
                
                //06 VIA1      PIC X(02).
                strValue.append(Functions.fillString(sector.getVIA(), 2));
                //06 CARRN1    PIC X(03).
                strValue.append(Functions.fillString(sector.getCARRN(), 3));
                //06 CARRA1    PIC X(02).
                strValue.append(Functions.fillString(sector.getCARR(), 2));
                //06 NVLO1     PIC X(05).
                strValue.append(Functions.fillString(sector.getNFLIGHT(), 5));
                //06 FCVLO1    PIC X(08).
                strValue.append(Functions.fillString(sector.getFCVLO(), 8));
                //06 BOOKI1    PIC X(01).
                strValue.append(Functions.fillString(sector.getRBD(), 1));
                //06 CLASE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getCLASE(), 1));
                //06 FBASE1    PIC X(10).
                strValue.append(Functions.fillString(sector.getFBASE(), 10));
                //06 LOHO      PIC X(03).
                strValue.append(Functions.fillString(sector.getLOHO(), 3));
                //06 TBASE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getTBASE(), 1));
                //06 STBAS1    PIC X(02).
                strValue.append(Functions.fillString(sector.getSTBAS(), 2));
                //06 FARE1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getXFARE() * 100))));
                //06 TFARE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getTFARE(), 1));
                //06 DIFER1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDIFER() * 100))));
                //06 FDIFE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getFDIFE(), 1));
                //06 TRFM1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getTRFM() * 100))));
                //06 MNTFM1    PIC X(03).
                strValue.append(Functions.fillString(sector.getMNTFM(), 3));
                //06 SS1       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getSURCHARGE() * 100))));
                //06 PLUSS1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getPLUSS() * 100))));
                //06 STOP1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getSTOP() * 100))));
                //06 MNACU1    PIC X(03).
                strValue.append(Functions.fillString(sector.getMNACU(), 3));
                //06 ACUE1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getACUE() * 100))));
                //06 FACT1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getFACTOR() * 100))));
                //06 TARI1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getFARE() * 100))));
                //***************************************************************************************
                //06 YANQ1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getYANQ() * 100))));

                //06 PPRO1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getPROVISOP() * 100))));
                //06 SUBPA1    PIC X(20).
                strValue.append(Functions.fillString(sector.getSUBPA(), 20));
                //06 PROV1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getPROVISOC() * 100))));
                //06 ACUEO1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getSPA() * 100))));
                //06 ACUCO1    PIC X(20).
                strValue.append(Functions.fillString(sector.getACUCO(), 20));
                //06 AJUST1    PIC 9(13)V99.            
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getADJUST() * 100))));
                //06 VALOR1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getAMOUNT() * 100))));
                //06 SPA       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getSPA() * 100))));
                //06 VLMPA1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getVLMPA() * 100))));
                //06 VLSRP1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getVLSRP() * 100))));
                //06 INDPR1    PIC X.
                strValue.append(Functions.fillString(sector.getINDPR(), 1));
                //06 INDISC    PIC X(1).
                strValue.append(Functions.fillString(sector.getINDISC(), 1));
                //06 ISC       PIC 9(7)V99.
                strValue.append(Functions.fillZeros(9, String.valueOf(Math.round(sector.getISC() * 100))));
                //06 COEFIC    PIC 9(8)V9(5).
                strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(sector.getCOEFIC() * 100000))));
                //06 ACUBAS    PIC X(4).
                strValue.append(Functions.fillString(sector.getACUBAS(), 4));
                //06 ACUSTS    PIC X(1).
                strValue.append(Functions.fillString(sector.getACUSTS(), 1));
                //06 PRVSTS    PIC X(2).
                strValue.append(Functions.fillString(sector.getPRVSTS(), 2));

            }
            city= sector.getOD();
        }
        //398  398
        for(int i=SECTORS.size();i<51;i++) {
            //06 IDENTI       PIC X(2).
            //06 NUMERO       PIC X(2).
            strValue.append("  00");
            //06 XO       PIC X.
            strValue.append(Functions.fillString("", 1));
            //06 RUTAO     PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 RUTAD     PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 VIA1      PIC X(02).
            strValue.append(Functions.fillString("", 2));
            //06 CARRN1    PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 CARRA1    PIC X(02).
            strValue.append(Functions.fillString("", 2));
            //06 NVLO1     PIC X(05).
            strValue.append(Functions.fillString("", 5));
            //06 FCVLO1    PIC X(08).
            strValue.append(Functions.fillString("", 8));
            //06 BOOKI1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 CLASE1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 FBASE1    PIC X(10).
            strValue.append(Functions.fillString("", 10));
            //06 LOHO      PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 TBASE1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 STBAS1    PIC X(02).
            strValue.append(Functions.fillString("", 2));
            //06 FARE1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 TFARE1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 DIFER1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 FDIFE1    PIC X(01).
            strValue.append(Functions.fillString("", 1));
            //06 TRFM1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 MNTFM1    PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 SS1       PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 PLUSS1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 STOP1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 MNACU1    PIC X(03).
            strValue.append(Functions.fillString("", 3));
            //06 ACUE1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 FACT1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 TARI1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 YANQ1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 PPRO1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 SUBPA1    PIC X(20).
            strValue.append(Functions.fillString("", 20));
            //06 PROV1     PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 ACUEO1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 ACUCO1    PIC X(20).
            strValue.append(Functions.fillString("", 20));
            //06 AJUST1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 VALOR1    PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            //06 SPA       PIC 9(13)V99.
            strValue.append(Functions.fillZeros(15, ""));
            if (i == 50) {
                //06 VLMPA1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(this.VALMINIMOTARIFA * 100))));
                //06 VLSRP1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(this.VALMINIMOTAX * 100))));
            } else {
                //06 VLMPA1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, ""));
                //06 VLSRP1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, ""));
            }            
            //06 INDPR1    PIC X.
            strValue.append(Functions.fillString("", 1));
            //06 INDISC    PIC X(1).
            strValue.append(Functions.fillString("", 1));
            //06 ISC       PIC 9(7)V99.
            strValue.append(Functions.fillZeros(9, ""));
            //06 COEFIC    PIC 9(8)V9(5).
            strValue.append(Functions.fillZeros(13, ""));
            //06 ACUBAS    PIC X(4).
            strValue.append(Functions.fillString("", 4));
            //06 ACUSTS    PIC X(1).
            strValue.append(Functions.fillString("", 1));
            //06 PRVSTS    PIC X(2).
            strValue.append(Functions.fillString("", 2));
        }
        
        //19900
             
        //05 DSCR         PIC X(30).
        strValue.append(Functions.fillString("", 30));
        //05 MSG          PIC X(40).
        strValue.append(Functions.fillString("", 40));
        //05 USER         PIC X(10).
        strValue.append(Functions.fillString(this.strUser, 10));
        //05 A728CODTAX   PIC X(10).
        strValue.append(Functions.fillString(this.MISC, 10));
        //05 A728GRUPO    PIC X(06).
        strValue.append(Functions.fillString(this.GRUPO, 6));
        //05 A728CTYVTA   PIC X(03).
        strValue.append(Functions.fillString(this.SELLINGPLACE, 3));
        //05 A728COUVTA   PIC X(02).
        strValue.append(Functions.fillString(this.COUVTA, 2));
        //05 A728CTYEMI   PIC X(03).
        strValue.append(Functions.fillString(this.ISSUEPLACE, 3));
        //05 A728COUEMI   PIC X(02).
        strValue.append(Functions.fillString(this.COUEMI, 2));
        //05 A728AJTRAM   PIC X(01).
        strValue.append(Functions.fillString(this.AJTRAM, 1));
        
        return String.valueOf(strValue).toUpperCase();
        
    }
    
    public void loadData(String strData, String calfa, UserView user) {
        try {
            SubProrateSector sector = null;
            //05 A728NROPRT       PIC 9(09).
            this.NROPRT = strData.substring(3,12);
            //05 A728SEQPRT       PIC 9(02).
            this.SEQPRT = strData.substring(12,14);
            //05 A728TUSO         PIC X(02).
            this.TUSO = strData.substring(14,16);
            //05 A728CIA          PIC X(03).
            //05 A728NRODOC       PIC X(10).
            //05 A728CUPON        PIC X(01).
            this.DOCNBR = strData.substring(16,30);
            //05 A728DCHEQ P       PIC X(01).
            this.DCHEQ = strData.substring(30,31);
            //05 A728TVENTA       PIC X(01).
            this.TVENTA = strData.substring(31,32);
            //05 A728CODIT        PIC X(20).
            this.IT = strData.substring(32,52).trim();
            //05 A728FECVTA       PIC X(08).
            this.ISSUEDATE = strData.substring(52,60);
            //05 A728FECFAC       PIC X(08).
            this.BILLINGDATE = strData.substring(60,68);
            //05 A728PORDES       PIC 9(03)V99.
            this.DISCC = Double.parseDouble(strData.substring(68,73))/100;
            //05 A728RUTORG       PIC X(03).
            this.INIT = strData.substring(73,76);
            //05 A728TDESC        PIC X(02).
            this.DISCT = strData.substring(76,78);
            //05 A728TCAREG       PIC 9(10)V9(6).
            this.TCAREG = Double.parseDouble(strData.substring(78,94))/1000000;
            //05 A728MONREG       PIC X(03).
            this.MONREG = strData.substring(94,97);
            //05 A728TCASYS       PIC 9(10)V9(6).
            this.TCASYS = Double.parseDouble(strData.substring(97,113))/1000000;
            //05 A728MONSYS       PIC X(03).
            this.RCURR = strData.substring(113,116);
            //05 A728MONEDA       PIC X(03).
            this.FCURR = strData.substring(116,119);
            //05 A728TARIFA       PIC 9(11)V99.
            this.FARE = Double.parseDouble(strData.substring(119,132))/100;
            //05 A728MDAPAG       PIC X(03).
            this.ECURR = strData.substring(132,135);
            //05 A728TRFPAG       PIC 9(11)V99.
            this.EQVFARE = Double.parseDouble(strData.substring(135,148))/100;
            //05 A728TCAPAG       PIC 9(10)V9(6).
            this.TCAPAG = Double.parseDouble(strData.substring(148,164))/1000000;
            //05 A728ATBP         PIC 9(11)V99.
            this.ATBP = Double.parseDouble(strData.substring(164,177))/100;
            //05 A728MDAATB       PIC X(03).
            this.CURR = strData.substring(177,180);
            //05 A728ROE          PIC 9(10)V9(6).
            this.ROE = Double.parseDouble(strData.substring(180,196))/1000000;
            //05 A728CPLUSS       PIC 9(11)V99.
            this.PLUSSC = Double.parseDouble(strData.substring(196,209))/100;
            //05 A728CSOVER       PIC 9(11)V99.
            this.STOPOVERC = Double.parseDouble(strData.substring(209,222))/100;
            //05 A728QSOVER       PIC 9(02).
            this.STOPOVERQ = Integer.parseInt(strData.substring(222,224));
            try {
                //05 A728TAJUST       PIC 9(11)V99.
                if (Functions.deleteZerosLeft(strData.substring(224, 237)).indexOf("-") < 0) {
                    this.NET = Double.parseDouble(Functions.deleteZerosLeft(strData.substring(224, 237))) / 100;
                } else {
                    this.NET = (-1) * (Double.parseDouble(Functions.deleteZerosLeft(strData.substring(224, 237)).replaceAll("-", "")) / 100);
                }
            } catch (Exception e) {
                this.NET = 0;
            }
            
            //05 A728FBASE        PIC X(10).
            this.FABASIS = strData.substring(237,247).trim();
            //05 A728LOHO         PIC X(03).
            this.LOHO = strData.substring(247,250).trim();
            //05 A728AIRFAC       PIC X(03).
            this.BILLINGAIRLINE = strData.substring(250,253);
            //05 A728INDSAM       PIC X(01).
            this.INDSAM = strData.substring(253,254);
            //05 A728INDPRT       PIC 9(02).
            this.INDPRT = Integer.parseInt(strData.substring(254,256));
            //05 A728IPLUS        PIC X(01).
            this.PLUSSI = strData.substring(256,257);
            //05 A728SECOR        PIC X(03).
            this.SORIGIN = strData.substring(257,260);
            //05 A728SECDS        PIC X(03).
            this.SDESTINY = strData.substring(260,263);
            //05 A728SELEC        PIC X(08).
            this.PLUSSI = strData.substring(263,271);
            //05 A728FVLO1        PIC X(08).
            this.FLIGHTDATE = strData.substring(271,279);
            
            SECTORS.clear();
            int itemp = 0;
            for(int i=0;i<50;i++) {
                itemp = (i-1)*398;
                if(i==0) {
                    
                    sector = new SubProrateSector();
                    //06 RUTAO     PIC X(03).
                    sector.setOD(strData.substring(294,297));
                    SECTORS.add(sector);
                    
                }else{
                    
                    if(!strData.substring(itemp + 305, itemp + 307).trim().equals("")) {
                        sector = new SubProrateSector();
                        //06 XO       PIC X.
                        sector.setXO(strData.substring(itemp + 293, itemp + 294));
                        //06 RUTAD     PIC X(03).
                        sector.setOD(strData.substring(itemp + 297, itemp + 300));
                        //06 VIA1      PIC X(02).
                        sector.setVIA(strData.substring(itemp + 300, itemp + 302));
                        //06 CARRN1    PIC X(03).
                        sector.setCARRN(strData.substring(itemp + 302, itemp + 305));
                        //06 CARRA1    PIC X(02).
                        sector.setCARR(strData.substring(itemp + 305, itemp + 307));
                        //06 NVLO1     PIC X(05).
                        sector.setNFLIGHT(strData.substring(itemp + 307, itemp + 312));
                        //06 FCVLO1    PIC X(08).
                        sector.setFCVLO(strData.substring(itemp + 312, itemp + 320));
                        //06 BOOKI1    PIC X(01).
                        sector.setRBD(strData.substring(itemp + 320, itemp + 321));
                        //06 CLASE1    PIC X(01).
                        sector.setCLASE(strData.substring(itemp + 321, itemp + 322));
                        //06 FBASE1    PIC X(10).
                        sector.setFBASE(strData.substring(itemp + 322, itemp + 332));
                        //06 LOHO      PIC X(03).
                        sector.setLOHO(strData.substring(itemp + 332, itemp + 335));
                        //06 TBASE1    PIC X(01).
                        sector.setTBASE(strData.substring(itemp + 335, itemp + 336));
                        //06 STBAS1    PIC X(02).
                        sector.setSTBAS(strData.substring(itemp + 336, itemp + 338));
                        //06 FARE1     PIC 9(13)V99.
                        sector.setXFARE(Double.parseDouble(strData.substring(itemp + 338, itemp + 353))/100);
                        //06 TFARE1    PIC X(01).
                        sector.setTFARE(strData.substring(itemp + 353, itemp + 354));
                        //06 DIFER1    PIC 9(13)V99.
                        sector.setDIFER(Double.parseDouble(strData.substring(itemp + 354, itemp + 369))/100);
                        //06 FDIFE1    PIC X(01).
                        sector.setFDIFE(strData.substring(itemp + 369, itemp + 370));
                        //06 TRFM1     PIC 9(13)V99.
                        sector.setTRFM(Double.parseDouble(strData.substring(itemp + 370, itemp + 385))/100);
                        //06 MNTFM1    PIC X(03).
                        sector.setMNTFM(strData.substring(itemp + 385, itemp + 388));
                        //06 SS1       PIC 9(13)V99.
                        sector.setSURCHARGE(Double.parseDouble(strData.substring(itemp + 388, itemp + 403))/100);
                        //06 PLUSS1    PIC 9(13)V99.
                        sector.setPLUSS(Double.parseDouble(strData.substring(itemp + 403, itemp + 418))/100);
                        //06 STOP1     PIC 9(13)V99.
                        sector.setSTOP(Double.parseDouble(strData.substring(itemp + 418, itemp + 433))/100);
                        //06 MNACU1    PIC X(03).
                        sector.setMNACU(strData.substring(itemp + 433, itemp + 436));
                        //06 ACUE1     PIC 9(13)V99.
                        sector.setACUE(Double.parseDouble(strData.substring(itemp + 436, itemp + 451))/100);
                        //06 FACT1     PIC 9(13)V99.
                        sector.setFACTOR(Long.parseLong(strData.substring(itemp + 451, itemp + 466))/100);
                        //06 TARI1     PIC 9(13)V99.
                        sector.setFARE(Double.parseDouble(strData.substring(itemp + 466, itemp + 481))/100);
                        //06 YANQ1     PIC 9(13)V99.
                        sector.setYANQ(Double.parseDouble(strData.substring(itemp + 481, itemp + 496))/100);
                        //06 PPRO1     PIC 9(13)V99.
                        sector.setPROVISOP(Double.parseDouble(strData.substring(itemp + 496, itemp + 511))/100);
                        //06 SUBPA1    PIC X(20).
                        sector.setSUBPA(strData.substring(itemp + 511, itemp + 531));
                        //06 PROV1     PIC 9(13)V99.
                        sector.setPROVISOC(Double.parseDouble(strData.substring(itemp + 531, itemp + 546))/100);
                        //06 ACUEO1    PIC 9(13)V99.
                        sector.setSPA(Double.parseDouble(strData.substring(itemp + 546, itemp + 561))/100);
                        //06 ACUCO1    PIC X(20).
                        sector.setACUCO(strData.substring(itemp + 561, itemp + 581));
                        //06 AJUST1    PIC 9(13)V99.
                        try {
                            if (Functions.deleteZerosLeft(strData.substring(itemp + 581, itemp + 596)).indexOf("-") < 0) {
                                sector.setADJUST(Double.parseDouble(Functions.deleteZerosLeft(strData.substring(itemp + 581, itemp + 596))) / 100);
                            } else {
                                sector.setADJUST((-1) * (Double.parseDouble(Functions.deleteZerosLeft(strData.substring(itemp + 581, itemp + 596)).replaceAll("-", "")) / 100));
                            }
                        } catch (Exception e) {
                            sector.setADJUST(Functions.obtenerValorEquivalenteEBCDIC(strData.substring(itemp + 581, itemp + 596)));
                        }
                        
                        //06 VALOR1    PIC 9(13)V99.
                        sector.setAMOUNT(Double.parseDouble(strData.substring(itemp + 596, itemp + 611))/100);
                        //06 VLMPA1    PIC 9(13)V99.
                        sector.setVLMPA(Double.parseDouble(strData.substring(itemp + 626, itemp + 641))/100);
                        //06 VLSRP1    PIC 9(13)V99.
                        sector.setVLSRP(Double.parseDouble(strData.substring(itemp + 641, itemp + 656))/100);
                        //06 INDPR1    PIC X.
                        sector.setINDPR(strData.substring(itemp + 656, itemp + 657));
                        
                        if(sector.getINDPR().equals("S")) {
                            sector.setAMTV("SRP");
                        }else if(sector.getINDPR().equals("A")) {
                            sector.setAMTV("SPA");
                        }else if(sector.getINDPR().equals("M") || sector.getINDPR().equals("P")) {
                            sector.setAMTV("MPA");
                        }else if(sector.getINDPR().equals("R")) {
                            sector.setAMTV("RTW");
                        }else if(sector.getINDPR().equals("H")) {
                            sector.setAMTV("ACH");
                        }else{
                            sector.setAMTV("");
                        }
                        
                        //06 INDISC    PIC X(1).
                        sector.setINDISC(strData.substring(itemp + 657, itemp + 658));
                        //06 ISC       PIC 9(7)V99.
                        sector.setISC(Double.parseDouble(strData.substring(itemp + 658, itemp + 667))/100);
                        //06 COEFIC    PIC 9(8)V9(5).
                        sector.setCOEFIC(Double.parseDouble(strData.substring(itemp + 667, itemp + 680))/100000);
                        //06 ACUBAS    PIC X(4).
                        sector.setACUBAS(strData.substring(itemp + 680, itemp + 684));
                        //06 ACUSTS    PIC X(1).
                        sector.setACUSTS(strData.substring(itemp + 684, itemp + 685));
                        //06 PRVSTS    PIC X(2).
                        sector.setPRVSTS(strData.substring(itemp + 685, itemp + 687));
                       
                        
                        if (SECTORS.getSubProrateSector(SECTORS.size() - 1).getOD().trim().equals(this.SORIGIN.trim()) && sector.getOD().trim().equals(this.SDESTINY.trim())) {
                            SECTORS.getSubProrateSector(SECTORS.size() - 1).setEsSector("solo");
                            sector.setEsSector("todo");
                        } else {
                            sector.setEsSector("");
                        }
                        
                        SECTORS.add(sector);
                        
                    }else{
                        i = 51;
                    }
                }
            }
            
            //05 MSG          PIC X(40).
            this.MSGERR = strData.substring(20219, 20259).trim();
            //05 USER         PIC X(10).
            //this.A020USER = strData.substring(20259, 20269).trim();
            //05 A728CODTAX   PIC X(10).
            this.MISC = strData.substring(20269, 20279).trim();
            //05 A728GRUPO    PIC X(06).
            this.GRUPO = strData.substring(20279, 20285);
            //05 A728CTYVTA   PIC X(03).
            this.SELLINGPLACE = strData.substring(20285, 20288);
            //05 A728COUVTA   PIC X(02).
            this.COUVTA = strData.substring(20288, 20290);
            //05 A728CTYEMI   PIC X(03).
            this.ISSUEPLACE = strData.substring(20290, 20293);
            //05 A728COUEMI   PIC X(02).
            this.COUEMI = strData.substring(20293, 20295);
            //05 A728AJTRAM   PIC X(01).
            this.AJTRAM = strData.substring(20295, 20296);
            
            
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    
    
    /**
     * Holds value of property MSGERR.
     */
    private String MSGERR;
    
    public String getMSGERR() {
        return this.MSGERR;
    }
    
    public void setMSGERR(String MSGERR) {
        this.MSGERR = MSGERR;
    }
    
    /**
     * Holds value of property FUNC.
     */
    private String FUNC;
    
    public String getFUNC() {
        return this.FUNC;
    }
    
    public void setFUNC(String FUNC) {
        this.FUNC = FUNC;
    }
    
    /**
     * Holds value of property RUTAORIGENDESTINO.
     */
    private String RUTAORIGENDESTINO;
    
    public String getRUTAORIGENDESTINO() {
        return this.RUTAORIGENDESTINO;
    }
    
    public void setRUTAORIGENDESTINO(String RUTAORIGENDESTINO) {
        this.RUTAORIGENDESTINO = RUTAORIGENDESTINO;
    }
    
    /**
     * Holds value of property strAdditionalInfo.
     */
    private String strAdditionalInfo;
    
    public String getStrAdditionalInfo() {
        return this.strAdditionalInfo;
    }
    
    public void setStrAdditionalInfo(String strAdditionalInfo) {
        this.strAdditionalInfo = strAdditionalInfo;
    }
    
    /**
     * Flag para ver métodos de Clonación, Selección, etc. (Masivo)
     */
    private String strFlag;
    
    public String getStrFlag() {
        return this.strFlag;
    }
    
    public void setStrFlag(String strFlag) {
        this.strFlag = strFlag;
    }
    
    /**
     * Holds value of property strCHS (Cámara de Compensación).
     */
    private String strCHS;

    public String getStrCHS() {
        return this.strCHS;
    }

    public void setStrCHS(String strCHS) {
        this.strCHS = strCHS;
    }
    
    /**
     * Holds value of property A020SUFECH.
     */
    private String A020SUFECH;

    public String getA020SUFECH() {
        return this.A020SUFECH;
    }

    public void setA020SUFECH(String A020SUFECH) {
        this.A020SUFECH = A020SUFECH;
    }
    
    /**
     * Holds value of property A020FUSO.
     */
    private String A020FUSO;

    public String getA020FUSO() {
        return this.A020FUSO;
    }

    public void setA020FUSO(String A020FUSO) {
        this.A020FUSO = A020FUSO;
    }
    
    /**
     * Holds value of property FTIMELIM.
     */
    private String FTIMELIM;
    
    public String getFTIMELIM() {
        return this.FTIMELIM;
    }
    
    public void setFTIMELIM(String FTIMELIM) {
        this.FTIMELIM = FTIMELIM;
    }
    
    /**
     * Holds value of property VALMINIMOTARIFA.
     */
    private double VALMINIMOTARIFA;
    
    public double getVALMINIMOTARIFA() {
        return this.VALMINIMOTARIFA;
    }
    
    public void setVALMINIMOTARIFA(double VALMINIMOTARIFA) {
        this.VALMINIMOTARIFA = VALMINIMOTARIFA;
    }
    
    /**
     * Holds value of property VALMINIMOTAX.
     */
    private double VALMINIMOTAX; 
    
    public double getVALMINIMOTAX() {
        return this.VALMINIMOTAX;
    }
    
    public void setVALMINIMOTAX(double VALMINIMOTAX) {
        this.VALMINIMOTAX = VALMINIMOTAX;
    }
    
    /**
     * Holds value of property A021CONCEP01.
     */
    private String A021CONCEP01;
    
    public String getA021CONCEP01() {
        return this.A021CONCEP01;
    }
    
    public void setA021CONCEP01(String A021CONCEP01) {
        this.A021CONCEP01 = A021CONCEP01;
    }
    
    /**
     * Holds value of property A021CONCEP02.
     */
    private String A021CONCEP02; 
    
    public String getA021CONCEP02() {
        return this.A021CONCEP02;
    }
    
    public void setA021CONCEP02(String A021CONCEP02) {
        this.A021CONCEP02 = A021CONCEP02;
    }
    
    /**
     * Holds value of property A021CONCEP03.
     */
    private String A021CONCEP03;
    
    public String getA021CONCEP03() {
        return this.A021CONCEP03;
    }
    
    public void setA021CONCEP03(String A021CONCEP03) {
        this.A021CONCEP03 = A021CONCEP03;
    }
    
    /**
     * Holds value of property A021CONCEP04.
     */
    private String A021CONCEP04;
    
    public String getA021CONCEP04() {
        return this.A021CONCEP04;
    }
    
    public void setA021CONCEP04(String A021CONCEP04) {
        this.A021CONCEP04 = A021CONCEP04;
    }
    
    /**
     * Holds value of property A021CONCEP05.
     */
    private String A021CONCEP05;
    
    public String getA021CONCEP05() {
        return this.A021CONCEP05;
    }
    
    public void setA021CONCEP05(String A021CONCEP05) {
        this.A021CONCEP05 = A021CONCEP05;
    }
    
    
}
