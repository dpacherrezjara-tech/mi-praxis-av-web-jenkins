/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1769Filter;
import net.miatech.beans.A1805Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ProcesingCommissionsDAO;

/**
 *
 * @author lmendoza
 */
public class ProcessingCommissionsLogic {

    private final ProcesingCommissionsDAO procesingCommissionsDAO = new ProcesingCommissionsDAO();

    public void setSession(IServerSession ss) {
        procesingCommissionsDAO.setSession(ss);

    }

    public String setPX214S01A1878(A1805Filter filter) throws SQLException, Exception {
        return procesingCommissionsDAO.getPX214S01A1878(filter);
    }

    public List<A1769Filter> loadZonas() throws SQLException, Exception {
        return procesingCommissionsDAO.loadZonas();
    }

    public List<A1805Filter> downloadText(String filter) throws SQLException, Exception {
        return procesingCommissionsDAO.downloadText(filter);
    }

}
