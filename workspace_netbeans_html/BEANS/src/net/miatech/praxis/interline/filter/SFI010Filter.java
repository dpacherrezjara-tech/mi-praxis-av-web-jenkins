/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.SFI010;

/**
 *
 * @author andrea
 */
public class SFI010Filter extends SFI010{
    
    public String yearFrom = "";
    public String yearTo = "";
    public String monthFrom = "";
    public String monthTo = "";
    public String dayFrom = "";
    public String dayTo = "";
    
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String imgSTPM = "";
   
    public long RN;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String DES_BDAIR = "";
    public String DES_BAIR = "";
    
    public double totTGROSS=0;
    public double totTISC=0;
    public double totTTAX=0;
    public double totTVAT=0;
    public double totHFEEAM=0;
    public double totTUATP=0;
    public double totTNET=0;
    public double totTOHCOM=0;
    
    public double TGROSS=0;
    public double TISC=0;
    public double TTAX=0;
    public double TVAT=0;
    public double HFEEAM=0;
    public double TUATP=0;
    public double TNET=0;
    public double TOHCOM=0;
    
    public Pagination page = new Pagination();
}
