/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A4022;

/**
 *
 * @author vhidalgo
 */
public class SQP04091Filter extends A4022 {
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_OPTION = "";    
    public String IN_MODULO = "";
    public String IN_TIPOM = "";    
    public String IN_STATO = ""; 
    public String IN_STAT1 = ""; 
    public String IN_STAT2 = ""; 
    public String IN_CCUST = ""; 
    public String IN_EXTRACTION_DATE = ""; 
    public String IN_INTERFACE = ""; 
    public String IN_REFERENCIA = ""; 
    public String IN_NUMBER_ACCOUNT = ""; 
    public String IN_SALES_DATE = ""; 
    public String IN_VALUE_DATE = ""; 
    public String IN_PROCESSOR = ""; 
    
    
    public String CODPRO = ""; 
    public String CURRENCY = ""; 
    public String TDOC = ""; 
    public String VALDATE = ""; 
    public String MONTH_NAME = ""; 
    public String HOLIDAY_TACA = ""; 
    public String HOLIDAY_WP_UK = ""; 
    public String HOLIDAY_WP_BANCARD = ""; 
    public String HOLIDAY_AMEX = ""; 
    public String HOLIDAY_DISCOVER = ""; 
    public String DATE_FROM = ""; 
    public String NUMBER_WEAK = ""; 
    public String NUMBERWEAK = ""; 
    public String WEEK_START_DATE = ""; 
    public String WEEK_END_DATE = ""; 
    public String DAY_NUMBER_EKED = ""; 
    public String DAY_NAME = ""; 
    public String SDATE = ""; 
    public String SAGENT = ""; 
    public String SCURRENCY = ""; 
    public String MERCHAND = ""; 
    public String ACCNUMA = ""; 
    public String SDATE100 = ""; 
    public String SAGENT100 = ""; 
    public String SCURRENCY100 = ""; 
    public String FERECV = ""; 
    public String HORECV = ""; 
    
    public double AXAV = 0;
    public double AXTA = 0;
    public double DS = 0;
    public double WQ = 0;
    public double WP = 0;
    public double RR = 0;
    public double PAXAV = 0;
    public double PAXTA = 0;
    public double PDS = 0;
    public double PWQ = 0;
    public double PWP = 0;
    public double PORAXAV = 0;
    public double PORAXTA = 0;
    public double PORDS = 0;
    public double PORWQ = 0;
    public double PORWP = 0;
    
    public double TOTAL = 0;
    public double SVFOP100 = 0;
    public double SVFOP100W = 0;
    public double SVFOP100O = 0;
    public double SVFOP100P = 0;
    public double SVFOP100T = 0;
    public double VARIACION = 0;
    public double IMPORTE = 0;
    public double PORCENTAJE_VARIACION = 0;
    
    public double AMOUNT_WP_UK_CO = 0;
    public double AMOUNT_BANCARD_CO = 0;
    public double AMOUNT_AMEX_CO = 0;
    public double AMOUNT_DISCOVER_CO = 0;
    public double AMOUNT_WP_UK_SA = 0;
    public double AMOUNT_BANCARD_SA = 0;
    public double AMOUNT_AMEX_SA = 0;
    public double AMOUNT_DISCOVER_SA = 0;
    public double TOTAL_CO = 0;
    public double TOTAL_SA = 0;
    public double TOTAL_CO_AND_SA = 0;
    
    public double AVG_WP_UK_CO = 0;
    public double AVG_BANCARD_CO = 0;
    public double AVG_AMEX_CO = 0;
    public double AVG_DISCOVER_CO = 0;
    public double AVG_WP_UK_SA = 0;
    public double AVG_BANCARD_SA = 0;
    public double AVG_AMEX_SA = 0;
    public double AVG_DISCOVER_SA = 0;
    public double AVG_TOTAL_CO = 0;
    public double AVG_TOTAL_SA = 0;
    public double AVG_TOTAL_CO_SA = 0;
    
    public double VAR_WP_UK_CO = 0;
    public double VAR_BANCARD_CO = 0;
    public double VAR_AMEX_CO = 0;
    public double COMISION_AMEX_CO_SUM = 0;
    public double OTHERS_AMEX_CO = 0;
    public double VAR_DISCOVER_CO = 0;
    public double COMISION_DISCOVER_CO_SUM = 0;
    public double OTHERS_DISCOVER_CO = 0;
    public double COMISION_BANCARD_CO_SUM = 0;
    public double OTHERS_BANCARD_CO = 0;
    
    public double VAR_WP_UK_SA = 0;
    public double VAR_BANCARD_SA = 0;
    public double COMISION_BANCARD_SA_SUM = 0;
    public double OTHERS_BANCARD_SA = 0;
    public double VAR_AMEX_SA = 0;
    public double COMISION_AMEX_SA_SUM = 0;
    public double OTHERS_AMEX_SA = 0;
    public double VAR_DISCOVER_SA = 0;
    public double COMISION_DISCOVER_SA_SUM = 0;
    public double OTHERS_DISCOVER_SA = 0;
    
