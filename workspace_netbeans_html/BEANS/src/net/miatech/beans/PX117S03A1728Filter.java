/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;


import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.A1728;


/**
 *
 * @author vhidalgo
 * Reporte PDF Commission Send Mail()
 * Cabecera y Detalle A1728/A1729
 */

public class PX117S03A1728Filter extends A1728{
    public String VP_A1728CCUST ="";
    public String VP_A1728IATA ="";
    public String VP_A1728LOTE ="";    
    public String A003KEY1 =""; 
    public List<PX117A1729Filter> lstRws = new ArrayList<PX117A1729Filter>(0);    
}

