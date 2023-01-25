/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A3354;
/**
 *
 * @author asifuentes
 */
public class A3354Filter extends A3354{
    public String IN_PERIOD = "";
    public String IN_FQTVN = "";
    
    //PAGINACION 
    public long RN = 0; 
    public Pagination page = new Pagination();

    public A3354Filter()
    {
    }
}
