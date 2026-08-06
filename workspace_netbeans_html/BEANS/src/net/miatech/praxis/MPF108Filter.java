/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis;

import net.miatech.beans.Pagination;

/**
 *
 * @author singa
 */
public class MPF108Filter {
    
    public Pagination page = new Pagination();
    public String IN_CCUST = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_ACCOUNT = "";
    // null = not used (existing IN_ACCOUNT-based drill-downs); non-null (incl. "") selects the STVAL-based drill-down
    public String IN_STVAL = null;
    public String IN_CFUENTE = "";
    public String IN_SOCIETY = "";
    public String IN_COUNTRY = "";
    public String IN_SOURCE = "";
    public String IN_TREG = "";
    public String IN_STATUS = "";
    public String IN_AGENT = "";
    public String IN_TICKET = "";
    public String IN_PNR = "";
    public String IN_SCARDN = "";
    public String IN_SCARDNCOR = "";
    public String IN_AUTHORIZATION = "";
    public String IN_CCTYPE = "";
    public double IN_AMOUNT = 0;
    public String IN_INVOICE = "";
    public String IN_CURRENCY = "";
    public String IN_BANDOC = "";
    public String IN_STATUSACC = "";
    public String IN_TDOC = "";
    public String IN_SPAYMENT = "";
    
}
