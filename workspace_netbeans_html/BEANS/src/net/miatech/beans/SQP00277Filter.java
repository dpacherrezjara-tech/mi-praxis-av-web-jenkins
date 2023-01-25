/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.libmiatec.A1199;
import net.miatech.praxis.A1460;

/**
 *
 * @author rmayta
 */
public class SQP00277Filter {
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_CUPON = "";
    
    public net.miatech.praxis.A1200 fileA1200 = new net.miatech.praxis.A1200();
    public A1199 fileA1199 = new A1199();
    
    public List<A1460> lstA1460 = new ArrayList<A1460>(0);
}
