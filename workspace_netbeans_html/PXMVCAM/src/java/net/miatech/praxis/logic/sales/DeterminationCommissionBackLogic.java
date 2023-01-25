/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP01362Filter;
import net.miatech.beans.SaleAudit.SQP01600Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.dao.sales.DeterminationCommissionBackDAO;

/**
 *
 * @author lmendoza
 */
public class DeterminationCommissionBackLogic {

    private final DeterminationCommissionBackDAO determinationCommissionBackDAO = new DeterminationCommissionBackDAO();

    public void setSession(IServerSession ss) {
        determinationCommissionBackDAO.setSession(ss);

    }

    public List<A051> getListCountry() throws SQLException, Exception {
        return determinationCommissionBackDAO.getListCountry();
    }

    public List<A051> getListSchema(SQP01362Filter filter) throws SQLException, Exception {
        return determinationCommissionBackDAO.getListSchema(filter);
    }

    public List<SQP01600Filter> getListTypeProccessCMB(SQP01600Filter filter) throws SQLException, Exception {
        return determinationCommissionBackDAO.getListTypeProccessCMB(filter);
    }

}
