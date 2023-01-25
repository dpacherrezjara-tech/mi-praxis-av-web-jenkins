/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A2648;
/**
 *
 * @author asifuentes
 */
public class A2648Filter extends A2648{
    public String IN_CCUST = "";
    public String IN_ORIG = "";
    public String IN_DEST = "";
    public String IN_REDEMPTION = "";

    //Extend
    public String strRedention = "";
    
    //PK
    public String IN_TIPO_OLD = "";
    public String IN_ORIG_OLD = "";
    public String IN_DEST_OLD = "";
    public String IN_REDEMPTION_OLD = "";
    public String IN_FVIG_OLD = "";
    //Paginacion
    public long RN = 0; 
    public Pagination page = new Pagination();
}
