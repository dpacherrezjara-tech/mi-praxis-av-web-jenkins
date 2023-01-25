/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1462Filter2;
import net.miatech.beans.WRF070Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.GSACommisionReportDAO;

/**
 *
 * @author lmendoza
 */
public class GSACommisionReportLogic {

    private final GSACommisionReportDAO gSACommisionReportDAO = new GSACommisionReportDAO();

    public void setSession(IServerSession ss) {
        gSACommisionReportDAO.setSession(ss);

    }

    public List<WRF070Filter> loadPX240S01(WRF070Filter filter) throws SQLException, Exception {
        return gSACommisionReportDAO.loadPX240S01(filter);
    }

    public List<WRF070Filter> loadPX240S02(WRF070Filter filter) throws SQLException, Exception {
        return gSACommisionReportDAO.loadPX240S02(filter);
    }

    public List<WRF070Filter> loadPX240S03(WRF070Filter filter) throws SQLException, Exception {
        return gSACommisionReportDAO.loadPX240S03(filter);
    }

    public List<WRF070Filter> loadPX240S04(WRF070Filter filter) throws SQLException, Exception {
        return gSACommisionReportDAO.loadPX240S04(filter);
    }

    public List<A1462Filter2> loadPX240S01TKT(WRF070Filter filter) throws SQLException, Exception {
        return gSACommisionReportDAO.loadPX240S01TKT(filter);
    }

    public List<A1462Filter2> loadPX240S02LIQUI(WRF070Filter filter) throws SQLException, Exception {
        return gSACommisionReportDAO.loadPX240S02LIQUI(filter);
    }

    public List<A1462Filter2> loadPX240S01POLIZ(WRF070Filter filter) throws SQLException, Exception {
        return gSACommisionReportDAO.loadPX240S01POLIZ(filter);
    }

    public List<A1462Filter2> loadPX240S01LIQUI(A1462Filter2 filter) throws SQLException, Exception {
        return gSACommisionReportDAO.loadPX240S01LIQUI(filter);
    }
   public List<A1462Filter2> loadPX240S03LIQUI(A1462Filter2 filter) throws SQLException, Exception {
        return gSACommisionReportDAO.loadPX240S03LIQUI(filter);
    }   

   
   
   
}
