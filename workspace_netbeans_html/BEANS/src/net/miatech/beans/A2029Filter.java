/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2029;
/**
 *
 * @author asifuentes
 */
public class A2029Filter extends A2029{
    public long RN = 0;
    
    public String IN_FECHA ="";
    public String IN_FUENTE ="";
    public String IN_TRANSACCION ="";

    //	Diferencias
    public int A2029DIFQT = 0;
    public Double A2029DIFOP = 0.0;
    public Double A2029DIFTX = 0.0;
    public Double A2029DIFAR = 0.0;
    public Double A2029DIFCM = 0.0;  
    
    public Pagination page = new Pagination();
    
    public A2029Filter()
    {
    }
}
