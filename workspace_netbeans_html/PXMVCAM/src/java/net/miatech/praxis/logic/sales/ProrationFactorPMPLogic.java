/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import net.miatech.praxis.logic.flown.*;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.PX0094S01A007Filter;
import net.miatech.beans.PX019S01A823Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A881;
import net.miatech.praxis.dao.flown.CatalogueFlightDAO;
import net.miatech.praxis.dao.sales.ProrationFactorPMPDAO;
import net.miatech.praxis.dao.sales.ProvisosTextDAO;
import net.miatech.praxis.dao.sales.Resolution024DAO;

/**
 *
 * @author lmendoza
 */
public class ProrationFactorPMPLogic {

    private final ProrationFactorPMPDAO prorationFactorPMPDAO = new ProrationFactorPMPDAO();

    public void setSession(IServerSession ss) {
        prorationFactorPMPDAO.setSession(ss);
    }

    public List<PX0094S01A007Filter> loadPX0094S01A007(PX0094S01A007Filter filter) throws SQLException, Exception {
        return prorationFactorPMPDAO.loadPX0094S01A007(filter);
    }
    
    public List<PX0094S01A007Filter> loadSQP03924(PX0094S01A007Filter filter) throws SQLException, Exception {
        return prorationFactorPMPDAO.loadSQP03924(filter);
    }
    
    public List<PX0094S01A007Filter> loadSQP03926(PX0094S01A007Filter filter) throws SQLException, Exception {
        return prorationFactorPMPDAO.loadSQP03926(filter);
    }
    
    public List<PX0094S01A007Filter> loadSQP03928(PX0094S01A007Filter filter) throws SQLException, Exception {
        return prorationFactorPMPDAO.loadSQP03928(filter);
    }

}
