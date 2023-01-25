/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libmiatec.WRF072;

/**
 *
 * @author
 * jruiz
 */
public class WRF072Filter extends WRF072 {

    public String strFilter = "";
    public String strCcust = "";
    public String strDateIni = "";
    public String strDateFin = "";
    public String strCurrency = "";
    public String strCodAirline = "";
    public String strColumnOrder = "";
    public String strOrder = "";
    public String strOrigen = "";
    public String strDestino = "";
    public String strOption = "";
    public String strPaisVenta = "";
    public String strCityVenta = "";
    public String strDescPaisVenta = "";
    public String strDescCityVenta = "";
    public String strCabina = "";
    public String strRBD = "";
    /*Lista*/
    public int intRowNumber = 0;
    public String strCityPair = "";
    public String strCityFrom2 = "";
    public String strCityTo2 = "";
    public String strMoned = "";
    public int intQtydoc = 0;
    public double dblGROSS = 0;
    public double dblISC = 0;
    public double dblTAX = 0;
    public double dblNETO = 0;
    public int intPRORAF = 0;
    public double dblFactor = 0;
    public double dblAVG = 0;
    public double dblCOST = 0;
    public double dblResult = 0;
    public double dblNoper = 0;
    public double dblFResult = 0;
    
    /*Totales*/
    public double totDblGROSS = 0;
    public double totDblISC = 0;
    public double totDblTAX = 0;
    public double totDblNETO = 0;
    public int totIntQTYC = 0;
    public int totIntPRORAF = 0;
    public double totDblFactor = 0;
    public double totDblAVG = 0;
    public double totDblCOST = 0;
    public double totDblResult = 0;
    public double totDblNoper = 0;
    public double totDblFResult = 0;
    public String strDesAirline = "";
    public String strDate = "";
    public String strRuta = "";
    //PAGINACION ==================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
    public Pagination page = new Pagination();
}
