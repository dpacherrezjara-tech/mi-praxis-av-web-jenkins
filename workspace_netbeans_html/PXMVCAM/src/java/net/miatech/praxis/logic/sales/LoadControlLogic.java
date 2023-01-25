package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX019S01A1348Filter;
import net.miatech.beans.PX019S01A1536Filter;
import net.miatech.beans.PX019S01A1697Filter;
import net.miatech.beans.PX019S01A1698Filter;
import net.miatech.beans.PX037S06PRO9822Filter;
import net.miatech.beans.PX037S07PRO9876Filter;
import net.miatech.beans.PX037S08A1724Filter;
import net.miatech.beans.PX074S01PPRO9824Filter;
import net.miatech.beans.PX074S02PRO9878Filter;
import net.miatech.beans.SQP03605Filter;
import net.miatech.beans.SQP03606Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.LoadControlDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class LoadControlLogic {

    private LoadControlDAO objDAO = new LoadControlDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public   List<PX019S01A1698Filter>  loadPX019S01A1698( PX019S01A1698Filter filter) throws SQLException, Exception {
        return objDAO.loadPX019S01A1698(filter);
    }
    
    public   List<PX037S08A1724Filter>  loadPX037S08A1724(PX037S08A1724Filter filter) throws SQLException, Exception {
        return objDAO.loadPX037S08A1724(filter);
    }
    
    public   List<PX019S01A1536Filter>  loadPX019S01A1536( PX019S01A1536Filter filter) throws SQLException, Exception {
        return objDAO.loadPX019S01A1536(filter);
    }
    
    public   List<PX019S01A1697Filter>  loadPX019S01A1697( PX019S01A1697Filter filter) throws SQLException, Exception {
        return objDAO.loadPX019S01A1697(filter);
    }
    
    public   List<PX019S01A1348Filter>  loadPX019S01A1348( PX019S01A1348Filter filter) throws SQLException, Exception {
        return objDAO.loadPX019S01A1348(filter);
    }
    
    public   PX074S02PRO9878Filter  loadPX074S02PRO9878(PX074S02PRO9878Filter filter) throws SQLException, Exception {
        return objDAO.loadPX074S02PRO9878(filter);
    }
    
    public   PX074S01PPRO9824Filter  loadPX074S01PPRO9824(PX074S01PPRO9824Filter filter) throws SQLException, Exception {
        return objDAO.loadPX074S01PPRO9824(filter);
    }
    public   SQP03605Filter  loadSQP03605Filter(SQP03605Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP03605Filter(filter);
    }
    public   SQP03606Filter  loadSQP03606Filter(SQP03606Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP03606Filter(filter);
    }
    public   PX037S06PRO9822Filter  loadPX037S06PRO9822(PX037S06PRO9822Filter filter) throws SQLException, Exception {
        return objDAO.loadPX037S06PRO9822(filter);
    }
    public   PX037S07PRO9876Filter  loadPX037S07PRO9876(PX037S07PRO9876Filter filter) throws SQLException, Exception {
        return objDAO.loadPX037S07PRO9876(filter);
    }
}
