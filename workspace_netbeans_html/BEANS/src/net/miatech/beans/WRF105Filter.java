/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.libmiatec.WRF105;

/**
 *
 * @author claudia
 */
public class WRF105Filter extends WRF105 implements Serializable {

    public String CALFA = "";
    public int intCol = 0;
    public String strOrden = "";
    public int intRowNumber = 0;
    public String strTitulo = "";
    public String strFlag = "";
    public double dblTotKMVLO = 0;
    public double dblTotAMOUN = 0;
    public double dblTotKMORM = 0;
    public double dblTotKMADM = 0;
    public double dblTotKADPL = 0;
    public double dblTotAMOUNM = 0;
    public long lngTotQTYC = 0;
    public long lngTotQTYM = 0;
    public double dblDiffKMs = 0;
    public double dblDiffAmt = 0;
    public double dblPercDiffK = 0;
    public double dblPercDiffA = 0;
    public double dblTotDiffKMs = 0;
    public double dblTotDiffAmt = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
}
