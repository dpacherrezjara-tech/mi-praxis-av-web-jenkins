/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.libmiatec.WRF109;

/**
 *
 * @author claudia
 */
public class WRF109Filter extends WRF109 implements Serializable {

    public String CALFA = "";
    public int intCol = 0;
    public String strOrden = "";
    public int intRowNumber = 0;
    public String strFecha = "";
    public String strTitulo = "";
    public String strNomReg = "";
    
    public int intTotalRws = 0;
    public int intCurrentPg = 0;
    public int intTotalPgs = 0;
    public int intPageRws = 0;
    
    public double dblPercQTYC = 0;//(QTYC*100)/TOTQTYC
    public double dblAvgQTYC = 0;//SALES/QTYC
    public double dblAvgAMOUN = 0;//QTYC/AMOUN
    public double dblAvgAMOUNM = 0;//QTYC/AMOUNM
    public long lngDifKMVLO = 0;//KMVLO-KMORM
    public double dblDifAMOUN = 0;//AMOUN-AMOUNM
    public double dblPercDiff = 0;//(dblDifAMOUN*100)/AMOUN
    
    public long lngTotQTYC = 0;
    public double dblTotSALES = 0;
    public long lngTotKMVLO = 0;
    public double dblTotAMOUN = 0;
    public long lngTotKMORM = 0;
    public long lngTotKMADM = 0;
    public double dblTotAMOUNM = 0;
    public double dblTotAvgQTYC = 0;//dblTotSALES/lngTotQTYC
    public double dblTotAvgAMOUN = 0;//lngTotQTYC/dblTotAMOUN
    public double dblTotAvgAMOUNM = 0;//lngTotQTYC/dblTotAMOUNM
    public long lngTotDifKMVLO = 0;//lngTotKMVLO-dblTotKMORM
    public double dblTotDifAMOUN = 0;//dblTotAMOUN-dblTotAMOUNM
    public double dblTotPercDiff = 0;//(dblTotDifAMOUN*100)/dblTotAMOUN
    
}
