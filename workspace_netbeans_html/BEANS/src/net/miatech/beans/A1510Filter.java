/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.libmiatec.A1510;
import net.miatech.libmiatec.WRF079;

/**
 *
 * @author
 * claudia
 */
public class A1510Filter extends A1510 implements Serializable{

    public String strDateIni = "";
    public String strDateFin = "";
    public String strDate = "";
    public String strFilter = "";
    public String strTipoCia = "";
    public String CALFA = "";
    public int intCol = 0;
    public String strOrden = "";
    public int intRowNumber = 0;
    public int intTotQTKT = 0;
    public double dblTotGROSSM = 0;
    public double dblTotGROSSO = 0;
    public String strDesCityO = "";
    public String strDesCityD = "";
    public String strDescCityVenta = "";
    public String strDescPaisVenta = "";
    public String strDescCabin = "";
    public String strDescRBD = "";
    public String strType = "";
    public double dblTotSeatCost = 0;
    public double dblDiffCost = 0;
    public WRF079 beanCosto;
    
}
