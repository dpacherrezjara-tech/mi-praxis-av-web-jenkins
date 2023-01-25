/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A3907Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.LoadticketReportFormDAO;

/**
 *
 * @author zperez
 */
public class LoadticketReportFormLogic {

    public LoadticketReportFormDAO LoadticketDAO = new LoadticketReportFormDAO();

    public void setSession(IServerSession ss) {
        LoadticketDAO.setSession(ss);
    }

    public List<A3907Filter> search(A3907Filter filter) throws SQLException, Exception {
        return LoadticketDAO.search(filter);
    }

    public String subirExcel(ArrayList<A3907Filter> filter) throws SQLException, Exception {
        return LoadticketDAO.subirExcel(filter);
    }

    public String mantenimiento(ArrayList<A3907Filter> filter) throws SQLException, Exception {
        return LoadticketDAO.mantenimiento(filter);
    }
     public String procedimiento() throws SQLException, Exception {
        return LoadticketDAO.procedimiento();
    }

}
