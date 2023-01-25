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
public class SQP01237Filter extends A2775{    
    public String VP_OPCION= "";
    public String VP_CCUST= "";
    public String VP_ANIO= "";       
    public String VP_IATA= "";       
    public String VP_FTE= "";       
    public String VP_SFTE= "";       
    public String VP_PSVTA= "";       
    public String VP_TDOC= "";       
    public String VP_NAME= "";       
    public String VP_PAISE= "";
    public String VP_TRNC = "";
    public String NRO      = ""; 
    // Campos para paginar COBOL
    public String  RECEIVING_STSACT = ""; 
    public String  OPTION_LINE_N = "";
    public String  OPTION_A2775KEYUP = "";  
    public String  OPTION_A2775KEYOUP = ""; 
    public String  OPTION_A2775KEYDN = ""; 
    public String  OPTION_A2775KEYODN = ""; 
    public String  RECEIVING_STSEOF = ""; 
    
    public int typeColumn = 0;
    // Campos para paginar SQL
    public Pagination page = new Pagination();
    
}
