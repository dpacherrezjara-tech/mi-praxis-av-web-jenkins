/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A3660;

/**
 *
 * @author zperez
 */
public class A3660Filter extends A3660{
    public String IN_OPTION = "";
    public String IN_ANIO = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_SEQ = "";
    public String IN_PREME = "";
    public String IN_TICKET = "";
    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();
    
}
