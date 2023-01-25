    /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.PassengerInvoicesIpDAO;
import net.miatech.praxis.interline.SFI010;
import net.miatech.praxis.interline.SFI021;
import net.miatech.praxis.interline.SFI022;
import net.miatech.praxis.interline.SFI030;
import net.miatech.praxis.interline.SFI031;
import net.miatech.praxis.interline.SFI032;
import net.miatech.praxis.interline.SFI033;
import net.miatech.praxis.interline.SFI041;
import net.miatech.praxis.interline.filter.SFI010Filter;
import net.miatech.praxis.interline.filter.SFI020Filter;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.SFI022Filter;
import net.miatech.praxis.interline.filter.SFI030Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;

/**
 *
 * @author lmendoza
 */
public class PassengerInvoicesIpLogic {

    private final PassengerInvoicesIpDAO passengerInvoicesDAO = new PassengerInvoicesIpDAO();

    public void setSession(IServerSession ss) {
        passengerInvoicesDAO.setSession(ss);

    }

    public List<SFI040Filter> loadPX190S01SFI040(SFI040Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S01SFI040(filter);
    }

    public List<SFI030Filter> loadPX190SSQP766(SFI030Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190SSQP766(filter);
    }

    public List<SFI030Filter> loadPX190S01SFI030(SFI040Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S01SFI030(filter);
    }

    public List<SFI020Filter> loadPX190S02SFI020(SFI030Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S02SFI020(filter);
    }

    public List<SFI021Filter> loadPX190S02SFI021(SFI030Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S02SFI021(filter);
    }

    public List<SFI022Filter> loadPX190S02SFI022(SFI030Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S02SFI022(filter);
    }

    public List<SFI020Filter> loadPX190S01SFI020(SFI020Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S01SFI020(filter);
    }

    public List<SFI021Filter> loadPX190S01SFI021(SFI021Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S01SFI021(filter);
    }

    public List<SFI022Filter> loadPX190S01SFI022(SFI022Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S01SFI022(filter);
    }

    public List<SFI030Filter> loadPX190S02SFI030(SFI040Filter filter) throws SQLException, Exception {
        return passengerInvoicesDAO.loadPX190S02SFI030(filter);
    }

    public List<SFI030Filter> loadPX190S03SFI030(SFI030Filter filter) throws SQLException, Exception {
        return passengerInvoicesDAO.loadPX190S03SFI030(filter);
    }

    public List<SFI020Filter> loadPX190S03SFI020(SFI030Filter filter) throws SQLException, Exception {
        return passengerInvoicesDAO.loadPX190S03SFI020(filter);
    }

    public List<SFI021Filter> loadPX190S03SFI021(SFI030Filter filter) throws SQLException, Exception {
        return passengerInvoicesDAO.loadPX190S03SFI021(filter);
    }

    public List<SFI022Filter> loadPX190S03SFI022(SFI030Filter filter) throws SQLException, Exception {
        return passengerInvoicesDAO.loadPX190S03SFI022(filter);
    }

    public List<SFI020Filter> loadPX190SSQP788(SFI030Filter filter) throws SQLException, Exception {
        return passengerInvoicesDAO.loadPX190SSQP788(filter);
    }

    public List<SFI021Filter> loadPX190SSQP789(SFI030Filter filter) throws SQLException, Exception {
        return passengerInvoicesDAO.loadPX190SSQP789(filter);
    }

    public List<SFI022Filter> loadPX190SSQP805(SFI030Filter filter) throws SQLException, Exception {
        return passengerInvoicesDAO.loadPX190SSQP805(filter);
    }

    public List<SFI041> loadPX190S01SFI041(SFI020Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S01SFI041(filter);
    }

    public List<SFI020Filter> loadPX190S09SFI020(SFI020Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S09SFI020(filter);
    }

    public SFI031 loadPX190S01SFI031(SFI021Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S01SFI031(filter);
    }

    public SFI031 loadPX190S02SFI031(SFI022Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX190S02SFI031(filter);
    }

    public List<SFI021Filter> loadPX185S01SFI021_rejected(SFI021Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX185S01SFI021_rejected(filter);
    }
    

    public List<SFI010> loadPX538_register_10(SFI010Filter filter, String flagMonth) throws Exception {
        return passengerInvoicesDAO.loadPX538_register_10(filter, flagMonth);
    }

    public List<SFI030> loadPX538_register_30(SFI030Filter filter, String flagMonth) throws Exception {
        return passengerInvoicesDAO.loadPX538_register_30(filter, flagMonth);
    }
    
    // ------------------------------- SFI 20 ------------------------------------------------------   
    public List<SFI020Filter> loadPX538_register20(SFI020Filter filter, String flagMonth) throws Exception {
        return passengerInvoicesDAO.loadPX538_register20(filter, flagMonth);
    }
    
    // ------------------------------- SFI 21 & 22 & 23 ------------------------------------------------------   
    public List<SFI021> loadPX538_register_21(SFI021Filter filter, String flagMonth) throws Exception {
        return passengerInvoicesDAO.loadPX538_register_21(filter, flagMonth);
    }
    
    // ------------------------------- SFI 31 ------------------------------------------------------   
    public List<SFI031> loadPX538_register_31(SFI020Filter filter, String flagMonth) throws Exception {
        return passengerInvoicesDAO.loadPX538_register_31(filter, flagMonth);
    }
    
    // ------------------------------- SFI 32 ------------------------------------------------------   
    public List<SFI032> loadPX538_register_32(SFI020Filter filter, String flagMonth) throws Exception {
        return passengerInvoicesDAO.loadPX538_register_32(filter, flagMonth);
    }
    
    // ------------------------------- SFI 33 ------------------------------------------------------   
    public List<SFI033> loadPX538_register_33(SFI020Filter filter, String flagMonth) throws Exception {
        return passengerInvoicesDAO.loadPX538_register_33(filter, flagMonth);
    }
    
    // ------------------------------- SFI 41 ------------------------------------------------------   
    public List<SFI041> loadPX538_register_41(SFI020Filter filter, String flagMonth) throws Exception {
        return passengerInvoicesDAO.loadPX538_register_41(filter, flagMonth);
    }
    
    // ------------------------------- SFI 22 ------------------------------------------------------   
    public List<SFI022> loadPX538_register_22(SFI020Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX538_register_22(filter);
    }
}
