/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1775;

/**
 *
 * @author vhidalgo
 */
public class SQP00105Filter  extends A1775{
    // In
    public String VP_ACTION  = "";
    public String VP_A1775CCUST = "";
    public String VP_A1775GSA   = "";
    public String VP_A1775PAIS  = "";
    public String VP_A1775LOTE  = "";
    public String VP_A1775MDALC = "";
    // Out Message SQL
    public DBException dbException = new DBException();
}
