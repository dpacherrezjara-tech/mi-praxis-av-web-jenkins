/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2419;

public class A2419Filter extends A2419 {
    
    public String VP_FROM_FILTER = "";
    public String VP_CARRIER = "";
    public String VP_ORIGIN = "";
    public String VP_DESTIN = "";
    public String VP_FARECLASS = "";
    public String V_PAX = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    
}
