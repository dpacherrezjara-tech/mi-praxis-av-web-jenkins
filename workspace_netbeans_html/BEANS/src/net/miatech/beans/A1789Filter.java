/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1789;

/**
 *
 * @author rmayta
 */
public class A1789Filter extends A1789 {
    public String VP_OPCION = "";
    public String VP_CCUST = "";
    public String VP_FPERDES = "";
    public String VP_FPERHAS = "";
    
    //VHO 
    public String fileName = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
