package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.dao.sales.CityMasterFileDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CityMasterFileLogic {
    
    private CityMasterFileDAO objDAO = new CityMasterFileDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
//    public List<A1007> loadCityReport(A1007 filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
//        return objDAO.loadCityReport(filter, hmPaises);
//    }
    
    public List<A1007> loadCityReport(A1007 filter, int rowsPag, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadCityReport(filter, rowsPag, hmPaises);
    }
    
    public String cityReportMaintance(A1007 filter, String strOption)throws SQLException, Exception {
        return objDAO.cityReportMaintance(filter,strOption);
    }
    
    public List<A1007> loadCityReport6EXCEL(A1007 filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadCityReport6EXCEL(filter, hmPaises);
    }
}
