/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;
import net.miatech.praxis.A1869;
/**
 *
 * @author jjulca
 */
public class A1869Filter extends A1869{
    public long RN;
    
    public String IN_A1869CCUST = "";
    public String IN_A1869FECHA = "";
    public String IN_A1869FUENT = "";
    public String IN_A1869PAIS = "";
    public String IN_A1869CANAL = "";
    public String IN_A1869GRUPO = "";
    public String IN_A1869TIPO = "";
    public String IN_A1869SEC = "";
    
    public double A1869ADMC_S = 0.0 ;
    public double A1869ADMT_S = 0.0 ;
    public double A1869ADMDC_S = 0.0 ;
    public double A1869ADMDT_S = 0.0 ;
    
    public int A1869QTY = 0;
    public int A1869QTYCC = 0;
    public double A1869TOTAL = 0.0 ;
    public double A1869TOTALCC = 0.0 ;
    public int A1869DDQTY = 0;
    public double A1869DDTOTAL = 0.0 ;
    
    public Pagination page = new Pagination();
}
