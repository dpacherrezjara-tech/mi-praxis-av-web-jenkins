/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2552Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.LoadMassiveDebitsSubiArchivoDAO;

/**
 *
 * @author zperez
 */
public class LoadMassiveDebitsSubiArchivoLogic {

    private final LoadMassiveDebitsSubiArchivoDAO DebitsSubiArchivoDAO = new LoadMassiveDebitsSubiArchivoDAO();

    public void setSession(IServerSession ss) {
        DebitsSubiArchivoDAO.setSession(ss);
    }

    public List<A2552Filter> loadSQP01679(A2552Filter filter) throws SQLException, Exception {
        return DebitsSubiArchivoDAO.loadSQP01903(filter);
    }

    public List<A2552Filter> loadSQP01962(A2552Filter filter) throws SQLException, Exception {
        return DebitsSubiArchivoDAO.loadSQP01962(filter);
    }

    public String insertTKT(ArrayList<A2552Filter> filter, String strSesion) throws SQLException, Exception {
        return DebitsSubiArchivoDAO.insertTKT(filter, strSesion);
    }

    public String UpdateTKT(ArrayList<A2552Filter> filter) throws SQLException, Exception {
        return DebitsSubiArchivoDAO.UpdateTKT(filter);
    }
    public String subirExcel(ArrayList<A2552Filter> filter) throws SQLException, Exception {
        return DebitsSubiArchivoDAO.subirExcel(filter);
    }

}
