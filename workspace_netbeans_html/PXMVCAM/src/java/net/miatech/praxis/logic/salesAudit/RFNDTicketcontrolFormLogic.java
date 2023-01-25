/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3648Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RFNDTicketcontrolFormDAO;

/**
 *
 * @author zperez
 */
public class RFNDTicketcontrolFormLogic {

    private RFNDTicketcontrolFormDAO objDAO = new RFNDTicketcontrolFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3648Filter> searchRefundTicketControl(A3648Filter filter) throws SQLException, Exception {
        return objDAO.searchRefundTicketControl(filter);
    }
    public List<A3648Filter> SearchListDocument(A3648Filter filter) throws SQLException, Exception {
        return objDAO.SearchListDocument(filter);
    }

}
