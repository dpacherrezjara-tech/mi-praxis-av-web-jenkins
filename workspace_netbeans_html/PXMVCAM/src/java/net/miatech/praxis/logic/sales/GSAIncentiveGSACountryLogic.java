/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.PX173S01A1839Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.GSAIncentiveGSACountryDAO;
import net.miatech.praxis.dao.sales.MinimunRuleDAO;

/**
 *
 * @author lmendoza
 */
public class GSAIncentiveGSACountryLogic {

    private final GSAIncentiveGSACountryDAO GSAIncentiveGSACountryDAO = new GSAIncentiveGSACountryDAO();

    public void setSession(IServerSession ss) {
        GSAIncentiveGSACountryDAO.setSession(ss);

    }
    
     public List<PX173S01A1839Filter> loadPX173S01A1839(PX173S01A1839Filter filter) throws SQLException, Exception {
        return GSAIncentiveGSACountryDAO.loadPX173S01A1839(filter);
    }

}
