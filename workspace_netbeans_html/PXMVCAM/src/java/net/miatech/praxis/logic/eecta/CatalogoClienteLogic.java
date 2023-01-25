/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.CatalogoClienteDAO;
import net.miatech.praxis.eecta.SQP03875Filter;
import net.miatech.praxis.eecta.SQP03878Filter;
import net.miatech.praxis.eecta.SQP03879Filter;
import net.miatech.praxis.eecta.SQP03887Filter;
import net.miatech.praxis.eecta.SQP03888Filter;
import net.miatech.praxis.eecta.SQP03959Filter;
import net.miatech.praxis.eecta.SQP03960Filter;
import net.miatech.praxis.eecta.SQP04006Filter;
import net.miatech.praxis.eecta.SQP04038Filter;
import net.miatech.praxis.eecta.SQP04039Filter;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author vhidalgo
 */
public class CatalogoClienteLogic {

    private CatalogoClienteDAO objDAO = new CatalogoClienteDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP03878Filter> getSQP03878Filter(SQP03878Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03878Filter(filter);
    }

    public SQP03879Filter setSQP03879Filter(SQP03879Filter filter) throws SQLException, Exception {
        return objDAO.setSQP03879Filter(filter);
    }

    public SQP03875Filter setSQP03875(SQP03875Filter filter, MultipartFile logofile) throws SQLException, Exception {
        return objDAO.setSQP03875(filter, logofile);
    }

    public SQP03875Filter get_clienteLogo(SQP03875Filter filter) throws SQLException, Exception {
        return objDAO.get_clienteLogo(filter);
    }

    public List<SQP03887Filter> getSQP03887Filter(SQP03887Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03887Filter(filter);
    }

    public SQP03888Filter setSQP03888(SQP03888Filter filter) throws SQLException, Exception {
        return objDAO.setSQP03888(filter);
    }

    public List<SQP03959Filter> getSQP03959Filter(SQP03959Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03959Filter(filter);
    }

    public SQP03960Filter setSQP03960(SQP03960Filter filter) throws SQLException, Exception {
        return objDAO.setSQP03960(filter);
    }
    public List<SQP04006Filter> getSQP04006Filter(SQP04006Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04006Filter(filter);
    }
    public List<SQP04038Filter> getSQP04038Filter(SQP04038Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04038Filter(filter);
    }
    public SQP04039Filter setSQP04039Filter(SQP04039Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04039Filter(filter);
    }
    
    
}
