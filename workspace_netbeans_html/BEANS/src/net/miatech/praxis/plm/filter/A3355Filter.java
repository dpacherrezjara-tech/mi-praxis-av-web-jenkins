/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A3355;
/**
 *
 * @author asifuentes
 */
public class A3355Filter extends A3355 {
    public String IN_YEAR = "";
    public int IN_MONTH = 0;
    public String IN_FQTVN = "";
    public int IN_ALL = 0;
    public int IN_ZERO = 0;
    public int IN_ORDER_INDEX = 0;
    public String IN_ORDER_TYPE = "ASC";
    public String strStatus = "";
    public String strDescription = "";
    
    //Para diferencias
    public double DIF01 = 0.0;
    public double DIF02 = 0.0;
    public double DIF03 = 0.0;
    public double DIF04 = 0.0;
    public double DIF05 = 0.0;
    public double DIF06 = 0.0;
    public double DIF07 = 0.0;
    public double DIF08 = 0.0;
    public double DIF09 = 0.0;
    public double DIF10 = 0.0;
    public double DIF11 = 0.0;
    public double DIF12 = 0.0;
    
    //Para totales
    //TOTSAL
    public double TOTSAL01 = 0.0;
    public double TOTSAL02 = 0.0;
    public double TOTSAL03 = 0.0;
    public double TOTSAL04 = 0.0;
    public double TOTSAL05 = 0.0;
    public double TOTSAL06 = 0.0;
    public double TOTSAL07 = 0.0;
    public double TOTSAL08 = 0.0;
    public double TOTSAL09 = 0.0;
    public double TOTSAL10 = 0.0;
    public double TOTSAL11 = 0.0;
    public double TOTSAL12 = 0.0;
    
    //TOTDIF
    public double TOTDIF01 = 0.0;
    public double TOTDIF02 = 0.0;
    public double TOTDIF03 = 0.0;
    public double TOTDIF04 = 0.0;
    public double TOTDIF05 = 0.0;
    public double TOTDIF06 = 0.0;
    public double TOTDIF07 = 0.0;
    public double TOTDIF08 = 0.0;
    public double TOTDIF09 = 0.0;
    public double TOTDIF10 = 0.0;
    public double TOTDIF11 = 0.0;
    public double TOTDIF12 = 0.0;
    
    //TOTQKM
    public double TOTQKM01 = 0.0;
    public double TOTQKM02 = 0.0;
    public double TOTQKM03 = 0.0;
    public double TOTQKM04 = 0.0;
    public double TOTQKM05 = 0.0;
    public double TOTQKM06 = 0.0;
    public double TOTQKM07 = 0.0;
    public double TOTQKM08 = 0.0;
    public double TOTQKM09 = 0.0;
    public double TOTQKM10 = 0.0;
    public double TOTQKM11 = 0.0;
    public double TOTQKM12 = 0.0;
    
    //PAGINACION 
    public long RN = 0; 
    public Pagination page = new Pagination();

    public A3355Filter()
    {
    }
}
