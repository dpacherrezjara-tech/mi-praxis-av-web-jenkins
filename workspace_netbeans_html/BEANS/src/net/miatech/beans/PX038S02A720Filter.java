/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A720;

/**
 *
 * @author jmeiggs
 */
public class PX038S02A720Filter extends A720 {

    public int IN_OPCION = 0;
    public String IN_AIRLIN = "";
    public String IN_GRUPO = "";
    public String IN_TKT = "";
    public String IN_IATA = "";
    public String IN_TRANSACTION = "";

    public String DOCUMENTO = "";
    public String CNJ = "";

    public int QTY_ERROR = 0;
    public String IN_ERROR = "";
    public String A1531CFOP = "";
    public String A1531TFOP = "";
    public String A1531TTARJ = "";
    public String A1531NREF = "";
    public double A1531VFOPR = 0.00;
    public String A1531MFOPR = "";
    public String A1532CTAX = "";
    public String A1532APFC = "";
    public double A1532VTAXR = 0.00;
    public String A1532MTAXR = "";

    public Pagination page = new Pagination();
}
