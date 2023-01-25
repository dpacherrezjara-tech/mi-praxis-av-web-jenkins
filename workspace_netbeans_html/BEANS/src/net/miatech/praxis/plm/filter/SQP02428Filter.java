/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.plm.filter;

/**
 *
 * @author asifuentes
 */
public class SQP02428Filter {
    public long RN = 0;
    public String FECHA = "";
    public long PLM_SALE = 0;
    public long PX_SALE = 0;
    public double PORC_SALE = 0.00;

    public long PLM_EXCH = 0;
    public long PX_EXCH = 0;
    public double PORC_EXCH = 0.00;

    public long PLM_RFND = 0;
    public long PX_RFND = 0;
    public double PORC_RFND = 0.00;

    public long PLM_TOTAL = 0;
    public String estilo = "";
    
    //Filtros
    public String IN_FECHA ="";
    public String IN_FECHA2 ="";
}
