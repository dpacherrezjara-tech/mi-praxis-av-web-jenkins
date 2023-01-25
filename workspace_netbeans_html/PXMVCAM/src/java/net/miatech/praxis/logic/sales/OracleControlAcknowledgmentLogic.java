/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1880Filter;
import net.miatech.beans.A1881Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.CommissionsFOBDAO;
import net.miatech.praxis.dao.sales.OracleControlAcknowledgmentDAO;
import net.miatech.praxisbi.A1955Filter;

/**
 *
 * @author lmendoza
 */
public class OracleControlAcknowledgmentLogic {

    private final OracleControlAcknowledgmentDAO oracleControlAcknowledgmentDAO = new OracleControlAcknowledgmentDAO();

    public void setSession(IServerSession ss) {
        oracleControlAcknowledgmentDAO.setSession(ss);

    }

    public List<A1955Filter> loadPX247S01A1955(A1955Filter filter) throws SQLException, Exception {
        return oracleControlAcknowledgmentDAO.loadPX247S01A1955(filter);
    }
}
