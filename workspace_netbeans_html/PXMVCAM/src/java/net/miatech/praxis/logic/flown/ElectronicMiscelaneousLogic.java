/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1817Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.ElectronicMiscellaneousDAO;

/**
 *
 * @author lmendoza
 */
public class ElectronicMiscelaneousLogic {

    private final ElectronicMiscellaneousDAO electronicMiscellaneousDAO = new ElectronicMiscellaneousDAO();

    public void setSession(IServerSession ss) {
        electronicMiscellaneousDAO.setSession(ss);

    }

    public List<A1817Filter> loadPX135S01A1817(A1817Filter filter) throws SQLException, Exception {
        return electronicMiscellaneousDAO.loadPX135S01A1817(filter);
    }

    public List<A1817Filter> loadPX135S02A1817(A1817Filter filter) throws SQLException, Exception {
        return electronicMiscellaneousDAO.loadPX135S02A1817(filter);
    }

    public List<A1692Filter> loadPX135S03A1818(A1817Filter filter) throws SQLException, Exception {
        return electronicMiscellaneousDAO.loadPX135S03A1818(filter);
    }

    public List<A1692Filter> loadPX135S05A1818(A1817Filter filter) throws SQLException, Exception {
        return electronicMiscellaneousDAO.loadPX135S05A1818(filter);
    }

    public A1817Filter loadPX135S03A1817(A1817Filter filter) throws SQLException, Exception {
        return electronicMiscellaneousDAO.loadPX135S03A1817(filter);
    }

    public String loadPX135S04A1817(A1817Filter filter, String strOption) throws SQLException, Exception {
        return electronicMiscellaneousDAO.loadPX135S04A1817(filter, strOption);
    }

    public A1692Filter loadPX135S06A1818(A1692Filter filter) throws SQLException, Exception {
        return electronicMiscellaneousDAO.loadPX135S06A1818(filter);
    }

    public String loadPX135S04A1818(A1692Filter filter, String strOption) throws SQLException, Exception {
        return electronicMiscellaneousDAO.loadPX135S04A1818(filter, strOption);
    }
}
