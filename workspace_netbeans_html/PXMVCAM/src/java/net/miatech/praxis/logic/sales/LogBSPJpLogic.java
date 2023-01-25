/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX179S01A1845Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.LogBSPJpDAO;

/**
 *
 * @author lmendoza
 */
public class LogBSPJpLogic {

    private final LogBSPJpDAO logBSPJpDAO = new LogBSPJpDAO();

    public void setSession(IServerSession ss) {
        logBSPJpDAO.setSession(ss);

    }
    
    public   List<PX179S01A1845Filter>  loadPX179S01A1845( PX179S01A1845Filter filter) throws SQLException, Exception {
        return logBSPJpDAO.loadPX179S01A1845(filter);
    }

 
}
