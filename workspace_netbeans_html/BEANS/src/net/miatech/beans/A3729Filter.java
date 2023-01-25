/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;
 
import net.miatech.praxis.flown.A3729;
 
/**
 *
 * @author ggutierrez
 */
public class A3729Filter extends A3729 {
 
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
 
    public String strTicket = "";
    public String desSTVAL = "";
    public String strFormatDate = "";
    public String strDescripcion = "";
    public String desSTVCR = "";
    public String desPAX = "";
    public String descFSABRE = "";
    public String descSTASABR = "";
    public String descFSALES = "";
 
    public String IN_FSABRE = "";
    public String IN_TABLE = "";
    public String nameTxt = "";
    public String FA720 = "";
    public String TICKET_2 = "";
    public String CUPON_2 = "";
    //public String IN_TABLE = "";

    public int qty_update = 0;
    public String SPNR = "";
    public String option = "";
    public Pagination page = new Pagination();
    public long RN = 0;
}