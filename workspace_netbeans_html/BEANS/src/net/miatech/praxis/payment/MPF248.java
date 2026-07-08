/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.payment;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;

/**
 *
 * @author ftorres
 */

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class MPF248 {
    
    
    
    
    public String IN_OPTION ="";
    public String option ="";
    public String ID ="";
    public String PROCESS ="";
    public String TRAN ="";
    public String ROL ="";
    public String PTYPE ="";
    public String EMAIL ="";
    public String STATUS ="";
    
    
    
    
    public int TOTAL_EMAILS =0;
    public int TOTAL_TO =0;
    public int TOTAL_CC =0;
    public int TOTAL_BCC =0;
    
    
    
    
    
    //Variables del 
    public String USCR = "";
    public String FECR = "";
    public String HOCR = "";
    public String PGMCR = "";
    public String USUP = "";
    public String FEUP = "";
    public String HOUP = ""; 
   
    
}
