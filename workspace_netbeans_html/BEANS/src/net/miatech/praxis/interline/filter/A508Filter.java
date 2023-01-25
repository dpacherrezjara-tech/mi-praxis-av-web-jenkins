/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.A508;

/**
 *
 * @author jtorres
 */
public class A508Filter  extends A508{
    
    public int RN=0;
    public String IN_FECHA_FROM="";
    public String IN_FECHA_TO="";
    public String IN_PERIOD="";
    public String strFormatDate="";
    public String strFormatDate1="";
    public String strFormatDate2="";
    public String strFormatDate3="";
    public String strFormatDate4="";
    public String strFormatDate5="";
    public String strDescripcion="";
    public String strDescripcion1="";
    public String strDescripcion2="";
    public String strDescripcion3="";
    public String strDescripcion4="";
    public String strDescripcion5="";
    
    public double totA508PASJP=0;
    public double totA508UATPP=0;
    public double totA508CARGOP=0;
    public double totA508MISCP=0;
    public double totA508NETOP=0;
    public double totA508PASJC=0;
    public double totA508UATPC=0;
    public double totA508CARGOC=0;
    public double totA508MISCC=0;
    public double totA508NETOC=0;
    public double totA508BALANC=0;
    
    //SFI040
    public double ISIDEC=0;
    public double totISIDEC;
    
    public Pagination page = new Pagination();
    
    
}
