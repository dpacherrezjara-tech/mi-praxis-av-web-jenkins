/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author lremicio
 */
public class SQP01530Filter {    
    
    public String VP_CCUST = "";
    public String VP_DFLIGHT = "";
    public String VP_NFLIGHT = "";
    public String VP_CDEPART = "";
    public String VP_CARRIVA = "";
    
    public String DFLIGHT = "";
    public String NFLIGHT = "";
    public String CDEPART = "";
    public String CARRIVA = "";
    public String MDACP = "";
    public String CARR = "";
    public Double VCPN = 0d;
    public Integer QTY_CLAS_Y = 0;
    public Integer QTY_CLAS_J = 0;
    public Double VAL_CLAS_Y = 0d;
    public Double VAL_CLAS_J = 0d;
    
    public int typeColumn = 0;
    
    // Campos para paginar SQL
    public Pagination page = new Pagination();
    
}
