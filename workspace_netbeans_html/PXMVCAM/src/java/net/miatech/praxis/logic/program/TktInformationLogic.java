package net.miatech.praxis.logic.program;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX036S01A1531Filter;
import net.miatech.beans.PX036S01A1532Filter;
import net.miatech.beans.PX036S01A1533Filter;
import net.miatech.beans.PX036S01A1534Filter;
import net.miatech.beans.PX036S01A1721Filter;
import net.miatech.beans.S0001A1730Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.program.TktInformationDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class TktInformationLogic {

    private TktInformationDAO objDAO = new TktInformationDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List <PX036S01A1721Filter>  loadPX036S01A1721( PX036S01A1721Filter filter) throws SQLException, Exception {
        return objDAO.loadPX036S01A1721(filter);
    }
    
    public List <S0001A1730Filter>  loadBalance( S0001A1730Filter filter) throws SQLException, Exception {
        return objDAO.loadBalance(filter);
    }
    
    public List <PX036S01A1531Filter>  loadPX036S01A1531( PX036S01A1531Filter filter) throws SQLException, Exception {
        return objDAO.loadPX036S01A1531(filter);
    }
    
    public List <PX036S01A1532Filter>  loadPX036S01A1532( PX036S01A1532Filter filter) throws SQLException, Exception {
        return objDAO.loadPX036S01A1532(filter);
    }
    
    public List <PX036S01A1533Filter>  loadPX036S01A1533( PX036S01A1533Filter filter) throws SQLException, Exception {
        return objDAO.loadPX036S01A1533(filter);
    }
    
    public List <PX036S01A1534Filter>  loadPX036S01A1534( PX036S01A1534Filter filter) throws SQLException, Exception {
        return objDAO.loadPX036S01A1534(filter);
    }
    
    public List <PX036S01A1721Filter>  loadReference( PX036S01A1721Filter filter) throws SQLException, Exception {
        return objDAO.loadReference(filter);
    }
}
