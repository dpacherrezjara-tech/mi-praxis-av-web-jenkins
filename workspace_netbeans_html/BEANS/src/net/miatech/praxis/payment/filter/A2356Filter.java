/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

/**
 *
 * @author andrea
 */
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2356;

public class A2356Filter extends A2356 {

    public String OPTION = "";
    public String CUSTOMER_ERROR = "";
    public String REFER_ERROR = "";
    public String CODE_ERROR = "";
    public String IN_CCUST = "";
    public String IN_WSETT = "";
    public String IN_TAXES = "";
    public String IN_ERROR = "";
    public String IN_PENDING_F2 = "";
    public String IN_WSALES = "";
    public String IN_PENDING_ACC = "";
    public String IN_PENDING_SENT = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_BANDOC = "";
    public String IN_REFER = "";
    public String IN_CODPRO = "";
    public String IN_IDCONT = "";
    public String IN_HEADER = "";
    public String IN_PROVISION = "";
    public String IN_CODEERROR = "";
    public String IN_SENT = "";
    public String IN_SDATE = "";
    public String IN_DATE = "";
    public String IN_TCOLUM = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4 = "";
    public String strFormatDate5 = "";
    public String strDescripcion = "";
    public String strDescripcion1 = "";
    public String strDescripcion2 = "";
    public String strDescripcion3 = "";
    public String strDescripcion4 = "";
    public String strDescripcion5 = "";
    
    public String DATE_FROM = ""; 
    public String CURRENCY = ""; 
    
    public double VAR_WP_UK_CO = 0;
    public double VAR_BANCARD_CO = 0;
    public double VAR_AMEX_CO = 0;
    public double VAR_DISCOVER_CO = 0;
    
    public double VAR_WP_UK_SA = 0;
    public double VAR_BANCARD_SA = 0;
    public double VAR_AMEX_SA = 0;
    public double VAR_DISCOVER_SA = 0;
    
    public double TOTAL_STATEMENT_WP_UK_CO = 0;
    public double TOTAL_SETTLEMENT_WP_UK_CO = 0;
    public double TOTAL_SALE_WP_UK_CO = 0;
    
    public double STATEMENT_WP_UK_CO = 0;
    public double SETTLEMENT_WP_UK_CO = 0;
    public double SALE_WP_UK_CO = 0;
    public double VAR_WP_CO = 0;
    public double VAR_WP_SA = 0;
    
    public double STATEMENT_BANCARD_CO = 0;
    public double SETTLEMENT_BANCARD_CO = 0;
    public double SALE_BANCARD_CO = 0;
    
    public double STATEMENT_AMEX_CO = 0;
    public double SETTLEMENT_AMEX_CO = 0;
    public double SALE_AMEX_CO = 0;
    
    public double STATEMENT_DISCOVER_CO = 0;
    public double SETTLEMENT_DISCOVER_CO = 0;
    public double SALE_DISCOVER_CO = 0;
    
    public double STATEMENT_WP_UK_SA = 0;
    public double SETTLEMENT_WP_UK_SA = 0;
    public double SALE_WP_UK_SA = 0;
    
    public double STATEMENT_BANCARD_SA = 0;
    public double SETTLEMENT_BANCARD_SA = 0;
    public double SALE_BANCARD_SA = 0;
    
    public double STATEMENT_AMEX_SA = 0;
    public double SETTLEMENT_AMEX_SA = 0;
    public double SALE_AMEX_SA = 0;
    
    public double STATEMENT_DISCOVER_SA = 0;
    public double SETTLEMENT_DISCOVER_SA = 0;
    public double SALE_DISCOVER_SA = 0;
    
    public double TOTAL_STATEMENT_BANCARD_CO = 0;
    public double TOTAL_SETTLEMENT_BANCARD_CO = 0;
    public double TOTAL_SALE_BANCARD_CO = 0;
    
    public double TOTAL_STATEMENT_AMEX_CO = 0;
    public double TOTAL_SETTLEMENT_AMEX_CO = 0;
    public double TOTAL_SALE_AMEX_CO = 0;
    
    public double TOTAL_STATEMENT_DISCOVER_CO = 0;
    public double TOTAL_SETTLEMENT_DISCOVER_CO = 0;
    public double TOTAL_SALE_DISCOVER_CO = 0;
    
    public double TOTAL_STATEMENT_WP_UK_SA = 0;
    public double TOTAL_SETTLEMENT_WP_UK_SA = 0;
    public double TOTAL_SALE_WP_UK_SA = 0;
    
    public double TOTAL_STATEMENT_BANCARD_SA = 0;
    public double TOTAL_SETTLEMENT_BANCARD_SA = 0;
    public double TOTAL_SALE_BANCARD_SA = 0;
    
    public double TOTAL_STATEMENT_AMEX_SA = 0;
    public double TOTAL_SETTLEMENT_AMEX_SA = 0;
    public double TOTAL_SALE_AMEX_SA = 0;
    
    public double TOTAL_STATEMENT_DISCOVER_SA = 0;
    public double TOTAL_SETTLEMENT_DISCOVER_SA = 0;
    public double TOTAL_SALE_DISCOVER_SA = 0;
    
    
    
    public double STATEMENT_TACA = 0;
    public double COMISION_TACA = 0;
    public double OTHERS_TACA = 0;
    public double SETTLEMENT_TACA = 0;
    public double SALE_TACA = 0;
    public double VAR_TACA = 0;
    public double TOTAL_STATEMENT_TACA = 0;
    public double TOTAL_COMISION_TACA = 0;
    public double TOTAL_OTHERS_TACA = 0;
    public double TOTAL_SETTLEMENT_TACA = 0;
    public double TOTAL_SALE_TACA = 0;

    public String Field1 = "";
    public String Field2 = "";
    public String Field3 = "";
    public String Field4 = "";
    public String Field5 = "";
    public String Field6 = "";
    public String Field7 = "";
    public String Field8 = "";
    public int FieldN1 = 0;
    public int FieldN2 = 0;
    public int FieldN3 = 0;
    public int FieldN4 = 0;
    public int FieldN5 = 0;

    public String desCODTRAN = "";
    public String desDESCRI = "";
    public String desTIPREG = "";
    public String desCODEBANK = "";
    public String desSCURRENCY = "";
    public String desSCOUNTRY = "";

    public String IN_CODTRAN = "";
    public String IN_DESCRI = "";
    public String IN_TIPREG = "";
    public String IN_CODEBANK = "";
    public String IN_STVAL = "";
    public String IN_TDOC = "";
    public String IN_FECFILTRO = "";
    public String IN_CONTABLE = "";
    public String IN_CONT = "";
    public String IN_SCURRENCY = "";
    public String IN_SCOUNTRY = "";
    public String IN_SAGENT = "";
    public String IN_PERCENTAGE = "";
    public String IN_CANAL = "";
    public String IN_ORDER = "";
    public String IN_TYPEPERC = "";
    public String IN_CUTDAYS = "";
    public String IN_TOP = "";
    public String IN_TREG = "";
    public String IN_SURPLUS = "";
    public String IN_CARDN1 = "";
    public String IN_CARDN2 = "";
    public String IN_SAUTHOC = "";
    public String IN_SCARDNCOR = "";
    public String IN_DEBTYPE = "";

    public int RN = 0;
    public int QUANTITY = 0;

    public Pagination page = new Pagination();

}
