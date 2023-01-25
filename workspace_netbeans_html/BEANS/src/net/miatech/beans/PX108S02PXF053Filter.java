/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.PXF053;

/**
 *
 * @author rmayta
 */
public class PX108S02PXF053Filter extends PXF053 {
    public String IN_WKSTAT = "";
    public String IN_FREPOR_FROM = "";
    public String IN_FREPOR_TO = "";
    public String IN_MDA = "";
    
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    
    public Pagination page = new Pagination();
    
    public long RN = 0L;
    
    public double A1530_A1720_CA_SUM = 0d;
    public double A1530_A1720_CC_SUM = 0d;
    public double A1530_A1720_EX_SUM = 0d;
    public double A1530_A1720_TV_SUM = 0d;
    
    public String STATUS_RECORD = "";
    
    public String userLastModify = "";
    public String dateLastModify = "";
}
