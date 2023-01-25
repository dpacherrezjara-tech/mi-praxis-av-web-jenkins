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
public class PSF002 implements Serializable {

    private String strCCUST;
    private String strNDOC;
    private String strTDOC;
    private String strSEQ;
    private String strSTVAL;
    private String strDSEND;
    private String strDRECEI;
    private String strNAGENT;
    private String strNGUIA;
    private String strSGUIA;
    private String strDREF;
    private String strCDEPART;
    private String strCARRIVA;
    private String strNFLIGHT;
    private String strDFLIGHT;
    private String strNPLANE;
    private String strFORIG;
    private long lngQOAL;
    private long lngQDOC;
    private long lngQDOCR;
    private long lngQCUPR;
    private long lngQSCAN;
    private long lngQFIM;
    private long lngQCUPOW;
    private long lngQCUPOAL;
    private String strDSCANER;
    private String strFSENDID;
    private String strUSAS;
    private String strFECL;
    private String strPROCEID;
    private String strSTATU;
    private String strUSCR;
    private String strFECR;
    private String strHOCR;
    private String strUSUP;
    private String strFEUP;
    private String strHOUP;
    private String strEstado;
    private String strEstilo;
    private String strEstiloExcel;
    private String strOriNFLIGHT;
    private String strOriDFLIGHT;
    private String strOriCDEPART;
    private String strOriCARRIVA;
    private boolean booSelect;
    //Campos de Filtro ***************
    private String strYearFrom;
    private String strMonthFrom;
    private String strDayFrom;
    private String strYearTo;
    private String strMonthTo;
    private String strDayTo;
    private String strDate;
    //Campos para obtener cant de docs por Paquete 
    private long lngQtyDocPaper;
    private long lngQtyDocATB;
    private long lngQtyDocETKT;
    private long lngQtyDocTransf;
    private long lngQtyDocDummy;
    private long lngQtyDocMaster;
    private long lngQtyDocExtra;
    private long lngQtyDocInf;
    private long lngQtyTotal;
    //Campos para obtener cant de docs por Fecha de Vuelo 
    private long lngQtyVuelos;
    private long lngQtyStandBy;
    private long lngQtyProcess;
    private long lngQtyClosed;
    private long lngQtyPendScanned;
    private long lngQtyScanned;
    private long lngQtyDias;
    private long lngQtyDiasArrived;
    private long lngQtyDiasSend;
    //Campos de Escaneo ***********************************
    private String strDSCAN;
    private long lngQtyQSCANED;
    //Campos relacionados con el PSF003 *******************
    private String strCCIA;
    private String strFORMA;
    private String strSERIE;
    private String strCUPON;
    private String strValor;
    //Campos para el reporte de _Totales ******************
    private String fecScanDesde;
    private String fecScanHasta;
    private long lngQtyDiasScan;
    private long lngQtyScan24H;
    private long lngQtyScan48H;
    private long lngQtySCan72H;
    //Campos para obtener cant de docs por Uso de Forma 
    private long lngQtyTUSOE;
    private long lngQtyTUSOF;
    private long lngQtyTUSOM;
    private long lngQtyTUSOT;
    private long lngQtyTUSOtros;
    private boolean saturday;
    private boolean sunday;
    private long lngQtyAF;
    private long lngQtyOAL;
    //Campos para obtener cant de docs por Uso de Forma x OAL
    private long lngQtyOAL_E;
    private long lngQtyOAL_T;
    private long lngQtyOAL_M;
    private long lngQtyOAL_F;
    private long lngQtyOAL_Otros;
    //Campos para obtener cant de docs por Uso de Forma x AF
    private long lngQtyAF_E;
    private long lngQtyAF_T;
    private long lngQtyAF_M;
    private long lngQtyAF_F;
    private long lngQtyAF_Otros;
    private long lngQtyE; //FORIG = 'E'
    private long lngQtyM; //FORIG = 'M'
    
    private String strFlagFim;
    
