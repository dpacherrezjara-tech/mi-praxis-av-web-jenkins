/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans.Sales;

import net.miatech.beans.Pagination;
import net.miatech.praxis.Sales.A3340;

/**
 *
 * @author lzambrano
 */
public class SQP03661Filter extends A3340 {
    
    public long RN;
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";   
    public String IN_TSSIM = "";
    public String IN_ORIG = "";
    public String IN_DEST = "";  
    public String IN_NVLO = "";  
    
    public Pagination page = new Pagination();
    
}
