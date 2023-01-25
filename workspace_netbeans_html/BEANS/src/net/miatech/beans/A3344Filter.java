/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import net.miatech.praxis.A3344;

/**
 *
 * @author zperez
 */
public class A3344Filter extends A3344 {
    
    public Number RN=0;
    public String VL_DATEFROM = "";
    public String VL_DATETO = ""; 
    public String VP_USER = "";
    public String VP_TKT = "";
    public String VP_CIA = "";
    public String VP_FUENT = "";
    public String VP_STAS = "";
    public String VP_TYPE = "";
    public String VP_SEQ = "";
     public String VP_OPTION = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
    
}
