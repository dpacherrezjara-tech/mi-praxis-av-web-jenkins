/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.libfare.A1565;

/**
 *
 * @author rmayta
 */
public class PX030S01A1565Filter extends A1565  {
    public int IN_TFILTER = 0;
    public String IN_SUBSCRIP = "";
    public String IN_PRODUCT = "";
    public String IN_XMTTYPE = "";
    public String IN_DATEFILE = "";
    public String IN_CXRCD = "";
    public String IN_FARECLCD = "";
    public String IN_ORIGCITY = "";
    public String IN_DESTCITY = "";
    public String IN_DI = "";
    public String IN_TAREFFDATE = "";
    public String IN_DATESDIS = "";
    
    public long RN = 0;
    
    public Pagination page = new Pagination();
}
