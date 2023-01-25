/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3182Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.dao.salesAudit.DisputeGestionBsplinkDAO;

/**
 *
 * @author zperez
 */
public class DisputeGestionBsplinkLogic {

    private DisputeGestionBsplinkDAO DAO = new DisputeGestionBsplinkDAO();

    public void setSession(IServerSession ss) {
        DAO.setSession(ss);
    }

    public List<SQP00911Filter> SearchReportADM(SQP00911Filter filter) throws SQLException, Exception {
        return DAO.SearchReportADM(filter);
    }

    public String insertTracing(A2553 filter) throws SQLException, Exception {
        return DAO.insertTracing(filter);
    }

    public List<A3182Filter> SearchRazon(A3182Filter filter) throws SQLException, Exception {
        return DAO.SearchRazon(filter);
    }

    public String savecorreo(List<SQP00911Filter> filter) throws SQLException, Exception {
        return DAO.savecorreo(filter);
    }
    public List<SQP00911Filter> loadDataInit(SQP00911Filter filter) throws SQLException, Exception {
        return DAO.loadDataInit(filter);
    }

}
