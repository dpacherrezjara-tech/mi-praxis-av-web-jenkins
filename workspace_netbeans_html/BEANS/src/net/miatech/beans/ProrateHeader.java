package net.miatech.beans;

import java.util.List;
import net.miatech.beans.lists.RECA729List;
import net.miatech.utils.Functions;

/**
 *
 * @author claudia
 */
public class ProrateHeader {

    private String strCCUST;
    private String strNROPRT;
    private String strBILLINGDATE;
    private String strAirlineName;
    private String strAirlineAlfaCode;
    private String strISSUEDATE;
    private String strBILLINGAIRLINE;
    private String strSELLINGPLACE;
    private String strDOCNBR;
    private String strISSUEPLACE;
    private String strSORIGIN;
    private String strSDESTINY;
    private String strFLIGHTDATE;
    private String strCURR;
    private String strFCURR;
    private String strECURR;
    private String strPLUSSI;
    private String strMISC;
    private String strDISCT;
    private String strIT;
    private String strFABASIS;
    private String strLOHO;
    private String strINIT;
    private String strRCURR;
    private String strFILENAME;
    private String strFILENAMEORIG;
    private String strA020TICKET;
    private String strA020CODOB1;
    private String strA020COMME1;
    private String strA020CODOB2;
    private String strA020COMME2;
    private String strA020CODOB3;
    private String strA020COMME3;
    private String strA020CODOB4;
    private String strA020COMME4;
    private String strA020CODOB5;
    private String strA020COMME5;
    private String strA020COMME6;
    private String strA020COMME7;
    private String strA020COMME8;
    private String strA020COMME9;
    private String strA020COMME10;
    private String strA020GRUPO;
    private String strA020NROPRT;
    private String strA020USER;
    private String strA020SDATE;
    private String strA020STIME;
    private String strA020FRECHA;
    private String strA020PSTRF;
    private String strA020RMSN;
    private String strA020RMANT;
    private String strSEQPRT;
    private String strTUSO;
    private String strDCHEQ;
    private String strTVENTA;
    private String strMONREG;
    private String strINDSAM;
    private String strSELEC;
    private String strGRUPO;
    private String strCOUVTA;
    private String strCOUEMI;
    private String strAJTRAM;
    private String strUser;
    private String strMSGERR;
    private String strFUNC;
    private String strRUTAORIGENDESTINO;
    private String strAdditionalInfo;
    private String strFlag;
    private String strCHS;
    private String strA020SUFECH;
    private String strA020FUSO;
    private String strA020CODMOT;
    private String strFTIMELIM;
    private String strA021CONCEP01;
    private String strA021CONCEP02;
    private String strA021CONCEP03;
    private String strA021CONCEP04;
    private String strA021CONCEP05;
    private String strA020CLASRM;
    private String strA020BASE;
    private String strA728CUPON;
    private String strCampoErrado;
    private String strA020MONEDA;
    private String strA020MNRCD;
    private String strETKTIND;
    private String strA020DEBHAB;
    private String strA020QSEG;
    private String strProvisoAirName;
    private String strProvisoAirCode;
    private String strCierreActual;
    private String strRutaServletImg;
    private String strScrollImg;
    private String strA728RERUT;
    private double dblATBP;
    private double dblFARE;
    private double dblEQVFARE;
    private double dblSTOPOVERC;
    private double dblPLUSSC;
    private double dblROE;
    private double dblDISCC;
    private double dblNET;
    private double dblA020SUDEBI;
    private double dblA020IMPNAC;
    private double dblA020TOTDEB;
    private double dblA020ACEPTA;
    private double dblA020IMPINT;
    private double dblA020TOTHAB;
    private double dblA020REDEBI;
    private double dblA020COMISI;
    private double dblA020TAX;
    private double dblA020ANALIZ;
    private double dblA020COMISIP;
    private double dblA020NETO;
    private double dblTCAREG;
    private double dblTCASYS;
    private double dblTCAPAG;
    private double dblVALMINIMOTARIFA;
    private double dblVALMINIMOTAX;
    private double dblA020TARIFA;
    private double dblA020FAREUS;
    private String strNumeroRechazo;
    private String[] listaOtrasRutas;
    private String strA020SUFACT;
    private int intINDPRT;
    private int intSTOPOVERQ;
    private boolean tieneComision;
    private boolean validarTiempoLimite;
    private boolean esEscogido;
    private List<ProrateSector> SECTORS;
    private String strA020TCALC;
    private boolean resultado;
    private String strA020TIPORM;
    //Manejo de Errores ==========================
    private String strTextBoxErr;
    // ===========================================
    private RECA729List lstTaxes;
    private double dblA020BOTCPR;//Billing Other Comm
    private double dblA020BOTCRM;//Perc Billing Other Comm
    private double dblA020AOTCPM;//Miatech Other Comm
    private double dblA020AOTCRM;//Perc Miatech Other Comm
    private double dblA020DOTCRM;//Difference Other Comm

    /**
     * Creates a new instance of ProrateHeader
     */
    public ProrateHeader() {
        strCCUST = "";
        strNROPRT = "";
        strBILLINGDATE = "";
        strAirlineName = "";
        strAirlineAlfaCode = "";
        strISSUEDATE = "";
        strBILLINGAIRLINE = "";
        strSELLINGPLACE = "";
        strDOCNBR = "";
        strISSUEPLACE = "";
        strSORIGIN = "";
        strSDESTINY = "";
        strFLIGHTDATE = "";
        strCURR = "";
        strFCURR = "";
        strECURR = "";
        strPLUSSI = "";
        strMISC = "";
        strDISCT = "";
        strIT = "";
        strFABASIS = "";
        strLOHO = "";
        strINIT = "";
        strRCURR = "";
        strFILENAME = "";
        strFILENAMEORIG = "";
        strA020TICKET = "";
        strA020CODOB1 = "";
        strA020COMME1 = "";
        strA020CODOB2 = "";
        strA020COMME2 = "";
        strA020CODOB3 = "";
        strA020COMME3 = "";
        strA020CODOB4 = "";
        strA020COMME4 = "";
        strA020CODOB5 = "";
        strA020COMME5 = "";
        strA020COMME6 = "";
        strA020COMME7 = "";
        strA020COMME8 = "";
        strA020COMME9 = "";
        strA020COMME10 = "";
        strA020GRUPO = "";
        strA020NROPRT = "";
        strA020USER = "";
        strA020SDATE = "";
        strA020STIME = "";
        strA020FRECHA = "";
        strA020PSTRF = "";
        strA020RMSN = "";
        strA020RMANT = "";
        strSEQPRT = "";
        strTUSO = "";
        strDCHEQ = "";
        strTVENTA = "";
        strMONREG = "";
        strINDSAM = "";
        strSELEC = "";
        strGRUPO = "";
        strCOUVTA = "";
        strCOUEMI = "";
        strAJTRAM = "";
        strUser = "";
        strMSGERR = "";
        strFUNC = "";
        strRUTAORIGENDESTINO = "";
        strAdditionalInfo = "";
        strFlag = "";
        strCHS = "";
        strA020SUFECH = "";
        strA020FUSO = "";
        strA020CODMOT = "";
        strFTIMELIM = "";
        strA021CONCEP01 = "";
        strA021CONCEP02 = "";
        strA021CONCEP03 = "";
        strA021CONCEP04 = "";
        strA021CONCEP05 = "";
        strA020CLASRM = "";
        strA020BASE = "";
        strA728CUPON = "";
        strCampoErrado = "";
        strA020MONEDA = "";
        strA020MNRCD = "";
        strETKTIND = "";
        strA020DEBHAB = "";
        strA020QSEG = "";
        strProvisoAirName = "";
        strProvisoAirCode = "";
        strCierreActual = "";
        strRutaServletImg = "";
        strScrollImg = "";
        strA728RERUT = "";
        dblATBP = 0;
        dblFARE = 0;
        dblEQVFARE = 0;
        dblSTOPOVERC = 0;
        dblPLUSSC = 0;
        dblROE = 0;
        dblDISCC = 0;
        dblNET = 0;
        dblA020SUDEBI = 0;
        dblA020IMPNAC = 0;
        dblA020TOTDEB = 0;
        dblA020ACEPTA = 0;
        dblA020IMPINT = 0;
        dblA020TOTHAB = 0;
        dblA020REDEBI = 0;
        dblA020COMISI = 0;
        dblA020TAX = 0;
        dblA020ANALIZ = 0;
        dblA020COMISIP = 0;
        dblA020NETO = 0;
        dblTCAREG = 0;
        dblTCASYS = 0;
        dblTCAPAG = 0;
        dblVALMINIMOTARIFA = 0;
        dblVALMINIMOTAX = 0;
        dblA020TARIFA = 0;
        dblA020FAREUS = 0;
        intINDPRT = 0;
        intSTOPOVERQ = 0;
        tieneComision = false;
        validarTiempoLimite = false;
        esEscogido = false;
        strA020TCALC = "";
        resultado = false;
        strA020TIPORM = "";
        strNumeroRechazo = "";
        strA020SUFACT = "";
        strTextBoxErr = "";

        dblA020BOTCPR = 0;
        dblA020BOTCRM = 0;
        dblA020AOTCPM = 0;
        dblA020AOTCRM = 0;
        dblA020DOTCRM = 0;
    }

