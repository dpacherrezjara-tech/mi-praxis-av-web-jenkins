/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.sales.IMF082;

/**
 *
 * @author lremicio
 */
public class IMF082Filter extends IMF082 implements Serializable {
    
    public String VP_CCUST = "";
    public String VP_YEAR_FROM = "";
    public String VP_MONTH_FROM = "";
    public String VP_YEAR_TO = "";
    public String VP_MONTH_TO = "";
    public String VP_COUNTRY = "";
    
}
