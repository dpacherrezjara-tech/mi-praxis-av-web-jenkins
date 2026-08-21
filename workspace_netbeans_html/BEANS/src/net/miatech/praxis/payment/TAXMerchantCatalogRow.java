/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.payment;

import java.util.ArrayList;
import java.util.List;

/**
 * CSR 1715 - Creacion y actualizacion masiva catalogo TAX.
 *
 * Representa una fila del Excel de carga masiva de MPF154, ya sea en la
 * respuesta de /validateExcel (previsualizacion, sin tocar la base de datos)
 * o en la respuesta de /processExcel (resultado real del alta/actualizacion).
 */
public class TAXMerchantCatalogRow extends MPF154 {

    // 1-based, coincide con la fila visible en Excel (incluye la fila de cabecera)
    public int ROW_NUM = 0;

    // 'C' (alta) o 'U' (actualizacion) - resuelto en el servidor comparando
    // la llave de la fila contra las llaves ya existentes en MPF154.
    public String ACTION = "";

    public boolean VALID = true;

    public List<String> ERRORS = new ArrayList<String>();

    public void addError(String message) {
        this.VALID = false;
        this.ERRORS.add(message);
    }
}
