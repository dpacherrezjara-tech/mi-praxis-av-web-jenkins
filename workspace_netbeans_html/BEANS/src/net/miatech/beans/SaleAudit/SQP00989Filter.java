/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A1672;

/**
 *
 * @author JRM
 */
public class SQP00989Filter extends A1672 {

    public String strTicket = "";
    public String strRuta = "";
    public String strType = "";
    public String strAccDist = "";
    public String strAccLinea = "";
    public String strBSPLink = "";
    public String strTipodeTasa = "";
    public String strNomPais = "";
    public Integer pos = 0;
    //Datos del Agente
    public String strNombre = "";
    public String codAgente = "";
    public String strUbicacion = "";
    public String strDirecAgte = "";
    public String strCodPostal = "";
    public String strCiudad = "";
    public String strPais = "";
    public String strTelefono = "";
    public String strFax = "";
    public String strEmail = "";
    public String strSQL = "";
    public String strCurr1 = "";
    public String strCurr2 = "";
    public Integer lngCantADM1 = 0;
    public Integer lngCantADM2 = 0;
    public Double dblAmtADM1 = 0.0;
    public Double dblAmtADM2 = 0.0;
    public String strDescTaxes = "";
    
    public String A1672CTYVT = "";
    public String A1672TRNCO = "";
    public String A1672FECSL = "";
    public String A1672IATAV = "";
    public String A1672FUENV = "";
    public String A1672TRF = "";
    public Double A1672FAREN = 0.00;
    public Double A1672FAOLD = 0.00;
    public Double A1672ADCAI = 0.00;

    //A1673 ====================================================================
    public String A1663TYPE = "";
    public String A1580DESC2 = "";
    public String REASONS = "";
    public String OPCION = "";
    // --------------------------------------
    public String BOOKFROM = "";
    public String BOOKTO = "";
    public String LIKEFBASIS = "";
    public String LIKEREASON = "";
    public String ROUTE = "";
    public String Agent = "";

    // A2657--------------------------------- 
    public String A2657CORRL = "";
    public String A2657CFOP = "";
    public String A2657TFOP = "";
    public String A2657TTARJ = "";
    public Double A2657FPORI = 0.0;
    public String A2657MORIG = "";
    public String A2657NREF = "";
    public String A2657TR720 = "";
    public String A2657FO720 = "";
    public String A2657SE720 = "";
    public String pexcel = "";

    public String A1672ARCHV = "";

    public Double MONTO = 0.0;
    //Ckech
    public boolean CHECKED = false;

    public String DATEFROM = "";
    public String DATETO = "";

    public ArrayList<SQP00989Filter> lstReasons;

    public ArrayList<SQP00989Filter> lstFOP;

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
