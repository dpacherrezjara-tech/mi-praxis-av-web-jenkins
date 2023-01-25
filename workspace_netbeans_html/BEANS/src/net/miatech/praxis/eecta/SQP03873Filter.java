/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.eecta;

import net.miatech.beans.Pagination;

/**
 *
 * @author vhidalgo
 */
public class SQP03873Filter extends A3957 {    
    public String VP_OPCION = "";
    public String VP_FDATE1 = "";
    public String VP_FDATE2 = "";
    public String VP_CDCLI  = "";
    public String VP_RSOCI  = "";
    public String VP_NRRPT  = "";     
    //JOIN
    public String A3953RSOCI  = "";     
    public Pagination page = new Pagination();
}
