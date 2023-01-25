/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import net.miatech.praxis.IMF053;

/**
 *
 * @author jtorres
 */
public class IMF053Filter extends IMF053{
    
    
    public String IN_FECHA = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_TIPO_FEC = "";
    public String IN_TIPO = "";
    public String IN_TKT = "";
    public String strFecha = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strTicket = "";
    
    public String strDesc = "";
    public String strDesc1 = "";
    public String strDesc2 = "";
    public String strDesc3 = "";
    
    
    //Totales
    public long totQTKTEM = 0 ;  
    public double totAMOUNTEM = 0 ;
    public long totQTKTEA = 0 ;  
    public double totAMOUNTEA = 0 ;
    public long totQTKTES = 0 ;   
    public double totAMOUNTES = 0 ; 
    public long totQTKTEMD = 0 ;   
    public double totAMOUNTEMD = 0 ; 
    public long totQTKTMS = 0 ;   
    public double totAMOUNTMS = 0 ; 
    public long totQTKTEV = 0 ;   
    public double totAMOUNTEV = 0 ; 
    public long totQTKTFL = 0 ;  
    public double totAMOUNTFL = 0 ;
    public long totQTKTRF = 0 ;  
    public double totAMOUNTRF = 0 ;
    public long totQTKTEX = 0 ;  
    public double totAMOUNTEX = 0 ;

    public long TOTQTYEMD = 0 ;
    public double TOTAMTEMD = 0 ; 
    public long TOTQTYUSE = 0 ;
    public double TOTAMTUSE = 0 ; 

    public long totTOTQTYEMD = 0 ;
    public double totTOTAMTEMD = 0 ; 
    public long totTOTQTYUSE = 0 ;
    public double totTOTAMTUSE = 0 ; 

    public double  Perc1 = 0 ;
    public double  Perc2 = 0 ;
    public double  Perc3 = 0 ;
    public double  Perc4 = 0 ;
    public double  Perc5 = 0 ;
    public double  Perc6 = 0 ;
    public double  Perc7 = 0 ;  

    public double  totPerc1 = 0 ;
    public double  totPerc2 = 0 ;
    public double  totPerc3 = 0 ;
    public double  totPerc4 = 0 ;
    public double  totPerc5 = 0 ;
    public double  totPerc6 = 0 ;
    public double  totPerc7 = 0 ;  
    
    //IMF054
    public String desUSO1 = "";   
    public String desUSO2 = "";   
    public String desUSO3 = "";   
    public String desUSO4 = "";   
    
    public double totAMOUNT1 = 0;
    public double totAMOUNT2 = 0;
    public double totAMOUNT3 = 0;
    public double totAMOUNT4 = 0;
    
    public Pagination page = new Pagination();
    
}
