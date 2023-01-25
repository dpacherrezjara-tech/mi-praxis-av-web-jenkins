/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.flown.A1745;

/**
 *
 * @author Jtorres
 */
public class A1745Filter extends  A1745{
    
    public long RN;
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_CARRIER = "";
    public int IN_TIPOFECHA=0;
    public String FECHA= "";
    public String strDescTipo = "";
    public String strDescZONA = "";
    public String strDescCarrier = "";
    public int SumPAX=0;
    public double SumING=0;
    public int TOTSumPAX=0;
    public double TOTSumING=0;
    public int TIPO=0;
    public String strDescStock = "";
    
    
    public int TotQTYPAX=0;
    public int TotQTYPAXO=0;
    public int TotQTYEMD=0;
    public double TotTOTPAX=0;
    public double TotTOTPAXO=0;
    public double TotTOTEMD=0;
    
    public int TotQTYFLIG=0;
    public int TotQTYFLIGO=0; 
    public int TotFLIGHT=0;     
    
    //TOTALES
	    
    public long totQTYPAX = 0;            
    public double totTOTPAX = 0;       
    public long totQTYFLIG= 0;
    //INFORMATION PAX Stock - OAL   
    public long totQTYPAXO= 0;            
    public double totTOTPAXO = 0;        
    public long totQTYFLIGO = 0;
     //INFORMATION OTHERS (EMD)      
    public long totQTYEMD= 0;            
    public double totTOTEMD= 0;
    
    public Pagination page = new Pagination();
}
