/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP04369Filter;
import net.miatech.beans.SQP04370ASRBYTRXFilter;
import net.miatech.beans.SQP04370ASRFilter;
import net.miatech.beans.SQP04370Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ConciliationDifferencesDAO;

/**
 *
 * @author vhidalgo
 */
public class ConciliationDifferencesLogic {

    private final ConciliationDifferencesDAO conciliationDifferencesDAO = new ConciliationDifferencesDAO();

    public void setSession(IServerSession ss) {
        conciliationDifferencesDAO.setSession(ss);

    }

    //BSP-ARC
    public List<SQP04370Filter> loadSQP04370Filter(SQP04370Filter filter) throws SQLException, Exception {
        return conciliationDifferencesDAO.loadSQP04370Filter(filter);
    }

    //ASR
    public List<SQP04370ASRFilter> loadSQP04370ASRFilter(SQP04370Filter filter) throws SQLException, Exception {
        return conciliationDifferencesDAO.loadSQP04370ASRFilter(filter);
    }

    //ASR by TRX
    public List<SQP04370ASRBYTRXFilter> loadSQP04370ASRBYTRXFilter(SQP04370Filter filter) throws SQLException, Exception {
        return conciliationDifferencesDAO.loadSQP04370ASRBYTRXFilter(filter);
    }

    //DETALLE
    public List<SQP04369Filter> loadSQP04369Filter(SQP04369Filter filter) throws SQLException, Exception {
        return conciliationDifferencesDAO.loadSQP04369Filter(filter);
    }

}
