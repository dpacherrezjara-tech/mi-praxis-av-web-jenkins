/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A3093;

/**
 *
 * @author zperez
 */
public class A3093Filter extends A3093{

    public String VP_OPTION = "";
    public String VP_COUNTRY = "";
    public String VP_DATE1 = "";
    public String VP_DETE2 = "";
    public String VP_FLAG = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

}
