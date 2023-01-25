/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.A1831;
/**
 *
 * @author asifuentes
 */
public class A1831Filter extends A1831{

    public long RN = 0;
    public int IN_TIPO = 0;
    public String IN_ESQUEMA = "";
    public String IN_AGENCIA = "";
    public String IN_PERIODO_INI = "";
    public String IN_PERIODO_FIN = "";
    public String IN_FECHA_ENV = "";
    public String IN_FECHA_ACU = "";
    public String IN_FILTRO = "";
    
    public String A1831ENVST = "";
    public String A1831ACUST = "";
    public String A1831RECST = "";
    public String RSOC = "";
    //Envio de correo
    public String EMAIL_FROM = "";
    public String EMAIL_TO = "";
    public String EMAIL_CC = "";
    public String EMAIL_SUBJECT = "";
    public String EMAIL_MESSAGE = "";
    
    public List<A1847Filter> DETALLE = new ArrayList<A1847Filter>(0);
    
    public Pagination page = new Pagination();	
}
