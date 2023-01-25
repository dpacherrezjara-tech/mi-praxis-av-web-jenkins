/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.ARCF24;

/**
 * BKS100 TOTAL Liquidación por PERIDO CURRENT
 * @author claudia
 */
public class ARCF24Filter extends ARCF24 {
    
    //Campos Filtro ==============
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String periodo = "";
    public String formatDate = "";
    public String nombre = "";
    public String formatProcDate = "";
    public String formatBillDate = "";
    public String formatIssue = "";
    public String strTipoFecha = "";
    public String strNombrePais = "";
    public String strDate = "";
    public int pos = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
}
