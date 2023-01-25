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
import net.miatech.praxis.SaleAudit.A4137;
import net.miatech.praxis.SaleAudit.A4138;
import net.miatech.praxis.SaleAudit.SQP00911;

/**
 *
 * @author zperez
 */
public class A4137Filter extends A4137 {

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_OPTION = "";
    public String IN_BASE = "";
    public String IN_NUMBERADM = "";
    public String IN_STATUS = "";
    public String IN_IATA = "";
    public String IN_TYPE = "";
    public String IN_USER = "";
    public String IN_AREA = "";
    public String IN_ORIGEN = "";
    public String IN_PREME = "";
    public String IN_ANIO = "";
    public String IN_CNXPA = "";
    public String IN_DESCR = "";
    public String IN_PAIS = "";
    public String IN_STATUS2 = "";
    public String IN_TRNCU = "";
    public String IN_ARCHV = "";

    public List<SQP00911> lst_dataIni = new ArrayList<SQP00911>(0);
    public List<A2553> lst_razones = new ArrayList<A2553>(0);
    public List<A4138> lst_disputa = new ArrayList<A4138>(0);

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
