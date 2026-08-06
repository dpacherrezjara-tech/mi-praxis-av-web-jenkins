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

    // ── MPS775 (detalle, tanto por drill-down del dashboard como por el toggle
    // Dashboard/Detail con filtro libre) ─────────────────────────────────────
    public String IN_STVAL     = "";
    public String IN_SCURRENCY = "";
    // IN_NETO/IN_PAYAMOU van como texto (no numérico) para poder enviar el
    // signo tal cual si el monto buscado es negativo.
    public String IN_NETO      = "";
    public String IN_PAYAMOU   = "";

}
