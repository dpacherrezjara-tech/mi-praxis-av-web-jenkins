/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2966Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.DebitBilledReportFormDAO;

/**
 *
 * @author zperez
 */
public class DebitBilledReportFormLogic {

    private DebitBilledReportFormDAO BilledDAO = new DebitBilledReportFormDAO();

    public void setSession(IServerSession ss) {
        BilledDAO.setSession(ss);
    }

    public List<A2966Filter> SearchDebitos(A2966Filter filter) throws SQLException, Exception {
        return BilledDAO.SearchDebitos(filter);
    }
    
    public SQP00911Filter SearchDataGeneral(A2966Filter filter) throws SQLException, Exception {
        return BilledDAO.SearchDataGeneral(filter);
    }

}
