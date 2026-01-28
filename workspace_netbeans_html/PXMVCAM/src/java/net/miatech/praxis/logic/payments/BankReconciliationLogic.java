/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.dao.payments.BankReconciliationDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2309AFilter;
import net.miatech.praxis.payment.filter.MPF100Filter;
import net.miatech.praxis.spring.INF020;

/**
 *
 * @author jtorres
 */
public class BankReconciliationLogic {

    private final BankReconciliationDAO bankReconciliationDAO = new BankReconciliationDAO();

    public void setSession(IServerSession ss) {
        bankReconciliationDAO.setSession(ss);
    }

    public List<A2290Filter> loadPX269SQP00698Main(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Main(filter);
    }
    
    public List<A2290Filter> loadPX287SQP00838(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX287SQP00838(filter);
    }

    public List<A2290Filter> loadPX269SQP00698Country(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Country(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698Core(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Core(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698CountryDebits(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698CountryDebits(filter);
    }

    public List<A2290Filter> loadPX269SQP00698Day(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Day(filter);
    }

    public List<A2290Filter> loadPX269SQP00698Detalle(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Detalle(filter);
    }

    public List<A2290Filter> loadPX269SQP00698Ticket(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Ticket(filter);
    }
    public List<A2290Filter> loadPX269SQP00698Table_REFND(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Table_REFND(filter);
    }
    public List<A2290Filter> loadPX269SQP00698Table_CHGBAK(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Table_CHGBAK(filter);
    }
    public List<A2290Filter> loadPX269SQP00698Table_ACREDIT(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Table_ACREDIT(filter);
    }

    public A2290Filter loadPX269SQP00833(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833(filter);
    }

    public A2290Filter loadPX269SQPXXX(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQPXXX(filter);
    }
    
     public A2290Filter loadPX269SQPVALIADJ(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQPVALIADJ(filter);
    }

    public String loadPX269SQP00834(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00834(filters, user);
    }
    public String loadPX269SQP00834_REFND(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00834_REFND(filters, user);
    }
    
    public String loadPX269SQP00834_CHGBAK(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00834_CHGBAK(filters, user);
    }
    
    public String loadPX269SQP00834_ACREDIT(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00834_ACREDIT(filters, user);
    }
    
    public String loadPX269SQP00834_TKTTW(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00834_TKTTW(filters, user);
    }

    public String loadPX269SQP05117(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05117(filters, user);
    }
    
    public String loadPX269MPS287(A2290Filter filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269MPS287(filters, user);
    }
    
    public String loadPX269SQP05117_REFND(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05117_REFND(filters, user);
    }
    
    public String loadPX269SQP05117_CHGBAK(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05117_CHGBAK(filters, user);
    }
    
    public String loadPX269SQP05117_ACREDIT(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05117_ACREDIT(filters, user);
    }

    public String loadPX269SQP05117OnlyLiq(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05117OnlyLiq(filters, user);
    }
    
    public String loadPX269SQP05117OnlyLiq_REFND(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05117OnlyLiq_REFND(filters, user);
    }
    
    public String loadPX269SQP05117OnlyLiq_CHGBAK(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05117OnlyLiq_CHGBAK(filters, user);
    }
    
    public String loadPX269SQP05117OnlyLiq_ACREDIT(List<A2290Filter> filters, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05117OnlyLiq_ACREDIT(filters, user);
    }

    public List<A2290Filter> loadPX269SQP00869(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00869(filter);
    }

    public List<A2290Filter> loadPX269SQP00870(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00870(filter);
    }

    public List<A2290Filter> loadPX269SQP00871(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00871(filter);
    }
    

    public String loadPX269SQP01950(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP01950(filter);
    }

    public List<A2290Filter> loadPX269SQP02193(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP02193(filter);
    }

    public String loadPX263SQP02194(A2290Filter filter, UserView user, String accion) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX263SQP02194(filter, user, accion);
    }

    public HashMap<String, List<A2290Filter>> loadPX263SQP03989(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX263SQP03989(filter);
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_DETAIL(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_MDP_DETAIL(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00833_MDP_REVERSED(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_MDP_REVERSED(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00833_REFND_DETAIL(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_REFND_DETAIL(filter);
    }
    public List<A2290Filter> loadPX269SQP00833_CHGBAK_DETAIL(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_CHGBAK_DETAIL(filter);
    }
    public List<A2290Filter> loadPX269SQP00833_ACREDIT_DETAIL(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_ACREDIT_DETAIL(filter);
    }

    public List<A2290Filter> loadPX269SQP05103(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05103(filter);
    }
    
    public List<A2290Filter> loadPX269SQP05103_DEBITYPE(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05103_DEBITYPE(filter);
    }

    public List<A2290Filter> loadPX269SQP05103F(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05103F(filter);
    }

    public List<A2290Filter> loadPX269SQP05103T(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP05103T(filter);
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_MDP_SCAN(filter);
    }

    public List<A2290Filter> loadPX269SQP00833_MDP_SCAN_PENDING(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_MDP_SCAN_PENDING(filter);
    }
    public List<A2290Filter> loadPXBeanTicketAgent(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPXBeanTicketAgent(filter);
    }
    //loadPX269SQP00833_DEBITS_SCAN_PENDING
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_PENDING(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_DEBITS_SCAN_PENDING(filter);
    }
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_PENDING_CHGBAK(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_DEBITS_SCAN_PENDING_CHGBAK(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_PENDING_ACREDIT(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_DEBITS_SCAN_PENDING_ACREDIT(filter);
    }
    public List<A2290Filter> loadPX269SQP00833_TktTw_SCAN_PENDING(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_TktTw_SCAN_PENDING(filter);
    }
    //loadPX269SQP00833_DEBITS_SCAN
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_DEBITS_SCAN(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_CHGBAK(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_DEBITS_SCAN_CHGBAK(filter);
    }
    //loadPX269SQP00833_DEBITS_SCAN_ACREDIT
    public List<A2290Filter> loadPX269SQP00833_DEBITS_SCAN_ACREDIT(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_DEBITS_SCAN_ACREDIT(filter);
    }
    public List<A2290Filter> loadPX269SQP00871JT(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00871JT(filter);
    }
    //loadPX263SQP00652DEBITS
    public List<A2290Filter> loadPX263SQP00652DEBITS(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX263SQP00652DEBITS(filter);
    }
    public List<A2290Filter> loadPX263SQP00676_DEBITS(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX263SQP00676_DEBITS(filter);
    }
    public HashMap<String, List<A2290Filter>> loadPX263SQP00715_DEBITS(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX263SQP00715_DEBITS(filter);
    }
    public List<A1248> loadSQP03739(String tabla) throws Exception {
        return bankReconciliationDAO.loadSQP03739(tabla);
    }

    public List<A1248> loadOperadores() throws Exception {
        return bankReconciliationDAO.loadOperadores();
    }

    public List<A2290Filter> loadAuditores() throws Exception {
        return bankReconciliationDAO.loadAuditores();
    }

    public INF020 loadUserInfo() throws Exception {
        return bankReconciliationDAO.loadUserInfo();
    }

    public String asginarTW(A2290Filter filter) throws Exception {
        return bankReconciliationDAO.asginarTW(filter);
    }
    
    public A2290Filter massiveReverseADM(List<A2290Filter> lstData, UserView user) throws Exception {
        return bankReconciliationDAO.massiveReverseADM(lstData,user );
    }

    public List<A2290Filter> loadPX269SQPMPF100(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQPMPF100(filter);
    }

    public List<A2290Filter> loadgetIatas(String fecha) throws Exception {
        return bankReconciliationDAO.loadgetIatas(fecha);
    }
    
    public List<A2290Filter> loadPX269SQP00698Detalle2(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698Detalle2(filter);
    }
    
    

//    FTG
    
    public String loadPX598update_cerror_conci(A2290Filter filter, UserView user) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX598update_cerror_conci(filter,user);
    }
    
    public List<A2290Filter> loadPX269SQP00698MainCash(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698MainCash(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698CountryCash(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698CountryCash(filter);
    }

    
    public List<A2290Filter> loadLISTAR_MPF199(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadLISTAR_MPF199(filter);
    }
    
    public List<A2290Filter> getPendingAmountsIndia(String dateLimit) throws SQLException, Exception {
    if (dateLimit == null || dateLimit.isEmpty()) {
        return new ArrayList<>(); 
    }
    return bankReconciliationDAO.getPendingAmountsIndia(dateLimit);
}
    
    public List<A2290Filter> loadLISTAR_MPF223(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadLISTAR_MPF223(filter);
    }
    /// CARTERA LIST       
            
     public List<A2290Filter> loadLISTAR_CARTERAMPF199(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadLISTAR_CARTERAMPF199(filter);
    }
     
//     // Agregamos el parámetro String tipo
//    public String processFaseDosConciliation(String tipo) throws SQLException, Exception {
//        return bankReconciliationDAO.processFaseDosConciliation(tipo);
//    }
//         
    
    
     public String MPF199Update(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.MPF199Update(filter);
    }
     
     
     
      public String MPF199Insert(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.MPF199Insert(filter);
    }
    public String MPF199InsertArgentina(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.MPF199InsertArgentina(filter);
    }
    public String MPF199UpdateIndia(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.MPF199UpdateIndia(filter);
    }
//    public String processFaseDosConciliation() throws SQLException, Exception {
//        return bankReconciliationDAO.processFaseDosConciliation();
//    }
     
     
     
     public String ConciliacionAdjust(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.ConciliacionAdjust(filter);
    }
     public String ConciliationAddAdjust(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.ConciliationAddAdjust(filter);
    }
    
    public String executeIndiaConciliationBatch(A2290Filter bean) throws Exception {
        return bankReconciliationDAO.executeIndiaConciliationBatch(bean);
    }
    
    

    public List<A2290Filter> loadPX269SQP00698DayCash(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698DayCash(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00698DetalleCash(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00698DetalleCash(filter);
    }

    public A2290Filter loadPX269SQPXXXCash(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQPXXXCash(filter);
    }
    
    public List<A2290Filter> loadPX269SQP00833_MDP_DETAILCASH(A2290Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadPX269SQP00833_MDP_DETAILCASH(filter);
    }
    
    public List<MPF100Filter> loadMPS306_AMDP_SCANCASH(MPF100Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.loadMPS306_AMDP_SCANCASH(filter);
    }
    public MPF100Filter ConciliationManualCash(MPF100Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.ConciliationManualCash(filter);
    }
    
    public MPF100Filter AssignCashComment(MPF100Filter filter) throws SQLException, Exception {
        return bankReconciliationDAO.AssignCashComment(filter);
    }
}
