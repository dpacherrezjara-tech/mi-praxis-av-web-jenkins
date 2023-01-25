/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2559;
/**
 *
 * @author jjulca
 */  
public class A2559Filter extends A2559{
    public long RN;
    public String IN_A2559CCUST = "";
    public String IN_A2559MODO = "";
    public String IN_A2559FPRO = "";
    public String IN_A2559FFILE = "";
    public String IN_FINI = "";
    public String IN_FFIN = "";
    public String IN_PARAM = "";
    
    public Double A2559DFARE = 0.0;
    public Double A2559DTAX = 0.0;
    public Double A2559DISC = 0.0;
    
    public Pagination page = new Pagination();
}
