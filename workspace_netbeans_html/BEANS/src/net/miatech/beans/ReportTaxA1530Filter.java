/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1530;

/**
 *
 * @author zperez
 */
public class ReportTaxA1530Filter extends A1530 {

    public String CONTABLE = "";
    public String GRUPO = "";
    public String DateFrom = "";
    public String DateTo = "";
    public String Tax = "";
    public String COUNTRY = "";
    public String CHANNEL = "";
    public String IATA = "";
    public String Currency = "";
    public String ATO = "";
    public String BANK = "";
    public String SALES = "";
    public String MODO = "";
    public String Opcion = "";

    public String FECPROC = "";
    public String FECVTA = "";
    public String NOMBRE = "";
    public String NROBOLETO = "";
    public String ITINERARIO = "";
    public String TRANSACCION = "";
    public String CODMONEDA = "";
    public String CorreoPri = "";
    public String CorreoCopi = "";
    public double IMPMDAORI = 0.00;
    public String CODMDAREV = "";
    public String ACOUNTID = "";
    public double IMPMDAREV = 0.00;
    public String RES = "";
    public String FECCONT;
    public double TOTAL_LOC = 0.00;
    public double TOTAL_REV = 0.00;
    public String COUNTRYTAX = "";
    public String FLAG = "";
    public String MDA_LOC = "";
    public double AMOUNT_LOC = 0.00;
    public String CUENT = "";
    public int RN = 0;
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

}
