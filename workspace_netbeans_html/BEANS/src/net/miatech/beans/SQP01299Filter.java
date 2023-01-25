/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author vhidalgo
 */
public class SQP01299Filter {
    //param input
    public String VP_OPCION="";  //-- Filtros (1=PROC. DATE, 2=ENDING DATE, 3=ACOUNTING DATE, 4=NUMBER GROUP, 5=OPEN DATE)
    public String VP_FECHA01="";
    public String VP_FECHA02="";
    public String VP_A1530FUENT="";
    public String VP_A1530SFUEN="";
    public String VP_A1530AGENT="";
    public String VP_A1530MDA="";
    public String VP_A1530STPRO="";
    public String VP_A1530PSVTA="";
    public String VP_A1530CIUVT="";
    public String VP_A1530CSABR="";
    public String VP_A1530GRUPO="";        
    //-- result OUT
    public String FUENT ="";
    public String PSVTA =""; 
    public String CANAL = "";      		
    public String GRUPO = ""; 
    public String LOCAL_CUR = ""; 
    public String FOPEN = ""; 
    public String NATUR = ""; 
    public String TIPO = ""; 
    public String DESCR = ""; 
    //Qty
    public int QTY_SALE = 0; 
    public int QTY_RFND = 0;     
    //Loc
    public double SALE_LOC = 0.0; 
    public double RFND_LOC = 0.0; 
    public double NET_LOC = 0.0; 
    //-- rev
    public double SALE_REV = 0.0; 
    public double RFND_REV = 0.0; 
    public double NET_REV = 0.0; 
    
    // Other
    public String fileName = "";
    
}
