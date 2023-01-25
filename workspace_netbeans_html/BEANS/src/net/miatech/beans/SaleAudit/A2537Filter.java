/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2537;

/**
 *
 * @author zperez
 */
public class A2537Filter extends A2537 {

    public String VP_FILTER = "";
    public String VP_Request1 = "";
    public String VP_Request2 = "";
    public String VP_Rfnd1 = "";
    public String VP_Rfnd2 = "";
    public String VP_Emission1 = "";
    public String VP_Emission2 = "";
    public String VP_Flown1 = "";
    public String VP_Flown2 = "";
    public String VP_System1 = "";
    public String VP_System2 = "";
    public String VP_IATA = "";
    public String VP_Frma = "";
    public String VP_Serie = "";
    public String VP_TourCode = "";
    public String VP_Country = "";
    public String VP_CodWeiver = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
