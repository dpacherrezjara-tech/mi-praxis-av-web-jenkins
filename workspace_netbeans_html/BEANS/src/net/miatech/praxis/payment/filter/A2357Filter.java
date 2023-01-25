/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2357;
/**
 *
 * @author andrea
 */
public class A2357Filter extends  A2357 {
    
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO  = "";
    public String IN_CTRAN  = ""; 
    public String IN_TTRAN  = "";
    public String IN_SCOUNTRY  = "";
    public String IN_CODEBANK  = "";
    public String strFormatDate  = "";

    public String strDescripcion  = "";
    public String strCTRAN  = "";
    public String strTTRAN  = "";
    public String strSCOUNTRY  = "";
    public String strCODEBANK  = "";
    public String strDescripcion1  = "";
            
    public int RN=0;
    public Pagination page = new Pagination();
}
