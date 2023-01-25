/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1789;

/**
 *
 * @author vhidalgo
 */
public class PX124S02A1789Filter extends A1789 {    
    // IN
    
    public Integer VP_OPCION = 0;
    public String VP_A1789IATA = "";
    public String VP_A1789FECVT01 = "";
    public String VP_A1789FECVT02 = "";
    // Out
    public String A003KEY3 = "";
    
    // Pagin sql
    public Pagination page = new Pagination();     
}
