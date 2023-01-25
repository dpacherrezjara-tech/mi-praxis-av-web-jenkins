/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.SQP00967;

/**
 *
 * @author JRM
 */
public class SQP00967Filter extends SQP00967 {

    public String OPCIONTYPE = "";
    public String COMBOBY = "";    
    public String DATEFROM = "";
    public String DATETO = "";       
    public String COMBOTYPE = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
