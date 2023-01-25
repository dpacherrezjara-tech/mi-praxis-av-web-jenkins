/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import net.miatech.praxis.A3342;
import net.miatech.beans.Pagination;
/**
 *
 * @author jbazan
 */
public class A3342Filter  extends  A3342{
    public long RN;
    public String VP_CCUST = "";
    public String VP_ENV = "";
    public String VP_ID = "";
    public String VP_COD = "";
    public String VP_SCHEME = "";
    public Integer VP_YEAR = 0;
    public String VP_TPERI = "";
    public Integer VP_PERIO = 0;
    public String VP_DATE_SOURCE = "";
    public Pagination page = new Pagination();
}
