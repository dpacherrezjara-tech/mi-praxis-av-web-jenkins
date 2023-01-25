/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A3652;

/**
 *
 * @author zperez
 */
public class A3652Filter extends A3652 {

    public String IN_OPTION = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_STATUS = "";
    public String IN_COMENT = "";
    public String IN_CODRAZ = "";
    public String IN_PAIS = "";

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
