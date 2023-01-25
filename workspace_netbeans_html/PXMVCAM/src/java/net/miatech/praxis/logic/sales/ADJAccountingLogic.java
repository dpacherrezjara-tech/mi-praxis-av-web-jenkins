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
import net.miatech.beans.PX0241S01A720Filter;
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A1740;
import net.miatech.praxis.dao.sales.ADJAccountingDAO;

/**
 *
 * @author lmendoza
 */
public class ADJAccountingLogic {

    private final ADJAccountingDAO aDJAccountingDAO = new ADJAccountingDAO();

    public void setSession(IServerSession ss) {
        aDJAccountingDAO.setSession(ss);

    }

    public List<A720Filter> loadTicket(A720Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.loadTicketDao(filter);
    }

    public List<A1939Filter> loadAccountNumber(A1939Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.loadAccountNumber(filter);
    }

    public A2024Filter accountADJMaintance(PX040S01A1716Filter gridDataTktAccountingDEBE, A2024Filter filter, String strOption, Integer i) throws SQLException, Exception {
        return aDJAccountingDAO.accountADJMaintance(gridDataTktAccountingDEBE, filter, strOption, i);
    }

    public List<A2024Filter> lst_search(A2024Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.lstsearch(filter);
    }

    public List<A2024Filter> exportExcel(A2024Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.lstsearch(filter);
    }

    public List<A2024Filter> loadTicketEdit(A2024Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.lstsearch(filter);
    }

    public String lst_delete(A2024Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.lstdelete(filter);
    }
    //////////////////////

    public A2024Filter lst_Maintance(A2024Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.lstMaintance(filter);
    }

    public List<PX040S01A1716Filter> loadPX040S01A1716(PX040S01A1716Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.loadPX040S01A1716(filter);
    }

    public List<PX0241S01A720Filter> loadViewAccounting(PX0241S01A720Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.loadViewAccounting(filter);
    }

    public A2024Filter lst_save(A2024Filter SaveFilter) throws SQLException, Exception {
        return aDJAccountingDAO.lstSave(SaveFilter);
    }

    public String insertTKT(A2024Filter[] filter) throws SQLException, Exception {
        return aDJAccountingDAO.insertTKT(filter);
    }

    public List<A1740Filter> SearchCta(A1740Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.SearchCta(filter);
    }

    public List<A1740> loadDocumentType() throws SQLException, Exception {
        return aDJAccountingDAO.loadDocumentType();
    }

    public List<A1740> loadCategory() throws SQLException, Exception {
        return aDJAccountingDAO.loadCategory();
    }

    public List<A1740Filter> loadAccountType() throws SQLException, Exception {
        return aDJAccountingDAO.loadAccountType();
    }

    public String loadGuardar(A2024Filter filter, String lstCorrectData) throws SQLException, Exception {
        return aDJAccountingDAO.loadGuardar(filter, lstCorrectData);
    }

    public String maintenance(ArrayList<A2024Filter> filter) throws SQLException, Exception {
        return aDJAccountingDAO.maintenance(filter);
    }

    public List<A2024Filter> loadCargarDatos(A2024Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.loadCargarDatos(filter);
    }
    public List<A2024Filter> loadDatosTicktes(A2024Filter filter) throws SQLException, Exception {
        return aDJAccountingDAO.loadDatosTicktes(filter);
    }

}
