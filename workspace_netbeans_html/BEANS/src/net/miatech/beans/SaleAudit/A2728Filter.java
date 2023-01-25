/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2728;

/**
 *
 * @author zperez
 */
public class A2728Filter extends A2728{
    
    public String VP_OPCION="";
    public String VP_DATEFROM="";
    public String VP_DATETO=""; 
    public String VP_CIA="";
    public String VP_FORMA="";
    public String VP_SERIE="";
    public String VP_TYPE="";
    public String VP_SEQ="";
    public String VP_PAIS="";
    public String VP_IATA="";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
    
}
