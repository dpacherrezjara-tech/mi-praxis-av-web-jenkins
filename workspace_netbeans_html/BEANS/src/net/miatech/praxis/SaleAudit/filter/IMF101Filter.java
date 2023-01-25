/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.SaleAudit.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.IMF101;
import net.miatech.utils.Functions;

/**
 *
 * @author claudia
 */
public class IMF101Filter extends IMF101 {

    public String IN_TIPFEC = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_FTE = "";
    public String IN_CANAV = "";
    public String IN_TRNCU = "";
    public String IN_TIPOFA = "";
    public String IN_CHOLD = "";
    public String IN_SUMMBY = "";
    public String IN_SELECTBY = "";
    public String IN_CURRENCY = "";
    public String IN_FLADM = "";
    public String IN_TOTALFLAG = "";
    public String strGroupBy = "";
    public String strFormatDate = "";
    public String strDescripcion = "";
    public String strDescripcion1 = "";
    public String strDescripcion2 = "";
    public String strTitFecha1 = "";
    public String strTitFecha2 = "";
    public String strTitFecha3 = "";
    public String strTitFecha4 = "";
    public String strTitFecha5 = "";
    public String strTitFecha6 = "";
    public String strFecProc = "";
    public String strCcia = "";
    public String strForma = "";
    public String strSerie = "";
    public String strCupon = "";
    public String strSEQ = "";
    public String strTicket = "";
    public String strPreme = "";
    public String strCommen = "";
    public String strFlag = "";
    public long lngQSAL1 = 0;
    public long lngQSAL2 = 0;
    public long lngQSAL3 = 0;
    public long lngQSAL4 = 0;
    public long lngQSAL5 = 0;
    public long lngQSAL6 = 0;
    public long lngQAUDI1 = 0;
    public long lngQAUDI2 = 0;
    public long lngQAUDI3 = 0;
    public long lngQAUDI4 = 0;
    public long lngQAUDI5 = 0;
    public long lngQAUDI6 = 0;
    public long lngQADM1 = 0;
    public long lngQADM2 = 0;
    public long lngQADM3 = 0;
    public long lngQADM4 = 0;
    public long lngQADM5 = 0;
    public long lngQADM6 = 0;
    public double dblASAL1 = 0;
    public double dblASAL2 = 0;
    public double dblASAL3 = 0;
    public double dblASAL4 = 0;
    public double dblASAL5 = 0;
    public double dblASAL6 = 0;
    public double dblAAUDI1 = 0;
    public double dblAAUDI2 = 0;
    public double dblAAUDI3 = 0;
    public double dblAAUDI4 = 0;
    public double dblAAUDI5 = 0;
    public double dblAAUDI6 = 0;
    public double dblAADM1 = 0;
    public double dblAADM2 = 0;
    public double dblAADM3 = 0;
    public double dblAADM4 = 0;
    public double dblAADM5 = 0;
    public double dblAADM6 = 0;
    public long lngQSALE = 0;
    public long lngQAUDI = 0;
    public long lngQADM = 0;
    public long lngQTOTSALE = 0;
    public long lngQTOTAUDI = 0;
    public long lngQTOTADM = 0;
    public double dblPercAud = 0;
    public double dblPercADM = 0;
    public double dblPercQTYADMP= 0;
    public double totDDCA_QTYADMPper= 0;
    public double dblPercQTYADMA= 0;
    public double totDDCA_QTYADMAper= 0;
    public double dblPercQTYADMR= 0;
    public double totDDCA_QTYADMRper= 0;
    public double dblPercQTYADMB= 0;
    public double totDDCA_QTYADMBper= 0;
    public double dblavgQTYADMB= 0;
    public double dblPercAMOUADMP= 0;
    public double totDDCA_AMOUADMPper= 0;
    public double dblPercAMOUADMA= 0;
    public double totDDCA_AMOUADMAper= 0;
    public double dblPercAMOUADMR= 0;
    public double totDDCA_AMOUADMRper= 0;
    public double dblPercAMOUADMB= 0;
    public double totDDCA_AMOUADMBper= 0;
    public double dblavgcAMOUADMB= 0;
    public double dblASALE = 0;
    public double dblARFND = 0;
    public double dblAEXCH = 0;
    public double dblAAUDI = 0;
    public double dblAADM = 0;
    public double dblATOTSALE = 0;
    public double dblATOTAUDI = 0;
    public double dblATOTADM = 0;
    public double AFARES = 0;
    public double AISCS = 0;
    public double ATAXS = 0;
    public long QRFND = 0;
    public double ARFND = 0;
    public double AFARER = 0;
    public double AISCR = 0;
    public double ATAXR = 0;
    public long QEXCH = 0;
    public double AEXCH = 0;
    public double AFAREE = 0;
    public double AISCE = 0;
    public double ATAXE = 0;
    public double AFARET = 0;
    public double AISCT = 0;
    public double ATAXT = 0;
    public long QADMBS = 0;
    public long QADMBR = 0;
    public long QADMBE = 0;
    public double AADMBS = 0;
    public double AADMBR = 0;
    public double AADMBE = 0;
    public long lngTotQADMBS = 0;
    public long lngTotQADMBR = 0;
    public long lngTotQADMBE = 0;
    public double dblTotAADMBS = 0;
    public double dblTotAADMBR = 0;
    public double dblTotAADMBE = 0;
    public long lngTotQSAL1 = 0;
    public long lngTotQSAL2 = 0;
    public long lngTotQSAL3 = 0;
    public long lngTotQSAL4 = 0;
    public long lngTotQSAL5 = 0;
    public long lngTotQSAL6 = 0;
    public long lngTotQAUDI1 = 0;
    public long lngTotQAUDI2 = 0;
    public long lngTotQAUDI3 = 0;
    public long lngTotQAUDI4 = 0;
    public long lngTotQAUDI5 = 0;
    public long lngTotQAUDI6 = 0;
    public long lngTotQADM1 = 0;
    public long lngTotQADM2 = 0;
    public long lngTotQADM3 = 0;
    public long lngTotQADM4 = 0;
    public long lngTotQADM5 = 0;
    public long lngTotQADM6 = 0;
    public double dblTotASAL1 = 0;
    public double dblTotASAL2 = 0;
    public double dblTotASAL3 = 0;
    public double dblTotASAL4 = 0;
    public double dblTotASAL5 = 0;
    public double dblTotASAL6 = 0;
    public double dblTotAAUDI1 = 0;
    public double dblTotAAUDI2 = 0;
    public double dblTotAAUDI3 = 0;
    public double dblTotAAUDI4 = 0;
    public double dblTotAAUDI5 = 0;
    public double dblTotAAUDI6 = 0;
    public double dblTotAADM1 = 0;
    public double dblTotAADM2 = 0;
    public double dblTotAADM3 = 0;
    public double dblTotAADM4 = 0;
    public double dblTotAADM5 = 0;
    public double dblTotAADM6 = 0;
    public long lngTotQSALE = 0;
    public long lngTotQAUDI = 0;
    public long lngTotQADM = 0;
    public long lngTotQTOTSALE = 0;
    public long lngTotQTOTAUDI = 0;
    public long lngTotQTOTADM = 0;
    public double dblTotPercAud = 0;
    public double dblTotPercADM = 0;
    public double dblTotASALE = 0;
    public double dblTotAAUDI = 0;
    public double dblTotAADM = 0;
    public double dblTotATOTSALE = 0;
    public double dblTotATOTAUDI = 0;
    public double dblTotATOTADM = 0;
    public long lngQADMS = 0;
    public long lngQADMP = 0;
    public long lngQADMA = 0;
    public long lngQADMR = 0;
    public long lngTotQADMS = 0;
    public long lngTotQPEND = 0;
    public long lngTotQADMP = 0;
    public long lngTotQADMA = 0;
    public long lngTotQADMR = 0;
    public long lngTotQADMB = 0;
    public double dblAADMS = 0;
    public double dblAADMP = 0;
    public double dblAADMA = 0;
    public double dblAADMR = 0;
    public double dblTotAPEND = 0;
    public double dblTotAADMS = 0;
    public double dblTotAADMP = 0;
    public double dblTotAADMA = 0;
    public double dblTotAADMR = 0;
    public double dblTotAADMB = 0;
    public double dblTotAFARES = 0;
    public double dblTotAISCS = 0;
    public double dblTotATAXS = 0;
    public long lngTotQRFND = 0;
    public double dblTotARFND = 0;
    public double dblTotAFARER = 0;
    public double dblTotAISCR = 0;
    public double dblTotATAXR = 0;
    public long lngTotQEXCH = 0;
    public double dblTotAEXCH = 0;
    public double dblTotAFAREE = 0;
    public double dblTotAISCE = 0;
    public double dblTotATAXE = 0;
    public double dblTotAFARET = 0;
    public double dblTotAISCT = 0;
    public double dblTotATAXT = 0;
    public long lngTotQTYADBA = 0;
    public long lngTotQTYADBA1 = 0;
    public long lngTotQTYADBA2 = 0;
    public double dblTotAMOUADBA = 0;
    public double dblTotAMOUADBA1 = 0;
    public double dblTotAMOUADBA2 = 0;
    public double dblPerQTYADBA = 0;
    public double dblTotPerQTYADBA = 0;
    //Datos BPO No ADM y Pending
    public long lngTotQTYNADM = 0;
    public double dblTotAMOUNADM = 0;
    public long lngQTYPADM = 0;
    public double dblAMOUPADM = 0;
    public long lngTotQTYPADM = 0;
    public double dblTotAMOUPADM = 0;
    public double dblPerPADM = 0;
    public double dblTotPerPADM = 0;
    
