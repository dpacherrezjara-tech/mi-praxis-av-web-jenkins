/*
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS _ AEROMEXICO                               *
 * Document   : PRO11013Filter                                    *
 * Created on : 19_04_2017, 15:53:29                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201701 RMC 19_04_2017 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author rmayta
 */
public class PRO11013Filter {
    // In
    public String IN_CCUST = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_SEQT = "";
    // Out
    public String LK_A720CIA = "";
    public String LK_A720FORMA = "";
    public String LK_A720SERIE = "";
    public String LK_A720CIAI = "";
    public String LK_A720FORMAI = "";
    public String LK_A720SERIEI = "";
    public String LK_A720PNR = "";
    public String LK_A1530FHAST = "";
    public String LK_A1530MDA = "";
    public String LK_A720AGENTE = "";
    public String LK_A720FECVTA = "";
    public String LK_A003KEY1 = "";
    public String LK_A003PROVIN = "";
    public String LK_A003CIUDAD = "";
    public String LK_A1007NOMCD = "";
    public String LK_A720PAX = "";
    public String LK_A720TVENTA = "";
    public String LK_A720CODIT = "";
    public String LK_A1530FUENT = "";
    public String LK_A1530PSVTA = "";
    public String LK_A720SASI = "";
    public String LK_A720TICAP = "";
    public String LK_A720ACCO = "";
    public String LK_A720ACCD = "";
    public String LK_A720ETKT = "";
    public String LK_A1530FCONT = "";
    public String LK_A1530IDCON = "";
    public double LK_A1530TCAMB = 0d;
    public double LK_A1530TCAMP = 0d;
    public double LK_A720TARI1 = 0d;
    public double LK_A720TARI2 = 0d;
    public double LK_A720TARI3 = 0d;
    public double LK_A720TARI4 = 0d;
    public double LK_A720TQ = 0d;
    public double LK_A720TQRV = 0d;
    public double LK_A720TARIFA = 0d;
    public String LK_A720MONEDA = "";
    public double LK_A720TRFPAG = 0d;
    public String LK_A720MDAPAG = "";
    public double LK_A720TCOM = 0d;
    public double LK_A720TCOMRV = 0d;
    public String LK_A720MDACM = "";
    public String LK_A720MDARV = "";
    public double LK_A720COMMIS = 0d;
    public double LK_A720TSCM = 0d;
    public String LK_A720MDACOM = "";
    public double LK_A720ROE = 0d;
    public double LK_A720FARE = 0d;
    public String LK_A720TKVOID = "";
    public double LK_A720TCAMB = 0d;
    public double LK_A720YQ1 = 0d;
    public double LK_A720YQ2 = 0d;
    public double LK_A720YQ3 = 0d;
    public double LK_A720YQ4 = 0d;
    public double LK_A720PRRCM1 = 0d;
    public double LK_A720PRRCM2 = 0d;
    public double LK_A720PRRCM3 = 0d;
    public double LK_A720PRRCM4 = 0d;
    public double LK_A720PRSCM1 = 0d;
    public double LK_A720PRSCM2 = 0d;
    public double LK_A720PRSCM3 = 0d;
    public double LK_A720PRSCM4 = 0d;
    public double LK_A720VALOR1 = 0d;
    public double LK_A720VALOR2 = 0d;
    public double LK_A720VALOR3 = 0d;
    public double LK_A720VALOR4 = 0d;
    public double LK_A720ORIGEX = 0d;
    public double LK_A720TTCOMM = 0d;
    public double LK_A720TTSCMM = 0d;
    public double LK_A720TYQ = 0d;
    public double LK_A720VALOL1 = 0d;
    public double LK_A720VALOL2 = 0d;
    public double LK_A720VALOL3 = 0d;
    public double LK_A720VALOL4 = 0d;
    public double LK_A720LRRCM1 = 0d;
    public double LK_A720LRRCM2 = 0d;
    public double LK_A720LRRCM3 = 0d;
    public double LK_A720LRRCM4 = 0d;
    public double LK_A720LRSCM1 = 0d;
    public double LK_A720LRSCM2 = 0d;
    public double LK_A720LRSCM3 = 0d;
    public double LK_A720LRSCM4 = 0d;
    public double LK_A720LYQ1 = 0d;
    public double LK_A720LYQ2 = 0d;
    public double LK_A720LYQ3 = 0d;
    public double LK_A720LYQ4 = 0d;
    public String LK_A720BOOKI1 = "";
    public String LK_A720BOOKI2 = "";
    public String LK_A720BOOKI3 = "";
    public String LK_A720BOOKI4 = "";
    public String LK_A720CONEX1 = "";
    public String LK_A720RUTA0 = "";
    public String LK_A720RUTA1 = "";
    public String LK_A720CARRA1 = "";
    public String LK_A720NVLO1 = "";
    public String LK_A720FVLO1 = "";
    public String LK_A720HVLO1 = "";
    public String LK_A720FBST1 = "";
    public String LK_A720CLASE1 = "";
    public String LK_A720FBUSO1 = "";
    public String LK_A720CARRO1 = "";
    public String LK_A720NVLOO1 = "";
    public String LK_A720NBDA1 = "";
    public String LK_A720NADA1 = "";
    public int LK_LEG1 = 0;
    public String LK_A720CONEX2 = "";
    public String LK_A720RUTA2 = "";
    public String LK_A720CARRA2 = "";
    public String LK_A720NVLO2 = "";
    public String LK_A720FVLO2 = "";
    public String LK_A720HVLO2 = "";
    public String LK_A720FBST2 = "";
    public String LK_A720CLASE2 = "";
    public String LK_A720FBUSO2 = "";
    public String LK_A720CARRO2 = "";
    public String LK_A720NVLOO2 = "";
    public String LK_A720NBDA2 = "";
    public String LK_A720NADA2 = "";
    public int LK_LEG2 = 0;
    public String LK_A720CONEX3 = "";
    public String LK_A720RUTA3 = "";
    public String LK_A720CARRA3 = "";
    public String LK_A720NVLO3 = "";
    public String LK_A720FVLO3 = "";
    public String LK_A720HVLO3 = "";
    public String LK_A720FBST3 = "";
    public String LK_A720CLASE3 = "";
    public String LK_A720FBUSO3 = "";
    public String LK_A720CARRO3 = "";
    public String LK_A720NVLOO3 = "";
    public String LK_A720NBDA3 = "";
    public String LK_A720NADA3 = "";
    public int LK_LEG3 = 0;
    public String LK_A720CONEX4 = "";
    public String LK_A720RUTA4 = "";
    public String LK_A720CARRA4 = "";
    public String LK_A720NVLO4 = "";
    public String LK_A720FVLO4 = "";
    public String LK_A720HVLO4 = "";
    public String LK_A720FBST4 = "";
    public String LK_A720CLASE4 = "";
    public String LK_A720FBUSO4 = "";
    public String LK_A720CARRO4 = "";
    public String LK_A720NVLOO4 = "";
    public String LK_A720NBDA4 = "";
    public String LK_A720NADA4 = "";
    public int LK_LEG4 = 0;
    public String LK_A720TDOC = "";
    public String LK_A720TDOC_COD = "";
    public String LK_A720TDOC_CON = "";
    public int LK_A1672_AUDITED = 0;
    public int LK_A1672_MEMORAISED = 0;
    public String LK_A1672PREME = "";
    public String LK_A2548NMEMO = "";
    
