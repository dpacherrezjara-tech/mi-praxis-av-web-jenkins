/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;
import net.miatech.praxis.payment.A2370;
import net.miatech.beans.Pagination;
/**
 *
 * @author andrea
 */
public class A2370Filter extends A2370{
    
    public String IN_TICKET ="";
    public String IN_CCIA="";
    public String IN_FORMA="";
    public String IN_SERIE="";
    public String IN_DATE_FROM="";
    public String IN_DATE_TO="";
    public String IN_SEQ="";
    public String strFormatDate="";
    public String strFormatDate1="";
    public String strFecha="";
    public String strFecha2="";
    public String strDescrip="";
    public String strDescrip2="";
    public String strDescrip3="";
	    
    
    //Venta
    public double totSVFOP = 0;
    public double totSVFOPUSD = 0;
    public double totCPSVFOP = 0;
    public double totCPSVFOPUSD = 0;
    public double totCWSVFOP = 0;
    public double totCWSVFOPUSD = 0;
    
    //Refund
    public double SVFOPRF = 0; 
    public String SCURRENCRF= "";    
    public double SVFOPUSDRF = 0;
    public String CCSCURRENCRF= "";    

    public double CPSVFOPRF = 0;
    public double CPSVFOPUSDRF = 0;
    public double CWSVFOPRF = 0;
    public double CWSVFOPUSDRF= 0;
    
    public double totSVFOPRF = 0;
    public double totSVFOPUSDRF = 0;
    public double totCPSVFOPRF = 0;
    public double totCPSVFOPUSDRF = 0;
    public double totCWSVFOPRF = 0;
    public double totCWSVFOPUSDRF = 0;
    
     public long RN = 0; 
     public Pagination page = new Pagination();
}
