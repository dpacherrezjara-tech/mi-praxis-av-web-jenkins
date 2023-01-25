/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.plm.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A3080;

/**
 *
 * @author asifuentes
 */
public class A3080Filter extends A3080{
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "";
    public String IN_TKT = "";
    public String IN_IATA = "";
    public long TOTAL = 0;
    public String IN_TTRAN = "";
    public String strPERIOD = "";

    //PAGINACION 
    public Long RN = new Long(0);
    public Pagination page = new Pagination();    
}
