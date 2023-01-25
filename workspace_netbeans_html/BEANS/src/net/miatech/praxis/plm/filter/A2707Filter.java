/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2707;
/**
 *
 * @author asifuentes
 */
public class A2707Filter extends A2707 {
    public String IN_CCUST = "";
    public String IN_AIRLINE = "";
    public String IN_CRIT = "";
    //Extend
    public String strAirline = "";
    
    //PK
    public String IN_AIRCO_OLD = "";
    public String IN_FECVI_OLD = "";
    public String IN_FCREA_OLD = "";
    public String IN_HCREA_OLD = "";
    public Double IN_MILIN_OLD = .00;
    public Double IN_MIFIN_OLD = .00;
    
    public String strCrit = "";
    //Paginacion
    public long RN = 0; 
    public Pagination page = new Pagination();
}
