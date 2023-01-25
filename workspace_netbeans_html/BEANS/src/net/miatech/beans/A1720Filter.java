/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;
import net.miatech.praxis.A1720;
/**
 *
 * @author jjulca
 */
public class A1720Filter extends A1720{
    public long RN;
    public String IN_SOURCE="";
    public String IN_PROCESSDATE="";
    public String IN_A1720CCUST="";    
    
    public double A1720VSALG =0.00;
    public double A1720VRFLG =0.00; 
    public double A1720VNTLG =0.00;  
    
    public double A1720VSALD =0.00;
    public double A1720VRFLD =0.00; 
    public double A1720VNTLD =0.00;  
    
    public String IN_TIPO="";
    public String IN_DATEINI="";
    public String IN_DATEFIN="";
    public String IN_IATA="";
    public String IN_COUNTRY="";
    public String IN_CHANEL="";
    public String IN_CURRENCY="";
            

    public Pagination page = new Pagination();
}
