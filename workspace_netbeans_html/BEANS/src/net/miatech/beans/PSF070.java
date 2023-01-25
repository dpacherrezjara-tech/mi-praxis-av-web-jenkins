/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author claudia
 */
public class PSF070 implements Serializable{
   
    private String CCUST;
    private String NAID;
    private String CCIA;
    private String FORMA;
    private String SERIE;
    private String SEQ;
    private String TIPOF;
    private String ESTADO;
    private String CNJNC;
    private String FUENTE;
    private String WRECEP;
    private String USERCA;
    private String CCIAF;
    private String BASEI;
    private String NFLIGHTI;
    private String DFLIGHTI;
    private String DIVERSCIA;
    private String REASON;
    private String CDEPART1;
    private String CARRIVA1;
    private String NFLIGHT1;
    private String DFLIGHT1;
    private String CARRIER1;
    private String CDEPART2;
    private String CARRIVA2;
    private String NFLIGHT2;
    private String DFLIGHT2;
    private String CARRIER2;
    private double QCUPOF;
    private double QPAXOF;
    private String YASTATUS;
    private String YDATE;
    private String YSGUIA;
    private String WASTATUS;
    private String WDATE;
    private String WSGUIA;
    private String SASTATUS;
    private String SDATE;
    private String SHOCR;
    private String USCR;
    private String FECR;
    private String HOCR;
    private String USUP;
    private String FEUP;
    private String HOUP;
    //Variables de Filtro
    private String yearFrom;
    private String yearTo;
    private String monthFrom;
    private String monthTo;
    private String dayFrom;
    private String dayTo;
    private long PENDIENTE;
    private long PROCESADO;
    private long ONLYYELLOW;
    private long ONLYWHITE;
    private long MATCH;
    private long SIRAX;
    private String FECHAFORMAT;

    private int orden;
    
    private int cont=0;
    private double amount1;
    private double amount2;
    private String MONED;
   //Variables de ticket imagen 
   public String TICKET;
   public String BACK = "";
   public String RUTAIMG = "";
   public List lstTickets = new ArrayList(0);
   public int INDICE = 0;
   public String OBSERV = "";
   public String CUPONT = "";
   public String CCIAT = "";
   public String FORMAT = "";
   public String SERIET = "";
   public String STVAL = "";
   public String FBASIS = "";
   
   public String TPAX = "";
   public String CLASE1 = "";
   public String CLASE2 = "";
   public String FLAGPK = "";
   public double QPZSKLG = 0;
   
   
   
   
   
    public PSF070() {

        CCUST = "";
        NAID = "";
        CCIA = "";
        FORMA = "";
        SERIE = "";
        SEQ = "";
        TIPOF = "";
        ESTADO = "";
        CNJNC = "";
        WRECEP = "";
        USERCA = "";
        CCIAF = "";
        BASEI = "";
        NFLIGHTI = "";
        DFLIGHTI = "";
        DIVERSCIA = "";
        REASON = "";
        CDEPART1 = "";
        CARRIVA1 = "";
        NFLIGHT1 = "";
        DFLIGHT1 = "";
        CARRIER1 = "";
        CDEPART2 = "";
        CARRIVA2 = "";
        NFLIGHT2 = "";
        DFLIGHT2 = "";
        CARRIER2 = "";
        QCUPOF = 0;
        QPAXOF = 0;
        YASTATUS = "";
        YDATE = "";
        YSGUIA = "";
        WASTATUS = "";
        WDATE = "";
        WSGUIA = "";
        SASTATUS = "";
        SDATE = "";
        SHOCR = "";
        USCR = "";
        FECR = "";
        HOCR = "";
        USUP = "";
        FEUP = "";
        HOUP = "";
        yearFrom = "";
        yearTo = "";
        monthFrom = "";
        monthTo = "";
        dayFrom = "";
        dayTo = "";
        

        PENDIENTE = 0;
        PROCESADO = 0;
        ONLYYELLOW = 0;
        ONLYWHITE = 0;
        MATCH = 0;
        SIRAX = 0;

        orden = 0;

        FECHAFORMAT = "";
        
        
        amount1=0.00;
        amount2=0.00;
        MONED="";
        TICKET = "";
        
    }

