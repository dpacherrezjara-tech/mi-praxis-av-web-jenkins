/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;
import net.miatech.praxis.A1719;
/**
 *
 * @author asifuentes
 */
public class A1719Filter extends A1719{
    public long RN;
    public String IN_A1719PRAXI = "";
    public String IN_A1719CCUST = "";
    public String IN_A1719FECHA = "";
    public String IN_A1719FACTU = "";
    public Double A1719DEBITO = 0.0;
    public Double A1719CREDITO = 0.0;    
    public String IN_A1719TIPO = "";
    public String A1719IATA = "";
    public String A1719CODPV = "";
    public String A1719PROVE = "";
    
    public Pagination page = new Pagination();    
}
