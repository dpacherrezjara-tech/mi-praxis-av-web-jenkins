/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1538;

/**
 *
 * @author jtorres
 */
public class A1538Filter extends A1538 {

    public int pos = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    //ORDER BY =================================================================
    public int intCol = -1;
    public String strOrden = "";
    public String strFormatDate = "";
    public String strNombre = "";
    public String strTipo = "";
    public String strDesCityF = "";
    public String strDesCityT = "";
    public String strTUSO = "";
    public String strFilTUSO = "";
    public String strTipoFecha = "";
    public String strFecha = "";
    public String strETKT = "";
}
