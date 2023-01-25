/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1597;

/**
 * BKS100 TOTAL Liquidación por PERIDO CURRENT
 *
 * @author claudia
 */
public class A1597Filter extends A1597 {

    //Campos Filtro ==============
    public String strTipoFecha = "";
    public String fechaini = "";
    public String fechafin = "";
    public String yearFrom = "";
    public String monthFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String strFormatDate = "";
    public String strFormatFvlo = "";
    public String strNombre = "";
    public String strNomCtry = "";
    public String strMoneda = "";
    public String strDescripcion = "";
    public String strReporte = "";
    public String strDesFuente = "";
    public int pos = 0;
    public long lngQtyPeriod = 0;
    public long lngTotalQty = 0;
    public long lngTotalQtyT = 0;
    public double dblTotalAmt = 0;
    //A1598
    public String A1598ORIG = "";
    public String A1598DEST = "";
    public String strNomCityF = "";
    public String strNomCityT = "";
    //A1603
    public String A1603FVLO = "";
    public String A1603PSVTA = "";
    //A1605
    public String strTicket = "";
    public String A1605CIA = "";
    public String A1605FORMA = "";
    public String A1605SERIE = "";
    public String A1605CUPON = "";
    public String A1605PSVTA = "";
    public String A1605FTE = "";
    public String A1605STCPN = "";
    public String A1605MDACP = "";
    public String A1605NVLO = "";
    public String A1605FVLO = "";
    public String A1605AGTIA = "";
    public String A1605CARR = "";
    public String A1605FMERC = "";
    //A1607
    public String A1607PDAM = "";
    public String A1607PDAW = "";
    public String A1607PCYC = "";
    public String A1607FTE = "";
    public String A1607MDALC = "";//Moneda Local
    public String A1607MDAAD = "";//Moneda del Adicional Local
    public double A1607TRFMX = 0;//Tarifa con tipo de cambio diario (MXN)
    public double A1607TRFUS = 0;//Tarifa con tipo de cambio diario (USD)
    public double A1607TRFLC = 0;//Tarifa con moneda Local
    public double A1607ADC = 0;//Tarifa adicional con moneda Local
    public double dblOriLC = 0;//Original con Moneda Local
    public double A1607TRMX3 = 0;//Tarifa con tipo de cambio del último día (MXN)
    public double A1607TRUS3 = 0;//Tarifa con tipo de cambio del último día (USD)
    public double A1607ADMX3 = 0;//Adicional con tipo de cambio del último día (MXN)
    public double A1607ADUS3 = 0;//Adicional con tipo de cambio del último día (USD)
    public double dblOriMX3 = 0;//Original con tipo de cambio del último día (MXN)
    public double dblOriUS3 = 0;//Original con tipo de cambio del último día (USD)
    //ORDENAMIENTO =============================================================
    public int intCol = 0;
    public String strOrden = "";
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
}
