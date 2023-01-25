/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.NoBankInformationReportDAO;
import net.miatech.praxis.payment.filter.A2293Filter;

/**
 *
 * @author 
 */
public class NoBankInformationReportLogic {

    private final NoBankInformationReportDAO NoBankInformationReportDAO = new NoBankInformationReportDAO();

    public void setSession(IServerSession ss) {
        NoBankInformationReportDAO.setSession(ss);
    }
    
    public List<A2293Filter> loadPX311SQP00958(A2293Filter filter) throws SQLException, Exception {
        return NoBankInformationReportDAO.loadPX311SQP00958(filter);
    }

}
