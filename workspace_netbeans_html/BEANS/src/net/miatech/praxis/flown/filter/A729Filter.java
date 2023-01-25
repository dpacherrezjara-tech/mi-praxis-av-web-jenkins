/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.flown.filter;

import net.miatech.beans.*;
import net.miatech.praxis.flown.A729;

/**
 *
 * @author jsolano
 */
public class A729Filter extends A729 {

    public long RN;
    public String DATE = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_SEQ = "";
    public String FLAG_ALL = "";
    public String IN_DATE = "";
    public String IN_DATEF = "";
    public String IN_DATET = "";
    public String IN_TKT = "";
    public String IN_SEQRO = "";
    public String IN_STVAL = "";
    public String IN_TYPE = "";
    public String IN_FVAL = "";
    public String IN_CARR = "";
    public String IN_ZONA = "";
    public String strFVAL = "";
    public String IN_NFLIGHT = "";
    public int IN_TIPOFECHA = 0;
    
    
    public Pagination page = new Pagination();
    public int pos = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;

    public String TKT = "";
    public String A729CUPON = "";
    public double A729VALTAX = 0;
    public String A729MONEDA = "";
    public String A729FCAMBI = "";
    public String A729FREGIS = "";
    public double totA729VALTAX = 0;
    
}
