/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;
import net.miatech.praxis.A1718;
/**
 *
 * @author asifuentes
 */
public class A1718Filter extends A1718{
    public long RN;
    public String IN_A1718CCUST = "";
    public String IN_A1718FECHA = "";
    public String IN_A1718MONEDA = "";
    public String IN_A1718SEQ = "";
    public int A1718TOTAL=0;
    public String A1718CUENT = "";
    
    //Campos para Comisiones FOP
    public double A1718TAX = 0.0;
    public double A1718NETO = 0.0;
    public Pagination page = new Pagination();    
}
