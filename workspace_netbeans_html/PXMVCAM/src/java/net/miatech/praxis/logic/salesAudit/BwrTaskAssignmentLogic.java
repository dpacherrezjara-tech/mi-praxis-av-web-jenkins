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
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.BwrTaskAssignmentDAO;

/**
 *
 * @author lremicio
 */
public class BwrTaskAssignmentLogic {
    
    private BwrTaskAssignmentDAO BwrTaskAssig = new BwrTaskAssignmentDAO();

    public void setSession(IServerSession ss) {
        BwrTaskAssig.setSession(ss);
    }
    
    public List<A3389Filter> SearchTaskAssignment(A3389Filter filter) throws SQLException, Exception {
        return BwrTaskAssig.SearchTaskAssignment(filter);
    }

    public List<A3389Filter> SearchTaskAssignmentDetail(A3389Filter filter) throws SQLException, Exception {
        return BwrTaskAssig.SearchTaskAssignmentDetail(filter);
    }

    public String insertAuditor(ArrayList<A3389Filter> filter, String Auditor) throws SQLException, Exception {
        return BwrTaskAssig.insertAuditor(filter, Auditor);
    }
    public List<A3389Filter> SearchGroupTaskAssignment(A3389Filter filter) throws SQLException, Exception {
        return BwrTaskAssig.SearchGroupTaskAssignment(filter);
    }
    
}
