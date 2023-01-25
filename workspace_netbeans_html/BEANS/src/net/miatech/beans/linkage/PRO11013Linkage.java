/*
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AEROMEXICO                               *
 * Document   : PRO11013Linkage                                   *
 * Created on : 19-04-2017, 16:41:51                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201701 RMC 19-04-2017 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
package net.miatech.beans.linkage;

import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramParameter;
import net.miatech.beans.PRO11013Filter;
import net.miatech.utils.AS400Map;
import org.apache.commons.lang.StringUtils;

/**
 *
 * @author rmayta
 */
public class PRO11013Linkage {
    public String programPath;
    public ProgramParameter[] parameterList;
    public PRO11013Filter returnFilter;
    //<editor-fold defaultstate="collapsed" desc="01 P_INPUT                    ">
    private AS400DataType[] P_INPUT = new AS400DataType[5];
    private class IDX_P_INPUT {
        private static final int IN_CCUST = 0;
        private static final int IN_CIA = 1;
        private static final int IN_FORMA = 2;
        private static final int IN_SERIE = 3;
        private static final int IN_SEQT = 4;
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="01 P_OUTPUT                   ">
    private AS400DataType[] P_OUTPUT = new AS400DataType[16];
    private class IDX_P_OUTPUT {
        private static final int ITMA720 = 0;
        private static final int LSTA730 = 1;
        private static final int LSTA713 = 2;
        private static final int LSTA1721 = 3;
        private static final int LSTA1532 = 4;
        private static final int LSTA1532_I = 5;
        private static final int LSTA1531_CC = 6;
        private static final int LSTA1531_CA = 7;
        private static final int LSTA1531_EE = 8;
        private static final int LSTA1531_OT = 9;
        private static final int LSTA1531_RT = 10;
        private static final int LSTA1692 = 11;
        private static final int LSTA1818 = 12;
        private static final int LSTA1200 = 13;
        private static final int LSTA2033 = 14;
        private static final int LSTA1747 = 15;
    }  
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="02 ITMA720                    ">
    private AS400DataType[] ITMA720 = new AS400DataType[1];
    private class IDX_ITMA720 {
        private static final int IT_A720 = 0;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="03 IT_A720                   ">
    private AS400DataType[] IT_A720 = new AS400DataType[154];
    private class IDX_IT_A720 {
        private static final int LK_A720CIA = 0;
        private static final int LK_A720FORMA = 1;
        private static final int LK_A720SERIE = 2;
        private static final int LK_A720CIAI = 3;
        private static final int LK_A720FORMAI = 4;
        private static final int LK_A720SERIEI = 5;
        private static final int LK_A720PNR = 6;
        private static final int LK_A1530FHAST = 7;
        private static final int LK_A1530MDA = 8;
        private static final int LK_A720AGENTE = 9;
        private static final int LK_A720FECVTA = 10;
        private static final int LK_A003KEY1 = 11;
        private static final int LK_A003PROVIN = 12;
        private static final int LK_A003CIUDAD = 13;
        private static final int LK_A1007NOMCD = 14;
        private static final int LK_A720PAX = 15;
        private static final int LK_A720TVENTA = 16;
        private static final int LK_A720CODIT = 17;
        private static final int LK_A1530FUENT = 18;
        private static final int LK_A1530PSVTA = 19;
        private static final int LK_A720SASI = 20;
        private static final int LK_A720TICAP = 21;
        private static final int LK_A720ACCO = 22;
        private static final int LK_A720ACCD = 23;
        private static final int LK_A720ETKT = 24;
        private static final int LK_A1530FCONT = 25;
        private static final int LK_A1530IDCON = 26;
        private static final int LK_A1530TCAMB = 27;
        private static final int LK_A1530TCAMP = 28;
        private static final int LK_A720TARI1 = 29;
        private static final int LK_A720TARI2 = 30;
        private static final int LK_A720TARI3 = 31;
        private static final int LK_A720TARI4 = 32;
        private static final int LK_A720TQ = 33;
        private static final int LK_A720TQRV = 34;
        private static final int LK_A720TARIFA = 35;
        private static final int LK_A720MONEDA = 36;
        private static final int LK_A720TRFPAG = 37;
        private static final int LK_A720MDAPAG = 38;
        private static final int LK_A720TCOM = 39;
        private static final int LK_A720TCOMRV = 40;
        private static final int LK_A720MDACM = 41;
        private static final int LK_A720MDARV = 42;
        private static final int LK_A720COMMIS = 43;
        private static final int LK_A720TSCM = 44;
        private static final int LK_A720MDACOM = 45;
        private static final int LK_A720ROE = 46;
        private static final int LK_A720FARE = 47;
        private static final int LK_A720TKVOID = 48;
        private static final int LK_A720TCAMB = 49;
        private static final int LK_A720YQ1 = 50;
        private static final int LK_A720YQ2 = 51;
        private static final int LK_A720YQ3 = 52;
        private static final int LK_A720YQ4 = 53;
        private static final int LK_A720PRRCM1 = 54;
        private static final int LK_A720PRRCM2 = 55;
        private static final int LK_A720PRRCM3 = 56;
        private static final int LK_A720PRRCM4 = 57;
        private static final int LK_A720PRSCM1 = 58;
        private static final int LK_A720PRSCM2 = 59;
        private static final int LK_A720PRSCM3 = 60;
        private static final int LK_A720PRSCM4 = 61;
        private static final int LK_A720VALOR1 = 62;
        private static final int LK_A720VALOR2 = 63;
        private static final int LK_A720VALOR3 = 64;
        private static final int LK_A720VALOR4 = 65;
        private static final int LK_A720ORIGEX = 66;
        private static final int LK_A720TTCOMM = 67;
        private static final int LK_A720TTSCMM = 68;
        private static final int LK_A720TYQ = 69;
        private static final int LK_A720VALOL1 = 70;
        private static final int LK_A720VALOL2 = 71;
        private static final int LK_A720VALOL3 = 72;
        private static final int LK_A720VALOL4 = 73;
        private static final int LK_A720LRRCM1 = 74;
        private static final int LK_A720LRRCM2 = 75;
        private static final int LK_A720LRRCM3 = 76;
        private static final int LK_A720LRRCM4 = 77;
        private static final int LK_A720LRSCM1 = 78;
        private static final int LK_A720LRSCM2 = 79;
        private static final int LK_A720LRSCM3 = 80;
        private static final int LK_A720LRSCM4 = 81;
        private static final int LK_A720LYQ1 = 82;
        private static final int LK_A720LYQ2 = 83;
        private static final int LK_A720LYQ3 = 84;
        private static final int LK_A720LYQ4 = 85;
        private static final int LK_A720BOOKI1 = 86;
        private static final int LK_A720BOOKI2 = 87;
        private static final int LK_A720BOOKI3 = 88;
        private static final int LK_A720BOOKI4 = 89;
        private static final int LK_A720CONEX1 = 90;
        private static final int LK_A720RUTA0 = 91;
        private static final int LK_A720RUTA1 = 92;
        private static final int LK_A720CARRA1 = 93;
        private static final int LK_A720NVLO1 = 94;
        private static final int LK_A720FVLO1 = 95;
        private static final int LK_A720HVLO1 = 96;
        private static final int LK_A720FBST1 = 97;
        private static final int LK_A720CLASE1 = 98;
        private static final int LK_A720FBUSO1 = 99;
        private static final int LK_A720CARRO1 = 100;
        private static final int LK_A720NVLOO1 = 101;
        private static final int LK_A720NBDA1 = 102;
        private static final int LK_A720NADA1 = 103;
        private static final int LK_LEG1 = 104;
        private static final int LK_A720CONEX2 = 105;
        private static final int LK_A720RUTA2 = 106;
        private static final int LK_A720CARRA2 = 107;
        private static final int LK_A720NVLO2 = 108;
        private static final int LK_A720FVLO2 = 109;
        private static final int LK_A720HVLO2 = 110;
        private static final int LK_A720FBST2 = 111;
        private static final int LK_A720CLASE2 = 112;
        private static final int LK_A720FBUSO2 = 113;
        private static final int LK_A720CARRO2 = 114;
        private static final int LK_A720NVLOO2 = 115;
        private static final int LK_A720NBDA2 = 116;
        private static final int LK_A720NADA2 = 117;
        private static final int LK_LEG2 = 118;
        private static final int LK_A720CONEX3 = 119;
        private static final int LK_A720RUTA3 = 120;
        private static final int LK_A720CARRA3 = 121;
        private static final int LK_A720NVLO3 = 122;
        private static final int LK_A720FVLO3 = 123;
        private static final int LK_A720HVLO3 = 124;
        private static final int LK_A720FBST3 = 125;
        private static final int LK_A720CLASE3 = 126;
        private static final int LK_A720FBUSO3 = 127;
        private static final int LK_A720CARRO3 = 128;
        private static final int LK_A720NVLOO3 = 129;
        private static final int LK_A720NBDA3 = 130;
        private static final int LK_A720NADA3 = 131;
        private static final int LK_LEG3 = 132;
        private static final int LK_A720CONEX4 = 133;
        private static final int LK_A720RUTA4 = 134;
        private static final int LK_A720CARRA4 = 135;
        private static final int LK_A720NVLO4 = 136;
        private static final int LK_A720FVLO4 = 137;
        private static final int LK_A720HVLO4 = 138;
        private static final int LK_A720FBST4 = 139;
        private static final int LK_A720CLASE4 = 140;
        private static final int LK_A720FBUSO4 = 141;
        private static final int LK_A720CARRO4 = 142;
        private static final int LK_A720NVLOO4 = 143;
        private static final int LK_A720NBDA4 = 144;
        private static final int LK_A720NADA4 = 145;
        private static final int LK_LEG4 = 146;
        private static final int LK_A720TDOC = 147;
        private static final int LK_A720TDOC_COD = 148;
        private static final int LK_A720TDOC_CON = 149;
        private static final int LK_A1672_AUDITED = 150;
        private static final int LK_A1672_MEMORAISED = 151;
        private static final int LK_A1672PREME = 152;
        private static final int LK_A2548NMEMO = 153;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA730                 ">
    private AS400DataType[] LSTA730 = new AS400DataType[1];
    private class IDX_LSTA730 {
        private static final int IT_LSTA730 = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A730                 ">
    private AS400DataType[] LS_A730 = new AS400DataType[58];
    private class IDX_LS_A730 {
        private static final int LK_A730CIA = 0;
        private static final int LK_A730FORMA = 1;
        private static final int LK_A730SERIE = 2;
        private static final int LK_A730LOHO1 = 3;
        private static final int LK_A730LOHO2 = 4;
        private static final int LK_A730LOHO3 = 5;
        private static final int LK_A730LOHO4 = 6;
        private static final int LK_A730CUPON1 = 7;
        private static final int LK_A730CUPON2 = 8;
        private static final int LK_A730CUPON3 = 9;
        private static final int LK_A730CUPON4 = 10;
        private static final int LK_A730MONREG = 11;
        private static final int LK_A730FECVTA = 12;
        private static final int LK_A730CIA720 = 13;
        private static final int LK_A730FOR720 = 14;
        private static final int LK_A730SER720 = 15;
        private static final int LK_A730SEQUEN = 16;
        private static final int LK_A730CONEX1 = 17;
        private static final int LK_A730RUTA0 = 18;
        private static final int LK_A730RUTA1 = 19;
        private static final int LK_A730CARRA1 = 20;
        private static final int LK_A730NVLO1 = 21;
        private static final int LK_A730FVLO1 = 22;
        private static final int LK_A730CLASE1 = 23;
        private static final int LK_A730FBUSO1 = 24;
        private static final int LK_A730VALOR1 = 25;
        private static final int LK_A730Q1 = 26;
        private static final int LK_A730PRRCM1 = 27;
        private static final int LK_A730CONEX2 = 28;
        private static final int LK_A730RUTA2 = 29;
        private static final int LK_A730CARRA2 = 30;
        private static final int LK_A730NVLO2 = 31;
        private static final int LK_A730FVLO2 = 32;
        private static final int LK_A730CLASE2 = 33;
        private static final int LK_A730FBUSO2 = 34;
        private static final int LK_A730VALOR2 = 35;
        private static final int LK_A730Q2 = 36;
        private static final int LK_A730PRRCM2 = 37;
        private static final int LK_A730CONEX3 = 38;
        private static final int LK_A730RUTA3 = 39;
        private static final int LK_A730CARRA3 = 40;
        private static final int LK_A730NVLO3 = 41;
        private static final int LK_A730FVLO3 = 42;
        private static final int LK_A730CLASE3 = 43;
        private static final int LK_A730FBUSO3 = 44;
        private static final int LK_A730VALOR3 = 45;
        private static final int LK_A730Q3 = 46;
        private static final int LK_A730PRRCM3 = 47;
        private static final int LK_A730CONEX4 = 48;
        private static final int LK_A730RUTA4 = 49;
        private static final int LK_A730CARRA4 = 50;
        private static final int LK_A730NVLO4 = 51;
        private static final int LK_A730FVLO4 = 52;
        private static final int LK_A730CLASE4 = 53;
        private static final int LK_A730FBUSO4 = 54;
        private static final int LK_A730VALOR4 = 55;
        private static final int LK_A730Q4 = 56;
        private static final int LK_A730PRRCM4 = 57;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA713                 ">
    private AS400DataType[] LSTA713 = new AS400DataType[1];
    private class IDX_LSTA713 {
        private static final int IT_LSTA713 = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A713                 ">
    private AS400DataType[] LS_A713 = new AS400DataType[51];
    private class IDX_LS_A713 {
        private static final int LK_A713CIA = 0;
        private static final int LK_A713FORMA = 1;
        private static final int LK_A713SERIE = 2;
        private static final int LK_A713MONREG = 3;
        private static final int LK_A713FECVTA = 4;
        private static final int LK_A713CONEX1 = 5;
        private static final int LK_A713RUTA0 = 6;
        private static final int LK_A713RUTA1 = 7;
        private static final int LK_A713CARRA1 = 8;
        private static final int LK_A713NVLO1 = 9;
        private static final int LK_A713FVLO1 = 10;
        private static final int LK_A713CLASE1 = 11;
        private static final int LK_A713FBUSO1 = 12;
        private static final int LK_A713VALOR1 = 13;
        private static final int LK_A713Q1 = 14;
        private static final int LK_A713PRRCM1 = 15;
        private static final int LK_A713CONEX2 = 16;
        private static final int LK_A713RUTA2 = 17;
        private static final int LK_A713CARRA2 = 18;
        private static final int LK_A713NVLO2 = 19;
        private static final int LK_A713FVLO2 = 20;
        private static final int LK_A713CLASE2 = 21;
        private static final int LK_A713FBUSO2 = 22;
        private static final int LK_A713VALOR2 = 23;
        private static final int LK_A713Q2 = 24;
        private static final int LK_A713PRRCM2 = 25;
        private static final int LK_A713CONEX3 = 26;
        private static final int LK_A713RUTA3 = 27;
        private static final int LK_A713CARRA3 = 28;
        private static final int LK_A713NVLO3 = 29;
        private static final int LK_A713FVLO3 = 30;
        private static final int LK_A713CLASE3 = 31;
        private static final int LK_A713FBUSO3 = 32;
        private static final int LK_A713VALOR3 = 33;
        private static final int LK_A713Q3 = 34;
        private static final int LK_A713PRRCM3 = 35;
        private static final int LK_A713CONEX4 = 36;
        private static final int LK_A713RUTA4 = 37;
        private static final int LK_A713CARRA4 = 38;
        private static final int LK_A713NVLO4 = 39;
        private static final int LK_A713FVLO4 = 40;
        private static final int LK_A713CLASE4 = 41;
        private static final int LK_A713FBUSO4 = 42;
        private static final int LK_A713VALOR4 = 43;
        private static final int LK_A713Q4 = 44;
        private static final int LK_A713PRRCM4 = 45;
        private static final int LK_A713CPUI = 46;
        private static final int LK_A713CUPON1 = 47;
        private static final int LK_A713CUPON2 = 48;
        private static final int LK_A713CUPON3 = 49;
        private static final int LK_A713CUPON4 = 50;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1721                ">
    private AS400DataType[] LSTA1721 = new AS400DataType[1];
    private class IDX_LSTA1721 {
        private static final int IT_LSTA1721 = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1721                ">
    private AS400DataType[] LS_A1721 = new AS400DataType[2];
    private class IDX_LS_A1721 {
        private static final int LK_A1721TIPO = 0;
        private static final int LK_A1721FRCA = 1;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1532                ">
    private AS400DataType[] LSTA1532 = new AS400DataType[1];
    private class IDX_LSTA1532 {
        private static final int IT_LSTA1532 = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1532                ">
    private AS400DataType[] LS_A1532 = new AS400DataType[3];
    private class IDX_LS_A1532 {
        private static final int LK_A1532CTAX = 0;
        private static final int LK_A1532MTAX = 1;
        private static final int LK_A1532VTAX = 2;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1532_I              ">
    private AS400DataType[] LSTA1532_I = new AS400DataType[1];
    private class IDX_LSTA1532_I {
        private static final int IT_LSTA1532_I = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1532_I              ">
    private AS400DataType[] LS_A1532_I = new AS400DataType[3];
    private class IDX_LS_A1532_I {
        private static final int LK_A1532CTAX = 0;
        private static final int LK_A1532MTAX = 1;
        private static final int LK_A1532VTAX = 2;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1531_CC             ">
    private AS400DataType[] LSTA1531_CC = new AS400DataType[1];
    private class IDX_LSTA1531_CC {
        private static final int IT_LSTA1531_CC = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1531_CC             ">
    private AS400DataType[] LS_A1531_CC = new AS400DataType[7];
    private class IDX_LS_A1531_CC {
        private static final int LK_A1531CFOP = 0;
        private static final int LK_A1531TFOP = 1;
        private static final int LK_A1531TTARJ = 2;
        private static final int LK_A1531VFOP = 3;
        private static final int LK_A1531MFOP = 4;
        private static final int LK_A1531NREF = 5;
        private static final int LK_A1531CAPL = 6;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1531_CA             ">
    private AS400DataType[] LSTA1531_CA = new AS400DataType[1];
    private class IDX_LSTA1531_CA {
        private static final int IT_LSTA1531_CA = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1531_CA             ">
    private AS400DataType[] LS_A1531_CA = new AS400DataType[7];
    private class IDX_LS_A1531_CA {
        private static final int LK_A1531CFOP = 0;
        private static final int LK_A1531TFOP = 1;
        private static final int LK_A1531TTARJ = 2;
        private static final int LK_A1531VFOP = 3;
        private static final int LK_A1531MFOP = 4;
        private static final int LK_A1531NREF = 5;
        private static final int LK_A1531CAPL = 6;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1531_EE             ">
    private AS400DataType[] LSTA1531_EE = new AS400DataType[1];
    private class IDX_LSTA1531_EE {
        private static final int IT_LSTA1531_EE = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1531_EE             ">
    private AS400DataType[] LS_A1531_EE = new AS400DataType[7];
    private class IDX_LS_A1531_EE {
        private static final int LK_A1531CFOP = 0;
        private static final int LK_A1531TFOP = 1;
        private static final int LK_A1531TTARJ = 2;
        private static final int LK_A1531VFOP = 3;
        private static final int LK_A1531MFOP = 4;
        private static final int LK_A1531NREF = 5;
        private static final int LK_A1531CAPL = 6;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1531_OT             ">
    private AS400DataType[] LSTA1531_OT = new AS400DataType[1];
    private class IDX_LSTA1531_OT {
        private static final int IT_LSTA1531_OT = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1531_OT             ">
    private AS400DataType[] LS_A1531_OT = new AS400DataType[7];
    private class IDX_LS_A1531_OT {
        private static final int LK_A1531CFOP = 0;
        private static final int LK_A1531TFOP = 1;
        private static final int LK_A1531TTARJ = 2;
        private static final int LK_A1531VFOP = 3;
        private static final int LK_A1531MFOP = 4;
        private static final int LK_A1531NREF = 5;
        private static final int LK_A1531CAPL = 6;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1531_RT             ">
    private AS400DataType[] LSTA1531_RT = new AS400DataType[1];
    private class IDX_LSTA1531_RT {
        private static final int IT_LSTA1531_RT = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1531_RT             ">
    private AS400DataType[] LS_A1531_RT = new AS400DataType[2];
    private class IDX_LS_A1531_RT {
        private static final int LK_A1531NREF = 0;
        private static final int LK_A1531CAPL = 1;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1692                ">
    private AS400DataType[] LSTA1692 = new AS400DataType[1];
    private class IDX_LSTA1692 {
        private static final int IT_LSTA1692 = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1692                ">
    private AS400DataType[] LS_A1692 = new AS400DataType[13];
    private class IDX_LS_A1692 {
        private static final int LK_CCIA = 0;
        private static final int LK_FORMA = 1;
        private static final int LK_SERIE = 2;
        private static final int LK_CUPON = 3;
        private static final int LK_CDEPART = 4;
        private static final int LK_CARRIVA = 5;
        private static final int LK_CARR = 6;
        private static final int LK_NFLIGHT = 7;
        private static final int LK_DFLIGHT = 8;
        private static final int LK_CLAS = 9;
        private static final int LK_FBASE = 10;
        private static final int LK_VCPN = 11;
        private static final int LK_MDACP = 12;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1818                ">
    private AS400DataType[] LSTA1818 = new AS400DataType[1];
    private class IDX_LSTA1818 {
        private static final int IT_LSTA1818 = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1818                ">
    private AS400DataType[] LS_A1818 = new AS400DataType[13];
    private class IDX_LS_A1818 {
        private static final int LK_CCIA = 0;
        private static final int LK_FORMA = 1;
        private static final int LK_SERIE = 2;
        private static final int LK_CUPON = 3;
        private static final int LK_CDEPART = 4;
        private static final int LK_CARRIVA = 5;
        private static final int LK_CARR = 6;
        private static final int LK_NFLIGHT = 7;
        private static final int LK_DFLIGHT = 8;
        private static final int LK_CLAS = 9;
        private static final int LK_FBASE = 10;
        private static final int LK_VCPN = 11;
        private static final int LK_MDACP = 12;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1200                ">
    private AS400DataType[] LSTA1200 = new AS400DataType[1];
    private class IDX_LSTA1200 {
        private static final int IT_LSTA1200 = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1200                ">
    private AS400DataType[] LS_A1200 = new AS400DataType[11];
    private class IDX_LS_A1200 {
        private static final int LK_CCIA = 0;
        private static final int LK_FORMA = 1;
        private static final int LK_SERIE = 2;
        private static final int LK_CUPON = 3;
        private static final int LK_RUTA_F = 4;
        private static final int LK_RUTA_T = 5;
        private static final int LK_CARR = 6;
        private static final int LK_DFLIGHT = 7;
        private static final int LK_FBASIS = 8;
        private static final int LK_GROSS = 9;
        private static final int LK_CURRENC = 10;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA2033                ">
    private AS400DataType[] LSTA2033 = new AS400DataType[1];
    private class IDX_LSTA2033 {
        private static final int IT_LSTA2033 = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A2033                ">
    private AS400DataType[] LS_A2033 = new AS400DataType[16];
    private class IDX_LS_A2033 {
        private static final int LK_CIA = 0;
        private static final int LK_FORMA = 1;
        private static final int LK_SERIE = 2;
        private static final int LK_CUPON = 3;
        private static final int LK_RUTA_F = 4;
        private static final int LK_RUTA_T = 5;
        private static final int LK_CARR = 6;
        private static final int LK_DFLIGHT = 7;
        private static final int LK_FBASIS = 8;
        private static final int LK_GROSS = 9;
        private static final int LK_CURRENC = 10;
        private static final int LK_TRNC = 11;
        private static final int LK_TTRAX = 12;
        private static final int LK_CORRL = 13;
        private static final int LK_ESTADO = 14;
        private static final int LK_TTRANS = 15;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTA1747                ">
    private AS400DataType[] LSTA1747 = new AS400DataType[1];
    private class IDX_LSTA1747 {
        private static final int IT_LSTA1747 = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_A1747                ">
    private AS400DataType[] LS_A1747 = new AS400DataType[13];
    private class IDX_LS_A1747 {
        private static final int LK_CCIA = 0;
        private static final int LK_FORMA = 1;
        private static final int LK_SERIE = 2;
        private static final int LK_CUPON = 3;
        private static final int LK_CDEPART = 4;
        private static final int LK_CARRIVA = 5;
        private static final int LK_CARR = 6;
        private static final int LK_NFLIGHT = 7;
        private static final int LK_DFLIGHT = 8;
        private static final int LK_CLAS = 9;
        private static final int LK_FBASE = 10;
        private static final int LK_VCPN = 11;
        private static final int LK_MDACP = 12;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Structure                     ">
    private final AS400Structure STRUC_P_OUTPUT;
    private final AS400Structure STRUC_ITMA720;
    private final AS400Structure STRUC_IT_A720;
    
