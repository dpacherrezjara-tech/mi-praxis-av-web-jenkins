/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.payment;

/**
 *
 * @author singa
 */
public class MPF190Create {
    // ── Llave del registro a crear (no hereda de ningún registro previo) ──────
    // Cbatch y Seq NO van aquí: MPS781 los genera internamente (Cbatch vía
    // CASH_CBATCH, Seq contando registros existentes para Ccust+Sagent+Sdate).
    public String CCUST     = "";
    public String TREG      = "";
    public String ADATE     = "";
    public String SCOUNTRY  = "";
    public String SAGENT    = "";
    public String SCURRENCY = "";

    // ── Campos editables en el DataEntry ──────────────────────────────────────
    public String NETO      = "";
    public String PAYAMOU   = "";
    public String SDATE     = "";
    public String REFERENCE = "";
    public String SFILE     = "";
    public String NPAG      = "";
    public String STRDATE   = "";
    public String ENDDATE   = "";
    public String COMMENTS  = "";
}
