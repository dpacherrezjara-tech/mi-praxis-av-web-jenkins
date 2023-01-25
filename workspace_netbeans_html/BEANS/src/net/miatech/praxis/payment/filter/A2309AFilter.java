/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2309A;

/**
 *
 * @author ctarazona
 */
public class A2309AFilter extends A2309A {
    
    public String IN_SDATE = "";
    public String IN_EPAAMEDATA = "";
    public String IN_MERCHN = "";
    public String IN_PRDA = "";
    public String IN_SETTLD = "";
    public String IN_NBATCH = "";
    
    public String SCARDN = "";
    public int FLAG_CARD = 0;
    
    public String SCARCOD = "";
    public String strDescCard = "";
    public String strFecFiltro = "";
    public String IN_TDOC = "";
    public String strTitulo = "";
    
    public String FTE_PREV = "";
    public String SCARCOD_PREV = "";
    public String SCARDN_PREV = "";
    public String SEQNUM_PREV = "";
    public String SORIG_PREV = "";
    public String MERCHN_PREV = "";
    public String SAUTHOC_PREV = "";
    public String SCURRENCY_PREV = "";
    public String SVFOP_PREV = "";
    public String TYPE = "";
    
    public Pagination page = new Pagination();
}
