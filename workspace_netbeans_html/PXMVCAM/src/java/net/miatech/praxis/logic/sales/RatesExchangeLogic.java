/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A018Filter;
import net.miatech.beans.A110Filter;
import net.miatech.beans.A1343Filter;
import net.miatech.beans.A1526Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.RatesExchangeDAO;

/**
 *
 * @author lmendoza
 */
public class RatesExchangeLogic {

    private final RatesExchangeDAO ratesExchangeDAO = new RatesExchangeDAO();

    public void setSession(IServerSession ss) {
        ratesExchangeDAO.setSession(ss);

    }

    public List<A018Filter> loadPX025S03A018(A018Filter filter) throws SQLException, Exception {
        return ratesExchangeDAO.loadPX025S03A018(filter);
    }

    public List<A110Filter> loadPX025S01A110(A110Filter filter) throws SQLException, Exception {
        return ratesExchangeDAO.loadPX025S01A110(filter);
    }

    public List<A1343Filter> loadPX025S03A1343(A1343Filter filter) throws SQLException, Exception {
        return ratesExchangeDAO.loadPX025S03A1343(filter);
    }

    public List<A1526Filter> loadPX025S01A1526(A1526Filter filter) throws SQLException, Exception {
        return ratesExchangeDAO.loadPX025S01A1526(filter);
    }
    public List<A1526Filter> loadPX025S01A4061(A1526Filter filter) throws SQLException, Exception {
        return ratesExchangeDAO.loadPX025S01A4061(filter);
    }
    

    public String SQP00820(A1526Filter filter, String opcion) throws SQLException, Exception {
        return ratesExchangeDAO.SQP00820(filter, opcion);
    }
}
