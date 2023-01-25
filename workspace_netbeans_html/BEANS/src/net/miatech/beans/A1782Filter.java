/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.flown.A1782;

/**
 *
 * @author jtorres
 */
public class A1782Filter extends A1782 {

    public int RN;
    public String IN_REV_TYPE = "";
    public String IN_HB_CIA = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strDesOrig = "";
    public String strDesDest = "";
    public long totFLIGHTS = 0;
    public long totPAX = 0;
    public double totAMTMX = 0;
    public double totAMTUS = 0;
    //A1783
    public String FVTA = "";
    public String NFLIGHT = "";
    public String CCIA = "";
    public String FORMA = "";
    public String SERIE = "";
    public String CUPON = "";
    public String DFLIGHT = "";
    public Pagination page = new Pagination();
}
