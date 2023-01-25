package net.miatech.praxis.logic.program;

//<editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.dao.program.LoadFacsimilDAO;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadFacsimilLogic {
    
    private LoadFacsimilDAO loadFacsimileDAO = new LoadFacsimilDAO();
    
    public LoadFacsimilLogic() {
    }
    
    public LoadFacsimilLogic(IServerSession ss) {
        loadFacsimileDAO.setSession(ss);
    }
    
    public void setSession(IServerSession ss) {
        loadFacsimileDAO.setSession(ss);
    }
    
    //Para Búsqueda de Facsimil ================================================
    // =========================================================================
    public FACSIMILFilter loadARCFacsimil(BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return loadFacsimileDAO.loadARCFacsimil(filter, hmCiudades);
    }

    public FACSIMILFilter loadASRFacsimil(BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return loadFacsimileDAO.loadASRFacsimil(filter, hmCiudades);
    }
    
    public FACSIMILFilter loadBSPFacsimil(BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return loadFacsimileDAO.loadBSPFacsimil(filter, hmCiudades);
    }
    
    //FIN DE REFUND
    public FACSIMILFilter loadFacsimileInterlineal(String calfa, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return loadFacsimileDAO.loadFacsimileInterlineal(calfa, filter, hmCiudades);
    }
}
