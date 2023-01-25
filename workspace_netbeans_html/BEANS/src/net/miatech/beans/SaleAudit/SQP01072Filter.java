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
public class SQP01072Filter {
    
    public String VP_DATE = "";
    public String VP_TAXCODE = "";
    public String VP_TAXID = "";
    public String VP_COUNTRY = "";
    public String VP_AIRPORT = "";
    
    public String A1224EFD = "";
    public String A1224EXD = "";
    public String A1224LRT = "";
    public String A1224LAM = "";
    public String A1224LCU = "";
    public String A1224CODE = "";
    public String A1224DET = "";
    public String A1224DAS = "";
    public String A1224DAT = "";
    public String A1224EAM = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
