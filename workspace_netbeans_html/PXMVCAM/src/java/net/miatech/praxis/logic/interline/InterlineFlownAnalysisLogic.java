/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.InterlineFlownAnalysisDAO;
import net.miatech.praxis.interline.filter.WRF071Filter;

/**
 *
 * @author andrea
 */
public class InterlineFlownAnalysisLogic {

    private final InterlineFlownAnalysisDAO interlineFlownAnalysisDAO = new InterlineFlownAnalysisDAO();

    public void setSession(IServerSession ss) {
        interlineFlownAnalysisDAO.setSession(ss);

    }
    
     public List<WRF071Filter> loadSQP00213(WRF071Filter filter) throws SQLException, Exception {
        return interlineFlownAnalysisDAO.loadSQP00213(filter);
    }
     
      public List<WRF071Filter> loadPX162S08WRF071(WRF071Filter filter) throws SQLException, Exception {
        return interlineFlownAnalysisDAO.loadPX162S08WRF071(filter);
    }
     
     
     
}
