/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.yopt.A2035;

/**
 *
 * @author lremicio
 */
public class A2035Filter extends A2035 implements Serializable {
    
    public String VP_CCUST = "";
    public String VP_DFLIGHT = "";
    public String VP_TYPE = "";
    public String VP_DIRECTION = "";
    public String VP_PROPERTY = "";
    
    public int IO_KMS = 0;
    public int IO_QTYPAXJ = 0;
    public int IO_QTYPAXY = 0;
    public int IO_QTYPAX = 0;
    
    public Pagination page = new Pagination();
    
}
