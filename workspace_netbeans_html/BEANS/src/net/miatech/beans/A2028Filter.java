/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2028;
/**
 *
 * @author asifuentes
 */
public class A2028Filter extends A2028{
    public long RN = 0;
    
    public String IN_FECHA = "";
    public String IN_FUENTE = "";
    public String IN_TRANSACCION = "";
    public String IN_SUBFUENTE = "";
    public String IN_PAIS = "";
    public String IN_GRUPO = "";
    
    //	Diferencias
    public int A2028DIFQT = 0;
    public Double A2028DIFOP = 0.0;
    public Double A2028DIFTX = 0.0;
    public Double A2028DIFAR = 0.0;
    public Double A2028DIFCM = 0.0;     
    
    public Pagination page = new Pagination();

    public A2028Filter()
    {
    }
}
