/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans.SaleAudit;
import net.miatech.praxis.SaleAudit.SQP02844;
import net.miatech.beans.Pagination;

/**
 *
 * @author jbazan
 */
public class SQP02844Filter extends SQP02844{ 
    public String VP_CIA  = "";
    public String VP_FORMA = "";
    public String VP_SERIE = "";
    
    public String VP_AGENTE = "";
    public String VP_INDAC = "";
    public String VP_SCHEMA = "";
    
    public String VP_STATUS = "";
    
    public String VP_FPROC_D = "";
    public String VP_FPROC_H = "";
    public String VP_TYPE_PERIO = "";
    public String VP_FUENT = "";
    public String VP_PAIVTA = "";
    public String VP_EMAIL = "";
    
    public String VP_A2959IATAH = "";
    public String VP_A2959AGENT = "";
    public String VP_A2959FPERI = "";
    public String VP_ENVERIOMENT = "";
    
    public int RN=0;
    public Pagination page = new Pagination();
}