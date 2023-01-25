/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.yopt.A1692;

/**
 *
 * @author lremicio
 */
public class A1692Filter extends A1692 implements Serializable {
    
    public String VP_DFLIGHT = "";
    public String VP_NFLIGHT = "";
    public String VP_ORIDES = "";
    
    
    public Pagination page = new Pagination();
    
}
