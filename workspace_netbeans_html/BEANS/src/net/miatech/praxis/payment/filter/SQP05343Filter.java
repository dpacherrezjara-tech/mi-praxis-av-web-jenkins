/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4556;

/**
 *
 * @author vhidalgo
 */
public class SQP05343Filter extends A4556 {

    public String VP_FECHA_INI = "";
    public String VP_FECHA_FIN = "";
    public String VP_FECHA_CIE = "";
    public String VP_USER = "";
    public String VP_TIPO = "";
    public DBException dbException = new DBException();
}
