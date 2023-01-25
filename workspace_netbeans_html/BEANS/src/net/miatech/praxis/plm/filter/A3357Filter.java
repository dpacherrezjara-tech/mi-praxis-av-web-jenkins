/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.plm.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.plm.A3357;

/**
 *
 * @author magalyb
 */
public class A3357Filter extends A3357{
    
    public String FLIGHT_DATE = "";
    public String FD = "";
    public String FCRMV = "";
    public String FCRVO = "";
    public String TICKET = "";
    public String IFPRO = "";
    public String CFPRO = "";
    
    public double KMS_INDIVIDUAL = 0.00;
    public double KMS_CORPORATE = 0.00;
    public double KMS_USD = 0.00;
    public double POINTS_INDIVIDUAL = 0.00;
    public double POINTS_CORPORATE = 0.00;
    public double POINTS_USD = 0.00;
    public long OK_INDV = 0;
    public long NOCUMPLE_INDV = 0;
    public long EXCLUYE_INDV = 0;
    public long NOVALUED_INDV = 0;
    public long VALUED_INDV = 0;
    public long DOSVALUED_INDV = 0;
    public long XVALUED_INDV = 0;
    public long OK_CORP = 0;
    public long NOCUMPLE_CORP = 0;
    public long EXCLUYE_CORP = 0;
    public long NOVALUED_CORP = 0;
    public long VALUED_CORP = 0;
    public long DOSVALUED_CORP = 0;
    public long XVALUED_CORP = 0;
    
    public double totalKmsIndv = 0;
    public double totalKmsCorp = 0;
    public double totalKmsUds = 0;
    public double totalPointsIndv = 0;
    public double totalPointsCorp = 0;
    public double totalPointsUsd = 0;
    public long totalOkIndv = 0;
    public long totalNoCmpIndv = 0;
    public long totalExcluIndv = 0;
    public long totalNoValuedIndv = 0;
    public long totalValuedIndv = 0;
    public long totalTwoValuedIndv = 0;
    public long totalXValuedIndv = 0;
    public long totalOkCorp = 0;
    public long totalNoCmpCorp = 0;
    public long totalExcluCorp = 0;
    public long totalNoValuedCorp = 0;
    public long totalValuedCorp = 0;
    public long totalTwoValuedCorp = 0;
    public long totalXValuedCorp = 0;   
    
    public String IN_DFLIGFROM = "";
    public String IN_DFLIGTO = "";
    public String IN_TYPEASOC = "";
    public long IN_A3357CFFET = 0;
    public long IN_A3357CFFTR = 0;
    public String IN_A3357CLAFQ = "";
    public String IN_A3357CIA = "";
    public String IN_A3357FORMA = "";
    public String IN_A3357SERIE = "";
    public String IN_A3357SEQ = "";
    public String IN_A3357CUPON = "";
    public String IN_PROMOCION = "";
    public String IN_A3357RSVDO = "";
    public String IN_IFPROFROM = "";
    public String IN_IFPROTO = "";
    public String IN_CFPROFROM = "";
    public String IN_CFPROTO = "";
    public String IN_A3357CARR = "";
    public String IN_A3357CARRM = "";
    public String IN_A3357CFFCI = "";
    public String IN_A3357FUENT = "";
    public String IN_A3357SIVAL = "";
    public String IN_A3357SIVA1 = "";
    public String IN_FCRVOFROM = "";
    public String IN_FCRVOTO = "";
    public String IN_FCRMVFROM = "";
    public String IN_FCRMVTO = "";
    public String IN_A3357NOCMP = "";
    public String IN_A3357EXCLU = "";
    public String IN_A3357FLOBS = "";
    public String IN_A3357NOCM1 = "";
    public String IN_A3357EXCL1 = "";

    public String underline = "";
    
    //pagination
    public long RN = 0;
    public Pagination page = new Pagination();
}
