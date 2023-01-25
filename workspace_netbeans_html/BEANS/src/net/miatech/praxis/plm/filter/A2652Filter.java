/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2652;
/**
 *
 * @author asifuentes
 */
public class A2652Filter extends A2652{
    public String FECHA = "";
    public String HORA = "";
    public String ERRORDESC = "";
    
    //PAGINACION 
    public long RN   =0; 
    public Pagination page = new Pagination();    
}
