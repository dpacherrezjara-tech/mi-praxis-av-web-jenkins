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
public class MPF190 {
    public Pagination page = new Pagination();

    public String ADATE       = "";
    public String strFormatDate = "";
    public String CCUST       = "";

    // ── MPS774 quantities/amounts (USD) ──────────────────────────────────────
    public long   VL_QTY_TOTAL  = 0;
    public long   VL_QTY_MATCH  = 0;
    public long   VL_QTY_MANUAL = 0;
    public long   VL_QTY_PEND   = 0;

    public double VL_AMT_TOTAL  = 0;
    public double VL_AMT_MATCH  = 0;  // auto + manual
    public double VL_AMT_MANUAL = 0;
    public double VL_AMT_PEND   = 0;

    public double PCT_PROCESADO = 0;

    // ── Totales acumulados (fila sintética final) ───────────────────────────
    public long   TOTAL_QTOTAL    = 0;
    public long   TOTAL_QMATCH    = 0;
    public long   TOTAL_QMANUAL   = 0;
    public long   TOTAL_QPEND     = 0;

    public double TOTAL_AMTTOTAL  = 0;
    public double TOTAL_AMTMATCH  = 0;
    public double TOTAL_AMTMANUAL = 0;
    public double TOTAL_AMTPEND   = 0;
    public double TOTAL_PCT       = 0;

    // ── MPS775 detalle (drill-down) ──────────────────────────────────────────
    public long   NBR         = 0;
    public String SCOUNTRY    = "";
    public String SCURRENCY   = "";
    public double NETO        = 0;
    public double PAYAMOU     = 0;
    public String SDATE       = "";
    public String REFERENCE   = "";
    public String SFILE       = "";
    public String NPAG        = "";
    public String SAGENT      = "";
    public String STVAL       = "";
    public String STRDATE     = "";
    public String ENDDATE     = "";

    // ── Solo se llenan cuando se baja al Detail por Match Auto o Match Manual
    // (STVAL='1'/'5'); en cualquier otro estado MPS775 devuelve 0 en QTYTICKET
    // y QTYLIQUI sin ejecutar los subselects. ──────────────────────────────────
    public String DATEC       = "";
    public String TRANC       = "";
    public String STVALF2     = "";
    public long   QTYTICKET   = 0;
    public long   QTYLIQUI    = 0;

    // ── Totales de MPS775 (Detail y el subnivel de Qty Liqui, que reutiliza
    // este mismo proc): agregados sobre TODO el resultado filtrado, no solo
    // la página actual. ────────────────────────────────────────────────────
    public long   TOTQTYDETAIL     = 0;
    public double TOTNETODETAIL    = 0;
    public double TOTPAYAMOUDETAIL = 0;

    // ── Auditoría (no se muestra en la grilla) ───────────────────────────────
    public String USCR        = "";
    public String FECR        = "";
    public String HOCR        = "";
    public String PGMCR       = "";
    public String USUP        = "";
    public String FEUP        = "";
    public String HOUP        = "";
    public String PGMUP       = "";

    // ── Llaves principales del registro (MPS775, para el UPDATE en DataEntry) ──
    public String TREG        = "";
    public String CBATCH      = "";
    public String SEQ         = "";

    public String COMMENTS    = "";

    // ── Cuentas bancarias del agente (MPS778, subselect a MPF106 por SAGENT=CAGENCY) ──
    public String ACCOUNT1    = "";
    public String ACCOUNT2    = "";
    public String ACCOUNT3    = "";

}
