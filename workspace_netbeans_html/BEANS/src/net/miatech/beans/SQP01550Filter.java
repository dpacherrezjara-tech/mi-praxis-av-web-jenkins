/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author vhidalgo
 */
public class SQP01550Filter {
    public String VP_CCUST = "";
    public String VP_DFLIGHT = "";
    public String VP_CDEPART = "";
    public String VP_CARRIVA = "";
    public double  VP_SEATJ=0.0;
    public double  VP_SEATY=0.0;
    public double  VP_EXPG=0.0;
    //out
    public String DFLIGHT = "";
    public String NFLIGHT = "";
    public String CDEPART = "";
    public String CARRIVA = "";
    //public String MDACP = "";
    public String NPLANE = "";    
    public Integer TOTAL = 0;
    public String LEG = "";
    public Integer TOTALSEAT = 0;
    public String COMMENT = "";
    
    public String DESC_ORI = "";
    public String DESC_DST = "";
    public String DESC_ORI_DST = "";
    public String ORIG_DEST = "";
    
    public int KM = 0;    
    public double VCPN_PG = 0.0;       
    public double VCPN_NR = 0.0;       
    public int  QTY_PAX = 0;
    public int  QTY_PAXNR = 0;
    public int  TOTALY  = 0;
    public int  TOTALJ  = 0;
        
    public int typeColumn = 0;
    public int NO = 0;
    
    public double COST_OPJ  = 0.0;    
    public double COST_OPY  = 0.0;     
    public double COST_OP   = 0.0;      
    public double DIFF_OPE  = 0.0;     
    public double COST_GRL  = 0.0;
    public double PL = 0.0;       
    // Campos para paginar SQL
    public Pagination page = new Pagination();    
}
