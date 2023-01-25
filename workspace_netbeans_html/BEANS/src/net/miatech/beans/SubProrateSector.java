package net.miatech.beans;

import java.util.List;

/**
 *
 * @author claudia
 */
public class SubProrateSector {
    
    /** Creates a new instance of SubProrateSector */
    public SubProrateSector() {
        OD = "";
        CARR = "";
        NFLIGHT = "";
        RBD = "";
        SURCHARGE = 0;
        XO = "";
        FACTOR = 0;
        PROVISOC = 0;
        PROVISOP = 0;
        FARE = 0;
        SPA = 0;
        AMOUNT = 0;
        AMTV = "";
        ADJUST = 0;
        VIA = "";
        CARRN = "";
        FCVLO = "";
        CLASE = "";
        FBASE = "";
        LOHO = "";
        TBASE = "";
        STBAS = "";
        XFARE = 0;
        TFARE = "";
        DIFER = 0;
        FDIFE = "";
        TRFM = 0;
        MNTFM = "";
        PLUSS = 0;
        STOP = 0;
        MNACU = "";
        ACUE = 0;
        ACUCO = "";
        VLMPA = 0;
        VLSRP = 0;
        INDPR = "";
        INDISC = "";
        ISC = 0;
        COEFIC = 0;
        ACUBAS = "";
        ACUSTS = "";
        PRVSTS = "";
        YANQ = 0;
        SUBPA = "";
        A728TFARE1 = "";
        A728ACUE1 = 0;
        A728MNACU1 = "";
        A728DIFER1 = 0;
        A728FDIFE1 = "";
        A728TRFM1 = 0;
        A728MNTFM1 = "";
        A728RERUT = "";
        listaTexto = null;
        esSector = "";
    }
    
    /**
     * Holds value of property OD.
     */
    private String OD;
    
    public String getOD() {
        return this.OD;
    }
    
    public void setOD(String OD) {
        this.OD = OD;
    }
    
    /**
     * Holds value of property CARR.
     */
    private String CARR;
    
    public String getCARR() {
        return this.CARR;
    }
    
    public void setCARR(String CARR) {
        this.CARR = CARR;
    }
    
    /**
     * Holds value of property NFLIGHT.
     */
    private String NFLIGHT;
    
    public String getNFLIGHT() {
        return this.NFLIGHT;
    }
    
    public void setNFLIGHT(String NFLIGHT) {
        this.NFLIGHT = NFLIGHT;
    }
    
    /**
     * Holds value of property RBD.
     */
    private String RBD;
    
    public String getRBD() {
        return this.RBD;
    }
    
    public void setRBD(String RBD) {
        this.RBD = RBD;
    }
    
    /**
     * Holds value of property SURCHARGE.
     */
    private double SURCHARGE;
    
    public double getSURCHARGE() {
        return this.SURCHARGE;
    }
    
    public void setSURCHARGE(double SURCHARGE) {
        this.SURCHARGE = SURCHARGE;
    }
    
    /**
     * Holds value of property XO.
     */
    private String XO;
    
    public String getXO() {
        return this.XO;
    }
    
    public void setXO(String XO) {
        this.XO = XO;
    }
    
    /**
     * Holds value of property FACTOR.
     */
    private long FACTOR;
    
    public long getFACTOR() {
        return this.FACTOR;
    }
    
    public void setFACTOR(long FACTOR) {
        this.FACTOR = FACTOR;
    }
    
    /**
     * Holds value of property PROVISOC.
     */
    private double PROVISOC;
    
    public double getPROVISOC() {
        return this.PROVISOC;
    }
    
    public void setPROVISOC(double PROVISOC) {
        this.PROVISOC = PROVISOC;
    }
    
    /**
     * Holds value of property PROVISOP.
     */
    private double PROVISOP;
    
    public double getPROVISOP() {
        return this.PROVISOP;
    }
    
    public void setPROVISOP(double PROVISOP) {
        this.PROVISOP = PROVISOP;
    }
    
