/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.BsplinkReportsStatisticsdetDAO;

/**
 *
 * @author zperez
 */
public class BsplinkReportsStatisticsdetLogic {
    
     private BsplinkReportsStatisticsdetDAO objDAO = new BsplinkReportsStatisticsdetDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A3389Filter> SearchReportGeneral(A3389Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportGeneral(filter);
    }
    public A3389Filter SearchReportStatis(A3389Filter filter,String option ) throws SQLException, Exception {
        return objDAO.SearchReportStatis(filter,option);
    }
    
    
}
