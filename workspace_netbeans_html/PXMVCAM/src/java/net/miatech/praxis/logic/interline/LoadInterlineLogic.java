package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libcust.A051;
import net.miatech.praxis.dao.interline.LoadInterlineDAO;
import net.miatech.praxis.interline.SFI010;
import net.miatech.praxis.interline.SFI021;
import net.miatech.praxis.interline.SFI022;
import net.miatech.praxis.interline.SFI030;
import net.miatech.praxis.interline.SFI031;
import net.miatech.praxis.interline.SFI032;
import net.miatech.praxis.interline.SFI041;
import net.miatech.praxis.interline.filter.SFI010Filter;
import net.miatech.praxis.interline.filter.SFI020Filter;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.SFI022Filter;
import net.miatech.praxis.interline.filter.SFI030Filter;
import net.miatech.praxis.interline.filter.SFI033Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadInterlineLogic {

    private LoadInterlineDAO loadInterlineDAO = new LoadInterlineDAO();

    public void setSession(IServerSession ss) {
        loadInterlineDAO.setSession(ss);
    }

    public HashMap loadPX165S01WRF016(WRF016Filter filter) throws SQLException, Exception {
        return loadInterlineDAO.loadPX165S01WRF016(filter);
    }

    public HashMap loadPX165S02WRF001(WRF016Filter filter) throws SQLException, Exception {
        return loadInterlineDAO.loadPX165S02WRF001(filter);
    }

    public HashMap loadPX165S03WRF001(WRF016Filter filter) throws SQLException, Exception {
        return loadInterlineDAO.loadPX165S03WRF001(filter);
    }

    public HashMap loadPX189S03A020(WRF016Filter filter) throws SQLException, Exception {
        return loadInterlineDAO.loadPX189S03A020(filter);
    }

    public HashMap loadPX165S04WRF002(WRF016Filter filter) throws SQLException, Exception {
        return loadInterlineDAO.loadPX165S04WRF002(filter);
    }

    public WRF016Filter loadPX165S05WRF001(WRF016Filter filter) throws SQLException, Exception {
        return loadInterlineDAO.loadPX165S05WRF001(filter);
    }

    public A020Filter loadPX164SQP00113(String grupo) throws SQLException, Exception {
        return loadInterlineDAO.loadPX164SQP00113(grupo);
    }

    public List<A020Filter> loadPX164SQP00114(String sqlAlt, A020Filter filter, String consulta) throws SQLException, Exception {
        return loadInterlineDAO.loadPX164SQP00114(sqlAlt, filter, consulta);
    }

    public List<SFI040Filter> loadPX185S01SFI040(SFI040Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S01SFI040(filter);
    }

    public List<SFI030Filter> loadPX185SSQP767(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185SSQP767(filter);
    }

    public List<SFI030Filter> loadPX185S01SFI030(SFI040Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S01SFI030(filter);
    }

    public List<SFI030Filter> loadPX185S02SFI030(SFI040Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S02SFI030(filter);
    }

    public List<SFI020Filter> loadPX185SSQP785(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185SSQP785(filter);
    }

    public List<SFI021Filter> loadPX185SSQP786(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185SSQP786(filter);
    }

    public List<SFI022Filter> loadPX185SSQP787(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185SSQP787(filter);
    }

    public List<SFI030Filter> loadPX185S03SFI030(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S03SFI030(filter);
    }

    public List<SFI020Filter> loadPX185S03SFI020(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S03SFI020(filter);
    }

    public List<SFI041> loadPX185S01SFI041(SFI020Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S01SFI041(filter);
    }

    public List<SFI021Filter> loadPX185S03SFI021(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S03SFI021(filter);
    }

    public List<SFI022Filter> loadPX185S03SFI022(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S03SFI022(filter);
    }

    public List<A051> loadUsosA1852(String grupo) throws Exception {
        return loadInterlineDAO.loadUsosA1852(grupo);
    }

    public List<SFI020Filter> loadPX185S02SFI020(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S02SFI020(filter);
    }

    public List<SFI020Filter> loadPX185S01SFI020(SFI020Filter filter) throws SQLException, Exception {
        return loadInterlineDAO.loadPX185S01SFI020(filter);
    }

    public List<SFI020Filter> loadPX185S09SFI020(SFI020Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S09SFI020(filter);
    }

    public List<SFI021Filter> loadPX185S01SFI021(SFI021Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S01SFI021(filter);
    }

    public List<SFI021Filter> loadPX185S02SFI021(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S02SFI021(filter);
    }

    public List<SFI021Filter> loadPX185S01SFI021_1_1(SFI021Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S01SFI021_1_1(filter);
    }

    public List<SFI022Filter> loadPX185S02SFI022(SFI030Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S02SFI022(filter);
    }

    public List<SFI022Filter> loadPX185S01SFI022(SFI022Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S01SFI022(filter);
    }

    public List<SFI041> loadPX185S02SFI041(SFI021Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S02SFI041(filter);
    }

    public SFI031 loadPX185S02SFI031(SFI022Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S02SFI031(filter);
    }

    public List<SFI033Filter> loadPX185S01SFI033(SFI022Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S01SFI033(filter);
    }

    public SFI031 loadPX185S01SFI031(SFI021Filter filter) throws Exception {
        return loadInterlineDAO.loadPX185S01SFI031(filter);
    }
    
    // ------------------------------- SFI 22 ------------------------------------------------------   
    public List<SFI022> loadPX538_register_22(SFI020Filter filter) throws Exception {
        return loadInterlineDAO.loadPX538_register_22(filter);
    }
    
    // ----------------------------------------------------------------------------------------------   
    // ----------------------------------------------------------------------------------------------   
    // ------------------------------- SFI 30 -------------------------------------------------------   
    
    public List<SFI030> loadPX538_register_30(SFI030Filter filter, String flagMonth) throws Exception {
        return loadInterlineDAO.loadPX538_register_30(filter, flagMonth);
    }
    
    public List<SFI010> loadPX538_register_10(SFI010Filter filter, String flagMonth) throws Exception {
        return loadInterlineDAO.loadPX538_register_10(filter, flagMonth);
    }
    
    public List<SFI020Filter> loadPX538_register20(SFI020Filter filter, String flagMonth) throws Exception {
        return loadInterlineDAO.loadPX538_register20(filter, flagMonth);
    }
    
    // 21 22 23
    public List<SFI021> loadPX538_register_21(SFI021Filter filter, String flagMonth) throws Exception {
        return loadInterlineDAO.loadPX538_register_21(filter, flagMonth);
    }
    
    public List<SFI031> loadPX538_register_31(SFI020Filter filter, String flagMonth) throws Exception {
        return loadInterlineDAO.loadPX538_register_31(filter, flagMonth);
    }
    
    public List<SFI032> loadPX538_register_32(SFI020Filter filter, String flagMonth) throws Exception {
        return loadInterlineDAO.loadPX538_register_32(filter, flagMonth);
    }
    
    public List<SFI041> loadPX538_register_41(SFI020Filter filter, String flagMonth) throws Exception {
        return loadInterlineDAO.loadPX538_register_41(filter, flagMonth);
    }
    
}
