/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.SFI100;

/**
 *
 * @author ggutierrez
 */
public class SFI100Filter extends SFI100{
    
    
    public long RN=0;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_TFECHA = "";
    public String IN_TTRAN = "";
    public String IN_PEREST = "";
    public String strFormatDate = "";
    public String typeDate = "";
    
    
    public double totTGROSS = 0;
    public double totTISC = 0;
    public double totTTAX = 0;
    public double totTOHCOM = 0;
    public double totHFEEAM = 0;
    public double totTUATP = 0;
    public double totTNET = 0;
    
    //Datos del Summary
    public String SOURCECODE = "";
    public String CONCEPTO = "";
    public double SCREAL = 0;
    public double totSCREAL = 0;
    
    public Pagination page = new Pagination();
}
