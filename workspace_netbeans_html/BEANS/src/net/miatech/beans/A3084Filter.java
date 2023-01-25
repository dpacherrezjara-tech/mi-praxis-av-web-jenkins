/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.flown.A3084;
import net.miatech.utils.Functions;

/**
 *
 * @author andrea
 */
public class A3084Filter extends A3084 {

    public int RN = 0;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_TKT = "";

    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";

    public String IN_STVAL = "";
    public String IN_FVAL = "";
    public String IN_CARR = "";
    public String IN_NFLIGHT = "";
    public int IN_TIPOFECHA = 0;
    public String STNEW = "";
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatFVTA = "";
    public String fecha = "";
    public String strTicket = "";
    public String strDescCDEPART = "";
    public String strDescCARRIVA = "";
    public String strDescPSVVTA = "";
    public String strFuente = "";
    public String strDescripcion = "";
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String strSQL = "";
    public String TIPOC = "";
    public String TOPER = "";
    public String strDescSTVAL = "";
    public String strDescFVAL = "";
    public String strDescSTNEW = "";
    public String strDescSTCON = "";
    public String strFCON = "";
    public String FILENAME = "";
    public String BATCHP = "";
    public int difDiasFvlo = 0;
    public int difDiasFvta = 0;
    public String FOPERZUL = "";
    public String strFormatFECVAL = "";
    public String strZona = "";
    public String strDescAgente = "";
    
     public int totQTYCOUP = 0;
     public int totQTYCOUPD = 0;
     public int totQTYCOUPU = 0;
     
     public int totQCPNTOT = 0;
     public int totQCPNTOTD = 0;
     public int totQCPNTOTU = 0;

    public int difVakues = 0;

    public int pos = 0;
    //PAGINACION ===============================================================
    public int PAGNUM = -1;
    public int PAGROW = -1;
    public int TOTPAG = -1;
    public int TOTROW = -1;
    public int PAGINIT = -1;

    public int TOTROWS = -1;
    public int START = 0;
    public int LIMIT = 20;
    public int PAGE = 1;

    public String PrimerstrTicket = "";
    public String strPag = "";
    public String tabla = "";
    public String ccust = "";

    public String strTipo = "";

    public String strQuarter = "";
    public String strFte = "";
    public String TICKET = "";

    public String strCity01 = "";
    public String strCity02 = "";
    public String strCity03 = "";
    public String strCity04 = "";
    public String strCity05 = "";
    public String strCity06 = "";
    public String strCity07 = "";
    public String strCity08 = "";
    public String strCity09 = "";
    public String strCity10 = "";

    public String strCity11 = "";
    public String strCity12 = "";
    public String strCity13 = "";
    public String strCity14 = "";
    public String strCity15 = "";
    public String strCity16 = "";
    public String strCity17 = "";
    public String strCity18 = "";
    public String strCity19 = "";
    public String strCity20 = "";
    public String strCity21 = "";
    public String strCity22 = "";
    public String strCity23 = "";
    public String strCity24 = "";
    
    
    public String strDesCity01 = "";
    public String strDesCity02 = "";
    public String strDesCity03 = "";
    public String strDesCity04 = "";
    public String strDesCity05 = "";
    public String strDesCity06 = "";
    public String strDesCity07 = "";
    public String strDesCity08 = "";
    public String strDesCity09 = "";
    public String strDesCity10 = "";

    public String strDesCity11 = "";
    public String strDesCity12 = "";
    public String strDesCity13 = "";
    public String strDesCity14 = "";
    public String strDesCity15 = "";
    public String strDesCity16 = "";
    public String strDesCity17 = "";
    public String strDesCity18 = "";
    public String strDesCity19 = "";
    public String strDesCity20 = "";
    public String strDesCity21 = "";
    public String strDesCity22 = "";
    public String strDesCity23 = "";
    public String strDesCity24 = "";
    
    
    public String strAIRCODE01 ="";  
    public String strOPECARR01 ="";  
    public String strTKTCARR01 ="";  
    public String strFAREBAS01 ="";  
            