    public double VAR_TOTAL_CO = 0;
    public double VAR_TOTAL_SA = 0;
    public double VAR_TOTAL_CO_SA = 0;
    
    public double STATEMENT_WP_UK_CO = 0;
    public double SETTLEMENT_WP_UK_CO = 0;
    public double SALE_WP_UK_CO = 0;
    public double COMISION_WP_UK_CO_SUM = 0;
    public double OTHERS_WP_UK_CO = 0;
    public double VAR_WP_CO = 0;
    public double VAR_WP_SA = 0;
    public double COMISION_WP_UK_SA_SUM = 0;
    public double OTHERS_WP_UK_SA = 0;
    
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
    
    
    
    public double TOTAL_AMOUNT_WP_UK_CO = 0;
    public double TOTAL_AMOUNT_BANCARD_CO = 0;
    public double TOTAL_AMOUNT_AMEX_CO = 0;
    public double TOTAL_AMOUNT_DISCOVER_CO = 0;
    
    public double TOTAL_AMOUNT_WP_UK_SA = 0;
    public double TOTAL_AMOUNT_BANCARD_SA = 0;
    public double TOTAL_AMOUNT_AMEX_SA = 0;
    public double TOTAL_AMOUNT_DISCOVER_SA = 0;
    
    public double TOTAL_TOTAL_CO = 0;
    public double TOTAL_TOTAL_SA = 0;
    public double TOTAL_TOTAL_CO_AND_SA = 0;
    
    public double TOTAL_AVG_WP_UK_CO = 0;
    public double TOTAL_AVG_BANCARD_CO = 0;
    public double TOTAL_AVG_AMEX_CO = 0;
    public double TOTAL_AVG_DISCOVER_CO = 0;
    
    public double TOTAL_AVG_WP_UK_SA = 0;
    public double TOTAL_AVG_BANCARD_SA = 0;
    public double TOTAL_AVG_AMEX_SA = 0;
    public double TOTAL_AVG_DISCOVER_SA = 0;
    
    public double TOTAL_AVG_TOTAL_CO = 0;
    public double TOTAL_AVG_TOTAL_SA = 0;
    public double TOTAL_AVG_TOTAL_CO_SA = 0;
    
    public double TOTAL_VAR_WP_UK_CO = 0;
    public double TOTAL_VAR_BANCARD_CO = 0;
    public double TOTAL_VAR_AMEX_CO = 0;
    public double TOTAL_VAR_DISCOVER_CO = 0;
    
    public double TOTAL_VAR_WP_UK_SA = 0;
    public double TOTAL_VAR_BANCARD_SA = 0;
    public double TOTAL_VAR_AMEX_SA = 0;
    public double TOTAL_VAR_DISCOVER_SA = 0;
    
    public double TOTAL_VAR_TOTAL_CO = 0;
    public double TOTAL_VAR_TOTAL_SA = 0;
    public double TOTAL_VAR_TOTAL_CO_SA = 0;
    
    public double TOTAL_AMOUNT_TACA = 0;
    public double TOTAL_AMOUNT_CRC = 0;
    public double TOTAL_AMOUNT_TACA_CRC = 0;
    public double TOTAL_AVG_TACA_CRC = 0;
    public double TOTAL_VAR_TACA_CRC = 0;
    public double TOTAL_TOTAL_TACA = 0;
    public double TOTAL_TOTAL_CRC = 0;
    public double TOTAL_TOTAL_TACA_CRC = 0;
    public double TOTAL_AVG_TACA = 0;
    public double TOTAL_AVG_CRC = 0;
    public double TOTAL_AVG_TOTAL_TACA = 0;
    public double TOTAL_AVG_TOTAL_CRC = 0;
    public double TOTAL_AVG_TOTAL_TACA_CRC = 0;
    public double TOTAL_VAR_TACA = 0;
    public double TOTAL_VAR_CRC = 0;
    public double TOTAL_VAR_TOTAL_TACA = 0;
    public double TOTAL_VAR_TOTAL_CRC = 0;
    public double TOTAL_VAR_TOTAL_TACA_CRC = 0;
    
    public double AMOUNT_TACA = 0;
    public double AMOUNT_CRC = 0;
    public double TOTAL_TACA = 0;
    public double TOTAL_CRC = 0;
    public double TOTAL_TACA_CRC = 0;
    public double AVG_TACA = 0;
    public double AVG_CRC = 0;
    public double AVG_TOTAL_TACA = 0;
    public double AVG_TOTAL_CRC = 0;
    public double AVG_TOTAL_TACA_CRC = 0;
    public double VAR_TACA = 0;
    public double VAR_CRC = 0;
    public double VAR_TOTAL_TACA = 0;
    public double VAR_TOTAL_CRC = 0;
    public double VAR_TOTAL_TACA_CRC = 0;
    
