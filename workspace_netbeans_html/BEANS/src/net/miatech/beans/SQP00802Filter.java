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
public class SQP00802Filter {
    // In    
    public String VP_ACTION = "";
    public String VP_A2447CCUST = "";
    public String VP_A2447LOTE = "";
    public String VP_A2447IATA = "";
    public String VP_A2447FPROC = "";
    public String VP_A2447MONED = "";
    public double VP_A2447COMM = 0;
    public double VP_A2447IVA =0;
    public double VP_A2447COMIV =0;
    public double VP_A2447TCASH =0;
    public double VP_A2447CAMCO =0;
    public String VP_A2447NFACT ="";
    public String VP_A2447FFACT ="";
    public String VP_A2447STATU ="0";
    public String VP_A2447SEQ ="00";
    public String VP_A2447INDAP =""; // C/S
    public String VP_A2447COD ="";
    public double VP_A2447COMBA =0;
    public double VP_A2447IVACB =0;
    public String VP_A2447COD2 ="";
    public double VP_A2447COMB2 =0;
    public double VP_A2447IVAC2 =0;
    public String VP_A2447NFAC1 = "";
    public String VP_A2447FFAC1 = "";
    public String VP_A2447NFAC2 = "";
    public String VP_A2447FFAC2 = "";
    
    // out Message SQL
    public DBException dbException = new DBException();
}
