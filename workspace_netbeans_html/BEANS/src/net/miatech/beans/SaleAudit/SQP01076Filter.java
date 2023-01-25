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
public class SQP01076Filter {
    
    public String VP_COUNTRY = "";
    public String VP_AIRPORT = "";
    
    public String A1202CODTA = "";
    public String A1202IDTAX = "";
    public String A1202TNAME = "";
    public String A1334PDEP = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
