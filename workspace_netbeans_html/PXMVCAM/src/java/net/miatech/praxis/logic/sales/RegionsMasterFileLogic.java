package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX023S01A128Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A128;
import net.miatech.praxis.dao.sales.RegionsMasterFileDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class RegionsMasterFileLogic {
    
    private RegionsMasterFileDAO objDAO = new RegionsMasterFileDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A128> loadRegionMF(PX023S01A128Filter filter) throws SQLException {
        return objDAO.loadRegionMF(filter);
    }
    
    public String maintanceRegionMF(String strOption, A128 bn) throws SQLException {
        return objDAO.maintanceRegionMF(strOption, bn);
    }
}
