/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.beans.lists.ProrateSectorList;
import net.miatech.utils.Functions;




/**
 *
 * @author claudia
 */
public class PRO9629 implements Serializable {

    private String strCCUST;
    private String strA728AIRLIN;
    private String strA728NROPRT;
    private String strA728SEQPRT;
    private String strA728TUSO;
    private String strA728CIA;
    private String strA728NRODOC;
    private String strA728CUPON;
    private String strA728DCHEQ;
    private String strA728TVENTA;
    private String strA728CODIT;
    private String strA728FECVTA;
    private String strA728FECFAC;
    private double dblA728PORDES;
    private String strA728RUTORG;
    private String strA728TDESC;
    private double dblA728TCAREG;
    private String strA728MONREG;
    private double dblA728TCASYS;
    private String strA728MONSYS;
    private String strA728MONEDA;
    private double dblA728TARIFA;
    private String strA728MDAPAG;
    private double dblA728TRFPAG;
    private double dblA728TCAPAG;
    private double dblA728ATBP;
    private String strA728MDAATB;
    private double dblA728ROE;
    private double dblA728CPLUSS;
    private double dblA728CSOVER;
    private String strA728QSOVER;
    private double dblA728TAJUST;
    private String strA728FBASE;
    private String strA728LOHO;
    private String strA728AIRFAC;
    private String strA728INDSAM;
    private String strA728INDPRT;
    private String strA728IPLUS;
    private String strA728SECOR;
    private String strA728SECDS;
    private String strA728SELEC;
    private String strA728FVLO1;
    private String strFUNC;
    private String strA728RERUT;
    private String strDSCR;
    private String strFTIMELIM;
    private String strMSG;
    private String strUSER;
    private String strA728CODTAX;
    private String strA728GRUPO;
    private String strA728CTYVTA;
    private String strA728COUVTA;
    private String strA728CTYEMI;
    private String strA728COUEMI;
    private String strA728AJTRAM;     
    private ProrateSectorList lstSECTORS;   
    private String strMSGERR;
    private String strA728FBASE1;
    private String strTextBoxErr;
    private boolean booValidarTiempoLimite;
    private String strAdditionalInfo;
    private String strAirlineName;
    private String strAirlineAlfaCode;
    private String strCHS;

    public PRO9629() {

        strCCUST = "";
        strA728AIRLIN = "";
        strA728NROPRT = "";
        strA728SEQPRT = "";
        strA728TUSO = "";
        strA728CIA = "";
        strA728NRODOC = "";
        strA728CUPON = "";
        strA728DCHEQ = "";
        strA728TVENTA = "";
        strA728CODIT = "";
        strA728FECVTA = "";
        strA728FECFAC = "";
        dblA728PORDES = 0;
        strA728RUTORG = "";
        strA728TDESC = "";
        dblA728TCAREG = 0;
        strA728MONREG = "";
        dblA728TCASYS = 0;
        strA728MONSYS = "";
        strA728MONEDA = "";
        dblA728TARIFA = 0;
        strA728MDAPAG = "";
        dblA728TRFPAG = 0;
        dblA728TCAPAG = 0;
        dblA728ATBP = 0;
        strA728MDAATB = "";
        dblA728ROE = 0;
        dblA728CPLUSS = 0;
        dblA728CSOVER = 0;
        strA728QSOVER = "";
        dblA728TAJUST = 0;
        strA728FBASE = "";
        strA728LOHO = "";
        strA728AIRFAC = "";
        strA728INDSAM = "";
        strA728INDPRT = "";
        strA728IPLUS = "";
        strA728SECOR = "";
        strA728SECDS = "";
        strA728SELEC = "";
        strA728FVLO1 = "";
        strFUNC = "";
        strA728RERUT = "";
        strDSCR = "";
        strFTIMELIM = "";
        strMSG = "";
        strUSER = "";
        strA728CODTAX = "";
        strA728GRUPO = "";
        strA728CTYVTA = "";
        strA728COUVTA = "";
        strA728CTYEMI = "";
        strA728COUEMI = "";
        strA728AJTRAM = "";
        strMSGERR = "";
        strA728FBASE1 = "";
        strTextBoxErr = "";
        booValidarTiempoLimite = true;
        strAdditionalInfo = "";
        strAirlineName = "";
        strAirlineAlfaCode = "";
        strCHS = "";

    }

    // ======================= PROCEDIMIENTOS ==================================
    
