/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A3647Filter;
import net.miatech.beans.SaleAudit.A3649Filter;
import net.miatech.beans.SaleAudit.A3651Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RFNDPendingDAO;

/**
 *
 * @author zperez
 */
public class RFNDPendingLogic {

    private RFNDPendingDAO objDAO = new RFNDPendingDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3647Filter> SearchPendiRefund(A3647Filter filter) throws SQLException, Exception {
        return objDAO.SearchPendiRefund(filter);
    }

    public List<A3651Filter> SearchRFNDRazon(A3651Filter filter) throws SQLException, Exception {
        return objDAO.SearchRFNDRazon(filter);
    }

    public String ProcesaManualRFND(A3647Filter beanGuardarA3389, ArrayList<A3649Filter> gridDataRazones) throws SQLException, Exception {
        return objDAO.ProcesaManualRFND(beanGuardarA3389, gridDataRazones);
    }
    public List<A3647Filter> SearchTICKETRFND(A3647Filter filter) throws SQLException, Exception {
        return objDAO.SearchTICKETRFND(filter);
    }

}
