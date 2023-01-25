/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2775;

/**
 *
 * @author vhidalgo
 */
public class SQP01500Filter extends A2775{    
    
    public String VP_OPCION = "";
    public String VP_ANIO = "";
    public String VP_SFTE = "";
    public String VP_TRNC = "";
    public String VP_IATA = "";
    public String VP_PSVTA = "";
    public String VP_PARM1 = "";
    
    public int typeColumn = 0;
    
    // Campos para paginar SQL
    public Pagination page = new Pagination();
    
}
