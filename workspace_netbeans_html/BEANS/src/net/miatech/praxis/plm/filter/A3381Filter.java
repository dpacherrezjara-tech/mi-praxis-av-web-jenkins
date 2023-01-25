/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A3381;

/**
 *
 * @author magalyb
 */
public class A3381Filter extends A3381{
    public String IN_CCUST = "";
    public String IN_A3381FCCRI = "";
    public long IN_A3381FQTVN = 0;
    public String IN_A3381FCINI = "";
    public String IN_A3381FCFIN = "";
    public String IN_A3381CLASI = "";
    public String IN_A3381FCCRI_OLD = "";
    public long IN_A3381FQTVN_OLD = 0;

    //Grid
    public String NBSOC = "";
    public String DCLAS = "";
    
    //Pagination
    public long RN = 0;
    public Pagination page = new Pagination();  
}
