/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.payment.filter;

import lombok.Data;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.MPF116;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author ftorres
 */

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MPF116Filter extends MPF116{
    
    public Pagination page = new Pagination();
    
    public String IN_SAGENT = "";
    public String IN_AGROUPD = "";
    public String IN_SCOUNTRY = "";
    public String IN_DESCCOUNTRY = "";
    
    
    
    public String DESCCOUNTRY = "";
    
    
}
