/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2447;

/**
 *
 * @author vhidalgo
 */
public class SQP00801Filter extends A2447 {
    // In
    public String VP_A2447CCUST = "";
    public String VP_A2447IATA ="";
    public String VP_A2447LOTE ="";
    public String VP_A2447FFACT ="";
    // Out
    public String A003KEY3 = "";
    public double A2444TCOM = 0; 
    public double A2444TIVA = 0;
    public double A2444TCOMI = 0;
    public double A2444TTCAS = 0;
    public double A2444TCAMC = 0;
    public double A2444BANKC = 0;
    public double A2444IVA16 = 0;
    // pagin
    public Pagination page = new Pagination();
}
