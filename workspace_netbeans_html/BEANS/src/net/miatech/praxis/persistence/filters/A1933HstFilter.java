/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.yopt.A1933Hst;

/**
 *
 * @author zperez
 */
public class A1933HstFilter extends A1933Hst implements Serializable {

    public String VP_CCUST = "";
    public String VP_DFLIGHT = "";
    public String VP_TYPE = "";
    
    public String VP_NFLIGHT = "";
    public String VP_ORIGDEST = "";
    public String VP_PROPERTY = "";
    public String VP_DIRECTION = "";
    
    public String VP_CCIA = "";
    public String VP_FORMA = "";
    public String VP_SERIE = "";
    public String VP_CUPON = "";
    public String VP_SUBLEG = "";
    public String VP_KEY = "";
    public String VP_OPTION = "";
    public String VP_TYPENRV = "";
    
    public Pagination page = new Pagination();
}
