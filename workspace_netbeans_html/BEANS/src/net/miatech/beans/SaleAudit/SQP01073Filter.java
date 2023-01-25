/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;

/**
 *
 * @author lremicio
 */
public class SQP01073Filter {
    
    public String VP_DATE = "";
    public String VP_AIRPORT = "";
    public String VP_TAXCODE = "";
    public String VP_TAXID = "";
    
    public String A1232CEXEM = "";
    public String A1218DETA1 = "";
    public String A1232EFD = "";
    public String A1232EXD = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