    public String strAIRCODE02 ="";  
    public String strOPECARR02 ="";  
    public String strTKTCARR02 ="";  
    public String strFAREBAS02 ="";  
             
    public String strAIRCODE03 ="";  
    public String strOPECARR03 ="";  
    public String strTKTCARR03 ="";  
    public String strFAREBAS03 ="";  
          
    public String strAIRCODE04 ="";  
    public String strOPECARR04 ="";  
    public String strTKTCARR04 ="";  
    public String strFAREBAS04 ="";  
          
           
    public String strAIRCODE06 ="";  
    public String strOPECARR06 ="";  
    public String strTKTCARR06 ="";  
    public String strFAREBAS06 ="";  
           
    public String strAIRCODE07 ="";  
    public String strOPECARR07 ="";  
    public String strTKTCARR07 ="";  
    public String strFAREBAS07 ="";  
             
    public String strAIRCODE08 ="";  
    public String strOPECARR08 ="";  
    public String strTKTCARR08 ="";  
    public String strFAREBAS08 ="";  
          
    public String strAIRCODE09 ="";  
    public String strOPECARR09 ="";  
    public String strTKTCARR09 ="";  
    public String strFAREBAS09 ="";  
            
    public String strAIRCODE10 ="";  
    public String strOPECARR10 ="";  
    public String strTKTCARR10 ="";  
    public String strFAREBAS10 ="";  
             
    public String strAIRCODE11 ="";  
    public String strOPECARR11 ="";  
    public String strTKTCARR11 ="";  
    public String strFAREBAS11 ="";  
             
    public String strAIRCODE12 ="";  
    public String strOPECARR12 ="";  
    public String strTKTCARR12 ="";  
    public String strFAREBAS12 ="";  
            
    public String strAIRCODE13 ="";  
    public String strOPECARR13 ="";  
    public String strTKTCARR13 ="";  
    public String strFAREBAS13 ="";  
            
    public String strAIRCODE14 ="";  
    public String strOPECARR14 ="";  
    public String strTKTCARR14 ="";  
    public String strFAREBAS14 ="";  
             
    public String strAIRCODE15 ="";  
    public String strOPECARR15 ="";  
    public String strTKTCARR15 ="";  
    public String strFAREBAS15 ="";  
            
    public String strAIRCODE16 ="";  
    public String strOPECARR16 ="";  
    public String strTKTCARR16 ="";  
    public String strFAREBAS16 ="";  
            
    public String strAIRCODE17 ="";  
    public String strOPECARR17 ="";  
    public String strTKTCARR17 ="";  
    public String strFAREBAS17 ="";  
            
    public String strAIRCODE18 ="";  
    public String strOPECARR18 ="";  
    public String strTKTCARR18 ="";  
    public String strFAREBAS18 ="";  
            
    public String strAIRCODE19 ="";  
    public String strOPECARR19 ="";  
    public String strTKTCARR19 ="";  
    public String strFAREBAS19 ="";  
             
    public String strAIRCODE20 ="";  
    public String strOPECARR20 ="";  
    public String strTKTCARR20 ="";  
    public String strFAREBAS20 ="";  
             
    public String strAIRCODE21 ="";  
    public String strOPECARR21 ="";  
    public String strTKTCARR21 ="";  
    public String strFAREBAS21 ="";  
             
    public String strAIRCODE22 ="";  
    public String strOPECARR22 ="";  
    public String strTKTCARR22 ="";  
    public String strFAREBAS22 ="";  
             
    public String strAIRCODE23 ="";  
    public String strOPECARR23 ="";  
    public String strTKTCARR23 ="";  
    public String strFAREBAS23 ="";  
             
