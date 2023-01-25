/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import net.miatech.praxis.A051;

/**
 *
 * @author jmeiggs
 */
public class PX520S01A051Filter extends A051{
    // In
    public String VP_ACTION = "";
    public String IN_FPRDA_FROM = "";
    public String IN_FPRDA_TO ="";
    // pagin
    public Pagination page = new Pagination();
    // out Message SQL
    public DBException dbException = new DBException();
}
