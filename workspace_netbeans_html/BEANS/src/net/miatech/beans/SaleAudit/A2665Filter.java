/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2665;

/**
 *
 * @author ursula
 */
public class A2665Filter extends A2665 {

    public String VP_OPCION = "";
    public String VP_RFIS = "";
    public String VP_RFIC = "";
    
   public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
