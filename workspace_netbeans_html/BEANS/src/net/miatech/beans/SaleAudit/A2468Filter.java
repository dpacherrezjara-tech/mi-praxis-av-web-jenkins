/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2468;

public class A2468Filter extends A2468 {
    
    public Integer VP_FILTER = 0;
    public String VP_FROM_FILTER = "";
    public String VP_TO_FILTER = "";
    public String VP_CARRIER = "";
    
    
    public String VP_RECTY = "";
    public String VP_ACTIO = "";
    public String VP_TARNO = "";
    public String VP_CXRCO = "";
    public String VP_FTNT = "";
    public String VP_CATNO = "";
    public String VP_SEQNO = "";
    public String VP_EFF = "";
    
    public String VP_LOC1 = "";
    public String VP_LOC2 = "";
    
    public String VP_TABLE = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    
}
