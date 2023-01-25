/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2390;

public class A2390Filter extends A2390 {
    
    public Integer VP_FILTER = 0;
    public String VP_FROM_FILTER = "";
    public String VP_CARRIER = "";
    public String VP_TARRIF = "";
    public String VP_RULE = "";
    public String VP_FARECLASS = "";
    public String VP_FARECLASS1 = "";
    public String VP_CARRIER1 = "";
    public String VP_CARRIER2 = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    
}
