/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.eecta;

import net.miatech.beans.Pagination;

/**
 *
 * @author vhidalgo
 */
public class SQP04000Filter extends A3958 {
    //INPUT 
    public String VP_OPCION = "";
    public String VP_FDATE1 = "";
    public String VP_FDATE2 = "";
    public String VP_CDCLI = "";
    public String VP_RSOCI = "";
    public String VP_NRRPT = "";
    public String VP_REFPG = "";
    public String VP_CTABC = "";
    public String VP_STSPG = "";
    public String VP_BOLETO = "";
    //OUT
    //JOIN:Clientes
    public String A3953RSOCI = "";
    public String A3953BANCO = "";
    public String A3953CTABC = "";
    //CAB
    public String A3957CCUST = "";     
    public String A3957NRRPT = "";  
    public String A3957CDCLI = "";  
    public String A3957CONTR = "";   
    public String A3957FEECC = "";
    public String A3957REFBC = "";
    public String A3957INDPR = "";
    public String A3957INIPR = "";
    public String A3957FINPR = "";
    public String A3957MDLOC = "";
    public double A3957FARE = 0.00;
    public double A3957IVA  = 0.00;
    public double A3957TUA = 0.00;
    public double A3957YR = 0.00;
    public double A3957YQ = 0.00;
    public double A3957OTR = 0.00;
    public double A3957TOT = 0.00;
    public String A3957TOTLT = "";
    public String A3957REGIS = "";
    public String A3957FREGI = "";
    public String A3957HREGI = "";
    public String A3957REVIS = "";
    public String A3957FREVI = "";
    public String A3957HREVI = "";
    //news
    public String A3957STSPG = "";
    public String A3957TIPPG = "";
    public double A3957TOTAP = 0.00;
    public double A3957SALDP = 0.00;
    //Pagination
    public Pagination page = new Pagination();
}