    public List<LSTA730> LS_A730 = new ArrayList();
    public class LSTA730{
        public String LK_A730CIA = "";
        public String LK_A730FORMA = "";
        public String LK_A730SERIE = "";
        public String LK_A730LOHO1 = "";
        public String LK_A730LOHO2 = "";
        public String LK_A730LOHO3 = "";
        public String LK_A730LOHO4 = "";
        public String LK_A730CUPON1 = "";
        public String LK_A730CUPON2 = "";
        public String LK_A730CUPON3 = "";
        public String LK_A730CUPON4 = "";
        public String LK_A730MONREG = "";
        public String LK_A730FECVTA = "";
        public String LK_A730CIA720 = "";
        public String LK_A730FOR720 = "";
        public String LK_A730SER720 = "";
        public String LK_A730SEQUEN = "";
        public String LK_A730CONEX1 = "";
        public String LK_A730RUTA0 = "";
        public String LK_A730RUTA1 = "";
        public String LK_A730CARRA1 = "";
        public String LK_A730NVLO1 = "";
        public String LK_A730FVLO1 = "";
        public String LK_A730CLASE1 = "";
        public String LK_A730FBUSO1 = "";
        public double LK_A730VALOR1 = 0d;
        public double LK_A730Q1 = 0d;
        public double LK_A730PRRCM1 = 0d;
        public String LK_A730CONEX2 = "";
        public String LK_A730RUTA2 = "";
        public String LK_A730CARRA2 = "";
        public String LK_A730NVLO2 = "";
        public String LK_A730FVLO2 = "";
        public String LK_A730CLASE2 = "";
        public String LK_A730FBUSO2 = "";
        public double LK_A730VALOR2 = 0d;
        public double LK_A730Q2 = 0d;
        public double LK_A730PRRCM2 = 0d;
        public String LK_A730CONEX3 = "";
        public String LK_A730RUTA3 = "";
        public String LK_A730CARRA3 = "";
        public String LK_A730NVLO3 = "";
        public String LK_A730FVLO3 = "";
        public String LK_A730CLASE3 = "";
        public String LK_A730FBUSO3 = "";
        public double LK_A730VALOR3 = 0d;
        public double LK_A730Q3 = 0d;
        public double LK_A730PRRCM3 = 0d;
        public String LK_A730CONEX4 = "";
        public String LK_A730RUTA4 = "";
        public String LK_A730CARRA4 = "";
        public String LK_A730NVLO4 = "";
        public String LK_A730FVLO4 = "";
        public String LK_A730CLASE4 = "";
        public String LK_A730FBUSO4 = "";
        public double LK_A730VALOR4 = 0d;
        public double LK_A730Q4 = 0d;
        public double LK_A730PRRCM4 = 0d;
    }
    
