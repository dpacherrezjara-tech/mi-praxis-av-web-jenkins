package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1691Filter2;
import net.miatech.beans.A3729Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2149;
import net.miatech.praxis.dao.flown.FlightConciliationDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class FlightConciliationLogic {

    private FlightConciliationDAO objDAO = new FlightConciliationDAO();

    public FlightConciliationLogic() {
    }

    public FlightConciliationLogic(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1691Filter> loadPX095S01A1691(A1691Filter filter) throws SQLException, Exception {
        return objDAO.loadPX095S01A1691(filter);
    }

    public List<A1692Filter> loadPX095S09A1692(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX095S09A1692(filter, hmAeropuertos);
    }

    public List<A1691Filter2> loadPX095S02A1691(A1691Filter2 filter, String strTipo, HashMap hmAeropuertos, String f_Diff) throws SQLException, Exception {
        return objDAO.loadPX095S02A1691(filter, strTipo, hmAeropuertos, f_Diff);
    }

    public List<A1691Filter> loadPX095S15A1691(A1691Filter filter) throws SQLException, Exception {
        return objDAO.loadPX095S15A1691(filter);
    }

    public List<A3729Filter> loadPX095SGGA3729(A3729Filter filter) throws SQLException, Exception {
        return objDAO.loadPX095SGGA3729(filter);
    }

    public List<A3729Filter> loadPX095SQP04286(A3729Filter filter) throws SQLException, Exception {
        return objDAO.loadPX095SQP04286(filter);
    }

    public List<A1692Filter> loadPX095S05A1692(A1691Filter2 filter, String strTipo, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadPX095S05A1692(filter, strTipo, hmPaises);
    }

    public A1691Filter loadPX095S04A1691(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX095S04A1691(filter, hmAeropuertos);
    }

    public String loadPX095S08VALID(A1692Filter filter, String flag) throws SQLException, Exception {
        return objDAO.loadPX095S08VALID(filter, flag);
    }

    public String loadPX095S03A1691(A1691Filter filter, String strOption) throws SQLException {
        return objDAO.loadPX095S03A1691(filter, strOption);
    }

    public String loadPX095SQP04753(A3729Filter filter) throws SQLException {
        return objDAO.loadPX095SQP04753(filter);
    }

    public A1692Filter loadPX095S06A1692(String strTicket, String strSeq, HashMap<String, String> hmAeropuertos, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadPX095S06A1692(strTicket, strSeq, hmAeropuertos, hmPaises);
    }

    public A1692Filter loadPX095SQP0009(A1692Filter filter) throws SQLException, Exception {
        return objDAO.loadPX095SQP0009(filter);
    }

    public A1692Filter loadPX083SQP0008(A1692Filter filter) throws SQLException, Exception {
        return objDAO.loadPX083SQP0008(filter);
    }

    public String loadPX095S07A1692(A1692Filter filter, String strOption) throws SQLException, Exception {
        return objDAO.loadPX095S07A1692(filter, strOption);
    }

    public String loadPX095S12QCAL(A1692Filter filter, String recalculo) throws SQLException, Exception {
        return objDAO.loadPX095S12QCAL(filter, recalculo);
    }

    public List<A1692Filter> loadPX072S06A1692(A1692Filter filter, HashMap hmAeropuertos, HashMap hmPaises) throws SQLException, Exception {
        return objDAO.loadPX072S06A1692(filter, hmAeropuertos, hmPaises);
    }

    public A2149 insertFavoriteMenu(A2149 filter) throws Exception {
        return objDAO.insertFavoriteMenu(filter);
    }

    public A2149 deleteFavoriteMenu(A2149 filter) throws Exception {
        return objDAO.deleteFavoriteMenu(filter);
    }

    public A1692Filter loadPX095S06A1692_1(String strTicket, String strSeq, String seqRol, HashMap<String, String> hmAeropuertos, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadPX095S06A1692_1(strTicket, strSeq, seqRol, hmAeropuertos, hmPaises);
    }

    public HashMap loadSQP03651() throws SQLException, Exception {
        return objDAO.loadSQP03651();
    }

    public A3729Filter SQP04282(List<A3729Filter> lstData) throws Exception {
        return objDAO.SQP04282(lstData);
    }

    public A3729Filter SQP04400(List<A3729Filter> lstData) throws Exception {
        return objDAO.SQP04400(lstData);
    }

    public String SQP04320(A3729Filter filter) throws SQLException, Exception {
        return objDAO.SQP04320(filter);
    }

    public boolean SQP04321(A3729Filter filter) throws SQLException, Exception {
        return objDAO.SQP04321(filter);
    }

    public String SQP04323(A3729Filter filter) throws SQLException, Exception {
        return objDAO.SQP04323(filter);
    }

    public String SQP04550(A3729Filter filter) throws SQLException, Exception {
        return objDAO.SQP04550(filter);
    }

}
