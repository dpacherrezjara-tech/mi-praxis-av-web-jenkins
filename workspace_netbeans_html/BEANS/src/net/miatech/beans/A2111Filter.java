/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.A2111;
import net.miatech.praxis.A2112;
/**
 *
 * @author jjulca
 */
public class A2111Filter extends A2111 {
    public long RN;
    public String IN_A2111CCUST = "";
    public String IN_A2111PSVTA = "";
    public String IN_A2111GRUPO = "";
    public String IN_A2111FUENT = "";
    public String IN_A2111SFUEN = "";
    public String IN_A2111FCONT = "";
    public String IN_A2111IDFIL = "";
    public String IN_A2111IDCON = "";
    public String IN_A2111FPROC = "";
    public String IN_A2111STPRO = "";
    public String IN_A2111MDA = "";
    public String IN_A2111MODO = "";
    public String IN_A2111SPROC = "";
    
    public String IN_A2111GRUPO_OLD = "";
    public List<A2112> ESTIMADOS = new ArrayList<A2112>(0);
    public Boolean REVERSION = false;
    public String A2111ESTADO = "";
    public String A2111PERIO = "";
    public String A2111CLEAR = "";
    public String A2111STATU = "";
    
    public Pagination page = new Pagination();
}
