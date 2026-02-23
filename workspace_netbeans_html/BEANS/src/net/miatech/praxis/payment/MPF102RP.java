/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.payment;

import net.miatech.beans.Pagination;

/**
 *
 * @author singa
 */
public class MPF102RP {

    public int RN = 0;
    public Pagination page = new Pagination();

    public String VALDATE = "";
    public String strFormatDate = "";
    public String CCUST = "";

    public int F1_TOTAL = 0;
    public int F1_TOTAL_STVAL3 = 0;
    public int F1_TOTAL_STVAL1 = 0;
    public int F1_TOTAL_TAXES = 0;
    public int F1_TOTAL_PENDING_TO_F2 = 0;
    public int F1_TOTAL_ERROR = 0;

    public int F2_F1_TOTAL_COMPLETED = 0;
    public int F2_TOTAL_PENDING_OVER50 = 0;
    public int F2_TOTAL_MATCH_OVER50 = 0;

    public int F3_F2_TOTAL_COMPLETED = 0;
    public int F3_TOTAL_WO_ACC = 0;
    public int F3_TOTAL_COMPLETED = 0;
    public int F3_TOTAL_PENDING_SENT = 0;
    public int F3_TOTAL_COMPLETED_SAP = 0;
    public int F3_TOTAL_ERROR = 0;
}
