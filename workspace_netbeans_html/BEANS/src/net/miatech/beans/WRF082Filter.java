/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;


/**
 *
 * @author claudia
 */
public class WRF082Filter  extends net.miatech.libmiatec.WRF082 {
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strYearFrom = "";
    public String strYearTo = "";
    public String strCITYPAIR = "";
    public String strGroupBy = "DATE";
    
    public int intTop = 0;
    public int intNum = 0;
    public long lngTotQTYC = 0;
    public double dblTotAMOUNUSD = 0;
    public double dblTotAMOUNNAC = 0;
    public double dblTotQKMORI = 0;
    public double dblTotQKMADD = 0;
    public String strDescripcion = "";
    public String strDescripcion2 = "";
    public String strTitulo = "";
    
    //Para Totales por CABINA =====================================
    public long lngQTYC_F = 0;
    public double dblAMOUNUSD_F = 0;
    public double dblAMOUNNAC_F = 0;
    public double dblQKMORI_F = 0;
    public double dblQKMADD_F = 0;
    public double dblFACTOR_F = 0;
    public long lngQTYC_C = 0;
    public double dblAMOUNUSD_C = 0;
    public double dblAMOUNNAC_C = 0;
    public double dblQKMORI_C = 0;
    public double dblQKMADD_C = 0;
    public double dblFACTOR_C = 0;
    public long lngQTYC_Y = 0;
    public double dblAMOUNUSD_Y = 0;
    public double dblAMOUNNAC_Y = 0;
    public double dblQKMORI_Y = 0;
    public double dblQKMADD_Y = 0;
    public double dblFACTOR_Y = 0;
    public long lngQTYC_O = 0;//OTHERS
    public double dblAMOUNUSD_O = 0;
    public double dblAMOUNNAC_O = 0;
    public double dblQKMORI_O = 0;
    public double dblQKMADD_O = 0;
    public double dblFACTOR_O = 0;
    
    public long lngTotQTYC_F = 0;
    public double dblTotAMOUNUSD_F = 0;
    public double dblTotAMOUNNAC_F = 0;
    public double dblTotQKMORI_F = 0;
    public double dblTotQKMADD_F = 0;
    public double dblTotFACTOR_F = 0;
    public long lngTotQTYC_C = 0;
    public double dblTotAMOUNUSD_C = 0;
    public double dblTotAMOUNNAC_C = 0;
    public double dblTotQKMORI_C = 0;
    public double dblTotQKMADD_C = 0;
    public double dblTotFACTOR_C = 0;
    public long lngTotQTYC_Y = 0;
    public double dblTotAMOUNUSD_Y = 0;
    public double dblTotAMOUNNAC_Y = 0;
    public double dblTotQKMORI_Y = 0;
    public double dblTotQKMADD_Y = 0;
    public double dblTotFACTOR_Y = 0;
    public long lngTotQTYC_O = 0;
    public double dblTotAMOUNUSD_O = 0;
    public double dblTotAMOUNNAC_O = 0;
    public double dblTotQKMORI_O = 0;
    public double dblTotQKMADD_O = 0;
    public double dblTotFACTOR_O = 0;
    // ============================================================
    
    //PAGINACION ==================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
}
