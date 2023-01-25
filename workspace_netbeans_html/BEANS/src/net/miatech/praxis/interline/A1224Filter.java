/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline;

import net.miatech.beans.Pagination;
import net.miatech.libmiatec.A1224;

/**
 *
 * @author jtorres
 */
public class A1224Filter extends A1224{
    
    public int RN;
    public int IN_TIPOFECHA = 0;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_FUENTE = "";
    public String strFormatDate = "";
    public String strFormatDate1="";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4="";
    public String strDescripcion="";
    public String strDescripcion2="";
    public String FECHA = "";
    
    public Pagination page = new Pagination();
}
