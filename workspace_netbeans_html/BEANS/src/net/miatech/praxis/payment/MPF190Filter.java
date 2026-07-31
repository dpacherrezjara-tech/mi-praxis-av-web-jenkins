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
public class MPF190Filter {
    public Pagination page = new Pagination();

    public String IN_CCUST     = "";
    public String IN_SEARCH    = "";
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO   = "";
    public String IN_SCOUNTRY  = "";
    public String IN_SAGENT    = "";

    // ── MPS775 (detalle / drill-down) ────────────────────────────────────────
    public String IN_PERIODO   = "";
    public String IN_STVAL     = "";

}
