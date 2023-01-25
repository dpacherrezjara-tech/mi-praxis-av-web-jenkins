/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.interline.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.IMF117;
/**
 *
 * @author andrea
 */
public class IMF117Filter extends IMF117 {
    
    
    public int RN;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public int IN_TIPOFECHA = 0;
    public String IN_SOURCE = "";
    public String IN_AIRLINE = "";
    public String IN_COUNTRY = "";
    public String IN_AVG = "";
    public String IN_REJECT = "";
    public String IN_CURRENCY = "";
    public int IN_GROUPBY = 0;
    public String IN_TYPEDOC="";
    public String IN_PERIOD = "";
    public String strFormatDate="";
    public String strFormatDate1="";
    public String strFormatDate2="";
    public String strFormatDate3="";
    public String strFormatDate4="";
    public String strFormatDate5="";
    public String strDescripcion="";
    public String strDescripcion1="";
    public String strDescripcion2="";
    public String strDescripcion3="";
    public String strDescripcion4="";
    public String strDescripcion5="";
    
    //TOTALES
    public long totQCPNS  = 0;
    public double totVALOR  = 0;
    public double totVCOMIS = 0;
    public double totVALORYQ = 0;
    public long totQCPNST  = 0;
    public double totVALORTAX = 0;
    
    //AVG
    public long perQCPNS  = 0;
    public double perVALOR  = 0;
    public double perVCOMIS = 0;
    public double perVALORYQ = 0;
    public long perQCPNST  = 0;
    public double perVALORTAX = 0;
     //AVG TOT
    public long totPerQCPNS  = 0;
    public double totPerVALOR  = 0;
    public double totPerVCOMIS = 0;
    public double totPerVALORYQ = 0;
    public long totPerQCPNST  = 0;
    public double totPperVALORTAX = 0;
    
    
     public Pagination page = new Pagination();
}
