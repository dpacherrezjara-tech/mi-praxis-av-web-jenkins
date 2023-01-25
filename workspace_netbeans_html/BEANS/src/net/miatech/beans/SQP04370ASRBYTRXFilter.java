/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.PXF051;

/**
 *
 * @author vhidalgo
 */
public class SQP04370ASRBYTRXFilter extends PXF051 {

    public int item = 0;
    public String filterType = "";

    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String processState = "";
    public int diffTransactions = 0;
    public String userLastModify = "";
    public String dateLastModify = "";
    //NEWS
    public int TTRANSP_DIF = 0;
    public int TTRANSP_DET = 0;
    public String STATUS_DIFF ="";
    public String STATUS_DIFF_00 = "";
    
    public Pagination page = new Pagination();
}
