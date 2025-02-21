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
    
    
    
    
    public Pagination page = new Pagination();
}
