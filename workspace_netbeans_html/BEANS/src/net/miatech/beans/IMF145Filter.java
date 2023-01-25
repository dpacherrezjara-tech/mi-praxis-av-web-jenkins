/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.IMF145;

/**
 *
 * @author ggutierrez
 */
public class IMF145Filter extends IMF145{
    
    public long RN;
    public String IN_DATE = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_FECHA = "";
    public String IN_PAYMENT = "";
    public String IN_TDOC = "";
    public String IN_FTE = "";
    public int IN_TOP = 0;
    public String IN_SCOUNTRY = "";
    public String IN_FLAG = "";
    public String IN_FINSUMO = "";
    public String IN_BANK = "";
    
    public String strFormatDate = "";
    
    public long diffQTYSALCC;
    public long diffAMOUNTCC;
    public long totdiffAMOUNTCC;
    public long totdiffQTYSALCC;
    
    public long totQTYSALES;
    public long totAMOUNTS;
    public long totQTYSALCA;
    public long totAMOUNTCA;
    public long totQTYSALCC;
    public long totAMOUNTCC;
    public long totQTYSALBA;
    public long totAMOUNTBA;
    public long totVALOREX;
    public long totVALORCA;
    public long totVALORCC;
    
    public Pagination page = new Pagination();
}
