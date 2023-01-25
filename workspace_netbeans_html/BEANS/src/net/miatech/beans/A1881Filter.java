/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1881;
/**
 *
 * @author jjulca
 */
public class A1881Filter extends A1881{
    public long RN = 0;
    public String IN_A1881CCUST = "";
    public String IN_A1881FECHA = "";
    public String IN_A1881IATA = "";
    public String IN_A1881NFACT = "";		
    public String IN_A1881FPRO = "";	
    public String IN_A1881PAIS = "";
    public String IN_A1881MONED = "";
    public String IN_A1881PROV = "";
    
    public double A1881ACTIV = 0.0 ;
    public double A1881PASIV = 0.0 ;
    
    public Pagination page = new Pagination(); 
}
