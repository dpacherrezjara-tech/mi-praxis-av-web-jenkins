/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2680;

/**
 *
 * @author JRM
 */
public class SQP01023Filter  extends A2680{
    
    public  String VP_DATEFROM = "";
    public  String VP_DATETO = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
    
}
