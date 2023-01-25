
package net.miatech.beans;

import java.util.List;

/** 
 *
 * @author claudia
 */
public class ProrateSector {
    
    private String strOD;
    private String strCARR;
    private String strNFLIGHT;
    private String strRBD;
    private String strXO;
    private String strAMTV;
    private String strVIA;
    private String strCARRN;
    private String strFCVLO;
    private String strCLASE;
    private String strFBASE;
    private String strLOHO;
    private String strTBASE;
    private String strSTBAS;
    private String strTFARE;
    private String strFDIFE;
    private String strMNTFM;
    private String strMNACU;
    private String strACUCO;
    private String strINDPR;
    private String strINDISC;
    private String strACUBAS;
    private String strACUSTS;
    private String strPRVSTS;
    private String strSUBPA;
    private String strA728TFARE1;
    private String strA728MNACU1;
    private String strA728FDIFE1;
    private String strA728MNTFM1;
    private String strA728RERUT;
    private String strEsSector;
    private String strRUTAD;
    private long lngFACTOR;
    private double dblPROVISOC;
    private double dblPROVISOP;
    private double dblFARE;
    private double dblSPA;
    private double dblAMOUNT;
    private double dblSURCHARGE;
    private double dblADJUST;
    private double dblXFARE;
    private double dblDIFER;
    private double dblTRFM;
    private double dblPLUSS;
    private double dblSTOP;
    private double dblACUE;
    private double dblVLMPA;
    private double dblVLSRP;
    private double dblISC;
    private double dblCOEFIC;
    private double dblYANQ;
    private double dblA728ACUE1;
    private double dblA728DIFER1;
    private double dblA728TRFM1;
    private List<RECA823> listaTexto;
    //Totales ===================
    private long lngTotFACTOR;
    private double dblTotSURCHARGE;
    private double dblTotXFARE;
    private double dblTotPROVISOC;
    private double dblTotSPA;
    private double dblTotAMOUNT;
    private double dblTotVLSRP;
    private double dblTotVLMPA;
    private double dblTotADJUST;
    private double dblTotDIFER;
    
    
    public ProrateSector() {

        strOD = "";
        strCARR = "";
        strNFLIGHT = "";
        strRBD = "";
        strXO = "";
        strAMTV = "";
        strVIA = "";
        strCARRN = "";
        strFCVLO = "";
        strCLASE = "";
        strFBASE = "";
        strLOHO = "";
        strTBASE = "";
        strSTBAS = "";
        strTFARE = "";
        strFDIFE = "";
        strMNTFM = "";
        strMNACU = "";
        strACUCO = "";
        strINDPR = "";
        strINDISC = "";
        strACUBAS = "";
        strACUSTS = "";
        strPRVSTS = "";
        strSUBPA = "";
        strA728TFARE1 = "";
        strA728MNACU1 = "";
        strA728FDIFE1 = "";
        strA728MNTFM1 = "";
        strA728RERUT = "";
        strEsSector = "";
        strRUTAD = "";
        lngFACTOR = 0;
        dblPROVISOC = 0;
        dblPROVISOP = 0;
        dblFARE = 0;
        dblSPA = 0;
        dblAMOUNT = 0;
        dblSURCHARGE = 0;
        dblADJUST = 0;
        dblXFARE = 0;
        dblDIFER = 0;
        dblTRFM = 0;
        dblPLUSS = 0;
        dblSTOP = 0;
        dblACUE = 0;
        dblVLMPA = 0;
        dblVLSRP = 0;
        dblISC = 0;
        dblCOEFIC = 0;
        dblYANQ = 0;
        dblA728ACUE1 = 0;
        dblA728DIFER1 = 0;
        dblA728TRFM1 = 0;
        //Totales =================
        lngTotFACTOR = 0;
        dblTotSURCHARGE = 0;
        dblTotXFARE = 0;
        dblTotPROVISOC = 0;
        dblTotSPA = 0;
        dblTotAMOUNT = 0;
        dblTotVLSRP = 0;
        dblTotVLMPA = 0;
        dblTotADJUST = 0;
        dblTotDIFER = 0;
    }

    public String getStrOD() {
        return strOD;
    }

    public void setStrOD(String strOD) {
        this.strOD = strOD;
    }

    public String getStrCARR() {
        return strCARR;
    }

    public void setStrCARR(String strCARR) {
        this.strCARR = strCARR;
    }

    public String getStrNFLIGHT() {
        return strNFLIGHT;
    }

    public void setStrNFLIGHT(String strNFLIGHT) {
        this.strNFLIGHT = strNFLIGHT;
    }

    public String getStrRBD() {
        return strRBD;
    }

    public void setStrRBD(String strRBD) {
        this.strRBD = strRBD;
    }

    public String getStrXO() {
        return strXO;
    }

    public void setStrXO(String strXO) {
        this.strXO = strXO;
    }

    public String getStrAMTV() {
        return strAMTV;
    }

    public void setStrAMTV(String strAMTV) {
        this.strAMTV = strAMTV;
    }

    public String getStrVIA() {
        return strVIA;
    }

