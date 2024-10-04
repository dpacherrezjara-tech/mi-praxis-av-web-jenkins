/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4545;

/**
 *
 * @author vhidalgo
 */
public class SQP05352Filter {

    // Entrada
    public String VP_CCUST = "";
    public String VP_OPCION = "";
    public String VP_MODO = "";
    public String VP_PROCESA = "";
    public String VP_IDCON = "";
    public String VP_DTYPE = "";
    public String VP_FDATE1 = "";
    public String VP_FDATE2 = "";
    
    // Salida
    public Integer RN = 0;
    public String CCUST = "";
    public String CCUST_0 = "";
    public String HEADER = "";
    public String BANDOC = "";
    public String PSTGD = "";
    public String DCONT = "";
    public String MODO = "";
    public String MODO_0 = "";
    public String CODPRO = "";
    public String SCURRENCY = "";
    public Double NETO = 0.0;
    public String STCON = "";
    public String STCON_0 = "";
    public Integer ITEMS = 0;
    
    public Pagination page = new Pagination();
}
