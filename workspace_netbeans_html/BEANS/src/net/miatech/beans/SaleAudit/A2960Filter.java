/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2960;

/**
 *
 * @author zperez
 */
public class A2960Filter extends A2960 {

    public String IN_STATUS = "";
    public String IN_SELET_TYPE = "";
    public String IN_IATA = "";
    public String IN_OPTION = "";
    public String IN_LOTE = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATEPER1 = "";
    public String IN_DATEPER2 = "";
    public String IN_SELET_BASE = "";
     public String IN_PAIS = "";
    public String IN_CODAC = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
