package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.OracleAccountingReportDAO;
import net.miatech.praxisbi.SQP01257;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class OracleAccountingReportLogic {

    private OracleAccountingReportDAO objDAO = new OracleAccountingReportDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP01257> loadSQP01257(SQP01257 filter) throws SQLException, Exception
    {
        return objDAO.loadSQP01257(filter);
    }
    
    public List<SQP01257> loadSQP01258(SQP01257 filter) throws SQLException, Exception
    {
        return objDAO.loadSQP01258(filter);
    }
}
