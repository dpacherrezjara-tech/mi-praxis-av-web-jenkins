/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2670;

/**
 *
 * @author zperez
 */
public class SQP00982Filter extends A2670 {
    
    public  String VP_OPCION = "";
    public  String VP_DATEFROM = "";
    public  String VP_DATETO = ""; 
    public  String VP_NUMBERADM = "";
    public  String VP_COUNTRY = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
    
}
