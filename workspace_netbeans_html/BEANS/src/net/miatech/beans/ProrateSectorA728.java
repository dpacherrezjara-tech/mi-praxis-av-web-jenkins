
package net.miatech.beans;

import java.util.List;

/** 
 *
 * @author claudia
 */
public class ProrateSectorA728 {
    
    //*********** BUFFER PRO9571WS ****************//
    
    //06 IDENTI    PIC X(02).   
    private String strIDENTI;
    //06 NUMERO    PIC 9(02).    
    private String strNUMERO;
    //06 XO        PIC X(01).    
    private String strXO;
    //06 RUTAO     PIC X(03).   
    private String strRUTAO;
    //06 RUTAD     PIC X(03).
    private String strRUTAD;
    //06 VIA1      PIC X(02).
    private String strVIA1;
    //06 CARRN1    PIC X(03).
    private String strCARRN1;
    //06 CARRA1    PIC X(02).
    private String strCARRA1;
    //06 NVLO1     PIC X(05).
    private String strNVLO1;
    //06 FCVLO1    PIC X(08).
    private String strFCVLO1;
    //06 BOOKI1    PIC X(01).
    private String strBOOKI1;
    //06 CLASE1    PIC X(01).
    private String strCLASE1;
    //06 FBASE1    PIC X(10).
    private String strFBASE1;
    //06 LOHO      PIC X(03).  
    private String strLOHO;
    //06 TBASE1    PIC X(01).    
    private String strTBASE1;
    //06 STBAS1    PIC X(02).    
    private String strSTBAS1;
    //06 FARE1     PIC 9(13)V99. 
    private double dblFARE1;
    //06 TFARE1    PIC X(01).    
    private String strTFARE1;
    //06 DIFER1    PIC 9(13)V99. 
    private double dblDIFER1;
    //06 FDIFE1    PIC X(01).    
    private String strFDIFE1;
    //06 TRFM1     PIC 9(13)V99. 
    private double dblTRFM1;
    //06 MNTFM1    PIC X(03).    
    private String strMNTFM1;
    //06 SS1       PIC 9(13)V99. 
    private double dblSS1;
    //06 PLUSS1    PIC 9(13)V99. 
    private double dblPLUSS1;
    //06 STOP1     PIC 9(13)V99. 
    private double dblSTOP1;
    //06 MNACU1    PIC X(03).    
    private String strMNACU1;
    //06 ACUE1     PIC 9(13)V99. 
    private double dblACUE1;
    //06 FACT1     PIC 9(13)V99. 
    private double dblFACT1;
    //06 TARI1     PIC 9(13)V99. 
    private double dblTARI1;
    //06 YANQ1     PIC 9(13)V99. 
    private double dblYANQ1;
    //06 PPRO1     PIC 9(13)V99.  
    private double dblPPRO1;
    //06 SUBPA1    PIC X(20).     
    private String strSUBPA1;
    //06 PROV1     PIC 9(13)V99.  
    private double dblPROV1;
    //06 ACUEO1    PIC 9(13)V99.  
    private double dblACUEO1;
    //06 ACUCO1    PIC X(20).     
    private String strACUCO1;
    //06 AJUST1    PIC S9(13)V99. 
    private double dblAJUST1;
    //06 VALOR1    PIC 9(13)V99.  
    private double dblVALOR1;
    //06 SPA       PIC 9(13)V99.  
    private double dblSPA;
    //06 VLMPA1    PIC 9(13)V99.  
    private double dblVLMPA1;
    //06 VLSRP1    PIC 9(13)V99.  
    private double dblVLSRP1;
    //06 INDPR1    PIC X.       
    private String strINDPR1;
    //06 INDISC    PIC X(1).    
    private String strINDISC;
    //06 ISC       PIC 9(7)V99.   
    private double dblISC;
    //06 COEFIC    PIC 9(8)V9(5). 
    private double dblCOEFIC;
    //06 ACUBAS    PIC X(4).   
    private String strACUBAS;
    //06 ACUSTS    PIC X(1).    
    private String strACUSTS;
    //06 PRVSTS    PIC X(2).      
    private String strPRVSTS;
    
