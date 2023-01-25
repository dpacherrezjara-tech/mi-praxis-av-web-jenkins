package net.miatech.praxis.logic.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A3807Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.dao.salesAudit.ADMReportDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ADMReportLogic {

    private ADMReportDAO reportADMDAO = new ADMReportDAO();

    public void setSession(IServerSession ss) {
        reportADMDAO.setSession(ss);
    }

    public List<SQP00911Filter> SearchReportADM(SQP00911Filter filter) throws SQLException, Exception {
        return reportADMDAO.SearchReportADM(filter);
    }

    public List<A1580Filter> SearchCalcuArelonia(A1580Filter filter) throws SQLException, Exception {
        return reportADMDAO.SearchCalcuArelonia(filter);
    }

    public List<A1673Filter> SearchCalcuImpuestos(A1673Filter filter) throws SQLException, Exception {
        return reportADMDAO.SearchCalcuImpuestos(filter);
    }

    public List<A2553> loadTracing(A2553 filter) throws SQLException, Exception {
        return reportADMDAO.loadTracing(filter);
    }

    public List<SQP00911Filter> lstRazones(A2553 filter) throws SQLException, Exception {
        return reportADMDAO.lstRazones(filter);
    }

    public List<SQP00911Filter> lstTKTS(A2553 filter) throws SQLException, Exception {
        return reportADMDAO.lstTKTS(filter);
    }

    public String insertTracing(A2553 filter) throws SQLException, Exception {
        return reportADMDAO.insertTracing(filter);
    }

    public List<A1673Filter> searchLstProvisi(A1673Filter filter) throws SQLException, Exception {
        return reportADMDAO.searchLstProvisi(filter);
    }
    public String insertTKT(ArrayList<SQP00911Filter> filter) throws SQLException, Exception {
        return reportADMDAO.insertTKT(filter);
    }
    public String insertLisTracingFile(ArrayList<SQP00911Filter> ListDebitos,A2553 filter) throws SQLException, Exception {
        return reportADMDAO.insertLisTracingFile(ListDebitos,filter);
    }
    
    public SQP00911Filter SearchDataIni(SQP00911Filter filter) throws SQLException, Exception {
        return reportADMDAO.SearchDataIni(filter);
    }
    public List<A3807Filter> SearchTasaIva(A3807Filter filter) throws SQLException, Exception {
        return reportADMDAO.SearchTasaIva(filter);
    }
}
