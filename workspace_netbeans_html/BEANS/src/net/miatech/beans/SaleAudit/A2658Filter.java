/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2658;

public class A2658Filter extends A2658 {
    
    public String VP_ACTION = "";
    public String VP_CODTAX = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    
}
