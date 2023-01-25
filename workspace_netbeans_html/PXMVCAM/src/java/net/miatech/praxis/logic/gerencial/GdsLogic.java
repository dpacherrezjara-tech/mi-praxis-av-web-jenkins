/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.gerencial;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP01558Filter;
import net.miatech.beans.SQP01559Filter;
import net.miatech.beans.SQP01560Filter;
import net.miatech.beans.SQP01561Filter;
import net.miatech.beans.SQP01562Filter;
import net.miatech.beans.SQP01929Filter;
import net.miatech.beans.SQP01930Filter;
import net.miatech.beans.SQP01931Filter;
import net.miatech.beans.SQP01932Filter;
import net.miatech.beans.SQP02020Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.gerencial.GdsDAO;

/**
 *
 * @author vhidalgo
 */
public class GdsLogic {
    private GdsDAO objDAO = new GdsDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    public List<SQP01558Filter> getSQP01558Filter(SQP01558Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01558Filter(filter);
    }
    public List<SQP01562Filter> getSQP01562Filter(SQP01562Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01562Filter(filter);
    }
    public List<SQP01559Filter> getSQP01559Filter(SQP01559Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01559Filter(filter);
    }
    public List<SQP01560Filter> getSQP01560Filter(SQP01560Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01560Filter(filter);
    }
    public List<SQP01561Filter> getSQP01561Filter(SQP01561Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01561Filter(filter);
    }
    
//    GDS AUDIT
    public List<SQP02020Filter> getSQP02020Filter(SQP02020Filter filter) throws SQLException, Exception {
        return objDAO.getSQP02020Filter(filter);
    }
    public List<SQP01929Filter> getSQP01929Filter(SQP01929Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01929Filter(filter);
    }
    public List<SQP01932Filter> getSQP01932Filter(SQP01932Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01932Filter(filter);
    }
    public List<SQP01930Filter> getSQP01930Filter(SQP01930Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01930Filter(filter);
    }
    public List<SQP01931Filter> getSQP01931Filter(SQP01931Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01931Filter(filter);
    }
    
    
}
