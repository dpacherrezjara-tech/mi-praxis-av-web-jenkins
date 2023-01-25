/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1843;
import net.miatech.praxis.A1822;
import net.miatech.praxis.A1850;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author asifuentes
 */
public class A1843Filter extends A1843{

    public long RN = 0;
    public String IN_ESQUEMA = "";
    public String IN_DESCRIPCION = "";
    public String IN_FILTRO = "";
    public String IN_TIPO = "";
    public String IN_A1843ESQ_OLD = "";
    public Pagination page = new Pagination();	
    
    //INCENTIVOS
    public List<A1822> INCENTIVOS = new ArrayList<A1822>(0);
    public List<A1850> CONDICIONES = new ArrayList<A1850>(0);
    
    //CONDICIONES (falta)
    //public List<A1822> CONDICIONES = new ArrayList<A1822>(0);
}
