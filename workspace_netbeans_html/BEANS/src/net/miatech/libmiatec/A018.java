/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.libmiatec;

/**
 *
 * @author claudia
 */
public class A018 {

    public String A018ISO = "";
    public String A018DATE = "";
    public String A018IND = "";
    public double A018URATE = 0;
    public double A018GBP = 0;
    public double A018XEU = 0;
    public String strTipoRate = "";
    //Se añade campos del A1343 para la Consulta de Tipo de Cambio =============
    public String A1343EFF = "";
    public String A1343DIS = "";
    public String A1343CUR = "";
    public String A1343CUR2 = "";
    public double A1343RATE = 0;
    public double A1343IRATE = 0;
    public double A13431RATE = 0;
    public String A1343FLAG1 = "";
    public String A1343FLAG2 = "";
    public String A1343FLAG3 = "";
    //PAGINACION ===============================================================
    public int pos = 0;
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
}
