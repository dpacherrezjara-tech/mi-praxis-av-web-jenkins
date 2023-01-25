/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00874Filter;
import net.miatech.beans.SaleAudit.SQP01023Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.DataEntryPolizasOracleDAO;

/**
 *
 * @author zperez
 */
public class DataEntryPolizasOracleLogic {

    public DataEntryPolizasOracleDAO PolizasOracleDAO = new DataEntryPolizasOracleDAO();

    public void setSession(IServerSession ss) {
        PolizasOracleDAO.setSession(ss);
    }

    public List<SQP01023Filter> searchOracle(SQP01023Filter filter) throws SQLException, Exception {
        return PolizasOracleDAO.searchOracle(filter);
    }

    public List<SQP00874Filter> searchBspLink(SQP00874Filter filter) throws SQLException, Exception {
        return PolizasOracleDAO.searchBspLink(filter);
    }

    public String executeNumber(SQP00874Filter filter) throws SQLException, Exception {
        return PolizasOracleDAO.executeNumber(filter);
    }

    public String ProcExecuteOracle(ArrayList<SQP00874Filter> filter, String type) throws SQLException, Exception {
        return PolizasOracleDAO.ProcExecuteOracle(filter, type);
    }

    public List<SQP00874Filter> searchDetaOracleQuery(SQP00874Filter filter, String Option) throws SQLException, Exception {
        return PolizasOracleDAO.searchDetaOracleQuery(filter, Option);
    }

    public String ProceOracleARC(ArrayList<SQP00874Filter> filter) throws SQLException, Exception {
        return PolizasOracleDAO.ProceOracleARC(filter);
    }

    public List<SQP00874Filter> searchDetaOracleARC(SQP00874Filter filter, String Option) throws SQLException, Exception {
        return PolizasOracleDAO.searchDetaOracleARC(filter, Option);
    }

    public String ProceOracleASR(ArrayList<SQP00874Filter> filter) throws SQLException, Exception {
        return PolizasOracleDAO.ProceOracleASR(filter);
    }

    public List<SQP00874Filter> searchDetaOracleASR(SQP00874Filter filter, String Option) throws SQLException, Exception {
        return PolizasOracleDAO.searchDetaOracleASR(filter, Option);
    }

}