    /**
     * @return the CCUST
     */
    public String getCCUST() {
        return CCUST;
    }

    /**
     * @param CCUST the CCUST to set
     */
    public void setCCUST(String CCUST) {
        this.CCUST = CCUST;
    }
    
    
    
      public String getFLAGPK() {
        return FLAGPK;
    }

    /**
     * @param FLAGPK the CCUST to set
     */
    public void setFLAGPK(String CCUST) {
        this.FLAGPK = FLAGPK;
    }
    
    
    
    
    
      public String getCLASE2() {
        return CLASE2;
    }

    /**
     * @param CLASE2 the CCUST to set
     */
    public void setCLASE2(String CLASE2) {
        this.CLASE2 = CLASE2;
    }
    
    
    
    
        public String getCLASE1() {
        return CLASE1;
    }

    /**
     * @param CLASE1 the CCUST to set
     */
    public void setCLASE1(String CLASE1) {
        this.CLASE1 = CLASE1;
    }
    
    
       public String getTPAX() {
        return TPAX;
    }

    /**
     * @param TPAX the CCUST to set
     */
    public void setTPAX(String TPAX) {
        this.TPAX = TPAX;
    }
    
    
      public String getFBASIS() {
        return     FBASIS;
    }

    /**
     * @param FBASIS the CCUST to set
     */
    public void setFBASIS(String FBASIS) {
        this.FBASIS=  FBASIS;
    }
    
    
    
       public String getSTVAL() {
        return STVAL;
    }

    /**
     * @param STVAL the CCUST to set
     */
    public void setSTVAL(String STVAL) {
        this.STVAL = STVAL;
    }
    
    
    
    public String getSERIET() {
        return SERIET;
    }

    /**
     * @param SERIET the CCUST to set
     */
    public void setSERIET(String SERIET) {
        this.SERIET = SERIET;
    }
    
     public String getFORMAT() {
        return FORMAT;
    }

    /**
     * @param FORMAT the CCUST to set
     */
    public void setFORMAT(String FORMAT) {
        this.FORMAT = FORMAT;
    }
    
            
            
        public String getCCIAT() {
        return CCIAT;
    }

    /**
     * @param CCIAT the CCUST to set
     */
    public void setCCIAT(String CCIAT) {
        this.CCIAT = CCIAT;
    }
    
    
    
    
        public String getCUPONT() {
        return CUPONT;
    }

    /**
     * @param CUPONT the CCUST to set
     */
    public void setCUPONT(String CUPONT) {
        this.CUPONT = CUPONT;
    }
    
    
    
      public String getOBSERV() {
        return OBSERV;
    }

    /**
     * @param OBSERV the CCUST to set
     */
    public void setOBSERV(String OBSERV) {
        this.OBSERV = OBSERV;
    }
    
    
     public int getINDICE() {
        return INDICE;
    }

    /**
     * @param INDICE the CCUST to set
     */
    public void setINDICE(int INDICE) {
        this.INDICE = INDICE;
    }
    
    
    
        public double getQPZSKLG() {
        return QPZSKLG;
    }

    /**
     * @param QPZSKLG the CCUST to set
     */
    public void setQPZSKLG(double QPZSKLG) {
        this.QPZSKLG = QPZSKLG;
    }
    
    

    /**
     * @return the NAID
     */
    public String getNAID() {
        return NAID;
    }

    /**
     * @param NAID the NAID to set
     */
    public void setNAID(String NAID) {
        this.NAID = NAID;
    }

    /**
     * @return the CCIA
     */
    public String getCCIA() {
        return CCIA;
    }

    /**
     * @param CCIA the CCIA to set
     */
    public void setCCIA(String CCIA) {
        this.CCIA = CCIA;
    }

    /**
     * @return the FORMA
     */
    public String getFORMA() {
        return FORMA;
    }

