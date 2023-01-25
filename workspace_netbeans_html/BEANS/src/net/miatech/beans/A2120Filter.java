/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A2120;
/**
 *
 * @author jjulca
 */
public class A2120Filter extends A2120{
    public long RN = 0;
    public String IN_FPROC = "";
    public String IN_FCONT = "";
    public String IN_MDALOC = "";
    public String IN_FUENT = "";
    public String IN_PAIS = "";
    public String IN_SUBFU = "";
    public String IN_TIPO = "";
    
    public Boolean DESCARGA = false;
    
    public String POLIZA_AR = "";
    public String POLIZA_GL_TAX = "";
    
    public Pagination page = new Pagination();
}
