package net.miatech.praxis.logic.program;

//<editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.dao.program.ProrrateoNewDAO;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
public class ProrrateoNewLogic {
    
    private ProrrateoNewDAO ProrrateoNewDAO = new ProrrateoNewDAO();
    
    public ProrrateoNewLogic() {
    }
    
    public ProrrateoNewLogic(IServerSession ss) {
        ProrrateoNewDAO.setSession(ss);
    }
    
    public void setSession(IServerSession ss) {
        ProrrateoNewDAO.setSession(ss);
    }
    
    //Para Búsqueda de Facsimil ================================================
    // =========================================================================
    public FACSIMILFilter loadBSPFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return ProrrateoNewDAO.loadBSPFacsimilProrate(ccust, filter, hmCiudades);
    }
    
    public FACSIMILFilter loadISRFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException , Exception{
        return ProrrateoNewDAO.loadISRFacsimilProrate(ccust, filter, hmCiudades);
    } 

    public FACSIMILFilter loadARCFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return ProrrateoNewDAO.loadARCFacsimilProrate(ccust, filter, hmCiudades);
    }

    public List<FACSIMILFilter> searchA713(String TDNR, String Seq) throws SQLException, Exception {
        return ProrrateoNewDAO.searchA713(TDNR, Seq);
    }

    public FACSIMILFilter loadASRFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return ProrrateoNewDAO.loadASRFacsimilProrate(ccust, filter, hmCiudades);
    }

    public String searchDelivery(String ccust, FACSIMILFilter filter, String fuente) throws SQLException, Exception {
        return ProrrateoNewDAO.searchDelivery(ccust, filter, fuente);
    }
    
    public List<FACSIMILFilter> searchA720(String TDNR, String VTR) throws SQLException, Exception {
        return ProrrateoNewDAO.searchA720(TDNR, VTR);
    }
    
    public List<FACSIMILFilter> searchA730(String TDNR, String TCNR) throws SQLException, Exception {
        return ProrrateoNewDAO.searchA730(TDNR, TCNR);
    }

    public String searchDeliveryRFND(String ccust, FACSIMILFilter filter, String fuente) throws SQLException, Exception {
        return ProrrateoNewDAO.searchDeliveryRFND(ccust, filter, fuente);
    }
    
    public String searchDeliveryMEMO(String ccust, FACSIMILFilter filter, String fuente) throws SQLException, Exception {
        return ProrrateoNewDAO.searchDeliveryMEMO(ccust, filter, fuente);
    }

    public S0007A720Filter verifyTKT(String TDNR) throws SQLException, Exception {
        return ProrrateoNewDAO.verifyTKT(TDNR);
    }

    public List<FACSIMILFilter> searchAgent(String AGTN) throws SQLException, Exception {
        return ProrrateoNewDAO.searchAgent(AGTN);
    }
    
    public List<A1692Filter> loadSQP00293_Leg(String ccia, String forma, String serie, String cupon) throws SQLException, Exception {
        return ProrrateoNewDAO.loadSQP00293_Leg(ccia, forma, serie, cupon);
    }

    public List<FACSIMILFilter> loadSQP00778(String ccust, FACSIMILFilter filter) throws SQLException, Exception {
        return ProrrateoNewDAO.loadSQP00778(ccust, filter);
    }
    
}
