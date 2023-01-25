/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.FrequentFlyerDAO;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.interline.filter.WRF170Filter;

/**
 *
 * @author lmendoza
 */
public class FrequentFlyerLogic {

    private final FrequentFlyerDAO frequentFlyerDAO = new FrequentFlyerDAO();

    public void setSession(IServerSession ss) {
        frequentFlyerDAO.setSession(ss);

    }

    public List<WRF016Filter> loadPX198S01WRF002(WRF016Filter filter) throws SQLException, Exception {
        return frequentFlyerDAO.loadPX198S01WRF002(filter);
    }

    public List<WRF170Filter> loadPX198SQP02620(WRF016Filter filter) throws SQLException, Exception {
        return frequentFlyerDAO.loadPX198SQP02620(filter);
    }

    public List<WRF016Filter> loadPX198SQP02615(WRF016Filter filter) throws SQLException, Exception {
        return frequentFlyerDAO.loadPX198SQP02615(filter);
    }
    
    public List<WRF016Filter> loadPX198S02WRF002(WRF016Filter filter) throws SQLException, Exception {
        return frequentFlyerDAO.loadPX198S02WRF002(filter);
    }

}
