/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.LoadPayment02DAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2293Filter;

/**
 *
 * @author claudia
 */
public class LoadPayment02Logic {

    private LoadPayment02DAO loadPayment02DAO = new LoadPayment02DAO();

    public void setSession(IServerSession ss) {
        loadPayment02DAO.setSession(ss);
    }

//    public List<A2290Filter> loadPX287SQP00838(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP00838(filter);
//    }
//
//    public List<A2290Filter> loadPX287SQP00839(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP00839(filter);
//    }
//
//    public List<A2290Filter> loadPX287SQP00840(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP00840(filter);
//    }
//
//    public List<A2290Filter> loadPX287SQP00841(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP00841(filter);
//    }
//
//    public A2290Filter loadPX287SQP00844(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP00844(filter);
//    }
//
//    public String loadPX287SQP00845(A2290Filter filter, String strOption, UserView user) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP00845(filter, strOption, user);
//    }
//
//    public List<A2290Filter> loadPX297SQP00891(A2290Filter filter, HashMap<String, String> hmDescError,
//            HashMap<String, String> hmDescCard) throws SQLException {
//        return loadPayment02DAO.loadPX297SQP00891(filter, hmDescError, hmDescCard);
//    }
//
//    public A2290Filter loadPX297SQP00893(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX297SQP00893(filter);
//    }
//
    public List<A2290Filter> loadSQP00903(A2290Filter filter) throws SQLException, Exception {
        return loadPayment02DAO.loadSQP00903(filter);
    }
    
    public List<A2290Filter> loadSQP03985(A2290Filter filter) throws SQLException, Exception {
        return loadPayment02DAO.loadSQP03985(filter);
    }

    public String loadSQP00906(A2290Filter filter) throws SQLException, Exception {
        return loadPayment02DAO.loadSQP00906(filter);
    }
//
//    public List<A2290Filter> loadPX297SQP00915(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX297SQP00915(filter);
//    }
//
//    public List<A2290Filter> loadPX287SQP00924(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP00924(filter);
//    }
//
//    public List<A2290Filter> loadPX287SQP00925(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP00925(filter);
//    }
//
//    public List<A2290Filter> loadPX287SQP00926(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP00926(filter);
//    }
//
//    public List<A2290Filter> loadPX287SQP02055(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX287SQP02055(filter);
//    }
//
//    public List<A2290Filter> loadPX297SQP00940(A2290Filter filter, HashMap<String, String> hmDescError,
//            HashMap<String, String> hmDescCard) throws SQLException {
//        return loadPayment02DAO.loadPX297SQP00940(filter, hmDescError, hmDescCard);
//    }
//
//    public List<A2293Filter> loadPX311SQP00958(A2293Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX311SQP00958(filter);
//    }
//
//    public List<A2290Filter> loadPX297SQP00966(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX297SQP00966(filter);
//    }
//
//    public List<A1691Filter> loadPX330SQP01039(A1691Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX330SQP01039(filter);
//    }
//
//    public List<A2290Filter> loadPX297SQP01321(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX297SQP01321(filter);
//    }

    public String loadSQP01464(A2290Filter filter) throws SQLException, Exception {
        return loadPayment02DAO.loadSQP01464(filter);
    }

//    public String loadPX265SQP01448(A1691Filter filter, String option) throws SQLException {
//        return loadPayment02DAO.loadPX265SQP01448(filter, option);
//    }
//
//    public A1691Filter loadPX265SQP01449(A1691Filter filter) throws Exception {
//        return loadPayment02DAO.loadPX265SQP01449(filter);
//    }
//
//    public List<A1691Filter> loadPX265SQP01450() throws Exception {
//        return loadPayment02DAO.loadPX265SQP01450();
//    }
//
//    public int loadPXSQPCLP(A1691Filter filter) throws Exception {
//        return loadPayment02DAO.loadPXSQPCLP(filter);
//    }
//
//    public List<A2290Filter> loadPX407SQP01938(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX407SQP01938(filter);
//    }
//
//    public List<A2290Filter> loadPX407SQP01939(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX407SQP01939(filter);
//    }
//
//    public List<A2290Filter> loadPX407SQP01940(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX407SQP01940(filter);
//    }
//
//    public List<A2290Filter> loadPX407SQP01941(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX407SQP01941(filter);
//    }
//
//    public List<A2290Filter> loadPX407SQP01942(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX407SQP01942(filter);
//    }
//
//    public List<A2290Filter> loadPX407SQP01943(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX407SQP01943(filter);
//    }
//
//    public List<A2290Filter> loadPX407SQP01944(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX407SQP01944(filter);
//    }
//
//    public List<A2290Filter> loadPX407SQP01952(A2290Filter filter) throws SQLException {
//        return loadPayment02DAO.loadPX407SQP01952(filter);
//    }
}
