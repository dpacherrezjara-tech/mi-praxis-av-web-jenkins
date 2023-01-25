/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2579;

/**
 *
 * @author rquispe
 */
public class A2579Filter extends A2579 {
    public String IN_ATOS = "";
    public String IN_ZONA = "";
    public String IN_SEASON = "";
    public String IN_CABI = "";
    public String IN_A2579FECVI = "";
     
    //PAGINACION 
    public long RN = 0; 
    public Pagination page = new Pagination();
}
