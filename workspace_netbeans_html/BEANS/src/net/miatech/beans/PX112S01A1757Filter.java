/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1757;

/**
 *
 * @author vhidalgo
 */
public class PX112S01A1757Filter extends A1757 {
    // In
    public String VP_A1757CCUST = "";
    public String VP_A1757IATA ="";
    public String VP_A1757LOTE ="";
    public String VP_A1757FFACT ="";
    // Out
    public String A003KEY3 = "";
    public double A1728TCOM = 0; 
    public double A1728TIVA = 0;
    public double A1728TCOMI = 0;
    public double A1728TTCAS = 0;
    public double A1728TCAMC = 0;
    // pagin
    public Pagination page = new Pagination();
}
