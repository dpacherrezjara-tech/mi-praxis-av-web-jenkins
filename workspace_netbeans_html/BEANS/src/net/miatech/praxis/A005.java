/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis;

import java.io.Serializable;
import net.miatech.beans.Pagination;

/**
 *
 * @author jtorres
 */
public class A005 extends  Pagination implements Serializable{
 
    public String A005KEY = "";
    public String A005KEY1 = "";
    public String A005KEY2 = "";
    public String A005CHS = "";
    public String A005KEY3 = "";
    public double A005COMISP = 0;
    public String A005INDCOM = "";
    public String A005ZONA = "";
    public String A005ACHS = "";
    public String A005ACPL = "";
    public String A005CIAS = "";
    public String A005CODX = "";
    
    //Filter
    public String COD="";
    public String NAME="";
    public String strCampo="";
    public String strValor="";
    public String strExcel="FALSE";
    
    //DATOS DE AUDITORIA
    public String strUSRCRT="";
    public String strFECCRT="";
    public String strHORCRT="";
    public String strUSRMOD="";
    public String strFECMOD="";
    public String strHORMOD="";

    //PAGINACION ===============================================================
    public int pos = 0;
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    
    //Extra
    public int A005RES = 0;
}
