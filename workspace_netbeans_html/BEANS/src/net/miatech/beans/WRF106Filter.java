/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.libmiatec.WRF106;

/**
 *
 * @author claudia
 */
public class WRF106Filter extends WRF106 implements Serializable {

    public String CALFA = "";
    public int intCol = 0;
    public String strOrden = "";
    public int intRowNumber = 0;
    public String strFecha = "";
    public String strTitulo = "";
    public long dblTotQTYC = 0;
    public long dblTotKMVLO = 0;
    public double dblTotAMOUN = 0;
    public double dblTotCCOST = 0;
    public String strGrupo = "";
    
    //paginacion
    public int  intCurrentPg=0;
    public int intPageRws=0;
    public int intTotalRws=0;
    public int intTotalPgs=0; 
     public String strFlag="";
}
