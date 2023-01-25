/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4117;

/**
 *
 * @author ggutierrez
 */
public class A4117Filter extends A4117 {
    
    public String RN = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATE = "";
    public String DATE = "";
    
    public String strDATE = "";
    public String IN_AXPAYNBR = "";
    public String IN_PCURRENCY = "";
    public String IN_MERCHID = "";
    public String IN_IDITEMS = "";
    public String IN_IDITEMT = "";
    public String DES_MERCHANT = "";
    
    // Totales
    public double totTGROSAMOUN = 0;
    public double totDISCRATE = 0;
    public double totDISCRATEBA = 0;
    public double totDISCAMOUN = 0;
    public double totTGROSAMOUC = 0;
    public double totDISCAMOUNC = 0;
    public double totDISCAMOUN_IVA = 0;
    public double totDISCAMOUN_IMPORT = 0;
    public double totDISCAMOUNC_IVA = 0;
    public double totDISCAMOUNC_IMPORT = 0;
    
    public Pagination page = new Pagination();
    
}
