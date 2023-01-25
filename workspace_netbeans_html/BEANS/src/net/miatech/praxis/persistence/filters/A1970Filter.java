/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.yopt.A1970;

/**
 *
 * @author lremicio
 */
public class A1970Filter extends A1970 implements Serializable {
    
    public String VP_TIPO            = "";
    public String VP_FVTADESDE       = "";
    public String VP_FVTAHASTA       = "";
    public String VP_FVLODESDE       = "";
    public String VP_FVLOHASTA       = "";
    public String STATUS             = "";
    
    public String VP_DFLIGHT         = "";
    public String VP_NFLIGHT         = "";
    public String VP_CDEPART         = "";
    public String VP_CARRIVA         = "";
    public String VP_FBASE           = "";
    public String VP_AGTIA           = "";
    
    public Pagination page = new Pagination();
    
}
