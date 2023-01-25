/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.SQP00942;

/**
 *
 * @author JRM
 */
public class SQP00942Filter extends SQP00942 {

    public String OPCIONTYPE = "";
    public String COMBOBY = "";
    public String CIA = "";
    public String NUMBERADM = "";
    public String DATEFROM = "";
    public String DATETO = "";
       
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
