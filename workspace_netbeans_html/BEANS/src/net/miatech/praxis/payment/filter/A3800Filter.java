/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A3800;

/**
 *
 * @author ctarazona
 */
public class A3800Filter extends A3800 {
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_SDATE = "";
    public String IN_CARDN = "";
    public String IN_SAUTHOC = "";
    public String strDescStatus = "";
    public double DIFF = 0.0;
    public double totSVFOP = 0.0;
    public double totSVFOPS = 0.0;
    public double totDIFSVFOP = 0.0;
    public String IN_CARDC = "";
    public String IN_CARDN1 = "";
    public String IN_CARDN2 = "";
    public String IN_SVFOPSG = "";
    public String IN_STAAVIS = "";
    public String IN_SPNR = "";
    public String IN_SAGENT = "";
    public String option = "";
    public String strFecFiltro = "";
    
    public Pagination page = new Pagination();
}
