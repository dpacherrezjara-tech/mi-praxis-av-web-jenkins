/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4124;

/**
 *
 * @author ctarazona
 */
public class A4124Filter extends A4124 {
    public long RN = 0;
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATE = "";
    public String DATE = "";
    public String IN_FAMEX = "";
    public String IN_STCON = "";
    public String IN_STVAL = "";
    public String descFAMEX = "";
    public String descSTCON = "";
    public String descSTVAL = "";
    public String descFAMEXCHG = "";
    public String PASSED_DAYS = "";    
    public String INVORNBR = "";    
    public String ISREFNBR = "";    
    public double DIFF_AMOUNT = 0;    
    
    public String IN_PRDA = "";    
    public String IN_MERCHID = "";    
    public String IN_ISREFNBR = "";    
    public String IN_INVORNBR = "";    
    public String IN_TKT = "";    
    public String IN_PNR = "";   
    public String DES_CERROR = "";
    
    public Pagination page = new Pagination();
    public String SCARDN = "";
    public String IN_SCARDN1 = "";
    public String IN_SCARDN2 = "";
    public String SAUTHOC = "";
    public String IN_SAUTHOC = "";
    public String IDCONFLE = "";
}
