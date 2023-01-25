/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3268Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RobotDisputeControlDAO;

/**
 *
 * @author zperez
 */
public class RobotDisputeControlLogic {

    private RobotDisputeControlDAO objDAO = new RobotDisputeControlDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    public List<A3268Filter> SearchDebitos(A3268Filter filter) throws SQLException, Exception {
        return objDAO.SearchDebitos(filter);
    }
    public List<A3268Filter> SearchDebitosDetail(A3268Filter filter) throws SQLException, Exception {
        return objDAO.SearchDebitosDetail(filter);
    }
}
