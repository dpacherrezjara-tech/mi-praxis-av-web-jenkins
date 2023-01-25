/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2318;

/**
 *
 * @author ctarazona
 */
public class A2318Filter extends A2318{
    public long RN = 0;
    public String strFecFiltro = "";
    public String strFormatDate = "";
    public String IN_TDOC = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String DATE = "";
    public String desSTVAL = "";
    public String IN_PNR = "";
    public String descSTVAL = "";
    public String descSTVALC = "";
    public String descTREG = "";
    public String IN_DATSET = "";
    public String IN_WEEKMO = "";
    public String TITLE_DATE = "";
    public String STVALC = "";
    
    public double SVFOP_SG = 0.0;
    public double AMTCOM_SG = 0.0;
    public double AMTIVA_SG = 0.0;
    public double AMTSET_SG = 0.0;
    public double SVFOP_SC = 0.0;
    public double AMTCOM_SC = 0.0;
    public double AMTIVA_SC = 0.0;
    public double AMTSET_SC = 0.0;
    public double SVFOP_SE = 0.0;
    public double AMTCOM_SE = 0.0;
    public double AMTIVA_SE = 0.0;
    public double AMTSET_SE = 0.0;
    
    
    public Pagination page = new Pagination();
}
