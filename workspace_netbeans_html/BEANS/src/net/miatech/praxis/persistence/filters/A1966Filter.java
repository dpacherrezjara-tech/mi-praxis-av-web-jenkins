/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.yopt.A1966;

/**
 *
 * @author zperez
 */
public class A1966Filter extends A1966 implements Serializable{
    
    public int VP_OPCION = 0;
    public String VP_CCUST = "";
    public String VP_FECHA = "";
    
    public int IO_TOTPAX = 0;
    public int IO_UNREPO = 0;
    public double IO_TOTREVJ = 0d;
    public double IO_TOTREVY = 0d;
    public double IO_TOTREV = 0d;
    
    public Pagination page = new Pagination();
    
}
