/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.libmiatec;

import net.miatech.beans.Pagination;

/**
 *
 * @author jtorres
 */
public class A881 {
    
    public String A881PAIS="";
    public String A881FECHA="";
    public String A881IND024="";
    public String A881REGIST="";
    public String A881FREGIS="";
    public String A881HREGIS="";
    public String A881REVISA="";
    public String A881FREVIS="";
    public String A881HREVIS="";
    public String A881MONEDA="";
    
    //Filtro
    public String yearFrom="";
    public String monthFrom="";
    public String yearTo="";
    public String monthTo="";
    public String strCampo="";
    public String strValor="";
    public String strNombrePais="";
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strExcel = "FALSE";
    public String dateFrom="";
    public String dateTo="";
    
    //PAGINACION ===============================================================
    public int pos = 0;
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
     public Pagination page = new Pagination(); 
}