    /**
     * @param FORMA the FORMA to set
     */
    public void setFORMA(String FORMA) {
        this.FORMA = FORMA;
    }

    /**
     * @return the SERIE
     */
    public String getSERIE() {
        return SERIE;
    }

    /**
     * @param SERIE the SERIE to set
     */
    public void setSERIE(String SERIE) {
        this.SERIE = SERIE;
    }

    /**
     * @return the SEQ
     */
    public String getSEQ() {
        return SEQ;
    }

    /**
     * @param SEQ the SEQ to set
     */
    public void setSEQ(String SEQ) {
        this.SEQ = SEQ;
    }

    /**
     * @return the ESTADO
     */
    public String getESTADO() {
        return ESTADO;
    }

    /**
     * @param ESTADO the ESTADO to set
     */
    public void setESTADO(String ESTADO) {
        this.ESTADO = ESTADO;
    }

    public String getCNJNC() {
        return CNJNC;
    }

  
    public void setCNJNC(String CNJNC) {
        this.CNJNC = CNJNC;
    }
    
        public String getFUENTE() {
        return FUENTE;
    }

  
    public void setFUENTE(String FUENTE) {
        this.FUENTE = FUENTE;
    }
    
    /**
     * @return the USERCA
     */
    public String getUSERCA() {
        return USERCA;
    }

    /**
     * @param USERCA the USERCA to set
     */
    public void setUSERCA(String USERCA) {
        this.USERCA = USERCA;
    }

    /**
     * @return the CCIAF
     */
    public String getCCIAF() {
        return CCIAF;
    }

    /**
     * @param CCIAF the CCIAF to set
     */
    public void setCCIAF(String CCIAF) {
        this.CCIAF = CCIAF;
    }

    /**
     * @return the BASEI
     */
    public String getBASEI() {
        return BASEI;
    }

    /**
     * @param BASEI the BASEI to set
     */
    public void setBASEI(String BASEI) {
        this.BASEI = BASEI;
    }

    /**
     * @return the NFLIGHTI
     */
    public String getNFLIGHTI() {
        return NFLIGHTI;
    }

    /**
     * @param NFLIGHTI the NFLIGHTI to set
     */
    public void setNFLIGHTI(String NFLIGHTI) {
        this.NFLIGHTI = NFLIGHTI;
    }

    /**
     * @return the DFLIGHTI
     */
    public String getDFLIGHTI() {
        return DFLIGHTI;
    }

    /**
     * @param DFLIGHTI the DFLIGHTI to set
     */
    public void setDFLIGHTI(String DFLIGHTI) {
        this.DFLIGHTI = DFLIGHTI;
    }

    /**
     * @return the DIVERSCIA
     */
    public String getDIVERSCIA() {
        return DIVERSCIA;
    }

    /**
     * @param DIVERSCIA the DIVERSCIA to set
     */
    public void setDIVERSCIA(String DIVERSCIA) {
        this.DIVERSCIA = DIVERSCIA;
    }

    /**
     * @return the REASON
     */
    public String getREASON() {
        return REASON;
    }

    /**
     * @param REASON the REASON to set
     */
    public void setREASON(String REASON) {
        this.REASON = REASON;
    }

    /**
     * @return the CDEPART1
     */
    public String getCDEPART1() {
        return CDEPART1;
    }

    /**
     * @param CDEPART1 the CDEPART1 to set
     */
    public void setCDEPART1(String CDEPART1) {
        this.CDEPART1 = CDEPART1;
    }

    /**
     * @return the CARRIVA1
     */
    public String getCARRIVA1() {
        return CARRIVA1;
    }

    /**
     * @param CARRIVA1 the CARRIVA1 to set
     */
    public void setCARRIVA1(String CARRIVA1) {
        this.CARRIVA1 = CARRIVA1;
    }

    /**
     * @return the NFLIGHT1
     */
    public String getNFLIGHT1() {
        return NFLIGHT1;
    }

