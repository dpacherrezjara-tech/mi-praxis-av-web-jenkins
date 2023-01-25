/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.tnu;

import java.util.List;
import net.miatech.beans.PX228S01Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.tnu.AtlSalesUseMonthlyBalanceDAO;

/**
 *
 * @author vhidalgo
 */
public class AtlSalesUseMonthlyBalanceLogic {

    private final AtlSalesUseMonthlyBalanceDAO objDAO = new AtlSalesUseMonthlyBalanceDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<PX228S01Filter> loadPX228S01A1890(PX228S01Filter filter) throws Exception {
        return objDAO.loadPX228S01A1890(filter);
    }
}
