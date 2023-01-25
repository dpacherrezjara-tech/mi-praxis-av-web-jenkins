/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A3268;

/**
 *
 * @author zperez
 */
public class A3268Filter extends A3268 {

    public String IN_OPTION;
    public String IN_DATEFROM;
    public String IN_DATETO;
    public String IN_STATUS;
    public String IN_COUNTRY;
    public String IN_ROBOT;
    public String IN_AREA;
    public String IN_USER;
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

}