    /**
     * Holds value of property FARE.
     */
    private double FARE;
    
    public double getFARE() {
        return this.FARE;
    }
    
    public void setFARE(double FARE) {
        this.FARE = FARE;
    }
    
    /**
     * Holds value of property SPA.
     */
    private double SPA;
    
    public double getSPA() {
        return this.SPA;
    }
    
    public void setSPA(double SPA) {
        this.SPA = SPA;
    }
    
    /**
     * Holds value of property AMOUNT.
     */
    private double AMOUNT;
    
    public double getAMOUNT() {
        return this.AMOUNT;
    }
    
    public void setAMOUNT(double AMOUNT) {
        this.AMOUNT = AMOUNT;
    }
    
    /**
     * Holds value of property AMTV.
     */
    private String AMTV;
    
    public String getAMTV() {
        return this.AMTV;
    }
    
    public void setAMTV(String AMTV) {
        this.AMTV = AMTV;
    }
    
    /**
     * Holds value of property ADJUST.
     */
    private double ADJUST;
    
    public double getADJUST() {
        return this.ADJUST;
    }
    
    public void setADJUST(double ADJUST) {
        this.ADJUST = ADJUST;
    }
    
    /**
     * Holds value of property VIA.
     */
    private String VIA;
    
    public String getVIA() {
        return this.VIA;
    }
    
    public void setVIA(String VIA) {
        this.VIA = VIA;
    }
    
    /**
     * Holds value of property CARRN.
     */
    private String CARRN;
    
    public String getCARRN() {
        return this.CARRN;
    }
    
    public void setCARRN(String CARRN) {
        this.CARRN = CARRN;
    }
    
    /**
     * Holds value of property FCVLO.
     */
    private String FCVLO;
    
    public String getFCVLO() {
        return this.FCVLO;
    }
    
    public void setFCVLO(String FCVLO) {
        this.FCVLO = FCVLO;
    }
    
    /**
     * Holds value of property CLASE.
     */
    private String CLASE;
    
    public String getCLASE() {
        return this.CLASE;
    }
    
    public void setCLASE(String CLASE) {
        this.CLASE = CLASE;
    }
    
    /**
     * Holds value of property FBASE.
     */
    private String FBASE;
    
    public String getFBASE() {
        return this.FBASE;
    }
    
    public void setFBASE(String FBASE) {
        this.FBASE = FBASE;
    }
    
    /**
     * Holds value of property LOHO.
     */
    private String LOHO;
    
    public String getLOHO() {
        return this.LOHO;
    }
    
    public void setLOHO(String LOHO) {
        this.LOHO = LOHO;
    }
    
    /**
     * Holds value of property TBASE.
     */
    private String TBASE;
    
    public String getTBASE() {
        return this.TBASE;
    }
    
    public void setTBASE(String TBASE) {
        this.TBASE = TBASE;
    }
    
    /**
     * Holds value of property STBAS.
     */
    private String STBAS;
    
    public String getSTBAS() {
        return this.STBAS;
    }
    
    public void setSTBAS(String STBAS) {
        this.STBAS = STBAS;
    }
    
    /**
     * Holds value of property XFARE.
     * This property is the field A728FARE1 and FARE is the field A728TARI1 of A728
     */
    private double XFARE;
    
    public double getXFARE() {
        return this.XFARE;
    }
    
    public void setXFARE(double XFARE) {
        this.XFARE = XFARE;
    }
    
    /**
     * Holds value of property TFARE.
     */
    private String TFARE;
    
    public String getTFARE() {
        return this.TFARE;
    }
    
    public void setTFARE(String TFARE) {
        this.TFARE = TFARE;
    }
    
    /**
     * Holds value of property DIFER.
     */
    private double DIFER;
    
    public double getDIFER() {
        return this.DIFER;
    }
    
    public void setDIFER(double DIFER) {
        this.DIFER = DIFER;
    }
    
    /**
     * Holds value of property FDIFE.
     */
    private String FDIFE;
    
