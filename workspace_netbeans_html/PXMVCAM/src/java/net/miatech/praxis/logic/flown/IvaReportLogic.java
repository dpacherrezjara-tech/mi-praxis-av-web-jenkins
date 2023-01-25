/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.IvaReportDAO;
import net.miatech.praxis.flown.filter.A4161Filter;

/**
 *
 * @author lmendoza
 */
public class IvaReportLogic {

    private final IvaReportDAO accountingMasterProcessDAO = new IvaReportDAO();

    public void setSession(IServerSession ss) {
        accountingMasterProcessDAO.setSession(ss);

    }

    public List<A4161Filter> search(A4161Filter filter) throws SQLException, Exception {
        return accountingMasterProcessDAO.search(filter);
    }
    
}