    private final AS400Structure STRUC_LSTA730;
    private final AS400Structure STRUC_LS_A730;
    
    private final AS400Structure STRUC_LSTA713;
    private final AS400Structure STRUC_LS_A713;
    
    private final AS400Structure STRUC_LSTA1721;
    private final AS400Structure STRUC_LS_A1721;
    
    private final AS400Structure STRUC_LSTA1532;
    private final AS400Structure STRUC_LS_A1532;
    
    private final AS400Structure STRUC_LSTA1532_I;
    private final AS400Structure STRUC_LS_A1532_I;
    
    private final AS400Structure STRUC_LSTA1531_CC;
    private final AS400Structure STRUC_LS_A1531_CC;
    
    private final AS400Structure STRUC_LSTA1531_CA;
    private final AS400Structure STRUC_LS_A1531_CA;
    
    private final AS400Structure STRUC_LSTA1531_EE;
    private final AS400Structure STRUC_LS_A1531_EE;
    
    private final AS400Structure STRUC_LSTA1531_OT;
    private final AS400Structure STRUC_LS_A1531_OT;
    
    private final AS400Structure STRUC_LSTA1531_RT;
    private final AS400Structure STRUC_LS_A1531_RT;
    
    private final AS400Structure STRUC_LSTA1692;
    private final AS400Structure STRUC_LS_A1692;
    
    private final AS400Structure STRUC_LSTA1818;
    private final AS400Structure STRUC_LS_A1818;
    
    private final AS400Structure STRUC_LSTA1200;
    private final AS400Structure STRUC_LS_A1200;
    
    private final AS400Structure STRUC_LSTA2033;
    private final AS400Structure STRUC_LS_A2033;
    
