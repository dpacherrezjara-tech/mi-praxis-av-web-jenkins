/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.StatementReconciliationsDAO;
import net.miatech.praxis.payment.MPF101;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.MPF100Filter;

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
    public Map<String, Object> loadPX002CASH(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX002CASH(filter);
    }
    
    //detalle cash
    
    
    public List<A2290Filter> loadDetalleCASH(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadDetalleCASH(filter);
    }
    
    ///
    public List<A2290Filter> loadPXSalesDirect(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPXSalesDirect(filter);
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
    
    public List<A2290Filter> loadPX287SQP00842MPF060(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00842MPF060(filter);
    }

    public A2290Filter loadPX287SQP00844(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00844(filter);
    }
    public A2290Filter loadPXSQP005CASH(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPXSQP005CASH(filter);
    }
    public A2290Filter loadPXSQP005CASHSALESDIRECT(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPXSQP005CASHSALESDIRECT(filter);
    }
    
    public A2290Filter loadPX287SQP00844MPF060_DE(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287SQP00844MPF060_DE(filter);
    }

    public List<A2290Filter> loadPX269SQP05114Header(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05114Header(filter);
    }
    
    public List<A2290Filter> loadPX269SQP05114PreDetail(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05114PreDetail(filter);
    }
    
    public List<A2290Filter> loadPX269SQP05114PreDetailFees(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05114PreDetailFees(filter);
    }
    
    public List<A2290Filter> loadPX269SQP05114Agrupa(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05114Agrupa(filter);
    }
    
    public List<A2290Filter> loadPX269SQP05114Detail(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05114Detail(filter);
    }
    public List<A2290Filter> loadPXDetailCASHLIQUID(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPXDetailCASHLIQUID(filter);
    }
    public List<A2290Filter> loadPXDetailSalesDirect(A2290Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPXDetailSalesDirect(filter);
    }

    public String loadPX269SQP05115(List<A2290Filter> filter, UserView user) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05115(filter, user);
    }
    
    public A2290Filter SQPREVERSA_MPF102_F1(A2290Filter filter, UserView user) throws SQLException, Exception {
        return StatementReconciliationsDAO.SQPREVERSA_MPF102_F1(filter, user);
    }
    
    public A2290Filter SQPMPP082_MPF132(UserView user) throws SQLException, Exception {
        return StatementReconciliationsDAO.SQPMPP082_MPF132(user);
    }
    
    public String loadPX269SQP05115Head(List<A2290Filter> filter, UserView user) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05115Head(filter, user);
    }
    
    public String loadPX269SQP05115MPF060_UPDATE(A2290Filter filter, String option) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX269SQP05115MPF060_UPDATE(filter, option);
    }
    
    public String loadPX287MPS100(List<MPF101> lst) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287MPS100(lst);
    }
    
    public String loadPX287MPS106(List<MPF101> lst) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadPX287MPS106(lst);
    }
    
    public List<MPF101> CONFIEC(String BANDOC) throws SQLException, Exception {
        return StatementReconciliationsDAO.CONFIEC(BANDOC);
    }
    
    public List<MPF101> CONFILIQ(String Query, String TDOC) throws SQLException, Exception {
        return StatementReconciliationsDAO.CONFILIQ(Query, TDOC);
    }
    public List<MPF101> CONFILIQ_SEQ(String Query, String TDOC) throws SQLException, Exception {
        return StatementReconciliationsDAO.CONFILIQ_SEQ(Query, TDOC);
    }
    
    public boolean CONCILIA1(String QUERY ,String ban,String dateci,String tranci,int qty,String netos) throws SQLException, Exception {
        return StatementReconciliationsDAO.CONCILIA1( QUERY , ban, dateci, tranci, qty, netos);
    }
    
    public boolean CONCILIA2(String QUERY ,String ban,String dateci,String tranci,String valdate,String prda,String Tdoc) throws SQLException, Exception {
        return StatementReconciliationsDAO.CONCILIA2( QUERY , ban, dateci, tranci, valdate, prda, Tdoc);
    }
    
    public boolean CONCILIA2_SEQ(String QUERY ,String ban,String dateci,String tranci,String valdate,String prda,String Tdoc) throws SQLException, Exception {
        return StatementReconciliationsDAO.CONCILIA2_SEQ( QUERY , ban, dateci, tranci, valdate, prda, Tdoc);
    }
    
    public MPF101 GET_TOLERANCIA(String Adate) throws SQLException, Exception {
        return StatementReconciliationsDAO.GET_TOLERANCIA(Adate);
    }
            
    //CASH
    public List<MPF100Filter> loadCashSummaryMain(MPF100Filter filter) throws SQLException, Exception {
        return StatementReconciliationsDAO.loadCashSummaryMain(filter);
    }
    
}
