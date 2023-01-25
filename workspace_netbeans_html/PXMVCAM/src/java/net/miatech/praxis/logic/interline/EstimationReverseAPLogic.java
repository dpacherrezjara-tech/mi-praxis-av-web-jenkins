package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.A2111Filter;
import net.miatech.beans.A2134Filter;
import net.miatech.beans.A2136Filter;
import net.miatech.beans.A2137Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2112;
import net.miatech.praxis.A2135;
import net.miatech.praxis.dao.interline.EstimationReverseAPDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class EstimationReverseAPLogic {
    
    private EstimationReverseAPDAO objDAO = new EstimationReverseAPDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    //Browser
    public List<A2134Filter> loadPX260S01A2134(A2134Filter filter) throws SQLException, Exception
    {
        return objDAO.loadPX260S01A2134(filter);
    }
    
    //Lista NRO GRUPO 
    public List<A2134Filter> loadPX260S03A2134() throws SQLException, Exception {
        return objDAO.loadPX260S03A2134();
    }
    
    //Lista CUENTAS
    public List<A1740Filter> loadCuentas() throws SQLException, Exception {
        return objDAO.loadCuentas();
    }
    
    //Lista Cuentas
    public List<A2135> loadPX260S01A2135(A2134Filter filter) throws SQLException, Exception {
        return objDAO.loadPX260S01A2135(filter);
    }
    
    //CRUDs 
    //Cabecera
    public String CRUDPX260S02A2134(A2134Filter filter, String strOption) throws SQLException, Exception {
        return objDAO.CRUDPX260S02A2134(filter, strOption);
    }
    
    //Estimados
    public String Estimados(List<A2134Filter> filter) throws SQLException, Exception {
        return objDAO.Estimados(filter);
    }
    
    //Polizas Procesadas
    public List<A2137Filter> loadResultadoDownload(String filter) throws SQLException, Exception {
        return objDAO.loadResultadoDownload(filter);
    }
    
    //Reversa
    public String Reversa(List<A2134Filter> filter) throws SQLException, Exception {
        return objDAO.Reversa(filter);
    }
}
