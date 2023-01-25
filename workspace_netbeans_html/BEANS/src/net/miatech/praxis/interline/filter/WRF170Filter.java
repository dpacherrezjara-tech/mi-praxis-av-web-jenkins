/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.WRF170;

/**
 *
 * @author lmendoza
 */
public class WRF170Filter extends WRF170 {

    public int RN;
    public int IN_SELECTBY = 0;
    public int IN_TIPOFECHA = 0;

    public String IN_CCUST = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_CURRENCY = "";
    public String IN_AIRLINE = "";
    public String IN_SOURCE = "";
    public String IN_TYPE = "";
    public String IN_TYPEDOC = "";
    public String IN_PERIOD = "";
    public String IN_TKT = "";
    public String strFormatDate = "";

    public double totDoubleGROSSI = 0.0;
    public double totDoubleISCI = 0.0;
    public double totDoubleSISCI = 0.0;
    public double totDoubleTAXI = 0.0;
    public double totDoubleNETI = 0.0;
    public double totDoubleVCPN = 0.0;
    public long totLongQTYI = 0;
    public long totLongQTYP = 0;
    public long totLongQTYE = 0;
    public long totLongQTYSP = 0;
    public Pagination page = new Pagination();
}
