/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libmiatec.A050;

/**
 *
 * @author jtorres
 */
public class A050Filter extends A050 {

    public int RN = 0;
    public String IN_GRUPO_FROM = "";
    public String IN_GRUPO_TO = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_PERIOD = "";
    public String IN_SFL = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4 = "";
    public String strFormatDate5 = "";
    public String strDescripcion = "";
    public String strDescripcion1 = "";
    public String strDescripcion2 = "";
    public String strDescripcion3 = "";
    public String strDescripcion4 = "";
    public String strDescripcion5 = "";
    public String strTicket = "";
    public String strSQL = "";
    public String strTitulo = ""; 
    public String HINIT = "";
    public String HFIN = "";
    public String CANT = "";
    public String CCIA = "";
    public String FORMA = "";
    public String PERIOD = "";
    public String SERIE = "";
    public String CUPON = "";
    public String CITYO = "";
    public String CITYD = "";
    public String strYearF = "";
    public String strYearT = "";
    public String strMonthF = "";
    public String strMonthT = "";
    public String strDayF = "";
    public String strDayT = "";
    public String strTipoFecha = "";
    public String strAirName = "";
    public String strDescOrigen = "";
    public String strDescDestino = "";
    public String strEstado = "";
    public String strMarcaCOMI = "";
    public String strMarcaTAX = "";
    public String strMarcaNETO = "";
    public String strMarcaOVERISC = "";
    public String TEST = "";
    public long QCUPON = 0;
    public long QTY = 0;
    public long QMATCH = 0;
    public long QNMATCH = 0;
    public long QAUDIT = 0;
    public long QMATCH730 = 0;
    public long QNMATCH730 = 0;
    //Totales
    public double totAux1 = 0;
    public double totAux2 = 0;
    public long totQTY = 0;
    public long totQMATCH = 0;
    public long totQNMATCH = 0;
    public long totQMATCH730 = 0;
    public long totQNMATCH730 = 0;
    public long totQAUDIT = 0;
    public double totA050ACEPTA = 0;
    public double totA050COMISI = 0;
    public double totA050OVRAMT = 0;
    public double totA050TUA = 0;
    public double totA050NETO = 0;
    //A020
    public long QTY2 = 0;
    public double A050ACEPTA2 = 0;
    public double A050COMISI2 = 0;
    public double A050OVRAMT2 = 0;
    public double A050TUA2 = 0;
    public double A050NETO2 = 0;
    public long totQTY2 = 0;
    public double totA050ACEPTA2 = 0;
    public double totA050COMISI2 = 0;
    public double totA050OVRAMT2 = 0;
    public double totA050TUA2 = 0;
    public double totA050NETO2 = 0;
    //Totales
    public double ACEPTA = 0;
    public double COMISI = 0;
    public double VRAMT = 0;
    public double TUA = 0;
    public double NETO = 0;
    public double totACEPTA = 0;
    public double totCOMISI = 0;
    public double totVRAMT = 0;
    public double totTUA = 0;
    public double totNETO = 0;
    //Perc
    public double Perc1 = 0;
    public double Perc2 = 0;
    public double Perc3 = 0;
    //Tot Perc
    public double totPerc1 = 0;
    public double totPerc2 = 0;
    public double totPerc3 = 0;
    public Pagination page = new Pagination();
}
