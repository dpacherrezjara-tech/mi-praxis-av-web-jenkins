/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author rmayta
 */
public class PX167S02A1462Filter {
    public String IN_CCUST = "";
    public String IN_FFILTRO = "";
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "";
    public String IN_CURRENCY = "";
    public String IN_AREA = "";
    public String IN_REGION = "";
    public String IN_COUNTRY = "";
    public String IN_CITY = "";
    public String IN_CCIA = "";
    public String IN_GROUPA = "";
    public String IN_CZONA = "";
    public String IN_FACTUAL = "";
    
    public A1462Filter2 filterTotals = new A1462Filter2();
    public List<A1462Filter2> lstFilterRows = new ArrayList<A1462Filter2>(0);
    
    public Pagination page = new Pagination();
}
