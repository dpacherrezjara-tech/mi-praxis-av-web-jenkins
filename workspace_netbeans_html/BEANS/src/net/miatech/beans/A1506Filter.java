/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;


/**
 *
 * @author claudia
 */
public class A1506Filter  extends net.miatech.qgpl.A1506 {
    public String strMonthFrom = "";
    public String strMonthTo = "";
    public String strYearFrom = "";
    public String strYearTo = "";
    public String strCITYPAIR = "";
    public String strGroupBy = "DATE";
    
    public double dblTotKMORI = 0;
    public double dblTotKMADD = 0;
    public double dblTotPORCE = 0;
    public double dblTotCOEFI = 0;
    public double dblTotAMOUN = 0;
    public String strDescripcion = "";
    public String strTitulo = "";
    public int intNum = 0;
    
    //PAGINACION ==================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
}
