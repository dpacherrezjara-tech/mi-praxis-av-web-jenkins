/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2338;

/**
 *
 * @author ctarazona
 */
public class A2338Filter extends A2338{
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_MERCHNP = "";
    public String IN_SCURRENCY = "";
    public String IN_NUMLIQUI = "";
    public String IN_FPRESENT = "";
    public String IN_CARDN1 = "";
    public String IN_CARDN2 = "";
    public String IN_SDATE = "";
    public String IN_TIPOFEC = "";
    public String IN_DATE = "";
    public String TIPOFEC = "";
    public String strFormatDate = "";
    
    public double totIMPORTE = 0.00;
    public double totNETO = 0.00;
    public double totCOMISB = 0.00;
    public double totIVA = 0.00;
    public double totIMPORTESD = 0.00;
    public double totIMPORTEF = 0.00;
    public double totARANCEL = 0.00;
    public double totIMPORTCF = 0.00;
    public double totIVAF = 0.00;
    public double totCTASAD = 0.00;
    public double totPTASAD = 0.00;
    public double totIVAT = 0.00;    
    public double totALICUOTA = 0.00;    
    public double totTOTDESC = 0.00;
    
    public double TOT_IMPORTOT = 0.00;
    public double TOT_IMPORSDE = 0.00;
    public double TOT_IMPARANC = 0.00;
    public double TOT_IVAARANC = 0.00;
    public double TOT_IMPORTCF = 0.00;
    public double TOT_IVACFINA = 0.00;
    public double TOT_IMPCTASD = 0.00;
    public double TOT_IVACTASD = 0.00;
    public double TOT_TOTDESC = 0.00;
    public double TOT_NETO = 0.00;
    public double TOT_IMPORFIN = 0.00;
    public double TOT_AIMPARAN = 0.00;
    public double TOT_AIVAARAN = 0.00;
    public double TOT_AIMPORCF = 0.00;
    public double TOT_AIVACFIN = 0.00;
    
    public Integer QtySETTLEMENT = 0;
    public Integer TOT_QtySETTLEMENT = 0;
    public String DESC_MERCHANT = "";
    
    
    public Pagination page = new Pagination();
    public List<A2338Filter> lstRws = new ArrayList<A2338Filter>(0);    
}
