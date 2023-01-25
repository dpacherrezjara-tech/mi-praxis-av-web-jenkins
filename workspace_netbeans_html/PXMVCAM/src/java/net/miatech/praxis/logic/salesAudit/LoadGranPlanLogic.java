/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2672Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.LoadGranPlanDAO;

/**
 *
 * @author lmendoza
 */
public class LoadGranPlanLogic {

    private final LoadGranPlanDAO loadGranPlanDAO = new LoadGranPlanDAO();

    public void setSession(IServerSession ss) {
        loadGranPlanDAO.setSession(ss);

    }

   public List<A2672Filter> lstsearch(A2672Filter filter) throws SQLException, Exception {
        return loadGranPlanDAO.lstsearch(filter);   
    }

}
