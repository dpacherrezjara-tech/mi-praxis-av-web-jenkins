/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2714;
/**
 *
 * @author asifuentes
 */
public class A2714Filter extends A2714{
    public String IN_CCUST = "";
    public String IN_PROGRAM = "";

    //Extend
    public String strRecord = "";
    
    
    //PK
    public String IN_PROGRAM_OLD = "";
    public double IN_COD_OLD = 0;
    //Paginacion
    public long RN = 0; 
    public Pagination page = new Pagination();
}
