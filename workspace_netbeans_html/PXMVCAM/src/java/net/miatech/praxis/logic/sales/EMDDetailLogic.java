/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.ReportEmdDetailsA1530Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.EMDDetailDAO;

/**
 *
 * @author ZPEREZ
 */
public class EMDDetailLogic {

    private final EMDDetailDAO eMDDetailDAO = new EMDDetailDAO();

    public void setSession(IServerSession ss) {
        eMDDetailDAO.setSession(ss);

    }

    public List<ReportEmdDetailsA1530Filter> loadPXReportEmdDetailsA1530(ReportEmdDetailsA1530Filter filter) throws SQLException, Exception {
        return eMDDetailDAO.loadPXReportEmdDetailsA1530(filter);
    }

}
