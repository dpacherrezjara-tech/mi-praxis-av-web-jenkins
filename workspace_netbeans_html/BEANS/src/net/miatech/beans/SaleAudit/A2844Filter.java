/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2844;

/**
 *
 * @author zperez
 */
public class A2844Filter extends A2844{

    public String IN_STATUS= "";
    public String IN_SELET_TYPE= "";
    public String IN_IATA= "";
    public String IN_OPTION= "";
    public String IN_DATEFROM= "";
    public String IN_DATETO= "";
    public String IN_FILENAMES= "";
    public String IN_NUMBERWeekly= "";
    public String IN_COUNTRY= "";
    
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
