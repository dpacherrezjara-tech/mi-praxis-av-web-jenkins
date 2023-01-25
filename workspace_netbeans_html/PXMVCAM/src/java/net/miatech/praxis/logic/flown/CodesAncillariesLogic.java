/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX520S01A051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.CodesAncillariesDAO;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class CodesAncillariesLogic {

    private final CodesAncillariesDAO CodesAncillariesDAO = new CodesAncillariesDAO();

    public void setSession(IServerSession ss) {
        CodesAncillariesDAO.setSession(ss);
    }
    
    public List<PX520S01A051Filter> loadPX520S01A051(PX520S01A051Filter filter) throws SQLException, Exception {
        return CodesAncillariesDAO.loadPX520S01A051(filter);
    }
    public PX520S01A051Filter setPX520S01A051(PX520S01A051Filter filter) throws SQLException, Exception {
        return CodesAncillariesDAO.setPX520S01A051(filter);
    }

}
