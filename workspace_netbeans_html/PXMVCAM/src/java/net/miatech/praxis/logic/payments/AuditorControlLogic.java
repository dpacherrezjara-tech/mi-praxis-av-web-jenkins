/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.librfnd.filter.CPF030Filter;
import net.miatech.librfnd.filter.CPF031Filter;
import net.miatech.praxis.dao.payments.AuditorControlDAO;
/**
 *
 * @author andrea
 */
public class AuditorControlLogic {
    
    AuditorControlDAO auditorControlDAO = new AuditorControlDAO();

    public void setSession(IServerSession ss) {
        auditorControlDAO.setSession(ss);
    }

    public List<CPF031Filter> search(CPF031Filter filter) throws Exception {
        return auditorControlDAO.search(filter);
    }

    public List<CPF031Filter> searchDataDetail(CPF031Filter filter) throws Exception {
         return auditorControlDAO.searchDataDetail(filter);
    }
   
    public List<CPF030Filter> searchDetailDay(CPF031Filter filter, String flag) throws Exception {
         return auditorControlDAO.searchDetailDay(filter, flag);
    }
    
    public List<CPF031Filter> searchDataDetailAll(CPF031Filter filter) throws Exception {
         return auditorControlDAO.searchDataDetailAll(filter);
    }
    
    //---------------------------------------------------------------------------------------
    
    
    public List<CPF030Filter> searchByAsigDateMonth(CPF031Filter filter) throws Exception {
         return auditorControlDAO.searchByAsigDateMonth(filter);
    }
    
    public List<CPF030Filter> searchByAsigDate(CPF031Filter filter) throws Exception {
         return auditorControlDAO.searchByAsigDate(filter);
    }
    
    //---------------------------------------------------------------------------------------
    
    public List<?> searchProcess(CPF031Filter filter) throws Exception {
         return auditorControlDAO.searchProcess(filter);
    }
    
//    public List<CPF031Filter> searchProcess_1(CPF031Filter filter) throws Exception {
//         return auditorControlDAO.searchProcess_1(filter);
//    }
    public HashMap searchProcess_1(CPF031Filter filter) throws SQLException, Exception {
        return auditorControlDAO.searchProcess_1(filter);
    }
    
    public List<CPF030Filter> searchProcessDay(CPF031Filter filter, String flag) throws Exception {
         return auditorControlDAO.searchProcessDay(filter, flag);
    }
    
   public String loadSQP04496(CPF030Filter filter) throws Exception {
        return auditorControlDAO.loadSQP04496(filter);
    }
}
