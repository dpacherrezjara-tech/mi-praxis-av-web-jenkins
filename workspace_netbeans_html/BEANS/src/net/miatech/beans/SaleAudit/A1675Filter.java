/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A1675;

public class A1675Filter extends A1675 {
    
    public Integer VP_FILTER = 0;
    public String VP_CCUST = "";
    public String VP_CIA = "";
    public String VP_FRMSRIE = "";
    public String VP_SEQ = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    
}
