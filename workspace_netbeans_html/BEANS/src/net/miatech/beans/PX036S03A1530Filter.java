/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1530;

/**
 *
 * @author vhidalgo
 */
public class PX036S03A1530Filter extends A1530 {

    public String VP_FECHA = "";        // FECHA A CONSULTAR YYYMM    
    public int VP_TIPO = 0;             // TIPO DE FECHA: 1 ENDING, 2 PROCESO			
    public String VP_A1530FUENT = "";   // SOURCE, ARC,BSP, ASR, ALL
    public String VP_A1530PSVTA = "";   // PAIS DE VENTA
    public int VP_INDICADOR = 0;        // Indicador del estado: 1=Rec., 2=Cont., 5=No Asig.
    //pagin
    public Pagination page = new Pagination();
    // otros adicionales
    public String A1530STPRO_00 = "";   // Estado Proceso
    
}
