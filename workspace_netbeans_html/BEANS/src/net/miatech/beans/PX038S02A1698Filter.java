/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1698;

/**
 *
 * @author rmayta
 */
public class PX038S02A1698Filter extends A1698 {
    public int IN_TFILTER = 0;    
    public String IN_FPRDA_FROM = "";
    public String IN_FPRDA_TO = "";
    public String IN_BANK = "";
    
    public String PPED = "";
    public String CURRENCY = "";
    public long QTY_TRANSACCS = 0;
    public double TOT_GROSS = 0;
    public double TOT_REMITTENCE = 0;    
    public double BSP_COMM = 0;
    public double BSP_TAX = 0;
    public double PRAXIS_COMM = 0;
    public double PRAXIS_TAX = 0;
    public String A1698STCON = "";
    public String A1698STCON_00 = "";
    public String A1698COMEN = "";
    public String IND_CUR = "";    
    public String A1530STPRO_00 = "";
        
    public double TOT_GROSS_PX = 0;
    public double TOT_REMITTENCE_PX = 0;
    public double TOT_OTHER = 0; 
    
    public double TOT_CASH_BSP   = 0;
    public double TOT_CREDIT_BSP = 0;
    public double TOT_CASH_PX = 0;
    public double TOT_CREDIT_PX = 0;
       
     // Paginacion
    public Pagination page = new Pagination();
    
}
