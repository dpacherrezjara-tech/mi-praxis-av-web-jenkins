/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1845;

/**
 *
 * @author jmeiggs
 */
public class PX179S01A1845Filter extends A1845{
    //INPUT
    public String IN_FECHAFROM = "";
    public String IN_FECHATO = "";
    public String IN_PAIS = "";
    public String IN_MONEDA = "";
    //Extras
    public String IATANAME = "";
    public String TICKET = "";
    public double SUMFARE = 0.00;
    public double SUMCOMM = 0.00;
    public double SUMFAREADJ = 0.00;
    public double SUMCOMMADJ = 0.00;
    //IO
    public Pagination page = new Pagination();
}
