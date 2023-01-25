/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A2252Filter;
import net.miatech.beans.SaleAudit.A2536Filter;
import net.miatech.beans.SaleAudit.SQP00942Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.ContingenciesDAO;

/**
 *
 * @author lmendoza
 */
public class ContingenciesLogic {

    private final ContingenciesDAO contingenciesDAO = new ContingenciesDAO();

    public void setSession(IServerSession ss) {
        contingenciesDAO.setSession(ss);

    }

    public List<A2536Filter> Search(A2536Filter filter) throws SQLException, Exception {
        return contingenciesDAO.lstsearch(filter);
    }

    public A2536Filter mantenimientoContingencies(A2536Filter filter) throws SQLException, Exception {
        return contingenciesDAO.mantenimientoContingencies(filter);
    }

}
