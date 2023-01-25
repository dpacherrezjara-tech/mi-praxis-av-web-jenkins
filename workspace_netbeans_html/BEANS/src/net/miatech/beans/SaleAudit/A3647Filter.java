/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A3647;
import net.miatech.praxis.SaleAudit.A3648;
import net.miatech.praxis.SaleAudit.A3649;
import net.miatech.praxis.SaleAudit.A3652;
import net.miatech.praxis.SaleAudit.A3653;
import net.miatech.praxis.SaleAudit.A3654;
import net.miatech.praxis.SaleAudit.A3655;
import net.miatech.praxis.SaleAudit.A3660;

/**
 *
 * @author zperez
 */
public class A3647Filter extends A3647 {

    public String IN_OPTION = "";
    public String IN_DATEFROM = "";
    public String IN_ANIO = "";
    public String IN_DATETO = "";
    public String IN_STATUS = "";
    public String IN_COUNTRY = "";
    public String IN_USER = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_SEQ = "";
    public String IN_FOLIO = "";
    public String IN_IATA = "";
    public String IN_FLAG = "";
    public String IN_PREME = "";
    public String IN_TICKET = "";
    public String IN_IDIOMA = "";
    public String IN_CORRL = "";

    public String IN_A3647FAPPI = "";
    public String IN_A3647FAUTHORISE = "";
    public String IN_A3647REJECT = "";
    public String IN_A3647PENDING = "";
    public String IN_A3647MDA = "";
    public String IN_A3647IATA = "";
    public String IN_A3647REGAS = "";
    public String IN_A3647PAIS = "";
    public String pexcel = "";

    public List<A3648> lst_DOCUMENTS = new ArrayList<A3648>(0);
    public List<A3649> lst_RAZON = new ArrayList<A3649>(0);
    public List<A3660> lst_USOS = new ArrayList<A3660>(0);

    public List<A3652> lst_TAXESAGEN = new ArrayList<A3652>(0);
    public List<A3652> lst_TAXESAM = new ArrayList<A3652>(0);
    public List<A3653> lst_Card = new ArrayList<A3653>(0);
    public List<A3654> LIS_COUPNS = new ArrayList<A3654>(0);
    public List<A3655> LIS_HISTORY = new ArrayList<A3655>(0);

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
