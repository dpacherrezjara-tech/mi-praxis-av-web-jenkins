/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP01237Filter;
import net.miatech.beans.SQP01267Filter;
import net.miatech.beans.SQP01500Filter;
import net.miatech.beans.SQP01512Filter;
import net.miatech.beans.SQP01536Filter;
import net.miatech.beans.SQP01548Filter;
import net.miatech.beans.SQP01970Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.SalesAnalysisByAgentDAO;

/**
 *
 * @author vhidalgo
 */
public class SalesAnalysisByAgentLogic {
     private SalesAnalysisByAgentDAO objDAO = new SalesAnalysisByAgentDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP01500Filter> getSQP01500Filter(SQP01500Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01500Filter(filter);
    }
    
    public List<SQP01500Filter> getSQP03944Filter(SQP01500Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03944Filter(filter);
    }
    
    public List<SQP01237Filter> getSQP01237Filter(SQP01237Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01237Filter(filter);
    }
    public List<SQP01512Filter> getSQP01512Filter(SQP01512Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01512Filter(filter);
    }
    public List<SQP01267Filter> getSQP01267Filter(SQP01267Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01267Filter(filter);
    }
    public List<SQP01970Filter> getLoadSQP01970Filter(SQP01970Filter filter) throws SQLException, Exception {
        return objDAO.getLoadSQP01970Filter(filter);
    }
    public List<SQP01548Filter> getSQP01548Filter(SQP01548Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01548Filter(filter);
    }
    public List<SQP01536Filter> getSQP01536Filter(SQP01536Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01536Filter(filter);
    }
    
    
}
