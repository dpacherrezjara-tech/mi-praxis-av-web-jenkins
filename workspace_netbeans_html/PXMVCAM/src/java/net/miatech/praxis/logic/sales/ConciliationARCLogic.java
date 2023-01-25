/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX038S01A1698Filter;
import net.miatech.beans.PX038S04A1698Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ConciliationARCDAO;

/**
 *
 * @author lmendoza
 */
public class ConciliationARCLogic {

    private final ConciliationARCDAO conciliationARCDAO = new ConciliationARCDAO();

    public void setSession(IServerSession ss) {
        conciliationARCDAO.setSession(ss);

    }

    public List<PX038S01A1698Filter> loadPX038S01A1698(PX038S01A1698Filter filter) throws SQLException, Exception {
        return conciliationARCDAO.loadPX038S01A1698(filter);
    }

    public PX038S04A1698Filter loadPX038S04A1698(PX038S04A1698Filter filter, String strOption) throws SQLException, Exception {
        return conciliationARCDAO.loadPX038S04A1698(filter, strOption);
    }
}
