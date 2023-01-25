/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author jmeiggs
 */
public class PX075S02INF001Filter {
    public String VP_ACTION = "";
    public String VP_CCUST = "";
    public String VP_USR = "";
    public String VP_DESC = "";
    public String VP_CITY = "";
    public String VP_STAT = "";
    public String VP_APLICA = "";
    
    public String TOKEN = "";
    public String DTEXPIRED = "";
    public boolean chkExpiredDate = false;
    public boolean chkPass = false;
    
    
    // out
    public DBException dbException = new DBException();
}
