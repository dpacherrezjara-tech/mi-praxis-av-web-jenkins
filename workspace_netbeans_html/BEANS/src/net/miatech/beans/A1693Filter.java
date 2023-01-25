/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1693;

/**
 *
 * @author jtorres
 */
public class A1693Filter extends A1693 {

    public long RN;
    public int IN_TIPOFECHA = 0;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_CIA = "";
    public String IN_FUENTE = "";
    public String IN_CURRENCY = "";
    public String IN_NFLIGHT = "";
    public String strFormatDate = "";
    public String fecha = "";
    public String FFLOW = "";
    //TOTALES
    public int totQTYFLOW = 0;
    public int totQTYFLOWC = 0;
    public int totQTYPAX = 0;
    public int totQTYPAXC = 0;
    public double totAMOPAX = 0;
    public double totAMOPAXC = 0;
    public Pagination page = new Pagination();
}
