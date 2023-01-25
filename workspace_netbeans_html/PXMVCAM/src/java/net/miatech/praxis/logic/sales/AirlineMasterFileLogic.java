package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.A005;
import net.miatech.praxis.dao.sales.AirlineMasterFileDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AirlineMasterFileLogic {
    
    private AirlineMasterFileDAO objDAO = new AirlineMasterFileDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List loadMasterData(A005 filter)throws SQLException {
        return objDAO.loadMasterData(filter);
    }
    
    public A006 get_AuditData_A006(String keyTable, String Table)throws SQLException {
        return objDAO.get_AuditData_A006( keyTable, Table );
    }

    public String maintanceA005(A005 filter,String strOption)throws SQLException {
        return  objDAO.maintanceA005(filter,strOption);
    }
}
