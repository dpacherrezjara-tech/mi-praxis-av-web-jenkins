/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2678;

public class A2678Filter extends A2678 {
    
    public String VP_CCUST = "";
    public String VP_CIA = "";
    public String VP_FORMA = "";
    public String VP_SERIE = "";
    public String VP_SEQ = "";
    public String VP_CUPON = "";
    public String VP_TRNCU = "";
    public String VP_CORRL = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    
}

