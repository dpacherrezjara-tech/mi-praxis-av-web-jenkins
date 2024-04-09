/*
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/
package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.MPFRBTD;
import net.miatech.beans.Pagination;

/**
*
* @author andrea
*/
public class MPFRBTDFilter extends MPFRBTD {

public String IN_CCUST = "";
public String IN_CODES = "";
public String IN_ARCHIVO = "";
public String IN_DEST = "";
public String IN_STVAL = "";
public String DESC_STVAL = "";
public String NEW_ARCHIVO = "";

public long RN = 0;

public Pagination page = new Pagination(); 
}
