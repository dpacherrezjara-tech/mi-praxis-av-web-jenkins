/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.PXF053;

/**
 *
 * @author vhidalgo
 */
public class SQP04370ASRFilter extends PXF053 {

    public String IN_WKSTAT = "";
    public String IN_FREPOR_FROM = "";
    public String IN_FREPOR_TO = "";
    public String IN_MDA = "";

    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";

    public long RN = 0L;
    public double A1530_A1720_CA_SUM = 0d;
    public double A1530_A1720_CC_SUM = 0d;
    public double A1530_A1720_EX_SUM = 0d;
    public double A1530_A1720_TV_SUM = 0d;

    public String STATUS_RECORD = "";

    public String userLastModify = "";
    public String dateLastModify = "";

    //NEW
    public String A1530AGENT = "";
    public String A1530FDESD = "";
    public String A1530MDA = "";
    public String A1530GRUPO = "";
    
    public Double CA_SUM_D = 0.0;
    public Double CC_SUM_D = 0.0;
    public Double CA_SUM_DET = 0.0;
    public Double CC_SUM_DET = 0.0;
    public String STATUS_DIFF = "";
    public String STATUS_DIFF_00 = "";
    // Paginacion
    public Pagination page = new Pagination();

}