    public double perAISCE = 0;
    public double totPerAISCE = 0;

    //IMF103 =============================
    public long lngTotQTYTKTN = 0;
    public double dblTotAMOUVTAN = 0;
    public double dblTotAMOUAUDN = 0;
    public double dblTotAMOUDIFN = 0;
    public long lngTotQTYTKTO = 0;
    public double dblTotAMOUVTAO = 0;
    public double dblTotAMOUAUDO = 0;
    public double dblTotAMOUDIFO = 0;
    //IMF105 =============================
    public long lngQMATCHB = 0;
    public long lngQACMB = 0;
    public long lngQADMB = 0;
    public long lngQPENDB = 0;
    public long lngQERRORB = 0;
    public long lngQOTHERB = 0;
    public long lngTotQMATCHB = 0;
    public long lngTotQACMB = 0;
    public long lngTotQPENDB = 0;
    public long lngTotQERRORB = 0;
    public long lngTotQOTHERB = 0;
    public double dblPerQMATCHB = 0;
    public double dblPerQACMB = 0;
    public double dblPerQADMB = 0;
    public double dblPerQPENDB = 0;
    public double dblPerQERRORB = 0;
    public long lngQMATCHO = 0;
    public long lngQACMO = 0;
    public long lngQADMO = 0;
    public long lngQPENDO = 0;
    public long lngQERRORO = 0;
    public long lngQOTHERO = 0;
    public long lngTotQMATCHO = 0;
    public long lngTotQACMO = 0;
    public long lngTotQADMO = 0;
    public long lngTotQPENDO = 0;
    public long lngTotQERRORO = 0;
    public long lngTotQOTHERO = 0;
    public double dblAPEND = 0;
    public double dblAMATCHB = 0;
    public double dblAACMB = 0;
    public double dblAADMB = 0;
    public double dblAPENDB = 0;
    public double dblAERRORB = 0;
    public double dblTotAMATCHB = 0;
    public double dblTotAACMB = 0;
    public double dblTotAPENDB = 0;
    public double dblTotAERRORB = 0;
    public double dblAMATCHO = 0;
    public double dblAACMO = 0;
    public double dblAADMO = 0;
    public double dblAPENDO = 0;
    public double dblAERRORO = 0;
    public double dblTotAMATCHO = 0;
    public double dblTotAACMO = 0;
    public double dblTotAADMO = 0;
    public double dblTotAPENDO = 0;
    public double dblTotAERRORO = 0;
    public double QTYADMSN = 0;
    public double AMOUNTADMN = 0;
    public double totQTYADMSN = 0;
    public double totAMOUNTADMN = 0;
    public Pagination page = new Pagination();

