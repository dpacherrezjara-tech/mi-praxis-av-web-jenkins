/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libmiatec.A766;

/**
 *
 * @author rmayta
 */
public class PX031S01A766Filter extends A766 {
    public int IN_TFILTER = 0;
    public String IN_A766AIRLIN = "";
    public String IN_A766CARRIE = "";
    public String IN_A766VLOINI = "";
    public String IN_A766VLOFIN = "";
    public String IN_A766EFF = "";
    public String IN_A766DIS = "";
    
    //Keys
    public String IN_A766AIRLIN_OLD = "";
    public String IN_A766CARRIE_OLD = "";
    public String IN_A766VLOINI_OLD = "";
    public String IN_A766VLOFIN_OLD = "";
    public String IN_A766EFF_OLD = "";
    public String IN_A766DIS_OLD = "";
    
    public long RN = 0;
    
    public String strExcel = "FALSE";
    
    public Pagination page = new Pagination();
}
