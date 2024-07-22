/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.StatementReconciliationsDAO;
import net.miatech.praxis.payment.MPF101;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author lmendoza
 */
public class StatementReconciliationsLogic {

    private final StatementReconciliationsDAO StatementReconciliationsDAO = new StatementReconciliationsDAO();

    public void setSession(IServerSession ss) {
        StatementReconciliationsDAO.setSession(ss);
    }

    public List<A2290Filter> loadPX287SQP00838(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00838(filter);
    }
    
    public List<A2290Filter> loadPX287SQP00838PEND(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00838PEND(filter);
    }

    public List<A2290Filter> loadPX287SQP00839(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00839(filter);
    }

    public List<A2290Filter> loadPX287SQP00839ByS(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00839ByS(filter);
    }
    
    public List<A2290Filter> loadPX287SQP00839ProceLiqByS(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00839ProceLiqByS(filter);
    }
    
    public List<A2290Filter> loadPX287SQP00839ByPend(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00839ByPend(filter);
    }

    public List<A2290Filter> loadPX287SQP00840(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00840(filter);
    }

    public List<A2290Filter> loadPX287SQP00840ByS(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00840ByS(filter);
    }
    
    public List<A2290Filter> loadPX287SQP00840DayProcLIQByS(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00840DayProcLIQByS(filter);
    }

    public List<A2290Filter> loadPX287SQP00841(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00841(filter);
    }
    
    public List<A2290Filter> loadPX287SQP00841DetailProceByS(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00841DetailProceByS(filter);
    }
    
    public List<A2290Filter> loadPX287SQP00841DetLiqDetail(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00841DetLiqDetail(filter);
    }

    public List<A2290Filter> loadPX287SQP00841ByS(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00841ByS(filter);
    }

    public List<A2290Filter> loadPX287SQP00842(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00842(filter);
    }

    public A2290Filter loadPX287SQP00844(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00844(filter);
    }

    public List<A2290Filter> loadPX269SQP05114Header(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05114Header(filter);
    }
    
    public List<A2290Filter> loadPX269SQP05114PreDetail(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05114PreDetail(filter);
    }
    
    public List<A2290Filter> loadPX269SQP05114Agrupa(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05114Agrupa(filter);
    }
    
    public List<A2290Filter> loadPX269SQP05114Detail(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05114Detail(filter);
    }

    public String loadPX269SQP05115(List<A2290Filter> filter, UserView user) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05115(filter, user);
    }
    
    public String loadPX269SQP05115Head(List<A2290Filter> filter, UserView user) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05115Head(filter, user);
    }
    
    public String loadPX287MPS100(List<MPF101> lst) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287MPS100(lst);
    }
}
