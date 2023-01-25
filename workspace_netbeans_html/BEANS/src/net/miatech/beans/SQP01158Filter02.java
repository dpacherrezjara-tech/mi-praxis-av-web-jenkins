/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;


import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.A2444;


/**
 *
 * @author vhidalgo
 * Reporte PDF Commission Send Mail()
 * Cabecera y Detalle A2444/A1729
 */

public class SQP01158Filter02 extends A2444{
    public String VP_A2444CCUST ="";
    public String VP_A2444IATA ="";
    public String VP_A2444LOTE ="";    
    public String A003KEY1 =""; 
    public List<SQP00792Filter> lstRws = new ArrayList<SQP00792Filter>(0);    
}

