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
    
    public class MPFER90 {
   
    
    public String PROCID ="";
    public String PROCNAME ="";
    public String PROCDESC ="";
    public String PROCSTATUS ="";
    public String PROCPAIS ="";
    public String PROCMESSAG ="";
    public String PROCFILE ="";
    public String PROCDATE ="";
    public String PROCINI ="";
    public String PROCFIN ="";
    public String CPROGRAM ="";

    

    
    
    
    
    
    //Variables del 
    public String USCR = "";
    public String FECR = "";
    public String HOCR = "";
    public String PGMCR = "";
    public String USUP = "";
    public String FEUP = "";
    public String HOUP = "";
    public String PGMUP = "";    
  
    
    

    
    
    
    
    
    
}
