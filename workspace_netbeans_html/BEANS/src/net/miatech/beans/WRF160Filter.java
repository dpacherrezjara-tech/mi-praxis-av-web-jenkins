/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libmiatec.WRF079;
import net.miatech.libweb.WRF160;

/**
 *
 * @author claudia
 */
public class WRF160Filter extends WRF160 {

    public String strFilter = "";
    public String strDateIni = "";
    public String strDateFin = "";
    public int intRowNumber = 0;
    public int intCol = 0;
    public String strOrden = "";
    public String CALFA = "";
    public String strDesAirline = "";
    public String strDate = "";
    public String strDesCityO = "";
    public String strDesCityD = "";
    public String strDescPaisVenta = "";
    public String strDescCityVenta = "";
    public String strDescCabin = "";
    public String strDescRuta = "";
    public String strDescRBD = "";
    public String strTitulo = "";
    public String strCIA = "";
    public String PSVTA = "";
    public String CTVTA = "";
    public String RUTA = "";
    public String CTORI = "";
    public String CTFIN = "";
    public String strIDCIUDAD = "";
    public String strTipoCityPair = "";
    public long lngTotQTYC = 0;
    public double dblTotQTYC = 0;
    public double dblTotFAREMX = 0;
    public double dblTotFAREUS = 0;
    public double dblTotVCPMX = 0;
    public double dblTotVCPUS = 0;
    public double dblTotVCPMXAM = 0;
    public double dblTotVCPUSAM = 0;
    public double dblPercQty = 0;
    public double dblPercYQty = 0;
    public double dblPercJQty = 0;
    public double dblPercFQty = 0;
    public double dblPercYVCPUS = 0;
    public double dblPercJVCPUS = 0;
    public double dblPercFVCPUS = 0;
    //Totales por cabina
    public int intTotFQTYC = 0, intTotYQTYC = 0, intTotJQTYC = 0;
    public double dblTotFVCPMX = 0, dblTotYVCPMX = 0, dblTotJVCPMX = 0;
    public double dblTotFVCPUS = 0, dblTotYVCPUS = 0, dblTotJVCPUS = 0;
    public double dblTotFVCPMXAM = 0, dblTotYVCPMXAM = 0, dblTotJVCPMXAM = 0;
    public double dblTotFVCPUSAM = 0, dblTotYVCPUSAM = 0, dblTotJVCPUSAM = 0;
    public double dblTotFAVG = 0, dblTotYAVG = 0, dblTotJAVG = 0;
    //wrf165
    public String NFLIGH = "";
    public int intTotQVLO = 0;
    public int intQVLO = 0;
    //wrf168 Venta
    public int lngQCUPONS = 0;
    public double dblAMOUNT = 0;
    public double dblPercSalePax = 0;
    public double dblAvgSale = 0;
    public double lngTotQCUPONS = 0;
    public double dblTotAMOUNT = 0;
    public double dblTotPercSalePax = 0;
    public double dblTotAvgSale = 0;
    //PORCENT
    public double dblPercVCPUS = 0;
    public double dblPercSaleVCPUS = 0;
    public double dblTotPercSaleVCPUS = 0;
    public double dblAVG = 0;
    public double dblTotAVG = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    //COSTOS
    public double dblOperCost = 0;
    public double dblOperResult = 0;
    public double dblNoOperCost = 0;
    public double dblFinalResult = 0;
    public double dblTotSeatCost = 0;
    public double dblDiffCost = 0;
    // =========================================================================
    public double DOC = 0;
    public double IDOC = 0;
    public double NOC = 0;
    public long FIRSEAT = 0;
    public long BUSSEAT = 0;
    public long ECOSEAT = 0;
    public long TOTSEAT = 0;
    public double dblCostSeat = 0;
    public double dblCostTotal = 0;
    public WRF079 beanCosto;
}
