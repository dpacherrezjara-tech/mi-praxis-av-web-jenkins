/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author claudia
 */
public class A1462Filter extends net.miatech.qgpl.A1462 {

    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strYearFrom = "";
    public String strYearTo = "";
    public long lngQtyDoc = 0;
    public long lngQtyDocON = 0;
    public long lngQtyDocOAL = 0;
    public String strName = "";
    public String strFecha = "";
    public String strGroupBy = "";
    public String strDetalle = "";
    public int intTop = 0;


    // Totales =================================================================
    public long lngTotQdoc = 0;
    public long lngTotQdocON = 0;
    public long lngTotQdocOAL = 0;
    public double dblTotGross = 0;
    public double dblTotIsc = 0;
    public double dblTotTax = 0;
    public double dblTotNeto = 0;
    public double dblTotCom = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    public int intRowNumber = 0;
    
}