    /**
     * @param NFLIGHT1 the NFLIGHT1 to set
     */
    public void setNFLIGHT1(String NFLIGHT1) {
        this.NFLIGHT1 = NFLIGHT1;
    }

    /**
     * @return the DFLIGHT1
     */
    public String getDFLIGHT1() {
        return DFLIGHT1;
    }

    /**
     * @param DFLIGHT1 the DFLIGHT1 to set
     */
    public void setDFLIGHT1(String DFLIGHT1) {
        this.DFLIGHT1 = DFLIGHT1;
    }

    /**
     * @return the CARRIER1
     */
    public String getCARRIER1() {
        return CARRIER1;
    }

    /**
     * @param CARRIER1 the CARRIER1 to set
     */
    public void setCARRIER1(String CARRIER1) {
        this.CARRIER1 = CARRIER1;
    }

    /**
     * @return the CDEPART2
     */
    public String getCDEPART2() {
        return CDEPART2;
    }

    /**
     * @param CDEPART2 the CDEPART2 to set
     */
    public void setCDEPART2(String CDEPART2) {
        this.CDEPART2 = CDEPART2;
    }

  
    
    
     public void setRUTAIMG(String RUTAIMG) {
        this.RUTAIMG = RUTAIMG;
    }

    /**
     * @return the RUTAIMG
     */
    public String getRUTAIMG() {
        return RUTAIMG;
    }
    
    

    /**
     * @param RUTAIMG the CARRIVA2 to set
     */
    public void setCARRIVA2(String CARRIVA2) {
        this.CARRIVA2 = CARRIVA2;
    }
    
      /**
     * @return the CARRIVA2
     */
    public String getCARRIVA2() {
        return CARRIVA2;
    }
    

    /**
     * @return the NFLIGHT2
     */
    public String getNFLIGHT2() {
        return NFLIGHT2;
    }

    /**
     * @param NFLIGHT2 the NFLIGHT2 to set
     */
    public void setNFLIGHT2(String NFLIGHT2) {
        this.NFLIGHT2 = NFLIGHT2;
    }

    /**
     * @return the DFLIGHT2
     */
    public String getDFLIGHT2() {
        return DFLIGHT2;
    }

    /**
     * @param DFLIGHT2 the DFLIGHT2 to set
     */
    public void setDFLIGHT2(String DFLIGHT2) {
        this.DFLIGHT2 = DFLIGHT2;
    }

    /**
     * @return the CARRIER2
     */
    public String getCARRIER2() {
        return CARRIER2;
    }

    /**
     * @param CARRIER2 the CARRIER2 to set
     */
    public void setCARRIER2(String CARRIER2) {
        this.CARRIER2 = CARRIER2;
    }

    /**
     * @return the QCUPOF
     */
    public double getQCUPOF() {
        return QCUPOF;
    }

    /**
     * @param QCUPOF the QCUPOF to set
     */
    public void setQCUPOF(double QCUPOF) {
        this.QCUPOF = QCUPOF;
    }

    /**
     * @return the QPAXOF
     */
    public double getQPAXOF() {
        return QPAXOF;
    }

    /**
     * @param QPAXOF the QPAXOF to set
     */
    public void setQPAXOF(double QPAXOF) {
        this.QPAXOF = QPAXOF;
    }

    /**
     * @return the YASTATUS
     */
    public String getYASTATUS() {
        return YASTATUS;
    }

    /**
     * @param YASTATUS the YASTATUS to set
     */
    public void setYASTATUS(String YASTATUS) {
        this.YASTATUS = YASTATUS;
    }

    /**
     * @return the YDATE
     */
    public String getYDATE() {
        return YDATE;
    }

    /**
     * @param YDATE the YDATE to set
     */
    public void setYDATE(String YDATE) {
        this.YDATE = YDATE;
    }

    /**
     * @return the YSGUIA
     */
    public String getYSGUIA() {
        return YSGUIA;
    }

    /**
     * @param YSGUIA the YSGUIA to set
     */
    public void setYSGUIA(String YSGUIA) {
        this.YSGUIA = YSGUIA;
    }

