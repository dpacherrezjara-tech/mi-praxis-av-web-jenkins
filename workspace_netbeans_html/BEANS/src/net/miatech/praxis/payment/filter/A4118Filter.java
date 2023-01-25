/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4118;

/**
 *
 * @author ggutierrez
 */
public class A4118Filter extends A4118 {

    public String RN = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATE = "";
    public String DATE = "";

//    public String IN_SDATE = "";
//    public String IN_EPAAMEDATA = "";
    public String strDATE = "";
    public String IN_AXPAYNBR = "";
    public String IN_PCURRENCY = "";
    public String IN_MERCHID = "";
    public String DES_MERCHANT = "";
    public String descSTCON = "";
    public String descTDOC = "";

    //Totales
    public double totSGROSAMOS = 0;
    public double totGROSAMOUN = 0;
    public double totDISCAMOUN = 0;
    public double totSFEEAMOUN = 0;
    public double totSFEEAMOUNC = 0;
    public double totTAXAMOUN = 0;
    public double totNETAMOUN = 0;
    public double totSDGROSSA = 0; 
    public double totSCGROSSA = 0;
    
    public double totTRANCOUNT = 0;
    public double totINSTANBR = 0;
    
    public double totGROSAMOUNC = 0; 
    public double totDISCAMOUNC = 0; 
    public double totTAXAMOUNC = 0;
    public double totNETAMOUNC = 0; 
    public double totTRANCOUNTC = 0;

    public Pagination page = new Pagination();

}
