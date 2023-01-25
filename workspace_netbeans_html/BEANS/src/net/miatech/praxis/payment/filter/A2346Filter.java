/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2346;

/**
 *
 * @author claudia
 */
public class A2346Filter extends A2346 {

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
    public String strDescEstado = "";
    public String strDCOMIS = "";
    public long RN = 0;
    public Pagination page = new Pagination();
    
    public long QMATCH = 0;
    public double AMATCH = 0;
    public long QPEND = 0;
    public double APEND = 0;
    public long QDIFF = 0;
    public double ADIFF = 0;
    
    //TOTALES ================================
    public long totQMATCH = 0;
    public double totAMATCH = 0;
    public long totQPEND = 0;
    public double totAPEND = 0;
    public long totQDIFF = 0;
    public double totADIFF = 0;
    
    public double totMONTOB = 0;
    public double totCOMISI = 0;
    public double totCOMISIC = 0;
    
}
