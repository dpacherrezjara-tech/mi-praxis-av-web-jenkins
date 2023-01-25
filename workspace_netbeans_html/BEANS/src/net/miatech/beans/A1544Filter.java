/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1544;
/**
 *
 * @author asifuentes
 */
public class A1544Filter extends A1544{
    public String VP_AIR      ="";
    public String VP_FILTRO     ="";
    public String VP_TICKET     ="";
    public String VP_FECHA1     ="";
    public String VP_FECHA2     ="";
    public String VP_IATA      ="";
    public String VP_TRXN       ="";
    public String VP_ESTA       ="";
    
    //public String IN_TICKET ="";    
    public String A1544IATA="";
    public String A1544SABRE="";
    public String A1544DESDE="";
    public String A1544HACIA="";
    public int A1544DIAST = 0;
    public double A1544TARF1 = 0.0;
    public double A1544TARF2 = 0.0;
    public double A1544TARF3 = 0.0;
    public String A1544TICKT = "";
    public String A1544EXCHR ="";
    public String A1544FBAS = "";
    
    public String fileName ="";
    
    public Pagination page = new Pagination();	
}
