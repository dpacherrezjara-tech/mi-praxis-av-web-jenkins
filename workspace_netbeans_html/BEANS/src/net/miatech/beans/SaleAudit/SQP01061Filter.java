/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;

/**
 *
 * @author lremicio
 */
public class SQP01061Filter {
    
    public String VP_DATE = "";
    public String VP_TAXID = "";
    public String VP_COUNTRY = "";
    public String VP_TAXCODE = "";
    
    public String IDTAX = "";
    public String TAXNAME = "";
    public String CODCOUNTRY = "";
    public String NOMCOUNTRY = "";
    public String TAXCODE = "";
    public String TAXDEFINITION = "";
    public String APPDESCRIPTION = "";
    public String COLDESCRIPTION = "";
    public String APPICABLETO = "";
    public String COMMENTS = "";
    public String INTERLINEABLE = "";
    public String SELLING = "";
    public String LIFTING = "";
    public String OTHERS = "";
    public String SALE = "";
    public String DEPARTURE = "";
    public String ARRIVAL = "";
    public String LASTDATE = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
