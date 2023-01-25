package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP01356Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.dao.sales.LoadVirtualCardMCODAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadVirtualCardMCOLogic {

    private LoadVirtualCardMCODAO objDAO = new LoadVirtualCardMCODAO();
//    private MasterDAO masterDAO = new MasterDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
//        masterDAO.setSession(ss);
    }

    public List<SQP01356Filter> getListVirtualCard(SQP01356Filter filter) throws SQLException {
        return objDAO.getListVirtualCard(filter);
    }

    public List<SQP01356Filter> setMantenimientoCARDMCO(SQP01356Filter filter, String VP_ACTION) throws SQLException {
        return objDAO.setMantenimientoCARDMCO(filter, VP_ACTION);
    }
    
    public String setLoadExcel(SQP01356Filter parameter,String strRutaArchivo,String nameFile) throws SQLException, ClassNotFoundException, Exception{
        return objDAO.setLoadExcel(parameter,strRutaArchivo,nameFile);  
    }
}
