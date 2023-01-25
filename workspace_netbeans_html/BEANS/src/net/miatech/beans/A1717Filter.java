/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;
import net.miatech.praxis.A1717;
/**
 *
 * @author asifuentes
 */
public class A1717Filter extends A1717{
    public long RN;
    public String IN_A1717CCUST="";
    public String IN_A1717FECHA="";
    public String IN_A1717PERIO="";
    public String IN_A1717CATEG="";
    public String IN_A1717LOTE="";
    public String IN_A1717FUENT="";
    
    //GL
    public String A1717NATUR ="";
    public double A1717VSALC =0.00;
    public double A1717VRFLC =0.00;
    public double A1717VNTLC =0.00;
    public String A1717TIPO ="";
    public String A1717IATA = "";
        
    public Pagination page = new Pagination();
}
