/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3647Filter;
import net.miatech.beans.SaleAudit.A3648Filter;
import net.miatech.beans.SaleAudit.A3652Filter;
import net.miatech.beans.SaleAudit.A3669Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RFNDQueryDAO;

/**
 *
 * @author zperez
 */
public class RFNDQueryLogic {

    private RFNDQueryDAO objDAO = new RFNDQueryDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3647Filter> SearchReportQueryRFND(A3647Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportQueryRFND(filter);
    }
     public List<A3648Filter> searchDetail(A3648Filter filter) throws SQLException, Exception {
        return objDAO.searchDetail(filter);
    }

    public A3647Filter SearchQueryRFNDetail(A3647Filter filter) throws SQLException, Exception {
        return objDAO.SearchQueryRFNDetail(filter);
    }
    public String ProcesaMantenimiento(A3647Filter beanGuardarA3389) throws SQLException, Exception {
        return objDAO.ProcesaMantenimiento(beanGuardarA3389);
    }
    
    public String ProcesaManualRFNDTCKT(A3648Filter filter,String lstaTaxes,String lstarazones,String fop) throws SQLException, Exception {
        return objDAO.ProcesaManualRFNDTCKT(filter, lstaTaxes,lstarazones,fop);
    }
    public A3647Filter SearchQueryRFNDetailTCKT(A3647Filter filter) throws SQLException, Exception {
        return objDAO.SearchQueryRFNDetailTCKT(filter);
    }
    public String ProcesaDeleteTAXManual(A3652Filter filter) throws SQLException, Exception {
        return objDAO.ProcesaDeleteTAXManual(filter);
    }
    public A3647Filter ProcesaUpdateUsosCPN(A3647Filter filter) throws SQLException, Exception {
        return objDAO.ProcesaUpdateUsosCPN(filter);
    }
     public List<A3669Filter> SearchDetailError(A3669Filter filter) throws SQLException, Exception {
        return objDAO.SearchDetailError(filter);
    }

}
