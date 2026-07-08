/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.payment.filter;

import lombok.Data;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.MPF248;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;



  

/**
 *
 * @author ftorres
 */

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MPF248Filter extends MPF248{
    


    
    public Pagination page = new Pagination();
    
    public String IN_PROCESS = "";
    public String IN_ID = "";
    

    
    


    
}
