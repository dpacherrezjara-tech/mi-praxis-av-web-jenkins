/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import net.miatech.praxis.A2850;
/**
 *
 * @author asifuentes
 */
public class A2850Filter extends A2850 {
    public long RN = 0;
    public String IN_CCUST = "";
    public String IN_REFER = "";
    public String IN_IATA = "";
    public String IN_LOTE = "";
    public String IN_FPAG = "";
    public String IN_STAT = "";
    
    public String strIATA = "";
    
    public Pagination page = new Pagination();
}
