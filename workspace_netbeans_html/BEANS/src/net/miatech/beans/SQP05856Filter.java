/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author jmeiggs
 */
public class SQP05856Filter {
    public String VP_ACTION = "";
    public String VP_CCUST = "";
    public String VP_USR = "";
    public String VP_DESC = "";
    public String VP_CITY = "";
    public String VP_STAT = "";
    public String VP_APLICA = "";
    public String VP_EMAIL = "";
    public String VP_NOM = "";
    public String VP_APE = "";
    public String VP_CARGO = "";
    public String VP_CODEM = "";
    
    public String TOKEN = "";
    public String DTEXPIRED = "";
    public boolean chkExpiredDate = false;
    public boolean chkPass = false;
    
    
    // out
    public DBException dbException = new DBException();
}
