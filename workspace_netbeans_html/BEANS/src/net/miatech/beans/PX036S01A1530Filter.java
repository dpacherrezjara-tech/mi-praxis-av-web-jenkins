/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1530;

/**
 *
 * @author vhidalgo
 */
public class PX036S01A1530Filter extends A1530 {
    // parameters of Procedure
    public String VP_OPCION = "";
    public String VP_FECHA01 = "";
    public String VP_FECHA02 = "";
    public String VP_A1530FUENT = "";    // SOURCE
    public String VP_A1530SFUEN = "";    // SUB FUENTE (SOLO SI ES ASR )			
    public String VP_A1530AGENT = "";    // IATA (SOLO SI ES: ASR)	
    public String VP_A1530MDA = "";	// MONEDA
    public String VP_A1530STPRO = "";	// DATA VALIDATE (YES,NOT) 	
    public String VP_A1530PSVTA = "";	//SI ES: BSP
    public String VP_A1530CIUVT = "";	// SI ES: ARC PIDE BANCO
    public String A1530STPRO_00 = "";	// 0=open, 1=close 
    // ADD
    public String VP_A1530CSABR = "";
    public String VP_A1530GRUPO = "";
    //Extras
    public double A1720DIFF = 0.00;
    // for Pagin grid
    public Pagination page = new Pagination();
}
