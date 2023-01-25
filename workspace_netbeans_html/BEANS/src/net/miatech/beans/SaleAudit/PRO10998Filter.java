/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

/**
 *
 * @author jarodriguez
 */
public class PRO10998Filter {
    public static final String AVG = "01";
    public static final String ORI = "02";
    //Linking
    public Linkage link = new Linkage();  
    // In
    public String IN_CCUST = "";
    public String IN_FCONT_FROM = "";
    public String IN_FCONT_TO = "";
    public String IN_OPERATION = "";
    
    public long OU_TOT_COUPON_NUMBER = 0;
    public double OU_TOT_AMOUNT = 0d;
    public double OU_TOT_CPN_FARE_AMT_AVG = 0d;
    
    public long RN = 0L;
    public String LIN = "";
    public String JOURNAL_PERIOD = "";
    public String TICKET_NUMBER = "";
    public String COUPON_NUMBER = "";
    public double AMOUNT = 0d;
    public String SALE_ISSUE_DATE = "";
    public String PASSENGER_NAME = "";
    public String RECORD_LOCATOR_ID = "";
    public String TICKET_ORIGIN = "";
    public String FLOWN_ORIGIN = "";
    public String FLOWN_DESTINATION = "";
    public String FLOWN_FLIGHT_DATE = "";
    public String FLOWN_FLIGHT_NUMBER = "";
    public String CARRIER = "";
    public String JOURNAL_TYPE = "";
    public String ACCOUNT_NUMBER = "";
    public String FARE_BASIS = "";
    public String FARE_CLASS = "";
    public String TKT_DESIGNATOR = "";
    public String IT_CODE = "";
    
    public double DBL_AMOUNT = 0d;
    public long LNG_COUPON_NUMBER = 0L;
    public double DBL_CPN_FARE_AMT_AVG = 0d;
    // Pagin
    public Pagination page = new Pagination();  
    
    public String fileName = "";
}