    public PSF002() {

        strCCUST = "";
        strNDOC = "";
        strTDOC = "";
        strSEQ = "";
        strSTVAL = "";
        strDSEND = "";
        strDRECEI = "";
        strNAGENT = "";
        strNGUIA = "";
        strSGUIA = "";
        strDREF = "";
        strCDEPART = "";
        strCARRIVA = "";
        strNFLIGHT = "";
        strDFLIGHT = "";
        strNPLANE = "";
        strFORIG = "";
        lngQOAL = 0;
        lngQDOC = 0;
        lngQDOCR = 0;
        lngQCUPR = 0;
        lngQSCAN = 0;
        lngQFIM = 0;
        lngQCUPOW = 0;
        lngQCUPOAL = 0;
        strDSCANER = "";
        strFSENDID = "";
        strUSAS = "";
        strFECL = "";
        strPROCEID = "";
        strSTATU = "";
        strUSCR = "";
        strFECR = "";
        strHOCR = "";
        strUSUP = "";
        strFEUP = "";
        strHOUP = "";
        strEstado = "Unprocessed";
        strEstilo = "clsTextBlueBold";
        strEstiloExcel = "clsTextBlueBold";
        strOriNFLIGHT = "";
        strOriDFLIGHT = "";
        strOriCDEPART = "";
        strOriCARRIVA = "";
        booSelect = false;
        strYearFrom = "";
        strMonthFrom = "";
        strDayFrom = "";
        strYearTo = "";
        strMonthTo = "";
        strDayTo = "";
        strDate = "DSEND";
        lngQtyDocPaper = 0;
        lngQtyDocATB = 0;
        lngQtyDocETKT = 0;
        lngQtyDocTransf = 0;
        lngQtyDocDummy = 0;
        lngQtyDocMaster = 0;
        lngQtyDocExtra = 0;
        lngQtyDocInf = 0;
        lngQtyTotal = 0;
        lngQtyVuelos = 0;
        lngQtyStandBy = 0;
        lngQtyProcess = 0;
        lngQtyClosed = 0;
        lngQtyPendScanned = 0;
        lngQtyScanned = 0;
        lngQtyDias = 0;
        lngQtyDiasArrived = 0;
        lngQtyDiasSend = 0;
        strDSCAN = "";
        lngQtyQSCANED = 0;
        strCCIA = "";
        strFORMA = "";
        strSERIE = "";
        strCUPON = "";
        strValor = "";
        fecScanDesde = "";
        fecScanHasta = "";
        lngQtyDiasScan = 0;
        lngQtyScan24H = 0;
        lngQtyScan48H = 0;
        lngQtySCan72H = 0;
        lngQtyTUSOE = 0;
        lngQtyTUSOF = 0;
        lngQtyTUSOM = 0;
        lngQtyTUSOT = 0;
        lngQtyTUSOtros = 0;
        saturday = false;
        sunday = false;
        lngQtyAF = 0;
        lngQtyOAL = 0;
        
        lngQtyOAL_E = 0;
        lngQtyOAL_T = 0;
        lngQtyOAL_M = 0;
        lngQtyOAL_F = 0;
        lngQtyOAL_Otros = 0;
        
        lngQtyAF_E = 0;
        lngQtyAF_T = 0;
        lngQtyAF_M = 0;
        lngQtyAF_F = 0;
        lngQtyAF_Otros = 0;
        
        lngQtyE = 0;
        lngQtyM = 0;
        
        strFlagFim = "";
        
    }