    public String getFDIFE() {
        return this.FDIFE;
    }
    
    public void setFDIFE(String FDIFE) {
        this.FDIFE = FDIFE;
    }
    
    /**
     * Holds value of property TRFM.
     */
    private double TRFM;
    
    public double getTRFM() {
        return this.TRFM;
    }
    
    public void setTRFM(double TRFM) {
        this.TRFM = TRFM;
    }
    
    /**
     * Holds value of property MNTFM.
     */
    private String MNTFM;
    
    public String getMNTFM() {
        return this.MNTFM;
    }
    
    public void setMNTFM(String MNTFM) {
        this.MNTFM = MNTFM;
    }
    
    /**
     * Holds value of property PLUSS.
     */
    private double PLUSS;
    
    public double getPLUSS() {
        return this.PLUSS;
    }
    
    public void setPLUSS(double PLUSS) {
        this.PLUSS = PLUSS;
    }
    
    /**
     * Holds value of property STOP.
     */
    private double STOP;
    
    public double getSTOP() {
        return this.STOP;
    }
    
    public void setSTOP(double STOP) {
        this.STOP = STOP;
    }
    
    /**
     * Holds value of property MNACU.
     */
    private String MNACU;
    
    public String getMNACU() {
        return this.MNACU;
    }
    
    public void setMNACU(String MNACU) {
        this.MNACU = MNACU;
    }
    
    /**
     * Holds value of property ACUE.
     */
    private double ACUE;
    
    public double getACUE() {
        return this.ACUE;
    }
    
    public void setACUE(double ACUE) {
        this.ACUE = ACUE;
    }
    
    /**
     * Holds value of property ACUCO.
     */
    private String ACUCO;
    
    public String getACUCO() {
        return this.ACUCO;
    }
    
    public void setACUCO(String ACUCO) {
        this.ACUCO = ACUCO;
    }
    
    /**
     * Holds value of property VLMPA.
     */
    private double VLMPA;
    
    public double getVLMPA() {
        return this.VLMPA;
    }
    
    public void setVLMPA(double VLMPA) {
        this.VLMPA = VLMPA;
    }
    
    /**
     * Holds value of property VLSRP.
     */
    private double VLSRP;
    
    public double getVLSRP() {
        return this.VLSRP;
    }
    
    public void setVLSRP(double VLSRP) {
        this.VLSRP = VLSRP;
    }
    
    /**
     * Holds value of property INDPR.
     */
    private String INDPR;
    
    public String getINDPR() {
        return this.INDPR;
    }
    
    public void setINDPR(String INDPR) {
        this.INDPR = INDPR;
    }
    
    /**
     * Holds value of property INDISC.
     */
    private String INDISC;
    
    public String getINDISC() {
        return this.INDISC;
    }
    
    public void setINDISC(String INDISC) {
        this.INDISC = INDISC;
    }
    
    /**
     * Holds value of property ISC.
     */
    private double ISC;
    
    public double getISC() {
        return this.ISC;
    }
    
    public void setISC(double ISC) {
        this.ISC = ISC;
    }
    
    /**
     * Holds value of property COEFIC.
     */
    private double COEFIC;
    
    public double getCOEFIC() {
        return this.COEFIC;
    }
    
    public void setCOEFIC(double COEFIC) {
        this.COEFIC = COEFIC;
    }
    
    /**
     * Holds value of property ACUBAS.
     */
    private String ACUBAS;
    
    public String getACUBAS() {
        return this.ACUBAS;
    }
    
    public void setACUBAS(String ACUBAS) {
        this.ACUBAS = ACUBAS;
    }
    
    /**
     * Holds value of property ACUSTS.
     */
    private String ACUSTS;
    
    public String getACUSTS() {
        return this.ACUSTS;
    }
    
    public void setACUSTS(String ACUSTS) {
        this.ACUSTS = ACUSTS;
    }
    
    /**
     * Holds value of property PRVSTS.
     */
    private String PRVSTS;
    
    public String getPRVSTS() {
        return this.PRVSTS;
    }
    
