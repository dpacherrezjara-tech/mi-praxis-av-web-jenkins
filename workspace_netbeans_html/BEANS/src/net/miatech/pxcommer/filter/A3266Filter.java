/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.pxcommer.filter;

import net.miatech.beans.Pagination;
import net.miatech.pxcommer.A3266;

/**
 *
 * @author asifuentes
 */
public class A3266Filter extends A3266{
    public String IN_CCUST = "";
    public String IN_TIPO = "";
    public String IN_VINI = "";
    public String IN_VFIN = "";
    public double IN_VALOR = 0.0;
    public String IN_MONED = "";
    public String IN_USR = "";
    public String IN_FEC = "";
    public String IN_HOR = "";
    public String IN_TIPO_OLD = "";
    public String IN_VINI_OLD = "";
    
    //PAGINACION 
    public long RN = 0; 
    public Pagination page = new Pagination();
}
