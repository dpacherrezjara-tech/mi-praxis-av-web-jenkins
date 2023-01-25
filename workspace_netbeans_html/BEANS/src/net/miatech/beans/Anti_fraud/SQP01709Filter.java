/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.Anti_fraud;

/**
 *
 * @author jbazan
 */
import net.miatech.praxis.Anti_fraud.SQP01709; 
import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
public class SQP01709Filter  extends SQP01709{
    public String VP_ACTION = "";
    
    public String VP_AIRLI="";
    public String VP_PROGR="";
    public String VP_TREG ="";
    public String VP_ERROR="";
    public String VP_DESCR="";
    
    public String VP_CASO="";
    
    public String VP_FECR = "";
    public String VP_AUX1 = "";
    public String VP_AUX2 = "";
            
    public String OU_SQLCODE = "";
    public String OU_MESSAGE = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
