/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.libmiatec;

import net.miatech.beans.Pagination;

/**
 *
 * @author andrea
 */
public class A722 {

    public String A722AIRLIN = "";   // AIRLINE         
    public String A722FORMA = "";    // FORMA          
    public String A722FDESDE = "";   // FECHA DESDE    
    public String A722FHASTA = "";   // FECHA HASTA     
    public String A722FTEVTA = "";   // FUENTE DE VENTA
    public String A722TFORM1 = "";   // TIPO FORMA 1   
    public String A722TFORM2 = "";   // TIPO FORMA 2   
    public String A722TFORM3 = "";   // TIPO FORMA 3   
    public String A722UFORMA = "";   // USO DE FORMA    
    public String A722VFORMA = "";   // VENTA DE FORMA   //I     International  //D     Domestic  //M     MIXTO              
    public int A722DIGSER    = 0;   // DIGITOS DE SERIE
    public String A722METODO = "";   // METODO CHEQUEO  //1-PRE-PRINTED //2-TAT & MPD //3-CPN BY CPN             
    public String A722EMTCUP = "";   // EMITIR CUPONES
    public int A722TOTCUP    = 0;   // TOTAL CUPONES 
    public String A722INDSCN = "";   // INDICADOS de SCN *S/Si Permite SCN  *N/No Permite SCN 
    public String strA722VFORMA = "";
    public String strA722METODO = "";
    public String strA722INDSCN = "";
    
    
    //auditoria                                         
    public String A722REGIST = "";   //   Ingresado por
    public String A722FREGIS = "";   //   Fecha Ingreso 
    public String A722HREGIS = "";   //   Hora Ingreso 
    public String A722REVISA = "";   //   Modificado  por
    public String A722FREVIS = "";   //   Fecha Modificac
    public String A722HREVIS = "";   //   Hora Modificac
    public int pos = 0;
    
       //Filtro
    public String yearFrom="";
    public String monthFrom="";
    public String yearTo="";
    public String monthTo="";
    public String strForma="";
    public String strValor="";
    public String strNombrePais="";
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strExcel = "FALSE";
    public String dateFrom;
    public String dateTo;
    
    //A051 descripciion
    public String ds_A722FTEVTA = "";
    public String ds_A722TFORM3 = ""; 
    public String ds_A722UFORMA = ""; 
    public String ds_A722EMTCUP = "";   
    
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
    
    public Pagination page = new Pagination();
}