    public double STATEMENT_TACA = 0;
    public double COMISION_TACA = 0;
    public double OTHERS_TACA = 0;
    public double SETTLEMENT_TACA = 0;
    public double SALE_TACA = 0;
    
    public double TOTAL_STATEMENT_TACA = 0;
    public double TOTAL_COMISION_TACA = 0;
    public double TOTAL_OTHERS_TACA = 0;
    public double TOTAL_SETTLEMENT_TACA = 0;
    public double TOTAL_SALE_TACA = 0;
    
    public double TOTAL_STATEMENT_WP_UK_CO = 0;
    public double TOTAL_SETTLEMENT_WP_UK_CO = 0;
    public double TOTAL_SALE_WP_UK_CO = 0;
    public double TOTAL_COMISION_WP_UK_CO = 0;
    public double TOTAL_OTHERS_WP_UK_CO = 0;
    
    public double TOTAL_STATEMENT_BANCARD_CO = 0;
    public double TOTAL_SETTLEMENT_BANCARD_CO = 0;
    public double TOTAL_SALE_BANCARD_CO = 0;
    public double TOTAL_COMISION_BANCARD_CO = 0;
    public double TOTAL_OTHERS_BANCARD_CO = 0;
    
    public double TOTAL_STATEMENT_AMEX_CO = 0;
    public double TOTAL_SETTLEMENT_AMEX_CO = 0;
    public double TOTAL_SALE_AMEX_CO = 0;
    public double TOTAL_COMISION_AMEX_CO = 0;
    public double TOTAL_OTHERS_AMEX_CO = 0;
    
    public double TOTAL_STATEMENT_DISCOVER_CO = 0;
    public double TOTAL_SETTLEMENT_DISCOVER_CO = 0;
    public double TOTAL_SALE_DISCOVER_CO = 0;
    public double TOTAL_COMISION_DISCOVER_CO = 0;
    public double TOTAL_OTHERS_DISCOVER_CO = 0;
    
    public double TOTAL_STATEMENT_WP_UK_SA = 0;
    public double TOTAL_SETTLEMENT_WP_UK_SA = 0;
    public double TOTAL_SALE_WP_UK_SA = 0;
    public double TOTAL_COMISION_WP_UK_SA = 0;
    public double TOTAL_OTHERS_WP_UK_SA = 0;
    
    public double TOTAL_STATEMENT_BANCARD_SA = 0;
    public double TOTAL_SETTLEMENT_BANCARD_SA = 0;
    public double TOTAL_SALE_BANCARD_SA = 0;
    public double TOTAL_COMISION_BANCARD_SA = 0;
    public double TOTAL_OTHERS_BANCARD_SA = 0;
    
    public double TOTAL_STATEMENT_AMEX_SA = 0;
    public double TOTAL_SETTLEMENT_AMEX_SA = 0;
    public double TOTAL_SALE_AMEX_SA = 0;
    public double TOTAL_COMISION_AMEX_SA = 0;
    public double TOTAL_OTHERS_AMEX_SA = 0;
    
    public double TOTAL_STATEMENT_DISCOVER_SA = 0;
    public double TOTAL_SETTLEMENT_DISCOVER_SA = 0;
    public double TOTAL_SALE_DISCOVER_SA = 0;
    public double TOTAL_COMISION_DISCOVER_SA = 0;
    public double TOTAL_OTHERS_DISCOVER_SA = 0;
    
    
    
    public String IDCONT = "";
    public String INTERFACE = "";
    public String BANDOC = "";
    public String PROCESADOR = "";
    public String REFERENCIA = "";
    public String FECHA_EXTRACION = "";
    public String MONEDA_LIQ = "";
    public double VALOR_LIQ = 0;
    public double COMISION = 0;
    public double RTEFUE = 0;
    public double RTEIVA = 0;
    public double RTEICA = 0;
    public double NETO = 0;
    public String MONEDA_PAGO = "";
    public double LIQ_IMPORTE_PAG = 0;
    public double TAX_IMPORTE_PAG = 0;
    
    
    public double TOTAL_LIQ = 0;
    public double TOTAL_COMISION = 0;
    public double TOTAL_RTEFUE = 0;
    public double TOTAL_RTEIVA = 0;
    public double TOTAL_RTEICA = 0;
    public double TOTAL_NETO = 0;
    public double TOTAL_LIQ_IMPORTE = 0;
    public double TOTAL_TAX_IMPORTE = 0;
    
    //VARIABLES PARA EL LOG
    public String CCUST = "";
    public String FECRFILE = "";
    public String CODEPROC = "";
    public String SEQ = "";
    public String STATP = "";
    public String MENSA = "";
    public String NAMEPROC = "";
    public String HOSEND = "";
    public String USCR = "";
    public String FECR = "";
    public String HOCR = "";
    public String HOFIN = "";
    public String IN_STATE = "";
    
    
    
    
    public Pagination page = new Pagination();
}
