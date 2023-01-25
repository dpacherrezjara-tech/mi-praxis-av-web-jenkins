/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A3389;
import net.miatech.praxis.SaleAudit.A3390;
import net.miatech.praxis.SaleAudit.A3391;
import net.miatech.praxis.SaleAudit.A3392;
import net.miatech.praxis.SaleAudit.A3401;
import net.miatech.praxis.SaleAudit.A3402;
import net.miatech.praxis.SaleAudit.A3403;
import net.miatech.praxis.SaleAudit.A3407;
import net.miatech.praxis.SaleAudit.A3408;

/**
 *
 * @author zperez
 */
public class A3389Filter extends A3389 {

    public String IN_OPTION = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_STATUS = "";
    public String IN_COUNTRY = "";
    public String IN_USER = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_SEQ = "";
    public String IN_DOCUMET = "";
    public String IN_IATA = "";
    public String IN_PREME = "";

    public String IN_A3389FAPPI = "";
    public String IN_A3389FAUTHORISE = "";
    public String IN_A3389REJECT = "";
    public String IN_A3389PENDING = "";
    public String IN_A3389MDA = "";
    public String IN_A3389IATA = "";
    public String IN_A3389REGAS = "";
    public String IN_A3389PAIS = "";
    public String pexcel = "";

    public List<A3402> lst_TAXES = new ArrayList<A3402>(0);
    public List<A3391> lst_DOCUMENTS = new ArrayList<A3391>(0);
    public List<A3392> lst_CardType = new ArrayList<A3392>(0);
    //arelinea LIST RFND
    public List<A3401> lst_RFNDAGNT = new ArrayList<A3401>(0);
    public List<A3402> lst_TAXESAGNT = new ArrayList<A3402>(0);
    public List<A3407> lst_DOCUMENTSAGNT = new ArrayList<A3407>(0);
    public List<A3408> lst_CardTypeAGNT = new ArrayList<A3408>(0);
    public List<A3403> lst_RAZON = new ArrayList<A3403>(0);

    //lista para reportes
    
     public List<A3389> lst_stadistica = new ArrayList<A3389>(0);
     public List<A3389> lst_stadUserTypeRFND = new ArrayList<A3389>(0);
     public List<A3389> lst_stadTypeRFND = new ArrayList<A3389>(0);
     public List<A3389> lst_stadPais = new ArrayList<A3389>(0);
     public List<A3389> lst_stadFauto = new ArrayList<A3389>(0);
     public List<A3389> lst_stadRAZONES = new ArrayList<A3389>(0);       
     public List<A3389> lst_stadTYPEPAGO = new ArrayList<A3389>(0);      
     public List<A3389> lst_stadDIAS = new ArrayList<A3389>(0); 
     public List<A3389> lst_stadRAZONES_REJECT = new ArrayList<A3389>(0); 
    
    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
