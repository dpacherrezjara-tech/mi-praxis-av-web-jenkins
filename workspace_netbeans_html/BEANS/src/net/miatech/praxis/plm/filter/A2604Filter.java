/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2604;

/**
 *
 * @author magalyb
 */
public class A2604Filter extends A2604{
    public String IN_A2604AIRLI = "";
    public String IN_A2604TICK = "";
    public String IN_FEMI_FROM = "";
    public String IN_FEMI_TO = "";
    public String IN_A2604SEQ = "";
    
    public String TKTREDEMP = "";
    
    //PAGINACION 
    public long RN = 0; 
    public Pagination page = new Pagination();
}
