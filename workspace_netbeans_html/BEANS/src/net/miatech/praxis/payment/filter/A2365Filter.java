/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2365;

/**
 *
 * @author jtorres
 */
public class A2365Filter extends A2365{
    
    
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_TDOC = "";
    public String IN_CARDC = "";
    public String IN_COUNTRY = "";
    public String IN_FTE = "";
    public String IN_TICKET = "";
    
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strDescripcion = "";
    public String strDescripcion1 = "";
    public String strDescripcion2 = "";
    public String strDescripcion3 = "";
    
    
    public Pagination page = new Pagination();
}
