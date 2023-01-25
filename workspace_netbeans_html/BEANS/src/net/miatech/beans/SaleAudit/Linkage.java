/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.List;

/**
 *
 * @author jarodriguez
 */
public class Linkage {
    public String IN_RECEIVING_PROGRAM = "";
    public String IN_OPTION_LINE = "";
    public String IN_OPTION_KEYS = "";
    public String IN_RECEIVING_STSACT = "";
    public String IN_OPTION_LINE_N = "";
    
    public String IO_OPTION_KEYUP = "";
    public String IO_OPTION_KEYOUP = "";
    public String IO_OPTION_KEYDN = "";
    public String IO_OPTION_KEYODN = "";
    public boolean IO_RECEIVING_STSEOF = false;
    
    public String OU_RECEIVING_STSERR = "";
    public String OU_RECEIVING_CODERR = "";
    public String OU_RECEIVING_DESERR = "";
    public List<String> OU_ITEM_KEY;
}
