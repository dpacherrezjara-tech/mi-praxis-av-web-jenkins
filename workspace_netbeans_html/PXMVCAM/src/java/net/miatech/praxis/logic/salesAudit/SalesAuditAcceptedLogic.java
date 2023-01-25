package net.miatech.praxis.logic.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A1674Filter;
import net.miatech.beans.SaleAudit.A1675Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter_1;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.dao.salesAudit.SalesAuditAcceptedDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class SalesAuditAcceptedLogic {

    private SalesAuditAcceptedDAO objDAO = new SalesAuditAcceptedDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP00989Filter> Search(SQP00989Filter filter) throws SQLException, Exception {
        return objDAO.Search(filter);
    }

    public SQP00989Filter searchADMData(FACSIMILFilter filter, List<SQP00989Filter> lstSelectedTkts) throws SQLException, Exception {
        return objDAO.searchADMData(filter, lstSelectedTkts);
    }

    public List<A1248> loadFieldsConditions() throws Exception {
        return objDAO.loadFieldsConditions();
    }

    public List<A1248> loadFields() throws Exception {
        return objDAO.loadFields();
    }

    public List<A1248> loadFields2() throws Exception {
        return objDAO.loadFields2();
    }

    public List<SQP00989Filter> search_Pattern(SQP00989Filter filter) throws SQLException, Exception {
        return objDAO.search_Pattern(filter);
    }

    public List<A1580Filter> lstComponent(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstComponent(filter);
    }

    public List<A1580Filter> lstComponentUsed(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstComponentUsed(filter);
    }

    public List<A1580Filter> lstComponentOld(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstComponentOld(filter);
    }

    public List<A1673Filter> lstTax(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstTax(filter);
    }

    public SQP00989Filter searchADMData(A1672Filter filter) throws SQLException, Exception {
        return objDAO.searchADMData(filter);
    }

    public List<A1672Filter> lstItinerary(A1672Filter filter) throws SQLException, Exception {
        return objDAO.lstItinerary(filter);
    }

    public List<A1673Filter> searchLstTax(A1672Filter filter) throws SQLException, Exception {
        return objDAO.searchLstTax(filter);
    }

    public List<A1674Filter> searchLstCommission(A1672Filter filter) throws SQLException, Exception {
        return objDAO.searchLstCommission(filter);
    }

    public List<A1675Filter> searchLstTaxOnComi(A1672Filter filter) throws SQLException, Exception {
        return objDAO.searchLstTaxOnComi(filter);
    }

    public List<SQP00989Filter> searchLstRazones(A1672Filter filter) throws SQLException, Exception {
        return objDAO.searchLstRazones(filter);
    }

    public List<SQP00989Filter> searchLstFOP(A1672Filter filter) throws SQLException, Exception {
        return objDAO.searchLstFOP(filter);
    }

    public List<A1672Filter> loadTracing(A1672Filter filter) throws SQLException, Exception {
        return objDAO.loadTracing(filter);
    }
    
    public String insertTracing(SQP00989Filter filter,ArrayList<SQP00989Filter> lstSelectedTkts, String NAMEARCHV) throws SQLException, Exception {
        return objDAO.insertTracing(filter,lstSelectedTkts, NAMEARCHV);
    }
    public String Group() throws SQLException, Exception {
        return objDAO.Group();
    }
    
    public String searchIDFILE(A1672Filter filter) throws SQLException, Exception {
        return objDAO.searchIDFILE(filter);
    }

}