    public List<LSTA713> LS_A713 = new ArrayList();
    public class LSTA713{
        public String LK_A713CIA = "";
        public String LK_A713FORMA = "";
        public String LK_A713SERIE = "";
        public String LK_A713MONREG = "";
        public String LK_A713FECVTA = "";
        public String LK_A713CONEX1 = "";
        public String LK_A713RUTA0 = "";
        public String LK_A713RUTA1 = "";
        public String LK_A713CARRA1 = "";
        public String LK_A713NVLO1 = "";
        public String LK_A713FVLO1 = "";
        public String LK_A713CLASE1 = "";
        public String LK_A713FBUSO1 = "";
        public double LK_A713VALOR1 = 0d;
        public double LK_A713Q1 = 0d;
        public double LK_A713PRRCM1 = 0d;
        public String LK_A713CONEX2 = "";
        public String LK_A713RUTA2 = "";
        public String LK_A713CARRA2 = "";
        public String LK_A713NVLO2 = "";
        public String LK_A713FVLO2 = "";
        public String LK_A713CLASE2 = "";
        public String LK_A713FBUSO2 = "";
        public double LK_A713VALOR2 = 0d;
        public double LK_A713Q2 = 0d;
        public double LK_A713PRRCM2 = 0d;
        public String LK_A713CONEX3 = "";
        public String LK_A713RUTA3 = "";
        public String LK_A713CARRA3 = "";
        public String LK_A713NVLO3 = "";
        public String LK_A713FVLO3 = "";
        public String LK_A713CLASE3 = "";
        public String LK_A713FBUSO3 = "";
        public double LK_A713VALOR3 = 0d;
        public double LK_A713Q3 = 0d;
        public double LK_A713PRRCM3 = 0d;
        public String LK_A713CONEX4 = "";
        public String LK_A713RUTA4 = "";
        public String LK_A713CARRA4 = "";
        public String LK_A713NVLO4 = "";
        public String LK_A713FVLO4 = "";
        public String LK_A713CLASE4 = "";
        public String LK_A713FBUSO4 = "";
        public double LK_A713VALOR4 = 0d;
        public double LK_A713Q4 = 0d;
        public double LK_A713PRRCM4 = 0d;
        public String LK_A713CPUI = "";
        public String LK_A713CUPON1 = "";
        public String LK_A713CUPON2 = "";
        public String LK_A713CUPON3 = "";
        public String LK_A713CUPON4 = "";
    }
    
    public List<LSTA1721> LS_A1721 = new ArrayList();
    public class LSTA1721{
        public String LK_A1721TIPO = "";
        public String LK_A1721FRCA = "";
    }
    
    public List<LSTA1532> LS_A1532 = new ArrayList();
    public class LSTA1532{
        public String LK_A1532CTAX = "";
        public String LK_A1532MTAX = "";
        public double LK_A1532VTAX = 0d;
    }
    
    public List<LSTA1532_I> LS_A1532_I = new ArrayList();
    public class LSTA1532_I{
        public String LK_A1532CTAX = "";
        public String LK_A1532MTAX = "";
        public double LK_A1532VTAX = 0d;
    }
    
    public List<LSTA1531_CC> LS_A1531_CC = new ArrayList();
    public class LSTA1531_CC{
        public String LK_A1531CFOP = "";
        public String LK_A1531TFOP = "";
        public String LK_A1531TTARJ = "";
        public double LK_A1531VFOP = 0d;
        public String LK_A1531MFOP = "";
        public String LK_A1531NREF = "";
        public String LK_A1531CAPL = "";
    }
    
