package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ConsortiaAdjDAO;
import net.miatech.praxisbi.A1955Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ConsortiaAdjLogic {

    private ConsortiaAdjDAO objDAO = new ConsortiaAdjDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<A1955Filter> search(A1955Filter filter) throws SQLException, Exception {
        return objDAO.search(filter);
    }
    
    public String accountMaintance(A1955Filter filter, String strOption) throws SQLException, Exception {
        return objDAO.accountMaintance(filter, strOption);
    }
    
    public A1955Filter searchReversa(A1955Filter filter) throws SQLException
    {
        return objDAO.searchReversa(filter);
    }
    
    public String reversaSales(A1955Filter filter, String fuente, String tipo) throws SQLException {
        return objDAO.reversaSales(filter, fuente, tipo);
    }
    
    public String reversaSalesReg(String fechaproceso, String fecharegistro,String tipo) throws SQLException {
        return objDAO.reversaSalesReg(fechaproceso,fecharegistro, tipo);
    }
    
    public String reversaInterlineAP(A1955Filter filter) throws SQLException {
        return objDAO.reversaInterlineAP(filter);
    }
    
    public String reversaInterlineAR(A1955Filter filter) throws SQLException {
        return objDAO.reversaInterlineAR(filter);
    }
    
    public String reversaFlown(A1955Filter filter) throws SQLException {
        return objDAO.reversaFlown(filter);
    }
    
    public String consistenciaFlown(A1955Filter filter) throws SQLException {
        return objDAO.consistenciaFlown(filter);
    }
    
    public String reversaCaducos(A1955Filter filter) throws SQLException {
        return objDAO.reversaCaducos(filter);
    }
    
    public String accountMaintancePending(A1955Filter filter, String strOption) throws SQLException {
        return objDAO.accountMaintancePending(filter, strOption);
    }
    
    public List<A1955Filter> SQP04042(A1955Filter filter) throws SQLException, Exception {
        return objDAO.SQP04042(filter);
    }
}