    public void setPRVSTS(String PRVSTS) {
        this.PRVSTS = PRVSTS;
    }
    
    /**
     * Holds value of property YANQ.
     */
    private double YANQ;
    
    public double getYANQ() {
        return this.YANQ;
    }
    
    public void setYANQ(double YANQ) {
        this.YANQ = YANQ;
    }
    
    /**
     * Holds value of property SUBPA.
     */
    private String SUBPA;
    
    public String getSUBPA() {
        return this.SUBPA;
    }
    
    public void setSUBPA(String SUBPA) {
        this.SUBPA = SUBPA;
    }
    
    /**
     * Holds value of property A728TFARE1.
     */
    private String A728TFARE1;
    
    public String getA728TFARE1() {
        return this.A728TFARE1;
    }
    
    public void setA728TFARE1(String A728TFARE1) {
        this.A728TFARE1 = A728TFARE1;
    }
    
    /**
     * Holds value of property A728ACUE1.
     */
    private double A728ACUE1;
    
    public double getA728ACUE1() {
        return this.A728ACUE1;
    }
    
    public void setA728ACUE1(double A728ACUE1) {
        this.A728ACUE1 = A728ACUE1;
    }
    
    /**
     * Holds value of property A728MNACU1.
     */
    private String A728MNACU1;
    
    public String getA728MNACU1() {
        return this.A728MNACU1;
    }
    
    public void setA728MNACU1(String A728MNACU1) {
        this.A728MNACU1 = A728MNACU1;
    }
    
    /**
     * Holds value of property A728DIFER1.
     */
    private double A728DIFER1;
    
    public double getA728DIFER1() {
        return this.A728DIFER1;
    }
    
    public void setA728DIFER1(double A728DIFER1) {
        this.A728DIFER1 = A728DIFER1;
    }
    
    /**
     * Holds value of property A728FDIFE1.
     */
    private String A728FDIFE1;
    
    public String getA728FDIFE1() {
        return this.A728FDIFE1;
    }
    
    public void setA728FDIFE1(String A728FDIFE1) {
        this.A728FDIFE1 = A728FDIFE1;
    }
    
    /**
     * Holds value of property A728TRFM1.
     */
    private double A728TRFM1;
    
    public double getA728TRFM1() {
        return this.A728TRFM1;
    }
    
    public void setA728TRFM1(double A728TRFM1) {
        this.A728TRFM1 = A728TRFM1;
    }
    
    /**
     * Holds value of property A728MNTFM1.
     */
    private String A728MNTFM1;
    
    public String getA728MNTFM1() {
        return this.A728MNTFM1;
    }
    
    public void setA728MNTFM1(String A728MNTFM1) {
        this.A728MNTFM1 = A728MNTFM1;
    }
    
    /**
     * Holds value of property A728RERUT.
     */
    private String A728RERUT;
    
    public String getA728RERUT() {
        return this.A728RERUT;
    }
    
    public void setA728RERUT(String A728RERUT) {
        this.A728RERUT = A728RERUT;
    }
    
    /**
     * Holds value of property textoProviso.
     */
    //private String textoProviso;
    
    /**
     * Getter for property textoProviso.
     * @return Value of property textoProviso.
     */
    //public String getTextoProviso() {
      //  return this.textoProviso;
    //}
    
    /**
     * Setter for property textoProviso.
     * @param textoProviso New value of property textoProviso.
     */
    //public void setTextoProviso(String textoProviso) {
      //  this.textoProviso = textoProviso;
    //}
    
    /**
     * Holds value of property listaTexto.
     */
    private List<RECA823> listaTexto;
    
    public List<RECA823> getListaTexto() {
        return this.listaTexto;
    }
    
    public void setListaTexto(List<RECA823> listaTexto) {
        this.listaTexto = listaTexto;
    }
    
    
    private String esSector;
    
    public String getEsSector() {
        return this.esSector;
    }
    
    public void setEsSector(String esSector) {
        this.esSector = esSector;
    }
    
}
