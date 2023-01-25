/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.Anti_fraud;

/**
 *
 * @author jbazan
 */
import net.miatech.praxis.Anti_fraud.SQP01697; 
import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
public class SQP01697Filter extends SQP01697{
    public String VP_ACTION = "";
    public String VP_AIRLI = "";
    public String VP_TREG  = "";
    public String VP_CLAVE = "";
    public String VP_FEVIG = "";
    public String VP_TFOP  = "";
    public String VP_TTARJ = "";
    public String VP_INOEX = "";
    public String VP_DESCR = "";
    
    public String VP_AUX1 = "";
    public String VP_AUX2 = "";
            
    public String OU_SQLCODE = "";
    public String OU_MESSAGE = "";
    
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
