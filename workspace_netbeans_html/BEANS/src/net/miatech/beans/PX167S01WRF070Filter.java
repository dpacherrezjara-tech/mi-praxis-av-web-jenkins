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
public class PX167S01WRF070Filter {
    public String IN_AGRUP = "";
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
    public int IN_COLUMNA = 0;
    public String IN_BOOLASC = "";
    
    public WRF070Filter filterTotals = new WRF070Filter();
    public List<WRF070Filter> lstFilterRows = new ArrayList<WRF070Filter>(0);
    
    public Pagination page = new Pagination();
}
