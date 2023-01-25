/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2282;
/**
 *
 * @author andrea
 */
public class A2282Filter extends A2282 {
     public String IN_ENTIY = "";
     public String IN_TKT = "";
     public String strFecha = "";
     public String strFecha2 = "";
     public String strDescrip = "";
     public String strDescrip2 = "";
     public String strDescrip3 = "";
     public String IN_DATE_FROM = "";
     public String IN_DATE_TO = "";
     public String IN_PERIOD = "";
     public double TOTdblAmount =0; 
     public double dblAmount =0; 
     public long RN = 0; 
     
     public Pagination page = new Pagination();
}
