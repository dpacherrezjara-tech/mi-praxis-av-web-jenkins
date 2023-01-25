/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A3490Filter;
import net.miatech.praxis.A3488;
/**
 *
 * @author jjulca
 */
public class A3488Filter extends A3488{
    public long RN = 0;
    public String IN_CCUST = "";
    public String IN_NAMEPER = "";
    public String IN_CODPER = "";
    public String IN_STAT = "";
    
    public String IN_CCUST_OLD = "";
    public String IN_CODPER_OLD = "";
    
    public List<A3490Filter> ACCESOS = new ArrayList<A3490Filter>(0);
    
    public Pagination page = new Pagination();
}
