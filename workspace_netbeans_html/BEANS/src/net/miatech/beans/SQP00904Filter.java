/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2540;


/**
 *
 * @author JRM
 */
public class SQP00904Filter extends A2540 {

    public String IN_TFILTER = "";
    
    public String IN_TKT = "";
    
    public long RN = 0L;
    
    public Pagination page = new Pagination();
    
    public DBException dbException = new DBException();
}
