/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2644;

/**
 *
 * @author ursula
 */
public class A2644Filter extends A2644 {

    public String VP_OPCION = "";
    public String VP_A2644ID = "";
    public String VP_A2644TIPO = "";
    public String VP_A2644TCODE = "";
    
   
   public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
