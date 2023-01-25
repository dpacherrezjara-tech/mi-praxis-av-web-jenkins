/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A1672;

public class A1672Filter extends A1672 {

    public Integer VP_FILTER = 0;
    public String VP_CIA = "";
    public String VP_FRMSRIE = "";
    public String VP_SEQ = "";
    public String VP_CUPON = "";

    public String VP_SOURCE = "";
    public String VP_ISSUEDATE = "";
    public String VP_CANAL = "";

    public String VP_DATEFROM = "";
    public String VP_DATETO = "";
    public String VP_TDOC = "";
    public String VP_FLAG = "";

    public String VP_IATA = "";
    public String VP_ISSUEDATE2 = "";
    public String VP_IT = "";
    public String VP_FBASIS = "";
    public String VP_CODREASON = "";
    public String VP_TYMEMO = "";
    public String VP_AUDIT = "";
    public String VP_CUR = "";
    public String VP_STATUS = "";
    public String VP_TRNCU = "";
    public String VP_STREVISION = "";
    public String VP_PAIS = "";
    public String ORIGEN = "";
    public String DESTINO = "";
    public String VP_OPTION = "";
    public String VP_COUNTRY = "";
    public String VP_IDFILE = "";
    public String VP_DOCUMET = "";
    public String VP_USER = "";
    public String checkbox = "";
    public String pexcel = "";
    public double VP_GROUP = 0;
    public double VP_CLIE = 0;
    public double VP_JUSTI = 0;
    public double VP_AUTORI = 0;
    public double VP_DISABLE = 0;
    public double VP_GDS = 0;

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();

    public List<A1672Filter> lst_reporte1 = new ArrayList<A1672Filter>(0);
    public List<A1672Filter> lst_reporte2 = new ArrayList<A1672Filter>(0);

}