    public void setStrVIA(String strVIA) {
        this.strVIA = strVIA;
    }

    public String getStrCARRN() {
        return strCARRN;
    }

    public void setStrCARRN(String strCARRN) {
        this.strCARRN = strCARRN;
    }

    public String getStrFCVLO() {
        return strFCVLO;
    }

    public void setStrFCVLO(String strFCVLO) {
        this.strFCVLO = strFCVLO;
    }

    public String getStrCLASE() {
        return strCLASE;
    }

    public void setStrCLASE(String strCLASE) {
        this.strCLASE = strCLASE;
    }

    public String getStrFBASE() {
        return strFBASE;
    }

    public void setStrFBASE(String strFBASE) {
        this.strFBASE = strFBASE;
    }

    public String getStrLOHO() {
        return strLOHO;
    }

    public void setStrLOHO(String strLOHO) {
        this.strLOHO = strLOHO;
    }

    public String getStrTBASE() {
        return strTBASE;
    }

    public void setStrTBASE(String strTBASE) {
        this.strTBASE = strTBASE;
    }

    public String getStrSTBAS() {
        return strSTBAS;
    }

    public void setStrSTBAS(String strSTBAS) {
        this.strSTBAS = strSTBAS;
    }

    public String getStrTFARE() {
        return strTFARE;
    }

    public void setStrTFARE(String strTFARE) {
        this.strTFARE = strTFARE;
    }

    public String getStrFDIFE() {
        return strFDIFE;
    }

    public void setStrFDIFE(String strFDIFE) {
        this.strFDIFE = strFDIFE;
    }

    public String getStrMNTFM() {
        return strMNTFM;
    }

    public void setStrMNTFM(String strMNTFM) {
        this.strMNTFM = strMNTFM;
    }

    public String getStrMNACU() {
        return strMNACU;
    }

    public void setStrMNACU(String strMNACU) {
        this.strMNACU = strMNACU;
    }

    public String getStrACUCO() {
        return strACUCO;
    }

    public void setStrACUCO(String strACUCO) {
        this.strACUCO = strACUCO;
    }

    public String getStrINDPR() {
        return strINDPR;
    }

    public void setStrINDPR(String strINDPR) {
        this.strINDPR = strINDPR;
    }

    public String getStrINDISC() {
        return strINDISC;
    }

