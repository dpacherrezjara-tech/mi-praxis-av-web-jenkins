/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.librfnd.filter;

import net.miatech.beans.Pagination;
import net.miatech.librfnd.CPF030;

/**
 *
 * @author ggutierrez
 */
public class CPF030Filter extends CPF030{
    
    public int RN;
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_USEAC = "";
    public String IN_FASIG = "";
    public Double PORCENTAJE = 0.0;
    public String desPORCENTAJE = "";
    public String desTMOTI = "";
    public String desTEMI = "";
    public String desTRFND = "";
    public String desESTAD = "";
    public String subFECAC = "";
    
    public long totPRODUS = 0;
    public long totDIASL = 0;
    public long totTOTALP = 0;
    public long totPENDING = 0;
    public long totAUDITADOS = 0;
    public long totAsig = 0;
    
    // Qty
    public long qtyPENDING = 0;
    public long qtyAUDITADOS = 0;
    public long qtyTotal = 0;
    public long DIAS_LABORADOS = 0;
    public long DIF_DIAS = 0;
    public String minFECAC = "";
    public String maxFECAC = "";
    
    public Pagination page = new Pagination();
}
