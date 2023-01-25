/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A3329;

/**
 *
 * @author zperez
 */
public class A3329Filter extends A3329{

    public String VP_OPCION = "";
    public String VP_COXPADRE = "";
    public String VP_DATEFROM = "";
    public String VP_DATETO = "";
    public String VP_COUNTRY = "";
    public String VP_CHANNEL = "";
    public String VP_STATUS = "";
    public String VP_USER = "";
    public String VP_IATA = "";
    public String VP_ROUTE= "";
    public String VP_ARCHV= "";
    public String VP_DESPCRI= "";
    public String VP_TKT= "";
    public String VP_SEQ= "";
    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
