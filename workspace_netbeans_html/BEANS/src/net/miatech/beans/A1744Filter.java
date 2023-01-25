/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.flown.A1744;

/**
 *
 * @author claudia
 */
public class A1744Filter extends A1744 {

    public long RN;
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String yearFrom = "";
    public String monthFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String strDescTipo = "";
    public String strDescDetail = "";
    public String strDescZONA  = "";
    public String strDescCarrier  = "";
    
    public int intQDOC = 0;
    public double dblDOC = 0;
    public int intQAM = 0;
    public double dblAM = 0;
    
    public int intTotQDOC = 0;
    public int intTotQFLIG = 0;
    public int intTotQAM = 0;
    public int intTotQTYPAX = 0;
    public int intTotQTYEMD = 0;
    public int intTotQTYPAXO = 0;
    
    public double dblTotDOC = 0;
    public double dblTotAM = 0;
    public double dblTotTOTPAX = 0;
    public double dblTotTOTEMD = 0;
    public double dblTotTOTPAXO = 0;	
    
    public String CARR  = "";
    public String IN_CARRIER  = "";
    public String CDEPART  = "";
    public String CARRIVA  = "";
    public String CIA  = "";
    public String FORMA  = "";
    public String SERIE  = "";
    
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
