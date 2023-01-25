/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A1530;
/**
 *
 * @author jjulca
 */
public class A1530Filter extends A1530 {
    
    public String IN_A1530CCUST = "";
    public String IN_A1530FPROC = "";
    public String IN_A1530FUENT = "";
    public boolean A1530FLG = false;
    
    public int A1530TOTAL = 0;
    public int A1530CONTABLE = 0;
    public int A1530NOCONTABLE = 0;
    
    public Pagination page = new Pagination();
}
