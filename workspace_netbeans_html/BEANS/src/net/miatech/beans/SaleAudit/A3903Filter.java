/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A3903;

/**
 *
 * @author zperez
 */
public class A3903Filter extends A3903 {

    public String IN_IATA = "";
    public String IN_STATUS = "";
    public String IN_OPCION = "";
    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
