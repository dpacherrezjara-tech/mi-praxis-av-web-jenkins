/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import net.miatech.praxis.flown.IMF141;

/**
 *
 * @author ctarazona
 */
public class IMF141Filter extends IMF141 {
    public long RN;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_TYPEFLG = "";
    public long TOTAL = 0;
    public long totZonas = 0;
        
    public Pagination page = new Pagination();
}
