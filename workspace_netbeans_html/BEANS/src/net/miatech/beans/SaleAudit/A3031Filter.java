/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A3031;

/**
 *
 * @author zperez
 */
public class A3031Filter extends A3031{
    
     public  String VP_COMBOBY = "";
     public  String VP_nro = "";
     public  String VP_DATEFROM = "";
     public  String VP_DATETO = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
    
}
