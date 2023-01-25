/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4113;

/**
 *
 * @author ggutierrez
 */
public class A4113Filter extends A4113 {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_DATE = "";
    public String IN_ZONA_SUMM = "";
    public String IN_SCOUNTRY_SUMM = "";
    public String IN_PCURRENCY = "";
    public String DATE = "";

    public String IN_SDATE = "";
    public String IN_EPAAMEDATA = "";
    public String IN_MERCHN = "";
    public String IN_PRDA = "";
    public String IN_SETTLD = "";
    public String IN_NBATCH = "";
    public String DES_MERCHANT = "";
    public String DES_CERROR = "";
    public String IN_CERROIN = "";

    //Diferencias
    public double DIFF_PGROSAMOU = 0;
    public double DIFF_PDISCAMOU = 0;
    public double DIFF_PSFEEAMOU = 0;
    public double DIFF_PADJAMOUN = 0;
    public double DIFF_PTAXAMOU = 0;
    public double DIFF_ODBALAMOU = 0;
    public double DIFF_PNETAMOU = 0;
    public String DIFF_PNETAMOU_STRING = "";

    //Totales
    public double totPNETAMOU = 0;
    public double totPGROSAMOU = 0;
    public double totPDISCAMOU = 0;
    public double totPSFEEAMOU = 0;
    public double totPADJAMOUN = 0;
    public double totPTAXAMOU = 0;
    public double totODBALAMOU = 0;
    public double totNETAMOUNC = 0;
    public double totGROSAMOUNC = 0;
    public double totDISCAMOUNC = 0;
    public double totSFEEAMOUNC = 0;
    public double totADJAMOUNC = 0;
    public double totTAXAMOUNC = 0;
    public double totODBALAMOUC = 0;
    //Diferencia en totales
    public double totDIFF_PGROSAMOU = 0;
    public double totDIFF_PDISCAMOU = 0;
    public double totDIFF_PSFEEAMOU = 0;
    public double totDIFF_PADJAMOUN = 0;
    public double totDIFF_PTAXAMOU = 0;
    public double totDIFF_ODBALAMOU = 0;
    public double totDIFF_PNETAMOU = 0;

    public Pagination page = new Pagination();
    
}
