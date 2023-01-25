/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.DBException;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A1580;
import net.miatech.praxis.SaleAudit.A1673;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.SaleAudit.SQP00911;

/**
 *
 * @author zperez
 */
public class SQP00911Filter extends SQP00911 {

    public String OPCIONTYPE = "";
    public String COMBOBY = "";
    public String CIA = "";
    public String FORMA = "";
    public String SERIE = "";
    public String NUMBERADM = "";
    public String DATEFROM = "";
    public String DATETO = "";
    public String COUNTRY = "";
    public String CURRENCY = "";
    public String CHANNEL = "";
    public String AUTMAN = "";
    public String STATUS = "";
    public String COMBOCHANNEL = "";
    public String SEQ = "";
    public String CUPON = "";
    public String TRNCU = "";
    public String VP_RAZON = "";
    public String VP_TYPERAZON = "";
    public String VP_PREME = "";
    public String VP_CNXPA = "";
    public String VP_TUORCODE = "";
    public String VP_USER = "";
    public String VP_TYPE = "";
    public String VP_AREA = "";
    public String VP_EPR = "";
    public String VP_PNR = "";
    public String VP_IATA = "";
    public String VP_EROOR = "";
    public String pexcel = "";
    public String BASE = "";

    public List<A1673Filter> lstTax = new ArrayList<A1673Filter>();
    public List<SQP00911> lst_razones = new ArrayList<SQP00911>(0);
    public List<SQP00911> lst_TKT = new ArrayList<SQP00911>(0);
    public List<SQP00911> lstImpues = new ArrayList<SQP00911>(0);
    public FACSIMILFilter beanFacsimil = new FACSIMILFilter();
    public List<SQP00911> lst_Ini = new ArrayList<SQP00911>(0);
    public List<A1580> lst_CalcuArelonia = new ArrayList<A1580>(0);
    public List<A1673> lst_CalcuImpuestos = new ArrayList<A1673>(0);
    public List<A2553> lst_Calcurazones = new ArrayList<A2553>(0);
    public List<SQP00911> lst_dataIniADMRefe = new ArrayList<SQP00911>(0);
    public List<SQP00911> lst_lstTKTSADMRefe = new ArrayList<SQP00911>(0);
    public List<A2553> lst_razonesADMRefe = new ArrayList<A2553>(0);

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
