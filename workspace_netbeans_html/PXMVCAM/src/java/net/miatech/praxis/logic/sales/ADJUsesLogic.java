/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.A1939Filter;
import net.miatech.beans.A2024Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ADJUsesDAO;

/**
 *
 * @author lmendoza
 */
public class ADJUsesLogic {

    private final ADJUsesDAO aDJUsesDAO = new ADJUsesDAO();

    public void setSession(IServerSession ss) {
        aDJUsesDAO.setSession(ss);

    }
    
    public List<A720Filter> loadTicket(A720Filter filter) throws SQLException, Exception {
        return aDJUsesDAO.loadTicketDao(filter);
    }

    public List<A1939Filter> loadAccountNumber(A1939Filter filter) throws SQLException, Exception {
        return aDJUsesDAO.loadAccountNumber(filter);
    }

    public A2024Filter accountADJMaintance(PX040S01A1716Filter gridDataTktAccountingDEBE, A2024Filter filter, String strOption, Integer i) throws SQLException, Exception {
        return aDJUsesDAO.accountADJMaintance(gridDataTktAccountingDEBE, filter, strOption, i);
    }

    public List<A2024Filter> lst_search(A2024Filter filter) throws SQLException, Exception {
        return aDJUsesDAO.lstsearch(filter);
    }

    public List<A2024Filter> exportExcel(A2024Filter filter) throws SQLException, Exception {
        return aDJUsesDAO.lstsearch(filter);
    }

    public List<A2024Filter> loadTicketEdit(A2024Filter filter) throws SQLException, Exception {
        return aDJUsesDAO.lstsearch(filter);
    }

    public A2024Filter lst_delete(A2024Filter filter) throws SQLException, Exception {
        return aDJUsesDAO.lstdelete(filter);
    }
    //////////////////////

    public A2024Filter lst_Maintance(A2024Filter filter) throws SQLException , Exception{
        return aDJUsesDAO.lstMaintance(filter);
    }
    public String insertAprobList(ArrayList<A2024Filter> filter) throws SQLException, Exception {
        return aDJUsesDAO.insertAprobList(filter);
    }

    public List<PX040S01A1716Filter> loadPX040S01A1716(PX040S01A1716Filter filter) throws SQLException , Exception {
        return aDJUsesDAO.loadPX040S01A1716(filter);
    }

    public A2024Filter lst_save(A2024Filter SaveFilter) throws SQLException , Exception {
        return aDJUsesDAO.lstSave(SaveFilter);
    }
     public String insertTKT(ArrayList<A2024Filter> filter) throws SQLException  , Exception{
        return aDJUsesDAO.insertTKT(filter);
    }
    public List<A1740Filter> SearchCta(A1740Filter filter) throws SQLException, Exception {
        return aDJUsesDAO.SearchCta(filter);
    }
    
     public List<A2024Filter> SearchADJUses(A2024Filter filter) throws SQLException, Exception {
        return aDJUsesDAO.SearchADJUses(filter);
    }

}
