/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libmiatec.WRF100;

/**
 *
 * @author jtorres
 */
public class WRF100Filter extends WRF100 {

    public String tipofecha = "";
    public String fechaini = "";
    public String fechafin = "";
    public String CIAF = "";
    public String RECORDT = "";
    public String CURRENCCY = "";
    public String STATUS = "";
    public String STAT = "";
    public String DateF = "";
    public String CFROM = "";
    public String CTO = "";
    public String fechaDetail = "";
    public String PNRF = "";
    public String QRSGP = "";
    public String QRSCD = "";
    public String QRSNM = "";
    public String tregBoF = "";
    public String strOrden = "";
    public String QRSCDL = "";
    public String CALFA = "";
    public String strNivel = "";
    public String strCodCorp = "";
    public String strClase = "";
    public String strClaseV = "";
    public String strGrupo = "";
    public String CLASV = "";
    public String CLASE = "";
    public String FLSPA = "";
    public String strTicket = "";
    public String strDescripcion = "";
    public String strFlagPr = "";
    public String strCodReg = "";
    public String strNomReg = "";
    public String strCodCia = "";
    public String strNomCia = "";
    public int contador = 0;
    public String Strcontador = "";
    public int intCol = 0;
    //Paginación =================
    public int intTotalRws = -1;
    public int intCurrentPg = -1;
    public int intTotalPgs = -1;
    public int intPageRws = -1;
    public int intRowNumber = -1;
    // ===========================
    public long intTotQTYC = 0;
    public long intTotQTYCM = 0;
    public long totKMVLO = 0;
    public double totKADPL = 0;
    public long totKMVLOA = 0;
    public long DifKMS = 0;
    public double totDifKMS = 0;
    public double totAMOUN = 0;
    public double totAMOUNM = 0;
    public double totKMORM = 0;
    public double totKMADM = 0;
    public double totAMOUNA = 0;
    public double PrcQty = 0;
    public double PrcQtyCM = 0;
    public double PrcKms = 0;
    public double totPrcKms = 0;
    public double DifAmount = 0;
    public double totDifAmount = 0;
    public double PorcDif = 0;
    public double totPorcDif = 0;
    public double AVGamountPLM = 0;
    public double AVGamountMia = 0;
    public double totAVGamountPLM = 0;
    public double totAVGamountMia = 0;
    public double dblKMSADD = 0;
    public double dblTotKMSADD = 0;
    //totales por periodo
    public long totQTYP = 0;
    public long totQTYM = 0;
    public double totAMOUNP = 0;
    public double totKMSM = 0;
    public double totKMSP = 0;
    //totales por mes
    public long totMonQTYP = 0;
    public long totMonQTYM = 0;
    public double totMonAMOUNP = 0;
    public double totMonKMSM = 0;
    public double totMonKMSP = 0;
    public double totMonAMOUNM = 0;
    //WRF110
    public String TTRAN = "";
    public String DESCRI = "";
    public double KMADD = 0;
    public long totKMADD = 0;
    public String TIPOR = "";
    //WRF111
    public String NIVEL = "";
    //WRF103
    public long KMINCA = 0;
    public long totKMINCA = 0;
    //WRF112
    public String TIPEST = "";
    //WRF113
    public String CLASF = "";
    //plm
    public long QTYP = 0;
    public double KMSP = 0;
    public double AMOUNP = 0;
    //miatech
    public long QTYM = 0;
    public double KMSM = 0;
    //wrf100 totales
    public long lngTotKADPL = 0;
    public double dblTotAMOUN = 0;
    public long lngTotKMVLOA = 0;
    public long lngTotAMOUNA = 0;
    public double dblTotKMADM = 0;
    public double dblTotAMOUNM = 0;
    //WRF114
    public int QTYCP = 0;
    public long totQTYCP = 0;
    public long totQTYCM = 0;
    public String TTKT = "";
    public String ZONORI = "";
    public String ZONDES = "";
    public long totQCPNS = 0;
    public long totQCPNF = 0;
    public long totQCPND = 0;
    public long totQCPNU = 0;
    public long totQCPNO = 0;
    public long totQCPNR = 0;
    public long totKMS = 0;
    public double totAMOUNT = 0;
    public String FFCODE = "";
    public long QCPNS = 0;
    public long QCPNF = 0;
    public long QCPND = 0;
    public long QCPNU = 0;
    public long QCPNO = 0;
    public long QCPNR = 0;
    public long KMS = 0;
    public double AMOUNT = 0;
    public long totQCPNP = 0;
    public long totQCPNM = 0;
    public long DifQCPN = 0;
    public long totDifQCPN = 0;
    public long QCPNP = 0;
    public long QCPNM = 0;
    //WRF121
    public long AMNPLM = 0;
    public long AMNMIA = 0;
    public long totAMNPLM = 0;
    public long totAMNMIA = 0;
    //WRF119
    public long TotQCPLM = 0;
    public long TotQCMIA = 0;
    public long QCPLM = 0;
    public long QCMIA = 0;
    //A1612
    public String SOURCE = "";
    public String A1612YEAR = "";
    public String A1612FFCOD = "";
    public long A1612QCA01 = 0;
    public long A1612QCA02 = 0;
    public long A1612QCA03 = 0;
    public long A1612QCA04 = 0;
    public long A1612QCA05 = 0;
    public long A1612QCA06 = 0;
    public long A1612QCA07 = 0;
    public long A1612QCA08 = 0;
    public long A1612QCA09 = 0;
    public long A1612QCA10 = 0;
    public long A1612QCA11 = 0;
    public long A1612QCA12 = 0;
    
