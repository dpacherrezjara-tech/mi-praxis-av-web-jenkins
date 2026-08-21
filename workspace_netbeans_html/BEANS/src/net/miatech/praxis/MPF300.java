/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis;

import net.miatech.beans.Pagination;

/**
 *
 * @author singa
 */
public class MPF300 {

    public Pagination page = new Pagination();
    public int RN = 0;
    public int DIFFDAYS = 0;
    public int QTYDOC = 0;
    
    public String CCUST = "";
    public String CCIA = "";
    public String FORMA = "";
    public String SERIE = "";
    public String TDOC = "";
    public String SEQ = "";
    public String CORRL = "";
    public String STVAL = "";
    public String CFUENTE = "";
    public String TRNCU = "";
    public String SCOUNTRY = "";
    public String SAGENT = "";
    public String SCONSOL = "";
    public String SDATE = "";
    public String SCURRENCY = "";
    public String SPAYMENT = "";
    public String BANDOC = "";
    public String DATCO = "";
    public String USCR = "";
    public String FECR = "";
    public String HOCR = "";
    public String USUP = "";
    public String FEUP = "";
    public String HOUP = "";
    public String strPEM = "";
    public String strTicket = "";
    public String strDATECTRANC = "";

    // ── MPS738 (Direct Sales - Generar / Reversa): consulta agrupada por
    // INVOICE/SCOUNTRY/SAGENT/SUBFTE/SDATE/SCURRENCY/CCUST con
    // SUM(SVFOPNETR) < 0. MONTO es ese acumulado (no confundir con SVFOPNETR,
    // que es el valor de una sola fila). ──────────────────────────────────────
    public String INVOICE = "";
    public String SUBFTE = "";
    public double MONTO = 0;

    public int QSALES = 0;
    public int QMATCH = 0;
    public int QMANUAL = 0;
    public int QPEND = 0;
    public int QPOLIPE = 0;
    public int QPOLIC = 0;
    
    public int TOTAL_QSALES = 0;
    public int TOTAL_QMATCH = 0;
    public int TOTAL_QMANUAL = 0;
    public int TOTAL_QPEND = 0;
    public int TOTAL_QPOLIPE = 0;
    public int TOTAL_QPOLIC = 0;
    
    public double PCT_MATCH = 0;
    public double TOTAL_PCT_MATCH = 0;
    public double SVFOP = 0;
    public double SVFOPNETR = 0;
    public double SVFOPNETRU = 0;
    public double SVFOPUSD = 0;

    // ── Totales del subselect de tickets vinculados (MPS783, drill-down de
    // Qty Ticket en Direct Sales): agregados sobre TODO el resultado
    // filtrado, no solo la página actual. ────────────────────────────────────
    public long   TOTQTYTICKET    = 0;
    public double TOTAMOUNTTICKET = 0;

}
