/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2534;

/**
 *
 * @author rmayta
 */
public class SQP00824Filter extends A2534 {

    public String IN_TFILTER = "";
    
    public String IN_BUNDL = "";
    public String IN_RFIC = "";
    public String IN_SUBCD = "";
    
    public long RN = 0L;
    
    public Pagination page = new Pagination();
    
    public DBException dbException = new DBException();
}
