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
public class MPF287 {
    public Pagination page = new Pagination();
    
    public long RN = 0;
    public long VL_QTY_TOTAL = 0;
    public long VL_QTY_MATCH = 0;
    public long VL_QTY_MANUAL = 0;
    public long VL_QTY_PEND = 0;
    public String ADATE = "";
    public String strFormatDate = "";
    public double PCT_PROCESADO = 0;
    
    
    public long TOTAL_QTOTAL = 0;
    public long TOTAL_QMATCH = 0;
    public long TOTAL_QMANUAL = 0;
    public long TOTAL_QPEND = 0;
    public double TOTAL_PCT = 0;

    // ── MPS657 amount fields ─────────────────────────────────────────────────
    public double VL_AMT_TOTAL  = 0;
    public double VL_AMT_MATCH  = 0;  // auto + manual
    public double VL_AMT_MANUAL = 0;
    public double VL_AMT_PEND   = 0;

    public double TOTAL_AMTTOTAL  = 0;
    public double TOTAL_AMTMATCH  = 0;
    public double TOTAL_AMTMANUAL = 0;
    public double TOTAL_AMTPEND   = 0;

    // ── MPS658 / MPS662 detail fields ────────────────────────────────────────
    public String NOMBRE1      = "";
    public String SDATE        = "";
    public String SCURRENCY    = "";
    public String SCOUNTRY     = "";
    public String descTDOC     = "";
    public String FECR         = "";
    public String STVAL         = "";
    public String descSTVAL         = "";

    public double NETO         = 0;
    public double NETOC        = 0;
    public double LOCAMOUNT2   = 0;

    public long   QTYTRAN1     = 0;
    public long   QTYTRAN3     = 0;
    public long   QTYTRAS      = 0;   // QTYTRAN1 + QTYTRAN3

    public String BANCODE      = "";
    public String SAGENT       = "";
    public String SCARDN       = "";
    public String SAUTHOC      = "";
    public String RED          = "";
    public String MERCHAND          = "";
    public String BANDOC          = "";
    public String VALDATE          = "";
    public long   PENDINGDAYS  = 0;

    // ── MPS658 summary totals (RS1, grouped by SCURRENCY) ───────────────────
    public double SUM_NETO       = 0;
    public double SUM_NETOC      = 0;
    public double SUM_LOCAMOUNT2 = 0;
    public long   SUM_QTYTRAN1   = 0;
    public long   SUM_QTYTRAN3   = 0;
    public long   SUM_QTYTRAS    = 0;

}
