/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.SaleAudit.A3402Filter;
import net.miatech.beans.SaleAudit.A3404Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.BwrBSPLINKRFNDDAO;

/**
 *
 * @author lremicio
 */
public class BwrBSPLINKRFNDLogic {
    
    private BwrBSPLINKRFNDDAO objDAO = new BwrBSPLINKRFNDDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A3389Filter> SearchReportQueryRFND(A3389Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportQueryRFND(filter);
    }

    public A3389Filter SearchQueryRFNDetail(A3389Filter filter) throws SQLException, Exception {
        return objDAO.SearchQueryRFNDetail(filter);
    }

    public List<A3404Filter> SearchRFNDRazon(A3404Filter filter) throws SQLException, Exception {
        return objDAO.SearchRFNDRazon(filter);
    }

    public String ProcesaManualRFND(A3389Filter beanGuardarA3389, ArrayList<A3404Filter> gridDataRazones) throws SQLException, Exception {
        return objDAO.ProcesaManualRFND(beanGuardarA3389, gridDataRazones);
    }

    public List<A3389Filter> ReportRFNDEMAIL() throws SQLException, Exception {
        return objDAO.ReportRFNDEMAIL();
    }

    public List<A3402Filter> searchLstTax(A3402Filter filter) throws SQLException, Exception {
        return objDAO.searchLstTax(filter);
    }
    
}
