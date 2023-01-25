package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.A2111Filter;
import net.miatech.beans.A2136Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2112;
import net.miatech.praxis.dao.interline.EstimationReverseARDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class EstimationReverseARLogic {
    
    private EstimationReverseARDAO objDAO = new EstimationReverseARDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    //Browser
    public List<A2111Filter> loadPX257S01A2111(A2111Filter filter) throws SQLException, Exception
    {
        return objDAO.loadPX257S01A2111(filter);
    }
    
    //Lista NRO GRUPO 
    public List<A2111Filter> loadPX257S03A2111() throws SQLException, Exception {
        return objDAO.loadPX257S03A2111();
    }
    
    //Lista CUENTAS
    public List<A1740Filter> loadCuentas() throws SQLException, Exception {
        return objDAO.loadCuentas();
    }
    
    //Lista Cuentas
    public List<A2112> loadPX257S01A2112(A2111Filter filter) throws SQLException, Exception {
        return objDAO.loadPX257S01A2112(filter);
    }
    
    //CRUDs 
    //Cabecera
    public String CRUDPX257S02A2111(A2111Filter filter, String strOption) throws SQLException, Exception {
        return objDAO.CRUDPX257S02A2111(filter, strOption);
    }
    
    //Estimados
    public String Estimados(List<A2111Filter> filter) throws SQLException, Exception {
        return objDAO.Estimados(filter);
    }
    
    //Polizas Procesadas
    public List<A2136Filter> loadResultadoDownload(String filter) throws SQLException, Exception
    {
        return objDAO.loadResultadoDownload(filter);
    }
    
    //Reversa
    public String Reversa(List<A2111Filter> filter) throws SQLException, Exception {
        return objDAO.Reversa(filter);
    }
}
