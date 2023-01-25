



/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.IMF111;

/**
 *
 * @author claudia
 */
public class IMF111Filter extends IMF111 {

    public String IN_TIPOFECHA = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_CERROR = "";
    public String IN_TKT = "";
    public String IN_CARD = "";
    public String IN_CARD1 = "";
    public String IN_CARD2 = "";
    public String IN_RCARCOD = "";
    public String IN_FLAGEX = "";
    public String IN_RATED = "";
    public String IN_AGENTE = "";
    public String IN_ORDER = "";
    public String IN_TYPE = "";
   
    public String IN_OPTION = "";

    public String FECHA = "";
    public String CUPON = "";
    public String strDescription = "";
    public String strCountry = "";
    public String strFormatDate = "";
    public String TKT = "";
    public String DESC_ORIG = "";
    public String DESC_DEST = "";
    public String FlagFactor = "";
    public String strDescription1 = "";
    public String strDescription2 = "";
    public String strDescription3 = "";
    public String strDescription4 = "";
    public String strDescription5 = "";
    public String strColor = "";
    public String strColorValor = "";
    public String strColorPart = "";
    public String strColorRevMil = "";
    public String FAREBASE = "";
    public String strTicket = "";

    public String strFormatDatemax = "";
    public double perMax = 0;
    public double perMim = 0;
    public double avgMax = 0;
    public double avgMim = 0;
    public long lngTotQTKTSmax = 0;
    public long QTKTSmax = 0;
    public double dblTotAMOUNTmax = 0;
    public double AMOUNTmax = 0;
    
     public double perBel = 0;
     public double avgBel = 0;
     public long lngTotQTKTSbel = 0;
     public long QTKTSbel = 0;
     public double dblTotAMOUNTbel = 0;
     public double AMOUNTbel = 0;
     
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
    //Totales
    public long lngTotQTKTS = 0;
    public double dblTotAMOUNT = 0;
    public long lngTotQTKTS1 = 0;
    public double dblTotAMOUNT1 = 0;
    public long lngTotQTKTS2 = 0;
    public double dblTotAMOUNT2 = 0;
    public long lngTotQTKTS3 = 0;
    public double dblTotAMOUNT3 = 0;
    public long lngTotQTKTS4 = 0;
    public double dblTotAMOUNT4 = 0;
    public long lngTotQTKTS5 = 0;
    public double dblTotAMOUNT5 = 0;
    public long lngTotQTKTS6 = 0;
    public double dblTotAMOUNT6 = 0;
    public double totVALADM = 0;

    public double totPMP = 0;
    public double totPMP1 = 0;
    public double totRATED = 0;
    public double totVALOR = 0;
    public double totVALOR1 = 0;
    public double totVALOREX = 0;
    public double totVALORCA = 0;
    public double totVALORCC = 0;
    public double DIFFNORMAL = 0;

    public long A720FACT1 = 0;
    public long A720FACT2 = 0;
    public long A720FACT3 = 0;
    public long A720FACT4 = 0;

    public double A720VALOR1 = 0;
    public double A720VALOR2 = 0;
    public double A720VALOR3 = 0;
    public double A720VALOR4 = 0;

    public String strA720VALOR1 = "";
    public String strA720VALOR2 = "";
    public String strA720VALOR3 = "";
    public String strA720VALOR4 = "";

    public String strA720FACT1 = "";
    public String strA720FACT2 = "";
    public String strA720FACT3 = "";
    public String strA720FACT4 = "";

    public double REV01 = 0;
    public double REV02 = 0;
    public double REV03 = 0;
    public double REV04 = 0;

    public double PER01 = 0;
    public double PER02 = 0;
    public double PER03 = 0;
    public double PER04 = 0;

    public double avg01 = 0;
    public double avg02 = 0;
    public double avg03 = 0;
    public double avg04 = 0;

    public long totmilla01 = 0;
    public long totmilla02 = 0;
    public long totmilla03 = 0;
    public long totmilla04 = 0;

    public double totvalor01 = 0;
    public double totvalor02 = 0;
    public double totvalor03 = 0;
    public double totvalor04 = 0;

    public String A720FBUSO1 = "";
    public String A720FBUSO2 = "";
    public String A720FBUSO3 = "";
    public String A720FBUSO4 = "";

    public String A720CARRA1 = "";
    public String A720CARRA2 = "";
    public String A720CARRA3 = "";
    public String A720CARRA4 = "";

    public String strA720CARRA1 = "";
    public String strA720CARRA2 = "";
    public String strA720CARRA3 = "";
    public String strA720CARRA4 = "";

    //IMF116
    public long totQTKTS0 = 0;
    public long totQTKTS1 = 0;
    public long totQTKTS2 = 0;
    public long totQTKTS3 = 0;
    public long totQCPNS0 = 0;
    public long totQCPNS1 = 0;
    public long totQCPNS2 = 0;
    public long totQCPNS3 = 0;

    public double totVALOR0 = 0.0;
    public double totVALOR2 = 0.0;
    public double totVALOR3 = 0.0;
    
    //IMF115
    public String strCITYO = "";
    public String strCITYD = "";
    public String strCARRIER = "";
    public String strCITYS = "";
    
    public long totQKMS=0; 
    public double totVMPA=0.00; 
    public double totVSRP=0.00; 
    public double totREVXMILLA=0.00; 
    public double totPORXPART=0.00; 
    public double totVISC2=0.00; 
    public double totVISC3=0.00; 
    public double totVCOMIS=0.00; 

    public double totPMP0 = 0.0;
    public double totPMP2= 0.0;
    public double totPMP3 = 0.0;
    
    public double PERKMSON = 0.00;
    public double PERKMSOF = 0.00;
    public double totPERKMSON = 0.00;
    public double totPERKMSOF = 0.00;
     
    public String rout = "";

    public long RN = 0;
    public Pagination page = new Pagination();
    
    /*Extjs*/
    public boolean dw_excel = false;

}
