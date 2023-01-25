/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.libmiatec.CPF050;


/**
 *
 * @author
 * claudia
 */
public class CPF050Filter extends CPF050  implements Serializable {

    public String strYearFrom = "";
    public String strYearTo = "";
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strDayFrom = "";
    public String strDayTo = "";
    
    public String strCategoria = "";
    public String strEstilo = "";
    public String strEstilosTotales = "";
    public String strNombre = "";
    public String strDNI = "";
    public String strTotalPermisos = "";
    public String strHorasAdic = "";
    public String strTiempoTard = "";
    public String strHorasResult = "";
    public String strTardRef = "";
    public String strTardIng = "";
    public String strTardSal = "";
    public String strTardTotal = "";
    public String strTardMasPermi = "";
    public long lngCantidad = 0;
    public long lngTotFaltas = 0;
    public long lngTotPermisos = 0;
    public long lngTotTardIng = 0;
    public long lngTotTardRef = 0;
    public long lngTotTardSal = 0;
    public long lngTotTardTotal = 0;
    
}
