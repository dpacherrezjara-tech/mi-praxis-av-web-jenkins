/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1698;

/**
 *
 * @author vhidalgo
 */
public class PX038S04A1698Filter extends A1698{
    // opt
    public String IN_ACTION = "";
    // key	    
    public String VP_A1698CCUST="";
    public String VP_A1698SOURC ="";
    public String VP_A1698PAIS="";
    public String VP_A1698BANK="";
    public String VP_A1698FPRDA="";
    public String VP_A1698FFILE="";
    public String VP_A1698HFILE="";
    public String VP_IND_CUR="";
    
    // input
    public String VP_A1698COMEN="";
    public String VP_A1698STCON="";
    // result 
    public DBException dbException = new DBException(); 
}
