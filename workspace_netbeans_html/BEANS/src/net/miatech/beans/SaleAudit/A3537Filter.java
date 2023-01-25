/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.SaleAudit.A3537;

/**
 *
 * @author zperez
 */
public class A3537Filter extends A3537{

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
    public String IN_TRNCU = "";
    public String IN_PREME = "";
    public String VP_AREA = "";
    public String IN_CNXPA = "";
    public String IN_DESCRI = "";
    public String pexcel = "";
    public String IN_STATO = "";
    
    public List<A2553> lst_RAZON = new ArrayList<A2553>(0);
    public List<SQP00911Filter> lst_DOCUMENTS = new ArrayList<SQP00911Filter>(0);
    public List<A3537> lst_DispuRazon = new ArrayList<A3537>(0);
     
    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
