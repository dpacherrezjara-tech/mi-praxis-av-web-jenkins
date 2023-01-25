/*
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/
package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.A2354;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4202;

/**
*
* @author andrea
*/
public class A2354Filter extends A2354 {

public String IN_MERCHN = "";
public String IN_DESCR = "";
public String IN_RSOCIAL = "";
public String IN_UNIOPE = "";
public String IN_CANAL = "";
public String strFecha = "";
public String strDescrip = "";
public String A003CANAL = "";
public String A003IATA = "";
public long RN = 0;
public String strDescripCtry = "";
public String strDescripUNIOPE = "";
public String STATUS = "";
public String desSTATUS = "";
public String IN_STATUS = "";
public String IN_COUNTRY = "";
public String CODE = "";
public String NAME = "";

public List<A4202> lstDetalle = new ArrayList<A4202>(0);

//A003
public String A003KEY1 = "";
public Pagination page = new Pagination(); 
}