    public String bufferToString(String ccust, String strTicket, String strPag, String tabla) {

        String strValue = "";

        if (tabla.trim().equals("A1672G")) {

            for (int i = 0; i < 15; i++) {
                //A1672FPROC  PIC X(08).
                strValue += Functions.fillString("", 8);
                //A1672CIA    PIC X(03).
                //A1672FORMA  PIC X(04).
                //A1672SERIE  PIC X(06).
                //A1672CUPON  PIC X.
                strValue += Functions.fillString("", 14);
                //07  A1672SEQ    PIC XX.
                strValue += Functions.fillZeros(2, "");
                //VALOR AMOUNT  PIC X(10).
                strValue += Functions.fillZeros(10, "");
                //A1672COMEN  PIC X(300).
                strValue += Functions.fillString("", 288);
            }
            //03 TABLA       PIC X(10).
            strValue += Functions.fillString("A1672G", 10);
            //03 PG-DN       PIC X(01).
            strValue += Functions.fillString(strPag, 1);
            //06 K-CCUST         PIC X(03).
            strValue += Functions.fillString(ccust, 3);
            //06 K-FPROAAMM      PIC X(06).
            strValue += Functions.fillString(this.SDATE, 6);
            //06 K-CERROR      PIC X(06).
            strValue += Functions.fillString(this.CERROR, 6);
            //06 K-CCIA          PIC X(03).
            //06 K-FORMA         PIC X(04).
            //06 K-SERIE         PIC X(06).
            //06 K-CUPON         PIC X(01).
            strValue += Functions.fillString(strTicket, 14);
            //06 FLADM         PIC X(01).
            strValue += Functions.fillString(this.IN_FLADM, 1);
            //06 AGENTE        PIC X(08).
            strValue += Functions.fillString(this.AGENT, 8);
            //06 TIPOFA        PIC X(03).
            strValue += Functions.fillString(this.IN_TIPOFA, 3);
            //03 MSG           PIC X(20).
            strValue += Functions.fillString("", 17);

        } else {
            
            //A1672N
            for (int i = 0; i < 15; i++) {
                //08  A1672CIA    PIC X(03).
                //08  A1672FORMA  PIC X(04).
                //08  A1672SERIE  PIC X(06).
                //08  A1672SEQ    PIC X(02).
                //08  A1672CUPON  PIC X(01).
                strValue += Functions.fillString("", 16);
                //08  A1672GRUPO  PIC X(09).
                strValue += Functions.fillZeros(9, "");
                //08  A1672FPROC  PIC X(08).
                strValue += Functions.fillString("", 8);
                //08  A1672FVENT  PIC X(08).
                strValue += Functions.fillString("", 8);
                //08  A1672FUENT  PIC X(08).
                strValue += Functions.fillString("", 8);
                //08  A1672CANAL  PIC X(03).
                strValue += Functions.fillString("", 3);
                //08  A1672PAIVT  PIC X(02).
                strValue += Functions.fillString("", 2);
                //08  A1672TIPOF  PIC X(03).
                strValue += Functions.fillString("", 3);
                //08  A1672TTMIA  PIC S9(08)V9(02).
                strValue += Functions.fillZeros(10, "");
                //08  A1672TTAGT  PIC S9(08)V9(02).
                strValue += Functions.fillZeros(10, "");
                //08  A1672TTDIF  PIC S9(08)V9(02).
                strValue += Functions.fillZeros(10, "");
                //08  A1672COMEN  PIC X(235).
                strValue += Functions.fillString("", 235);
            }
            //03 TABLA       PIC X(10).
            strValue += Functions.fillString("A1672N", 10);
            //03 PG-DN       PIC X(01).
            strValue += Functions.fillString(strPag, 1);
            //06 K-CCUST         PIC X(03).
            strValue += Functions.fillString(ccust, 3);
            //06 K-FPROAAMM      PIC X(06).
            strValue += Functions.fillString(this.SDATE, 6);
            //06 K-CERROR      PIC X(06).
            strValue += Functions.fillString(this.CERROR, 6);
            //06 K-CCIA          PIC X(03).
            //06 K-FORMA         PIC X(04).
            //06 K-SERIE         PIC X(06).
            //06 K-CUPON         PIC X(01).
            strValue += Functions.fillString(strTicket, 14);
            //06 FLADM         PIC X(01).
            strValue += Functions.fillString(this.IN_FLADM, 1);
            //06 AGENTE        PIC X(08).
            strValue += Functions.fillString(this.AGENT, 8);
            //06 TIPOFA        PIC X(03).
            strValue += Functions.fillString(this.IN_TIPOFA, 3);
            //03 MSG           PIC X(20).
            strValue += Functions.fillString("", 17);
            
        }
        
        //System.out.println(strValue.length());

        return strValue.toUpperCase();
    }