    public void setStrINDISC(String strINDISC) {
        this.strINDISC = strINDISC;
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

    public String getStrSUBPA() {
        return strSUBPA;
    }

    public void setStrSUBPA(String strSUBPA) {
        this.strSUBPA = strSUBPA;
    }

    public String getStrA728TFARE1() {
        return strA728TFARE1;
    }

    public void setStrA728TFARE1(String strA728TFARE1) {
        this.strA728TFARE1 = strA728TFARE1;
    }

    public String getStrA728MNACU1() {
        return strA728MNACU1;
    }

    public void setStrA728MNACU1(String strA728MNACU1) {
        this.strA728MNACU1 = strA728MNACU1;
    }

    public String getStrA728FDIFE1() {
        return strA728FDIFE1;
    }

    public void setStrA728FDIFE1(String strA728FDIFE1) {
        this.strA728FDIFE1 = strA728FDIFE1;
    }

    public String getStrA728MNTFM1() {
        return strA728MNTFM1;
    }

    public void setStrA728MNTFM1(String strA728MNTFM1) {
        this.strA728MNTFM1 = strA728MNTFM1;
    }

    public String getStrA728RERUT() {
        return strA728RERUT;
    }

    public void setStrA728RERUT(String strA728RERUT) {
        this.strA728RERUT = strA728RERUT;
    }

    public String getStrEsSector() {
        return strEsSector;
    }

    public void setStrEsSector(String strEsSector) {
        this.strEsSector = strEsSector;
    }

    public long getLngFACTOR() {
        return lngFACTOR;
    }

    public void setLngFACTOR(long lngFACTOR) {
        this.lngFACTOR = lngFACTOR;
    }

    public double getDblPROVISOC() {
        return dblPROVISOC;
    }

    public void setDblPROVISOC(double dblPROVISOC) {
        this.dblPROVISOC = dblPROVISOC;
    }

    public double getDblPROVISOP() {
        return dblPROVISOP;
    }

    public void setDblPROVISOP(double dblPROVISOP) {
        this.dblPROVISOP = dblPROVISOP;
    }

    public double getDblFARE() {
        return dblFARE;
    }

    public void setDblFARE(double dblFARE) {
        this.dblFARE = dblFARE;
    }

    public double getDblSPA() {
        return dblSPA;
    }

    public void setDblSPA(double dblSPA) {
        this.dblSPA = dblSPA;
    }

    public double getDblAMOUNT() {
        return dblAMOUNT;
    }

    public void setDblAMOUNT(double dblAMOUNT) {
        this.dblAMOUNT = dblAMOUNT;
    }

    public double getDblSURCHARGE() {
        return dblSURCHARGE;
    }

    public void setDblSURCHARGE(double dblSURCHARGE) {
        this.dblSURCHARGE = dblSURCHARGE;
    }

    public double getDblADJUST() {
        return dblADJUST;
    }

    public void setDblADJUST(double dblADJUST) {
        this.dblADJUST = dblADJUST;
    }

    public double getDblXFARE() {
        return dblXFARE;
    }

    public void setDblXFARE(double dblXFARE) {
        this.dblXFARE = dblXFARE;
    }

    public double getDblDIFER() {
        return dblDIFER;
    }

    public void setDblDIFER(double dblDIFER) {
        this.dblDIFER = dblDIFER;
    }

    public double getDblTRFM() {
        return dblTRFM;
    }

    public void setDblTRFM(double dblTRFM) {
        this.dblTRFM = dblTRFM;
    }

    public double getDblPLUSS() {
        return dblPLUSS;
    }

    public void setDblPLUSS(double dblPLUSS) {
        this.dblPLUSS = dblPLUSS;
    }

    public double getDblSTOP() {
        return dblSTOP;
    }

    public void setDblSTOP(double dblSTOP) {
        this.dblSTOP = dblSTOP;
    }

    public double getDblACUE() {
        return dblACUE;
    }

    public void setDblACUE(double dblACUE) {
        this.dblACUE = dblACUE;
    }

    public double getDblVLMPA() {
        return dblVLMPA;
    }

    public void setDblVLMPA(double dblVLMPA) {
        this.dblVLMPA = dblVLMPA;
    }

    public double getDblVLSRP() {
        return dblVLSRP;
    }

    public void setDblVLSRP(double dblVLSRP) {
        this.dblVLSRP = dblVLSRP;
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

    public double getDblYANQ() {
        return dblYANQ;
    }

    public void setDblYANQ(double dblYANQ) {
        this.dblYANQ = dblYANQ;
    }

    public double getDblA728ACUE1() {
        return dblA728ACUE1;
    }

    public void setDblA728ACUE1(double dblA728ACUE1) {
        this.dblA728ACUE1 = dblA728ACUE1;
    }

    public double getDblA728DIFER1() {
        return dblA728DIFER1;
    }

    public void setDblA728DIFER1(double dblA728DIFER1) {
        this.dblA728DIFER1 = dblA728DIFER1;
    }

    public double getDblA728TRFM1() {
        return dblA728TRFM1;
    }

    public void setDblA728TRFM1(double dblA728TRFM1) {
        this.dblA728TRFM1 = dblA728TRFM1;
    }

    public List<RECA823> getListaTexto() {
        return listaTexto;
    }

    public void setListaTexto(List<RECA823> listaTexto) {
        this.listaTexto = listaTexto;
    }
    
    public double getDblTotSURCHARGE() {
        return dblTotSURCHARGE;
    }

    public void setDblTotSURCHARGE(double dblTotSURCHARGE) {
        this.dblTotSURCHARGE = dblTotSURCHARGE;
    }

    public double getDblTotXFARE() {
        return dblTotXFARE;
    }

    public void setDblTotXFARE(double dblTotXFARE) {
        this.dblTotXFARE = dblTotXFARE;
    }

    public double getLngTotFACTOR() {
        return lngTotFACTOR;
    }

    public void setLngTotFACTOR(long lngTotFACTOR) {
        this.lngTotFACTOR = lngTotFACTOR;
    }

    public double getDblTotPROVISOC() {
        return dblTotPROVISOC;
    }

    public void setDblTotPROVISOC(double dblTotPROVISOC) {
        this.dblTotPROVISOC = dblTotPROVISOC;
    }

    public double getDblTotSPA() {
        return dblTotSPA;
    }

    public void setDblTotSPA(double dblTotSPA) {
        this.dblTotSPA = dblTotSPA;
    }

    public double getDblTotAMOUNT() {
        return dblTotAMOUNT;
    }

    public void setDblTotAMOUNT(double dblTotAMOUNT) {
        this.dblTotAMOUNT = dblTotAMOUNT;
    }

    public double getDblTotVLSRP() {
        return dblTotVLSRP;
    }

    public void setDblTotVLSRP(double dblTotVLSRP) {
        this.dblTotVLSRP = dblTotVLSRP;
    }

    public double getDblTotVLMPA() {
        return dblTotVLMPA;
    }

    public void setDblTotVLMPA(double dblTotVLMPA) {
        this.dblTotVLMPA = dblTotVLMPA;
    }

    public double getDblTotADJUST() {
        return dblTotADJUST;
    }

    public void setDblTotADJUST(double dblTotADJUST) {
        this.dblTotADJUST = dblTotADJUST;
    }

    public double getDblTotDIFER() {
        return dblTotDIFER;
    }

    public void setDblTotDIFER(double dblTotDIFER) {
        this.dblTotDIFER = dblTotDIFER;
    }

    /**
     * @return the strRUTAD
     */
    public String getStrRUTAD() {
        return strRUTAD;
    }

    /**
     * @param strRUTAD the strRUTAD to set
     */
    public void setStrRUTAD(String strRUTAD) {
        this.strRUTAD = strRUTAD;
    }
}
