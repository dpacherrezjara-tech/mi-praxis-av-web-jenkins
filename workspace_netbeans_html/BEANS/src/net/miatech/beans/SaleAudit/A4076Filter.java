/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A4076;
import net.miatech.praxis.SaleAudit.A4077;
import net.miatech.praxis.SaleAudit.A4078;

/**
 *
 * @author zperez
 */
public class A4076Filter extends A4076 {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_OPTION = "";
    public String IN_IATA = "";
    public String IN_COUNTRY = "";
    public String IN_TYPE = "";
    public String IN_TICKET = "";
    public String IN_STATUSBPO = "";
    public String IN_STATUS = "";
    public String IN_PREME = "";
    public String IN_USER = "";
    public String IN_ANIO = "";
    public String IN_CORR = "0";
    public String IN_SEQ = "0";

    public List<A4077> lst_CardType = new ArrayList<A4077>(0);
    public List<A4078> lst_TAXES = new ArrayList<A4078>(0);

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
