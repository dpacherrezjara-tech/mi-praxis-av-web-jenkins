/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1802;

/**
 *
 * @author vhidalgo
 */
public class PX125S01A1802Filter extends A1802 {
    // In
    public Integer VP_OPCION = 0;
    public String VP_A1802CCUST = "";
    public String VP_TICKET = "";
    public String VP_A1802IATA = "";
    public String VP_A1802LOTEI = "";
    // Out
    public String A003KEY3 = "";
    public String A003KEY3_GP = "";
    public String A1789CIA = "";
    public String A1789FORMA = "";       
    public String A1789SERIE = "";
    // Pagin sql
    public Pagination page = new Pagination();    
    
}
