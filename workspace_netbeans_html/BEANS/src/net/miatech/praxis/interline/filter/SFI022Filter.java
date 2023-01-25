/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.SFI022;
/**
 *
 * @author andrea
 */
public class SFI022Filter extends SFI022{
    
    public long RN;
    public double rstTOTAMNT=0;
    public String FROMTO="";
    public String TKT="";
    public String strFormatDate="";
    public String DES_BAIR="";
    public String DES_BDAIR="";
    public String yearFrom = "";
    public String yearTo = "";
    public String monthFrom = "";
    public String monthTo = "";
    public String dayFrom = "";
    public String dayTo = "";
    public double totTGROSS=0;
    public double totTISC=0;
    public double totTTAX=0;
    public double totTVAT=0;
    public double totHFEEAM=0;
    public double totTUATP=0;
    public double totTNET=0;
    public String  DES_SOURCOD= "";
    public int RMS=0;
    public int QRM=0;
    public double TNETR= 0;
    public double TGROSSD = 0;
    public double TISCD = 0;
    public double TTAXD= 0;
    public double THDFD = 0;
    public double TUATPD = 0;
    public double TOTHCD= 0;
    
    public Pagination page = new Pagination();
}
