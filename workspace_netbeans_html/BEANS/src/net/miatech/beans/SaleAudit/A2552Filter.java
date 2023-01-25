/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2552;

/**
 *
 * @author rmayta
 */
public class A2552Filter extends A2552 {

    public String IN_CCUST = "";
    public String IN_FCVTA = "";
    public String IN_FHASTA = "";
    public String IN_AREA = "";
    public String IN_TYPE = "";
    public String IN_IATA = "";
    public String IN_USER = "";
    public String IN_FTE = "";
    public String IN_VAL_NLOTE = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    public String GROUPED = "";
    public boolean CHECKED = false;
    public String A2552TKT = "";
    public String MES = "";
    public String A2552SEQ = "";
    public String ESTADO = "";
    public String IN_ESTADO = "";
    public String A2552TKTORI = "";
    public double MONTO = 0.0;

    public long RN;
}
