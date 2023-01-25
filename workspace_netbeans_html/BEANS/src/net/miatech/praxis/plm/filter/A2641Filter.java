/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2641;
/**
 *
 * @author asifuentes
 */
public class A2641Filter extends A2641{
    public String IN_CCUST = "";
    public Double IN_NBR = 0.0;
    public String IN_NAME = "";
    public String IN_LEVEL = "";
    
    public Double IN_NBR_OLD = 0.0;
    //Extend
    public String strLevel = "";
    public String strNumber = "";
    public String strFrequentPax = "";
    
    //Paginacion
    public long RN = 0; 
    public Pagination page = new Pagination();
}
