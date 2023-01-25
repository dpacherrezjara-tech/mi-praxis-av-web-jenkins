/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A3020;

/**
 *
 * @author jtorres
 */
public class A3020Filter extends A3020 {

    public String IN_TIPOFECHA = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_PAYMENT = "";
    public String IN_TDOC = "";
    public String IN_FTE = "";
    public String IN_SCOUNTRY = "";
    public int IN_TOP = 0;
    public String IN_FLAG = "";
    public String IN_FINSUMO = "";
    public String IN_BANK = "";

    public String FECHA = "";
    public String TRNCU = "";
    public String FINSUMO = "";
    public String PEM = "";
    public String strTicket = "";
    public String strDescription = "";
    public String strDescription1 = "";
    public String strDescription2 = "";
    public String strDescription3 = "";
    public String strDescription4 = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4 = "";
    public String strTitulo = "";
    public String strImagen = "";
    public String strImagen1 = "";
    public String strImagen2 = "";
    public String strImagen3 = "";

    public double TOTAL = 0;
    public double diff1 = 0;
    public double diff2 = 0;
    public double diff3 = 0;
    public double perc1 = 0;
    public double perc2 = 0;
    public double perc3 = 0;
    public double perc4 = 0;
    public double avg1 = 0;
    public double avg2 = 0;
    public double avg3 = 0;
    public double COMISION = 0;
    public double TAX1 = 0;
    public double AYQ1 = 0;
    public double AYR1 = 0;
    public double TAX4 = 0;
    public double AYQ4 = 0;
    public double AYR4 = 0;
    public double FARE = 0;
    public double perc_5 = 0;
    public double perc_10 = 0;
    public double perc_15 = 0;
    public double perc_20 = 0;
    public double perc_O20 = 0;
    
    public double DiffConci1 = 0;
    public double DiffConci2 = 0;
    public double DiffConci3 = 0;
    
    public double TotDiffConci1 = 0;
    public double TotDiffConci2 = 0;
    public double TotDiffConci3 = 0;

    //Totales 
    public double totSVFOPUS1 = 0;
    public int totQTY1 = 0;
    public double totSVFOPUS2 = 0;
    public int totQTY2 = 0;
    public int totQTYA = 0;
    public double totSVFOPUSA = 0;
    public int totQTYR = 0;
    public double totSVFOPUSR = 0;
    public int totQTYS = 0;
    public double totSVFOPUSS = 0;
    public int totQTYSABO = 0;
    public double totSVFOPUSABO = 0;
    public double totCOMISION = 0;
    public double totTAX1 = 0;
    public double totAYQ1 = 0;
    public double totAYR1 = 0;
    public double totTAX4 = 0;
    public double totAYQ4 = 0;
    public double totAYR4 = 0;
    public double totFARE = 0;

    public double totTOTAL = 0;
    public double totdiff1 = 0;
    public double totdiff2 = 0;
    public double totdiff3 = 0;
    public double totperc1 = 0;
    public double totperc2 = 0;
    public double totperc3 = 0;
    public double totperc4 = 0;
    public double totavg1 = 0;
    public double totavg2 = 0;
    public double totavg3 = 0;
    
    public int QDAY5 = 0;
    public int QDAY10 = 0;
    public int QDAY15 = 0;
    public int QDAY20 = 0;
    public int QOTHER = 0;
    public int QPAY = 0;
    public double ADAY5 = 0;
    public double ADAY10 = 0;
    public double ADAY15 = 0;
    public double ADAY20 = 0;
    public double AOTHER = 0;
    public double APAY = 0;
    public int totQDAY5 = 0;
    public int totQDAY10 = 0;
    public int totQDAY15 = 0;
    public int totQDAY20 = 0;
    public int totQOTHER = 0;
    public int totQPAY = 0;
    public double totADAY5 = 0;
    public double totADAY10 = 0;
    public double totADAY15 = 0;
    public double totADAY20 = 0;
    public double totAOTHER = 0;
    public double totAPAY = 0;
    
    //A3271
    public String CODEBANK = "";
    

    public long RN = 0;

    public Pagination page = new Pagination();

}
