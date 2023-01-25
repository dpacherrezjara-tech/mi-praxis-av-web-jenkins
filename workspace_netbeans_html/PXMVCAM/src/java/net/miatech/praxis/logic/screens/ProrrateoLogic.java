/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.screens;

//<editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.TCNFilter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.dao.screens.ProrrateoDAO;

//</editor-fold>

/**
 *
 * @author lmendoza
 */
public class ProrrateoLogic {

    private final ProrrateoDAO prorrateoDAO = new ProrrateoDAO();

    public void setSession(IServerSession ss) {
        prorrateoDAO.setSession(ss);

    }

    public FACSIMILFilter loadASRFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return prorrateoDAO.loadASRFacsimilProrate(ccust, filter, hmCiudades);
    }

    public FACSIMILFilter loadBSPFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return prorrateoDAO.loadBSPFacsimilProrate(ccust, filter, hmCiudades);
    }

    public FACSIMILFilter loadARCFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        return prorrateoDAO.loadARCFacsimilProrate(ccust, filter, hmCiudades);
    }

    public List<FACSIMILFilter> searchA713(String TDNR, String Seq) throws SQLException, Exception {
        return prorrateoDAO.searchA713(TDNR, Seq);
    }
    public List<FACSIMILFilter> searchA720(String TDNR, String VTR) throws SQLException, Exception {
        return prorrateoDAO.searchA720(TDNR, VTR);
    }
    public S0007A720Filter verifyTKT(String TDNR) throws SQLException, Exception {
        return prorrateoDAO.verifyTKT(TDNR);
    }
     public String searchDelivery(String ccust, FACSIMILFilter filter, String fuente) throws SQLException ,Exception{
        return prorrateoDAO.searchDelivery(ccust, filter, fuente);
    }
    
    public List<FACSIMILFilter> searchAgent(String AGTN) throws SQLException,Exception {
        return prorrateoDAO.searchAgent(AGTN);
    }

    public HashMap loadPX164SQP0038(A020Filter filter) throws SQLException, Exception {
        return prorrateoDAO.loadPX164SQP0038(filter);
    }

    public TCNFilter loadPX164SQP0077(String strTicket, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return prorrateoDAO.loadPX164SQP0077(strTicket, hmAeropuertos);
    }

    public List<A729> loadPX164SQP00476(A020Filter filter) throws SQLException, Exception {
        return prorrateoDAO.loadPX164SQP00476(filter);
    }
}