    public List<LSTA1531_CA> LS_A1531_CA = new ArrayList();
    public class LSTA1531_CA{
        public String LK_A1531CFOP = "";
        public String LK_A1531TFOP = "";
        public String LK_A1531TTARJ = "";
        public double LK_A1531VFOP = 0d;
        public String LK_A1531MFOP = "";
        public String LK_A1531NREF = "";
        public String LK_A1531CAPL = "";
    }
    
    public List<LSTA1531_EE> LS_A1531_EE = new ArrayList();
    public class LSTA1531_EE{
        public String LK_A1531CFOP = "";
        public String LK_A1531TFOP = "";
        public String LK_A1531TTARJ = "";
        public double LK_A1531VFOP = 0d;
        public String LK_A1531MFOP = "";
        public String LK_A1531NREF = "";
        public String LK_A1531CAPL = "";
    }
    
    public List<LSTA1531_OT> LS_A1531_OT = new ArrayList();
    public class LSTA1531_OT{
        public String LK_A1531CFOP = "";
        public String LK_A1531TFOP = "";
        public String LK_A1531TTARJ = "";
        public double LK_A1531VFOP = 0d;
        public String LK_A1531MFOP = "";
        public String LK_A1531NREF = "";
        public String LK_A1531CAPL = "";
    }
    
    public List<LSTA1531_RT> LS_A1531_RT = new ArrayList();
    public class LSTA1531_RT{
        public String LK_A1531NREF = "";
        public String LK_A1531CAPL = "";
    }
    
    public List<LSTA1692> LS_A1692 = new ArrayList();
    public class LSTA1692{
        public String LK_CCIA = "";
        public String LK_FORMA = "";
        public String LK_SERIE = "";
        public String LK_CUPON = "";
        public String LK_CDEPART = "";
        public String LK_CARRIVA = "";
        public String LK_CARR = "";
        public String LK_NFLIGHT = "";
        public String LK_DFLIGHT = "";
        public String LK_CLAS = "";
        public String LK_FBASE = "";
        public double LK_VCPN = 0d;
        public String LK_MDACP = "";
    }
    
    public List<LSTA1818> LS_A1818 = new ArrayList();
    public class LSTA1818{
        public String LK_CCIA = "";
        public String LK_FORMA = "";
        public String LK_SERIE = "";
        public String LK_CUPON = "";
        public String LK_CDEPART = "";
        public String LK_CARRIVA = "";
        public String LK_CARR = "";
        public String LK_NFLIGHT = "";
        public String LK_DFLIGHT = "";
        public String LK_CLAS = "";
        public String LK_FBASE = "";
        public double LK_VCPN = 0d;
        public String LK_MDACP = "";
    }
    
    public List<LSTA1200> LS_A1200 = new ArrayList();
    public class LSTA1200{
        public String LK_CCIA = "";
        public String LK_FORMA = "";
        public String LK_SERIE = "";
        public String LK_CUPON = "";
        public String LK_RUTA_F = "";
        public String LK_RUTA_T = "";
        public String LK_CARR = "";
        public String LK_DFLIGHT = "";
        public String LK_FBASIS = "";
        public double LK_GROSS = 0d;
        public String LK_CURRENC = "";
    }
    
    public List<LSTA2033> LS_A2033 = new ArrayList();
    public class LSTA2033{
        public String LK_CIA = "";
        public String LK_FORMA = "";
        public String LK_SERIE = "";
        public String LK_CUPON = "";
        public String LK_RUTA_F = "";
        public String LK_RUTA_T = "";
        public String LK_CARR = "";
        public String LK_DFLIGHT = "";
        public String LK_FBASIS = "";
        public double LK_GROSS = 0d;
        public String LK_CURRENC = "";
        public String LK_TRNC = "";
        public int LK_TTRAX = 0;
        public int LK_CORRL = 0;
        public String LK_ESTADO = "";
        public int LK_TTRANS = 0;
    }
    
    public List<LSTA1747> LS_A1747 = new ArrayList();
    public class LSTA1747{
        public String LK_CCIA = "";
        public String LK_FORMA = "";
        public String LK_SERIE = "";
        public String LK_CUPON = "";
        public String LK_CDEPART = "";
        public String LK_CARRIVA = "";
        public String LK_CARR = "";
        public String LK_NFLIGHT = "";
        public String LK_DFLIGHT = "";
        public String LK_CLAS = "";
        public String LK_FBASE = "";
        public double LK_VCPN = 0d;
        public String LK_MDACP = "";
    }
}