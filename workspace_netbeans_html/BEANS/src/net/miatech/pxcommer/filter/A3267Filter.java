/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.pxcommer.filter;

import net.miatech.beans.Pagination;
import net.miatech.pxcommer.A3267;

/**
 *
 * @author asifuentes
 */
public class A3267Filter extends A3267{
    public String IN_CCUST = "";
    public String IN_ORIGEN = "";
    public String IN_DESTINO = "";
    public long IN_KMS = 0;
    public long IN_MILLAS = 0;
    public String IN_USR = "";
    public String IN_FEC = "";
    public String IN_HOR = "";
    public String IN_ORIGEN_OLD = "";
    public String IN_DESTINO_OLD = "";

    //PAGINACION 
    public long RN = 0; 
    public Pagination page = new Pagination();
}
