/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A4014;

/**
 *
 * @author zperez
 */
public class A4014Filter extends A4014 {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_OPTION = "";
    public String IN_NCAMP = "";
    public String IN_MODULO = "";
    public String IN_TIPOM = "";
    public String IN_POLIZ = "";
    public String IN_TPOLI = "";
    public String IN_PRAXID = "";
    public String IN_STATO = "";
    public String IN_ORACLESTATU = "";

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
