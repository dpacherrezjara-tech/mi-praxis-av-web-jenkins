/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2056;
/**
 *
 * @author jjulca
 */
public class A2056Filter extends A2056{
    public long RN = 0;
    public String IN_FPROC = "";
    public String IN_FCONT = "";
    public String IN_MDALOC = "";
    public String IN_FUENT = "";
    public String IN_PAIS = "";
    public String IN_SUBFU = "";
    public String IN_TIPO = "";
    public Boolean DESCARGA = false;   
    public String CUENTA = "";
    
    public Pagination page = new Pagination();
}
