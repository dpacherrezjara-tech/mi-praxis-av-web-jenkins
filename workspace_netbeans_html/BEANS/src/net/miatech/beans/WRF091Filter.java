/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libmiatec.WRF079;
import net.miatech.libmiatec.WRF091;


/**
 *
 * @author
 * claudia
 */
public class WRF091Filter extends WRF091 {

    public String strFilter = "";
    public String strDateIni = "";
    public String strDateFin = "";
    public int intRowNumber = 0;
    public int intCol = 0;
    public String strOrden = "";
    public String CALFA = "";
    //TOTALES ==================================================================
    public double dblAVG = 0;
    public double dblTotGROSS = 0;
    public double dblTotISC = 0;
    public double dblTotTAX = 0;
    public double dblTotNETO = 0;
    public double dblTotPRORAF = 0;
    public double dblTotGROSSL = 0;
    public double dblTotGROSSH = 0;
    public double dblTotTOTRV = 0;
    public double dblTotTOTCOSD = 0;
    public double dblTotTOTCOSG = 0;
    public double dblTotAVG = 0;
    public int intTotQTYC = 0;
    public int intQVLO = 0;
    public int intTotQVLO = 0;
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
    public double DOC = 0;
    public double IDOC = 0;
    public double NOC = 0;
    public long FIRSEAT = 0;
    public long BUSSEAT = 0;
    public long ECOSEAT = 0;
    public long TOTSEAT = 0;
    public double dblCostSeat = 0;
    public double dblCostTotal = 0;
    public String strTipoCia = "";
    public String strTipoCityPair = "";
    public String strIDCIUDAD = "";
    
    public double dblOperCost = 0;
    public double dblOperResult = 0;
    public double dblNoOperCost = 0;
    public double dblFinalResult = 0;
    
    public double dblPercPax = 0;
    public double dblPercRev = 0;
    
    //TOTALES POR CABINA =======================================================
    public double dblTotFGROSS = 0;
    public double dblTotFAVG = 0;
    public double dblPercFPax = 0;
    public double dblPercFRev = 0;
    public double dblPercQty = 0;
    
    public int intTotFQTYC = 0;
    public double dblTotYGROSS = 0;
    public double dblTotYAVG = 0;
    public double dblPercYPax = 0;
    public double dblPercYRev = 0;
    public int intTotYQTYC = 0;
    public double dblTotJGROSS = 0;
    public double dblTotJAVG = 0;
    public double dblPercJPax = 0;
    public double dblPercJRev = 0;
    public int intTotJQTYC = 0;
    public long lngQCUPONS = 0;
    public double dblAMOUNT = 0;
    public long lngTotQCUPONS = 0;
    public double dblTotAMOUNT = 0;
    public double dblPercSalePax = 0;
    public double dblPercSaleAmt = 0;
    public double dblTotPercSalePax = 0;
    public double dblTotPercSaleAmt = 0;
    public double dblAvgSale = 0;
    public double dblTotAvgSale = 0;
    
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    public WRF079 beanCosto;
    
}
