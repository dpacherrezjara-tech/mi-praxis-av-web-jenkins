/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis;

import net.miatech.beans.Pagination;

/**
 *
 * @author asifuentes
 */
public class A128 extends Pagination {
    public String A128TIPO  ="";
    public String A128AREGIO  ="";
    public String A128PAIS  ="";
    public String A128CIUDAD  ="";
    public String NOMREGION = "";
    public String NOMPAIS = "";
    public String NOMCIUDAD = "";
    
    //KEYS ORIGINALES
    public String A128TIPO_OLD  ="";
    public String A128AREGIO_OLD  ="";
    public String A128PAIS_OLD  ="";
    public String A128CIUDAD_OLD  ="";    
    
    //AUDITORIA =============================================================== 
    public String A128REGIST  ="";      //   Ingresado por
    public String A128FREGIS  ="";      //   Fecha Ingreso 
    public String A128REVISA  ="";      //   Modificado  por
    public String A128FREVIS  ="";      //   Fecha Modificac
    public int pos = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;     
    
    //PARAMETROS DE SALIDA
    public String OU_SQLCODE ="";
    public String OU_MESSAGE ="";
}