    private final AS400Structure STRUC_LSTA1747;
    private final AS400Structure STRUC_LS_A1747;
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Mapping                       ">
    private AS400Map mapping = new AS400Map();
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Input                         ">
    public String IN_CCUST = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_SEQT = "";
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Output                        ">
    private Object[] IT_LSTA730;
    private Object[] IT_LSTA713;
    private Object[] IT_LSTA1721;
    private Object[] IT_LSTA1532;
    private Object[] IT_LSTA1532_I;
    private Object[] IT_LSTA1531_CC;
    private Object[] IT_LSTA1531_CA;
    private Object[] IT_LSTA1531_EE;
    private Object[] IT_LSTA1531_OT;
    private Object[] IT_LSTA1531_RT;
    private Object[] IT_LSTA1692;
    private Object[] IT_LSTA1818;
    private Object[] IT_LSTA1200;
    private Object[] IT_LSTA2033;
    private Object[] IT_LSTA1747;
    //</editor-fold>
    public PRO11013Linkage(String library, PRO11013Filter filter){
        IN_CCUST = filter.IN_CCUST;
        IN_CIA = filter.IN_CIA;
        IN_FORMA = filter.IN_FORMA;
        IN_SERIE = filter.IN_SERIE;
        IN_SEQT = filter.IN_SEQT;

        programPath = "/QSYS.LIB/" + library + ".LIB/PRO11013.PGM";
        //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
        P_INPUT[IDX_P_INPUT.IN_CCUST] = mapping.Char(3);
        P_INPUT[IDX_P_INPUT.IN_CIA] = mapping.Char(3);
        P_INPUT[IDX_P_INPUT.IN_FORMA] = mapping.Char(4);
        P_INPUT[IDX_P_INPUT.IN_SERIE] = mapping.Char(6);
        P_INPUT[IDX_P_INPUT.IN_SEQT] = mapping.Char(2);
        
        IT_A720[IDX_IT_A720.LK_A720CIA] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720FORMA] = mapping.Char(4);
        IT_A720[IDX_IT_A720.LK_A720SERIE] = mapping.Char(6);
        IT_A720[IDX_IT_A720.LK_A720CIAI] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720FORMAI] = mapping.Char(4);
        IT_A720[IDX_IT_A720.LK_A720SERIEI] = mapping.Char(6);
        IT_A720[IDX_IT_A720.LK_A720PNR] = mapping.Char(6);
        IT_A720[IDX_IT_A720.LK_A1530FHAST] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A1530MDA] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720AGENTE] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A720FECVTA] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A003KEY1] = mapping.Char(40);
        IT_A720[IDX_IT_A720.LK_A003PROVIN] = mapping.Char(20);
        IT_A720[IDX_IT_A720.LK_A003CIUDAD] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A1007NOMCD] = mapping.Char(30);
        IT_A720[IDX_IT_A720.LK_A720PAX] = mapping.Char(45);
        IT_A720[IDX_IT_A720.LK_A720TVENTA] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720CODIT] = mapping.Char(20);
        IT_A720[IDX_IT_A720.LK_A1530FUENT] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A1530PSVTA] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720SASI] = mapping.Char(4);
        IT_A720[IDX_IT_A720.LK_A720TICAP] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720ACCO] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720ACCD] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720ETKT] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A1530FCONT] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A1530IDCON] = mapping.Char(35);
        IT_A720[IDX_IT_A720.LK_A1530TCAMB] = mapping.Numeric(7,6);
        IT_A720[IDX_IT_A720.LK_A1530TCAMP] = mapping.Numeric(7,6);
        IT_A720[IDX_IT_A720.LK_A720TARI1] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TARI2] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TARI3] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TARI4] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TQ] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TQRV] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TARIFA] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720MONEDA] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720TRFPAG] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720MDAPAG] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720TCOM] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TCOMRV] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720MDACM] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720MDARV] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720COMMIS] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TSCM] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720MDACOM] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720ROE] = mapping.Numeric(7,6);
        IT_A720[IDX_IT_A720.LK_A720FARE] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TKVOID] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720TCAMB] = mapping.Numeric(7,6);
        IT_A720[IDX_IT_A720.LK_A720YQ1] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720YQ2] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720YQ3] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720YQ4] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720PRRCM1] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720PRRCM2] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720PRRCM3] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720PRRCM4] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720PRSCM1] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720PRSCM2] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720PRSCM3] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720PRSCM4] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720VALOR1] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720VALOR2] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720VALOR3] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720VALOR4] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720ORIGEX] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TTCOMM] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TTSCMM] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720TYQ] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720VALOL1] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720VALOL2] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720VALOL3] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720VALOL4] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LRRCM1] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LRRCM2] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LRRCM3] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LRRCM4] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LRSCM1] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LRSCM2] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LRSCM3] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LRSCM4] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LYQ1] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LYQ2] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LYQ3] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720LYQ4] = mapping.Numeric(11,2);
        IT_A720[IDX_IT_A720.LK_A720BOOKI1] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720BOOKI2] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720BOOKI3] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720BOOKI4] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720CONEX1] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720RUTA0] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720RUTA1] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720CARRA1] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720NVLO1] = mapping.Char(5);
        IT_A720[IDX_IT_A720.LK_A720FVLO1] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A720HVLO1] = mapping.Char(4);
        IT_A720[IDX_IT_A720.LK_A720FBST1] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720CLASE1] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720FBUSO1] = mapping.Char(15);
        IT_A720[IDX_IT_A720.LK_A720CARRO1] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720NVLOO1] = mapping.Char(5);
        IT_A720[IDX_IT_A720.LK_A720NBDA1] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A720NADA1] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_LEG1] = mapping.Numeric(11,0);
        IT_A720[IDX_IT_A720.LK_A720CONEX2] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720RUTA2] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720CARRA2] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720NVLO2] = mapping.Char(5);
        IT_A720[IDX_IT_A720.LK_A720FVLO2] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A720HVLO2] = mapping.Char(4);
        IT_A720[IDX_IT_A720.LK_A720FBST2] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720CLASE2] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720FBUSO2] = mapping.Char(15);
        IT_A720[IDX_IT_A720.LK_A720CARRO2] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720NVLOO2] = mapping.Char(5);
        IT_A720[IDX_IT_A720.LK_A720NBDA2] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A720NADA2] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_LEG2] = mapping.Numeric(11,0);
        IT_A720[IDX_IT_A720.LK_A720CONEX3] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720RUTA3] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720CARRA3] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720NVLO3] = mapping.Char(5);
        IT_A720[IDX_IT_A720.LK_A720FVLO3] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A720HVLO3] = mapping.Char(4);
        IT_A720[IDX_IT_A720.LK_A720FBST3] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720CLASE3] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720FBUSO3] = mapping.Char(15);
        IT_A720[IDX_IT_A720.LK_A720CARRO3] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720NVLOO3] = mapping.Char(5);
        IT_A720[IDX_IT_A720.LK_A720NBDA3] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A720NADA3] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_LEG3] = mapping.Numeric(11,0);
        IT_A720[IDX_IT_A720.LK_A720CONEX4] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720RUTA4] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720CARRA4] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720NVLO4] = mapping.Char(5);
        IT_A720[IDX_IT_A720.LK_A720FVLO4] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A720HVLO4] = mapping.Char(4);
        IT_A720[IDX_IT_A720.LK_A720FBST4] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720CLASE4] = mapping.Char(1);
        IT_A720[IDX_IT_A720.LK_A720FBUSO4] = mapping.Char(15);
        IT_A720[IDX_IT_A720.LK_A720CARRO4] = mapping.Char(2);
        IT_A720[IDX_IT_A720.LK_A720NVLOO4] = mapping.Char(5);
        IT_A720[IDX_IT_A720.LK_A720NBDA4] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_A720NADA4] = mapping.Char(8);
        IT_A720[IDX_IT_A720.LK_LEG4] = mapping.Numeric(11,0);
        IT_A720[IDX_IT_A720.LK_A720TDOC] = mapping.Char(4);
        IT_A720[IDX_IT_A720.LK_A720TDOC_COD] = mapping.Char(3);
        IT_A720[IDX_IT_A720.LK_A720TDOC_CON] = mapping.Char(100);
        IT_A720[IDX_IT_A720.LK_A1672_AUDITED] = mapping.Numeric(11,0);
        IT_A720[IDX_IT_A720.LK_A1672_MEMORAISED] = mapping.Numeric(11,0);
        IT_A720[IDX_IT_A720.LK_A1672PREME] = mapping.Char(10);
        IT_A720[IDX_IT_A720.LK_A2548NMEMO] = mapping.Char(10);
        
        LS_A730[IDX_LS_A730.LK_A730CIA] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730FORMA] = mapping.Char(4);
        LS_A730[IDX_LS_A730.LK_A730SERIE] = mapping.Char(6);
        LS_A730[IDX_LS_A730.LK_A730LOHO1] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730LOHO2] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730LOHO3] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730LOHO4] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730CUPON1] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730CUPON2] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730CUPON3] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730CUPON4] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730MONREG] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730FECVTA] = mapping.Char(8);
        LS_A730[IDX_LS_A730.LK_A730CIA720] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730FOR720] = mapping.Char(4);
        LS_A730[IDX_LS_A730.LK_A730SER720] = mapping.Char(6);
        LS_A730[IDX_LS_A730.LK_A730SEQUEN] = mapping.Char(2);
        LS_A730[IDX_LS_A730.LK_A730CONEX1] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730RUTA0] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730RUTA1] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730CARRA1] = mapping.Char(2);
        LS_A730[IDX_LS_A730.LK_A730NVLO1] = mapping.Char(5);
        LS_A730[IDX_LS_A730.LK_A730FVLO1] = mapping.Char(8);
        LS_A730[IDX_LS_A730.LK_A730CLASE1] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730FBUSO1] = mapping.Char(15);
        LS_A730[IDX_LS_A730.LK_A730VALOR1] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730Q1] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730PRRCM1] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730CONEX2] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730RUTA2] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730CARRA2] = mapping.Char(2);
        LS_A730[IDX_LS_A730.LK_A730NVLO2] = mapping.Char(5);
        LS_A730[IDX_LS_A730.LK_A730FVLO2] = mapping.Char(8);
        LS_A730[IDX_LS_A730.LK_A730CLASE2] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730FBUSO2] = mapping.Char(15);
        LS_A730[IDX_LS_A730.LK_A730VALOR2] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730Q2] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730PRRCM2] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730CONEX3] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730RUTA3] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730CARRA3] = mapping.Char(2);
        LS_A730[IDX_LS_A730.LK_A730NVLO3] = mapping.Char(5);
        LS_A730[IDX_LS_A730.LK_A730FVLO3] = mapping.Char(8);
        LS_A730[IDX_LS_A730.LK_A730CLASE3] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730FBUSO3] = mapping.Char(15);
        LS_A730[IDX_LS_A730.LK_A730VALOR3] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730Q3] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730PRRCM3] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730CONEX4] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730RUTA4] = mapping.Char(3);
        LS_A730[IDX_LS_A730.LK_A730CARRA4] = mapping.Char(2);
        LS_A730[IDX_LS_A730.LK_A730NVLO4] = mapping.Char(5);
        LS_A730[IDX_LS_A730.LK_A730FVLO4] = mapping.Char(8);
        LS_A730[IDX_LS_A730.LK_A730CLASE4] = mapping.Char(1);
        LS_A730[IDX_LS_A730.LK_A730FBUSO4] = mapping.Char(15);
        LS_A730[IDX_LS_A730.LK_A730VALOR4] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730Q4] = mapping.Numeric(11, 2);
        LS_A730[IDX_LS_A730.LK_A730PRRCM4] = mapping.Numeric(11, 2);
        
        LS_A713[IDX_LS_A713.LK_A713CIA] = mapping.Char(3);
        LS_A713[IDX_LS_A713.LK_A713FORMA] = mapping.Char(4);
        LS_A713[IDX_LS_A713.LK_A713SERIE] = mapping.Char(6);
        LS_A713[IDX_LS_A713.LK_A713MONREG] = mapping.Char(3);
        LS_A713[IDX_LS_A713.LK_A713FECVTA] = mapping.Char(8);
        LS_A713[IDX_LS_A713.LK_A713CONEX1] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713RUTA0] = mapping.Char(3);
        LS_A713[IDX_LS_A713.LK_A713RUTA1] = mapping.Char(3);
        LS_A713[IDX_LS_A713.LK_A713CARRA1] = mapping.Char(2);
        LS_A713[IDX_LS_A713.LK_A713NVLO1] = mapping.Char(5);
        LS_A713[IDX_LS_A713.LK_A713FVLO1] = mapping.Char(8);
        LS_A713[IDX_LS_A713.LK_A713CLASE1] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713FBUSO1] = mapping.Char(15);
        LS_A713[IDX_LS_A713.LK_A713VALOR1] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713Q1] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713PRRCM1] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713CONEX2] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713RUTA2] = mapping.Char(3);
        LS_A713[IDX_LS_A713.LK_A713CARRA2] = mapping.Char(2);
        LS_A713[IDX_LS_A713.LK_A713NVLO2] = mapping.Char(5);
        LS_A713[IDX_LS_A713.LK_A713FVLO2] = mapping.Char(8);
        LS_A713[IDX_LS_A713.LK_A713CLASE2] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713FBUSO2] = mapping.Char(15);
        LS_A713[IDX_LS_A713.LK_A713VALOR2] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713Q2] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713PRRCM2] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713CONEX3] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713RUTA3] = mapping.Char(3);
        LS_A713[IDX_LS_A713.LK_A713CARRA3] = mapping.Char(2);
        LS_A713[IDX_LS_A713.LK_A713NVLO3] = mapping.Char(5);
        LS_A713[IDX_LS_A713.LK_A713FVLO3] = mapping.Char(8);
        LS_A713[IDX_LS_A713.LK_A713CLASE3] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713FBUSO3] = mapping.Char(15);
        LS_A713[IDX_LS_A713.LK_A713VALOR3] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713Q3] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713PRRCM3] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713CONEX4] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713RUTA4] = mapping.Char(3);
        LS_A713[IDX_LS_A713.LK_A713CARRA4] = mapping.Char(2);
        LS_A713[IDX_LS_A713.LK_A713NVLO4] = mapping.Char(5);
        LS_A713[IDX_LS_A713.LK_A713FVLO4] = mapping.Char(8);
        LS_A713[IDX_LS_A713.LK_A713CLASE4] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713FBUSO4] = mapping.Char(15);
        LS_A713[IDX_LS_A713.LK_A713VALOR4] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713Q4] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713PRRCM4] = mapping.Numeric(11, 2);
        LS_A713[IDX_LS_A713.LK_A713CPUI] = mapping.Char(4);
        LS_A713[IDX_LS_A713.LK_A713CUPON1] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713CUPON2] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713CUPON3] = mapping.Char(1);
        LS_A713[IDX_LS_A713.LK_A713CUPON4] = mapping.Char(1);
        
        LS_A1721[IDX_LS_A1721.LK_A1721TIPO] = mapping.Char(2);
        LS_A1721[IDX_LS_A1721.LK_A1721FRCA] = mapping.Char(87);
        
        LS_A1532[IDX_LS_A1532.LK_A1532CTAX] = mapping.Char(3);
        LS_A1532[IDX_LS_A1532.LK_A1532MTAX] = mapping.Char(3);
        LS_A1532[IDX_LS_A1532.LK_A1532VTAX] = mapping.Numeric(11, 2);
        
        LS_A1532_I[IDX_LS_A1532_I.LK_A1532CTAX] = mapping.Char(3);
        LS_A1532_I[IDX_LS_A1532_I.LK_A1532MTAX] = mapping.Char(3);
        LS_A1532_I[IDX_LS_A1532_I.LK_A1532VTAX] = mapping.Numeric(11, 2);
        
        LS_A1531_CC[IDX_LS_A1531_CC.LK_A1531CFOP] = mapping.Char(2);
        LS_A1531_CC[IDX_LS_A1531_CC.LK_A1531TFOP] = mapping.Char(2);
        LS_A1531_CC[IDX_LS_A1531_CC.LK_A1531TTARJ] = mapping.Char(2);
        LS_A1531_CC[IDX_LS_A1531_CC.LK_A1531VFOP] = mapping.Numeric(11, 2);
        LS_A1531_CC[IDX_LS_A1531_CC.LK_A1531MFOP] = mapping.Char(3);
        LS_A1531_CC[IDX_LS_A1531_CC.LK_A1531NREF] = mapping.Char(19);
        LS_A1531_CC[IDX_LS_A1531_CC.LK_A1531CAPL] = mapping.Char(6);
        
        LS_A1531_CA[IDX_LS_A1531_CA.LK_A1531CFOP] = mapping.Char(2);
        LS_A1531_CA[IDX_LS_A1531_CA.LK_A1531TFOP] = mapping.Char(2);
        LS_A1531_CA[IDX_LS_A1531_CA.LK_A1531TTARJ] = mapping.Char(2);
        LS_A1531_CA[IDX_LS_A1531_CA.LK_A1531VFOP] = mapping.Numeric(11, 2);
        LS_A1531_CA[IDX_LS_A1531_CA.LK_A1531MFOP] = mapping.Char(3);
        LS_A1531_CA[IDX_LS_A1531_CA.LK_A1531NREF] = mapping.Char(19);
        LS_A1531_CA[IDX_LS_A1531_CA.LK_A1531CAPL] = mapping.Char(6);
        
        LS_A1531_EE[IDX_LS_A1531_EE.LK_A1531CFOP] = mapping.Char(2);
        LS_A1531_EE[IDX_LS_A1531_EE.LK_A1531TFOP] = mapping.Char(2);
        LS_A1531_EE[IDX_LS_A1531_EE.LK_A1531TTARJ] = mapping.Char(2);
        LS_A1531_EE[IDX_LS_A1531_EE.LK_A1531VFOP] = mapping.Numeric(11, 2);
        LS_A1531_EE[IDX_LS_A1531_EE.LK_A1531MFOP] = mapping.Char(3);
        LS_A1531_EE[IDX_LS_A1531_EE.LK_A1531NREF] = mapping.Char(19);
        LS_A1531_EE[IDX_LS_A1531_EE.LK_A1531CAPL] = mapping.Char(6);
        
        LS_A1531_OT[IDX_LS_A1531_OT.LK_A1531CFOP] = mapping.Char(2);
        LS_A1531_OT[IDX_LS_A1531_OT.LK_A1531TFOP] = mapping.Char(2);
        LS_A1531_OT[IDX_LS_A1531_OT.LK_A1531TTARJ] = mapping.Char(2);
        LS_A1531_OT[IDX_LS_A1531_OT.LK_A1531VFOP] = mapping.Numeric(11, 2);
        LS_A1531_OT[IDX_LS_A1531_OT.LK_A1531MFOP] = mapping.Char(3);
        LS_A1531_OT[IDX_LS_A1531_OT.LK_A1531NREF] = mapping.Char(19);
        LS_A1531_OT[IDX_LS_A1531_OT.LK_A1531CAPL] = mapping.Char(6);
        
        LS_A1531_RT[IDX_LS_A1531_RT.LK_A1531NREF] = mapping.Char(19);
        LS_A1531_RT[IDX_LS_A1531_RT.LK_A1531CAPL] = mapping.Char(6);
        
        LS_A1692[IDX_LS_A1692.LK_CCIA] = mapping.Char(3);
        LS_A1692[IDX_LS_A1692.LK_FORMA] = mapping.Char(4);
        LS_A1692[IDX_LS_A1692.LK_SERIE] = mapping.Char(6);
        LS_A1692[IDX_LS_A1692.LK_CUPON] = mapping.Char(1);
        LS_A1692[IDX_LS_A1692.LK_CDEPART] = mapping.Char(3);
        LS_A1692[IDX_LS_A1692.LK_CARRIVA] = mapping.Char(3);
        LS_A1692[IDX_LS_A1692.LK_CARR] = mapping.Char(2);
        LS_A1692[IDX_LS_A1692.LK_NFLIGHT] = mapping.Char(4);
        LS_A1692[IDX_LS_A1692.LK_DFLIGHT] = mapping.Char(8);
        LS_A1692[IDX_LS_A1692.LK_CLAS] = mapping.Char(1);
        LS_A1692[IDX_LS_A1692.LK_FBASE] = mapping.Char(15);
        LS_A1692[IDX_LS_A1692.LK_VCPN] = mapping.Numeric(11, 2);
        LS_A1692[IDX_LS_A1692.LK_MDACP] = mapping.Char(3);
        
        LS_A1818[IDX_LS_A1818.LK_CCIA] = mapping.Char(3);
        LS_A1818[IDX_LS_A1818.LK_FORMA] = mapping.Char(4);
        LS_A1818[IDX_LS_A1818.LK_SERIE] = mapping.Char(6);
        LS_A1818[IDX_LS_A1818.LK_CUPON] = mapping.Char(1);
        LS_A1818[IDX_LS_A1818.LK_CDEPART] = mapping.Char(3);
        LS_A1818[IDX_LS_A1818.LK_CARRIVA] = mapping.Char(3);
        LS_A1818[IDX_LS_A1818.LK_CARR] = mapping.Char(2);
        LS_A1818[IDX_LS_A1818.LK_NFLIGHT] = mapping.Char(4);
        LS_A1818[IDX_LS_A1818.LK_DFLIGHT] = mapping.Char(8);
        LS_A1818[IDX_LS_A1818.LK_CLAS] = mapping.Char(1);
        LS_A1818[IDX_LS_A1818.LK_FBASE] = mapping.Char(15);
        LS_A1818[IDX_LS_A1818.LK_VCPN] = mapping.Numeric(11, 2);
        LS_A1818[IDX_LS_A1818.LK_MDACP] = mapping.Char(3);
        
        LS_A1200[IDX_LS_A1200.LK_CCIA] = mapping.Char(3);
        LS_A1200[IDX_LS_A1200.LK_FORMA] = mapping.Char(4);
        LS_A1200[IDX_LS_A1200.LK_SERIE] = mapping.Char(6);
        LS_A1200[IDX_LS_A1200.LK_CUPON] = mapping.Char(1);
        LS_A1200[IDX_LS_A1200.LK_RUTA_F] = mapping.Char(3);
        LS_A1200[IDX_LS_A1200.LK_RUTA_T] = mapping.Char(3);
        LS_A1200[IDX_LS_A1200.LK_CARR] = mapping.Char(2);
        LS_A1200[IDX_LS_A1200.LK_DFLIGHT] = mapping.Char(8);
        LS_A1200[IDX_LS_A1200.LK_FBASIS] = mapping.Char(15);
        LS_A1200[IDX_LS_A1200.LK_GROSS] = mapping.Numeric(11, 2);
        LS_A1200[IDX_LS_A1200.LK_CURRENC] = mapping.Char(3);
        
        LS_A2033[IDX_LS_A2033.LK_CIA] = mapping.Char(3);
        LS_A2033[IDX_LS_A2033.LK_FORMA] = mapping.Char(4);
        LS_A2033[IDX_LS_A2033.LK_SERIE] = mapping.Char(6);
        LS_A2033[IDX_LS_A2033.LK_CUPON] = mapping.Char(1);
        LS_A2033[IDX_LS_A2033.LK_RUTA_F] = mapping.Char(3);
        LS_A2033[IDX_LS_A2033.LK_RUTA_T] = mapping.Char(3);
        LS_A2033[IDX_LS_A2033.LK_CARR] = mapping.Char(2);
        LS_A2033[IDX_LS_A2033.LK_DFLIGHT] = mapping.Char(8);
        LS_A2033[IDX_LS_A2033.LK_FBASIS] = mapping.Char(15);
        LS_A2033[IDX_LS_A2033.LK_GROSS] = mapping.Numeric(11, 2);
        LS_A2033[IDX_LS_A2033.LK_CURRENC] = mapping.Char(3);
        LS_A2033[IDX_LS_A2033.LK_TRNC] = mapping.Char(4);
        LS_A2033[IDX_LS_A2033.LK_TTRAX] = mapping.Numeric(1, 0);
        LS_A2033[IDX_LS_A2033.LK_CORRL] = mapping.Numeric(2, 0);
        LS_A2033[IDX_LS_A2033.LK_ESTADO] = mapping.Char(3);
        LS_A2033[IDX_LS_A2033.LK_TTRANS] = mapping.Numeric(1, 0);
        
        LS_A1747[IDX_LS_A1747.LK_CCIA] = mapping.Char(3);
        LS_A1747[IDX_LS_A1747.LK_FORMA] = mapping.Char(4);
        LS_A1747[IDX_LS_A1747.LK_SERIE] = mapping.Char(6);
        LS_A1747[IDX_LS_A1747.LK_CUPON] = mapping.Char(1);
        LS_A1747[IDX_LS_A1747.LK_CDEPART] = mapping.Char(3);
        LS_A1747[IDX_LS_A1747.LK_CARRIVA] = mapping.Char(3);
        LS_A1747[IDX_LS_A1747.LK_CARR] = mapping.Char(2);
        LS_A1747[IDX_LS_A1747.LK_NFLIGHT] = mapping.Char(5);
        LS_A1747[IDX_LS_A1747.LK_DFLIGHT] = mapping.Char(8);
        LS_A1747[IDX_LS_A1747.LK_CLAS] = mapping.Char(1);
        LS_A1747[IDX_LS_A1747.LK_FBASE] = mapping.Char(15);
        LS_A1747[IDX_LS_A1747.LK_VCPN] = mapping.Numeric(11, 2);
        LS_A1747[IDX_LS_A1747.LK_MDACP] = mapping.Char(3);
        
        ITMA720[IDX_ITMA720.IT_A720] = mapping.Char(mapping.GetDimension(IT_A720));
        LSTA730[IDX_LSTA730.IT_LSTA730] = mapping.Char(mapping.GetDimension(LS_A730));
        LSTA713[IDX_LSTA713.IT_LSTA713] = mapping.Char(mapping.GetDimension(LS_A713));
        LSTA1721[IDX_LSTA1721.IT_LSTA1721] = mapping.Char(mapping.GetDimension(LS_A1721));
        LSTA1532[IDX_LSTA1532.IT_LSTA1532] = mapping.Char(mapping.GetDimension(LS_A1532));
        LSTA1532_I[IDX_LSTA1532_I.IT_LSTA1532_I] = mapping.Char(mapping.GetDimension(LS_A1532_I));
        LSTA1531_CC[IDX_LSTA1531_CC.IT_LSTA1531_CC] = mapping.Char(mapping.GetDimension(LS_A1531_CC));
        LSTA1531_CA[IDX_LSTA1531_CA.IT_LSTA1531_CA] = mapping.Char(mapping.GetDimension(LS_A1531_CA));
        LSTA1531_EE[IDX_LSTA1531_EE.IT_LSTA1531_EE] = mapping.Char(mapping.GetDimension(LS_A1531_EE));
        LSTA1531_OT[IDX_LSTA1531_OT.IT_LSTA1531_OT] = mapping.Char(mapping.GetDimension(LS_A1531_OT));
        LSTA1531_RT[IDX_LSTA1531_RT.IT_LSTA1531_RT] = mapping.Char(mapping.GetDimension(LS_A1531_RT));
        LSTA1692[IDX_LSTA1692.IT_LSTA1692] = mapping.Char(mapping.GetDimension(LS_A1692));
        LSTA1818[IDX_LSTA1818.IT_LSTA1818] = mapping.Char(mapping.GetDimension(LS_A1818));
        LSTA1200[IDX_LSTA1200.IT_LSTA1200] = mapping.Char(mapping.GetDimension(LS_A1200));
        LSTA2033[IDX_LSTA2033.IT_LSTA2033] = mapping.Char(mapping.GetDimension(LS_A2033));
        LSTA1747[IDX_LSTA1747.IT_LSTA1747] = mapping.Char(mapping.GetDimension(LS_A1747));
        
        P_OUTPUT[IDX_P_OUTPUT.ITMA720] = mapping.Char(mapping.GetDimension(ITMA720));
        P_OUTPUT[IDX_P_OUTPUT.LSTA730] = mapping.Occurs(LSTA730[IDX_LSTA730.IT_LSTA730], 20);
        P_OUTPUT[IDX_P_OUTPUT.LSTA713] = mapping.Occurs(LSTA713[IDX_LSTA713.IT_LSTA713], 20);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1721] = mapping.Occurs(LSTA1721[IDX_LSTA1721.IT_LSTA1721], 10);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1532] = mapping.Occurs(LSTA1532[IDX_LSTA1532.IT_LSTA1532], 20);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1532_I] = mapping.Occurs(LSTA1532_I[IDX_LSTA1532_I.IT_LSTA1532_I], 20);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1531_CC] = mapping.Occurs(LSTA1531_CC[IDX_LSTA1531_CC.IT_LSTA1531_CC], 10);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1531_CA] = mapping.Occurs(LSTA1531_CA[IDX_LSTA1531_CA.IT_LSTA1531_CA], 10);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1531_EE] = mapping.Occurs(LSTA1531_EE[IDX_LSTA1531_EE.IT_LSTA1531_EE], 10);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1531_OT] = mapping.Occurs(LSTA1531_OT[IDX_LSTA1531_OT.IT_LSTA1531_OT], 10);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1531_RT] = mapping.Occurs(LSTA1531_RT[IDX_LSTA1531_RT.IT_LSTA1531_RT], 10);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1692] = mapping.Occurs(LSTA1692[IDX_LSTA1692.IT_LSTA1692], 20);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1818] = mapping.Occurs(LSTA1818[IDX_LSTA1818.IT_LSTA1818], 20);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1200] = mapping.Occurs(LSTA1200[IDX_LSTA1200.IT_LSTA1200], 20);
        P_OUTPUT[IDX_P_OUTPUT.LSTA2033] = mapping.Occurs(LSTA2033[IDX_LSTA2033.IT_LSTA2033], 20);
        P_OUTPUT[IDX_P_OUTPUT.LSTA1747] = mapping.Occurs(LSTA1747[IDX_LSTA1747.IT_LSTA1747], 20);
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="{...} Structure">
        STRUC_P_OUTPUT = new AS400Structure(P_OUTPUT);
        STRUC_ITMA720 = new AS400Structure(ITMA720);
        STRUC_IT_A720 = new AS400Structure(IT_A720);
        
        STRUC_LSTA730 = new AS400Structure(LSTA730);
        STRUC_LS_A730 = new AS400Structure(LS_A730);
        
        STRUC_LSTA713 = new AS400Structure(LSTA713);
        STRUC_LS_A713 = new AS400Structure(LS_A713);
        
        STRUC_LSTA1721 = new AS400Structure(LSTA1721);
        STRUC_LS_A1721 = new AS400Structure(LS_A1721);
        
        STRUC_LSTA1532 = new AS400Structure(LSTA1532);
        STRUC_LS_A1532 = new AS400Structure(LS_A1532);
        
        STRUC_LSTA1532_I = new AS400Structure(LSTA1532_I);
        STRUC_LS_A1532_I = new AS400Structure(LS_A1532_I);
        
        STRUC_LSTA1531_CC = new AS400Structure(LSTA1531_CC);
        STRUC_LS_A1531_CC = new AS400Structure(LS_A1531_CC);
        
        STRUC_LSTA1531_CA = new AS400Structure(LSTA1531_CA);
        STRUC_LS_A1531_CA = new AS400Structure(LS_A1531_CA);
        
        STRUC_LSTA1531_EE = new AS400Structure(LSTA1531_EE);
        STRUC_LS_A1531_EE = new AS400Structure(LS_A1531_EE);
        
        STRUC_LSTA1531_OT = new AS400Structure(LSTA1531_OT);
        STRUC_LS_A1531_OT = new AS400Structure(LS_A1531_OT);
        
        STRUC_LSTA1531_RT = new AS400Structure(LSTA1531_RT);
        STRUC_LS_A1531_RT = new AS400Structure(LS_A1531_RT);
        
        STRUC_LSTA1692 = new AS400Structure(LSTA1692);
        STRUC_LS_A1692 = new AS400Structure(LS_A1692);
        
        STRUC_LSTA1818 = new AS400Structure(LSTA1818);
        STRUC_LS_A1818 = new AS400Structure(LS_A1818);
        
        STRUC_LSTA1200 = new AS400Structure(LSTA1200);
        STRUC_LS_A1200 = new AS400Structure(LS_A1200);
        
        STRUC_LSTA2033 = new AS400Structure(LSTA2033);
        STRUC_LS_A2033 = new AS400Structure(LS_A2033);
        
        STRUC_LSTA1747 = new AS400Structure(LSTA1747);
        STRUC_LS_A1747 = new AS400Structure(LS_A1747);
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="{...} Parameters">
        parameterList = new ProgramParameter[2];
        parameterList[0] = new ProgramParameter(P_INPUT());
        parameterList[1] = new ProgramParameter(mapping.GetDimension(P_OUTPUT));
        //</editor-fold>
    }
    
    private byte[] P_INPUT(){
        String data = StringUtils.rightPad(IN_CCUST, P_INPUT[IDX_P_INPUT.IN_CCUST].getByteLength()) +
                StringUtils.rightPad(IN_CIA, P_INPUT[IDX_P_INPUT.IN_CIA].getByteLength()) +
                StringUtils.rightPad(IN_FORMA, P_INPUT[IDX_P_INPUT.IN_FORMA].getByteLength()) +
                StringUtils.rightPad(IN_SERIE, P_INPUT[IDX_P_INPUT.IN_SERIE].getByteLength()) +
                StringUtils.leftPad(IN_SEQT, P_INPUT[IDX_P_INPUT.IN_SEQT].getByteLength(), "0");
        return mapping.Char(mapping.GetDimension(P_INPUT)).toBytes(data);
    }
    
    private void P_OUTPUT() throws Exception {
        //<editor-fold defaultstate="collapsed" desc="{...} Map">
        PRO11013Filter filterItem = new PRO11013Filter();
        
        Object[] N01_P_OUTPUT = (Object[])STRUC_P_OUTPUT.toObject(parameterList[1].getOutputData(), 0);
//        Object[] N02_ITMA720 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.ITMA720];
        Object[] N02_ITMA720 = (Object[])STRUC_ITMA720.toObject(ITMA720[IDX_ITMA720.IT_A720].toBytes(N01_P_OUTPUT[IDX_P_OUTPUT.ITMA720]), 0);
        Object[] N03_IT_A720;
        
        String strIT_A720 = mapping.getString(N02_ITMA720[IDX_ITMA720.IT_A720]).trim();
        if(!strIT_A720.isEmpty()){
            N03_IT_A720 = (Object[])STRUC_IT_A720.toObject(ITMA720[IDX_ITMA720.IT_A720].toBytes(N02_ITMA720[IDX_ITMA720.IT_A720]), 0);
            filterItem.LK_A720CIA = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CIA]).trim();
            filterItem.LK_A720FORMA = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FORMA]).trim();
            filterItem.LK_A720SERIE = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720SERIE]).trim();
            filterItem.LK_A720CIAI = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CIAI]).trim();
            filterItem.LK_A720FORMAI = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FORMAI]).trim();
            filterItem.LK_A720SERIEI = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720SERIEI]).trim();
            filterItem.LK_A720PNR = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720PNR]).trim();
            filterItem.LK_A1530FHAST = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A1530FHAST]).trim();
            filterItem.LK_A1530MDA = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A1530MDA]).trim();
            filterItem.LK_A720AGENTE = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720AGENTE]).trim();
            filterItem.LK_A720FECVTA = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FECVTA]).trim();
            filterItem.LK_A003KEY1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A003KEY1]).trim();
            filterItem.LK_A003PROVIN = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A003PROVIN]).trim();
            filterItem.LK_A003CIUDAD = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A003CIUDAD]).trim();
            filterItem.LK_A1007NOMCD = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A1007NOMCD]).trim();
            filterItem.LK_A720PAX = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720PAX]).trim();
            filterItem.LK_A720TVENTA = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720TVENTA]).trim();
            filterItem.LK_A720CODIT = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CODIT]).trim();
            filterItem.LK_A1530FUENT = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A1530FUENT]).trim();
            filterItem.LK_A1530PSVTA = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A1530PSVTA]).trim();
            filterItem.LK_A720SASI = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720SASI]).trim();
            filterItem.LK_A720TICAP = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720TICAP]).trim();
            filterItem.LK_A720ACCO = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720ACCO]).trim();
            filterItem.LK_A720ACCD = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720ACCD]).trim();
            filterItem.LK_A720ETKT = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720ETKT]).trim();
            filterItem.LK_A1530FCONT = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A1530FCONT]).trim();
            filterItem.LK_A1530IDCON = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A1530IDCON]).trim();
            filterItem.LK_A1530TCAMB = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A1530TCAMB]);
            filterItem.LK_A1530TCAMP = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A1530TCAMP]);
            filterItem.LK_A720TARI1 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TARI1]);
            filterItem.LK_A720TARI2 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TARI2]);
            filterItem.LK_A720TARI3 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TARI3]);
            filterItem.LK_A720TARI4 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TARI4]);
            filterItem.LK_A720TQ = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TQ]);
            filterItem.LK_A720TQRV = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TQRV]);
            filterItem.LK_A720TARIFA = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TARIFA]);
            filterItem.LK_A720MONEDA = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720MONEDA]).trim();
            filterItem.LK_A720TRFPAG = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TRFPAG]);
            filterItem.LK_A720MDAPAG = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720MDAPAG]).trim();
            filterItem.LK_A720TCOM = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TCOM]);
            filterItem.LK_A720TCOMRV = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TCOMRV]);
            filterItem.LK_A720MDACM = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720MDACM]).trim();
            filterItem.LK_A720MDARV = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720MDARV]).trim();
            filterItem.LK_A720COMMIS = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720COMMIS]);
            filterItem.LK_A720TSCM = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TSCM]);
            filterItem.LK_A720MDACOM = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720MDACOM]).trim();
            filterItem.LK_A720ROE = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720ROE]);
            filterItem.LK_A720FARE = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720FARE]);
            filterItem.LK_A720TKVOID = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720TKVOID]).trim();
            filterItem.LK_A720TCAMB = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TCAMB]);
            filterItem.LK_A720YQ1 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720YQ1]);
            filterItem.LK_A720YQ2 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720YQ2]);
            filterItem.LK_A720YQ3 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720YQ3]);
            filterItem.LK_A720YQ4 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720YQ4]);
            filterItem.LK_A720PRRCM1 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720PRRCM1]);
            filterItem.LK_A720PRRCM2 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720PRRCM2]);
            filterItem.LK_A720PRRCM3 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720PRRCM3]);
            filterItem.LK_A720PRRCM4 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720PRRCM4]);
            filterItem.LK_A720PRSCM1 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720PRSCM1]);
            filterItem.LK_A720PRSCM2 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720PRSCM2]);
            filterItem.LK_A720PRSCM3 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720PRSCM3]);
            filterItem.LK_A720PRSCM4 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720PRSCM4]);
            filterItem.LK_A720VALOR1 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720VALOR1]);
            filterItem.LK_A720VALOR2 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720VALOR2]);
            filterItem.LK_A720VALOR3 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720VALOR3]);
            filterItem.LK_A720VALOR4 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720VALOR4]);
            filterItem.LK_A720ORIGEX = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720ORIGEX]);
            filterItem.LK_A720TTCOMM = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TTCOMM]);
            filterItem.LK_A720TTSCMM = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TTSCMM]);
            filterItem.LK_A720TYQ = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720TYQ]);
            filterItem.LK_A720VALOL1 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720VALOL1]);
            filterItem.LK_A720VALOL2 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720VALOL2]);
            filterItem.LK_A720VALOL3 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720VALOL3]);
            filterItem.LK_A720VALOL4 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720VALOL4]);
            filterItem.LK_A720LRRCM1 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LRRCM1]);
            filterItem.LK_A720LRRCM2 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LRRCM2]);
            filterItem.LK_A720LRRCM3 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LRRCM3]);
            filterItem.LK_A720LRRCM4 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LRRCM4]);
            filterItem.LK_A720LRSCM1 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LRSCM1]);
            filterItem.LK_A720LRSCM2 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LRSCM2]);
            filterItem.LK_A720LRSCM3 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LRSCM3]);
            filterItem.LK_A720LRSCM4 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LRSCM4]);
            filterItem.LK_A720LYQ1 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LYQ1]);
            filterItem.LK_A720LYQ2 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LYQ2]);
            filterItem.LK_A720LYQ3 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LYQ3]);
            filterItem.LK_A720LYQ4 = mapping.getDouble(N03_IT_A720[IDX_IT_A720.LK_A720LYQ4]);
            filterItem.LK_A720BOOKI1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720BOOKI1]).trim();
            filterItem.LK_A720BOOKI2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720BOOKI2]).trim();
            filterItem.LK_A720BOOKI3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720BOOKI3]).trim();
            filterItem.LK_A720BOOKI4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720BOOKI4]).trim();
            filterItem.LK_A720CONEX1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CONEX1]).trim();
            filterItem.LK_A720RUTA0 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720RUTA0]).trim();
            filterItem.LK_A720RUTA1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720RUTA1]).trim();
            filterItem.LK_A720CARRA1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CARRA1]).trim();
            filterItem.LK_A720NVLO1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NVLO1]).trim();
            filterItem.LK_A720FVLO1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FVLO1]).trim();
            filterItem.LK_A720HVLO1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720HVLO1]).trim();
            filterItem.LK_A720FBST1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FBST1]).trim();
            filterItem.LK_A720CLASE1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CLASE1]).trim();
            filterItem.LK_A720FBUSO1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FBUSO1]).trim();
            filterItem.LK_A720CARRO1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CARRO1]).trim();
            filterItem.LK_A720NVLOO1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NVLOO1]).trim();
            filterItem.LK_A720NBDA1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NBDA1]).trim();
            filterItem.LK_A720NADA1 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NADA1]).trim();
            filterItem.LK_LEG1 = mapping.getInt(N03_IT_A720[IDX_IT_A720.LK_LEG1]);
            filterItem.LK_A720CONEX2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CONEX2]).trim();
            filterItem.LK_A720RUTA2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720RUTA2]).trim();
            filterItem.LK_A720CARRA2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CARRA2]).trim();
            filterItem.LK_A720NVLO2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NVLO2]).trim();
            filterItem.LK_A720FVLO2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FVLO2]).trim();
            filterItem.LK_A720HVLO2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720HVLO2]).trim();
            filterItem.LK_A720FBST2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FBST2]).trim();
            filterItem.LK_A720CLASE2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CLASE2]).trim();
            filterItem.LK_A720FBUSO2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FBUSO2]).trim();
            filterItem.LK_A720CARRO2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CARRO2]).trim();
            filterItem.LK_A720NVLOO2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NVLOO2]).trim();
            filterItem.LK_A720NBDA2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NBDA2]).trim();
            filterItem.LK_A720NADA2 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NADA2]).trim();
            filterItem.LK_LEG2 = mapping.getInt(N03_IT_A720[IDX_IT_A720.LK_LEG2]);
            filterItem.LK_A720CONEX3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CONEX3]).trim();
            filterItem.LK_A720RUTA3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720RUTA3]).trim();
            filterItem.LK_A720CARRA3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CARRA3]).trim();
            filterItem.LK_A720NVLO3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NVLO3]).trim();
            filterItem.LK_A720FVLO3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FVLO3]).trim();
            filterItem.LK_A720HVLO3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720HVLO3]).trim();
            filterItem.LK_A720FBST3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FBST3]).trim();
            filterItem.LK_A720CLASE3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CLASE3]).trim();
            filterItem.LK_A720FBUSO3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FBUSO3]).trim();
            filterItem.LK_A720CARRO3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CARRO3]).trim();
            filterItem.LK_A720NVLOO3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NVLOO3]).trim();
            filterItem.LK_A720NBDA3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NBDA3]).trim();
            filterItem.LK_A720NADA3 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NADA3]).trim();
            filterItem.LK_LEG3 = mapping.getInt(N03_IT_A720[IDX_IT_A720.LK_LEG3]);
            filterItem.LK_A720CONEX4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CONEX4]).trim();
            filterItem.LK_A720RUTA4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720RUTA4]).trim();
            filterItem.LK_A720CARRA4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CARRA4]).trim();
            filterItem.LK_A720NVLO4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NVLO4]).trim();
            filterItem.LK_A720FVLO4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FVLO4]).trim();
            filterItem.LK_A720HVLO4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720HVLO4]).trim();
            filterItem.LK_A720FBST4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FBST4]).trim();
            filterItem.LK_A720CLASE4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CLASE4]).trim();
            filterItem.LK_A720FBUSO4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720FBUSO4]).trim();
            filterItem.LK_A720CARRO4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720CARRO4]).trim();
            filterItem.LK_A720NVLOO4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NVLOO4]).trim();
            filterItem.LK_A720NBDA4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NBDA4]).trim();
            filterItem.LK_A720NADA4 = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720NADA4]).trim();
            filterItem.LK_LEG4 = mapping.getInt(N03_IT_A720[IDX_IT_A720.LK_LEG4]);
            filterItem.LK_A720TDOC = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720TDOC]).trim();
            filterItem.LK_A720TDOC_COD = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720TDOC_COD]).trim();
            filterItem.LK_A720TDOC_CON = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A720TDOC_CON]).trim();
            filterItem.LK_A1672_AUDITED = mapping.getInt(N03_IT_A720[IDX_IT_A720.LK_A1672_AUDITED]);
            filterItem.LK_A1672_MEMORAISED = mapping.getInt(N03_IT_A720[IDX_IT_A720.LK_A1672_MEMORAISED]);
            filterItem.LK_A1672PREME = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A1672PREME]).trim();
            filterItem.LK_A2548NMEMO = mapping.getString(N03_IT_A720[IDX_IT_A720.LK_A2548NMEMO]).trim();
        }
        PRO11013Filter.LSTA730 ITEM_LSTA730;
        Object[] N02_LSTA730 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA730];
        Object[] N03_ITEM_A730;
        String LK_A730CIA;
        for (Object N02_LSTA730_OBJ : N02_LSTA730) {
            IT_LSTA730 = (Object[]) STRUC_LSTA730.toObject(LSTA730[IDX_LSTA730.IT_LSTA730].toBytes(N02_LSTA730_OBJ), 0);
            LK_A730CIA = mapping.getString(IT_LSTA730[IDX_LSTA730.IT_LSTA730]).substring(0, 3).trim();
            if(!LK_A730CIA.isEmpty()){
                N03_ITEM_A730 = (Object[]) STRUC_LS_A730.toObject(LSTA730[IDX_LSTA730.IT_LSTA730].toBytes(N02_LSTA730_OBJ), 0);
                ITEM_LSTA730 = filterItem.new LSTA730();
                ITEM_LSTA730.LK_A730CIA = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CIA]).trim();
                ITEM_LSTA730.LK_A730FORMA = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FORMA]).trim();
                ITEM_LSTA730.LK_A730SERIE = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730SERIE]).trim();
                ITEM_LSTA730.LK_A730LOHO1 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730LOHO1]).trim();
                ITEM_LSTA730.LK_A730LOHO2 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730LOHO2]).trim();
                ITEM_LSTA730.LK_A730LOHO3 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730LOHO3]).trim();
                ITEM_LSTA730.LK_A730LOHO4 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730LOHO4]).trim();
                ITEM_LSTA730.LK_A730CUPON1 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CUPON1]).trim();
                ITEM_LSTA730.LK_A730CUPON2 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CUPON2]).trim();
                ITEM_LSTA730.LK_A730CUPON3 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CUPON3]).trim();
                ITEM_LSTA730.LK_A730CUPON4 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CUPON4]).trim();
                ITEM_LSTA730.LK_A730MONREG = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730MONREG]).trim();
                ITEM_LSTA730.LK_A730FECVTA = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FECVTA]).trim();
                ITEM_LSTA730.LK_A730CIA720 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CIA720]).trim();
                ITEM_LSTA730.LK_A730FOR720 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FOR720]).trim();
                ITEM_LSTA730.LK_A730SER720 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730SER720]).trim();
                ITEM_LSTA730.LK_A730SEQUEN = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730SEQUEN]).trim();
                ITEM_LSTA730.LK_A730CONEX1 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CONEX1]).trim();
                ITEM_LSTA730.LK_A730RUTA0 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730RUTA0]).trim();
                ITEM_LSTA730.LK_A730RUTA1 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730RUTA1]).trim();
                ITEM_LSTA730.LK_A730CARRA1 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CARRA1]).trim();
                ITEM_LSTA730.LK_A730NVLO1 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730NVLO1]).trim();
                ITEM_LSTA730.LK_A730FVLO1 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FVLO1]).trim();
                ITEM_LSTA730.LK_A730CLASE1 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CLASE1]).trim();
                ITEM_LSTA730.LK_A730FBUSO1 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FBUSO1]).trim();
                ITEM_LSTA730.LK_A730VALOR1 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730VALOR1]);
                ITEM_LSTA730.LK_A730Q1 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730Q1]);
                ITEM_LSTA730.LK_A730PRRCM1 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730PRRCM1]);
                ITEM_LSTA730.LK_A730CONEX2 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CONEX2]).trim();
                ITEM_LSTA730.LK_A730RUTA2 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730RUTA2]).trim();
                ITEM_LSTA730.LK_A730CARRA2 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CARRA2]).trim();
                ITEM_LSTA730.LK_A730NVLO2 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730NVLO2]).trim();
                ITEM_LSTA730.LK_A730FVLO2 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FVLO2]).trim();
                ITEM_LSTA730.LK_A730CLASE2 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CLASE2]).trim();
                ITEM_LSTA730.LK_A730FBUSO2 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FBUSO2]).trim();
                ITEM_LSTA730.LK_A730VALOR2 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730VALOR2]);
                ITEM_LSTA730.LK_A730Q2 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730Q2]);
                ITEM_LSTA730.LK_A730PRRCM2 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730PRRCM2]);
                ITEM_LSTA730.LK_A730CONEX3 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CONEX3]).trim();
                ITEM_LSTA730.LK_A730RUTA3 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730RUTA3]).trim();
                ITEM_LSTA730.LK_A730CARRA3 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CARRA3]).trim();
                ITEM_LSTA730.LK_A730NVLO3 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730NVLO3]).trim();
                ITEM_LSTA730.LK_A730FVLO3 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FVLO3]).trim();
                ITEM_LSTA730.LK_A730CLASE3 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CLASE3]).trim();
                ITEM_LSTA730.LK_A730FBUSO3 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FBUSO3]).trim();
                ITEM_LSTA730.LK_A730VALOR3 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730VALOR3]);
                ITEM_LSTA730.LK_A730Q3 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730Q3]);
                ITEM_LSTA730.LK_A730PRRCM3 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730PRRCM3]);
                ITEM_LSTA730.LK_A730CONEX4 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CONEX4]).trim();
                ITEM_LSTA730.LK_A730RUTA4 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730RUTA4]).trim();
                ITEM_LSTA730.LK_A730CARRA4 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CARRA4]).trim();
                ITEM_LSTA730.LK_A730NVLO4 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730NVLO4]).trim();
                ITEM_LSTA730.LK_A730FVLO4 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FVLO4]).trim();
                ITEM_LSTA730.LK_A730CLASE4 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730CLASE4]).trim();
                ITEM_LSTA730.LK_A730FBUSO4 = mapping.getString(N03_ITEM_A730[IDX_LS_A730.LK_A730FBUSO4]).trim();
                ITEM_LSTA730.LK_A730VALOR4 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730VALOR4]);
                ITEM_LSTA730.LK_A730Q4 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730Q4]);
                ITEM_LSTA730.LK_A730PRRCM4 = mapping.getDouble(N03_ITEM_A730[IDX_LS_A730.LK_A730PRRCM4]);
                filterItem.LS_A730.add(ITEM_LSTA730);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA713 ITEM_LSTA713;
        Object[] N02_LSTA713 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA713];
        Object[] N03_ITEM_A713;
        String LK_A713CIA;
        for (Object N02_LSTA713_OBJ : N02_LSTA713) {
            IT_LSTA713 = (Object[]) STRUC_LSTA713.toObject(LSTA713[IDX_LSTA713.IT_LSTA713].toBytes(N02_LSTA713_OBJ), 0);
            LK_A713CIA = mapping.getString(IT_LSTA713[IDX_LSTA713.IT_LSTA713]).substring(0, 3).trim();
            if(!LK_A713CIA.isEmpty()){
                N03_ITEM_A713 = (Object[]) STRUC_LS_A713.toObject(LSTA713[IDX_LSTA713.IT_LSTA713].toBytes(N02_LSTA713_OBJ), 0);
                ITEM_LSTA713 = filterItem.new LSTA713();
                ITEM_LSTA713.LK_A713CIA = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CIA]).trim();
                ITEM_LSTA713.LK_A713FORMA = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FORMA]).trim();
                ITEM_LSTA713.LK_A713SERIE = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713SERIE]).trim();
                ITEM_LSTA713.LK_A713MONREG = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713MONREG]).trim();
                ITEM_LSTA713.LK_A713FECVTA = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FECVTA]).trim();
                ITEM_LSTA713.LK_A713CONEX1 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CONEX1]).trim();
                ITEM_LSTA713.LK_A713RUTA0 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713RUTA0]).trim();
                ITEM_LSTA713.LK_A713RUTA1 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713RUTA1]).trim();
                ITEM_LSTA713.LK_A713CARRA1 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CARRA1]).trim();
                ITEM_LSTA713.LK_A713NVLO1 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713NVLO1]).trim();
                ITEM_LSTA713.LK_A713FVLO1 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FVLO1]).trim();
                ITEM_LSTA713.LK_A713CLASE1 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CLASE1]).trim();
                ITEM_LSTA713.LK_A713FBUSO1 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FBUSO1]).trim();
                ITEM_LSTA713.LK_A713VALOR1 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713VALOR1]);
                ITEM_LSTA713.LK_A713Q1 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713Q1]);
                ITEM_LSTA713.LK_A713PRRCM1 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713PRRCM1]);
                ITEM_LSTA713.LK_A713CONEX2 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CONEX2]).trim();
                ITEM_LSTA713.LK_A713RUTA2 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713RUTA2]).trim();
                ITEM_LSTA713.LK_A713CARRA2 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CARRA2]).trim();
                ITEM_LSTA713.LK_A713NVLO2 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713NVLO2]).trim();
                ITEM_LSTA713.LK_A713FVLO2 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FVLO2]).trim();
                ITEM_LSTA713.LK_A713CLASE2 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CLASE2]).trim();
                ITEM_LSTA713.LK_A713FBUSO2 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FBUSO2]).trim();
                ITEM_LSTA713.LK_A713VALOR2 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713VALOR2]);
                ITEM_LSTA713.LK_A713Q2 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713Q2]);
                ITEM_LSTA713.LK_A713PRRCM2 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713PRRCM2]);
                ITEM_LSTA713.LK_A713CONEX3 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CONEX3]).trim();
                ITEM_LSTA713.LK_A713RUTA3 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713RUTA3]).trim();
                ITEM_LSTA713.LK_A713CARRA3 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CARRA3]).trim();
                ITEM_LSTA713.LK_A713NVLO3 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713NVLO3]).trim();
                ITEM_LSTA713.LK_A713FVLO3 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FVLO3]).trim();
                ITEM_LSTA713.LK_A713CLASE3 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CLASE3]).trim();
                ITEM_LSTA713.LK_A713FBUSO3 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FBUSO3]).trim();
                ITEM_LSTA713.LK_A713VALOR3 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713VALOR3]);
                ITEM_LSTA713.LK_A713Q3 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713Q3]);
                ITEM_LSTA713.LK_A713PRRCM3 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713PRRCM3]);
                ITEM_LSTA713.LK_A713CONEX4 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CONEX4]).trim();
                ITEM_LSTA713.LK_A713RUTA4 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713RUTA4]).trim();
                ITEM_LSTA713.LK_A713CARRA4 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CARRA4]).trim();
                ITEM_LSTA713.LK_A713NVLO4 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713NVLO4]).trim();
                ITEM_LSTA713.LK_A713FVLO4 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FVLO4]).trim();
                ITEM_LSTA713.LK_A713CLASE4 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CLASE4]).trim();
                ITEM_LSTA713.LK_A713FBUSO4 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713FBUSO4]).trim();
                ITEM_LSTA713.LK_A713VALOR4 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713VALOR4]);
                ITEM_LSTA713.LK_A713Q4 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713Q4]);
                ITEM_LSTA713.LK_A713PRRCM4 = mapping.getDouble(N03_ITEM_A713[IDX_LS_A713.LK_A713PRRCM4]);
                ITEM_LSTA713.LK_A713CPUI = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CPUI]).trim();
                ITEM_LSTA713.LK_A713CUPON1 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CUPON1]).trim();
                ITEM_LSTA713.LK_A713CUPON2 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CUPON2]).trim();
                ITEM_LSTA713.LK_A713CUPON3 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CUPON3]).trim();
                ITEM_LSTA713.LK_A713CUPON4 = mapping.getString(N03_ITEM_A713[IDX_LS_A713.LK_A713CUPON4]).trim();
                filterItem.LS_A713.add(ITEM_LSTA713);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1721 ITEM_LSTA1721;
        Object[] N02_LSTA1721 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1721];
        Object[] N03_ITEM_A1721;
        String LK_A1721TIPO;
        for (Object N02_LSTA1721_OBJ : N02_LSTA1721) {
            IT_LSTA1721 = (Object[]) STRUC_LSTA1721.toObject(LSTA1721[IDX_LSTA1721.IT_LSTA1721].toBytes(N02_LSTA1721_OBJ), 0);
            LK_A1721TIPO = mapping.getString(IT_LSTA1721[IDX_LSTA1721.IT_LSTA1721]).substring(0, 2).trim();
            if(!LK_A1721TIPO.isEmpty()){
                N03_ITEM_A1721 = (Object[]) STRUC_LS_A1721.toObject(LSTA1721[IDX_LSTA1721.IT_LSTA1721].toBytes(N02_LSTA1721_OBJ), 0);
                ITEM_LSTA1721 = filterItem.new LSTA1721();
                ITEM_LSTA1721.LK_A1721TIPO = mapping.getString(N03_ITEM_A1721[IDX_LS_A1721.LK_A1721TIPO]).trim();
                ITEM_LSTA1721.LK_A1721FRCA = mapping.getString(N03_ITEM_A1721[IDX_LS_A1721.LK_A1721FRCA]).trim();
                filterItem.LS_A1721.add(ITEM_LSTA1721);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1532 ITEM_LSTA1532;
        Object[] N02_LSTA1532 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1532];
        Object[] N03_ITEM_A1532;
        String LK_A1532CTAX;
        for (Object N02_LSTA1532_OBJ : N02_LSTA1532) {
            IT_LSTA1532 = (Object[]) STRUC_LSTA1532.toObject(LSTA1532[IDX_LSTA1532.IT_LSTA1532].toBytes(N02_LSTA1532_OBJ), 0);
            LK_A1532CTAX = mapping.getString(IT_LSTA1532[IDX_LSTA1532.IT_LSTA1532]).substring(0, 3).trim();
            if(!LK_A1532CTAX.isEmpty()){
                N03_ITEM_A1532 = (Object[]) STRUC_LS_A1532.toObject(LSTA1532[IDX_LSTA1532.IT_LSTA1532].toBytes(N02_LSTA1532_OBJ), 0);
                ITEM_LSTA1532 = filterItem.new LSTA1532();
                ITEM_LSTA1532.LK_A1532CTAX = mapping.getString(N03_ITEM_A1532[IDX_LS_A1532.LK_A1532CTAX]).trim();
                ITEM_LSTA1532.LK_A1532MTAX = mapping.getString(N03_ITEM_A1532[IDX_LS_A1532.LK_A1532MTAX]).trim();
                ITEM_LSTA1532.LK_A1532VTAX = mapping.getDouble(N03_ITEM_A1532[IDX_LS_A1532.LK_A1532VTAX]);
                filterItem.LS_A1532.add(ITEM_LSTA1532);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1532_I ITEM_LSTA1532_I;
        Object[] N02_LSTA1532_I = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1532_I];
        Object[] N03_ITEM_A1532_I;
        for (Object N02_LSTA1532_I_OBJ : N02_LSTA1532_I) {
            IT_LSTA1532_I = (Object[]) STRUC_LSTA1532_I.toObject(LSTA1532_I[IDX_LSTA1532_I.IT_LSTA1532_I].toBytes(N02_LSTA1532_I_OBJ), 0);
            LK_A1532CTAX = mapping.getString(IT_LSTA1532_I[IDX_LSTA1532_I.IT_LSTA1532_I]).substring(0, 3).trim();
            if(!LK_A1532CTAX.isEmpty()){
                N03_ITEM_A1532_I = (Object[]) STRUC_LS_A1532_I.toObject(LSTA1532_I[IDX_LSTA1532_I.IT_LSTA1532_I].toBytes(N02_LSTA1532_I_OBJ), 0);
                ITEM_LSTA1532_I = filterItem.new LSTA1532_I();
                ITEM_LSTA1532_I.LK_A1532CTAX = mapping.getString(N03_ITEM_A1532_I[IDX_LS_A1532_I.LK_A1532CTAX]).trim();
                ITEM_LSTA1532_I.LK_A1532MTAX = mapping.getString(N03_ITEM_A1532_I[IDX_LS_A1532_I.LK_A1532MTAX]).trim();
                ITEM_LSTA1532_I.LK_A1532VTAX = mapping.getDouble(N03_ITEM_A1532_I[IDX_LS_A1532_I.LK_A1532VTAX]);
                filterItem.LS_A1532_I.add(ITEM_LSTA1532_I);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1531_CC ITEM_LSTA1531_CC;
        Object[] N02_LSTA1531_CC = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1531_CC];
        Object[] N03_ITEM_A1531_CC;
        String LK_A1531CFOP;
        for (Object N02_LSTA1531_CC_OBJ : N02_LSTA1531_CC) {
            IT_LSTA1531_CC = (Object[]) STRUC_LSTA1531_CC.toObject(LSTA1531_CC[IDX_LSTA1531_CC.IT_LSTA1531_CC].toBytes(N02_LSTA1531_CC_OBJ), 0);
            LK_A1531CFOP = mapping.getString(IT_LSTA1531_CC[IDX_LSTA1531_CC.IT_LSTA1531_CC]).substring(0, 2).trim();
            if(!LK_A1531CFOP.isEmpty()){
                N03_ITEM_A1531_CC = (Object[]) STRUC_LS_A1531_CC.toObject(LSTA1531_CC[IDX_LSTA1531_CC.IT_LSTA1531_CC].toBytes(N02_LSTA1531_CC_OBJ), 0);
                ITEM_LSTA1531_CC = filterItem.new LSTA1531_CC();
                ITEM_LSTA1531_CC.LK_A1531CFOP = mapping.getString(N03_ITEM_A1531_CC[IDX_LS_A1531_CC.LK_A1531CFOP]).trim();
                ITEM_LSTA1531_CC.LK_A1531TFOP = mapping.getString(N03_ITEM_A1531_CC[IDX_LS_A1531_CC.LK_A1531TFOP]).trim();
                ITEM_LSTA1531_CC.LK_A1531TTARJ = mapping.getString(N03_ITEM_A1531_CC[IDX_LS_A1531_CC.LK_A1531TTARJ]).trim();
                ITEM_LSTA1531_CC.LK_A1531VFOP = mapping.getDouble(N03_ITEM_A1531_CC[IDX_LS_A1531_CC.LK_A1531VFOP]);
                ITEM_LSTA1531_CC.LK_A1531MFOP = mapping.getString(N03_ITEM_A1531_CC[IDX_LS_A1531_CC.LK_A1531MFOP]).trim();
                ITEM_LSTA1531_CC.LK_A1531NREF = mapping.getString(N03_ITEM_A1531_CC[IDX_LS_A1531_CC.LK_A1531NREF]).trim();
                ITEM_LSTA1531_CC.LK_A1531CAPL = mapping.getString(N03_ITEM_A1531_CC[IDX_LS_A1531_CC.LK_A1531CAPL]).trim();
                filterItem.LS_A1531_CC.add(ITEM_LSTA1531_CC);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1531_CA ITEM_LSTA1531_CA;
        Object[] N02_LSTA1531_CA = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1531_CA];
        Object[] N03_ITEM_A1531_CA;
        for (Object N02_LSTA1531_CA_OBJ : N02_LSTA1531_CA) {
            IT_LSTA1531_CA = (Object[]) STRUC_LSTA1531_CA.toObject(LSTA1531_CA[IDX_LSTA1531_CA.IT_LSTA1531_CA].toBytes(N02_LSTA1531_CA_OBJ), 0);
            LK_A1531CFOP = mapping.getString(IT_LSTA1531_CA[IDX_LSTA1531_CA.IT_LSTA1531_CA]).substring(0, 2).trim();
            if(!LK_A1531CFOP.isEmpty()){
                N03_ITEM_A1531_CA = (Object[]) STRUC_LS_A1531_CA.toObject(LSTA1531_CA[IDX_LSTA1531_CA.IT_LSTA1531_CA].toBytes(N02_LSTA1531_CA_OBJ), 0);
                ITEM_LSTA1531_CA = filterItem.new LSTA1531_CA();
                ITEM_LSTA1531_CA.LK_A1531CFOP = mapping.getString(N03_ITEM_A1531_CA[IDX_LS_A1531_CA.LK_A1531CFOP]).trim();
                ITEM_LSTA1531_CA.LK_A1531TFOP = mapping.getString(N03_ITEM_A1531_CA[IDX_LS_A1531_CA.LK_A1531TFOP]).trim();
                ITEM_LSTA1531_CA.LK_A1531TTARJ = mapping.getString(N03_ITEM_A1531_CA[IDX_LS_A1531_CA.LK_A1531TTARJ]).trim();
                ITEM_LSTA1531_CA.LK_A1531VFOP = mapping.getDouble(N03_ITEM_A1531_CA[IDX_LS_A1531_CA.LK_A1531VFOP]);
                ITEM_LSTA1531_CA.LK_A1531MFOP = mapping.getString(N03_ITEM_A1531_CA[IDX_LS_A1531_CA.LK_A1531MFOP]).trim();
                ITEM_LSTA1531_CA.LK_A1531NREF = mapping.getString(N03_ITEM_A1531_CA[IDX_LS_A1531_CA.LK_A1531NREF]).trim();
                ITEM_LSTA1531_CA.LK_A1531CAPL = mapping.getString(N03_ITEM_A1531_CA[IDX_LS_A1531_CA.LK_A1531CAPL]).trim();
                filterItem.LS_A1531_CA.add(ITEM_LSTA1531_CA);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1531_EE ITEM_LSTA1531_EE;
        Object[] N02_LSTA1531_EE = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1531_EE];
        Object[] N03_ITEM_A1531_EE;
        for (Object N02_LSTA1531_EE_OBJ : N02_LSTA1531_EE) {
            IT_LSTA1531_EE = (Object[]) STRUC_LSTA1531_EE.toObject(LSTA1531_EE[IDX_LSTA1531_EE.IT_LSTA1531_EE].toBytes(N02_LSTA1531_EE_OBJ), 0);
            LK_A1531CFOP = mapping.getString(IT_LSTA1531_EE[IDX_LSTA1531_EE.IT_LSTA1531_EE]).substring(0, 2).trim();
            if(!LK_A1531CFOP.isEmpty()){
                N03_ITEM_A1531_EE = (Object[]) STRUC_LS_A1531_EE.toObject(LSTA1531_EE[IDX_LSTA1531_EE.IT_LSTA1531_EE].toBytes(N02_LSTA1531_EE_OBJ), 0);
                ITEM_LSTA1531_EE = filterItem.new LSTA1531_EE();
                ITEM_LSTA1531_EE.LK_A1531CFOP = mapping.getString(N03_ITEM_A1531_EE[IDX_LS_A1531_EE.LK_A1531CFOP]).trim();
                ITEM_LSTA1531_EE.LK_A1531TFOP = mapping.getString(N03_ITEM_A1531_EE[IDX_LS_A1531_EE.LK_A1531TFOP]).trim();
                ITEM_LSTA1531_EE.LK_A1531TTARJ = mapping.getString(N03_ITEM_A1531_EE[IDX_LS_A1531_EE.LK_A1531TTARJ]).trim();
                ITEM_LSTA1531_EE.LK_A1531VFOP = mapping.getDouble(N03_ITEM_A1531_EE[IDX_LS_A1531_EE.LK_A1531VFOP]);
                ITEM_LSTA1531_EE.LK_A1531MFOP = mapping.getString(N03_ITEM_A1531_EE[IDX_LS_A1531_EE.LK_A1531MFOP]).trim();
                ITEM_LSTA1531_EE.LK_A1531NREF = mapping.getString(N03_ITEM_A1531_EE[IDX_LS_A1531_EE.LK_A1531NREF]).trim();
                ITEM_LSTA1531_EE.LK_A1531CAPL = mapping.getString(N03_ITEM_A1531_EE[IDX_LS_A1531_EE.LK_A1531CAPL]).trim();
                filterItem.LS_A1531_EE.add(ITEM_LSTA1531_EE);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1531_OT ITEM_LSTA1531_OT;
        Object[] N02_LSTA1531_OT = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1531_OT];
        Object[] N03_ITEM_A1531_OT;
        for (Object N02_LSTA1531_OT_OBJ : N02_LSTA1531_OT) {
            IT_LSTA1531_OT = (Object[]) STRUC_LSTA1531_OT.toObject(LSTA1531_OT[IDX_LSTA1531_OT.IT_LSTA1531_OT].toBytes(N02_LSTA1531_OT_OBJ), 0);
            LK_A1531CFOP = mapping.getString(IT_LSTA1531_OT[IDX_LSTA1531_OT.IT_LSTA1531_OT]).substring(0, 2).trim();
            if(!LK_A1531CFOP.isEmpty()){
                N03_ITEM_A1531_OT = (Object[]) STRUC_LS_A1531_OT.toObject(LSTA1531_OT[IDX_LSTA1531_OT.IT_LSTA1531_OT].toBytes(N02_LSTA1531_OT_OBJ), 0);
                ITEM_LSTA1531_OT = filterItem.new LSTA1531_OT();
                ITEM_LSTA1531_OT.LK_A1531CFOP = mapping.getString(N03_ITEM_A1531_OT[IDX_LS_A1531_OT.LK_A1531CFOP]).trim();
                ITEM_LSTA1531_OT.LK_A1531TFOP = mapping.getString(N03_ITEM_A1531_OT[IDX_LS_A1531_OT.LK_A1531TFOP]).trim();
                ITEM_LSTA1531_OT.LK_A1531TTARJ = mapping.getString(N03_ITEM_A1531_OT[IDX_LS_A1531_OT.LK_A1531TTARJ]).trim();
                ITEM_LSTA1531_OT.LK_A1531VFOP = mapping.getDouble(N03_ITEM_A1531_OT[IDX_LS_A1531_OT.LK_A1531VFOP]);
                ITEM_LSTA1531_OT.LK_A1531MFOP = mapping.getString(N03_ITEM_A1531_OT[IDX_LS_A1531_OT.LK_A1531MFOP]).trim();
                ITEM_LSTA1531_OT.LK_A1531NREF = mapping.getString(N03_ITEM_A1531_OT[IDX_LS_A1531_OT.LK_A1531NREF]).trim();
                ITEM_LSTA1531_OT.LK_A1531CAPL = mapping.getString(N03_ITEM_A1531_OT[IDX_LS_A1531_OT.LK_A1531CAPL]).trim();
                filterItem.LS_A1531_OT.add(ITEM_LSTA1531_OT);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1531_RT ITEM_LSTA1531_RT;
        Object[] N02_LSTA1531_RT = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1531_RT];
        Object[] N03_ITEM_A1531_RT;
        String LK_A1531NREF;
        for (Object N02_LSTA1531_RT_OBJ : N02_LSTA1531_RT) {
            IT_LSTA1531_RT = (Object[]) STRUC_LSTA1531_RT.toObject(LSTA1531_RT[IDX_LSTA1531_RT.IT_LSTA1531_RT].toBytes(N02_LSTA1531_RT_OBJ), 0);
            LK_A1531NREF = mapping.getString(IT_LSTA1531_RT[IDX_LSTA1531_RT.IT_LSTA1531_RT]).substring(0, 19).trim();
            if(!LK_A1531NREF.isEmpty()){
                N03_ITEM_A1531_RT = (Object[]) STRUC_LS_A1531_RT.toObject(LSTA1531_RT[IDX_LSTA1531_RT.IT_LSTA1531_RT].toBytes(N02_LSTA1531_RT_OBJ), 0);
                ITEM_LSTA1531_RT = filterItem.new LSTA1531_RT();
                ITEM_LSTA1531_RT.LK_A1531NREF = mapping.getString(N03_ITEM_A1531_RT[IDX_LS_A1531_RT.LK_A1531NREF]).trim();
                ITEM_LSTA1531_RT.LK_A1531CAPL = mapping.getString(N03_ITEM_A1531_RT[IDX_LS_A1531_RT.LK_A1531CAPL]).trim();
                filterItem.LS_A1531_RT.add(ITEM_LSTA1531_RT);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1692 ITEM_LSTA1692;
        Object[] N02_LSTA1692 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1692];
        Object[] N03_ITEM_A1692;
        String LK_CCIA;
        for (Object N02_LSTA1692_OBJ : N02_LSTA1692) {
            IT_LSTA1692 = (Object[]) STRUC_LSTA1692.toObject(LSTA1692[IDX_LSTA1692.IT_LSTA1692].toBytes(N02_LSTA1692_OBJ), 0);
            LK_CCIA = mapping.getString(IT_LSTA1692[IDX_LSTA1692.IT_LSTA1692]).substring(0, 3).trim();
            if(!LK_CCIA.isEmpty()){
                N03_ITEM_A1692 = (Object[]) STRUC_LS_A1692.toObject(LSTA1692[IDX_LSTA1692.IT_LSTA1692].toBytes(N02_LSTA1692_OBJ), 0);
                ITEM_LSTA1692 = filterItem.new LSTA1692();
                ITEM_LSTA1692.LK_CCIA = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_CCIA]).trim();
                ITEM_LSTA1692.LK_FORMA = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_FORMA]).trim();
                ITEM_LSTA1692.LK_SERIE = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_SERIE]).trim();
                ITEM_LSTA1692.LK_CUPON = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_CUPON]).trim();
                ITEM_LSTA1692.LK_CDEPART = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_CDEPART]).trim();
                ITEM_LSTA1692.LK_CARRIVA = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_CARRIVA]).trim();
                ITEM_LSTA1692.LK_CARR = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_CARR]).trim();
                ITEM_LSTA1692.LK_NFLIGHT = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_NFLIGHT]).trim();
                ITEM_LSTA1692.LK_DFLIGHT = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_DFLIGHT]).trim();
                ITEM_LSTA1692.LK_CLAS = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_CLAS]).trim();
                ITEM_LSTA1692.LK_FBASE = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_FBASE]).trim();
                ITEM_LSTA1692.LK_VCPN = mapping.getDouble(N03_ITEM_A1692[IDX_LS_A1692.LK_VCPN]);
                ITEM_LSTA1692.LK_MDACP = mapping.getString(N03_ITEM_A1692[IDX_LS_A1692.LK_MDACP]).trim();
                filterItem.LS_A1692.add(ITEM_LSTA1692);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1818 ITEM_LSTA1818;
        Object[] N02_LSTA1818 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1818];
        Object[] N03_ITEM_A1818;
        for (Object N02_LSTA1818_OBJ : N02_LSTA1818) {
            IT_LSTA1818 = (Object[]) STRUC_LSTA1818.toObject(LSTA1818[IDX_LSTA1818.IT_LSTA1818].toBytes(N02_LSTA1818_OBJ), 0);
            LK_CCIA = mapping.getString(IT_LSTA1818[IDX_LSTA1818.IT_LSTA1818]).substring(0, 3).trim();
            if(!LK_CCIA.isEmpty()){
                N03_ITEM_A1818 = (Object[]) STRUC_LS_A1818.toObject(LSTA1818[IDX_LSTA1818.IT_LSTA1818].toBytes(N02_LSTA1818_OBJ), 0);
                ITEM_LSTA1818 = filterItem.new LSTA1818();
                ITEM_LSTA1818.LK_CCIA = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_CCIA]).trim();
                ITEM_LSTA1818.LK_FORMA = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_FORMA]).trim();
                ITEM_LSTA1818.LK_SERIE = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_SERIE]).trim();
                ITEM_LSTA1818.LK_CUPON = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_CUPON]).trim();
                ITEM_LSTA1818.LK_CDEPART = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_CDEPART]).trim();
                ITEM_LSTA1818.LK_CARRIVA = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_CARRIVA]).trim();
                ITEM_LSTA1818.LK_CARR = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_CARR]).trim();
                ITEM_LSTA1818.LK_NFLIGHT = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_NFLIGHT]).trim();
                ITEM_LSTA1818.LK_DFLIGHT = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_DFLIGHT]).trim();
                ITEM_LSTA1818.LK_CLAS = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_CLAS]).trim();
                ITEM_LSTA1818.LK_FBASE = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_FBASE]).trim();
                ITEM_LSTA1818.LK_VCPN = mapping.getDouble(N03_ITEM_A1818[IDX_LS_A1818.LK_VCPN]);
                ITEM_LSTA1818.LK_MDACP = mapping.getString(N03_ITEM_A1818[IDX_LS_A1818.LK_MDACP]).trim();
                filterItem.LS_A1818.add(ITEM_LSTA1818);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1200 ITEM_LSTA1200;
        Object[] N02_LSTA1200 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1200];
        Object[] N03_ITEM_A1200;
        for (Object N02_LSTA1200_OBJ : N02_LSTA1200) {
            IT_LSTA1200 = (Object[]) STRUC_LSTA1200.toObject(LSTA1200[IDX_LSTA1200.IT_LSTA1200].toBytes(N02_LSTA1200_OBJ), 0);
            LK_CCIA = mapping.getString(IT_LSTA1200[IDX_LSTA1200.IT_LSTA1200]).substring(0, 3).trim();
            if(!LK_CCIA.isEmpty()){
                N03_ITEM_A1200 = (Object[]) STRUC_LS_A1200.toObject(LSTA1200[IDX_LSTA1200.IT_LSTA1200].toBytes(N02_LSTA1200_OBJ), 0);
                ITEM_LSTA1200 = filterItem.new LSTA1200();
                ITEM_LSTA1200.LK_CCIA = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_CCIA]).trim();
                ITEM_LSTA1200.LK_FORMA = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_FORMA]).trim();
                ITEM_LSTA1200.LK_SERIE = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_SERIE]).trim();
                ITEM_LSTA1200.LK_CUPON = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_CUPON]).trim();
                ITEM_LSTA1200.LK_RUTA_F = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_RUTA_F]).trim();
                ITEM_LSTA1200.LK_RUTA_T = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_RUTA_T]).trim();
                ITEM_LSTA1200.LK_CARR = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_CARR]).trim();
                ITEM_LSTA1200.LK_DFLIGHT = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_DFLIGHT]).trim();
                ITEM_LSTA1200.LK_FBASIS = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_FBASIS]).trim();
                ITEM_LSTA1200.LK_GROSS = mapping.getDouble(N03_ITEM_A1200[IDX_LS_A1200.LK_GROSS]);
                ITEM_LSTA1200.LK_CURRENC = mapping.getString(N03_ITEM_A1200[IDX_LS_A1200.LK_CURRENC]).trim();
                filterItem.LS_A1200.add(ITEM_LSTA1200);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA2033 ITEM_LSTA2033;
        Object[] N02_LSTA2033 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA2033];
        Object[] N03_ITEM_A2033;
        String LK_CIA;
        for (Object N02_LSTA2033_OBJ : N02_LSTA2033) {
            IT_LSTA2033 = (Object[]) STRUC_LSTA2033.toObject(LSTA2033[IDX_LSTA2033.IT_LSTA2033].toBytes(N02_LSTA2033_OBJ), 0);
            LK_CIA = mapping.getString(IT_LSTA2033[IDX_LSTA2033.IT_LSTA2033]).substring(0, 3).trim();
            if(!LK_CIA.isEmpty()){
                N03_ITEM_A2033 = (Object[]) STRUC_LS_A2033.toObject(LSTA2033[IDX_LSTA2033.IT_LSTA2033].toBytes(N02_LSTA2033_OBJ), 0);
                ITEM_LSTA2033 = filterItem.new LSTA2033();
                ITEM_LSTA2033.LK_CIA = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_CIA]).trim();
                ITEM_LSTA2033.LK_FORMA = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_FORMA]).trim();
                ITEM_LSTA2033.LK_SERIE = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_SERIE]).trim();
                ITEM_LSTA2033.LK_CUPON = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_CUPON]).trim();
                ITEM_LSTA2033.LK_RUTA_F = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_RUTA_F]).trim();
                ITEM_LSTA2033.LK_RUTA_T = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_RUTA_T]).trim();
                ITEM_LSTA2033.LK_CARR = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_CARR]).trim();
                ITEM_LSTA2033.LK_DFLIGHT = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_DFLIGHT]).trim();
                ITEM_LSTA2033.LK_FBASIS = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_FBASIS]).trim();
                ITEM_LSTA2033.LK_GROSS = mapping.getDouble(N03_ITEM_A2033[IDX_LS_A2033.LK_GROSS]);
                ITEM_LSTA2033.LK_CURRENC = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_CURRENC]).trim();
                ITEM_LSTA2033.LK_TRNC = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_TRNC]).trim();
                ITEM_LSTA2033.LK_TTRAX = mapping.getInt(N03_ITEM_A2033[IDX_LS_A2033.LK_TTRAX]);
                ITEM_LSTA2033.LK_CORRL = mapping.getInt(N03_ITEM_A2033[IDX_LS_A2033.LK_CORRL]);
                ITEM_LSTA2033.LK_ESTADO = mapping.getString(N03_ITEM_A2033[IDX_LS_A2033.LK_ESTADO]).trim();
                ITEM_LSTA2033.LK_TTRANS = mapping.getInt(N03_ITEM_A2033[IDX_LS_A2033.LK_TTRANS]);
                filterItem.LS_A2033.add(ITEM_LSTA2033);
            }else{
                break;
            }
        }
        PRO11013Filter.LSTA1747 ITEM_LSTA1747;
        Object[] N02_LSTA1747 = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LSTA1747];
        Object[] N03_ITEM_A1747;
        for (Object N02_LSTA1747_OBJ : N02_LSTA1747) {
            IT_LSTA1747 = (Object[]) STRUC_LSTA1747.toObject(LSTA1747[IDX_LSTA1747.IT_LSTA1747].toBytes(N02_LSTA1747_OBJ), 0);
            LK_CCIA = mapping.getString(IT_LSTA1747[IDX_LSTA1747.IT_LSTA1747]).substring(0, 3).trim();
            if(!LK_CCIA.isEmpty()){
                N03_ITEM_A1747 = (Object[]) STRUC_LS_A1747.toObject(LSTA1747[IDX_LSTA1747.IT_LSTA1747].toBytes(N02_LSTA1747_OBJ), 0);
                ITEM_LSTA1747 = filterItem.new LSTA1747();
                ITEM_LSTA1747.LK_CCIA = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_CCIA]).trim();
                ITEM_LSTA1747.LK_FORMA = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_FORMA]).trim();
                ITEM_LSTA1747.LK_SERIE = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_SERIE]).trim();
                ITEM_LSTA1747.LK_CUPON = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_CUPON]).trim();
                ITEM_LSTA1747.LK_CDEPART = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_CDEPART]).trim();
                ITEM_LSTA1747.LK_CARRIVA = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_CARRIVA]).trim();
                ITEM_LSTA1747.LK_CARR = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_CARR]).trim();
                ITEM_LSTA1747.LK_NFLIGHT = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_NFLIGHT]).trim();
                ITEM_LSTA1747.LK_DFLIGHT = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_DFLIGHT]).trim();
                ITEM_LSTA1747.LK_CLAS = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_CLAS]).trim();
                ITEM_LSTA1747.LK_FBASE = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_FBASE]).trim();
                ITEM_LSTA1747.LK_VCPN = mapping.getDouble(N03_ITEM_A1747[IDX_LS_A1747.LK_VCPN]);
                ITEM_LSTA1747.LK_MDACP = mapping.getString(N03_ITEM_A1747[IDX_LS_A1747.LK_MDACP]).trim();
                filterItem.LS_A1747.add(ITEM_LSTA1747);
            }else{
                break;
            }
        }
        //</editor-fold>
        returnFilter = filterItem;
    }
    
    public boolean prepareOutput(){
        try{
            P_OUTPUT();
        }catch(Exception e){
            return false;
        }
        return true;
    }
}
