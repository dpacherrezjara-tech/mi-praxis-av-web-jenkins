/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.SQP00978;

/**
 *
 * @author JRM
 */
public class SQP00978Filter extends SQP00978 {

    public String OPPAIS = "";       
    public String DATEFROM = "";
    public String DATETO = "";       
    public String COMBOTYPE = "";
    public String COMBOSTATUS = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
