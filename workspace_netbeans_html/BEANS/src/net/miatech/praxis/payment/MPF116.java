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
public class MPF116 {
    
    
   
    
    public String CCUST ="";
    public String SAGENT ="";
    public String SUBFTE ="";
    public String SCOUNTRY ="";
    public String NAMEAG ="";
    public String TVENTA ="";
    public String AGROUPD ="";
    public String DFREQPAY ="";
    public String FPAGO ="";
    public String QTYPAGO ="";
    public int QTYDPOS =0;
    
    public String DIAPAGO ="";
    public int QTYDPRE =0;
    
    
    
    
    
    //Variables del 
    public String USCR = "";
    public String FECR = "";
    public String HOCR = "";
    public String PGMCR = "";
    public String USUP = "";
    public String FEUP = "";
    public String HOUP = "";
    public String PGMUP = "";    
    public String SBENCEN = "";    
    public String SOCIETY = "";    
    public String CIACOME = "";    
    
    
}
