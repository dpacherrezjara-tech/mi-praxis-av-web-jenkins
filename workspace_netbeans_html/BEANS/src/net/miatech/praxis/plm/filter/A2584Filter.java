/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2584;

/**
 *
 * @author rquispe
 */
public class A2584Filter extends A2584 {
    public String strFecha = "";
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "" ;
    public String IN_TICKET = "";
    public String IN_TIPOTRX = "";
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
        
    //PAGINACION 
    public long RN = 0; 
    public Pagination page = new Pagination();
}
