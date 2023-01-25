/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2865;
/**
 *
 * @author jjulca
 */
public class A2865Filter extends A2865{
    public long RN = 0;
    public Double VALOLD =0.0;
    public Double COMOLD =0.0;
    public Double VALNEW =0.0;
    public Double COMNEW =0.0;
    public Double VALFLO =0.0;
    public Double COMFLO =0.0;
    public String STVAL = "";
    public String FECVAL = "";
    public String FCONT = "";
    public String IDCON = "";
    public String CUPON = "";
    
    public String IN_A2865CCUST = "";
    public String IN_FINI = "";
    public String IN_FFIN = "";
    
    public Pagination page = new Pagination();
}
