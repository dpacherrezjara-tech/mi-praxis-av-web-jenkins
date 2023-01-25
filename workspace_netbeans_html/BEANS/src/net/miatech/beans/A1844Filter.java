/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1844;
import net.miatech.praxis.A1843;
import net.miatech.praxis.A1823;
import net.miatech.praxis.A1821;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author asifuentes
 */
public class A1844Filter extends A1844{

    public long RN = 0;
    public String IN_ESQUEMA = "";
    public String IN_AGENCIA = "";
    public String IN_PAIS = "";
    public String IN_RAZSOC = "";
    public String IN_FILTRO = "";
    public String IN_TIPO = "";
    public String IN_A1844ESQ_OLD = "";
    public String IN_A1844AGENC_OLD = "";
    public Pagination page = new Pagination();	
    
    //IATAS
    public List<A1823> IATAS = new ArrayList<A1823>(0);
    
    //METAS
    public List<A1821> METAS = new ArrayList<A1821>(0);
    
    //TEMPLATE HEADER
    public A1843 ESQ_HEADER = new A1843();    
}
