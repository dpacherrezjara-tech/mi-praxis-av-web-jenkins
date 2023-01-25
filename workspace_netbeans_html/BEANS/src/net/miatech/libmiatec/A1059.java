/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.libmiatec;

/**
 *
 * @author andrea
 */
public class A1059 {

    public String A1059PAIS = "";   //    Pais de Ciudad/ATO
    public String A1059REGI = "";   //    Region Iata  
    public String A1059CONT = "";   //    Continente    
    public String A1059SBCO = "";   //    Sub-Continente
    public String strNomPais = "";
    public String strNomRegion = "";
    public String strNomContinente = "";
    public String strNomSubContinente = "";
    //auditoria                                         
    public String A1059REGIS = "";   //   Ingresado por
    public String A1059FREGI = "";   //   Fecha Ingreso 
    public String A1059REVIS = "";   //   Modificado  por
    public String A1059FREVI = "";   //   Fecha Modificac
    public int pos = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
}
