/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author vhidalgo
 */
public class PX036S02A1530Filter {
    // parameters of Procedure INPUT
    
    public String  VP_FECHA = "";
    public int VP_TIPO = 0;
    public String VP_A1530FUENT = ""; // FECHA A CONSULTAR YYYMM
    public String VP_A1530PSVTA =""; // TIPO DE FECHA: 1 ENDING, 2 PROCESO			
    // var of OUTput
    public String VL_DATE_PROC_00 ="";
    public String VL_DATE_PROC ="";
    public int VL_RECEIVED = 0;
    public int VL_GROUP_ACOUNT = 0;
    public int VL_GROUP_NOT_ACOUNT = 0;
    public int VL_GROUP_NOT_ASIG = 0;
    public int VL_GROUP_ASIG = 0;
    // TOTALES FA
    public int VL_RECEIVED_TOT = 0;
    public int VL_GROUP_ACOUNT_TOT = 0;
    public int VL_GROUP_NOT_ACOUNT_TOT = 0;
    public int VL_GROUP_NOT_ASIG_TOT = 0;
    public int VL_GROUP_ASIG_TOT = 0;
             
}