    private String esSector;
    private String strAMTV;
    private String strRERUT;
    private List<RECA823> listaTexto;
    
    
    public ProrateSectorA728() {

        strIDENTI = "";
        strNUMERO = "";
        strXO = "";
        strRUTAO = "";
        strRUTAD = "";
        strVIA1 = "";
        strCARRN1 = "";
        strCARRA1 = "";
        strNVLO1 = "";
        strFCVLO1 = "";
        strBOOKI1 = "";
        strCLASE1 = "";
        strFBASE1 = "";
        strLOHO = "";
        strTBASE1 = "";
        strSTBAS1 = "";
        dblFARE1 = 0;
        strTFARE1 = "";
        dblDIFER1 = 0;
        strFDIFE1 = "";
        dblTRFM1 = 0;
        strMNTFM1 = "";
        dblSS1 = 0;
        dblPLUSS1 = 0;
        dblSTOP1 = 0;
        strMNACU1 = "";
        dblACUE1 = 0;
        dblFACT1 = 0;
        dblTARI1 = 0;
        dblYANQ1 = 0;
        dblPPRO1 = 0;
        strSUBPA1 = "";
        dblPROV1 = 0;
        dblACUEO1 = 0;
        strACUCO1 = "";
        dblAJUST1 = 0;
        dblVALOR1 = 0;
        dblSPA = 0;
        dblVLMPA1 = 0;
        dblVLSRP1 = 0;
        strINDPR1 = "";
        strINDISC = "";
        dblISC = 0;
        dblCOEFIC = 0;
        strACUBAS = "";
        strACUSTS = "";
        strPRVSTS = "";
        esSector = "";
        strAMTV = "";
        strRERUT = "";
        listaTexto = null;

    }

    public String getStrIDENTI() {
        return strIDENTI;
    }

    public void setStrIDENTI(String strIDENTI) {
        this.strIDENTI = strIDENTI;
    }

    public String getStrNUMERO() {
        return strNUMERO;
    }

    public void setStrNUMERO(String strNUMERO) {
        this.strNUMERO = strNUMERO;
    }

    public String getStrXO() {
        return strXO;
    }

    public void setStrXO(String strXO) {
        this.strXO = strXO;
    }

    public String getStrRUTAO() {
        return strRUTAO;
    }

    public void setStrRUTAO(String strRUTAO) {
        this.strRUTAO = strRUTAO;
    }

    public String getStrRUTAD() {
        return strRUTAD;
    }

    public void setStrRUTAD(String strRUTAD) {
        this.strRUTAD = strRUTAD;
    }

    public String getStrVIA1() {
        return strVIA1;
    }

    public void setStrVIA1(String strVIA1) {
        this.strVIA1 = strVIA1;
    }

    public String getStrCARRN1() {
        return strCARRN1;
    }

    public void setStrCARRN1(String strCARRN1) {
        this.strCARRN1 = strCARRN1;
    }

    public String getStrCARRA1() {
        return strCARRA1;
    }

    public void setStrCARRA1(String strCARRA1) {
        this.strCARRA1 = strCARRA1;
    }

    public String getStrNVLO1() {
        return strNVLO1;
    }

    public void setStrNVLO1(String strNVLO1) {
        this.strNVLO1 = strNVLO1;
    }

    public String getStrFCVLO1() {
        return strFCVLO1;
    }

    public void setStrFCVLO1(String strFCVLO1) {
        this.strFCVLO1 = strFCVLO1;
    }

    public String getStrBOOKI1() {
        return strBOOKI1;
    }

    public void setStrBOOKI1(String strBOOKI1) {
        this.strBOOKI1 = strBOOKI1;
    }

    public String getStrCLASE1() {
        return strCLASE1;
    }

    public void setStrCLASE1(String strCLASE1) {
        this.strCLASE1 = strCLASE1;
    }

    public String getStrFBASE1() {
        return strFBASE1;
    }

    public void setStrFBASE1(String strFBASE1) {
        this.strFBASE1 = strFBASE1;
    }

    public String getStrLOHO() {
        return strLOHO;
    }

    public void setStrLOHO(String strLOHO) {
        this.strLOHO = strLOHO;
    }

    public String getStrTBASE1() {
        return strTBASE1;
    }

    public void setStrTBASE1(String strTBASE1) {
        this.strTBASE1 = strTBASE1;
    }

    public String getStrSTBAS1() {
        return strSTBAS1;
    }

    public void setStrSTBAS1(String strSTBAS1) {
        this.strSTBAS1 = strSTBAS1;
    }

    public double getDblFARE1() {
        return dblFARE1;
    }

    public void setDblFARE1(double dblFARE1) {
        this.dblFARE1 = dblFARE1;
    }

    public String getStrTFARE1() {
        return strTFARE1;
    }

    public void setStrTFARE1(String strTFARE1) {
        this.strTFARE1 = strTFARE1;
    }

    public double getDblDIFER1() {
        return dblDIFER1;
    }

    public void setDblDIFER1(double dblDIFER1) {
        this.dblDIFER1 = dblDIFER1;
    }

    public String getStrFDIFE1() {
        return strFDIFE1;
    }

    public void setStrFDIFE1(String strFDIFE1) {
        this.strFDIFE1 = strFDIFE1;
    }

    public double getDblTRFM1() {
        return dblTRFM1;
    }

    public void setDblTRFM1(double dblTRFM1) {
        this.dblTRFM1 = dblTRFM1;
    }

    public String getStrMNTFM1() {
        return strMNTFM1;
    }

    public void setStrMNTFM1(String strMNTFM1) {
        this.strMNTFM1 = strMNTFM1;
    }

    public double getDblSS1() {
        return dblSS1;
    }

    public void setDblSS1(double dblSS1) {
        this.dblSS1 = dblSS1;
    }

    public double getDblPLUSS1() {
        return dblPLUSS1;
    }