    /**
     * @return the WASTATUS
     */
    public String getWASTATUS() {
        return WASTATUS;
    }

    /**
     * @param WASTATUS the WASTATUS to set
     */
    public void setWASTATUS(String WASTATUS) {
        this.WASTATUS = WASTATUS;
    }

    /**
     * @return the WDATE
     */
    public String getWDATE() {
        return WDATE;
    }

    /**
     * @param WDATE the WDATE to set
     */
    public void setWDATE(String WDATE) {
        this.WDATE = WDATE;
    }

    /**
     * @return the WSGUIA
     */
    public String getWSGUIA() {
        return WSGUIA;
    }

    /**
     * @param WSGUIA the WSGUIA to set
     */
    public void setWSGUIA(String WSGUIA) {
        this.WSGUIA = WSGUIA;
    }

    /**
     * @return the SASTATUS
     */
    public String getSASTATUS() {
        return SASTATUS;
    }

    /**
     * @param SASTATUS the SASTATUS to set
     */
    public void setSASTATUS(String SASTATUS) {
        this.SASTATUS = SASTATUS;
    }

    /**
     * @return the SDATE
     */
    public String getSDATE() {
        return SDATE;
    }

    /**
     * @param SDATE the SDATE to set
     */
    public void setSDATE(String SDATE) {
        this.SDATE = SDATE;
    }

    /**
     * @return the SHOCR
     */
    public String getSHOCR() {
        return SHOCR;
    }

    /**
     * @param SHOCR the SHOCR to set
     */
    public void setSHOCR(String SHOCR) {
        this.SHOCR = SHOCR;
    }

    /**
     * @return the USCR
     */
    public String getUSCR() {
        return USCR;
    }

    /**
     * @param USCR the USCR to set
     */
    public void setUSCR(String USCR) {
        this.USCR = USCR;
    }

    /**
     * @return the FECR
     */
    public String getFECR() {
        return FECR;
    }

    /**
     * @param FECR the FECR to set
     */
    public void setFECR(String FECR) {
        this.FECR = FECR;
    }

    /**
     * @return the HOCR
     */
    public String getHOCR() {
        return HOCR;
    }

    /**
     * @param HOCR the HOCR to set
     */
    public void setHOCR(String HOCR) {
        this.HOCR = HOCR;
    }

    /**
     * @return the USUP
     */
    public String getUSUP() {
        return USUP;
    }

    /**
     * @param USUP the USUP to set
     */
    public void setUSUP(String USUP) {
        this.USUP = USUP;
    }

    /**
     * @return the FEUP
     */
    public String getFEUP() {
        return FEUP;
    }

    /**
     * @param FEUP the FEUP to set
     */
    public void setFEUP(String FEUP) {
        this.FEUP = FEUP;
    }

    /**
     * @return the HOUP
     */
    public String getHOUP() {
        return HOUP;
    }

    /**
     * @param HOUP the HOUP to set
     */
    public void setHOUP(String HOUP) {
        this.HOUP = HOUP;
    }

    /**
     * @return the yearFrom
     */
    public String getYearFrom() {
        return yearFrom;
    }

    /**
     * @param yearFrom the yearFrom to set
     */
    public void setYearFrom(String yearFrom) {
        this.yearFrom = yearFrom;
    }

    /**
     * @return the yearTo
     */
    public String getYearTo() {
        return yearTo;
    }

    /**
     * @param yearTo the yearTo to set
     */
    public void setYearTo(String yearTo) {
        this.yearTo = yearTo;
    }

    /**
     * @return the monthFrom
     */
    public String getMonthFrom() {
        return monthFrom;
    }

    /**
     * @param monthFrom the monthFrom to set
     */
    public void setMonthFrom(String monthFrom) {
        this.monthFrom = monthFrom;
    }

    /**
     * @return the monthTo
     */
    public String getMonthTo() {
        return monthTo;
    }

    /**
     * @param monthTo the monthTo to set
     */
    public void setMonthTo(String monthTo) {
        this.monthTo = monthTo;
    }

