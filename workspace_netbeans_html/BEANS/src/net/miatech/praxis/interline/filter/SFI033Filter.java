/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.SFI033;
/**
 *
 * @author andrea
 */
public class SFI033Filter extends SFI033{
    public long RN;
    public String strFormatDate="";
    public String TKT="";
    public String FROMTO="";
    public String DES_BAIR="";
    public String DES_BDAIR="";
    public String DES_FTE="";
    public double totTGROSS=0;
    public double totTISC=0;
    public double totTTAX=0;
    public double totTVAT=0;
    public double totHFEEAM=0;
    public double totTUATP=0;
    public double totTNET=0;
    public double TNETR= 0;
    public double TGROSSD = 0;
    public double TISCD = 0;
    public double TTAXD= 0;
    public double THDFD = 0;
    public double TUATPD = 0;
    public double TOTHCD= 0;
    public String  DES_SOURCOD= "";
    
    public Pagination page = new Pagination();
    
}
