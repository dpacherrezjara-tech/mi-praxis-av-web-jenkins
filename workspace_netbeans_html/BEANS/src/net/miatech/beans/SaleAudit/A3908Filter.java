/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A3908;

/**
 *
 * @author zperez
 */
public class A3908Filter extends A3908{

    public String IN_OPTION = "";
    public String IN_PREME = "";
    public String IN_TIPO = "";
    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
