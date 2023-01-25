/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2563;

/**
 *
 * @author ursula
 */
public class A2563Filter extends A2563 {

    public String VP_OPCION = "";
    public String VP_PAIS = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
