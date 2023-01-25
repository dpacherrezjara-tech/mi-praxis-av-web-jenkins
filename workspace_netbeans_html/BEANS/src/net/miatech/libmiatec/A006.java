/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.libmiatec;

import net.miatech.beans.Pagination;

/**
 *
 * @author rmayta
 */
public class A006 extends Pagination{

    public Boolean FOUND = false;
    //CODIGO DE PAIS Y MONEDA
    public String A006KEY = "";
    //****************************
    //NOMBRE DE PAIS Y MONEDA
    public String A006KEY1 = "";
    public String A006MONEDA = "";
    //*************************
    public String A006PAIS = "";
    public String A006NOMBRE = "";
  
    //Auditoria
    public String A006USRCR = "";
    public String A006FECCR = "";
    public String A006HORCR = "";
    public String A006USRAC = "";
    public String A006FECAC = "";
    public String A006HORAC = "";
    
    //Filter
    public String strCampo = "";
    public String strValor = "";
    public String strName = "";
    public String strExcel = "FALSE";
    
    //PAGINACION ===============================================================
    public int pos = 0;
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
    //EXTRA
    public int A006RES = 0;
    
    //CAMPOS PARA GRID
    public String CODMONEDANUM = "";
    public String CODMONEDAALPHA = "";
    public String NOMMONEDA = "";
}
