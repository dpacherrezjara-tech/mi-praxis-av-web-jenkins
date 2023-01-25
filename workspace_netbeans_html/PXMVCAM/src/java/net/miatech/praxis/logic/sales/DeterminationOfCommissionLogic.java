package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A2960Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.SaleAudit.SQP01362Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.dao.sales.DeterminationOfCommissionDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class DeterminationOfCommissionLogic {

    private DeterminationOfCommissionDAO objDAO = new DeterminationOfCommissionDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public   List<SQP01362Filter> getListTicketTesting(SQP01362Filter filter) throws SQLException, Exception {
       return objDAO.getListTicketTesting(filter);
    }
    
    public   List<SQP01362Filter> getListTicket(SQP01362Filter filter) throws SQLException, Exception {
       return objDAO.getListTicket(filter);
    }
    
    public   List<A051> getListSchema(SQP01362Filter filter) throws SQLException, Exception {
       return objDAO.getListSchema(filter);
    }
    
    public   List<SQP01362Filter> getListFPROC(SQP01362Filter filter) throws SQLException, Exception {
       return objDAO.getListFPROC(filter);
    }
    
    public   List<SQP01362Filter> getListFPROCTesting(SQP01362Filter filter) throws SQLException, Exception {
       return objDAO.getListFPROCTesting(filter);
    }
    
    public String getLoadCommiADMACM(A2960Filter filter) throws SQLException, Exception {
        return objDAO.getLoadCommiADMACM(filter);
    }
    
    public   List<SQP00911Filter> SearchReportADM(SQP00911Filter filter) throws SQLException, Exception {
        return objDAO.SearchReportADM(filter);
    }
    
    public   List<A1580Filter> SearchCalcuArelonia(A1580Filter filter) throws SQLException, Exception {
        return objDAO.SearchCalcuArelonia(filter);
    }
    
    public   List<A1673Filter> SearchCalcuImpuestos(A1673Filter filter) throws SQLException, Exception {
        return objDAO.SearchCalcuImpuestos(filter);
    }
    
    public   List<SQP01362Filter> getListFPROCHISTORY(SQP01362Filter filter) throws SQLException, Exception {
       return objDAO.getListFPROCHISTORY(filter);
    }   
}