    public long A1612ACU00 = 0;
    public long A1612ACU01 = 0;
    public long A1612ACU02 = 0;
    public long A1612ACU03 = 0;
    public long A1612ACU04 = 0;
    public long A1612ACU05 = 0;
    public long A1612ACU06 = 0;
    public long A1612ACU07 = 0;
    public long A1612ACU08 = 0;
    public long A1612ACU09 = 0;
    public long A1612ACU10 = 0;
    public long A1612ACU11 = 0;
    public long A1612ACU12 = 0;
    
    public long A1612RED01 = 0;
    public long A1612RED02 = 0;
    public long A1612RED03 = 0;
    public long A1612RED04 = 0;
    public long A1612RED05 = 0;
    public long A1612RED06 = 0;
    public long A1612RED07 = 0;
    public long A1612RED08 = 0;
    public long A1612RED09 = 0;
    public long A1612RED10 = 0;
    public long A1612RED11 = 0;
    public long A1612RED12 = 0;
    
    public long A1612QCR01 = 0;
    public long A1612QCR02 = 0;
    public long A1612QCR03 = 0;
    public long A1612QCR04 = 0;
    public long A1612QCR05 = 0;
    public long A1612QCR06 = 0;
    public long A1612QCR07 = 0;
    public long A1612QCR08 = 0;
    public long A1612QCR09 = 0;
    public long A1612QCR10 = 0;
    public long A1612QCR11 = 0;
    public long A1612QCR12 = 0;
    
    public long A1612COM01 = 0;
    public long A1612COM02 = 0;
    public long A1612COM03 = 0;
    public long A1612COM04 = 0;
    public long A1612COM05 = 0;
    public long A1612COM06 = 0;
    public long A1612COM07 = 0;
    public long A1612COM08 = 0;
    public long A1612COM09 = 0;
    public long A1612COM10 = 0;
    public long A1612COM11 = 0;
    public long A1612COM12 = 0;
    
    public long KMSACC01 = 0;
    public long KMSACC02 = 0;
    public long KMSACC03 = 0;
    public long KMSACC04 = 0;
    public long KMSACC05 = 0;
    public long KMSACC06 = 0;
    public long KMSACC07 = 0;
    public long KMSACC08 = 0;
    public long KMSACC09 = 0;
    public long KMSACC10 = 0;
    public long KMSACC11 = 0;
    public long KMSACC12 = 0;
    
    public long AMTACC01 = 0;
    public long AMTACC02 = 0;
    public long AMTACC03 = 0;
    public long AMTACC04 = 0;
    public long AMTACC05 = 0;
    public long AMTACC06 = 0;
    public long AMTACC07 = 0;
    public long AMTACC08 = 0;
    public long AMTACC09 = 0;
    public long AMTACC10 = 0;
    public long AMTACC11 = 0;
    public long AMTACC12 = 0;
    
    public long ENEREDANT = 0;
    public long FEBREDANT = 0;
    public long MARREDANT = 0;
    public long ABRREDANT = 0;
    public long MAYREDANT = 0;
    public long JUNREDANT = 0;
    public long JULREDANT = 0;
    public long AGOREDANT = 0;
    public long SETREDANT = 0;
    public long OCTREDANT = 0;
    public long NOVREDANT = 0;
    public long DICREDANT = 0;
    
    public long AKMS01 = 0;
    public long AKMS02 = 0;
    public long AKMS03 = 0;
    public long AKMS04 = 0;
    public long AKMS05 = 0;
    public long AKMS06 = 0;
    public long AKMS07 = 0;
    public long AKMS08 = 0;
    public long AKMS09 = 0;
    public long AKMS10 = 0;
    public long AKMS11 = 0;
    public long AKMS12 = 0;
    
    public long AMTP01 = 0;
    public long AMTP02 = 0;
    public long AMTP03 = 0;
    public long AMTP04 = 0;
    public long AMTP05 = 0;
    public long AMTP06 = 0;
    public long AMTP07 = 0;
    public long AMTP08 = 0;
    public long AMTP09 = 0;
    public long AMTP10 = 0;
    public long AMTP11 = 0;
    public long AMTP12 = 0;
   
    public long AVG01 = 0;
    public long AVG02 = 0;
    public long AVG03 = 0;
    public long AVG04 = 0;
    public long AVG05 = 0;
    public long AVG06 = 0;
    public long AVG07 = 0;
    public long AVG08 = 0;
    public long AVG09 = 0;
    public long AVG10 = 0;
    public long AVG11 = 0;
    public long AVG12 = 0;
    
    public long AVG201 = 0;
    public long AVG202 = 0;
    public long AVG203 = 0;
    public long AVG204 = 0;
    public long AVG205 = 0;
    public long AVG206 = 0;
    public long AVG207 = 0;
    public long AVG208 = 0;
    public long AVG209 = 0;
    public long AVG210 = 0;
    public long AVG211 = 0;
    public long AVG212 = 0;
    public long totA1612QCA = 0;
    public long totA1612ACU00 = 0;
    public long totA1612ACU = 0;
    public long totA1612QCR = 0;  
    public long totA1612COM = 0;  
    public long totA1612RED = 0;
    public long totalesAVG1 = 0; 
    public long totalesAVG2 = 0;

    public long totAVG1 = 0;
    public long totAVG2 = 0;
    public long totAVG3 = 0;
    public long totAVG4 = 0;
    public long totAVG5 = 0;
    public long totAVG6 = 0;
    public long totAVG7 = 0;
    public long totAVG8 = 0;
    public long totAVG9 = 0;
    public long totAVG10 = 0;
    public long totAVG11= 0;
    public long totAVG12= 0;
    
    
}
