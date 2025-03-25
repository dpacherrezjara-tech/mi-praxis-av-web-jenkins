/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ViewADMDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2295Filter;

/**
 *
 * @author 
 */
public class ViewADMLogic {

    private final ViewADMDAO ViewADMDAO = new ViewADMDAO();

    public void setSession(IServerSession ss) {
        ViewADMDAO.setSession(ss);
    }
    
    public List<A2295Filter> loadPX644SQPMPF100ADM(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM(filter);
    }
    
    public List<A2295Filter> loadPX290MPS077_MONTH(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX290MPS077_MONTH(filter);
    }
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_COUNTRYBYF(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_COUNTRYBYF(filter);
    }
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_CARDBYF(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_CARDBYF(filter);
    }
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_DETAILBYF(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_DETAILBYF(filter);
    }
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_DETAILBYEYES(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_DETAILBYEYES(filter);
    }
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_DETAILBYEYESCOUNTRY(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_DETAILBYEYESCOUNTRY(filter);
    }
    
    public List<A2290Filter> loadPX644SQPMPF100ADM_MSSG(A2290Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_MSSG(filter);
    }
    
    public List<A2290Filter> loadPX644SQPMPF100ADM_BEANTKT(A2290Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_BEANTKT(filter);
    }
    
    public String loadPX644SQPMPF100ADM_EXECUTION(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_EXECUTION(filters, user);
    }
    
    public String loadPX644SQPMPF100ADM_REVERSE(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_REVERSE(filters, user);
    }
    
    public String loadPX644SQPMPF100CLEAN_TKT(A2290Filter filter, UserView user) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100CLEAN_TKT(filter, user);
    }
    
    public String loadPX644SQPMPF100GENERATE_SECOND_ADM(A2290Filter filter, UserView user) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100GENERATE_SECOND_ADM(filter, user);
    }
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_DET(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_DET(filter);
    }
    
    public List<A2295Filter> loadPX290MPS077_DET_BYF(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX290MPS077_DET_BYF(filter);
    }
    public List<A2295Filter> loadPX290MPS077_DET_BYD(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX290MPS077_DET_BYD(filter);
    }
    
    public List<A2295Filter> loadPX290MPS077_DET_BYS(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX290MPS077_DET_BYS(filter);
    }
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_REPORT(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_REPORT(filter);
    }
    
    public List<A2295Filter> loadPX644SQPMPF100ADM_REPORT_2(A2295Filter filter) throws SQLException, Exception {
        return ViewADMDAO.loadPX644SQPMPF100ADM_REPORT_2(filter);
    }
}
