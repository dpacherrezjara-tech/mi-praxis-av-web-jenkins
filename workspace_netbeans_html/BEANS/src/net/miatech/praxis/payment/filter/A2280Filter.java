/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2280;

/**
 *
 * @author andrea
 */
public class A2280Filter extends A2280 {

    public String IN_CODE = "";
    public String IN_NAME = "";
    public String NEW_CURRENC = "";
    public String NEW_CODEBANK = "";
    public String NEW_COUNTRY = "";
    public String NEW_FNOBANK = "";
    public String strAgrupacion = "";
    public String strDescBank = "";
    public String strDescPais = "";
    public String IN_CODE_IN_NAME="";
    public long RN = 0;
    public List<A2348> lstDetalle = new ArrayList<A2348>(0);
    public Pagination page = new Pagination();
    
}
