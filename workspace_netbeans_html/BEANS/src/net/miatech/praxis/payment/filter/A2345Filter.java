/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2345;

/**
 *
 * @author claudia
 */
public class A2345Filter extends A2345 {

    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String strFecFiltro = "";
    public String strYearFrom = "";
    public String strYearTo = "";
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strDayFrom = "";
    public String strDayTo = "";
    public String IN_MERCHN = "";
    public String IN_STVAL = "";
    public String IN_CODEBANK = "";
    public String strFormatDate = "";
    public String strTitulo = "";
    public String strDescripcion = "";
    public String strDescBank = "";
    public long RN = 0;
    public Pagination page = new Pagination();
    
    public long QMATCH = 0;
    public double AMATCH = 0;
    public long QLIQUI = 0;
    public double ALIQUIL = 0;
    public double ALIQUIE = 0;
    public long QBANK = 0;
    public double ABANKL = 0;
    public double ABANKE = 0;
    public long QDIFF = 0;
    public double ADIFFL = 0;
    public double ADIFFE = 0;
    public double ADIFF = 0;
    
    //TOTALES ================================
    public long totQTYTRAN = 0;
    public long totQMATCH = 0;
    public double totAMATCH = 0;
    public long totQLIQUI = 0;
    public double totALIQUIL = 0;
    public double totALIQUIE = 0;
    public long totQBANK = 0;
    public double totABANKL = 0;
    public double totABANKE = 0;
    public long totQDIFF = 0;
    public double totADIFFL = 0;
    public double totADIFFE = 0;
    public double totADIFF = 0;
    
    public double totSVFOP = 0;
    public double totRATEIVA = 0;
    public double totMONBTCRE1 = 0;
    public double totRATCNAC1 = 0;
    public double totCOMITCRE1 = 0;
    public double totIVACRE1 = 0;
    public double totMONBTDEB1 = 0;
    public double totRATDNAC1 = 0;
    public double totCOMITDEB1 = 0;
    public double totIVADEB1 = 0;
    public double totMONBTEXT1 = 0;
    public double totRATCEXT1 = 0;
    public double totCOMITEXT1 = 0;
    public double totIVAEXT1 = 0;
    public double totMONBTCRE2 = 0;
    public double totRATCNAC2 = 0;
    public double totCOMITCRE2 = 0;
    public double totIVACRE2 = 0;
    public double totMONBTDEB2 = 0;
    public double totRATDNAC2 = 0;
    public double totCOMITDEB2 = 0;
    public double totIVADEB2 = 0;
    public double totMONBTEXT2 = 0;
    public double totRATCEXT2 = 0;
    public double totCOMITEXT2 = 0;
    public double totIVAEXT2 = 0;
    public double totMONBTCRE3 = 0;
    public double totRATCNAC3 = 0;
    public double totCOMITCRE3 = 0;
    public double totIVACRE3 = 0;
    public double totMONBTDEB3 = 0;
    public double totRATDNAC3 = 0;
    public double totCOMITDEB3 = 0;
    public double totIVADEB3 = 0;
    public double totMONBTEXT3 = 0;
    public double totRATCEXT3 = 0;
    public double totCOMITEXT3 = 0;
    public double totIVAEXT3 = 0;
    
}
