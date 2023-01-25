/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2586Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.AdmaccountingReportFormDAO;

/**
 *
 * @author zperez
 */
public class AdmaccountingReportFormLogic {

    private AdmaccountingReportFormDAO AdmaccountingDAO = new AdmaccountingReportFormDAO();

    public void setSession(IServerSession ss) {
        AdmaccountingDAO.setSession(ss);
    }
    
    public List<A2586Filter> search(A2586Filter filter) throws SQLException, Exception {
        return AdmaccountingDAO.Search(filter);
    }

}
