/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;
import net.miatech.praxis.SaleAudit.A1155;
import net.miatech.beans.Pagination;

/**
 *
 * @author jbazan
 */
public class A1155Filter extends A1155{
    public int RN=0;
    public String IN_STATUS = "";
    public String IN_SELET_CODE = "";
    public String IN_SELET_SERIE = "";
    public String IN_SELET_TYPE = "";
    public String IN_COPY_CODE = "";
    public String IN_COPY_SERIE = "";
    public String IN_COPY_TYPE = "";
    
    public int IN_COPY_INFO = 0;
    public int IN_COPY_GLOBAL = 0;
    public int IN_COPY_SECTOR = 0;
    public int IN_COPY_AX_TABLE = 0;
    
    public Pagination page = new Pagination();
    public String  A1155DAT01 = "";
    public String  A1155DAT02 = "";
    public String  A1155DAT03 = "";
    public String  A1155DAT04 = "";
    public String  A1155DAT05 = "";
}
