/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.interline.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.SFI032;

/**
 *
 * @author andrea
 */
public class SFI032Filter extends SFI032 {

    public long RN;
    public String strFormatDate = "";
    public String TKT = "";
    public String FROMTO = "";
    public String DES_BAIR = "";
    public String DES_BDAIR = "";
    public double totTNET = 0;
    public double totHFEEAMD = 0;
    public double totTGROSSD = 0;
    public double totTISCD = 0;
    public double totTTAXD = 0;
    public double totTUATPD = 0;
    public double totTOTHCD = 0;
    public Pagination page = new Pagination();
}
