/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2548Filter;
import net.miatech.beans.SaleAudit.A3537Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.dao.salesAudit.PostbillingDAO;

/**
 *
 * @author zperez
 */
public class PostbillingLogic {

    public PostbillingDAO objDAO = new PostbillingDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3537Filter> SearchReportPostbilling(A3537Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportPostbilling(filter);
    }

    public String savecorreo(List<A3537Filter> filter) throws SQLException, Exception {
        return objDAO.savecorreo(filter);
    }

    public A3537Filter SearchPostbillingDetail(A3537Filter filter) throws SQLException, Exception {
        return objDAO.SearchPostbillingDetail(filter);
    }

    public List<SQP00911Filter> lstTKTS(A3537Filter filter) throws SQLException, Exception {
        return objDAO.lstTKTS(filter);
    }

    public List<A2553> loadTracing(A3537Filter filter) throws SQLException, Exception {
        return objDAO.loadTracing(filter);
    }

    public String insertTracing(A3537Filter filter) throws SQLException, Exception {
        return objDAO.insertTracing(filter);
    }

    public List<A3537Filter> SearchQueryPostbilling(A3537Filter filter) throws SQLException, Exception {
        return objDAO.SearchQueryPostbilling(filter);
    }

    public List<SQP00911Filter> SearchListDocument(A3537Filter filter) throws SQLException, Exception {
        return objDAO.SearchListDocument(filter);
    }

}