    public String strAIRCODE24 ="";  
    public String strOPECARR24 ="";  
    public String strTKTCARR24 ="";  
    public String strFAREBAS24 ="";  
    //Accounting Coupons
    public String FCONT = "";
    public String CARRYER = "";
    public String CIAF = "";
    public String FTYPE = "";
    public int QTY_CPN = 0;
    public double VALOR = 0;
    public double VALOR_YQ = 0;
    public double totVALOR = 0;
    public double VALOR_MXN = 0;
    public double VALOR__YQ_MXN = 0;
    public double totVALOR_MXN = 0;
    public int TOTQTY_CPN = 0;
    public double TOTVALOR = 0;
    public double TOTVALOR_YQ = 0;
    public double TOTtotVALOR = 0;
    public double TOTVALOR_MXN = 0;
    public double TOTVALOR__YQ_MXN = 0;
    public double TOTtotVALOR_MXN = 0;

    public Pagination page = new Pagination();
    
    public String bufferToString(String ccust, String strTicket, String strPag, String tabla, String strTipo) {

        String strValue = "";
        String strKeyUp = "";

        if (tabla.trim().equals("A3084B")) {
            //03 PROGRAMA    PIC X(10).
            strValue += Functions.fillString("PRO11043", 10);
            //03 TABLA       PIC X(10).
            strValue += Functions.fillString("A3084B", 10);

            /**
             * **************************************************************
             */
            //06 K-CCUST         PIC X(03).
            strKeyUp += Functions.fillString(ccust, 3);
            //06 K-DSALES      PIC X(06).
            strKeyUp += Functions.fillString(this.YEAR, 4);
            //06 K-COUNTRYS      PIC X(06).
            strKeyUp += Functions.fillString(this.QUARTER, 1);
            //06 K-VENDOR      PIC X(08).
            strKeyUp += Functions.fillString(this.FTE, 1);
            //06 K-TKT      PIC X(14). --ultimo tkt para pag
            strKeyUp += Functions.fillString(strTicket, 14);
            //03 KEYUP         PIC X(100).
            strKeyUp = Functions.fillString(strKeyUp, 100);
            //03 LK-FILTER     PIC X(100).
            strKeyUp = Functions.fillString(strKeyUp + strTipo, 200);
            //03 PG-DN       PIC X(01).
            strValue += strKeyUp + Functions.fillString(strPag, 1);
            //03 ERR         PIC X(50).
            strValue += Functions.fillString("", 01);
            //03 MSG         PIC X(50).
            strValue += Functions.fillString("", 49);

        }

        //System.out.println(strValue.length());
        return strValue.toUpperCase();
    }
    
        public String bufferToStringTKT(String ccust, String strTicket, String tabla) {

          String strValue = "";
          String strKeyUp = "";
          String strFilter ="";

        if (tabla.trim().equals("A3084B")) {
            //03 PROGRAMA    PIC X(10).
            strValue += Functions.fillString("PRO11043", 10);
            //03 TABLA       PIC X(10).
            strValue += Functions.fillString("A3084D", 10);

            /**
             * **************************************************************
             */
            //06 K-CCUST         PIC X(03).
            strKeyUp += Functions.fillString(ccust, 3);
            //06 K-DSALES      PIC X(06).
            strKeyUp += Functions.fillString(this.YEAR, 4);
            //06 K-COUNTRYS      PIC X(06).
            strKeyUp += Functions.fillString(this.QUARTER, 1);
            //06 K-VENDOR      PIC X(08).
            strKeyUp += Functions.fillString(this.FTE, 1);
            //06 K-TKT      PIC X(14). --ultimo tkt para pag
            strKeyUp += Functions.fillString(strTicket, 14);
            //03 KEYUP         PIC X(100).
            strKeyUp = Functions.fillString(strKeyUp, 100);
            
            strValue += strKeyUp;
            
            //03 LK-FILTER     PIC X(100).
            strFilter += Functions.fillString( this.strTipo, 1);
            
            strFilter += Functions.fillString( this.IN_TKT, 13);
            
            strFilter = Functions.fillString(strFilter, 100);
            strValue += strFilter;
            //03 PG-DN       PIC X(01).
            strValue +=  Functions.fillString(this.strPag.trim(), 1);
            //03 ERR         PIC X(50).
            strValue += Functions.fillString("", 01);
            //03 MSG         PIC X(50).
            strValue += Functions.fillString("", 49);

        }
        //System.out.println(strValue.length());
        return strValue.toUpperCase();
    }
        
}

