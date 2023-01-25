/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.A1775;

/**
 *
 * @author vhidalgo
 */
public class SQP0099Filter extends A1775{
    // In
   public String VP_A1775CCUST = "";
   public String VP_A1775GSA   = "";
   public String VP_A1775PAIS  = "";
   public String VP_A1775LOTE  = "";
   public String VP_A1775MDALC = "";   
   // Extras
   public String TKT           = ""; 
   public String A1839RSOC     = ""; 
   public String A1839DPAIS    = "";            
   // Out
   public List<PX119S01A1776Filter> lstRws = new ArrayList<PX119S01A1776Filter>(0);    
}
