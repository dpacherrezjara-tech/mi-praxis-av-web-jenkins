/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A2561;

/**
 *
 * @author JRM
 */
public class SQP00874Filter extends A2561 {

    public String VP_DATEFROM = "";
    public String VP_DATETO = "";
    public String VP_FTE = "";
    public String VP_COUTRY = "";
    public String VP_STATUS = "";
    public String VP_TYPE = "";
    public String VP_Typemasiv = "";
    public String VP_Area = "";
    //ZPP
    public  String VP_OPCION = "";
    public  String VP_NUMBERADM = "";
    public  String VP_COUNTRY = "";

    public DBException dbException = new DBException();
     public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();

}
