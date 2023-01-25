/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP04482Filter;
import net.miatech.beans.SQP04483Filter;
import net.miatech.beans.SQP04491Filter;
import net.miatech.beans.SQP04492Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.VouchersIssuedVersusClaimsDAO;


/**
 *
 * @author vhidalgo
 */
public class VouchersIssuedVersusClaimsLogic {

    private VouchersIssuedVersusClaimsDAO objDAO = new VouchersIssuedVersusClaimsDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP04482Filter> getSQP04482Filter(SQP04482Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04482Filter(filter);
    }

    public SQP04483Filter setSQP04483Filter(SQP04483Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04483Filter(filter);
    }
    
    public List<SQP04491Filter> getSQP04491Filter(SQP04491Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04491Filter(filter);
    }
    public List<SQP04492Filter> getSQP04492Filter(SQP04492Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04492Filter(filter);
    }
    
    
}
