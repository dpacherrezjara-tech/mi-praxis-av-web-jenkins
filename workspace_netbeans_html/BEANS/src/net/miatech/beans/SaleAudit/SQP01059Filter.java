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
public class SQP01059Filter {
    
    public String VP_COUNTRY = "";
    public String VP_TAXCODE = "";

    public String A1224ORG = "";
    public String A1007NOMBR = "";
    public String A1334PDEP = "";
    public String A1334PARR = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
