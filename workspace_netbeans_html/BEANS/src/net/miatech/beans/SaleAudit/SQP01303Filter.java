/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.praxis.SaleAudit.SQP01303;
import net.miatech.beans.Pagination;
/**
 *
 * @author jbazan
 */
public class SQP01303Filter extends SQP01303{ 
    public String VP_CIA  = "";
    public String VP_FORMA = "";
    public String VP_SERIE = "";
    
    public String VP_AGENTE = "";
    
    public String VP_FPROC_D = "";
    public String VP_FPROC_H = "";
    public String VP_FUENT = "";
    public String VP_PAIVTA = "";
    
    public int RN=0;
    public Pagination page = new Pagination();
}