    public String toString(String strAIRLIN) {
        
        StringBuffer strValue = new StringBuffer("");
        String strTemp = "";
        ProrateSector sector = null;
        //05 A728AIRLIN       PIC X(03).
        strValue.append(strAIRLIN);
        //05 A728NROPRT       PIC 9(09).
        strValue.append(Functions.fillZeros(9, this.strA728NROPRT));
        //05 A728SEQPRT       PIC 9(02).
        strValue.append(Functions.fillZeros(2, this.strA728SEQPRT));
        //05 A728TUSO         PIC X(02).
        strValue.append(Functions.fillZeros(2, this.strA728TUSO));
        //05 A728CIA          PIC X(03).
        strValue.append(this.strA728CIA);
        //05 A728NRODOC       PIC X(10).
        strValue.append(this.strA728NRODOC);
        //05 A728CUPON        PIC X(01).
        strValue.append(this.strA728CUPON);
        //05 A728DCHEQ        PIC X(01).
        strValue.append(Functions.fillString(this.strA728DCHEQ, 1));
        //05 A728TVENTA       PIC X(01).
        strValue.append(Functions.fillString(this.strA728TVENTA, 1));
        //05 A728CODIT        PIC X(20).
        strValue.append(Functions.fillString(this.strA728CODIT, 20));
        //05 A728FECVTA       PIC X(08).
        strValue.append(Functions.fillString(this.strA728FECVTA, 8));
        //05 A728FECFAC       PIC X(08).
        strValue.append(Functions.fillString(this.strA728FECFAC, 8));
        //05 A728PORDES       PIC 9(03)V99.
        strValue.append(Functions.fillZeros(5, String.valueOf(Math.round(this.dblA728PORDES*100))));
        //05 A728RUTORG       PIC X(03).
        strValue.append(Functions.fillString(this.strA728RUTORG, 3));
        //05 A728TDESC        PIC X(02).
        strValue.append(Functions.fillString(this.strA728TDESC, 2));
        //05 A728TCAREG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblA728TCAREG*1000000))));
        //05 A728MONREG       PIC X(03).
        strValue.append(Functions.fillString(this.strA728MONREG, 3));
        //05 A728TCASYS       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblA728TCASYS*1000000))));
        //05 A728MONSYS       PIC X(03).
        strValue.append(Functions.fillString(this.strA728MONSYS, 3));
        //05 A728MONEDA       PIC X(03).
        strValue.append(Functions.fillString(this.strA728MONEDA, 3));
        //05 A728TARIFA       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblA728TARIFA*100))));
        //05 A728MDAPAG       PIC X(03).
        strValue.append(Functions.fillString(this.strA728MDAPAG, 3));
        //05 A728TRFPAG       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblA728TRFPAG*100))));
        //05 A728TCAPAG       PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblA728TCAPAG*1000000))));
        //05 A728ATBP         PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblA728ATBP*100))));
        //05 A728MDAATB       PIC X(03).
        strValue.append(Functions.fillString(this.strA728MDAATB, 3));
        //05 A728ROE          PIC 9(10)V9(6).
        strValue.append(Functions.fillZeros(16, String.valueOf(Math.round(this.dblA728ROE*1000000))));
        //05 A728CPLUSS       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblA728CPLUSS*100))));
        //05 A728CSOVER       PIC 9(11)V99.
        strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblA728CSOVER*100))));
        //05 A728QSOVER       PIC 9(02).
        strValue.append(Functions.fillZeros(2, this.strA728QSOVER));
        //05 A728TAJUST       PIC 9(11)V99.
        
        if(Functions.fillZeros(13, String.valueOf(Math.round(this.dblA728TAJUST*100))).indexOf("-") < 0) {
            strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(this.dblA728TAJUST*100))));
        }else{
            strValue.append("-").append(Functions.fillZeros(12, String.valueOf(Math.round(this.dblA728TAJUST*100)).replace('-',' ').trim()));
        }       
        //05 A728FBASE        PIC X(10).
        strValue.append(Functions.fillString(this.strA728FBASE, 10));
        //05 A728LOHO         PIC X(3).
        strValue.append(Functions.fillString(this.strA728LOHO, 3));
        //05 A728AIRFAC       PIC X(3).
        strValue.append(this.strA728AIRFAC);
        //05 A728INDSAM       PIC X(1).
        strValue.append(Functions.fillString(this.strA728INDSAM, 1));
        //05 A728INDPRT       PIC 9(2).
        strValue.append(Functions.fillZeros(2, this.strA728INDPRT));
        //05 A728IPLUS        PIC X(1).
        strValue.append(Functions.fillString(this.strA728IPLUS, 1));
        //05 A728SECOR        PIC X(3).
        strValue.append(Functions.fillString(this.strA728SECOR, 3));
        //05 A728SECDS        PIC X(3).
        strValue.append(Functions.fillString(this.strA728SECDS, 3));
        //05 A728SELEC        PIC X(8).
        strValue.append(Functions.fillString(this.strA728SELEC, 8));
        //05 A728FVLO1        PIC X(8).
        strValue.append(Functions.fillString(this.strA728FVLO1, 8));
        //05 FUNC         PIC X(10).
        strValue.append(Functions.fillString(this.strFUNC, 10));
        
        for(int i=0;i<lstSECTORS.size();i++) {
            sector = lstSECTORS.getProrateSector(i);
            if(i!=0) {
                //06 IDENTI       PIC X(2).
                //06 NUMERO       PIC X(2).
                strValue.append("**");
                strValue.append(Functions.fillZeros(2, String.valueOf(i-1)));
                //06 XO       PIC X.
                strValue.append(Functions.fillString(sector.getStrXO(), 1));
                //06 RUTAO     PIC X(03).
                if(!Functions.fillString(sector.getStrCARR(), 2).equals("") &&
                        !Functions.fillString(sector.getStrCARR(), 2).equals("..")) {
                    strValue.append(Functions.fillString(strTemp, 3));
                }else{
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
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblXFARE()*100))));
                //06 TFARE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrTFARE(), 1));
                //06 DIFER1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblDIFER()*100))));
                //06 FDIFE1    PIC X(01).
                strValue.append(Functions.fillString(sector.getStrFDIFE(), 1));
                //06 TRFM1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblTRFM()*100))));
                //06 MNTFM1    PIC X(03).
                strValue.append(Functions.fillString(sector.getStrMNTFM(), 3));
                //06 SS1       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSURCHARGE()*100))));
                //06 PLUSS1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPLUSS()*100))));
                //06 STOP1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSTOP()*100))));
                //06 MNACU1    PIC X(03).
                strValue.append(Functions.fillString(sector.getStrMNACU().replaceAll(".", ""), 3));
                //06 ACUE1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblACUE()*100))));
                //06 FACT1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getLngFACTOR()*100))));
                //06 TARI1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblFARE()*100))));
                //06 YANQ1     PIC 9(13)V99. //********************************************************
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblYANQ()*100))));
                //06 PPRO1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPROVISOP()*100))));
                //06 SUBPA1    PIC X(20).
                strValue.append(Functions.fillString(sector.getStrSUBPA(), 20));
                //06 PROV1     PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblPROVISOC()*100))));
                //06 ACUEO1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSPA()*100))));
                //06 ACUCO1    PIC X(20).
                strValue.append(Functions.fillString(sector.getStrACUCO(), 20));
                //06 AJUST1    PIC 9(13)V99.               
                if(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblADJUST()*100))).indexOf("-") < 0) {
                    strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblADJUST()*100))));
                }else{
                    strValue.append("-" + Functions.fillZeros(14, String.valueOf(Math.round(sector.getDblADJUST()*100)).replace('-',' ').trim()));
                }
                //06 VALOR1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblAMOUNT()*100))));
                //06 SPA       PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblSPA()*100))));
                //06 VLMPA1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblVLMPA()*100))));
                //06 VLSRP1    PIC 9(13)V99.
                strValue.append(Functions.fillZeros(15, String.valueOf(Math.round(sector.getDblVLSRP()*100))));
                //06 INDPR1    PIC X.
                strValue.append(Functions.fillString(sector.getStrINDPR(), 1));
                //06 INDISC    PIC X(1).
                strValue.append(Functions.fillString(sector.getStrINDISC(), 1));
                //06 ISC       PIC 9(7)V99.
                strValue.append(Functions.fillZeros(9, String.valueOf(Math.round(sector.getDblISC()*100))));
                //06 COEFIC    PIC 9(8)V9(5).
                strValue.append(Functions.fillZeros(13, String.valueOf(Math.round(sector.getDblCOEFIC()*100000))));
                //06 ACUBAS    PIC X(4).
                strValue.append(Functions.fillString(sector.getStrACUBAS(), 4));
                //06 ACUSTS    PIC X(1).
                strValue.append(Functions.fillString(sector.getStrACUSTS(), 1));
                //06 PRVSTS    PIC X(2).
                strValue.append(Functions.fillString(sector.getStrPRVSTS(), 2));
            }
            strTemp = sector.getStrOD();
        }
        
        for(int i=lstSECTORS.size();i<51;i++) {
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
        
        //05 A728RERUT    PIC X(01).
        try {
            if (this.lstSECTORS != null && this.lstSECTORS.size() > 0) {
                strValue.append(Functions.fillString(this.lstSECTORS.getProrateSector(0).getStrA728RERUT().trim().toUpperCase(), 1));
            } else {
                strValue.append(Functions.fillString("", 1));
            }
        } catch (Exception e) {
            strValue.append(Functions.fillString("", 1));
        }    
        //05 DSCR         PIC X(28).
        strValue.append(Functions.fillString("", 27));
        //05 FTIMELIM     PIC X(01).
        strValue.append(Functions.fillString(this.strFTIMELIM, 1));
        //05 MSG          PIC X(40).
        strValue.append(Functions.fillString("", 40));
        //05 USER         PIC X(10).
        strValue.append(Functions.fillString(this.strUSER, 10));
        //05 A728CODTAX   PIC X(10).
        strValue.append(Functions.fillString(this.strA728CODTAX, 10));
        //05 A728GRUPO    PIC X(06).
        strValue.append(Functions.fillString(this.strA728GRUPO, 6));
        //05 A728CTYVTA   PIC X(03).
        strValue.append(Functions.fillString(this.strA728CTYVTA, 3));
        //05 A728COUVTA   PIC X(02).
        strValue.append(Functions.fillString(this.strA728COUVTA, 2));
        //05 A728CTYEMI   PIC X(03).
        strValue.append(Functions.fillString(this.strA728CTYEMI, 3));
        //05 A728COUEMI   PIC X(02).
        strValue.append(Functions.fillString(this.strA728COUEMI, 2));
        //05 A728AJTRAM   PIC X(01).
        strValue.append(Functions.fillString(this.strA728AJTRAM, 1));
        
        return String.valueOf(strValue).toUpperCase();
    }
    
    public void loadData(String strData, String calfa) {
        
        try {
            
            ProrateSector sector = null;
            //05 A728NROPRT       PIC 9(09).
            this.strA728NROPRT = strData.substring(3,12);
            //05 A728SEQPRT       PIC 9(02).
            this.strA728SEQPRT = strData.substring(12,14);
            //05 A728TUSO         PIC X(02).
            this.strA728TUSO = strData.substring(14,16);
            //05 A728CIA          PIC X(03).
            this.strA728CIA = strData.substring(16,19);
            //05 A728NRODOC       PIC X(10).
            this.strA728NRODOC = strData.substring(19,29);
            //05 A728CUPON        PIC X(01).
            this.strA728CUPON = strData.substring(29,30);
            //05 A728DCHEQ        PIC X(01).
            this.strA728DCHEQ = strData.substring(30,31);
            //05 A728TVENTA       PIC X(01).
            this.strA728TVENTA = strData.substring(31,32);
            //05 A728CODIT        PIC X(20).
            this.strA728CODIT = strData.substring(32,52).trim();
            //05 A728FECVTA       PIC X(08).
            this.strA728FECVTA = strData.substring(52,60);
            //05 A728FECFAC       PIC X(08).
            this.strA728FECFAC = strData.substring(60,68);
            //05 A728PORDES       PIC 9(03)V99.
            this.dblA728PORDES = Double.parseDouble(strData.substring(68,73))/100;
            //05 A728RUTORG       PIC X(03).
            this.strA728RUTORG = strData.substring(73,76);
            //05 A728TDESC        PIC X(02).
            this.strA728TDESC = strData.substring(76,78);
            //05 A728TCAREG       PIC 9(10)V9(6).
            this.dblA728TCAREG = Double.parseDouble(strData.substring(78,94))/1000000;
            //05 A728MONREG       PIC X(03).
            this.strA728MONREG = strData.substring(94,97);
            //05 A728TCASYS       PIC 9(10)V9(6).
            this.dblA728TCASYS = Double.parseDouble(strData.substring(97,113))/1000000;
            //05 A728MONSYS       PIC X(03).
            this.strA728MONSYS = strData.substring(113,116);
            //05 A728MONEDA       PIC X(03).
            this.strA728MONEDA = strData.substring(116,119);
            //05 A728TARIFA       PIC 9(11)V99.
            this.dblA728TARIFA = Double.parseDouble(strData.substring(119,132))/100;
            //05 A728MDAPAG       PIC X(03).
            this.strA728MDAPAG = strData.substring(132,135);
            //05 A728TRFPAG       PIC 9(11)V99.
            this.dblA728TRFPAG = Double.parseDouble(strData.substring(135,148))/100;
            //05 A728TCAPAG       PIC 9(10)V9(6).
            this.dblA728TCAPAG = Double.parseDouble(strData.substring(148,164))/1000000;
            //05 A728ATBP         PIC 9(11)V99.
            this.dblA728ATBP = Double.parseDouble(strData.substring(164,177))/100;
            //05 A728MDAATB       PIC X(03).
            this.strA728MDAATB = strData.substring(177,180);
            //05 A728ROE          PIC 9(10)V9(6).
            this.dblA728ROE = Double.parseDouble(strData.substring(180,196))/1000000;
            //05 A728CPLUSS       PIC 9(11)V99.
            this.dblA728CPLUSS = Double.parseDouble(strData.substring(196,209))/100;
            //05 A728CSOVER       PIC 9(11)V99.
            this.dblA728CSOVER = Double.parseDouble(strData.substring(209,222))/100;
            //05 A728QSOVER       PIC 9(02).
            this.strA728QSOVER = strData.substring(222,224);
            try {
                //05 A728TAJUST       PIC 9(11)V99.
                if (Functions.deleteZerosLeft(strData.substring(224, 237)).indexOf("-") < 0) {
                    this.dblA728TAJUST = Double.parseDouble(Functions.deleteZerosLeft(strData.substring(224, 237))) / 100;
                } else {
                    this.dblA728TAJUST = (-1) * (Double.parseDouble(Functions.deleteZerosLeft(strData.substring(224, 237)).replaceAll("-", "")) / 100);
                }
            } catch (Exception e) {
                this.dblA728TAJUST = 0;
            }
            
            //05 A728FBASE        PIC X(10).
            this.strA728FBASE = strData.substring(237,247).trim();
            //05 A728LOHO         PIC X(03).
            this.strA728LOHO = strData.substring(247,250).trim();
            //05 A728AIRFAC       PIC X(03).
            this.strA728AIRFAC = strData.substring(250,253);
            //05 A728INDSAM       PIC X(01).
            this.strA728INDSAM = strData.substring(253,254);
            //05 A728INDPRT       PIC 9(02).
            this.strA728INDPRT = strData.substring(254,256);
            //05 A728IPLUS        PIC X(01).
            this.strA728IPLUS = strData.substring(256,257);
            //05 A728SECOR        PIC X(03).
            this.strA728SECOR = strData.substring(257,260);
            //05 A728SECDS        PIC X(03).
            this.strA728SECDS = strData.substring(260,263);
            //05 A728SELEC        PIC X(08).
            this.strA728SELEC = strData.substring(263,271);
            //05 A728FVLO1        PIC X(08).
            this.strA728FVLO1 = strData.substring(271,279);
            
            lstSECTORS.clear();
            int itemp = 0;
            for(int i=0;i<50;i++) {
                itemp = (i-1)*398;
                if(i==0) {
                    
                    sector = new ProrateSector();
                    //06 RUTAO     PIC X(03).
                    sector.setStrOD(strData.substring(294,297));
                    sector.setStrEsSector("");
                    lstSECTORS.add(sector);
                    
                }else{
                    
                    if(!strData.substring(itemp + 305, itemp + 307).trim().equals("")) {
                        sector = new ProrateSector();
                        //06 XO       PIC X.
                        sector.setStrXO(strData.substring(itemp + 293, itemp + 294));
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
                        sector.setDblXFARE(Double.parseDouble(strData.substring(itemp + 338, itemp + 353))/100);
                        //06 TFARE1    PIC X(01).
                        sector.setStrTFARE(strData.substring(itemp + 353, itemp + 354));
                        //06 DIFER1    PIC 9(13)V99.
                        sector.setDblDIFER(Double.parseDouble(strData.substring(itemp + 354, itemp + 369))/100);
                        //06 FDIFE1    PIC X(01).
                        sector.setStrFDIFE(strData.substring(itemp + 369, itemp + 370));
                        //06 TRFM1     PIC 9(13)V99.
                        sector.setDblTRFM(Double.parseDouble(strData.substring(itemp + 370, itemp + 385))/100);
                        //06 MNTFM1    PIC X(03).
                        sector.setStrMNTFM(strData.substring(itemp + 385, itemp + 388));
                        //06 SS1       PIC 9(13)V99.
                        sector.setDblSURCHARGE(Double.parseDouble(strData.substring(itemp + 388, itemp + 403))/100);
                        //06 PLUSS1    PIC 9(13)V99.
                        sector.setDblPLUSS(Double.parseDouble(strData.substring(itemp + 403, itemp + 418))/100);
                        //06 STOP1     PIC 9(13)V99.
                        sector.setDblSTOP(Double.parseDouble(strData.substring(itemp + 418, itemp + 433))/100);
                        //06 MNACU1    PIC X(03).
                        sector.setStrMNACU(strData.substring(itemp + 433, itemp + 436));
                        //06 ACUE1     PIC 9(13)V99.
                        sector.setDblACUE(Double.parseDouble(strData.substring(itemp + 436, itemp + 451))/100);
                        //06 FACT1     PIC 9(13)V99.
                        sector.setLngFACTOR(Long.parseLong(strData.substring(itemp + 451, itemp + 466))/100);
                        //06 TARI1     PIC 9(13)V99.
                        sector.setDblFARE(Double.parseDouble(strData.substring(itemp + 466, itemp + 481))/100);
                        //06 YANQ1     PIC 9(13)V99.
                        sector.setDblYANQ(Double.parseDouble(strData.substring(itemp + 481, itemp + 496))/100);
                        //06 PPRO1     PIC 9(13)V99.
                        sector.setDblPROVISOP(Double.parseDouble(strData.substring(itemp + 496, itemp + 511))/100);
                        //06 SUBPA1    PIC X(20).
                        sector.setStrSUBPA(strData.substring(itemp + 511, itemp + 531));
                        //06 PROV1     PIC 9(13)V99.
                        sector.setDblPROVISOC(Double.parseDouble(strData.substring(itemp + 531, itemp + 546))/100);
                        //06 ACUEO1    PIC 9(13)V99.
                        sector.setDblSPA(Double.parseDouble(strData.substring(itemp + 546, itemp + 561))/100);
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
                        sector.setDblAMOUNT(Double.parseDouble(strData.substring(itemp + 596, itemp + 611))/100);
                        //06 VLMPA1    PIC 9(13)V99.
                        sector.setDblVLMPA(Double.parseDouble(strData.substring(itemp + 626, itemp + 641))/100);
                        //06 VLSRP1    PIC 9(13)V99.
                        sector.setDblVLSRP(Double.parseDouble(strData.substring(itemp + 641, itemp + 656))/100);
                        //06 INDPR1    PIC X.
                        sector.setStrINDPR(strData.substring(itemp + 656, itemp + 657));
                        
                        if(sector.getStrINDPR().equals("S")) {
                            sector.setStrAMTV("SRP");
                        }else if(sector.getStrINDPR().equals("A")) {
                            sector.setStrAMTV("SPA");
                        }else if(sector.getStrINDPR().equals("M") || sector.getStrINDPR().equals("P")) {
                            sector.setStrAMTV("MPA");
                        }else if(sector.getStrINDPR().equals("R")) {
                            sector.setStrAMTV("RTW");
                        }else if(sector.getStrINDPR().equals("H")) {
                            sector.setStrAMTV("ACH");
                        }else{
                            sector.setStrAMTV("");
                        }
                        
                        //06 INDISC    PIC X(1).
                        sector.setStrINDISC(strData.substring(itemp + 657, itemp + 658));
                        //06 ISC       PIC 9(7)V99.
                        sector.setDblISC(Double.parseDouble(strData.substring(itemp + 658, itemp + 667))/100);
                        //06 COEFIC    PIC 9(8)V9(5).
                        sector.setDblCOEFIC(Double.parseDouble(strData.substring(itemp + 667, itemp + 680))/100000);
                        //06 ACUBAS    PIC X(4).
                        sector.setStrACUBAS(strData.substring(itemp + 680, itemp + 684));
                        //06 ACUSTS    PIC X(1).
                        sector.setStrACUSTS(strData.substring(itemp + 684, itemp + 685));
                        //06 PRVSTS    PIC X(2).
                        sector.setStrPRVSTS(strData.substring(itemp + 685, itemp + 687));
                        //05 A728RERUT    PIC X(01).
                        sector.setStrA728RERUT(strData.substring(20189, 20190));
                        
                        if (lstSECTORS.getProrateSector(lstSECTORS.size() - 1).getStrOD().trim().equals(this.strA728SECOR.trim()) &&
                                sector.getStrOD().trim().equals(this.strA728SECDS.trim())) {
                            lstSECTORS.getProrateSector(lstSECTORS.size() - 1).setStrEsSector("solo");
                            sector.setStrEsSector("todo");
                        } else {
                            sector.setStrEsSector("");
                        }
                        
                        lstSECTORS.add(sector);
                    }else{
                        i = 51;
                    }
                }
            }
            
            //05 MSG          PIC X(40).
            this.strMSGERR = strData.substring(20218, 20258).trim();
            //05 USER         PIC X(10). 
            //05 A728CODTAX   PIC X(10).
            this.strA728CODTAX = strData.substring(20268, 20278).trim();
            //05 A728GRUPO    PIC X(06).
            this.strA728GRUPO = strData.substring(20278, 20284);
            //05 A728CTYVTA   PIC X(03).
            this.strA728CTYVTA = strData.substring(20284, 20287);
            //05 A728COUVTA   PIC X(02).
            this.strA728COUVTA = strData.substring(20287, 20289);
            //05 A728CTYEMI   PIC X(03).
            this.strA728CTYEMI = strData.substring(20289, 20292);
            //05 A728COUEMI   PIC X(02).
            this.strA728COUEMI = strData.substring(20292, 20294);
            //05 A728AJTRAM   PIC X(01).
            this.strA728AJTRAM = strData.substring(20294, 20295);
            
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    // =========================================================================
    
    public String getStrA728AIRLIN() {
        return strA728AIRLIN;
    }

    public void setStrA728AIRLIN(String strA728AIRLIN) {
        this.strA728AIRLIN = strA728AIRLIN;
    }

    public String getStrA728NROPRT() {
        return strA728NROPRT;
    }

    public void setStrA728NROPRT(String strA728NROPRT) {
        this.strA728NROPRT = strA728NROPRT;
    }

    public String getStrA728SEQPRT() {
        return strA728SEQPRT;
    }

    public void setStrA728SEQPRT(String strA728SEQPRT) {
        this.strA728SEQPRT = strA728SEQPRT;
    }

    public String getStrA728TUSO() {
        return strA728TUSO;
    }

    public void setStrA728TUSO(String strA728TUSO) {
        this.strA728TUSO = strA728TUSO;
    }

    public String getStrA728CIA() {
        return strA728CIA;
    }

    public void setStrA728CIA(String strA728CIA) {
        this.strA728CIA = strA728CIA;
    }

    public String getStrA728NRODOC() {
        return strA728NRODOC;
    }

    public void setStrA728NRODOC(String strA728NRODOC) {
        this.strA728NRODOC = strA728NRODOC;
    }

    public String getStrA728CUPON() {
        return strA728CUPON;
    }

    public void setStrA728CUPON(String strA728CUPON) {
        this.strA728CUPON = strA728CUPON;
    }

    public String getStrA728DCHEQ() {
        return strA728DCHEQ;
    }

    public void setStrA728DCHEQ(String strA728DCHEQ) {
        this.strA728DCHEQ = strA728DCHEQ;
    }

    public String getStrA728TVENTA() {
        return strA728TVENTA;
    }

    public void setStrA728TVENTA(String strA728TVENTA) {
        this.strA728TVENTA = strA728TVENTA;
    }

    public String getStrA728CODIT() {
        return strA728CODIT;
    }

    public void setStrA728CODIT(String strA728CODIT) {
        this.strA728CODIT = strA728CODIT;
    }

    public String getStrA728FECVTA() {
        return strA728FECVTA;
    }

    public void setStrA728FECVTA(String strA728FECVTA) {
        this.strA728FECVTA = strA728FECVTA;
    }

    public String getStrA728FECFAC() {
        return strA728FECFAC;
    }

    public void setStrA728FECFAC(String strA728FECFAC) {
        this.strA728FECFAC = strA728FECFAC;
    }

    public double getDblA728PORDES() {
        return dblA728PORDES;
    }

    public void setDblA728PORDES(double dblA728PORDES) {
        this.dblA728PORDES = dblA728PORDES;
    }

    public String getStrA728RUTORG() {
        return strA728RUTORG;
    }

    public void setStrA728RUTORG(String strA728RUTORG) {
        this.strA728RUTORG = strA728RUTORG;
    }

    public String getStrA728TDESC() {
        return strA728TDESC;
    }

    public void setStrA728TDESC(String strA728TDESC) {
        this.strA728TDESC = strA728TDESC;
    }

    public double getDblA728TCAREG() {
        return dblA728TCAREG;
    }

    public void setDblA728TCAREG(double dblA728TCAREG) {
        this.dblA728TCAREG = dblA728TCAREG;
    }

    public String getStrA728MONREG() {
        return strA728MONREG;
    }

    public void setStrA728MONREG(String strA728MONREG) {
        this.strA728MONREG = strA728MONREG;
    }

    public double getDblA728TCASYS() {
        return dblA728TCASYS;
    }

    public void setDblA728TCASYS(double dblA728TCASYS) {
        this.dblA728TCASYS = dblA728TCASYS;
    }

    public String getStrA728MONSYS() {
        return strA728MONSYS;
    }

    public void setStrA728MONSYS(String strA728MONSYS) {
        this.strA728MONSYS = strA728MONSYS;
    }

    public String getStrA728MONEDA() {
        return strA728MONEDA;
    }

    public void setStrA728MONEDA(String strA728MONEDA) {
        this.strA728MONEDA = strA728MONEDA;
    }

    public double getDblA728TARIFA() {
        return dblA728TARIFA;
    }

    public void setDblA728TARIFA(double dblA728TARIFA) {
        this.dblA728TARIFA = dblA728TARIFA;
    }

    public String getStrA728MDAPAG() {
        return strA728MDAPAG;
    }

    public void setStrA728MDAPAG(String strA728MDAPAG) {
        this.strA728MDAPAG = strA728MDAPAG;
    }

    public double getDblA728TRFPAG() {
        return dblA728TRFPAG;
    }

    public void setDblA728TRFPAG(double dblA728TRFPAG) {
        this.dblA728TRFPAG = dblA728TRFPAG;
    }

    public double getDblA728TCAPAG() {
        return dblA728TCAPAG;
    }

    public void setDblA728TCAPAG(double dblA728TCAPAG) {
        this.dblA728TCAPAG = dblA728TCAPAG;
    }

    public double getDblA728ATBP() {
        return dblA728ATBP;
    }

    public void setDblA728ATBP(double dblA728ATBP) {
        this.dblA728ATBP = dblA728ATBP;
    }

    public String getStrA728MDAATB() {
        return strA728MDAATB;
    }

    public void setStrA728MDAATB(String strA728MDAATB) {
        this.strA728MDAATB = strA728MDAATB;
    }

    public double getDblA728ROE() {
        return dblA728ROE;
    }

    public void setDblA728ROE(double dblA728ROE) {
        this.dblA728ROE = dblA728ROE;
    }

    public double getDblA728CPLUSS() {
        return dblA728CPLUSS;
    }

    public void setDblA728CPLUSS(double dblA728CPLUSS) {
        this.dblA728CPLUSS = dblA728CPLUSS;
    }

    public double getDblA728CSOVER() {
        return dblA728CSOVER;
    }

    public void setDblA728CSOVER(double dblA728CSOVER) {
        this.dblA728CSOVER = dblA728CSOVER;
    }

    public String getStrA728QSOVER() {
        return strA728QSOVER;
    }

    public void setStrA728QSOVER(String strA728QSOVER) {
        this.strA728QSOVER = strA728QSOVER;
    }

    public double getDblA728TAJUST() {
        return dblA728TAJUST;
    }

    public void setDblA728TAJUST(double dblA728TAJUST) {
        this.dblA728TAJUST = dblA728TAJUST;
    }

    public String getStrA728FBASE() {
        return strA728FBASE;
    }

    public void setStrA728FBASE(String strA728FBASE) {
        this.strA728FBASE = strA728FBASE;
    }

    public String getStrA728LOHO() {
        return strA728LOHO;
    }

    public void setStrA728LOHO(String strA728LOHO) {
        this.strA728LOHO = strA728LOHO;
    }

    public String getStrA728AIRFAC() {
        return strA728AIRFAC;
    }

    public void setStrA728AIRFAC(String strA728AIRFAC) {
        this.strA728AIRFAC = strA728AIRFAC;
    }

    public String getStrA728INDSAM() {
        return strA728INDSAM;
    }

    public void setStrA728INDSAM(String strA728INDSAM) {
        this.strA728INDSAM = strA728INDSAM;
    }

    public String getStrA728INDPRT() {
        return strA728INDPRT;
    }

    public void setStrA728INDPRT(String strA728INDPRT) {
        this.strA728INDPRT = strA728INDPRT;
    }

    public String getStrA728IPLUS() {
        return strA728IPLUS;
    }

    public void setStrA728IPLUS(String strA728IPLUS) {
        this.strA728IPLUS = strA728IPLUS;
    }

    public String getStrA728SECOR() {
        return strA728SECOR;
    }

    public void setStrA728SECOR(String strA728SECOR) {
        this.strA728SECOR = strA728SECOR;
    }

    public String getStrA728SECDS() {
        return strA728SECDS;
    }

    public void setStrA728SECDS(String strA728SECDS) {
        this.strA728SECDS = strA728SECDS;
    }

    public String getStrA728SELEC() {
        return strA728SELEC;
    }

    public void setStrA728SELEC(String strA728SELEC) {
        this.strA728SELEC = strA728SELEC;
    }

    public String getStrA728FVLO1() {
        return strA728FVLO1;
    }

    public void setStrA728FVLO1(String strA728FVLO1) {
        this.strA728FVLO1 = strA728FVLO1;
    }

    public String getStrFUNC() {
        return strFUNC;
    }

    public void setStrFUNC(String strFUNC) {
        this.strFUNC = strFUNC;
    }

    public String getStrA728RERUT() {
        return strA728RERUT;
    }

    public void setStrA728RERUT(String strA728RERUT) {
        this.strA728RERUT = strA728RERUT;
    }

    public String getStrDSCR() {
        return strDSCR;
    }

    public void setStrDSCR(String strDSCR) {
        this.strDSCR = strDSCR;
    }

    public String getStrFTIMELIM() {
        return strFTIMELIM;
    }

    public void setStrFTIMELIM(String strFTIMELIM) {
        this.strFTIMELIM = strFTIMELIM;
    }

    public String getStrMSG() {
        return strMSG;
    }

    public void setStrMSG(String strMSG) {
        this.strMSG = strMSG;
    }

    public String getStrUSER() {
        return strUSER;
    }

    public void setStrUSER(String strUSER) {
        this.strUSER = strUSER;
    }

    public String getStrA728CODTAX() {
        return strA728CODTAX;
    }

    public void setStrA728CODTAX(String strA728CODTAX) {
        this.strA728CODTAX = strA728CODTAX;
    }

    public String getStrA728GRUPO() {
        return strA728GRUPO;
    }

    public void setStrA728GRUPO(String strA728GRUPO) {
        this.strA728GRUPO = strA728GRUPO;
    }

    public String getStrA728CTYVTA() {
        return strA728CTYVTA;
    }

    public void setStrA728CTYVTA(String strA728CTYVTA) {
        this.strA728CTYVTA = strA728CTYVTA;
    }

    public String getStrA728COUVTA() {
        return strA728COUVTA;
    }

    public void setStrA728COUVTA(String strA728COUVTA) {
        this.strA728COUVTA = strA728COUVTA;
    }

    public String getStrA728CTYEMI() {
        return strA728CTYEMI;
    }

    public void setStrA728CTYEMI(String strA728CTYEMI) {
        this.strA728CTYEMI = strA728CTYEMI;
    }

    public String getStrA728COUEMI() {
        return strA728COUEMI;
    }

    public void setStrA728COUEMI(String strA728COUEMI) {
        this.strA728COUEMI = strA728COUEMI;
    }

    public String getStrA728AJTRAM() {
        return strA728AJTRAM;
    }

    public void setStrA728AJTRAM(String strA728AJTRAM) {
        this.strA728AJTRAM = strA728AJTRAM;
    }

    public ProrateSectorList getLstSECTORS() {
        return lstSECTORS;
    }

    public void setLstSECTORS(ProrateSectorList lstSECTORS) {
        this.lstSECTORS = lstSECTORS;
    }

    public String getStrMSGERR() {
        return strMSGERR;
    }

    public void setStrMSGERR(String strMSGERR) {
        this.strMSGERR = strMSGERR;
    }

    public String getStrA728FBASE1() {
        return strA728FBASE1;
    }

    public void setStrA728FBASE1(String strA728FBASE1) {
        this.strA728FBASE1 = strA728FBASE1;
    }

    public String getStrTextBoxErr() {
        return strTextBoxErr;
    }

    public void setStrTextBoxErr(String strTextBoxErr) {
        this.strTextBoxErr = strTextBoxErr;
    }

    public String getStrCCUST() {
        return strCCUST;
    }

    public void setStrCCUST(String strCCUST) {
        this.strCCUST = strCCUST;
    }

    public boolean isBooValidarTiempoLimite() {
        return booValidarTiempoLimite;
    }

    public void setBooValidarTiempoLimite(boolean booValidarTiempoLimite) {
        this.booValidarTiempoLimite = booValidarTiempoLimite;
    }

    public String getStrAdditionalInfo() {
        return strAdditionalInfo;
    }

    public void setStrAdditionalInfo(String strAdditionalInfo) {
        this.strAdditionalInfo = strAdditionalInfo;
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

    public String getStrCHS() {
        return strCHS;
    }

    public void setStrCHS(String strCHS) {
        this.strCHS = strCHS;
    }
   
    
}
