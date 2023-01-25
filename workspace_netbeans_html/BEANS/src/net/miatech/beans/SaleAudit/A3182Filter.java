/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A3182;

/**
 *
 * @author zperez
 */
public class A3182Filter extends A3182 {

    public String VP_FILTER = "";
    public String VP_DATEFROM = "";
    public String VP_DATETO = "";
    public String VP_PAIS = "";
    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
