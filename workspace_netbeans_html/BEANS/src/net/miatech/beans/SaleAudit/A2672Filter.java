/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2672;

public class A2672Filter extends A2672 {
    
    public Integer VP_FILTER = 0;
    public String VP_FROM_FILTER = "";
    public String VP_TO_FILTER = "";
    public String VP_FROM_FILTER2 = "";
    public String VP_TO_FILTER2 = "";
    public String VP_DATE_FILTER = "";
    
    public String VP_LOTE = "";
    public String VP_IATA = "";
    public String VP_BASE = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    
}
