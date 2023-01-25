/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX036S02A1530Filter;
import net.miatech.beans.PX036S03A1530Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ControlProcessDAO;

/**
 *
 * @author lmendoza
 */
public class ControlProcessLogic {

    private final ControlProcessDAO controlProcessDAO = new ControlProcessDAO();

    public void setSession(IServerSession ss) {
        controlProcessDAO.setSession(ss);

    }
    public   List<PX036S02A1530Filter>  loadPX036S02A1530( PX036S02A1530Filter filter) throws SQLException, Exception {
        return controlProcessDAO.loadPX036S02A1530(filter);
    }
    
     public   List<PX036S03A1530Filter>  loadPX036S03A1530( PX036S03A1530Filter filter) throws SQLException, Exception {
        return controlProcessDAO.loadPX036S03A1530(filter);
    }
}
