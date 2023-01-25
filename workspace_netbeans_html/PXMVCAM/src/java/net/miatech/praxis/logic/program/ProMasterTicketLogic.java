package net.miatech.praxis.logic.program;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.PX040S01A720Filter;
import net.miatech.beans.PX040S02A720Filter;
import net.miatech.beans.SQP00250Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.SQP03658Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A714;
import net.miatech.praxis.A720;
import net.miatech.praxis.dao.program.ProMasterTicketDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ProMasterTicketLogic {

    private ProMasterTicketDAO objDAO = new ProMasterTicketDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    @Deprecated
    public PX040S01A720Filter loadPX040S01A720(PX040S01A720Filter filter) throws SQLException, Exception {
        return objDAO.loadPX040S01A720(filter);
    }
    
    @Deprecated
    public List<PX040S01A720Filter> SQP04422(PX040S01A720Filter filter) throws SQLException, Exception {
        return objDAO.SQP04422(filter);
    }
    
    @Deprecated
    public List<PX040S01A1716Filter> loadPX040S01A1716(PX040S01A1716Filter filter) throws SQLException, Exception {
        return objDAO.loadPX040S01A1716(filter);
    }

    public List<A720> loadPX040S02A720(PX040S02A720Filter filter) throws SQLException, Exception {
        return objDAO.loadPX040S02A720(filter);
    }
    
    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP00697(filter);
    }
    
    public List<SQP00250Filter> loadSQP00250(SQP00250Filter filter) throws SQLException,Exception {
        return objDAO.loadSQP00250(filter);
    }
    
    public List<SQP03658Filter> loadSQP03658(SQP03658Filter filter) throws SQLException,Exception {
        return objDAO.loadSQP03658(filter);
    }
    
    public PX040S01A720Filter loadSQP02665(PX040S01A720Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP02665(filter);
    }
    
    public List<A714> loadS0001A714(A714 filter) throws SQLException,Exception {
        return objDAO.loadS0001A714(filter);
    }
}
