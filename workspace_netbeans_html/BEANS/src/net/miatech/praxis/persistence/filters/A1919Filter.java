/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.yopt.A1919;

/**
 *
 * @author lremicio
 */
public class A1919Filter extends A1919 implements Serializable {
    
    public String VP_DFLIGHT = "";
    public String VP_ZONA = "";
    public String VP_MERCADO = "";
    public String VP_ORIGDEST = "";
    public String VP_CDEPART = "";
    public String VP_CARRIVA = "";
    public String VP_NFLIGHT = "";
    public String VP_CARR = "";
    public String VP_CABINA = "";
    public String VP_CLASE = "";
    public String VP_FBASE = "";
    public String VP_MDACPN = "";
    public String VP_AGTIA = "";
    public String VP_PAIVTA = "";
    public String VP_STOPOVER = "";
    
    public Pagination page = new Pagination();
    
}
