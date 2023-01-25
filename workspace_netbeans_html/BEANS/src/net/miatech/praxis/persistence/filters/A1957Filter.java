/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.yopt.A1957;

/**
 *
 * @author zperez
 */
public class A1957Filter extends A1957 implements Serializable {
    
    public String VP_FVLODESDE = "";
    public String VP_FVLOHASTA = "";
    public Pagination page = new Pagination();
    
}
