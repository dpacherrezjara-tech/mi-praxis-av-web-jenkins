package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.OCRLoadDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class OCRLoadLogic {

    private OCRLoadDAO objDAO = new OCRLoadDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1692Filter> loadPX083S01A1692TKT(A1692Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX083S01A1692TKT(filter, hmAeropuertos);
    }

    public List<A1692Filter> loadPX083S01A1692(A1692Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX083S01A1692(filter, hmAeropuertos);
    }

    public A1692Filter loadPX083SQP0068(String strTicket, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX083SQP0068(strTicket, hmAeropuertos);
    }

    public A1692Filter loadPX083SQP0008(A1692Filter filter) throws SQLException, Exception {
        return objDAO.loadPX083SQP0008(filter);
    }

    public String loadPX083SQP01281(A1692Filter filter, String flag) throws SQLException, Exception {
        return objDAO.loadPX083SQP01281(filter, flag);
    }

    public String loadPX083SQP0069(A1692Filter filter, String strOption) throws SQLException {
        return objDAO.loadPX083SQP0069(filter, strOption);
    }

    public String loadPX083SQP0070(A1692Filter filter) throws SQLException, Exception {
        return objDAO.loadPX083SQP0070(filter);
    }

    public String loadPX095SQP0071(A1692Filter filter) throws SQLException, Exception {
        return objDAO.loadPX095SQP0071(filter);
    }

    public String loadPX095S12QCAL(A1692Filter filter, String recalculo) throws SQLException, Exception {
        return objDAO.loadPX095S12QCAL(filter, recalculo);
    }

    public String loadPX083SQP0072(A1692Filter filter, String strOption) throws SQLException {
        return objDAO.loadPX083SQP0072(filter, strOption);
    }
}
