/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1826;

/**
 *
 * @author vhidalgo
 */
public class PX144S01A1826Filter extends A1826 {
     // In
    public String VP_A1826CCUST = "";
    public String VP_A1826GSA ="";
    public String VP_A1826LOTE ="";
    public String VP_A1826FFACT ="";
    // Out
    public String A1839RSOC = "";  
    public String TFACTURA = "";  
    
    // pagin
    public Pagination page = new Pagination();
}
