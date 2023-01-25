/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2213;
/**
 *
 * @author jjulca
 */
public class A2213Filter extends A2213{
    public long RN = 0;
    public String IN_FPROC = "";
    public String IN_FCONT = "";
    public String IN_MDALOC = "";
    public String IN_AIRLIN = "";
    public String IN_CARRIER = "";
    public String IN_TIPO = "";
    public String IN_SUBFU = "";
    
    public String POLIZA_GL = "";
    public Boolean DESCARGA = false;   
    
    public Pagination page = new Pagination();
}
