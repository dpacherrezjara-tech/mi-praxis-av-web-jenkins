/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.persistence.entities.ticket.FACSIMIL;
import net.miatech.praxis.persistence.entities.ticket.A720;
import net.miatech.praxis.persistence.entities.ticket.BSPF63;

/**
 *
 * @author lremicio
 */
public class FACSIMILFilter extends FACSIMIL implements Serializable {
    
    public String vp_fuente = "";
    public String vp_ccust = "";
    public String CPUI = "";
    public String VTR = "";
    
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    public String periodo = "";
    public String formatDate = "";
    public String nombre = "";
    public int pos = 0;
    public String COUNTRY = "";
    public String AGTN = "";
    public String strVD = "";
    public String strCash = "";
    public String strCredit = "";
    public String strIssExc = "";
    public String strNombreAgente = "";
    public String strDirecAgente = "";
    public String strConjuncion = "";
    public String strNomAero = "";
    public String strOthers = "";
    public double dblTarifa = 0;
    public String strMonTarifa = "";
    public String strFlag = "";
    public String strRouting = "";
    public String strBUFFER = "";
    public String strFinCjn = "";
    public String strEsCjn = "";
    public String strError = "";
    public String strMsj = "";
    public String strCompanion = "";
    public List<String> lstTaxes = new ArrayList<String>(0);
    public List<String> lstReg46Restrict = new ArrayList<String>(0);
    public List<String> lstReg46OrigIssue = new ArrayList<String>(0);
    public List<String> lstFC = new ArrayList<String>(0);
    public List<String> lstFOP = new ArrayList<String>(0);
    public List<String> lstConj = new ArrayList<String>(0);
    public List<BSPF63> lstReg63 = new ArrayList<BSPF63>(0);
    public List<A720> lstRegA720 = new ArrayList<A720>(0);
    //PAGINACION ===============================================================
    public String strAnteriorTkt = "";
    public String strPrimerTkt = "";
    public String strUltimoTkt = "";
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
}
