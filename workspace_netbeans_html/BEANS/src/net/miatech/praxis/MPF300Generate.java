/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis;

/**
 *
 * @author singa
 */
public class MPF300Generate {

    // ── MPS739 (Direct Sales - Generar individual): misma llave de 7 campos
    // por la que MPS738 agrupa (CCUST/SCOUNTRY/SDATE/SAGENT/SUBFTE/INVOICE/
    // SCURRENCY). IN_USR no viaja en el bean: lo agrega el DAO desde la
    // sesion. ─────────────────────────────────────────────────────────────
    public String CCUST = "";
    public String SCOUNTRY = "";
    public String SDATE = "";
    public String SAGENT = "";
    public String SUBFTE = "";
    public String INVOICE = "";
    public String SCURRENCY = "";
}
