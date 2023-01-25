/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX105S01A1742Filter;
import net.miatech.beans.SQP00132Filter;
import net.miatech.beans.SQP00647Filter;
import net.miatech.beans.SQP00651Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.PercentCommissionFOBDAO;

/**
 *
 * @author lmendoza
 */
public class PercentCommissionFOBLogic {

    private final PercentCommissionFOBDAO percentCommissionFOBDAO = new PercentCommissionFOBDAO();

    public void setSession(IServerSession ss) {
        percentCommissionFOBDAO.setSession(ss);

    }

    public List<PX105S01A1742Filter> loadPX105S01A1742(PX105S01A1742Filter filter) throws SQLException, Exception {
        return percentCommissionFOBDAO.loadPX105S01A1742(filter);
    }

    public List<SQP00132Filter> getSQP00132Filter(SQP00132Filter filter) throws SQLException, Exception {
        return percentCommissionFOBDAO.getSQP00132Filter(filter);
    }

    public String get_PX112S03A1757(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        return percentCommissionFOBDAO.get_PX112S03A1757(VP_OPTION, VP_PARAM);
    }

    public SQP00651Filter setSQP00651(SQP00651Filter filter) throws SQLException, Exception {
        return percentCommissionFOBDAO.setSQP00651(filter);
    }
     public SQP00647Filter setSQP00647(SQP00647Filter filter) throws SQLException, Exception {
        return percentCommissionFOBDAO.setSQP00647(filter);
    }


}
