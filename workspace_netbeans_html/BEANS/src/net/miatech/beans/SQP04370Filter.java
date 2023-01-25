/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1698;

/**
 *
 * @author vhidalgo
 */
public class SQP04370Filter extends A1698 {

    public String IN_TFILTER = "";     //A=AMOUNT T=TRANSACTION
    public String IN_FPRDA_FROM = "";
    public String IN_FPRDA_TO = "";
    public String IN_BANK = "";
    public String IN_FUENTE= "";
    public String IN_PAIS= "";
    public String IN_IATA= "";
    public String IN_MDA= "";

    public String PPED = "";
    public String CURRENCY = "";
    public long QTY_TRANSACCS = 0;
    public double TOT_GROSS = 0;
    public double TOT_REMITTENCE = 0;
    public double BSP_COMM = 0;
    public double BSP_TAX = 0;
    public double PRAXIS_COMM = 0;
    public double PRAXIS_TAX = 0;
    public String A1698STCON = "";
    public String A1698STCON_00 = "";
    public String A1698COMEN = "";
    public String IND_CUR = "";
    public String A1530STPRO_00 = "";

    public double TOT_GROSS_PX = 0;
    public double TOT_REMITTENCE_PX = 0;
    public double TOT_OTHER = 0;

    public double TOT_CASH_BSP = 0;
    public double TOT_CREDIT_BSP = 0;
    public double TOT_CASH_PX = 0;
    public double TOT_CREDIT_PX = 0;
    //new
    public double DIFF_GROSS = 0.0;
    public double DIFF_REMITTENCE = 0.0;
    public double DIFF_TAX = 0.0;
    public double DIFF_COMM = 0.0;
    public double DIFF_CASH = 0.0;
    public double DIFF_CREDIT = 0.0;
    public double DIFF_GROSS_DET = 0.0;
    public double DIFF_REMITTENCE_DET = 0.0;
    public double DIFF_TAX_DET = 0.0;
    public double DIFF_COMM_DET = 0.0;
    public double DIFF_CASH_DET = 0.0;
    public double DIFF_CREDIT_DET = 0.0;
    public Integer DIFF_QTY_TKT = 0;
    public String STATUS_DIFF = "";
    public String STATUS_DIFF_00 = "";

    // Paginacion
    public Pagination page = new Pagination();
}
