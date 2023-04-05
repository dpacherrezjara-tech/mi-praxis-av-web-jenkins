/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.DataIntegrityDAO;
import net.miatech.praxis.payment.filter.MPF100Filter;

/**
 *
 * @author lmendoza
 */
public class DataIntegrityLogic {

    private final DataIntegrityDAO DataIntegrityDAO = new DataIntegrityDAO();

    public void setSession(IServerSession ss) {
        DataIntegrityDAO.setSession(ss);
    }

    public List<MPF100Filter> loadPX615SQP04378(MPF100Filter filter) throws SQLException, Exception {
        return DataIntegrityDAO.loadPX615SQP04378(filter);
    }
    
    public List<MPF100Filter> loadPX615SQP04910(MPF100Filter filter) throws SQLException, Exception {
        return DataIntegrityDAO.loadPX615SQP04910(filter);
    }
    
    public List<MPF100Filter> loadPX615SQP04907(MPF100Filter filter) throws SQLException, Exception {
        return DataIntegrityDAO.loadPX615SQP04907(filter);
    }
    
    public List<MPF100Filter> loadPX615SQP04908(MPF100Filter filter) throws SQLException, Exception {
        return DataIntegrityDAO.loadPX615SQP04908(filter);
    }

}
