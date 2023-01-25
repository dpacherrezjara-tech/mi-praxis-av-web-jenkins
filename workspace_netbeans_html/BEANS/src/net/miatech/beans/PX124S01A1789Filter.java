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
public class PX124S01A1789Filter extends A1789 {
    // In
    public int VP_OPCION = 0;
    public String VP_A1789CCUST = "";
    public String VP_TICKET = "";     
    public String VP_A1789IATA = "";     
    public String VP_A1789FECVT = "";     
    public String VP_A1789FECVT2 = "";  
    public String VP_A1789STAT = "";  
    // dd
    public String A003KEY3 = "";
    public String A1789STAT_00 = "";
    
    // Pagin SQL    
    public Pagination page = new Pagination();    
}
