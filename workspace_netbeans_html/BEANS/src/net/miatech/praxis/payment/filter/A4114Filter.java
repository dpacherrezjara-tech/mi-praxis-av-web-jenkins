/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4114;

/**
 *
 * @author ggutierrez
 */
public class A4114Filter extends A4114 {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATE = "";
    public String IN_PCURRENCY = "";
    public String DATE = "";

    public String DES_MERCHANT = "";
    public String desCERROR = "";

    //Totales
    public double TAXBAMOUN_TOTAL = 0;
    public double TAXRATE_TOTAL = 0;
    public double TAXAMOUNT_TOTAL = 0;

    public double TAXBAMOUNC_TOTAL = 0;
    public double TAXRATEC_TOTAL = 0;
    public double TAXAMOUNTC_TOTAL = 0;

    

    public Pagination page = new Pagination();

}