    // <editor-fold defaultstate="collapsed" desc="toString()">
    public String toString(String strAIRLIN) {

        StringBuffer strValue = new StringBuffer("");
        String strTemp = "";
        ProrateSector sector = null;
        ProrateSector sectorTemp = null;
        //05 A728AIRLIN       PIC X(03).
        strValue.append(strAIRLIN);
        //System.out.println("A728AIRLIN size : 3 / " + strAIRLIN.length());
        //05 A728NROPRT       PIC 9(09).
        strValue.append(Functions.fillZeros(9, this.strA020NROPRT));
        //System.out.println("A728NROPRT size : 9 / " + Functions.fillZeros(9, this.strA020NROPRT).length());
        //05 A728SEQPRT       PIC 9(02).
        strValue.append(Functions.fillZeros(2, this.strSEQPRT));
        //System.out.println("A728SEQPRT size : 2 / " + Functions.fillZeros(2, this.strSEQPRT).length());
        //05 A728TUSO         PIC X(02).
        strValue.append(Functions.fillZeros(2, this.strTUSO));
        //System.out.println("A728TUSO size : 2 / " + Functions.fillZeros(2, this.strTUSO).length());
        //05 A728CIA          PIC X(03).
        strValue.append(this.strDOCNBR.substring(0, 3));
        //System.out.println("A728CIA size : 3 / " + this.strDOCNBR.substring(0, 3).length());
        //05 A728NRODOC       PIC X(10).
        strValue.append(this.strDOCNBR.substring(3, 13));
        //System.out.println("A728NRODOC size : 10 / " + this.strDOCNBR.substring(3, 13).length());
        //05 A728CUPON        PIC X(01).
        strValue.append(this.strDOCNBR.substring(13, 14));
        //System.out.println("A728CUPON size : 1 / " + this.strDOCNBR.substring(13, 14).length());
        //05 A728DCHEQ        PIC X(01).
        strValue.append(Functions.fillString(this.strDCHEQ, 1));
        //System.out.println("A728DCHEQ size : 1 / " + Functions.fillString(this.strDCHEQ, 1).length());
        //05 A728TVENTA       PIC X(01).
        strValue.append(Functions.fillString(this.strTVENTA, 1));
        //System.out.println("A728TVENTA size : 1 / " + Functions.fillString(this.strTVENTA, 1).length());
        //05 A728CODIT        PIC X(20).
        strValue.append(Functions.fillString(this.strIT, 20));
        //System.out.println("A728CODIT size : 20 / " + Functions.fillString(this.strIT, 20).length());
        //05 A728FECVTA       PIC X(08).
        strValue.append(Functions.fillString(this.strISSUEDATE, 8));
        //System.out.println("A728FECVTA size : 8 / " + Functions.fillString(this.strISSUEDATE, 8).length());
        //05 A728FECFAC       PIC X(08).
        strValue.append(Functions.fillString(this.strBILLINGDATE, 8));
        //System.out.println("A728FECFAC size : 8 / " + Functions.fillString(this.strBILLINGDATE, 8).length());
        //05 A728PORDES       PIC 9(03)V99.
        strValue.append(Functions.fillZeros(5, String.valueOf(Math.round(this.dblDISCC * 100))));
        //System.out.println("A728PORDES size : 5 / " + Functions.fillZeros(5, String.valueOf(Math.round(this.dblDISCC*100))).length());
        //05 A728RUTORG       PIC X(03).
        strValue.append(Functions.fillString(this.strINIT, 3));
        //System.out.println("A728RUTORG size : 3 / " + Functions.fillString(this.strINIT, 3).length());
        //05 A728TDESC        PIC X(02).
        strValue.append(Functions.fillString(this.strDISCT, 2));
        //System.out.println("A728TDESC size : 2 / " + Functions.fillString(this.strDISCT, 2).length());
        //05 A728TCAREG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblTCAREG * 1000000))));
        //System.out.println("A728TCAREG size : 16 / " + Functions.fillZeros(16, String.valueOf(Math.round(this.dblTCAREG*1000000))).length());
        //05 A728MONREG       PIC X(03).
        strValue.append(Functions.fillString(this.strMONREG, 3));
        //System.out.println("A728MONREG size : 3 / " + Functions.fillString(this.strMONREG, 3).length());
        //05 A728TCASYS       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblTCASYS * 1000000))));
        //System.out.println("A728TCASYS size : 16 / " + Functions.fillZeros(16, String.valueOf(Math.round(this.dblTCASYS*1000000))).length());
        //05 A728MONSYS       PIC X(03).
        strValue.append(Functions.fillString(this.strRCURR, 3));
        //System.out.println("A728MONSYS size : 3 / " + Functions.fillString(this.strRCURR, 3).length());
        //05 A728MONEDA       PIC X(03).
        strValue.append(Functions.fillString(this.strFCURR, 3));
        //System.out.println("A728MONEDA size : 3 / " + Functions.fillString(this.strFCURR, 3).length());
        //05 A728TARIFA       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblFARE * 100))));
        //System.out.println("A728TARIFA size : 13 / " + Functions.fillZeros(13, String.valueOf(Math.round(this.dblFARE*100))).length());
        //05 A728MDAPAG       PIC X(03).
        strValue.append(Functions.fillString(this.strECURR, 3));
        //System.out.println("A728MDAPAG size : 3 / " + Functions.fillString(this.strECURR, 3).length());
        //05 A728TRFPAG       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblEQVFARE * 100))));
        //System.out.println("A728TRFPAG size : 13 / " + Functions.fillZeros(13, String.valueOf(Math.round(this.dblEQVFARE*100))).length());
        //05 A728TCAPAG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblTCAPAG * 1000000))));
        //System.out.println("A728TCAPAG size : 16 / " + Functions.fillZeros(16, String.valueOf(Math.round(this.dblTCAPAG*1000000))).length());
        //05 A728ATBP         PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblATBP * 100))));
        //System.out.println("A728ATBP size : 13 / " + Functions.fillZeros(13, String.valueOf(Math.round(this.dblATBP*100))).length());
        //05 A728MDAATB       PIC X(03).
        strValue.append(Functions.fillString(this.strCURR, 3));
        //System.out.println("A728MDAATB size : 3 / " + Functions.fillString(this.strCURR, 3).length());
        //05 A728MDAATB       PIC X(03).
        //05 A728ROE          PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblROE * 1000000))));
        //System.out.println("A728ROE size : 16 / " + Functions.fillZeros(16, String.valueOf(Math.round(this.dblROE*1000000))).length());
        //05 A728MDAATB       PIC X(03).
        //05 A728CPLUSS       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblPLUSSC * 100))));
        //System.out.println("A728CPLUSS size : 13 / " + Functions.fillZeros(13, String.valueOf(Math.round(this.dblPLUSSC*100))).length());
        //05 A728MDAATB       PIC X(03).
        //05 A728CSOVER       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblSTOPOVERC * 100))));
        //System.out.println("A728CSOVER size : 13 / " + Functions.fillZeros(13, String.valueOf(Math.round(this.dblSTOPOVERC*100))).length());
        //05 A728MDAATB       PIC X(03).
        //05 A728QSOVER       PIC 9(02).
        strValue.append(Functions.fillZeros(2, String.valueOf(Math.round(this.intSTOPOVERQ))));
        //System.out.println("A728QSOVER size : 2 / " + Functions.fillZeros(2, String.valueOf(Math.round(this.intSTOPOVERQ))).length());
        //05 A728MDAATB       PIC X(03).
        //05 A728TAJUST       PIC 9(11)V99.

        if (Functions.fillZeros(13, String.valueOf(Math.round(this.dblNET * 100))).indexOf("-") < 0) {
            strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblNET * 100))));
            //System.out.println("A728TAJUST size : 13 / " + Functions.fillZeros(13, String.valueOf(Math.round(this.dblNET*100))).length());
        } else {
            strValue.append("-").append(Functions.fillZeros(12, String.valueOf(Math.round(this.dblNET * 100)).replace('-', ' ').trim()));
            //System.out.println("A728TAJUST size : 13 / " + Functions.fillZeros(12, String.valueOf(Math.round(this.dblNET*100)).replace('-',' ').trim()).length());
        }

        //strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.NET*100))));
        //05 A728FBASE        PIC X(10).
        strValue.append(Functions.fillString(this.strFABASIS, 10));
        //System.out.println("A728FBASE size : 10 / " + Functions.fillString(this.strFABASIS, 10).length());
        //05 A728LOHO         PIC X(3).
        strValue.append(Functions.fillString(this.strLOHO, 3));
        //System.out.println("A728LOHO size : 3 / " + Functions.fillString(this.strLOHO, 3).length());
        //05 A728AIRFAC       PIC X(3).
        strValue.append(Functions.fillString(this.strBILLINGAIRLINE, 3));
        //System.out.println("A728AIRFAC size : 3 / " + Functions.fillString(this.strBILLINGAIRLINE, 3).length());
        //05 A728INDSAM       PIC X(1).
        strValue.append(Functions.fillString(this.strINDSAM, 1));
        //System.out.println("A728INDSAM size : 1 / " + Functions.fillString(this.strINDSAM, 1).length());
        //05 A728INDPRT       PIC 9(2).
        strValue.append(Functions.fillZeros(2, String.valueOf(this.intINDPRT)));
        //System.out.println("A728INDPRT size : 2 / " + Functions.fillZeros(2, String.valueOf(this.intINDPRT)).length());
        //05 A728IPLUS        PIC X(1).
        strValue.append(Functions.fillString(this.strPLUSSI, 1));
        //System.out.println("A728IPLUS size : 1 / " + Functions.fillString(this.strPLUSSI, 1).length());
        //05 A728SECOR        PIC X(3).
        strValue.append(Functions.fillString(this.strSORIGIN, 3));
        //System.out.println("A728SECOR size : 3 / " + Functions.fillString(this.strSORIGIN, 3).length());
        //05 A728SECDS        PIC X(3).
        strValue.append(Functions.fillString(this.strSDESTINY, 3));
        //System.out.println("A728SECDS size : 3 / " + Functions.fillString(this.strSDESTINY, 3).length());
        //05 A728SELEC        PIC X(8).
        strValue.append(Functions.fillString(this.strPLUSSI, 8));
        //System.out.println("A728SELEC size : 8 / " + Functions.fillString(this.strPLUSSI, 8).length());
        //05 A728FVLO1        PIC X(8).
        strValue.append(Functions.fillString(this.strFLIGHTDATE, 8));
        //System.out.println("A728FVLO1 size : 8 / " + Functions.fillString(this.strFLIGHTDATE, 8).length());
        //05 FUNC         PIC X(10).
        strValue.append(Functions.fillString(this.strFUNC, 10));
        //System.out.println("FUNC size : 10 / " + Functions.fillString(this.strFUNC, 10).length());
        String city = "";
        for (int i = 0; i < SECTORS.size(); i++) {
            sector = SECTORS.get(i);
            if (i != 0) {
                //06 IDENTI       PIC X(2).
                //06 NUMERO       PIC X(2).
                strValue.append("**");
                strValue.append(Functions.fillZeros(2, String.valueOf(i - 1)));
                //System.out.println("NUMERO size : 2 / " + Functions.fillZeros(2, String.valueOf(i-1)).length());
                //06 XO       PIC X.
                //strValue.append(Functions.fillString(sector.getXO().trim(), 1));
                //==================================================================
                strTemp = "";
                if (i - 1 == 0) {
                    strTemp = " ";
                } else {
                    sectorTemp = SECTORS.get(i - 1);
                    strTemp = sectorTemp.getStrXO();
                    sectorTemp = null;
                }
                strValue.append(Functions.fillString(strTemp, 1));
                //System.out.println("XO size : 1 / " + Functions.fillString(strTemp, 1).length());
                //==================================================================
                //06 RUTAO     PIC X(03).
                if (!Functions.fillString(sector.getStrCARR(), 2).equals("")
                        && !Functions.fillString(sector.getStrCARR(), 2).equals("..")) {
                    strValue.append(Functions.fillString(city.trim().toUpperCase(), 3));
                    //System.out.println("RUTAO size : 3 / " + Functions.fillString(city.trim().toUpperCase(), 3).length());
                } else {
                    strValue.append(Functions.fillString("", 3));
                    //System.out.println("RUTAO size : 3 / " + Functions.fillString("", 3).length());
                }
                //06 RUTAD     PIC X(03).
                strValue.append(Functions.fillString(sector.getStrOD(), 3));
                //System.out.println("RUTAD size : 3 / " + Functions.fillString(sector.getStrOD(), 3).length());
                //06 VIA1      PIC X(02).
                strValue.append(Functions.fillString(sector.getStrVIA(), 2));
                //System.out.println("VIA1 size : 2 / " + Functions.fillString(sector.getStrVIA(), 2).length());
                //06 CARRN1    PIC X(03).
                strValue.append(Functions.fillString(sector.getStrCARRN(), 3));
                //System.out.println("CARRN1 size : 3 / " + Functions.fillString(sector.getStrCARRN(), 3).length());
                //06 CARRA1    PIC X(02).
                strValue.append(Functions.fillString(sector.getStrCARR(), 2));
                //System.out.println("CARRA1 size : 2 / " + Functions.fillString(sector.getStrCARR(), 2).length());
                //06 NVLO1     PIC X(05).
                strValue.append(Functions.fillString(sector.getStrNFLIGHT(), 5));
                //System.out.println("NVLO1 size : 5 / " + Functions.fillString(sector.getStrNFLIGHT(), 5).length());
                //06 FCVLO1    PIC X(08).
                strValue.append(Functions.fillString(sector.getStrFCVLO(), 8));
                //System.out.println("FCVLO1 size : 8 / " + Functions.fillString(sector.getStrFCVLO(), 8).length());
                //06 BOOKI1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrRBD(), 1));
                //System.out.println("BOOKI1 size : 1 / " + Functions.fillString(sector.getStrRBD(), 1).length());
                //06 CLASE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrCLASE(), 1));
                //System.out.println("CLASE1 size : 1 / " + Functions.fillString(sector.getStrCLASE(), 1).length());
                //06 FBASE1    PIC X(10).
                strValue.append(Functions.fillString(sector.getStrFBASE(), 10));
                //System.out.println("FBASE1 size : 10 / " + Functions.fillString(sector.getStrFBASE(), 10).length());
                //06 LOHO      PIC X(03).
                strValue.append(Functions.fillString(sector.getStrLOHO(), 3));
                //System.out.println("LOHO size : 3 / " + Functions.fillString(sector.getStrLOHO(), 3).length());
                //06 TBASE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrTBASE(), 1));
                //System.out.println("TBASE1 size : 1 / " + Functions.fillString(sector.getStrTBASE(), 1).length());
                //06 STBAS1    PIC X(02).
                strValue.append(Functions.fillString(sector.getStrSTBAS(), 2));
                //System.out.println("STBAS1 size : 2 / " + Functions.fillString(sector.getStrSTBAS(), 2).length());
                //06 FARE1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblXFARE() * 100))));
                //System.out.println("FARE1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblXFARE()*100))).length());
                //06 TFARE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrTFARE(), 1));
                //System.out.println("TFARE1 size : 1 / " + Functions.fillString(sector.getStrTFARE(), 1).length());
                //06 DIFER1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblDIFER() * 100))));
                //System.out.println("DIFER1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblDIFER()*100))).length());
                //06 FDIFE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrFDIFE(), 1));
                //System.out.println("FDIFE1 size : 1 / " + Functions.fillString(sector.getStrFDIFE(), 1).length());
                //06 TRFM1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblTRFM() * 100))));
                //System.out.println("TRFM1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblTRFM()*100))).length());
                //06 MNTFM1    PIC X(03).
                strValue.append(Functions.fillString(sector.getStrMNTFM(), 3));
                //System.out.println("MNTFM1 size : 3 / " + Functions.fillString(sector.getStrMNTFM(), 3).length());
                //06 SS1       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSURCHARGE() * 100))));
                //System.out.println("SS1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSURCHARGE()*100))).length());
                //06 PLUSS1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPLUSS() * 100))));
                //System.out.println("PLUSS1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPLUSS()*100))).length());
                //06 STOP1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSTOP() * 100))));
                //System.out.println("STOP1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSTOP()*100))).length());
                //06 MNACU1    PIC X(03).
                strValue.append(Functions.fillString(sector.getStrMNACU().replaceAll(".", ""), 3));
                //System.out.println("MNACU1 size : 3 / " + Functions.fillString(sector.getStrMNACU().replaceAll(".", ""), 3).length());
                //06 ACUE1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblACUE() * 100))));
                //System.out.println("ACUE1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblACUE()*100))).length());
                //06 FACT1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getLngFACTOR() * 100))));
                //System.out.println("FACT1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getLngFACTOR()*100))).length());
                //06 TARI1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblFARE() * 100))));
                //System.out.println("TARI1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblFARE()*100))).length());
                //06 YANQ1     PIC 9(13)V99. //********************************************************
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblYANQ() * 100))));
                //System.out.println("YANQ1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblYANQ()*100))).length());
                //06 PPRO1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPROVISOP() * 100))));
                //System.out.println("PPRO1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPROVISOP()*100))).length());
                //06 SUBPA1    PIC X(20).
                strValue.append(Functions.fillString(sector.getStrSUBPA(), 20));
                //System.out.println("SUBPA1 size : 20 / " + Functions.fillString(sector.getStrSUBPA(), 20).length());
                //06 PROV1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPROVISOC() * 100))));
                //System.out.println("PROV1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPROVISOC()*100))).length());
                //06 ACUEO1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSPA() * 100))));
                //System.out.println("ACUEO1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSPA()*100))).length());
                //06 ACUCO1    PIC X(20).
                strValue.append(Functions.fillString(sector.getStrACUCO(), 20));
                //System.out.println("ACUCO1 size : 20 / " + Functions.fillString(sector.getStrACUCO(), 20).length());
                //06 AJUST1    PIC 9(13)V99.

                if (Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblADJUST() * 100))).indexOf("-") < 0) {
                    strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblADJUST() * 100))));
                    //System.out.println("AJUST1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblADJUST()*100))).length());
                } else {
                    strValue.append("-" + Functions.fillZeros(14, String.valueOf(Math.round(sector.getDblADJUST() * 100)).replace('-', ' ').trim()));
                    //System.out.println("ACUCO1 size : 15 / " + "-" + Functions.fillZeros(14, String.valueOf(Math.round(sector.getDblADJUST()*100)).replace('-',' ').trim()).length());
                    // strValue.append(Functions.fillZeros(14, String.valueOf(Math.round(sector.getADJUST()*100))).replaceAll("-","") + "-");
                }

                //  strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getADJUST()*100))));
                //06 VALOR1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblAMOUNT() * 100))));
                //System.out.println("VALOR1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblAMOUNT()*100))).length());
                //06 SPA       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSPA() * 100))));
                //System.out.println("SPA size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSPA()*100))).length());
                //06 VLMPA1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblVLMPA() * 100))));
                //System.out.println("VLMPA1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblVLMPA()*100))).length());
                //06 VLSRP1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblVLSRP() * 100))));
                //System.out.println("VLSRP1 size : 15 / " + Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblVLSRP()*100))).length());
                //06 INDPR1    PIC X.
                strValue.append(Functions.fillString(sector.getStrINDPR(), 1));
                //System.out.println("INDPR1 size : 1 / " + Functions.fillString(sector.getStrINDPR(), 1).length());
                //06 INDISC    PIC X(1).
                strValue.append(Functions.fillString(sector.getStrINDISC(), 1));
                //System.out.println("INDISC size : 1 / " + Functions.fillString(sector.getStrINDISC(), 1).length());
                //06 ISC       PIC 9(7)V99.
                strValue.append(Functions.fillZeros(9, String.valueOf(Math.round(sector.getDblISC() * 100))));
                //System.out.println("ISC size : 9 / " + Functions.fillZeros(9, String.valueOf(Math.round(sector.getDblISC()*100))).length());
                //06 COEFIC    PIC 9(8)V9(5).
                strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(sector.getDblCOEFIC() * 100000))));
                //System.out.println("COEFIC size : 13 / " + Functions.fillZeros(13, String.valueOf(Math.round(sector.getDblCOEFIC()*100000))).length());
                //06 ACUBAS    PIC X(4).
                strValue.append(Functions.fillString(sector.getStrACUBAS(), 4));
                //System.out.println("ACUBAS size : 4 / " + Functions.fillString(sector.getStrACUBAS(), 4).length());
                //06 ACUSTS    PIC X(1).
                strValue.append(Functions.fillString(sector.getStrACUSTS(), 1));
                //System.out.println("ACUSTS size : 1 / " + Functions.fillString(sector.getStrACUSTS(), 1).length());
                //06 PRVSTS    PIC X(2).
                strValue.append(Functions.fillString(sector.getStrPRVSTS(), 2));
                //System.out.println("PRVSTS size : 2 / " + Functions.fillString(sector.getStrPRVSTS(), 2).length());
            }
            city = sector.getStrOD();
        }

        for (int i = SECTORS.size(); i < 51; i++) {
            //06 IDENTI       PIC X(2).
            //06 NUMERO       PIC X(2).
            if (i == 0) {
                i = 1;
            }

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
        //System.out.println("despues de sectores size : 20189 / " + strValue.length());

        //05 A728RERUT    PIC X(01).
        strValue.append(Functions.fillString(this.strA728RERUT, 1));
        //System.out.println("A728RERUT size : 1 / " + Functions.fillString(this.strA728RERUT, 1).length());
        //05 DSCR         PIC X(27).
        strValue.append(Functions.fillString("", 27));
        //05 FTIMELIM     PIC X(01).
        strValue.append(Functions.fillString(this.strFTIMELIM, 1));
        //System.out.println("FTIMELIM size : 1 / " + Functions.fillString(this.strFTIMELIM, 1).length());
        //05 MSG          PIC X(40).
        strValue.append(Functions.fillString("", 40));
        //05 USER         PIC X(10).
        strValue.append(Functions.fillString(this.strUser, 10));
        //System.out.println("USER size : 10 / " + Functions.fillString(this.strUser, 10).length());
        //05 A728CODTAX   PIC X(10).
        strValue.append(Functions.fillString(this.strMISC, 10));
        //System.out.println("A728CODTAX size : 10 / " + Functions.fillString(this.strMISC, 10).length());
        //05 A728GRUPO    PIC X(06).
        strValue.append(Functions.fillString(this.strGRUPO, 6));
        //System.out.println("A728GRUPO size : 6 / " + Functions.fillString(this.strGRUPO, 6).length());
        //05 A728CTYVTA   PIC X(03).
        strValue.append(Functions.fillString(this.strSELLINGPLACE, 3));
        //System.out.println("A728CTYVTA size : 3 / " + Functions.fillString(this.strSELLINGPLACE, 3).length());
        //05 A728COUVTA   PIC X(02).
        strValue.append(Functions.fillString(this.strCOUVTA, 2));
        //System.out.println("A728COUVTA size : 2 / " + Functions.fillString(this.strCOUVTA, 2).length());
        //05 A728CTYEMI   PIC X(03).
        strValue.append(Functions.fillString(this.strISSUEPLACE, 3));
        //System.out.println("A728CTYEMI size : 3 / " + Functions.fillString(this.strISSUEPLACE, 3).length());
        //05 A728COUEMI   PIC X(02).
        strValue.append(Functions.fillString(this.strCOUEMI, 2));
        //System.out.println("A728COUEMI size : 2 / " + Functions.fillString(this.strCOUEMI, 2).length());
        //05 A728AJTRAM   PIC X(01).
        strValue.append(Functions.fillString(this.strAJTRAM, 1));
        //System.out.println("A728AJTRAM size : 1 / " + Functions.fillString(this.strAJTRAM, 1).length());

        //*********** Campos A020 *****************************
        //05 A020RMSN   PIC X(01).
        strValue.append(Functions.fillString(this.strA020RMSN, 1));
        //System.out.println("A020RMSN size : 1 / " + Functions.fillString(this.strA020RMSN, 1).length());
        //05 A020CLASRM   PIC X(01). 
        strValue.append(Functions.fillString(this.strA020CLASRM.trim(), 1));
        //System.out.println("A020CLASRM size : 1 / " + Functions.fillString(this.strA020CLASRM.trim(), 1).length());
        //05 A020ACEPTA   PIC 9(09)V99.
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020ACEPTA * 100))));
        //System.out.println("A020ACEPTA size : 11 / " + Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020ACEPTA*100))).length());
        //05 A020IMPINT   PIC 9(09)V99. 
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020IMPINT * 100))));
        //System.out.println("A020IMPINT size : 11 / " + Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020IMPINT*100))).length());
        //05 A020TOTHAB   PIC 9(09)V99. 
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020TOTHAB * 100))));
        //System.out.println("A020TOTHAB size : 11 / " + Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020TOTHAB*100))).length());
        //05 A020COMISP   PIC 9(05)V99.
        strValue.append(Functions.fillZeros(7, String.valueOf(Math.round(this.dblA020COMISIP * 100))));
        //System.out.println("A020COMISP size : 7 / " + Functions.fillZeros(7, String.valueOf(Math.round(this.dblA020COMISIP*100))).length());
        //05 A020CODOB1   PIC X(04).   
        strValue.append(Functions.fillString(this.strA020CODOB1, 4));
        //System.out.println("A020CODOB1 size : 4 / " + Functions.fillString(this.strA020CODOB1, 4).length());
        //05 A020CODOB2   PIC X(04). 
        strValue.append(Functions.fillString(this.strA020CODOB2, 4));
        //System.out.println("A020CODOB2 size : 4 / " + Functions.fillString(this.strA020CODOB2, 4).length());
        //05 A020CODOB3   PIC X(04). 
        strValue.append(Functions.fillString(this.strA020CODOB3, 4));
        //System.out.println("A020CODOB3 size : 4 / " + Functions.fillString(this.strA020CODOB3, 4).length());
        //05 A020CODOB4   PIC X(04).   
        strValue.append(Functions.fillString(this.strA020CODOB4, 4));
        //System.out.println("A020CODOB4 size : 4 / " + Functions.fillString(this.strA020CODOB4, 4).length());
        //05 A020CODOB5   PIC X(04).   
        strValue.append(Functions.fillString(this.strA020CODOB5, 4));
        //System.out.println("A020CODOB5 size : 4 / " + Functions.fillString(this.strA020CODOB5, 4).length());
        //05 A020COMME1   PIC X(60).   
        strValue.append(Functions.fillString(this.strA020COMME1, 60));
        //System.out.println("A020COMME1 size : 60 / " + Functions.fillString(this.strA020COMME1, 60).length());
        //05 A020COMME2   PIC X(60).   
        strValue.append(Functions.fillString(this.strA020COMME2, 60));
        //System.out.println("A020COMME2 size : 60 / " + Functions.fillString(this.strA020COMME2, 60).length());
        //05 A020COMME3   PIC X(60).   
        strValue.append(Functions.fillString(this.strA020COMME3, 60));
        //System.out.println("A020COMME3 size : 60 / " + Functions.fillString(this.strA020COMME3, 60).length());
        //05 A020COMME4   PIC X(60).
        strValue.append(Functions.fillString(this.strA020COMME4, 60));
        //System.out.println("A020COMME4 size : 60 / " + Functions.fillString(this.strA020COMME4, 60).length());
        //05 A020COMME5   PIC X(60).
        strValue.append(Functions.fillString(this.strA020COMME5, 60));
        //System.out.println("A020COMME5 size : 60 / " + Functions.fillString(this.strA020COMME5, 60).length());
        //05 A020COMME6   PIC X(60).
        strValue.append(Functions.fillString(this.strA020COMME6, 60));
        //System.out.println("A020COMME6 size : 60 / " + Functions.fillString(this.strA020COMME6, 60).length());
        //05 A020KEY      PIC X(09).
        strValue.append(Functions.fillString(this.strNROPRT, 9));
        //System.out.println("A020KEY size : 9 / " + Functions.fillString(this.strNROPRT, 9).length());
        //05 A020BASE     PIC X(10).
        strValue.append(Functions.fillString(this.strA020BASE, 10));
        //System.out.println("A020BASE size : 10 / " + Functions.fillString(this.strA020BASE, 10).length());
        //05 A020TARIFA   PIC 9(09)V99.  
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020TARIFA * 100))));
        //System.out.println("A020TARIFA size : 11 / " + Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020TARIFA*100))).length());
        //05 A020FAREUS   PIC 9(09)V99.  
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020FAREUS * 100))));
        //System.out.println("A020FAREUS size : 11 / " + Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020FAREUS*100))).length());
        //05 A020DEBHAB   PIC X(05).   
        strValue.append(Functions.fillString(this.strA021CONCEP01.concat(this.strA021CONCEP02).concat(this.strA021CONCEP03).concat(this.strA021CONCEP04).concat(this.strA021CONCEP05), 5));
        //System.out.println("A020DEBHAB size : 5 / " + Functions.fillString(this.strA021CONCEP01.concat(this.strA021CONCEP02).concat(this.strA021CONCEP03).concat(this.strA021CONCEP04).concat(this.strA021CONCEP05), 5).length());
        //05 A020QSEG     PIC 9(09)V99.
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(Double.parseDouble(this.strA020QSEG) * 100))));
        //System.out.println("A020QSEG size : 11 / " + Functions.fillZeros(11, String.valueOf(Math.round(Double.parseDouble(this.strA020QSEG)*100))).length());
        //05 A020MONEDA   PIC X(03).
        strValue.append(Functions.fillString(this.strA020MONEDA, 3));
        //System.out.println("A020MONEDA size : 3 / " + Functions.fillString(this.strA020MONEDA, 3).length());
        //05 A020MNRCD    PIC X(03).
        strValue.append(Functions.fillString(this.strA020MNRCD, 3));
        //05 A020AOTCPM   PIC 9(02)V999.
        strValue.append(Functions.fillZeros(5, String.valueOf(Math.round(this.dblA020AOTCPM * 1000))));
        //05 A020AOTCRM   PIC 9(09)V99. 
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020AOTCRM * 100))));

        return String.valueOf(strValue).toUpperCase();
    }

    //</editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="toStringTemp()">
    public String toStringTemp(String strAIRLIN) {
        //FUNCION: SAVE

        StringBuffer strValue = new StringBuffer("");
        String strTemp = "";
        ProrateSector sector = null;
        ProrateSector sectorTemp = null;
        //05 A728AIRLIN       PIC X(03).
        strValue.append(strAIRLIN);
        //05 A728NROPRT       PIC 9(09).
        strValue.append(Functions.fillZeros(9, this.strA020NROPRT));
        //05 A728SEQPRT       PIC 9(02).
        strValue.append(Functions.fillZeros(2, this.strSEQPRT));
        //05 A728TUSO         PIC X(02).
        strValue.append(Functions.fillZeros(2, this.strTUSO));
        //05 A728CIA          PIC X(03).
        strValue.append(this.strDOCNBR.substring(0, 3));
        //05 A728NRODOC       PIC X(10).
        strValue.append(this.strDOCNBR.substring(3, 13));
        //05 A728CUPON        PIC X(01).
        strValue.append(this.strDOCNBR.substring(13, 14));
        //05 A728DCHEQ        PIC X(01).
        strValue.append(Functions.fillString(this.strDCHEQ, 1));
        //05 A728TVENTA       PIC X(01).
        strValue.append(Functions.fillString(this.strTVENTA, 1));
        //05 A728CODIT        PIC X(20).
        strValue.append(Functions.fillString(this.strIT, 20));
        //05 A728FECVTA       PIC X(08).
        strValue.append(Functions.fillString(this.strISSUEDATE, 8));
        //05 A728FECFAC       PIC X(08).
        strValue.append(Functions.fillString(this.strBILLINGDATE, 8));
        //05 A728PORDES       PIC 9(03)V99.
        strValue.append(Functions.fillZeros(5, String.valueOf(Math.round(this.dblDISCC * 100))));
        //05 A728RUTORG       PIC X(03).
        strValue.append(Functions.fillString(this.strINIT, 3));
        //05 A728TDESC        PIC X(02).
        strValue.append(Functions.fillString(this.strDISCT, 2));
        //05 A728TCAREG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblTCAREG * 1000000))));
        //05 A728MONREG       PIC X(03).
        strValue.append(Functions.fillString(this.strMONREG, 3));
        //05 A728TCASYS       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblTCASYS * 1000000))));
        //05 A728MONSYS       PIC X(03).
        strValue.append(Functions.fillString(this.strRCURR, 3));
        //05 A728MONEDA       PIC X(03).
        strValue.append(Functions.fillString(this.strFCURR, 3));
        //05 A728TARIFA       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblFARE * 100))));
        //05 A728MDAPAG       PIC X(03).
        strValue.append(Functions.fillString(this.strECURR, 3));
        //05 A728TRFPAG       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblEQVFARE * 100))));
        //05 A728TCAPAG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblTCAPAG * 1000000))));
        //05 A728ATBP         PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblATBP * 100))));
        //05 A728MDAATB       PIC X(03).
        strValue.append(Functions.fillString(this.strCURR, 3));
        //05 A728ROE          PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblROE * 1000000))));
        //05 A728CPLUSS       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblPLUSSC * 100))));
        //05 A728CSOVER       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblSTOPOVERC * 100))));
        //05 A728QSOVER       PIC 9(02).
        strValue.append(Functions.fillZeros(2, String.valueOf(Math.round(this.intSTOPOVERQ))));
        //05 A728TAJUST       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblNET * 100))));
        //05 A728FBASE        PIC X(10).
        strValue.append(Functions.fillString(this.strFABASIS, 10));
        //05 A728LOHO         PIC X(3).
        strValue.append(Functions.fillString(this.strLOHO, 3));
        //05 A728AIRFAC       PIC X(3).
        strValue.append(this.strBILLINGAIRLINE);
        //05 A728INDSAM       PIC X(1).
        strValue.append(Functions.fillString(this.strINDSAM, 1));
        //05 A728INDPRT       PIC 9(2).
        strValue.append(Functions.fillZeros(2, String.valueOf(this.intINDPRT)));
        //05 A728IPLUS        PIC X(1).
        try {
            strValue.append(Functions.fillString(this.strPLUSSI.trim(), 1));
        } catch (Exception e) {
            strValue.append(Functions.fillString("", 1));
        }
        //05 A728SECOR        PIC X(3).
        strValue.append(Functions.fillString(this.strSORIGIN, 3));
        //05 A728SECDS        PIC X(3).
        strValue.append(Functions.fillString(this.strSDESTINY, 3));
        //05 A728SELEC        PIC X(8).
        strValue.append(Functions.fillString(this.strPLUSSI, 8));
        //05 A728FVLO1        PIC X(8).
        strValue.append(Functions.fillString(this.strFLIGHTDATE, 8));
        //05 FUNC         PIC X(10).
        strValue.append(Functions.fillString(this.strFUNC, 10));
        //289
        String city = "";
        for (int i = 0; i < SECTORS.size(); i++) {
            sector = SECTORS.get(i);

            if (i != 0) {

                //06 IDENTI       PIC X(2).
                //06 NUMERO       PIC X(2).
                strValue.append("**");
                strValue.append(Functions.fillZeros(2, String.valueOf(i)));
                //06 XO       PIC X.
                //strValue.append(Functions.fillString(sector.getXO().trim(), 1));
                //==================================================================
                strTemp = "";
                if (i - 1 == 0) {
                    strTemp = " ";
                } else {
                    sectorTemp = SECTORS.get(i - 1);
                    strTemp = sectorTemp.getStrXO();
                    sectorTemp = null;
                }
                //==================================================================
                strValue.append(Functions.fillString(strTemp, 1));
                //06 RUTAO     PIC X(03).
                if (!Functions.fillString(sector.getStrCARR(), 2).equals("")
                        && !Functions.fillString(sector.getStrCARR(), 2).equals("..")) {
                    strValue.append(Functions.fillString(city.trim().toUpperCase(), 3));
                } else {
                    strValue.append(Functions.fillString("", 3));
                }
                //06 RUTAD     PIC X(03).
                strValue.append(Functions.fillString(sector.getStrOD(), 3));

                //06 VIA1      PIC X(02).
                strValue.append(Functions.fillString(sector.getStrVIA(), 2));
                //06 CARRN1    PIC X(03).
                strValue.append(Functions.fillString(sector.getStrCARRN(), 3));
                //06 CARRA1    PIC X(02).
                strValue.append(Functions.fillString(sector.getStrCARR(), 2));
                //06 NVLO1     PIC X(05).
                strValue.append(Functions.fillString(sector.getStrNFLIGHT(), 5));
                //06 FCVLO1    PIC X(08).
                strValue.append(Functions.fillString(sector.getStrFCVLO(), 8));
                //06 BOOKI1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrRBD(), 1));
                //06 CLASE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrCLASE(), 1));
                //06 FBASE1    PIC X(10).
                strValue.append(Functions.fillString(sector.getStrFBASE(), 10));
                //06 LOHO      PIC X(03).
                strValue.append(Functions.fillString(sector.getStrLOHO(), 3));
                //06 TBASE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrTBASE(), 1));
                //06 STBAS1    PIC X(02).
                strValue.append(Functions.fillString(sector.getStrSTBAS(), 2));
                //06 FARE1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblXFARE() * 100))));
                //06 TFARE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrTFARE(), 1));
                //06 DIFER1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblDIFER() * 100))));
                //06 FDIFE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrFDIFE(), 1));
                //06 TRFM1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblTRFM() * 100))));
                //06 MNTFM1    PIC X(03).
                strValue.append(Functions.fillString(sector.getStrMNTFM(), 3));
                //06 SS1       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSURCHARGE() * 100))));
                //06 PLUSS1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPLUSS() * 100))));
                //06 STOP1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSTOP() * 100))));
                //06 MNACU1    PIC X(03).
                strValue.append(Functions.fillString(sector.getStrMNACU(), 3));
                //06 ACUE1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblACUE() * 100))));
                //06 FACT1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getLngFACTOR() * 100))));
                //06 TARI1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblFARE() * 100))));
                //***************************************************************************************
                //06 YANQ1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblYANQ() * 100))));

                //06 PPRO1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPROVISOP() * 100))));
                //06 SUBPA1    PIC X(20).
                strValue.append(Functions.fillString(sector.getStrSUBPA(), 20));
                //06 PROV1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPROVISOC() * 100))));
                //06 ACUEO1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSPA() * 100))));
                //06 ACUCO1    PIC X(20).
                strValue.append(Functions.fillString(sector.getStrACUCO(), 20));
                //06 AJUST1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblADJUST() * 100))));
                //06 VALOR1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblAMOUNT() * 100))));
                //06 SPA       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSPA() * 100))));
                //06 VLMPA1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblVLMPA() * 100))));
                //06 VLSRP1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblVLSRP() * 100))));
                //06 INDPR1    PIC X.
                strValue.append(Functions.fillString(sector.getStrINDPR(), 1));
                //06 INDISC    PIC X(1).
                strValue.append(Functions.fillString(sector.getStrINDISC(), 1));
                //06 ISC       PIC 9(7)V99.
                strValue.append(Functions.fillZeros(9, String.valueOf(Math.round(sector.getDblISC() * 100))));
                //06 COEFIC    PIC 9(8)V9(5).
                strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(sector.getDblCOEFIC() * 100000))));
                //06 ACUBAS    PIC X(4).
                strValue.append(Functions.fillString(sector.getStrACUBAS(), 4));
                //06 ACUSTS    PIC X(1).
                strValue.append(Functions.fillString(sector.getStrACUSTS(), 1));
                //06 PRVSTS    PIC X(2).
                strValue.append(Functions.fillString(sector.getStrPRVSTS(), 2));

            }
            city = sector.getStrOD();
        }
        //398  398
        for (int i = SECTORS.size(); i < 51; i++) {
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
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(this.dblVALMINIMOTARIFA * 100))));
                //06 VLSRP1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(this.dblVALMINIMOTAX * 100))));
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

        //05 A728RERUT    PIC X(01).
        strValue.append(Functions.fillString(this.strA728RERUT, 1));
        //05 DSCR         PIC X(28).
        strValue.append(Functions.fillString("", 27));
        //05 FTIMELIM     PIC X(01).
        strValue.append(Functions.fillString(this.strFTIMELIM, 1));
        //05 MSG          PIC X(40).
        strValue.append(Functions.fillString("", 40));
        //05 USER         PIC X(10).
        strValue.append(Functions.fillString(this.strUser, 10));
        //05 A728CODTAX   PIC X(10).
        strValue.append(Functions.fillString(this.strMISC, 10));
        //05 A728GRUPO    PIC X(06).
        strValue.append(Functions.fillString(this.strGRUPO, 6));
        //05 A728CTYVTA   PIC X(03).
        strValue.append(Functions.fillString(this.strSELLINGPLACE, 3));
        //05 A728COUVTA   PIC X(02).
        strValue.append(Functions.fillString(this.strCOUVTA, 2));
        //05 A728CTYEMI   PIC X(03).
        strValue.append(Functions.fillString(this.strISSUEPLACE, 3));
        //05 A728COUEMI   PIC X(02).
        strValue.append(Functions.fillString(this.strCOUEMI, 2));
        //05 A728AJTRAM   PIC X(01).
        strValue.append(Functions.fillString(this.strAJTRAM, 1));

        //*********** Campos A020 *****************************
        //05 A020RMSN   PIC X(01).
        strValue.append(Functions.fillString(this.strA020RMSN, 1));
        //05 A020CLASRM   PIC X(01). 
        strValue.append(Functions.fillString(this.strA020CLASRM.trim(), 1));
        //05 A020ACEPTA   PIC 9(09)V99.
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020ACEPTA * 100))));
        //05 A020IMPINT   PIC 9(09)V99. 
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020IMPINT * 100))));
        //05 A020TOTHAB   PIC 9(09)V99. 
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020TOTHAB * 100))));
        //05 A020COMISP   PIC 9(05)V99.
        strValue.append(Functions.fillZeros(7, String.valueOf(Math.round(this.dblA020COMISIP * 100))));
        //05 A020CODOB1   PIC X(04).   
        strValue.append(Functions.fillString(this.strA020CODOB1, 4));
        //05 A020CODOB2   PIC X(04). 
        strValue.append(Functions.fillString(this.strA020CODOB2, 4));
        //05 A020CODOB3   PIC X(04). 
        strValue.append(Functions.fillString(this.strA020CODOB3, 4));
        //05 A020CODOB4   PIC X(04).   
        strValue.append(Functions.fillString(this.strA020CODOB4, 4));
        //05 A020CODOB5   PIC X(04).   
        strValue.append(Functions.fillString(this.strA020CODOB5, 4));
        //05 A020COMME1   PIC X(60).   
        strValue.append(Functions.fillString(this.strA020COMME1, 60));
        //05 A020COMME2   PIC X(60).   
        strValue.append(Functions.fillString(this.strA020COMME2, 60));
        //05 A020COMME3   PIC X(60).   
        strValue.append(Functions.fillString(this.strA020COMME3, 60));
        //05 A020COMME4   PIC X(60).
        strValue.append(Functions.fillString(this.strA020COMME4, 60));
        //05 A020COMME5   PIC X(60).
        strValue.append(Functions.fillString(this.strA020COMME5, 60));
        //05 A020COMME6   PIC X(60).
        strValue.append(Functions.fillString(this.strA020COMME6, 60));
        //05 A020KEY      PIC X(09).
        strValue.append(Functions.fillString(this.strNROPRT, 9));
        //05 A020BASE     PIC X(10).
        strValue.append(Functions.fillString(this.strA020BASE, 10));
        //05 A020TARIFA   PIC 9(09)V99.  
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020TARIFA * 100))));
        //05 A020FAREUS   PIC 9(09)V99.  
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020FAREUS * 100))));
        //05 A020DEBHAB   PIC X(05).   
        strValue.append(Functions.fillString(this.strA021CONCEP01.concat(this.strA021CONCEP02).concat(this.strA021CONCEP03).concat(this.strA021CONCEP04).concat(this.strA021CONCEP05), 5));
        //05 A020QSEG     PIC 9(09)V99.
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(Double.parseDouble(this.strA020QSEG) * 100))));
        //05 A020MONEDA   PIC X(03).
        strValue.append(Functions.fillString(this.strA020MONEDA, 3));
        //05 A020MNRCD    PIC X(03).
        strValue.append(Functions.fillString(this.strA020MNRCD, 3));
        //05 A020AOTCPM   PIC 9(02)V999.
        strValue.append(Functions.fillZeros(5, String.valueOf(Math.round(this.dblA020AOTCPM * 1000))));
        //05 A020AOTCRM   PIC 9(09)V99. 
        strValue.append(Functions.fillZeros(11, String.valueOf(Math.round(this.dblA020AOTCRM * 100))));

        System.out.println("TAMAÑO DEL BUFFER 2..." + strValue.length());
        //System.out.println("BUFFER 2..." + strValue);
        //20726
        return String.valueOf(strValue).toUpperCase();

    }

    //</editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="loadData()">
    public void loadData(String strData, String calfa) {
        try {
            ProrateSector sector = null;
            //05 A728NROPRT       PIC 9(09).
            this.strA020NROPRT = strData.substring(3, 12);
            //05 A728SEQPRT       PIC 9(02).
            this.strSEQPRT = strData.substring(12, 14);
            //05 A728TUSO         PIC X(02).
            this.strTUSO = strData.substring(14, 16);
            //05 A728CIA          PIC X(03).
            //05 A728NRODOC       PIC X(10).
            //05 A728CUPON        PIC X(01).
            this.strDOCNBR = strData.substring(16, 30);
            //05 A728DCHEQ        PIC X(01).
            this.strDCHEQ = strData.substring(30, 31);
            //05 A728TVENTA       PIC X(01).
            this.strTVENTA = strData.substring(31, 32);
            //05 A728CODIT        PIC X(20).
            this.strIT = strData.substring(32, 52).trim();
            //05 A728FECVTA       PIC X(08).
            this.strISSUEDATE = strData.substring(52, 60);
            //05 A728FECFAC       PIC X(08).
            this.strBILLINGDATE = strData.substring(60, 68);
            //05 A728PORDES       PIC 9(03)V99.
            this.dblDISCC = Double.parseDouble(strData.substring(68, 73)) / 100;
            //05 A728RUTORG       PIC X(03).
            this.strINIT = strData.substring(73, 76);
            //05 A728TDESC        PIC X(02).
            this.strDISCT = strData.substring(76, 78);
            //05 A728TCAREG       PIC 9(10)V9(6).
            this.dblTCAREG = Double.parseDouble(strData.substring(78, 94)) / 1000000;
            //05 A728MONREG       PIC X(03).
            this.strMONREG = strData.substring(94, 97);
            //05 A728TCASYS       PIC 9(10)V9(6).
            this.dblTCASYS = Double.parseDouble(strData.substring(97, 113)) / 1000000;
            //05 A728MONSYS       PIC X(03).
            this.strRCURR = strData.substring(113, 116);
            //05 A728MONEDA       PIC X(03).
            this.strFCURR = strData.substring(116, 119);
            //05 A728TARIFA       PIC 9(11)V99.
            this.dblFARE = Double.parseDouble(strData.substring(119, 132)) / 100;
            //05 A728MDAPAG       PIC X(03).
            this.strECURR = strData.substring(132, 135);
            //05 A728TRFPAG       PIC 9(11)V99.
            this.dblEQVFARE = Double.parseDouble(strData.substring(135, 148)) / 100;
            //05 A728TCAPAG       PIC 9(10)V9(6).
            this.dblTCAPAG = Double.parseDouble(strData.substring(148, 164)) / 1000000;
            //05 A728ATBP         PIC 9(11)V99.
            this.dblATBP = Double.parseDouble(strData.substring(164, 177)) / 100;
            //05 A728MDAATB       PIC X(03).
            this.strCURR = strData.substring(177, 180);
            //05 A728ROE          PIC 9(10)V9(6).
            this.dblROE = Double.parseDouble(strData.substring(180, 196)) / 1000000;
            //05 A728CPLUSS       PIC 9(11)V99.
            this.dblPLUSSC = Double.parseDouble(strData.substring(196, 209)) / 100;
            //05 A728CSOVER       PIC 9(11)V99.
            this.dblSTOPOVERC = Double.parseDouble(strData.substring(209, 222)) / 100;
            //05 A728QSOVER       PIC 9(02).
            this.intSTOPOVERQ = Integer.parseInt(strData.substring(222, 224));
            try {
                //05 A728TAJUST       PIC 9(11)V99.
                if (Functions.deleteZerosLeft(strData.substring(224, 237)).indexOf("-") < 0) {
                    this.dblNET = Double.parseDouble(Functions.deleteZerosLeft(strData.substring(224, 237))) / 100;
                } else {
                    this.dblNET = (-1) * (Double.parseDouble(Functions.deleteZerosLeft(strData.substring(224, 237)).replaceAll("-", "")) / 100);
                }
            } catch (Exception e) {
                this.dblNET = 0;
            }

            //05 A728FBASE        PIC X(10).
            this.strFABASIS = strData.substring(237, 247).trim();
            //05 A728LOHO         PIC X(03).
            this.strLOHO = strData.substring(247, 250).trim();
            //05 A728AIRFAC       PIC X(03).
            this.strBILLINGAIRLINE = strData.substring(250, 253);
            //05 A728INDSAM       PIC X(01).
            this.strINDSAM = strData.substring(253, 254);
            //05 A728INDPRT       PIC 9(02).
            this.intINDPRT = Integer.parseInt(strData.substring(254, 256));
            //05 A728IPLUS        PIC X(01).
            this.strPLUSSI = strData.substring(256, 257);
            //05 A728SECOR        PIC X(03).
            this.strSORIGIN = strData.substring(257, 260);
            //05 A728SECDS        PIC X(03).
            this.strSDESTINY = strData.substring(260, 263);
            //05 A728SELEC        PIC X(08).
            this.strPLUSSI = strData.substring(263, 271);
            //05 A728FVLO1        PIC X(08).
            this.strFLIGHTDATE = strData.substring(271, 279);

            SECTORS.clear();
            int itemp = 0;
            for (int i = 0; i < 50; i++) {
                itemp = (i - 1) * 398;
                if (i == 0) {

                    sector = new ProrateSector();
                    //06 RUTAO     PIC X(03).
                    sector.setStrOD(strData.substring(294, 297));
                    sector.setStrEsSector("");
                    SECTORS.add(sector);

                } else {

                    if (!strData.substring(itemp + 305, itemp + 307).trim().equals("")) {
                        sector = new ProrateSector();
                        //06 XO       PIC X.
                        //sector.setStrXO(strData.substring(itemp + 293, itemp + 294));
                        sector.setStrXO(strData.substring((i * 398) + 293, (i * 398) + 294));
                        //06 RUTAD     PIC X(03).
                        sector.setStrOD(strData.substring(itemp + 297, itemp + 300));
                        //06 VIA1      PIC X(02).
                        sector.setStrVIA(strData.substring(itemp + 300, itemp + 302));
                        //06 CARRN1    PIC X(03).
                        sector.setStrCARRN(strData.substring(itemp + 302, itemp + 305));
                        //06 CARRA1    PIC X(02).
                        sector.setStrCARR(strData.substring(itemp + 305, itemp + 307));
                        //06 NVLO1     PIC X(05).
                        sector.setStrNFLIGHT(strData.substring(itemp + 307, itemp + 312));
                        //06 FCVLO1    PIC X(08).
                        sector.setStrFCVLO(strData.substring(itemp + 312, itemp + 320));
                        //06 BOOKI1    PIC X(01).
                        sector.setStrRBD(strData.substring(itemp + 320, itemp + 321));
                        //06 CLASE1    PIC X(01).
                        sector.setStrCLASE(strData.substring(itemp + 321, itemp + 322));
                        //06 FBASE1    PIC X(10).
                        sector.setStrFBASE(strData.substring(itemp + 322, itemp + 332));
                        //06 LOHO      PIC X(03).
                        sector.setStrLOHO(strData.substring(itemp + 332, itemp + 335));
                        //06 TBASE1    PIC X(01).
                        sector.setStrTBASE(strData.substring(itemp + 335, itemp + 336));
                        //06 STBAS1    PIC X(02).
                        sector.setStrSTBAS(strData.substring(itemp + 336, itemp + 338));
                        //06 FARE1     PIC 9(13)V99.
                        sector.setDblXFARE(Double.parseDouble(strData.substring(itemp + 338, itemp + 353)) / 100);
                        //06 TFARE1    PIC X(01).
                        sector.setStrTFARE(strData.substring(itemp + 353, itemp + 354));
                        //06 DIFER1    PIC 9(13)V99.
                        sector.setDblDIFER(Double.parseDouble(strData.substring(itemp + 354, itemp + 369)) / 100);
                        //06 FDIFE1    PIC X(01).
                        sector.setStrFDIFE(strData.substring(itemp + 369, itemp + 370));
                        //06 TRFM1     PIC 9(13)V99.
                        sector.setDblTRFM(Double.parseDouble(strData.substring(itemp + 370, itemp + 385)) / 100);
                        //06 MNTFM1    PIC X(03).
                        sector.setStrMNTFM(strData.substring(itemp + 385, itemp + 388));
                        //06 SS1       PIC 9(13)V99.
                        sector.setDblSURCHARGE(Double.parseDouble(strData.substring(itemp + 388, itemp + 403)) / 100);
                        //06 PLUSS1    PIC 9(13)V99.
                        sector.setDblPLUSS(Double.parseDouble(strData.substring(itemp + 403, itemp + 418)) / 100);
                        //06 STOP1     PIC 9(13)V99.
                        sector.setDblSTOP(Double.parseDouble(strData.substring(itemp + 418, itemp + 433)) / 100);
                        //06 MNACU1    PIC X(03).
                        sector.setStrMNACU(strData.substring(itemp + 433, itemp + 436));
                        //06 ACUE1     PIC 9(13)V99.
                        sector.setDblACUE(Double.parseDouble(strData.substring(itemp + 436, itemp + 451)) / 100);
                        //06 FACT1     PIC 9(13)V99.
                        sector.setLngFACTOR(Long.parseLong(strData.substring(itemp + 451, itemp + 466)) / 100);
                        //06 TARI1     PIC 9(13)V99.
                        sector.setDblFARE(Double.parseDouble(strData.substring(itemp + 466, itemp + 481)) / 100);
                        //06 YANQ1     PIC 9(13)V99.
                        sector.setDblYANQ(Double.parseDouble(strData.substring(itemp + 481, itemp + 496)) / 100);
                        //06 PPRO1     PIC 9(13)V99.
                        sector.setDblPROVISOP(Double.parseDouble(strData.substring(itemp + 496, itemp + 511)) / 100);
                        //06 SUBPA1    PIC X(20).
                        sector.setStrSUBPA(strData.substring(itemp + 511, itemp + 531));
                        //06 PROV1     PIC 9(13)V99.
                        sector.setDblPROVISOC(Double.parseDouble(strData.substring(itemp + 531, itemp + 546)) / 100);
                        //06 ACUEO1    PIC 9(13)V99.
                        sector.setDblSPA(Double.parseDouble(strData.substring(itemp + 546, itemp + 561)) / 100);
                        //06 ACUCO1    PIC X(20).
                        sector.setStrACUCO(strData.substring(itemp + 561, itemp + 581));
                        //06 AJUST1    PIC 9(13)V99.
                        try {
                            if (Functions.deleteZerosLeft(strData.substring(itemp + 581, itemp + 596)).indexOf("-") < 0) {
                                sector.setDblADJUST(Double.parseDouble(Functions.deleteZerosLeft(strData.substring(itemp + 581, itemp + 596))) / 100);
                            } else {
                                sector.setDblADJUST((-1) * (Double.parseDouble(Functions.deleteZerosLeft(strData.substring(itemp + 581, itemp + 596)).replaceAll("-", "")) / 100));
                            }
                        } catch (Exception e) {
                            sector.setDblADJUST(Functions.obtenerValorEquivalenteEBCDIC(strData.substring(itemp + 581, itemp + 596)));
                        }

                        //06 VALOR1    PIC 9(13)V99.
                        sector.setDblAMOUNT(Double.parseDouble(strData.substring(itemp + 596, itemp + 611)) / 100);
                        //06 VLMPA1    PIC 9(13)V99.
                        sector.setDblVLMPA(Double.parseDouble(strData.substring(itemp + 626, itemp + 641)) / 100);
                        //06 VLSRP1    PIC 9(13)V99.
                        sector.setDblVLSRP(Double.parseDouble(strData.substring(itemp + 641, itemp + 656)) / 100);
                        //06 INDPR1    PIC X.
                        sector.setStrINDPR(strData.substring(itemp + 656, itemp + 657));

                        if (sector.getStrINDPR().equals("S")) {
                            sector.setStrAMTV("SRP");
                        } else if (sector.getStrINDPR().equals("A")) {
                            sector.setStrAMTV("SPA");
                        } else if (sector.getStrINDPR().equals("M") || sector.getStrINDPR().equals("P")) {
                            sector.setStrAMTV("MPA");
                        } else if (sector.getStrINDPR().equals("R")) {
                            sector.setStrAMTV("RTW");
                        } else if (sector.getStrINDPR().equals("H")) {
                            sector.setStrAMTV("ACH");
                        } else {
                            sector.setStrAMTV("");
                        }

                        //06 INDISC    PIC X(1).
                        sector.setStrINDISC(strData.substring(itemp + 657, itemp + 658));
                        //06 ISC       PIC 9(7)V99.
                        sector.setDblISC(Double.parseDouble(strData.substring(itemp + 658, itemp + 667)) / 100);
                        //06 COEFIC    PIC 9(8)V9(5).
                        sector.setDblCOEFIC(Double.parseDouble(strData.substring(itemp + 667, itemp + 680)) / 100000);
                        //06 ACUBAS    PIC X(4).
                        sector.setStrACUBAS(strData.substring(itemp + 680, itemp + 684));
                        //06 ACUSTS    PIC X(1).
                        sector.setStrACUSTS(strData.substring(itemp + 684, itemp + 685));
                        //06 PRVSTS    PIC X(2).
                        sector.setStrPRVSTS(strData.substring(itemp + 685, itemp + 687));
                        //05 A728RERUT    PIC X(01).
                        sector.setStrA728RERUT(strData.substring(20189, 20190));

                        if (SECTORS.get(SECTORS.size() - 1).getStrOD().trim().equals(this.strSORIGIN.trim())
                                && sector.getStrOD().trim().equals(this.strSDESTINY.trim())) {
                            SECTORS.get(SECTORS.size() - 1).setStrEsSector("solo");
                            sector.setStrEsSector("todo");
                        } else {
                            sector.setStrEsSector("");
                        }

                        SECTORS.add(sector);
                    } else {
                        i = 51;
                    }
                }
            }

            this.strA728RERUT = strData.substring(20189, 20190).trim();
            //System.out.println("BUFFER..." + strData);
            //System.out.println("TAMANIO DATA..." + strData.length());
            //05 MSG          PIC X(40).
            this.strMSGERR = strData.substring(20218, 20258).trim();
            //05 USER         PIC X(10). 
            //this.strUser = strData.substring(20258, 20268).trim();
            //05 A728CODTAX   PIC X(10).
            this.strMISC = strData.substring(20268, 20278).trim();
            //05 A728GRUPO    PIC X(06).
            this.strGRUPO = strData.substring(20278, 20284);
            //05 A728CTYVTA   PIC X(03).
            this.strSELLINGPLACE = strData.substring(20284, 20287);
            //05 A728COUVTA   PIC X(02).
            this.strCOUVTA = strData.substring(20287, 20289);
            //05 A728CTYEMI   PIC X(03).
            this.strISSUEPLACE = strData.substring(20289, 20292);
            //05 A728COUEMI   PIC X(02).
            this.strCOUEMI = strData.substring(20292, 20294);
            //05 A728AJTRAM   PIC X(01).
            this.strAJTRAM = strData.substring(20294, 20295);
            //***** Campos del A020 ******************************
            //05 A020RMSN   PIC X(01).
            this.strA020RMSN = strData.substring(20295, 20296);
            //05 A020CLASRM   PIC X(01). 
            this.strA020CLASRM = strData.substring(20296, 20297);
            //05 A020ACEPTA   PIC 9(09)V99.  
            this.dblA020ACEPTA = Double.parseDouble(strData.substring(20297, 20308)) / 100;
            //05 A020IMPINT   PIC 9(09)V99.
            this.dblA020IMPINT = Double.parseDouble(strData.substring(20308, 20319)) / 100;
            //05 A020TOTHAB   PIC 9(09)V99.
            this.dblA020TOTHAB = Double.parseDouble(strData.substring(20319, 20330)) / 100;
            //05 A020COMISP   PIC 9(05)V99.   
            this.dblA020COMISIP = Double.parseDouble(strData.substring(20330, 20337)) / 100;
            //05 A020CODOB1   PIC X(04).   
            this.strA020CODOB1 = strData.substring(20337, 20341);
            //05 A020CODOB2   PIC X(04).  
            this.strA020CODOB2 = strData.substring(20341, 20345);
            //05 A020CODOB3   PIC X(04).   
            this.strA020CODOB3 = strData.substring(20345, 20349);
            //05 A020CODOB4   PIC X(04).      
            this.strA020CODOB4 = strData.substring(20349, 20353);
            //05 A020CODOB5   PIC X(04).      
            this.strA020CODOB5 = strData.substring(20353, 20357);
            //05 A020COMME1   PIC X(60).  
            this.strA020COMME1 = strData.substring(20357, 20417);
            //05 A020COMME2   PIC X(60).  
            this.strA020COMME2 = strData.substring(20417, 20477);
            //05 A020COMME3   PIC X(60).      
            this.strA020COMME3 = strData.substring(20477, 20537);
            //05 A020COMME4   PIC X(60).
            this.strA020COMME4 = strData.substring(20537, 20597);
            //05 A020COMME5   PIC X(60).
            this.strA020COMME5 = strData.substring(20597, 20657);
            //05 A020COMME6   PIC X(60).
            this.strA020COMME6 = strData.substring(20657, 20717);
            //05 A020KEY      PIC X(09).
            this.strA020NROPRT = strData.substring(20717, 20726);
            //05 A020BASE     PIC X(10).
            this.strA020BASE = strData.substring(20726, 20736);
            //05 A020TARIFA   PIC 9(09)V99.  
            this.dblA020TARIFA = Double.parseDouble(strData.substring(20736, 20747)) / 100;
            //05 A020FAREUS   PIC 9(09)V99.  
            this.dblA020FAREUS = Double.parseDouble(strData.substring(20747, 20758)) / 100;
            //05 A020DEBHAB   PIC X(05). 
            this.strA020DEBHAB = strData.substring(20758, 20763);
            //05 A020QSEG     PIC 9(09)V99.
            try {
                this.strA020QSEG = String.valueOf(Double.parseDouble(strData.substring(20763, 20774)) / 100);
            } catch (Exception e) {
                this.strA020QSEG = "0";
                e.printStackTrace();
            }
            //05 A020MONEDA   PIC X(03).
            this.strA020MONEDA = strData.substring(20774, 20777);
            //05 A020MNRCD    PIC X(03).
            this.strA020MNRCD = strData.substring(20777, 20780);
            //05 A020AOTCPM   PIC 9(02)V999.
            this.dblA020AOTCPM = Double.parseDouble(strData.substring(20780, 20785)) / 1000;
            //05 A020AOTCRM   PIC 9(09)V99.
            this.dblA020AOTCRM = Double.parseDouble(strData.substring(20785, 20796)) / 100;
            
            //Calculando .....
            this.dblA020REDEBI = this.dblA020SUDEBI - this.dblA020ACEPTA;
            if (this.dblA020COMISIP > 0) {
                this.dblA020IMPINT = (this.dblA020COMISIP * this.dblA020ACEPTA) / 100;
            } else {
                this.dblA020IMPINT = 0;
            }
            this.dblA020COMISI = this.dblA020IMPNAC - this.dblA020IMPINT;
            if (this.strA020TCALC.trim().equals("R") || this.strA020TCALC.trim().equals("L")) {
                this.dblA020TAX = this.dblA020TOTHAB - this.dblA020TOTDEB;
            } else {
                this.dblA020TAX = this.dblA020TOTDEB - this.dblA020TOTHAB;
            }

            if (!this.strA020TCALC.trim().equals("C") && !this.strA020TCALC.trim().equals("R")
                    && !this.strA020TCALC.trim().equals("L") && (!this.strA020TIPORM.equals("N")
                    || this.strA020NROPRT.equals(""))) {
                this.dblA020DOTCRM = this.dblA020REDEBI * (this.dblA020AOTCPM / 100);

            } else if (this.strA020TCALC.trim().equals("R") || this.strA020TCALC.trim().equals("L")) {
                this.dblA020AOTCRM = (this.dblA020ACEPTA * this.dblA020AOTCPM) / 100;
                this.dblA020DOTCRM = this.dblA020AOTCRM - this.dblA020BOTCRM;

            } else {
                //Si Cálculo es 'C' o 'X'
                this.dblA020AOTCRM = (this.dblA020ACEPTA * this.dblA020AOTCPM) / 100;
                this.dblA020DOTCRM = this.dblA020BOTCRM - this.dblA020AOTCRM;
            }
            //Calculando REDEBI Y TAX ******************************************            
            if (this.dblA020TAX < this.dblVALMINIMOTAX && this.dblA020REDEBI < this.dblVALMINIMOTARIFA
                    && this.dblA020ANALIZ >= this.dblA020COMISIP) {
                this.dblA020NETO = 0;
            } else {

                this.dblA020NETO = 0;
                double tax = 0, neto = 0, comisi = 0;
                if (this.dblA020TAX < this.dblVALMINIMOTAX) {
                    tax = 0;
                } else {
                    tax = this.dblA020TAX;
                    this.dblA020NETO = this.dblA020NETO + this.dblA020TAX;
                }

                if (this.dblA020REDEBI < this.dblVALMINIMOTARIFA
                        && this.dblA020COMISI >= -0.99 && this.dblA020COMISI <= 0.99) {
                    comisi = 0;
                } else {
                    comisi = this.dblA020COMISI;
                }

                neto = (this.dblA020REDEBI - comisi) + tax - this.dblA020DOTCRM;
                if (this.dblA020REDEBI >= this.dblVALMINIMOTARIFA) {
                    if (neto > 0) {
                        this.dblA020NETO = this.dblA020NETO + (this.dblA020REDEBI - this.dblA020COMISI - this.dblA020DOTCRM);
                    }
                } else {
                    if (neto > 0 && this.dblA020ANALIZ < this.dblA020COMISIP) {
                        this.dblA020NETO = this.dblA020NETO + (this.dblA020IMPINT - this.dblA020IMPNAC) + (this.dblA020AOTCRM - this.dblA020BOTCRM);
                    }
                }
            }
            //***************** Calculando CLASSRM *******************************************            
            this.strA020CLASRM = "T";
            if ((this.dblA020TAX >= this.dblVALMINIMOTAX) && (this.dblA020TAX == this.dblA020NETO)) {
                this.strA020CLASRM = "X";

            } else {
                //WS-MINIMO-COMIS = (esta variable tiene valor:1) PRO9592
                if ((this.dblA020TAX >= this.dblVALMINIMOTAX) && this.dblA020COMISI != 0) {
                    if (this.dblA020COMISI >= -1 && this.dblA020COMISI <= 1) {
                        this.strA020CLASRM = "X";
                        this.dblA020NETO = this.dblA020TAX;
                    }
                } else {
                    if ((this.dblA020TAX >= this.dblVALMINIMOTAX) && this.dblA020COMISI == 0
                            && this.dblA020REDEBI <= this.dblVALMINIMOTARIFA) {
                        this.strA020CLASRM = "X";
                        this.dblA020NETO = this.dblA020TAX;
                    } else {
                        if (this.dblA020ANALIZ < this.dblA020COMISIP && this.dblA020NETO > 0 && (this.dblA020COMISI * -1) >= 1 && this.dblA020TAX < this.dblVALMINIMOTAX) {
                            this.strA020CLASRM = "C";
                        }
                    }
                }
            }
            //*************************************************************************

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //</editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="loadData_Prod()">
    public void loadData_Prod(String strData, String calfa, UserView user) {
        try {
            ProrateSector sector = null;
            //05 A728NROPRT       PIC 9(09).
            this.strA020NROPRT = strData.substring(3, 12);
            //05 A728SEQPRT       PIC 9(02).
            this.strSEQPRT = strData.substring(12, 14);
            //05 A728TUSO         PIC X(02).
            this.strTUSO = strData.substring(14, 16);
            //05 A728CIA          PIC X(03).
            //05 A728NRODOC       PIC X(10).
            //05 A728CUPON        PIC X(01).
            this.strDOCNBR = strData.substring(16, 30);
            //05 A728DCHEQ        PIC X(01).
            this.strDCHEQ = strData.substring(30, 31);
            //05 A728TVENTA       PIC X(01).
            this.strTVENTA = strData.substring(31, 32);
            //05 A728CODIT        PIC X(20).
            this.strIT = strData.substring(32, 52).trim();
            //05 A728FECVTA       PIC X(08).
            this.strISSUEDATE = strData.substring(52, 60);
            //05 A728FECFAC       PIC X(08).
            this.strBILLINGDATE = strData.substring(60, 68);
            //05 A728PORDES       PIC 9(03)V99.
            this.dblDISCC = Double.parseDouble(strData.substring(68, 73)) / 100;
            //05 A728RUTORG       PIC X(03).
            this.strINIT = strData.substring(73, 76);
            //05 A728TDESC        PIC X(02).
            this.strDISCT = strData.substring(76, 78);
            //05 A728TCAREG       PIC 9(10)V9(6).
            this.dblTCAREG = Double.parseDouble(strData.substring(78, 94)) / 1000000;
            //05 A728MONREG       PIC X(03).
            this.strMONREG = strData.substring(94, 97);
            //05 A728TCASYS       PIC 9(10)V9(6).
            this.dblTCASYS = Double.parseDouble(strData.substring(97, 113)) / 1000000;
            //05 A728MONSYS       PIC X(03).
            this.strRCURR = strData.substring(113, 116);
            //05 A728MONEDA       PIC X(03).
            this.strFCURR = strData.substring(116, 119);
            //05 A728TARIFA       PIC 9(11)V99.
            this.dblFARE = Double.parseDouble(strData.substring(119, 132)) / 100;
            //05 A728MDAPAG       PIC X(03).
            this.strECURR = strData.substring(132, 135);
            //05 A728TRFPAG       PIC 9(11)V99.
            this.dblEQVFARE = Double.parseDouble(strData.substring(135, 148)) / 100;
            //05 A728TCAPAG       PIC 9(10)V9(6).
            this.dblTCAPAG = Double.parseDouble(strData.substring(148, 164)) / 1000000;
            //05 A728ATBP         PIC 9(11)V99.
            this.dblATBP = Double.parseDouble(strData.substring(164, 177)) / 100;
            //05 A728MDAATB       PIC X(03).
            this.strCURR = strData.substring(177, 180);
            //05 A728ROE          PIC 9(10)V9(6).
            this.dblROE = Double.parseDouble(strData.substring(180, 196)) / 1000000;
            //05 A728CPLUSS       PIC 9(11)V99.
            this.dblPLUSSC = Double.parseDouble(strData.substring(196, 209)) / 100;
            //05 A728CSOVER       PIC 9(11)V99.
            this.dblSTOPOVERC = Double.parseDouble(strData.substring(209, 222)) / 100;
            //05 A728QSOVER       PIC 9(02).
            this.intSTOPOVERQ = Integer.parseInt(strData.substring(222, 224));
            try {
                //05 A728TAJUST       PIC 9(11)V99.
                if (Functions.deleteZerosLeft(strData.substring(224, 237)).indexOf("-") < 0) {
                    this.dblNET = Double.parseDouble(Functions.deleteZerosLeft(strData.substring(224, 237))) / 100;
                } else {
                    this.dblNET = (-1) * (Double.parseDouble(Functions.deleteZerosLeft(strData.substring(224, 237)).replaceAll("-", "")) / 100);
                }
            } catch (Exception e) {
                this.dblNET = 0;
            }

            //05 A728FBASE        PIC X(10).
            this.strFABASIS = strData.substring(237, 247).trim();
            //05 A728LOHO         PIC X(03).
            this.strLOHO = strData.substring(247, 250).trim();
            //05 A728AIRFAC       PIC X(03).
            this.strBILLINGAIRLINE = strData.substring(250, 253);
            //05 A728INDSAM       PIC X(01).
            this.strINDSAM = strData.substring(253, 254);
            //05 A728INDPRT       PIC 9(02).
            try {
                this.intINDPRT = Integer.parseInt(strData.substring(254, 256));
            } catch (Exception e) {
                this.intINDPRT = 0;
            }
            //05 A728IPLUS        PIC X(01).
            this.strPLUSSI = strData.substring(256, 257);
            //05 A728SECOR        PIC X(03).
            this.strSORIGIN = strData.substring(257, 260);
            //05 A728SECDS        PIC X(03).
            this.strSDESTINY = strData.substring(260, 263);
            //05 A728SELEC        PIC X(08).
            this.strPLUSSI = strData.substring(263, 271);
            //05 A728FVLO1        PIC X(08).
            this.strFLIGHTDATE = strData.substring(271, 279);

            SECTORS.clear();
            int itemp = 0;
            for (int i = 0; i < 50; i++) {
                itemp = (i - 1) * 398;
                if (i == 0) {

                    sector = new ProrateSector();
                    //06 RUTAO     PIC X(03).
                    sector.setStrOD(strData.substring(294, 297));
                    sector.setStrEsSector("");
                    SECTORS.add(sector);

                } else {

                    if (!strData.substring(itemp + 305, itemp + 307).trim().equals("")) {
                        sector = new ProrateSector();
                        //06 XO       PIC X.
                        //sector.setStrXO(strData.substring(itemp + 293, itemp + 294));
                        sector.setStrXO(strData.substring((i * 398) + 293, (i * 398) + 294));
                        //06 RUTAD     PIC X(03).
                        sector.setStrOD(strData.substring(itemp + 297, itemp + 300));
                        //06 VIA1      PIC X(02).
                        sector.setStrVIA(strData.substring(itemp + 300, itemp + 302));
                        //06 CARRN1    PIC X(03).
                        sector.setStrCARRN(strData.substring(itemp + 302, itemp + 305));
                        //06 CARRA1    PIC X(02).
                        sector.setStrCARR(strData.substring(itemp + 305, itemp + 307));
                        //06 NVLO1     PIC X(05).
                        sector.setStrNFLIGHT(strData.substring(itemp + 307, itemp + 312));
                        //06 FCVLO1    PIC X(08).
                        sector.setStrFCVLO(strData.substring(itemp + 312, itemp + 320));
                        //06 BOOKI1    PIC X(01).
                        sector.setStrRBD(strData.substring(itemp + 320, itemp + 321));
                        //06 CLASE1    PIC X(01).
                        sector.setStrCLASE(strData.substring(itemp + 321, itemp + 322));
                        //06 FBASE1    PIC X(10).
                        sector.setStrFBASE(strData.substring(itemp + 322, itemp + 332));
                        //06 LOHO      PIC X(03).
                        sector.setStrLOHO(strData.substring(itemp + 332, itemp + 335));
                        //06 TBASE1    PIC X(01).
                        sector.setStrTBASE(strData.substring(itemp + 335, itemp + 336));
                        //06 STBAS1    PIC X(02).
                        sector.setStrSTBAS(strData.substring(itemp + 336, itemp + 338));
                        //06 FARE1     PIC 9(13)V99.
                        sector.setDblXFARE(Double.parseDouble(strData.substring(itemp + 338, itemp + 353)) / 100);
                        //06 TFARE1    PIC X(01).
                        sector.setStrTFARE(strData.substring(itemp + 353, itemp + 354));
                        //06 DIFER1    PIC 9(13)V99.
                        sector.setDblDIFER(Double.parseDouble(strData.substring(itemp + 354, itemp + 369)) / 100);
                        //06 FDIFE1    PIC X(01).
                        sector.setStrFDIFE(strData.substring(itemp + 369, itemp + 370));
                        //06 TRFM1     PIC 9(13)V99.
                        sector.setDblTRFM(Double.parseDouble(strData.substring(itemp + 370, itemp + 385)) / 100);
                        //06 MNTFM1    PIC X(03).
                        sector.setStrMNTFM(strData.substring(itemp + 385, itemp + 388));
                        //06 SS1       PIC 9(13)V99.
                        sector.setDblSURCHARGE(Double.parseDouble(strData.substring(itemp + 388, itemp + 403)) / 100);
                        //06 PLUSS1    PIC 9(13)V99.
                        sector.setDblPLUSS(Double.parseDouble(strData.substring(itemp + 403, itemp + 418)) / 100);
                        //06 STOP1     PIC 9(13)V99.
                        sector.setDblSTOP(Double.parseDouble(strData.substring(itemp + 418, itemp + 433)) / 100);
                        //06 MNACU1    PIC X(03).
                        sector.setStrMNACU(strData.substring(itemp + 433, itemp + 436));
                        //06 ACUE1     PIC 9(13)V99.
                        sector.setDblACUE(Double.parseDouble(strData.substring(itemp + 436, itemp + 451)) / 100);
                        //06 FACT1     PIC 9(13)V99.
                        sector.setLngFACTOR(Long.parseLong(strData.substring(itemp + 451, itemp + 466)) / 100);
                        //06 TARI1     PIC 9(13)V99.
                        sector.setDblFARE(Double.parseDouble(strData.substring(itemp + 466, itemp + 481)) / 100);
                        //06 YANQ1     PIC 9(13)V99.
                        sector.setDblYANQ(Double.parseDouble(strData.substring(itemp + 481, itemp + 496)) / 100);
                        //06 PPRO1     PIC 9(13)V99.
                        sector.setDblPROVISOP(Double.parseDouble(strData.substring(itemp + 496, itemp + 511)) / 100);
                        //06 SUBPA1    PIC X(20).
                        sector.setStrSUBPA(strData.substring(itemp + 511, itemp + 531));
                        //06 PROV1     PIC 9(13)V99.
                        sector.setDblPROVISOC(Double.parseDouble(strData.substring(itemp + 531, itemp + 546)) / 100);
                        //06 ACUEO1    PIC 9(13)V99.
                        sector.setDblSPA(Double.parseDouble(strData.substring(itemp + 546, itemp + 561)) / 100);
                        //06 ACUCO1    PIC X(20).
                        sector.setStrACUCO(strData.substring(itemp + 561, itemp + 581));
                        //06 AJUST1    PIC 9(13)V99.
                        try {
                            if (Functions.deleteZerosLeft(strData.substring(itemp + 581, itemp + 596)).indexOf("-") < 0) {
                                sector.setDblADJUST(Double.parseDouble(Functions.deleteZerosLeft(strData.substring(itemp + 581, itemp + 596))) / 100);
                            } else {
                                sector.setDblADJUST((-1) * (Double.parseDouble(Functions.deleteZerosLeft(strData.substring(itemp + 581, itemp + 596)).replaceAll("-", "")) / 100));
                            }
                        } catch (Exception e) {
                            sector.setDblADJUST(Functions.obtenerValorEquivalenteEBCDIC(strData.substring(itemp + 581, itemp + 596)));
                        }

                        //06 VALOR1    PIC 9(13)V99.
                        sector.setDblAMOUNT(Double.parseDouble(strData.substring(itemp + 596, itemp + 611)) / 100);
                        //06 VLMPA1    PIC 9(13)V99.
                        sector.setDblVLMPA(Double.parseDouble(strData.substring(itemp + 626, itemp + 641)) / 100);
                        //06 VLSRP1    PIC 9(13)V99.
                        sector.setDblVLSRP(Double.parseDouble(strData.substring(itemp + 641, itemp + 656)) / 100);
                        //06 INDPR1    PIC X.
                        sector.setStrINDPR(strData.substring(itemp + 656, itemp + 657));

                        if (sector.getStrINDPR().equals("S")) {
                            sector.setStrAMTV("SRP");
                        } else if (sector.getStrINDPR().equals("A")) {
                            sector.setStrAMTV("SPA");
                        } else if (sector.getStrINDPR().equals("M") || sector.getStrINDPR().equals("P")) {
                            sector.setStrAMTV("MPA");
                        } else if (sector.getStrINDPR().equals("R")) {
                            sector.setStrAMTV("RTW");
                        } else if (sector.getStrINDPR().equals("H")) {
                            sector.setStrAMTV("ACH");
                        } else {
                            sector.setStrAMTV("");
                        }

                        //06 INDISC    PIC X(1).
                        sector.setStrINDISC(strData.substring(itemp + 657, itemp + 658));
                        //06 ISC       PIC 9(7)V99.
                        sector.setDblISC(Double.parseDouble(strData.substring(itemp + 658, itemp + 667)) / 100);
                        //06 COEFIC    PIC 9(8)V9(5).
                        sector.setDblCOEFIC(Double.parseDouble(strData.substring(itemp + 667, itemp + 680)) / 100000);
                        //06 ACUBAS    PIC X(4).
                        sector.setStrACUBAS(strData.substring(itemp + 680, itemp + 684));
                        //06 ACUSTS    PIC X(1).
                        sector.setStrACUSTS(strData.substring(itemp + 684, itemp + 685));
                        //06 PRVSTS    PIC X(2).
                        sector.setStrPRVSTS(strData.substring(itemp + 685, itemp + 687));
                        //05 A728RERUT    PIC X(01).
                        sector.setStrA728RERUT(strData.substring(20189, 20190));

                        if (SECTORS.get(SECTORS.size() - 1).getStrOD().trim().equals(this.strSORIGIN.trim())
                                && sector.getStrOD().trim().equals(this.strSDESTINY.trim())) {
                            SECTORS.get(SECTORS.size() - 1).setStrEsSector("solo");
                            sector.setStrEsSector("todo");
                        } else {
                            sector.setStrEsSector("");
                        }

                        SECTORS.add(sector);
                    } else {
                        i = 51;
                    }
                }
            }
            this.strA728RERUT = strData.substring(20189, 20190).trim();
            //System.out.println("BUFFER..." + strData);
            //System.out.println("TAMANIO DATA..." + strData.length());
            //05 MSG          PIC X(40).
            this.strMSGERR = strData.substring(20218, 20258).trim();
            //05 USER         PIC X(10). 
            //this.strUser = strData.substring(20258, 20268).trim();
            //05 A728CODTAX   PIC X(10).
            this.strMISC = strData.substring(20268, 20278).trim();
            //05 A728GRUPO    PIC X(06).
            this.strGRUPO = strData.substring(20278, 20284);
            //05 A728CTYVTA   PIC X(03).
            this.strSELLINGPLACE = strData.substring(20284, 20287);
            //05 A728COUVTA   PIC X(02).
            this.strCOUVTA = strData.substring(20287, 20289);
            //05 A728CTYEMI   PIC X(03).
            this.strISSUEPLACE = strData.substring(20289, 20292);
            //05 A728COUEMI   PIC X(02).
            this.strCOUEMI = strData.substring(20292, 20294);
            //05 A728AJTRAM   PIC X(01).
            this.strAJTRAM = strData.substring(20294, 20295);

            //***** Campos del A020 ******************************
            //05 A020RMSN   PIC X(01).
            this.strA020RMSN = strData.substring(20295, 20296);
            //05 A020CLASRM   PIC X(01). 
            this.strA020CLASRM = strData.substring(20296, 20297);
            //05 A020ACEPTA   PIC 9(09)V99.  
            this.dblA020ACEPTA = Double.parseDouble(strData.substring(20297, 20308)) / 100;
            //05 A020IMPINT   PIC 9(09)V99.
            this.dblA020IMPINT = Double.parseDouble(strData.substring(20308, 20319)) / 100;
            //05 A020TOTHAB   PIC 9(09)V99.
            this.dblA020TOTHAB = Double.parseDouble(strData.substring(20319, 20330)) / 100;
            //05 A020COMISP   PIC 9(05)V99.   
            this.dblA020COMISIP = Double.parseDouble(strData.substring(20330, 20337)) / 100;
            //05 A020CODOB1   PIC X(04).   
            this.strA020CODOB1 = strData.substring(20337, 20341);
            //05 A020CODOB2   PIC X(04).  
            this.strA020CODOB2 = strData.substring(20341, 20345);
            //05 A020CODOB3   PIC X(04).   
            this.strA020CODOB3 = strData.substring(20345, 20349);
            //05 A020CODOB4   PIC X(04).      
            this.strA020CODOB4 = strData.substring(20349, 20353);
            //05 A020CODOB5   PIC X(04).      
            this.strA020CODOB5 = strData.substring(20353, 20357);
            //05 A020COMME1   PIC X(60).  
            this.strA020COMME1 = strData.substring(20357, 20417);
            //05 A020COMME2   PIC X(60).  
            this.strA020COMME2 = strData.substring(20417, 20477);
            //05 A020COMME3   PIC X(60).      
            this.strA020COMME3 = strData.substring(20477, 20537);
            //05 A020COMME4   PIC X(60).
            this.strA020COMME4 = strData.substring(20537, 20597);
            //05 A020COMME5   PIC X(60).
            this.strA020COMME5 = strData.substring(20597, 20657);
            //05 A020COMME6   PIC X(60).
            this.strA020COMME6 = strData.substring(20657, 20717);
            //05 A020KEY      PIC X(09).
            this.strA020NROPRT = strData.substring(20717, 20726);
            //05 A020BASE     PIC X(10).
            this.strA020BASE = strData.substring(20726, 20736);
            //05 A020TARIFA   PIC 9(09)V99.  
            this.dblA020TARIFA = Double.parseDouble(strData.substring(20736, 20747)) / 1000;
            //05 A020FAREUS   PIC 9(09)V99.  
            this.dblA020FAREUS = Double.parseDouble(strData.substring(20747, 20758)) / 100;
            //05 A020DEBHAB   PIC X(05). 
            this.strA020DEBHAB = strData.substring(20758, 20763);
            //05 A020QSEG     PIC 9(09)V99.
            try {
                this.strA020QSEG = String.valueOf(Double.parseDouble(strData.substring(20763, 20774)) / 100);
            } catch (Exception e) {
                this.strA020QSEG = "0";
                e.printStackTrace();
            }
            //05 A020MONEDA   PIC X(03).
            this.strA020MONEDA = strData.substring(20774, 20777);
            //05 A020MNRCD    PIC X(03).
            this.strA020MNRCD = strData.substring(20777, 20780);
            //05 A020AOTCPM   PIC 9(02)V999.
            this.dblA020AOTCPM = Double.parseDouble(strData.substring(20780, 20785)) / 100;
            //05 A020AOTCRM   PIC 9(09)V99.
            this.dblA020AOTCRM = Double.parseDouble(strData.substring(20785, 20796)) / 100;

            //Calculando .....
            this.dblA020REDEBI = this.dblA020SUDEBI - this.dblA020ACEPTA;
            if (this.dblA020COMISIP > 0) {
                this.dblA020IMPINT = (this.dblA020COMISIP * this.dblA020ACEPTA) / 100;
            } else {
                this.dblA020IMPINT = 0;
            }
            this.dblA020COMISI = this.dblA020IMPNAC - this.dblA020IMPINT;
            this.dblA020TAX = this.dblA020TOTDEB - this.dblA020TOTHAB;
            //Calculando REDEBI Y TAX ************************************************            
            if (this.dblA020TAX < this.dblVALMINIMOTAX && this.dblA020REDEBI < this.dblVALMINIMOTARIFA
                    && this.dblA020ANALIZ >= this.dblA020COMISIP) {
                this.dblA020NETO = 0;
            } else {

                this.dblA020NETO = 0;
                double tax = 0, neto = 0, comisi = 0;
                if (this.dblA020TAX < this.dblVALMINIMOTAX) {
                    tax = 0;
                } else {
                    tax = this.dblA020TAX;
                    this.dblA020NETO = this.dblA020NETO + this.dblA020TAX;
                }
                //Se resetea los valores del COMISI porque no hay rechazo x monto minimo de ISC.
                comisi = this.dblA020COMISI;
                neto = (this.dblA020REDEBI - comisi - this.dblA020DOTCRM) + tax;
                if (this.dblA020REDEBI >= this.dblVALMINIMOTARIFA) {
                    if (neto > 0) {
                        this.dblA020NETO = this.dblA020NETO + (this.dblA020REDEBI - this.dblA020COMISI - this.dblA020DOTCRM);
                    }
                } else {
                    if (neto > 0 && this.dblA020ANALIZ < this.dblA020COMISIP) {
                        this.dblA020NETO = this.dblA020NETO + (this.dblA020IMPINT - this.dblA020IMPNAC) + (this.dblA020AOTCRM - this.dblA020BOTCRM);
                    }
                }
            }

            if (!this.strA020TCALC.trim().equals("C") && !this.strA020TCALC.trim().equals("R")
                    && !this.strA020TCALC.trim().equals("L") && (!this.strA020TIPORM.equals("N")
                    || this.strA020NROPRT.equals(""))) {
                this.dblA020DOTCRM = this.dblA020REDEBI * (this.dblA020AOTCPM / 100);

            } else if (this.strA020TCALC.trim().equals("R") || this.strA020TCALC.trim().equals("L")) {
                this.dblA020AOTCRM = (this.dblA020ACEPTA * this.dblA020AOTCPM) / 100;
                this.dblA020DOTCRM = this.dblA020AOTCRM - this.dblA020BOTCRM;

            } else {
                //Si Cálculo es 'C' o 'X'
                this.dblA020AOTCRM = (this.dblA020ACEPTA * this.dblA020AOTCPM) / 100;
                this.dblA020DOTCRM = this.dblA020BOTCRM - this.dblA020AOTCRM;
            }

            //***************** Calculando CLASSRM *******************************************            
            this.strA020CLASRM = "T";
            if ((this.dblA020TAX >= this.dblVALMINIMOTAX) && (this.dblA020TAX == this.dblA020NETO)) {

                if (this.dblA020REDEBI >= -5 && this.dblA020REDEBI <= 5
                        && this.dblA020TAX >= 0) {
                    this.strA020CLASRM = "X";

                } else if (user.getUserInfo().CITY.trim().toUpperCase().equals("TAX")) {
                    if (this.dblA020REDEBI >= -5 && this.dblA020REDEBI <= 5
                            && this.dblA020COMISI >= -0.99 && this.dblA020COMISI <= 0.99) {
                        this.strA020CLASRM = "X";
                    }
                } else {
                    this.strA020CLASRM = "X";
                }


            } else {

                if ((this.dblA020REDEBI < (this.dblVALMINIMOTARIFA * -1) || this.dblA020REDEBI > this.dblVALMINIMOTARIFA)
                        && this.dblA020TAX >= 0) {
                    this.strA020CLASRM = "T";

                } else if ((this.dblA020TAX >= this.dblVALMINIMOTAX) && this.dblA020COMISI != 0 && this.dblA020NETO == this.dblA020TAX) {
                    if (this.dblA020COMISI >= -1 && this.dblA020COMISI <= 1) {
                        this.strA020CLASRM = "X";
                        this.dblA020NETO = this.dblA020TAX;
                    }
                } else {
                    if ((this.dblA020TAX >= this.dblVALMINIMOTAX) && this.dblA020COMISI == 0
                            && this.dblA020REDEBI <= this.dblVALMINIMOTARIFA) {
                        this.strA020CLASRM = "X";
                        this.dblA020NETO = this.dblA020TAX;
                    } else {
                        if (this.dblA020ANALIZ < this.dblA020COMISIP && this.dblA020NETO > 0 && (this.dblA020COMISI * -1) >= 1 && this.dblA020TAX < this.dblVALMINIMOTAX) {
                            this.strA020CLASRM = "C";
                        }
                    }
                }
            }
            //*************************************************************************

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //</editor-fold>
    
    public String getStrCCUST() {
        return strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public String getStrNROPRT() {
        return strNROPRT;
    }

    public void setStrNROPRT(String strNROPRT) {
        this.strNROPRT = strNROPRT;
    }

    public String getStrBILLINGDATE() {
        return strBILLINGDATE;
    }

    public void setStrBILLINGDATE(String strBILLINGDATE) {
        this.strBILLINGDATE = strBILLINGDATE;
    }

    public String getStrAirlineName() {
        return strAirlineName;
    }

    public void setStrAirlineName(String strAirlineName) {
        this.strAirlineName = strAirlineName;
    }

    public String getStrAirlineAlfaCode() {
        return strAirlineAlfaCode;
    }

    public void setStrAirlineAlfaCode(String strAirlineAlfaCode) {
        this.strAirlineAlfaCode = strAirlineAlfaCode;
    }

    public String getStrISSUEDATE() {
        return strISSUEDATE;
    }

    public void setStrISSUEDATE(String strISSUEDATE) {
        this.strISSUEDATE = strISSUEDATE;
    }

    public String getStrBILLINGAIRLINE() {
        return strBILLINGAIRLINE;
    }

    public void setStrBILLINGAIRLINE(String strBILLINGAIRLINE) {
        this.strBILLINGAIRLINE = strBILLINGAIRLINE;
    }

    public String getStrSELLINGPLACE() {
        return strSELLINGPLACE;
    }

    public void setStrSELLINGPLACE(String strSELLINGPLACE) {
        this.strSELLINGPLACE = strSELLINGPLACE;
    }

    public String getStrDOCNBR() {
        return strDOCNBR;
    }

    public void setStrDOCNBR(String strDOCNBR) {
        this.strDOCNBR = strDOCNBR;
    }

    public String getStrISSUEPLACE() {
        return strISSUEPLACE;
    }

    public void setStrISSUEPLACE(String strISSUEPLACE) {
        this.strISSUEPLACE = strISSUEPLACE;
    }

    public String getStrSORIGIN() {
        return strSORIGIN;
    }

    public void setStrSORIGIN(String strSORIGIN) {
        this.strSORIGIN = strSORIGIN;
    }

    public String getStrSDESTINY() {
        return strSDESTINY;
    }

    public void setStrSDESTINY(String strSDESTINY) {
        this.strSDESTINY = strSDESTINY;
    }

    public String getStrFLIGHTDATE() {
        return strFLIGHTDATE;
    }

    public void setStrFLIGHTDATE(String strFLIGHTDATE) {
        this.strFLIGHTDATE = strFLIGHTDATE;
    }

    public String getStrCURR() {
        return strCURR;
    }

    public void setStrCURR(String strCURR) {
        this.strCURR = strCURR;
    }

    public String getStrFCURR() {
        return strFCURR;
    }

    public void setStrFCURR(String strFCURR) {
        this.strFCURR = strFCURR;
    }

    public String getStrECURR() {
        return strECURR;
    }

    public void setStrECURR(String strECURR) {
        this.strECURR = strECURR;
    }

    public String getStrPLUSSI() {
        return strPLUSSI;
    }

    public void setStrPLUSSI(String strPLUSSI) {
        this.strPLUSSI = strPLUSSI;
    }

    public String getStrMISC() {
        return strMISC;
    }

    public void setStrMISC(String strMISC) {
        this.strMISC = strMISC;
    }

    public String getStrDISCT() {
        return strDISCT;
    }

    public void setStrDISCT(String strDISCT) {
        this.strDISCT = strDISCT;
    }

    public String getStrIT() {
        return strIT;
    }

    public void setStrIT(String strIT) {
        this.strIT = strIT;
    }

    public String getStrFABASIS() {
        return strFABASIS;
    }

    public void setStrFABASIS(String strFABASIS) {
        this.strFABASIS = strFABASIS;
    }

    public String getStrLOHO() {
        return strLOHO;
    }

    public void setStrLOHO(String strLOHO) {
        this.strLOHO = strLOHO;
    }

    public String getStrINIT() {
        return strINIT;
    }

    public void setStrINIT(String strINIT) {
        this.strINIT = strINIT;
    }

    public String getStrRCURR() {
        return strRCURR;
    }

    public void setStrRCURR(String strRCURR) {
        this.strRCURR = strRCURR;
    }

    public String getStrFILENAME() {
        return strFILENAME;
    }

    public void setStrFILENAME(String strFILENAME) {
        this.strFILENAME = strFILENAME;
    }

    public String getStrFILENAMEORIG() {
        return strFILENAMEORIG;
    }

    public void setStrFILENAMEORIG(String strFILENAMEORIG) {
        this.strFILENAMEORIG = strFILENAMEORIG;
    }

    public String getStrA020TICKET() {
        return strA020TICKET;
    }

    public void setStrA020TICKET(String strA020TICKET) {
        this.strA020TICKET = strA020TICKET;
    }

    public String getStrA020CODOB1() {
        return strA020CODOB1;
    }

    public void setStrA020CODOB1(String strA020CODOB1) {
        this.strA020CODOB1 = strA020CODOB1;
    }

    public String getStrA020COMME1() {
        return strA020COMME1;
    }

    public void setStrA020COMME1(String strA020COMME1) {
        this.strA020COMME1 = strA020COMME1;
    }

    public String getStrA020CODOB2() {
        return strA020CODOB2;
    }

    public void setStrA020CODOB2(String strA020CODOB2) {
        this.strA020CODOB2 = strA020CODOB2;
    }

    public String getStrA020COMME2() {
        return strA020COMME2;
    }

    public void setStrA020COMME2(String strA020COMME2) {
        this.strA020COMME2 = strA020COMME2;
    }

    public String getStrA020CODOB3() {
        return strA020CODOB3;
    }

    public void setStrA020CODOB3(String strA020CODOB3) {
        this.strA020CODOB3 = strA020CODOB3;
    }

    public String getStrA020COMME3() {
        return strA020COMME3;
    }

    public void setStrA020COMME3(String strA020COMME3) {
        this.strA020COMME3 = strA020COMME3;
    }

    public String getStrA020CODOB4() {
        return strA020CODOB4;
    }

    public void setStrA020CODOB4(String strA020CODOB4) {
        this.strA020CODOB4 = strA020CODOB4;
    }

    public String getStrA020COMME4() {
        return strA020COMME4;
    }

    public void setStrA020COMME4(String strA020COMME4) {
        this.strA020COMME4 = strA020COMME4;
    }

    public String getStrA020CODOB5() {
        return strA020CODOB5;
    }

    public void setStrA020CODOB5(String strA020CODOB5) {
        this.strA020CODOB5 = strA020CODOB5;
    }

    public String getStrA020COMME5() {
        return strA020COMME5;
    }

    public void setStrA020COMME5(String strA020COMME5) {
        this.strA020COMME5 = strA020COMME5;
    }

    public String getStrA020COMME6() {
        return strA020COMME6;
    }

    public void setStrA020COMME6(String strA020COMME6) {
        this.strA020COMME6 = strA020COMME6;
    }

    public String getStrA020COMME7() {
        return strA020COMME7;
    }

    public void setStrA020COMME7(String strA020COMME7) {
        this.strA020COMME7 = strA020COMME7;
    }

    public String getStrA020COMME8() {
        return strA020COMME8;
    }

    public void setStrA020COMME8(String strA020COMME8) {
        this.strA020COMME8 = strA020COMME8;
    }

    public String getStrA020COMME9() {
        return strA020COMME9;
    }

    public void setStrA020COMME9(String strA020COMME9) {
        this.strA020COMME9 = strA020COMME9;
    }

    public String getStrA020COMME10() {
        return strA020COMME10;
    }

    public void setStrA020COMME10(String strA020COMME10) {
        this.strA020COMME10 = strA020COMME10;
    }

    public String getStrA020GRUPO() {
        return strA020GRUPO;
    }

    public void setStrA020GRUPO(String strA020GRUPO) {
        this.strA020GRUPO = strA020GRUPO;
    }

    public String getStrA020NROPRT() {
        return strA020NROPRT;
    }

    public void setStrA020NROPRT(String strA020NROPRT) {
        this.strA020NROPRT = strA020NROPRT;
    }

    public String getStrA020USER() {
        return strA020USER;
    }

    public void setStrA020USER(String strA020USER) {
        this.strA020USER = strA020USER;
    }

    public String getStrA020SDATE() {
        return strA020SDATE;
    }

    public void setStrA020SDATE(String strA020SDATE) {
        this.strA020SDATE = strA020SDATE;
    }

    public String getStrA020STIME() {
        return strA020STIME;
    }

    public void setStrA020STIME(String strA020STIME) {
        this.strA020STIME = strA020STIME;
    }

    public String getStrA020FRECHA() {
        return strA020FRECHA;
    }

    public void setStrA020FRECHA(String strA020FRECHA) {
        this.strA020FRECHA = strA020FRECHA;
    }

    public String getStrA020PSTRF() {
        return strA020PSTRF;
    }

    public void setStrA020PSTRF(String strA020PSTRF) {
        this.strA020PSTRF = strA020PSTRF;
    }

    public String getStrA020RMSN() {
        return strA020RMSN;
    }

    public void setStrA020RMSN(String strA020RMSN) {
        this.strA020RMSN = strA020RMSN;
    }

    public String getStrA020RMANT() {
        return strA020RMANT;
    }

    public void setStrA020RMANT(String strA020RMANT) {
        this.strA020RMANT = strA020RMANT;
    }

    public String getStrSEQPRT() {
        return strSEQPRT;
    }

    public void setStrSEQPRT(String strSEQPRT) {
        this.strSEQPRT = strSEQPRT;
    }

    public String getStrTUSO() {
        return strTUSO;
    }

    public void setStrTUSO(String strTUSO) {
        this.strTUSO = strTUSO;
    }

    public String getStrDCHEQ() {
        return strDCHEQ;
    }

    public void setStrDCHEQ(String strDCHEQ) {
        this.strDCHEQ = strDCHEQ;
    }

    public String getStrTVENTA() {
        return strTVENTA;
    }

    public void setStrTVENTA(String strTVENTA) {
        this.strTVENTA = strTVENTA;
    }

    public String getStrMONREG() {
        return strMONREG;
    }

    public void setStrMONREG(String strMONREG) {
        this.strMONREG = strMONREG;
    }

    public String getStrINDSAM() {
        return strINDSAM;
    }

    public void setStrINDSAM(String strINDSAM) {
        this.strINDSAM = strINDSAM;
    }

    public String getStrSELEC() {
        return strSELEC;
    }

    public void setStrSELEC(String strSELEC) {
        this.strSELEC = strSELEC;
    }

    public String getStrGRUPO() {
        return strGRUPO;
    }

    public void setStrGRUPO(String strGRUPO) {
        this.strGRUPO = strGRUPO;
    }

    public String getStrCOUVTA() {
        return strCOUVTA;
    }

    public void setStrCOUVTA(String strCOUVTA) {
        this.strCOUVTA = strCOUVTA;
    }

    public String getStrCOUEMI() {
        return strCOUEMI;
    }

    public void setStrCOUEMI(String strCOUEMI) {
        this.strCOUEMI = strCOUEMI;
    }

    public String getStrAJTRAM() {
        return strAJTRAM;
    }

    public void setStrAJTRAM(String strAJTRAM) {
        this.strAJTRAM = strAJTRAM;
    }

    public String getStrUser() {
        return strUser;
    }

    public void setStrUser(String strUser) {
        this.strUser = strUser;
    }

    public String getStrMSGERR() {
        return strMSGERR;
    }

    public void setStrMSGERR(String strMSGERR) {
        this.strMSGERR = strMSGERR;
    }

    public String getStrFUNC() {
        return strFUNC;
    }

    public void setStrFUNC(String strFUNC) {
        this.strFUNC = strFUNC;
    }

    public String getStrRUTAORIGENDESTINO() {
        return strRUTAORIGENDESTINO;
    }

    public void setStrRUTAORIGENDESTINO(String strRUTAORIGENDESTINO) {
        this.strRUTAORIGENDESTINO = strRUTAORIGENDESTINO;
    }

    public String getStrAdditionalInfo() {
        return strAdditionalInfo;
    }

    public void setStrAdditionalInfo(String strAdditionalInfo) {
        this.strAdditionalInfo = strAdditionalInfo;
    }

    public String getStrFlag() {
        return strFlag;
    }

    public void setStrFlag(String strFlag) {
        this.strFlag = strFlag;
    }

    public String getStrCHS() {
        return strCHS;
    }

    public void setStrCHS(String strCHS) {
        this.strCHS = strCHS;
    }

    public String getStrA020SUFECH() {
        return strA020SUFECH;
    }

    public void setStrA020SUFECH(String strA020SUFECH) {
        this.strA020SUFECH = strA020SUFECH;
    }

    public String getStrA020FUSO() {
        return strA020FUSO;
    }

    public void setStrA020FUSO(String strA020FUSO) {
        this.strA020FUSO = strA020FUSO;
    }

    public String getStrA020CODMOT() {
        return strA020CODMOT;
    }

    public void setStrA020CODMOT(String strA020CODMOT) {
        this.strA020CODMOT = strA020CODMOT;
    }

    public String getStrFTIMELIM() {
        return strFTIMELIM;
    }

    public void setStrFTIMELIM(String strFTIMELIM) {
        this.strFTIMELIM = strFTIMELIM;
    }

    public String getStrA021CONCEP01() {
        return strA021CONCEP01;
    }

    public void setStrA021CONCEP01(String strA021CONCEP01) {
        this.strA021CONCEP01 = strA021CONCEP01;
    }

    public String getStrA021CONCEP02() {
        return strA021CONCEP02;
    }

    public void setStrA021CONCEP02(String strA021CONCEP02) {
        this.strA021CONCEP02 = strA021CONCEP02;
    }

    public String getStrA021CONCEP03() {
        return strA021CONCEP03;
    }

    public void setStrA021CONCEP03(String strA021CONCEP03) {
        this.strA021CONCEP03 = strA021CONCEP03;
    }

    public String getStrA021CONCEP04() {
        return strA021CONCEP04;
    }

    public void setStrA021CONCEP04(String strA021CONCEP04) {
        this.strA021CONCEP04 = strA021CONCEP04;
    }

    public String getStrA021CONCEP05() {
        return strA021CONCEP05;
    }

    public void setStrA021CONCEP05(String strA021CONCEP05) {
        this.strA021CONCEP05 = strA021CONCEP05;
    }

    public String getStrA020CLASRM() {
        return strA020CLASRM;
    }

    public void setStrA020CLASRM(String strA020CLASRM) {
        this.strA020CLASRM = strA020CLASRM;
    }

    public String getStrA020BASE() {
        return strA020BASE;
    }

    public void setStrA020BASE(String strA020BASE) {
        this.strA020BASE = strA020BASE;
    }

    public String getStrA728CUPON() {
        return strA728CUPON;
    }

    public void setStrA728CUPON(String strA728CUPON) {
        this.strA728CUPON = strA728CUPON;
    }

    public String getStrCampoErrado() {
        return strCampoErrado;
    }

    public void setStrCampoErrado(String strCampoErrado) {
        this.strCampoErrado = strCampoErrado;
    }

    public String getStrA020MONEDA() {
        return strA020MONEDA;
    }

    public void setStrA020MONEDA(String strA020MONEDA) {
        this.strA020MONEDA = strA020MONEDA;
    }

    public String getStrA020MNRCD() {
        return strA020MNRCD;
    }

    public void setStrA020MNRCD(String strA020MNRCD) {
        this.strA020MNRCD = strA020MNRCD;
    }

    public String getStrETKTIND() {
        return strETKTIND;
    }

    public void setStrETKTIND(String strETKTIND) {
        this.strETKTIND = strETKTIND;
    }

    public String getStrA020DEBHAB() {
        return strA020DEBHAB;
    }

    public void setStrA020DEBHAB(String strA020DEBHAB) {
        this.strA020DEBHAB = strA020DEBHAB;
    }

    public String getStrA020QSEG() {
        return strA020QSEG;
    }

    public void setStrA020QSEG(String strA020QSEG) {
        this.strA020QSEG = strA020QSEG;
    }

    public String getStrProvisoAirName() {
        return strProvisoAirName;
    }

    public void setStrProvisoAirName(String strProvisoAirName) {
        this.strProvisoAirName = strProvisoAirName;
    }

    public String getStrProvisoAirCode() {
        return strProvisoAirCode;
    }

    public void setStrProvisoAirCode(String strProvisoAirCode) {
        this.strProvisoAirCode = strProvisoAirCode;
    }

    public String getStrCierreActual() {
        return strCierreActual;
    }

    public void setStrCierreActual(String strCierreActual) {
        this.strCierreActual = strCierreActual;
    }

    public String getStrRutaServletImg() {
        return strRutaServletImg;
    }

    public void setStrRutaServletImg(String strRutaServletImg) {
        this.strRutaServletImg = strRutaServletImg;
    }

    public String getStrScrollImg() {
        return strScrollImg;
    }

    public void setStrScrollImg(String strScrollImg) {
        this.strScrollImg = strScrollImg;
    }

    public String getStrA728RERUT() {
        return strA728RERUT;
    }

    public void setStrA728RERUT(String strA728RERUT) {
        this.strA728RERUT = strA728RERUT;
    }

    public double getDblATBP() {
        return dblATBP;
    }

    public void setDblATBP(double dblATBP) {
        this.dblATBP = dblATBP;
    }

    public double getDblFARE() {
        return dblFARE;
    }

    public void setDblFARE(double dblFARE) {
        this.dblFARE = dblFARE;
    }

    public double getDblEQVFARE() {
        return dblEQVFARE;
    }

    public void setDblEQVFARE(double dblEQVFARE) {
        this.dblEQVFARE = dblEQVFARE;
    }

    public double getDblSTOPOVERC() {
        return dblSTOPOVERC;
    }

    public void setDblSTOPOVERC(double dblSTOPOVERC) {
        this.dblSTOPOVERC = dblSTOPOVERC;
    }

    public double getDblPLUSSC() {
        return dblPLUSSC;
    }

    public void setDblPLUSSC(double dblPLUSSC) {
        this.dblPLUSSC = dblPLUSSC;
    }

    public double getDblROE() {
        return dblROE;
    }

    public void setDblROE(double dblROE) {
        this.dblROE = dblROE;
    }

    public double getDblDISCC() {
        return dblDISCC;
    }

    public void setDblDISCC(double dblDISCC) {
        this.dblDISCC = dblDISCC;
    }

    public double getDblNET() {
        return dblNET;
    }

    public void setDblNET(double dblNET) {
        this.dblNET = dblNET;
    }

    public double getDblA020SUDEBI() {
        return dblA020SUDEBI;
    }

    public void setDblA020SUDEBI(double dblA020SUDEBI) {
        this.dblA020SUDEBI = dblA020SUDEBI;
    }

    public double getDblA020IMPNAC() {
        return dblA020IMPNAC;
    }

    public void setDblA020IMPNAC(double dblA020IMPNAC) {
        this.dblA020IMPNAC = dblA020IMPNAC;
    }

    public double getDblA020TOTDEB() {
        return dblA020TOTDEB;
    }

    public void setDblA020TOTDEB(double dblA020TOTDEB) {
        this.dblA020TOTDEB = dblA020TOTDEB;
    }

    public double getDblA020ACEPTA() {
        return dblA020ACEPTA;
    }

    public void setDblA020ACEPTA(double dblA020ACEPTA) {
        this.dblA020ACEPTA = dblA020ACEPTA;
    }

    public double getDblA020IMPINT() {
        return dblA020IMPINT;
    }

    public void setDblA020IMPINT(double dblA020IMPINT) {
        this.dblA020IMPINT = dblA020IMPINT;
    }

    public double getDblA020TOTHAB() {
        return dblA020TOTHAB;
    }

    public void setDblA020TOTHAB(double dblA020TOTHAB) {
        this.dblA020TOTHAB = dblA020TOTHAB;
    }

    public double getDblA020REDEBI() {
        return dblA020REDEBI;
    }

    public void setDblA020REDEBI(double dblA020REDEBI) {
        this.dblA020REDEBI = dblA020REDEBI;
    }

    public double getDblA020COMISI() {
        return dblA020COMISI;
    }

    public void setDblA020COMISI(double dblA020COMISI) {
        this.dblA020COMISI = dblA020COMISI;
    }

    public double getDblA020TAX() {
        return dblA020TAX;
    }

    public void setDblA020TAX(double dblA020TAX) {
        this.dblA020TAX = dblA020TAX;
    }

    public double getDblA020ANALIZ() {
        return dblA020ANALIZ;
    }

    public void setDblA020ANALIZ(double dblA020ANALIZ) {
        this.dblA020ANALIZ = dblA020ANALIZ;
    }

    public double getDblA020COMISIP() {
        return dblA020COMISIP;
    }

    public void setDblA020COMISIP(double dblA020COMISIP) {
        this.dblA020COMISIP = dblA020COMISIP;
    }

    public double getDblA020NETO() {
        return dblA020NETO;
    }

    public void setDblA020NETO(double dblA020NETO) {
        this.dblA020NETO = dblA020NETO;
    }

    public double getDblTCAREG() {
        return dblTCAREG;
    }

    public void setDblTCAREG(double dblTCAREG) {
        this.dblTCAREG = dblTCAREG;
    }

    public double getDblTCASYS() {
        return dblTCASYS;
    }

    public void setDblTCASYS(double dblTCASYS) {
        this.dblTCASYS = dblTCASYS;
    }

    public double getDblTCAPAG() {
        return dblTCAPAG;
    }

    public void setDblTCAPAG(double dblTCAPAG) {
        this.dblTCAPAG = dblTCAPAG;
    }

    public double getDblVALMINIMOTARIFA() {
        return dblVALMINIMOTARIFA;
    }

    public void setDblVALMINIMOTARIFA(double dblVALMINIMOTARIFA) {
        this.dblVALMINIMOTARIFA = dblVALMINIMOTARIFA;
    }

    public double getDblVALMINIMOTAX() {
        return dblVALMINIMOTAX;
    }

    public void setDblVALMINIMOTAX(double dblVALMINIMOTAX) {
        this.dblVALMINIMOTAX = dblVALMINIMOTAX;
    }

    public double getDblA020TARIFA() {
        return dblA020TARIFA;
    }

    public void setDblA020TARIFA(double dblA020TARIFA) {
        this.dblA020TARIFA = dblA020TARIFA;
    }

    public double getDblA020FAREUS() {
        return dblA020FAREUS;
    }

    public void setDblA020FAREUS(double dblA020FAREUS) {
        this.dblA020FAREUS = dblA020FAREUS;
    }

    public int getIntINDPRT() {
        return intINDPRT;
    }

    public void setIntINDPRT(int intINDPRT) {
        this.intINDPRT = intINDPRT;
    }

    public int getIntSTOPOVERQ() {
        return intSTOPOVERQ;
    }

    public void setIntSTOPOVERQ(int intSTOPOVERQ) {
        this.intSTOPOVERQ = intSTOPOVERQ;
    }

    public boolean isTieneComision() {
        return tieneComision;
    }

    public void setTieneComision(boolean tieneComision) {
        this.tieneComision = tieneComision;
    }

    public boolean isValidarTiempoLimite() {
        return validarTiempoLimite;
    }

    public void setValidarTiempoLimite(boolean validarTiempoLimite) {
        this.validarTiempoLimite = validarTiempoLimite;
    }

    public boolean isEsEscogido() {
        return esEscogido;
    }

    public void setEsEscogido(boolean esEscogido) {
        this.esEscogido = esEscogido;
    }

    public List<ProrateSector> getSECTORS() {
        return SECTORS;
    }

    public void setSECTORS(List<ProrateSector> SECTORS) {
        this.SECTORS = SECTORS;
    }

    /**
     * @return the strA020TCALC
     */
    public String getStrA020TCALC() {
        return strA020TCALC;
    }

    /**
     * @param strA020TCALC the strA020TCALC to set
     */
    public void setStrA020TCALC(String strA020TCALC) {
        this.strA020TCALC = strA020TCALC;
    }

    /**
     * @return the resultado
     */
    public boolean isResultado() {
        return resultado;
    }

    /**
     * @param resultado the resultado to set
     */
    public void setResultado(boolean resultado) {
        this.resultado = resultado;
    }

    /**
     * @return the strA020TIPORM
     */
    public String getStrA020TIPORM() {
        return strA020TIPORM;
    }

    /**
     * @param strA020TIPORM the strA020TIPORM to set
     */
    public void setStrA020TIPORM(String strA020TIPORM) {
        this.strA020TIPORM = strA020TIPORM;
    }

    public String getStrNumeroRechazo() {
        return strNumeroRechazo;
    }

    public void setStrNumeroRechazo(String strNumeroRechazo) {
        this.strNumeroRechazo = strNumeroRechazo;
    }

    public String[] getListaOtrasRutas() {
        return listaOtrasRutas;
    }

    public void setListaOtrasRutas(String[] listaOtrasRutas) {
        this.listaOtrasRutas = listaOtrasRutas;
    }

    public String getStrA020SUFACT() {
        return strA020SUFACT;
    }

    public void setStrA020SUFACT(String strA020SUFACT) {
        this.strA020SUFACT = strA020SUFACT;
    }

    public String getStrTextBoxErr() {
        return strTextBoxErr;
    }

    public void setStrTextBoxErr(String strTextBoxErr) {
        this.strTextBoxErr = strTextBoxErr;
    }

    public RECA729List getLstTaxes() {
        return lstTaxes;
    }

    public void setLstTaxes(RECA729List lstTaxes) {
        this.lstTaxes = lstTaxes;
    }

    /**
     * @return the dblA020BOTCPR
     */
    public double getDblA020BOTCPR() {
        return dblA020BOTCPR;
    }

    /**
     * @param dblA020BOTCPR the dblA020BOTCPR to set
     */
    public void setDblA020BOTCPR(double dblA020BOTCPR) {
        this.dblA020BOTCPR = dblA020BOTCPR;
    }

    /**
     * @return the dblA020BOTCRM
     */
    public double getDblA020BOTCRM() {
        return dblA020BOTCRM;
    }

    /**
     * @param dblA020BOTCRM the dblA020BOTCRM to set
     */
    public void setDblA020BOTCRM(double dblA020BOTCRM) {
        this.dblA020BOTCRM = dblA020BOTCRM;
    }

    /**
     * @return the dblA020AOTCPM
     */
    public double getDblA020AOTCPM() {
        return dblA020AOTCPM;
    }

    /**
     * @param dblA020AOTCPM the dblA020AOTCPM to set
     */
    public void setDblA020AOTCPM(double dblA020AOTCPM) {
        this.dblA020AOTCPM = dblA020AOTCPM;
    }

    /**
     * @return the dblA020AOTCRM
     */
    public double getDblA020AOTCRM() {
        return dblA020AOTCRM;
    }

    /**
     * @param dblA020AOTCRM the dblA020AOTCRM to set
     */
    public void setDblA020AOTCRM(double dblA020AOTCRM) {
        this.dblA020AOTCRM = dblA020AOTCRM;
    }

    /**
     * @return the dblA020DOTCRM
     */
    public double getDblA020DOTCRM() {
        return dblA020DOTCRM;
    }

    /**
     * @param dblA020DOTCRM the dblA020DOTCRM to set
     */
    public void setDblA020DOTCRM(double dblA020DOTCRM) {
        this.dblA020DOTCRM = dblA020DOTCRM;
    }
}
