/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2550;

/**
 *
 * @author zperez
 */
public class SQP00846Filter extends A2550 {

    public String VP_OPCION = "";
    public String VP_DATEFROM = "";
    public String VP_DATETO = "";
    public String VP_NUMBERADM = "";
    public String VP_COUNTRY = "";
    public String VP_STATUS = "";
    public String VP_TRANSACTION = "";
    public String VP_FCONT = "";
    public String VP_FTE = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
