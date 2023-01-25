/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

/**
 *
 * @author jbazan
 */
import net.miatech.praxis.SaleAudit.SQP01723;
import net.miatech.beans.Pagination;

public class SQP01723Filter extends SQP01723 {
    public int RN=0;
    public String VP_ACTION = "";
    
    public String VP_AIRLI  = "";
    public String VP_CODAC  = "";
    public String VP_INDAC  = "";
    public String VP_VRSAC  = "";
    public String VP_ENV    = "";
    public String VP_TPC    = "";
    public String VP_FOR    = "";
    public String VP_COD    = "";
    public int    VP_CDESQ  = 0;
    public int    VP_YEAR   = 0;
    public String VP_TPERI  = "";
    public int    VP_PERIO  = 0;
    public String VP_COUNTRY = "";
    public String VP_SOURCE  = "";
    
    public Pagination page = new Pagination();
}