    /**
     * @return the dayFrom
     */
    public String getDayFrom() {
        return dayFrom;
    }

    /**
     * @param dayFrom the dayFrom to set
     */
    public void setDayFrom(String dayFrom) {
        this.dayFrom = dayFrom;
    }

    /**
     * @return the dayTo
     */
    public String getDayTo() {
        return dayTo;
    }

    /**
     * @param dayTo the dayTo to set
     */
    public void setDayTo(String dayTo) {
        this.dayTo = dayTo;
    }

    /**
     * @return the WRECEP
     */
    public String getWRECEP() {
        return WRECEP;
    }

    /**
     * @param WRECEP the WRECEP to set
     */
    public void setWRECEP(String WRECEP) {
        this.WRECEP = WRECEP;
    }

    /**
     * @return the PENDIENTE
     */
    public long getPENDIENTE() {
        return PENDIENTE;
    }

    /**
     * @param PENDIENTE the PENDIENTE to set
     */
    public void setPENDIENTE(long PENDIENTE) {
        this.PENDIENTE = PENDIENTE;
    }

    /**
     * @return the PROCESADO
     */
    public long getPROCESADO() {
        return PROCESADO;
    }

    /**
     * @param PROCESADO the PROCESADO to set
     */
    public void setPROCESADO(long PROCESADO) {
        this.PROCESADO = PROCESADO;
    }

    /**
     * @return the ONLYYELLOW
     */
    public long getONLYYELLOW() {
        return ONLYYELLOW;
    }

    /**
     * @param ONLYYELLOW the ONLYYELLOW to set
     */
    public void setONLYYELLOW(long ONLYYELLOW) {
        this.ONLYYELLOW = ONLYYELLOW;
    }

    /**
     * @return the ONLYWHITE
     */
    public long getONLYWHITE() {
        return ONLYWHITE;
    }

    /**
     * @param ONLYWHITE the ONLYWHITE to set
     */
    public void setONLYWHITE(long ONLYWHITE) {
        this.ONLYWHITE = ONLYWHITE;
    }

    /**
     * @return the MATCH
     */
    public long getMATCH() {
        return MATCH;
    }

    /**
     * @param MATCH the MATCH to set
     */
    public void setMATCH(long MATCH) {
        this.MATCH = MATCH;
    }

    /**
     * @return the SIRAX
     */
    public long getSIRAX() {
        return SIRAX;
    }

    /**
     * @param SIRAX the SIRAX to set
     */
    public void setSIRAX(long SIRAX) {
        this.SIRAX = SIRAX;
    }

    /**
     * @return the TIPOF
     */
    public String getTIPOF() {
        return TIPOF;
    }

    /**
     * @param TIPOF the TIPOF to set
     */
    public void setTIPOF(String TIPOF) {
        this.TIPOF = TIPOF;
    }

    /**
     * @return the orden
     */
    public int getOrden() {
        return orden;
    }

    /**
     * @param orden the orden to set
     */
    public void setOrden(int orden) {
        this.orden = orden;
    }

    /**
     * @return the FECHAFORMAT
     */
    public String getFECHAFORMAT() {
        return FECHAFORMAT;
    }

    /**
     * @param FECHAFORMAT the FECHAFORMAT to set
     */
    public void setFECHAFORMAT(String FECHAFORMAT) {
        this.FECHAFORMAT = FECHAFORMAT;
    }
    
        public int getCont() {
        return cont;
    }


    public void setCont(int cont) {
        this.cont = cont;
    }
    
    public double getAMOUNT1() {
        return amount1;
    }

 
    public void setAMOUNT1(double amount1) {
        this.amount1 = amount1;
    }
    
        public double getAMOUNT2() {
        return amount2;
    }

 
    public void setAMOUNT2(double amount2) {
        this.amount2 = amount2;
    }
    
        public String getMONED() {
        return MONED;
    }

   
    public void setMONED(String MONED) {
        this.MONED = MONED;
    }
    
}
