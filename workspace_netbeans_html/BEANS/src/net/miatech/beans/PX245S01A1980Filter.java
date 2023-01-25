/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1980;

/**
 *
 * @author jmeiggs
 */
public class PX245S01A1980Filter extends A1980{
    // In
    public String VP_ACTION = "";
    public String IN_FPRDA_FROM = "";
    public String IN_FPRDA_TO ="";
    // pagin
    public Pagination page = new Pagination();
    // out Message SQL
    public DBException dbException = new DBException();
}
