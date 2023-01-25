/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A4139;

/**
 *
 * @author zperez
 */
public class A4139Filter extends A4139 {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_OPTION = "";
    public String IN_STATUS = "";
    public String IN_ROBOT = "";
    public String IN_AREA = "";
    public String IN_USER = "";

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
