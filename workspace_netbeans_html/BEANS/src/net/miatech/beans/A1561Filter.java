/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1561;

/**
 * BKS100 TOTAL Liquidación por PERIDO CURRENT
 *
 * @author claudia
 */
public class A1561Filter extends A1561 {

    //Campos Filtro ==============
    public String strTipoFecha = "";
    public String fechaini = "";
    public String fechafin = "";
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String strFormatDate = "";
    public String strNombre = "";
    public String strMoneda = "";
    public String strCodError = "";
    public String strDescripcion = "";
    public String strTipo = "";
    public String strReporte = "";
    public String strPeriod = "";
    public String strFuente = "";
    public String Fuente = "";
    public int pos = 0;
    //Campos para los montos y cantidades
    //según el Concepto o Uso.
    public long lngQTKT = 0;
    public long lngQTYS = 0; //Venta
    public double dblMontoS = 0; //Venta
    public double dblMontoSN = 0; //Ventas Normales
    public double dblMontoSA = 0; //Ventas Adicionales
    public double dblMontoSO = 0; //Ventas Originales
    public long lngQTYT = 0; //Saldo Tnu
    public double dblMontoT = 0; // Saldo Tnu
    public long lngQTYV = 0; //Volado
    public double dblMontoV = 0; //Volado
    public long lngQTYE = 0; //Exchange
    public double dblMontoE = 0; //Exchange
    public long lngQTYR = 0; //Reembolso
    public double dblMontoR = 0; //Reembolso
    public long lngQTYI = 0; //Interlinea
    public double dblMontoI = 0; //Interlinea
    public long lngQTYC = 0; //Caducos
    public double dblMontoC = 0; //Caducos
    public long lngQTYRN = 0; //Regularización de VNR
    public double dblMontoRN = 0; //Regularización de VNR
    public long lngQTYN = 0; //VNR
    public double dblMontoN = 0; //VNR
    public long lngQTYNT = 0; //Nuevo Saldo TNU
    public double dblMontoNT = 0; //Nuevo Saldo TNU
    //Campos para Reporte TNU New
    public String strFecha1 = "";
    public String strFecha2 = "";
    public String strFecha3 = "";
    public String strFecha4 = "";
    public String strFecha5 = "";
    public String strFecha6 = "";
    public String strFormatFecha1 = "";
    public String strFormatFecha2 = "";
    public String strFormatFecha3 = "";
    public String strFormatFecha4 = "";
    public String strFormatFecha5 = "";
    public String strFormatFecha6 = "";
    public long lngQTY1 = 0;
    public long lngQTY2 = 0;
    public long lngQTY3 = 0;
    public long lngQTY4 = 0;
    public long lngQTY5 = 0;
    public long lngQTY6 = 0;
    public long lngQTYTotal = 0;
    public double dblMonto1 = 0;
    public double dblMonto2 = 0;
    public double dblMonto3 = 0;
    public double dblMonto4 = 0;
    public double dblMonto5 = 0;
    public double dblMonto6 = 0;
    public double dblMontoTotal = 0;
    //Porcentajes
    public double PercQTYV = 0;
    public double PercQTYE = 0;
    public double PercQTYR = 0;
    public double PercQTYI = 0;
    public double PercQTYC = 0;
    public double PercQTYTB = 0;
    public double TotPercQTY = 0;
    public double PercMontoV = 0;
    public double PercMontoE = 0;
    public double PercMontoR = 0;
    public double PercMontoI = 0;
    public double PercMontoC = 0;
    public double PercMontoTB = 0;
    public double TotPercMNT = 0;
    //A1566
    public String A1566PSVTA = "";
    //A1567
    public String A1567AGTIA = "";
    public String strNombrePais = "";
    //Ordenamiento      
    public int intCol = 0;
    public String strOrden = "";
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
}
