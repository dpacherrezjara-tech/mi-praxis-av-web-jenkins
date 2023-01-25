/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.SQP00981;

/**
 *
 * @author JRM
 */
public class SQP00981Filter extends SQP00981 {

    public String OPCIONTYPE = "";
    public String DATEFROM = "";
    public String DATETO = "";
       
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
