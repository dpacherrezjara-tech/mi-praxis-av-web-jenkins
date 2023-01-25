/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.A713;

/**
 *
 * @author JRM
 */
public class SQP01266Filter extends A713 {
   
            public String FUENT = "";
            public String CCUST  = "";
            public String TRNC  = "";
            public String FUENTRF  = "";
            public String SUBFURF = "";
            public String PAISRF = "";
            public String CIUDRF = "";
            public String AGENTRF = "";
            public String NAGENTE = "";
            public String CIARF = "";
            public String FORMARF = "";
            public String SERIERF = "";
            public String FPROCRF = "";
            public String MDARF = "";
            public String CPN1 = "";
            public String CPN2 = "";
            public String CPN3 = "";
            public String CPN4 = "";
            public String FUENTVTA = "";
            public String SUBFUVTA= "";
            public String PAISVTA= "";
            public String FECVTA = "";
            public String CIUVTA = "";
            public String AGENTVTA = "";
            public String NAGENTVTA = "";
            public String TDOC = "";
            public String MDACOM = "";
            public Double COMMIS = 0.0;
            public String MDASCOM = "";
            public Double SCOM = 0.0 ;
            public Double COMM1 = 0.0 ;
            public Double COMM2 = 0.0 ;
            public Double COMM3 = 0.0 ;
            public Double COMM4 = 0.0 ;
            public Double SCOM1 = 0.0 ;
            public Double SCOM2 = 0.0 ;
            public Double SCOM3 = 0.0 ;
            public Double SCOM4 = 0.0 ;
            public String CODEXCH = "";
            public String CIAVTA = "";
            public String FORMAVTA = "";
            public String SERIEVTA = "";

            public String DATEFROM = "";
            public String DATETO = "";
            public String TRNCU = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
