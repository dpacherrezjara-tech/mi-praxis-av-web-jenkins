/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2597;

/**
 *
 * @author jjulca
 */
public class A2597Filter extends A2597{
    public long RN;
    public String IN_CCUST = "";
    public String IN_CCIA = "";
    public String IN_FECVAL = "";
    public String IN_FCONT = "";
    public String IN_FINI = "";
    public String IN_FFIN = "";
    
    public Double TOTSQTYCPN = 0.0;
    public Double TOTSVCPUS = 0.0;
    public Double TOTSCOMISI = 0.0;
    public Double TOTSVTAX = 0.0;
    public Double TOTQTYCPN = 0.0;   
    public Double TOTVCPUS = 0.0;
    public Double TOTCOMISI = 0.0;
    public Double TOTVTAX = 0.0;
    public Double TOTPQTYCPN = 0.0;
    public Double TOTPAVCPUS = 0.0;
    public Double TOTPACOMISI = 0.0;
    public Double TOTPAVTAX = 0.0;
    public Double TOTPPVCPUS = 0.0;
    public Double TOTPPCOMISI = 0.0;
    public Double TOTPPVTAX = 0.0;
    
    public String CURRENCY = "";
    public String MODULO = "";
    public Double QTY = 0.0;
    public Double FARE = 0.0;
    public Double ISC = 0.0;
    public Double TAX = 0.0;
    public Double NETO = 0.0;
    
    public Pagination page = new Pagination();
}
