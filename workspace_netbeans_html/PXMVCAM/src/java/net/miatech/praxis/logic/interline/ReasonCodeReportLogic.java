/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.ReasonCodeReportDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;

/**
 *
 * @author lmendoza
 */
public class ReasonCodeReportLogic {

    private final ReasonCodeReportDAO reasonCodeReportDAO = new ReasonCodeReportDAO();

    public void setSession(IServerSession ss) {
        reasonCodeReportDAO.setSession(ss);

    }

    public List<SFI021Filter> loadPX203SQP00157(SFI021Filter filter) throws SQLException, Exception {
        return reasonCodeReportDAO.loadPX203SQP00157(filter);
    }

    public List<SFI021Filter> loadPX203SQP00158(SFI021Filter filter, HashMap<String, String> hmAerolineas) throws SQLException, Exception {
        return reasonCodeReportDAO.loadPX203SQP00158(filter, hmAerolineas);
    }

     public List<SFI021Filter> loadPX203SQP00159(SFI021Filter filter) throws SQLException, Exception {
        return reasonCodeReportDAO.loadPX203SQP00159(filter);
    }    
}
