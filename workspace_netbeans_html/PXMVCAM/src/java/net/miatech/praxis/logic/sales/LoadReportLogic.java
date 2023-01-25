/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PXF051Filter;
import net.miatech.beans.PX108S02PXF053Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.LoadReportDAO;

/**
 *
 * @author jmeiggs
 */
public class LoadReportLogic {

    private final LoadReportDAO loadReportDAO = new LoadReportDAO();

    public void setSession(IServerSession ss) {
        loadReportDAO.setSession(ss);
    }
    
    public List<PXF051Filter> loadPXF051(PXF051Filter filter) throws SQLException, Exception {
        return loadReportDAO.loadPXF051(filter);
    }
    public List<PX108S02PXF053Filter> loadPX108S02PXF053(PX108S02PXF053Filter filter) throws SQLException, Exception {
        return loadReportDAO.loadPX108S02PXF053(filter);
    }
}
