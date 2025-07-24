/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import net.miatech.praxis.logic.payments.*;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP04091Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.BankStatementExtractDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2356Filter;

/**
 *
 * @author vhidalgo
 */
public class BankStatementExtractLogic {
    private BankStatementExtractDAO objDAO = new BankStatementExtractDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<SQP04091Filter> searchUsaflowDiary(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchUsaflowDiary(filter);
    }
    
    public List<SQP04091Filter> searchUsaflowDiaryDetail(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchUsaflowDiaryDetail(filter);
    }
    
    public List<SQP04091Filter> searchTacaflowDiaryDetail(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchTacaflowDiaryDetail(filter);
    }
    
    public List<SQP04091Filter> searchUsaflowDiaryHistoric(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchUsaflowDiaryHistoric(filter);
    }
    
    public List<SQP04091Filter> search(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.search(filter);
    }
    
    public List<SQP04091Filter> searchUsaflowWeekly(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchUsaflowWeekly(filter);
    }
    
    public List<SQP04091Filter> searchUsaflowWeeklyHistoric(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchUsaflowWeeklyHistoric(filter);
    }
    
    public List<SQP04091Filter> searchTacaDiary(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchTacaDiary(filter);
    }
    
    public List<SQP04091Filter> searchTacaDiaryHistoric(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchTacaDiaryHistoric(filter);
    }
    
    public List<SQP04091Filter> searchTacaWeekly(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchTacaWeekly(filter);
    }
    
    public List<SQP04091Filter> searchTacaWeeklyHistoric(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchTacaWeeklyHistoric(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698Detalle(A2290Filter filter) throws SQLException, Exception {
        return objDAO.loadPX269SQP00698Detalle(filter);
    }
    
    public List<A2356Filter> getListTotalConciliation_Bard(A2356Filter filter) throws SQLException, Exception {
        return objDAO.getListTotalConciliation_Bard(filter);
    }
    
    public List<SQP04091Filter> searchLog(SQP04091Filter filter) throws SQLException, Exception {
        return objDAO.searchLog(filter);
    }
    
    
}