    public void setDblPLUSS1(double dblPLUSS1) {
        this.dblPLUSS1 = dblPLUSS1;
    }

    public double getDblSTOP1() {
        return dblSTOP1;
    }

    public void setDblSTOP1(double dblSTOP1) {
        this.dblSTOP1 = dblSTOP1;
    }

    public String getStrMNACU1() {
        return strMNACU1;
    }

    public void setStrMNACU1(String strMNACU1) {
        this.strMNACU1 = strMNACU1;
    }

    public double getDblACUE1() {
        return dblACUE1;
    }

    public void setDblACUE1(double dblACUE1) {
        this.dblACUE1 = dblACUE1;
    }

    public double getDblFACT1() {
        return dblFACT1;
    }

    public void setDblFACT1(double dblFACT1) {
        this.dblFACT1 = dblFACT1;
    }

    public double getDblTARI1() {
        return dblTARI1;
    }

    public void setDblTARI1(double dblTARI1) {
        this.dblTARI1 = dblTARI1;
    }

    public double getDblYANQ1() {
        return dblYANQ1;
    }

    public void setDblYANQ1(double dblYANQ1) {
        this.dblYANQ1 = dblYANQ1;
    }

    public double getDblPPRO1() {
        return dblPPRO1;
    }

    public void setDblPPRO1(double dblPPRO1) {
        this.dblPPRO1 = dblPPRO1;
    }

    public String getStrSUBPA1() {
        return strSUBPA1;
    }

    public void setStrSUBPA1(String strSUBPA1) {
        this.strSUBPA1 = strSUBPA1;
    }

    public double getDblPROV1() {
        return dblPROV1;
    }

    public void setDblPROV1(double dblPROV1) {
        this.dblPROV1 = dblPROV1;
    }

    public double getDblACUEO1() {
        return dblACUEO1;
    }

    public void setDblACUEO1(double dblACUEO1) {
        this.dblACUEO1 = dblACUEO1;
    }

    public String getStrACUCO1() {
        return strACUCO1;
    }

    public void setStrACUCO1(String strACUCO1) {
        this.strACUCO1 = strACUCO1;
    }

    public double getDblAJUST1() {
        return dblAJUST1;
    }

    public void setDblAJUST1(double dblAJUST1) {
        this.dblAJUST1 = dblAJUST1;
    }

    public double getDblVALOR1() {
        return dblVALOR1;
    }

    public void setDblVALOR1(double dblVALOR1) {
        this.dblVALOR1 = dblVALOR1;
    }

    public double getDblSPA() {
        return dblSPA;
    }

    public void setDblSPA(double dblSPA) {
        this.dblSPA = dblSPA;
    }

    public double getDblVLMPA1() {
        return dblVLMPA1;
    }

    public void setDblVLMPA1(double dblVLMPA1) {
        this.dblVLMPA1 = dblVLMPA1;
    }

    public double getDblVLSRP1() {
        return dblVLSRP1;
    }

    public void setDblVLSRP1(double dblVLSRP1) {
        this.dblVLSRP1 = dblVLSRP1;
    }

    public String getStrINDPR1() {
        return strINDPR1;
    }

    public void setStrINDPR1(String strINDPR1) {
        this.strINDPR1 = strINDPR1;
    }

    public String getStrINDISC() {
        return strINDISC;
    }

    public void setStrINDISC(String strINDISC) {
        this.strINDISC = strINDISC;
    }

    public double getDblISC() {
        return dblISC;
    }

    public void setDblISC(double dblISC) {
        this.dblISC = dblISC;
    }

    public double getDblCOEFIC() {
        return dblCOEFIC;
    }

    public void setDblCOEFIC(double dblCOEFIC) {
        this.dblCOEFIC = dblCOEFIC;
    }

    public String getStrACUBAS() {
        return strACUBAS;
    }

    public void setStrACUBAS(String strACUBAS) {
        this.strACUBAS = strACUBAS;
    }

    public String getStrACUSTS() {
        return strACUSTS;
    }

    public void setStrACUSTS(String strACUSTS) {
        this.strACUSTS = strACUSTS;
    }

    public String getStrPRVSTS() {
        return strPRVSTS;
    }

    public void setStrPRVSTS(String strPRVSTS) {
        this.strPRVSTS = strPRVSTS;
    }

    public String getEsSector() {
        return esSector;
    }

    public void setEsSector(String esSector) {
        this.esSector = esSector;
    }

    public String getStrAMTV() {
        return strAMTV;
    }

    public void setStrAMTV(String strAMTV) {
        this.strAMTV = strAMTV;
    }

    public String getStrRERUT() {
        return strRERUT;
    }

    public void setStrRERUT(String strRERUT) {
        this.strRERUT = strRERUT;
    }
    
    public List<RECA823> getListaTexto() {
        return this.listaTexto;
    }
    
    public void setListaTexto(List<RECA823> listaTexto) {
        this.listaTexto = listaTexto;
    }
    
    
}
