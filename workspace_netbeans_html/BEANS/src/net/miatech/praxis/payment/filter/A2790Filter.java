/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2790;

/**
 *
 * @author jtorres
 */
public class A2790Filter extends A2790 {

    public String IN_TIPOFECHA = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_CERROR = "";
    public String IN_TKT = "";
    public String IN_CARD = "";
    public String IN_CARD1 = "";
    public String IN_CARD2 = "";
    public String IN_RCARCOD = "";

    public String FECHA = "";
    public String strDescription = "";
    public String strDescription1 = "";
    public String strDescription2 = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";

    public String dscError1 = "";
    public String dscError2 = "";
    public String dscError3 = "";
    public String dscError4 = "";

    public int TOTAL = 0;
    public int QTYERROR = 0;

    public int SEM1 = 0;
    public int SEM2 = 0;
    public int SEM3 = 0;
    public int SEM4 = 0;
    public int SEM5 = 0;

    public double Diff1 = 0;
    public double Diff2 = 0;
    public double Diff3 = 0;
    public double Perc1 = 0;
    public double Perc2 = 0;
    public double Perc3 = 0;

    //Totales
    public int totQTYERR1 = 0;
    public int totQTYERR2 = 0;
    public int totQTYERR3 = 0;
    public int totQTYERR4 = 0;
    public int totTOTAL = 0;
    public int totQTYERROR = 0;

    public int totQTYTRAN = 0;
    public double totSVFOPUSD = 0;
    public double totRVFOPUSD = 0;

    public int totSEM1 = 0;
    public int totSEM2 = 0;
    public int totSEM3 = 0;
    public int totSEM4 = 0;
    public int totSEM5 = 0;

    public double totDiff1 = 0;
    public double totDiff2 = 0;
    public double totDiff3 = 0;
    public double totPerc1 = 0;
    public double totPerc2 = 0;
    public double totPerc3 = 0;

    public long RN = 0;
    public Pagination page = new Pagination();

}
