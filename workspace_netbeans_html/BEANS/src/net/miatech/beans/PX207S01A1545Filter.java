/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1545;

/**
 *
 * @author jmeiggs
 */
public class PX207S01A1545Filter extends A1545{
    public int IN_TFILTER = 0;
    public String IN_CCUST = "";
    public String IN_FROM = "";
    public String IN_TO = "";
    public String IN_FUENTE = "";
    public String IN_IATA = "";
    public String IN_PAIS = "";
    public String IN_GRUPO = "";
    public String IN_GAINLOSS = "";
    
    //Extras
    public double GAIN_LOSS = 0.00;
    
    public Pagination page = new Pagination();
}
