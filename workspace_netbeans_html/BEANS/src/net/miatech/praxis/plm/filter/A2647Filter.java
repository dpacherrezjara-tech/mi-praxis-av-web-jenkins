/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2647;
/**
 *
 * @author asifuentes
 */
public class A2647Filter extends A2647{
    public String IN_CCUST = "";
    public String IN_COUNTRY = "";
    public String IN_REDEMPTION = "";
    public String IN_ZONE = "";

    //Extend
    public String strCountry = "";
    public String strRedention = "";
    
    //PK
    public String IN_TIPO_OLD = "";
    public String IN_COUNTRY_OLD = "";
    public String IN_REDEMPTION_OLD = "";
    
    //Paginacion
    public long RN = 0; 
    public Pagination page = new Pagination();
}
