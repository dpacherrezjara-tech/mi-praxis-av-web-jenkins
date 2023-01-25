/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.A2134;
import net.miatech.praxis.A2135;
/**
 *
 * @author jjulca
 */
public class A2134Filter extends A2134 {
    public long RN;
    public String IN_A2134CCUST = "";
    public String IN_A2134PSVTA = "";
    public String IN_A2134GRUPO = "";
    public String IN_A2134FUENT = "";
    public String IN_A2134SFUEN = "";
    public String IN_A2134FCONT = "";
    public String IN_A2134IDFIL = "";
    public String IN_A2134IDCON = "";
    public String IN_A2134FPROC = "";
    public String IN_A2134STPRO = "";
    public String IN_A2134MDA = "";
    public String IN_A2134MODO = "";
    public String IN_A2134SPROC = "";
    
    public String IN_A2134GRUPO_OLD = "";
    public List<A2135> ESTIMADOS = new ArrayList<A2135>(0);
    public Boolean REVERSION = false;
    public String A2134ESTADO = "";
    public String A2134PERIO = "";
    public String A2134CLEAR = "";
    public String A2134STATU = "";
    
    public Pagination page = new Pagination();
}
