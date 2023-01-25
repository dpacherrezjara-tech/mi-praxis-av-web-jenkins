/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.INF001;

/**
 *
 * @author jmeiggs
 */
public class PX075S01INF001Filter extends INF001{
    public int IN_OPCION = 0;		
    public String IN_USR = "";
    public String IN_CITY = "";
    public String IN_STAT = "";
    public String IN_APLICA = "";
    public String IN_USR_OLD = "";
    
    public List<A3489Filter> PERFILES = new ArrayList<A3489Filter>(0);
    
    //pagin
    public Pagination page = new Pagination();
}
