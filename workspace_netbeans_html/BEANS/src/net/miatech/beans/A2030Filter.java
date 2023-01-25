/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2030;
/**
 *
 * @author asifuentes
 */
public class A2030Filter extends A2030{
    public long RN = 0;
    public String IN_TIPO_FECHA ="";
    public String IN_FEC_INI ="";
    public String IN_FEC_FIN ="";
    public String IN_FUENTE ="";
    public String IN_TRANSACCION ="";
    
    //	Diferencias
    public int A2030DIFQT = 0;
    public Double A2030DIFOP = 0.0;
    public Double A2030DIFTX = 0.0;
    public Double A2030DIFAR = 0.0;
    public Double A2030DIFCM = 0.0;    
    
    public Pagination page = new Pagination();

    public A2030Filter()
    {
    }
}