    public String bufferToString104(String ccust, String strPreme, String strPag) {

        String strValue = "";

        for (int i = 0; i < 15; i++) {

            strValue += Functions.fillString("", 10);
            strValue += Functions.fillString("", 13);
            strValue += Functions.fillString("", 2);

            strValue += Functions.fillString("", 2);
            strValue += Functions.fillString("", 3);

            strValue += Functions.fillString("", 8);
            strValue += Functions.fillString("", 2);
            strValue += Functions.fillString("", 2);

            strValue += Functions.fillString("", 8);
            strValue += Functions.fillString("", 4);
            strValue += Functions.fillString("", 13);

            strValue += Functions.fillString("", 3);
            strValue += Functions.fillString("", 15);
            strValue += Functions.fillString("", 15);
            strValue += Functions.fillString("", 1);
            strValue += Functions.fillString("", 4);

        }

        strValue += Functions.fillString("A2548C", 10);
        strValue += Functions.fillString(strPag, 1);
        strValue += Functions.fillString(ccust, 3);
        strValue += Functions.fillString(this.SDATE, 6);
        strValue += Functions.fillString(strPreme, 10);
        strValue += Functions.fillString(this.IN_TIPOFA, 3);

        strValue += Functions.fillString("", 23);

        return strValue.toUpperCase();
    }
}
