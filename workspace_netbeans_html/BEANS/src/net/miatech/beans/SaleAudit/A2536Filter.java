/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2536;

/**
 *
 * @author zperez
 */
public class A2536Filter extends A2536 {
    
    public String VP_FILTER = "";
    public String VP_DATEFROM= "";
    public String VP_DATETO= "";

    public String VP_RUTAFROM= "";
    public String VP_RUTATO= "";
    public String VP_RFNDFROM= "";
    public String VP_RFNDTO= "";
    public String VP_FLOWNFROM= "";
    public String VP_FLOWNTO= "";
    public String VP_NFLOWFROM= "";
    public String VP_NFLOWTO= "";
    
    
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
    
}
