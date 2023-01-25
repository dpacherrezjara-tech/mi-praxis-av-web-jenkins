/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1526;
/**
 *
 * @author asifuentes
 */
public class A1526Filter extends A1526{
    public long RN = 0;
    public int IN_TIPO = 0;
    public String IN_CURR_FROM = "";
    public String IN_CURR_TO = "";
    public String IN_DATE = "";
    public String IN_DATE_2 = "";
    
    public String IN_A1526CUR_OLD = "";
    public String IN_A1526CUR2_OLD = "";
    public String IN_A1526DIS_OLD = "";
    
    public String IDFILE = "";
    public String GRUPOS = "";
    public double TCAMB = 0.0;
    
    public Pagination page = new Pagination();
}