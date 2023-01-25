/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.A2016;
import net.miatech.praxis.A2017;
/**
 *
 * @author jjulca
 */
public class A2017Filter extends A2017{
    public long RN;
    public String IN_A2017CCUST = "";
    public String IN_A2017PSVTA = "";
    public String IN_A2017GRUPO = "";
    public String IN_A2017FUENT = "";
    public String IN_A2017SFUEN = "";
    public String IN_A2017FCONT = "";
    public String IN_A2017IDFIL = "";
    public String IN_A2017IDCON = "";
    public String IN_A2017FPROC = "";
    public String IN_A2017STPRO = "";
    public String IN_A2017MDA = "";
    public String IN_A2017MODO = "";
    public String IN_A2017SPROC = "";
    
    public String IN_A2017GRUPO_OLD = "";
    public List<A2016> ESTIMADOS = new ArrayList<A2016>(0);
    public Boolean REVERSION = false;
    public String A2017ESTADO = "";
    public String A2017STATU = "";
    public Boolean POLIZA = false;
    
    public Pagination page = new Pagination();
}
