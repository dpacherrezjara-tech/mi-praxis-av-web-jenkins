/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.WRF071;

/**
 *
 * @author jtorres
 */
public class WRF071Filter extends WRF071 {

    public int RN;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public int IN_TIPOFECHA = 0;
    public String IN_CURRENCY = "";
    public String IN_AIRLINE = "";
    public String IN_TKT = "";
    public String IN_ORIG = "";
    public String IN_DEST = "";
    public String IN_GB = "";
    public String IN_PERIOD = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4 = "";
    public String strDescripcion = "";
    public String strDescripcion1 = "";
    public String strDescripcion2 = "";
    public String strDescripcion3 = "";
    public String strDescripcion4 = "";
    public String FECHA = "";
    public long totQTYDOC = 0;
    public long totQGRUPO = 0;
    public double totGROSS = 0;
    public double totISC = 0;
    public double totOCOMIS = 0;
    public double totTAX = 0;
    public double totNETO = 0;
    public double Avg = 0;
    public double totAvg = 0;
    //wrf072
    public double PRORAF = 0;
    public double FACTOR = 0;
    public String ORIG = "";
    public String DEST = "";
    public double totPRORAF = 0;
    public double totFACTOR = 0;
    public Pagination page = new Pagination();
}
