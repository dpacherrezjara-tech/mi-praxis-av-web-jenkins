package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.A050Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A021;
import net.miatech.praxis.dao.interline.LoadInterline02DAO;
import net.miatech.praxis.flown.A728;
import net.miatech.praxis.interline.A1851;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadInterline02Logic {
    
    private LoadInterline02DAO loadInterline02DAO = new LoadInterline02DAO();
    
    public void setSession(IServerSession ss) {
        loadInterline02DAO.setSession(ss);
    }

    public HashMap loadPX164SQP0098(A728 filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX164SQP0098(filter);
    }

    public HashMap loadPX164SQP0074(A020Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX164SQP0074(filter);
    }

    public String savedComments_SQP0106(List<A021> listaComentarios, List<A020Filter> listaSQL) throws SQLException, Exception {
        return loadInterline02DAO.savedComments_SQP0106(listaComentarios, listaSQL);
    }

    public A021 searchComment_SQP0107(String codigo, String fechaClearing) throws SQLException, Exception {
        return loadInterline02DAO.searchComment_SQP0107(codigo, fechaClearing);
    }

    public List<A021> searchComment_SQP00117(String codigo) throws SQLException, Exception {
        return loadInterline02DAO.searchComment_SQP00117(codigo);
    }

    public List<A720Filter> loadPX191S01A720(A720Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX191S01A720(filter);
    }

    public List<A720Filter> loadPX191S02A720(A720Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX191S02A720(filter);
    }

    public List<A1851> loadPX186S01A1851(A1851 filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX186S01A1851(filter);
    }

    public A1851 loadPX186_SQP00122() throws SQLException, Exception {
        return loadInterline02DAO.loadPX186_SQP00122();
    }

    public String loadPX186S02A1851(A1851 filter, String option) throws SQLException, Exception {
        return loadInterline02DAO.loadPX186S02A1851(filter, option);
    }

    public String loadPX186_SQP00123(A1851 filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX186_SQP00123(filter);
    }

    public List<A1692Filter> loadPX204S01A1692(A1692Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX204S01A1692(filter);
    }

    public List<A1692Filter> loadPX204S02A1692(A1692Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX204S02A1692(filter);
    }

    public List<A1692Filter> loadPX204S10A1692(A1692Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX204S10A1692(filter);
    }

    public List<A1692Filter> loadPX204S04A1692(A1692Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX204S04A1692(filter);
    }

    public List<A1692Filter> loadPX204S03A1692(A1692Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX204S03A1692(filter);
    }

    public List<A1692Filter> loadPX204S05A1692(A1692Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX204S05A1692(filter);
    }
    
//    public List<A050Filter> loadPX216S01WRF071(A050Filter filter) throws SQLException, Exception {
//        return loadInterline02DAO.loadPX216S01WRF071(filter);
//    }
    
    public List<A050Filter> loadPX216S02A050_ISR(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216S02A050_ISR(filter);
    }
    
    public List<A050Filter> loadPX216S02A050_ISR_GRUPO(A050Filter filter, String strFLAG) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216S02A050_ISR_GRUPO(filter, strFLAG);
    }
    
    public List<A050Filter> loadPX216S02A050_ISR_UNMATCH(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216S02A050_ISR_UNMATCH(filter);
    }
    
    public List<A050Filter> loadPX216S03A050_ISR_TKT_UM(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216S03A050_ISR_TKT_UM(filter);
    }
    
    public String loadPX216_VALID_AFTER_CLOSE_DAY(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216_VALID_AFTER_CLOSE_DAY(filter);
    }
    
    public String loadPX216_ISR_CLOSE_DAY(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216_ISR_CLOSE_DAY(filter);
    }
    
    public List<A050Filter> loadPX216S02A050(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216S02A050(filter);
    }
    
    public List<A050Filter> loadPX216S03A050_ISR_TKT(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216S03A050_ISR_TKT(filter);
    }
    
    public List<A050Filter> loadPX216_ISR_VALIDATE_GROUPS(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216_ISR_VALIDATE_GROUPS(filter);
    }
    
    public String loadPX216_ISR_CLOSE_GROUP(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216_ISR_CLOSE_GROUP(filter);
    }
    
    public String loadPX216_ISR_CLOSE_RANGE_GROUPS(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216_ISR_CLOSE_RANGE_GROUPS(filter);
    }
    
    public String loadPX216S03A050(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216S03A050(filter);
    }
    
    public List<A050Filter> loadPX216SQP01925(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216SQP01925(filter);
    }
    
    public String loadPX216SQP01926(A050Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX216SQP01926(filter);
    }
    
    public List<A020Filter> loadPX195S01A020(A020Filter filter) throws SQLException, Exception {
        return loadInterline02DAO.loadPX195S01A020(filter);
    }
    
    public boolean searchDate_A1851(String fech) throws SQLException, Exception {
        return loadInterline02DAO.searchDate_A1851(fech);
    }
    
    public boolean insert_A1851(List<A1851> lstRtn, String strFechDuplicat) throws SQLException, Exception {
        return loadInterline02DAO.insert_A1851(lstRtn, strFechDuplicat);
    }
    
    
}
