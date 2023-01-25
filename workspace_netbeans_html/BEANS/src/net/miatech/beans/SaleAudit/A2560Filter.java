/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2560;

/**
 *
 * @author ursula
 */
public class A2560Filter extends A2560 {

    public String VP_OPCION = "";
    public String VP_CODRAZ = "";
    public String VP_FAM = "";
    
    public String VP_CIA = "";
    public String VP_FORMA = "";
    public String VP_SERIE = "";
    public String VP_SEQ = "";
    public String VP_CPN = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
