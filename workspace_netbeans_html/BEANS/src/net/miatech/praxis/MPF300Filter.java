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
public class MPF300Filter {
    public Pagination page = new Pagination();

    // ── MPS738 (Direct Sales - Generar / Reversa) ─────────────────────────────
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO   = "";
    // Si viene vacio se entiende como "todos los agentes" (sin filtrar).
    public String IN_SAGENT    = "";
}
