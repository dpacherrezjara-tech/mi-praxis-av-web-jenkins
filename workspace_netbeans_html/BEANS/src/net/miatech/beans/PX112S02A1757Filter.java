/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author vhidalgo
 * Data Entry: Invoice Commission FOB 
 */
public class PX112S02A1757Filter {
    // In    
    public String VP_ACTION = "";
    public String VP_A1757CCUST = "";
    public String VP_A1757LOTE = "";
    public String VP_A1757IATA = "";
    public String VP_A1757FPROC = "";
    public String VP_A1757MONED = "";
    public double VP_A1757COMM = 0;
    public double VP_A1757IVA =0;
    public double VP_A1757COMIV =0;
    public double VP_A1757TCASH =0;
    public double VP_A1757CAMCO =0;
    public String VP_A1757NFACT ="";
    public String VP_A1757FFACT ="";
    public String VP_A1757STATU ="0";
    public String VP_A1757SEQ ="00";
    public String VP_A1757INDAP =""; // C/S
    
    public String fileName = "";
    // out Message SQL
    public DBException dbException = new DBException();
}
