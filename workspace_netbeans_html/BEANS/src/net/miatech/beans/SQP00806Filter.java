/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author lremicio
 */
public class SQP00806Filter {
    
    public String OPCION = "";
    
    public String A2448CCUST = "";
    public String A2448IATA = "";
    public String A2448CODEA = "";
    public String A2448DESCR = "";
    public String A2448FORMA = "";
    public String A2448TRNCU = "";//20
    // Valores Excluyentes
    public String A2448CLASX = "";
    public String A2448CODEX = "";
    public String A2448SCODX = "";
    public String A2448IATAX = "";//8
    // Valores Aplicables
    public String A2448MCARR = "";
    public String A2448TPASS = "";
    public String A2448ACODE = "";
    public String A2448TOUR = "";
    public String A2448FBASI = "";
    public String A2448TDESI = "";
    public String A2448CLASS = "";
    public String A2448CODE = "";
    public String A2448SCODE = "";
    public String A2448MOPAY = "";
    public String A2448ANCIL = "";
    // % Comision APLICABLE
    public double A2448COMM = 0d;
    // Fechas de Vigencia
    public String A2448FINIV = "";
    public String A2448FFINV = "";
    
    public String OU_SQLCODE = "";
    public String OU_MESSAGE = "";
    
    public DBException dbException = new DBException();
    
}
