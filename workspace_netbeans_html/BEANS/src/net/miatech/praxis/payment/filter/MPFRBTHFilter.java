/*
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/
package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.MPFRBTH;
import net.miatech.beans.Pagination;

/**
*
* @author andrea
*/
public class MPFRBTHFilter extends MPFRBTH {

public String IN_CCUST = "";
public String IN_CODES = "";
public String IN_NAME = "";
public String IN_DECRIPT = "";
public String IN_STVAL = "";
public String DESC_STVAL = "";
public long RN = 0;

public Pagination page = new Pagination(); 
}
