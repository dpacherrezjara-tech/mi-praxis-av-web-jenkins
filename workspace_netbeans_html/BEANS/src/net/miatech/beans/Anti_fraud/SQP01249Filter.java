/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.Anti_fraud;

/**
 *
 * @author jbazan
 */
import net.miatech.praxis.Anti_fraud.SQP01249; 
import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;

public class SQP01249Filter extends SQP01249{
    public String VP_FILTER = "";
    public String VP_CCUST = "";
    public String VP_CHANNEL = "";
    public String VP_RDATE_A = "";
    public String VP_RDATE_B = "";
    public String VP_RAGENT = "";
    public String VP_RCARDN = "";
    public String VP_TYPE_ERROR = "";
    public String VP_ORDER_BY_TRANS="";
    public String VP_TICKET = "";
    public double IO_TOT_AMOUNT=0;
    public double IO_TOT_SAMOUNT=0;
    public int IO_TOT_TRANS=0;
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
