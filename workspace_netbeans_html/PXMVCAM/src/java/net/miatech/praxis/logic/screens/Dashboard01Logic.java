/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.screens;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.A050Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1971Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.IMF053Filter;
import net.miatech.beans.IMF111Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libcust.A051wr;
import net.miatech.praxis.dao.screens.Dashboard01DAO;
import net.miatech.praxis.interline.filter.IMF117Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.interline.filter.WRF016Filterwk;

/**
 *
 * @author jtorres
 */
public class Dashboard01Logic {

    private Dashboard01DAO Dashboard01DAO = new Dashboard01DAO();

    public Dashboard01Logic() {
    }

    public Dashboard01Logic(IServerSession ss) {
        Dashboard01DAO.setSession(ss);
    }

    public void setSession(IServerSession ss) {
        Dashboard01DAO.setSession(ss);
    }

    public Map<Byte, List<DashboardFilter>> obtaingData(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.obtaingData(filter);
    }

    public List<DashboardFilter> loadPX109SQP00641(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00641(filter);
    }

    public List<DashboardFilter> loadPX109SQP00642(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00642(filter);
    }

    public List<DashboardFilter> loadPX109SQP01540(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01540(filter);
    }

    public List<DashboardFilter> loadPX109SQP00644(DashboardFilter filter, String strGROUPBY) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00644(filter, strGROUPBY);
    }

    public List<DashboardFilter> loadPX109SQP00988(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00988(filter);
    }

    public List<DashboardFilter> loadPX109SQP00645(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00645(filter);
    }

    public List<DashboardFilter> loadVentasA1426Agente(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadVentasA1426Agente(filter);
    }

    /*GDS*/
    public List<DashboardFilter> loadPX109SQP01504(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01504(filter);
    }

    public List<DashboardFilter> loadPX109SQP01505(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01505(filter);
    }

    public List<DashboardFilter> loadPX109SQP01538(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01538(filter);
    }

    public List<A720Filter> loadPX109SQP01539(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01539(filter);
    }

    public HashMap loadPX109SQP01571(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01571(filter);
    }

    public HashMap loadPX109SQP03478(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP03478(filter);
    }

    /*TOTALS BY CABIN*/
    public List<DashboardFilter> loadPX109SQP00932(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00932(filter);
    }

    public List<DashboardFilter> loadPX109SQP01542(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01542(filter);
    }

    public List<DashboardFilter> loadPX109SQP00550(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00550(filter);
    }

    /*Alliance*/
    public List<DashboardFilter> loadPX109SQP01518(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01518(filter);
    }

    /*Routing Type*/
    public List<DashboardFilter> loadPX109SQP01516(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01516(filter);
    }

    public List<DashboardFilter> loadPX109SQP01519(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01519(filter);
    }

    public List<DashboardFilter> loadPX109SQP01519_CHART(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01519_CHART(filter);
    }

// ===================================== FARE TYPE ========================================================================
    public List<DashboardFilter> loadPX109SQP01523(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01523(filter);
    }

    public List<DashboardFilter> loadPX109SQP01533(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01533(filter);
    }

    public List<DashboardFilter> loadPX109SQP01982(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01982(filter);
    }

    public List<DashboardFilter> loadPX109SQP01526(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01526(filter);
    }

    public List<DashboardFilter> loadPX109SQP01983(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01983(filter);
    }

    /**
     * **********************Charts*****************************************
     */
    public HashMap loadPX109SQP00994(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00994(filter);
    }

    public List<DashboardFilter> loadPX109SQP00538(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00538(filter);
    }

    public List<DashboardFilter> loadPX109SQP00540(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00540(filter);
    }

    public List<DashboardFilter> loadPX109SQP00541(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00541(filter);
    }

    /*Chart Agente*/
    public List loadVentasA1426Agente_3(DashboardFilter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadVentasA1426Agente_3(filter);
    }

    /**
     * INTERLINEA
     */
    public List<SFI040Filter> loadPX237S01SFI040_2(A050Filter filter) throws SQLException, Exception, Exception {
        return Dashboard01DAO.loadPX237S01SFI040_2(filter);
    }

    public List<A050Filter> loadPX109SQP00881(A050Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00881(filter);
    }

    public List<A050Filter> loadPX109SQP00882(A050Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00882(filter);
    }
    
    public List<A051wr> loadUsoswr(String calfa) throws SQLException, Exception {
        return Dashboard01DAO.loadUsoswr(calfa);
    }
    
    public HashMap loadPX165S01WRF016(WRF016Filterwk filter) throws Exception {
        return Dashboard01DAO.loadPX165S01WRF016(filter);
    }
    

    /**
     * EMD
     */
    public List<IMF053Filter> PX109SQP03554(IMF053Filter filter) throws SQLException, Exception, Exception {
        return Dashboard01DAO.PX109SQP03554(filter);
    }

    public List<IMF053Filter> PX109SQP03560(IMF053Filter filter) throws SQLException, Exception, Exception {
        return Dashboard01DAO.PX109SQP03560(filter);
    }

    //* ***************************Flown Analysis*******************************
    public List<A1971Filter> loadPX109SQP00556(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00556(filter);
    }
    
    public List<A1971Filter> loadPX109SQP00556MT(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00556MT(filter);
    }
    
    public List<A1971Filter> loadPX109SQP00556NF(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00556NF(filter);
    }

    public List<A1971Filter> loadPX109SQP00556ZN(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP00556ZN(filter);
    }

    public List<A1971Filter> loadPX109SQP01927(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01927(filter);
    }
    
    public List<A1971Filter> loadPX109SQP01927M(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP01927M(filter);
    }

    public List<A1971Filter> loadPX246SQP01130(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX246SQP01130(filter);
    }

    public List<A1971Filter> loadPX246SQP00335(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX246SQP00335(filter);
    }

    public List<A1971Filter> loadPX246SQP00334(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX246SQP00334(filter);
    }
    
    public List<A1971Filter> loadPX246SQP04618(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX246SQP04618(filter);
    }

    public List<A1971Filter> loadPX246SQP00333(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX246SQP00333(filter);
    }
    
    public List<A1971Filter> loadPX246SQP00329(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX246SQP00329(filter);
    }
    
    public List<A1692Filter> loadPX246SQP00330(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX246SQP00330(filter);
    }
    
    public List<A1971Filter> loadPX246SQP00331(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX246SQP00331(filter);
    }
    
    public List<A1971Filter> loadPX246SQP00342(A1971Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX246SQP00342(filter);
    }
    
    
    
    
    
    

    //* ***************************Expired*******************************
    public List<IMF117Filter> loadPX109SQP02666(IMF117Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP02666(filter);
    }

    public List<IMF117Filter> loadPX109SQP02667(IMF117Filter filter) throws SQLException, Exception {
        return Dashboard01DAO.loadPX109SQP02667(filter);
    }

}
