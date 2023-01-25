/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2252;

/**
 *
 * @author zperez
 */
public class A2252Filter extends A2252 {

    public String VP_FILTER = "";
    public String VP_Type = "";
    public String VP_DATEFROM = "";
    public String VP_DATETO = "";
    public String VP_STATUS = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
