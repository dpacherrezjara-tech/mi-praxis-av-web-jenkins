/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.Anti_fraud;
import net.miatech.beans.DBException;
import net.miatech.praxis.Anti_fraud.SQP01743;
import net.miatech.beans.Pagination;
/**
 *
 * @author jbazan
 */
public class SQP01743Filter extends SQP01743{
    public String VP_AIRLI  = "";
    public String VP_CASO  = "";
    public String VP_TREG  = "";
    public String VP_FEMOV  = "";
    public String VP_SECUE  = "";
    public String VP_SECU1  = "";
    public String VP_TKT  = "";
    public String VP_SEQ  = "";
    public String VP_EXCEL  = "";
    
    public String VP_TFOP  = "";
    public String VP_TTARJ  = "";
    public String VP_NREF  = "";
    public String VP_FRECU  = "";
    public String VP_INOEX  = "";
    public String VP_DATE_A  = "";
    public String VP_DATE_B  = "";
    public String VP_AGENCY  = "";
    
    public String VP_COUNTRY  = "";
    public String VP_SOURCE  = "";
    public String VP_CURRENCY  = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
