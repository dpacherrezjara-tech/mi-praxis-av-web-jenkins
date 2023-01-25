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
public class SQP01512Filter extends A2775{    
    
    public String VP_OPCION = "";
    public String VP_IATA = "";
    public String VP_FTE = "";
    public String VP_PSVTA = "";
    public String VP_NAME = "";
    
    public String RANK = "";
    public String A003KEY = "";
    public String A003TIPO = "";
    public String A003KEY1 = "";
    public String A003CANAL = "";
    public String A003PSALF = "";
    public String A003DEPART = "";
    public String A003DIREC1 = "";
    
    // Campos para paginar SQL
    public Pagination page = new Pagination();
    
}
