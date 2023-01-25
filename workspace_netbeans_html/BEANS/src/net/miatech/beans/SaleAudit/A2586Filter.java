/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.SaleAudit.A2586;

/**
 *
 * @author zperez
 */
public class A2586Filter extends A2586 {

    public String CombOption = "";
    public String CombOrigen = "";
    public String DATEFROM = "";
    public String DATETO = "";
    public String TRNCU = "";
    public String SOURCE = "";
    public String CHANNEL = "";
    public String AREA = "";
    public String IATA = "";
    public String COUNTRY = "";
    public String CURRENCY = "";
    public String CIA = "";
    public String FORMA = "";
    public String SERIE = "";
    public String SEQ = "";
    public String NADM= "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