    public String getStrCCUST() {
        return strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public String getStrNDOC() {
        return strNDOC;
    }

    public void setStrNDOC(String strNDOC) {
        this.strNDOC = strNDOC;
    }

    public String getStrTDOC() {
        return strTDOC;
    }

    public void setStrTDOC(String strTDOC) {
        this.strTDOC = strTDOC;
    }

    public String getStrSEQ() {
        return strSEQ;
    }

    public void setStrSEQ(String strSEQ) {
        this.strSEQ = strSEQ;
    }

    public String getStrSTVAL() {
        return strSTVAL;
    }

    public void setStrSTVAL(String strSTVAL) {
        this.strSTVAL = strSTVAL;
    }

    public String getStrDSEND() {
        return strDSEND;
    }

    public void setStrDSEND(String strDSEND) {
        this.strDSEND = strDSEND;
    }

    public String getStrDRECEI() {
        return strDRECEI;
    }

    public void setStrDRECEI(String strDRECEI) {
        this.strDRECEI = strDRECEI;
    }

    public String getStrNAGENT() {
        return strNAGENT;
    }

    public void setStrNAGENT(String strNAGENT) {
        this.strNAGENT = strNAGENT;
    }

    public String getStrNGUIA() {
        return strNGUIA;
    }

    public void setStrNGUIA(String strNGUIA) {
        this.strNGUIA = strNGUIA;
    }

    public String getStrSGUIA() {
        return strSGUIA;
    }

    public void setStrSGUIA(String strSGUIA) {
        this.strSGUIA = strSGUIA;
    }

    public String getStrDREF() {
        return strDREF;
    }

    public void setStrDREF(String strDREF) {
        this.strDREF = strDREF;
    }

    public String getStrCDEPART() {
        return strCDEPART;
    }

    public void setStrCDEPART(String strCDEPART) {
        this.strCDEPART = strCDEPART;
    }

    public String getStrCARRIVA() {
        return strCARRIVA;
    }

    public void setStrCARRIVA(String strCARRIVA) {
        this.strCARRIVA = strCARRIVA;
    }

    public String getStrNFLIGHT() {
        return strNFLIGHT;
    }

    public void setStrNFLIGHT(String strNFLIGHT) {
        this.strNFLIGHT = strNFLIGHT;
    }

    public String getStrDFLIGHT() {
        return strDFLIGHT;
    }

    public void setStrDFLIGHT(String strDFLIGHT) {
        this.strDFLIGHT = strDFLIGHT;
    }

    public String getStrNPLANE() {
        return strNPLANE;
    }

    public void setStrNPLANE(String strNPLANE) {
        this.strNPLANE = strNPLANE;
    }

    public long getLngQDOC() {
        return lngQDOC;
    }

    public void setLngQDOC(long lngQDOC) {
        this.lngQDOC = lngQDOC;
    }

    public long getLngQDOCR() {
        return lngQDOCR;
    }

    public void setLngQDOCR(long lngQDOCR) {
        this.lngQDOCR = lngQDOCR;
    }

    public String getStrUSAS() {
        return strUSAS;
    }

    public void setStrUSAS(String strUSAS) {
        this.strUSAS = strUSAS;
    }

    public String getStrFECL() {
        return strFECL;
    }

    public void setStrFECL(String strFECL) {
        this.strFECL = strFECL;
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

    public String getStrEstado() {
        
        if(strSTVAL.trim().equals("") || strSTVAL.trim().equals("1")){
            return "Unprocessed";
        }else if(strSTVAL.trim().equals("2")){
            return "Processing";
        }else if(strSTVAL.trim().equals("3")){
            return "Closed";
        }else{
            return strEstado;
        }
    }

    public void setStrEstado(String strEstado) {
        this.strEstado = strEstado;
    }

    public String getStrEstilo() {
        if(strSTVAL.trim().equals("") || strSTVAL.trim().equals("1")){
            return "clsTextBlueBold";
        }else if(strSTVAL.trim().equals("2")){
            return "clsTextBackGreenBold";
        }else if(strSTVAL.trim().equals("3")){
            return "clsTextBackBlueBold";
        }else{
            return strEstilo;
        }
    }

    public void setStrEstilo(String strEstilo) {
        this.strEstilo = strEstilo;
    }
    
    
    public String getStrYearFrom() {
        return strYearFrom;
    }
    public void setStrYearFrom(String strYearFrom) {
        this.strYearFrom = strYearFrom;
    }

    
    public String getStrMonthFrom() {
        return strMonthFrom;
    }
    public void setStrMonthFrom(String strMonthFrom) {
        this.strMonthFrom = strMonthFrom;
    }

    
    public String getStrDayFrom() {
        return strDayFrom;
    }
    public void setStrDayFrom(String strDayFrom) {
        this.strDayFrom = strDayFrom;
    }

    
    public String getStrYearTo() {
        return strYearTo;
    }
    public void setStrYearTo(String strYearTo) {
        this.strYearTo = strYearTo;
    }

    
    public String getStrMonthTo() {
        return strMonthTo;
    }
    public void setStrMonthTo(String strMonthTo) {
        this.strMonthTo = strMonthTo;
    }

    
    public String getStrDayTo() {
        return strDayTo;
    }
    public void setStrDayTo(String strDayTo) {
        this.strDayTo = strDayTo;
    }

    
    public long getLngQtyDocPaper() {
        return lngQtyDocPaper;
    }

    public void setLngQtyDocPaper(long lngQtyDocPaper) {
        this.lngQtyDocPaper = lngQtyDocPaper;
    }

    
    public long getLngQtyDocATB() {
        return lngQtyDocATB;
    }

    public void setLngQtyDocATB(long lngQtyDocATB) {
        this.lngQtyDocATB = lngQtyDocATB;
    }

    
    public long getLngQtyDocETKT() {
        return lngQtyDocETKT;
    }

    public void setLngQtyDocETKT(long lngQtyDocETKT) {
        this.lngQtyDocETKT = lngQtyDocETKT;
    }

    
    public long getLngQtyDocTransf() {
        return lngQtyDocTransf;
    }

    public void setLngQtyDocTransf(long lngQtyDocTransf) {
        this.lngQtyDocTransf = lngQtyDocTransf;
    }

    
    public long getLngQtyDocDummy() {
        return lngQtyDocDummy;
    }

    public void setLngQtyDocDummy(long lngQtyDocDummy) {
        this.lngQtyDocDummy = lngQtyDocDummy;
    }

    
    public long getLngQtyDocMaster() {
        return lngQtyDocMaster;
    }

    public void setLngQtyDocMaster(long lngQtyDocMaster) {
        this.lngQtyDocMaster = lngQtyDocMaster;
    }

    
    public long getLngQtyDocExtra() {
        return lngQtyDocExtra;
    }

    public void setLngQtyDocExtra(long lngQtyDocExtra) {
        this.lngQtyDocExtra = lngQtyDocExtra;
    }

    
    public long getLngQtyDocInf() {
        return lngQtyDocInf;
    }

    public void setLngQtyDocInf(long lngQtyDocInf) {
        this.lngQtyDocInf = lngQtyDocInf;
    }

    
    public String getStrDSCAN() {
        return strDSCAN;
    }

    public void setStrDSCAN(String strDSCAN) {
        this.strDSCAN = strDSCAN;
    }

    
    public long getLngQtyQSCANED() {
        return lngQtyQSCANED;
    }

    public void setLngQtyQSCANED(long lngQtyQSCANED) {
        this.lngQtyQSCANED = lngQtyQSCANED;
    }

    public long getLngQOAL() {
        return lngQOAL;
    }

    public void setLngQOAL(long lngQOAL) {
        this.lngQOAL = lngQOAL;
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

    public long getLngQSCAN() {
        return lngQSCAN;
    }

    public void setLngQSCAN(long lngQSCAN) {
        this.lngQSCAN = lngQSCAN;
    }

    public String getStrDSCANER() {
        return strDSCANER;
    }

    public void setStrDSCANER(String strDSCANER) {
        this.strDSCANER = strDSCANER;
    }

    public String getStrFSENDID() {
        return strFSENDID;
    }

    public void setStrFSENDID(String strFSENDID) {
        this.strFSENDID = strFSENDID;
    }

    public long getLngQCUPR() {
        return lngQCUPR;
    }

    public void setLngQCUPR(long lngQCUPR) {
        this.lngQCUPR = lngQCUPR;
    }

    public String getStrCCIA() {
        return strCCIA;
    }

    public void setStrCCIA(String strCCIA) {
        this.strCCIA = strCCIA;
    }

    public String getStrFORMA() {
        return strFORMA;
    }

    public void setStrFORMA(String strFORMA) {
        this.strFORMA = strFORMA;
    }

    public String getStrSERIE() {
        return strSERIE;
    }

    public void setStrSERIE(String strSERIE) {
        this.strSERIE = strSERIE;
    }

    public String getStrCUPON() {
        return strCUPON;
    }

    public void setStrCUPON(String strCUPON) {
        this.strCUPON = strCUPON;
    }

    public String getStrDate() {
        return strDate;
    }

    public void setStrDate(String strDate) {
        this.strDate = strDate;
    }

    public String getStrEstiloExcel() {
        return strEstiloExcel;
    }

    public void setStrEstiloExcel(String strEstiloExcel) {
        this.strEstiloExcel = strEstiloExcel;
    }

    public String getStrFORIG() {
        return strFORIG;
    }

    public void setStrFORIG(String strFORIG) {
        this.strFORIG = strFORIG;
    }

    public boolean isBooSelect() {
        return booSelect;
    }

    public void setBooSelect(boolean booSelect) {
        this.booSelect = booSelect;
    }

    public String getStrOriNFLIGHT() {
        return strOriNFLIGHT;
    }

    public void setStrOriNFLIGHT(String strOriNFLIGHT) {
        this.strOriNFLIGHT = strOriNFLIGHT;
    }

    public String getStrOriDFLIGHT() {
        return strOriDFLIGHT;
    }

    public void setStrOriDFLIGHT(String strOriDFLIGHT) {
        this.strOriDFLIGHT = strOriDFLIGHT;
    }

    public long getLngQtyTotal() {
        return lngQtyTotal;
    }

    public void setLngQtyTotal(long lngQtyTotal) {
        this.lngQtyTotal = lngQtyTotal;
    }

    public String getStrOriCDEPART() {
        return strOriCDEPART;
    }

    public void setStrOriCDEPART(String strOriCDEPART) {
        this.strOriCDEPART = strOriCDEPART;
    }

    public String getStrOriCARRIVA() {
        return strOriCARRIVA;
    }

    public void setStrOriCARRIVA(String strOriCARRIVA) {
        this.strOriCARRIVA = strOriCARRIVA;
    }

    public long getLngQtyVuelos() {
        return lngQtyVuelos;
    }

    public void setLngQtyVuelos(long lngQtyVuelos) {
        this.lngQtyVuelos = lngQtyVuelos;
    }

    public long getLngQtyStandBy() {
        return lngQtyStandBy;
    }

    public void setLngQtyStandBy(long lngQtyStandBy) {
        this.lngQtyStandBy = lngQtyStandBy;
    }

    public long getLngQtyProcess() {
        return lngQtyProcess;
    }

    public void setLngQtyProcess(long lngQtyProcess) {
        this.lngQtyProcess = lngQtyProcess;
    }

    public long getLngQtyClosed() {
        return lngQtyClosed;
    }

    public void setLngQtyClosed(long lngQtyClosed) {
        this.lngQtyClosed = lngQtyClosed;
    }

    public long getLngQtyScanned() {
        return lngQtyScanned;
    }

    public void setLngQtyScanned(long lngQtyScanned) {
        this.lngQtyScanned = lngQtyScanned;
    }

    public long getLngQtyDias() {
        return lngQtyDias;
    }

    public void setLngQtyDias(long lngQtyDias) {
        this.lngQtyDias = lngQtyDias;
    }

    public long getLngQtyDiasArrived() {
        return lngQtyDiasArrived;
    }

    public void setLngQtyDiasArrived(long lngQtyDiasArrived) {
        this.lngQtyDiasArrived = lngQtyDiasArrived;
    }

    public long getLngQtyDiasSend() {
        return lngQtyDiasSend;
    }

    public void setLngQtyDiasSend(long lngQtyDiasSend) {
        this.lngQtyDiasSend = lngQtyDiasSend;
    }

    public long getLngQtyPendScanned() {
        return lngQtyPendScanned;
    }

    public void setLngQtyPendScanned(long lngQtyPendScanned) {
        this.lngQtyPendScanned = lngQtyPendScanned;
    }

    public String getStrValor() {
        return strValor;
    }

    public void setStrValor(String strValor) {
        this.strValor = strValor;
    }

    public String getFecScanDesde() {
        return fecScanDesde;
    }

    public void setFecScanDesde(String fecScanDesde) {
        this.fecScanDesde = fecScanDesde;
    }

    public String getFecScanHasta() {
        return fecScanHasta;
    }

    public void setFecScanHasta(String fecScanHasta) {
        this.fecScanHasta = fecScanHasta;
    }

    public long getLngQtyDiasScan() {
        return lngQtyDiasScan;
    }

    public void setLngQtyDiasScan(long lngQtyDiasScan) {
        this.lngQtyDiasScan = lngQtyDiasScan;
    }

    public long getLngQtyScan24H() {
        return lngQtyScan24H;
    }

    public void setLngQtyScan24H(long lngQtyScan24H) {
        this.lngQtyScan24H = lngQtyScan24H;
    }

    public long getLngQtyScan48H() {
        return lngQtyScan48H;
    }

    public void setLngQtyScan48H(long lngQtyScan48H) {
        this.lngQtyScan48H = lngQtyScan48H;
    }

    public long getLngQtySCan72H() {
        return lngQtySCan72H;
    }

    public void setLngQtySCan72H(long lngQtySCan72H) {
        this.lngQtySCan72H = lngQtySCan72H;
    }

    public long getLngQtyTUSOE() {
        return lngQtyTUSOE;
    }

    public void setLngQtyTUSOE(long lngQtyTUSOE) {
        this.lngQtyTUSOE = lngQtyTUSOE;
    }

    public long getLngQtyTUSOF() {
        return lngQtyTUSOF;
    }

    public void setLngQtyTUSOF(long lngQtyTUSOF) {
        this.lngQtyTUSOF = lngQtyTUSOF;
    }

    public long getLngQtyTUSOM() {
        return lngQtyTUSOM;
    }

    public void setLngQtyTUSOM(long lngQtyTUSOM) {
        this.lngQtyTUSOM = lngQtyTUSOM;
    }

    public long getLngQtyTUSOT() {
        return lngQtyTUSOT;
    }

    public void setLngQtyTUSOT(long lngQtyTUSOT) {
        this.lngQtyTUSOT = lngQtyTUSOT;
    }

    public long getLngQtyTUSOtros() {
        return lngQtyTUSOtros;
    }

    public void setLngQtyTUSOtros(long lngQtyTUSOtros) {
        this.lngQtyTUSOtros = lngQtyTUSOtros;
    }

    public boolean isSaturday() {
        return saturday;
    }

    public void setSaturday(boolean saturday) {
        this.saturday = saturday;
    }

    public boolean isSunday() {
        return sunday;
    }

    public void setSunday(boolean sunday) {
        this.sunday = sunday;
    }

    public long getLngQtyAF() {
        return lngQtyAF;
    }

    public void setLngQtyAF(long lngQtyAF) {
        this.lngQtyAF = lngQtyAF;
    }

    public long getLngQtyOAL() {
        return lngQtyOAL;
    }

    public void setLngQtyOAL(long lngQtyOAL) {
        this.lngQtyOAL = lngQtyOAL;
    }

    public long getLngQtyAF_E() {
        return lngQtyAF_E;
    }

    public void setLngQtyAF_E(long lngQtyAF_E) {
        this.lngQtyAF_E = lngQtyAF_E;
    }

    public long getLngQtyAF_F() {
        return lngQtyAF_F;
    }

    public void setLngQtyAF_F(long lngQtyAF_F) {
        this.lngQtyAF_F = lngQtyAF_F;
    }

    public long getLngQtyAF_M() {
        return lngQtyAF_M;
    }

    public void setLngQtyAF_M(long lngQtyAF_M) {
        this.lngQtyAF_M = lngQtyAF_M;
    }

    public long getLngQtyAF_T() {
        return lngQtyAF_T;
    }

    public void setLngQtyAF_T(long lngQtyAF_T) {
        this.lngQtyAF_T = lngQtyAF_T;
    }

    public long getLngQtyOAL_E() {
        return lngQtyOAL_E;
    }

    public void setLngQtyOAL_E(long lngQtyOAL_E) {
        this.lngQtyOAL_E = lngQtyOAL_E;
    }

    public long getLngQtyOAL_F() {
        return lngQtyOAL_F;
    }

    public void setLngQtyOAL_F(long lngQtyOAL_F) {
        this.lngQtyOAL_F = lngQtyOAL_F;
    }

    public long getLngQtyOAL_M() {
        return lngQtyOAL_M;
    }

    public void setLngQtyOAL_M(long lngQtyOAL_M) {
        this.lngQtyOAL_M = lngQtyOAL_M;
    }

    public long getLngQtyOAL_T() {
        return lngQtyOAL_T;
    }

    public void setLngQtyOAL_T(long lngQtyOAL_T) {
        this.lngQtyOAL_T = lngQtyOAL_T;
    }

    public long getLngQtyOAL_Otros() {
        return lngQtyOAL_Otros;
    }

    public void setLngQtyOAL_Otros(long lngQtyOAL_Otros) {
        this.lngQtyOAL_Otros = lngQtyOAL_Otros;
    }

    public long getLngQtyAF_Otros() {
        return lngQtyAF_Otros;
    }

    public void setLngQtyAF_Otros(long lngQtyAF_Otros) {
        this.lngQtyAF_Otros = lngQtyAF_Otros;
    }

    public long getLngQtyE() {
        return lngQtyE;
    }

    public void setLngQtyE(long lngQtyE) {
        this.lngQtyE = lngQtyE;
    }

    public long getLngQtyM() {
        return lngQtyM;
    }

    public void setLngQtyM(long lngQtyM) {
        this.lngQtyM = lngQtyM;
    }

    public long getLngQFIM() {
        return lngQFIM;
    }

    public void setLngQFIM(long lngQFIM) {
        this.lngQFIM = lngQFIM;
    }

    public long getLngQCUPOW() {
        return lngQCUPOW;
    }

    public void setLngQCUPOW(long lngQCUPOW) {
        this.lngQCUPOW = lngQCUPOW;
    }

    public long getLngQCUPOAL() {
        return lngQCUPOAL;
    }

    public void setLngQCUPOAL(long lngQCUPOAL) {
        this.lngQCUPOAL = lngQCUPOAL;
    }

    public String getStrFlagFim() {
        return strFlagFim;
    }

    public void setStrFlagFim(String strFlagFim) {
        this.strFlagFim = strFlagFim;
    }
    
    
    
    
}
