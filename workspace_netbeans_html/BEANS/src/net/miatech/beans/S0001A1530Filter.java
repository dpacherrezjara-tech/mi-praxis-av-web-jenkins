/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1530;

/**
 *
 * @author jmeiggs
 */
public class S0001A1530Filter extends A1530 {
    
    public String AIRLINE = "";
    public String FECHARPT = "";
    public String FUENTE = "";
    public String PAIS = "";
    public String CIUVT = "";
    public String BANCO = "";
    public String STPRO = "";
    public String MONEDA = "";
    public String FLAG = "";
    public String GRUPO = "";
    public String IATA = "";
    public String TKT = "";
    
    //EXTRA
    public String RES = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
