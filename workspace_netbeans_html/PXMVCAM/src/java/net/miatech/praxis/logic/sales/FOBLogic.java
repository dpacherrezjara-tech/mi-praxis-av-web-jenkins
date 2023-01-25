/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX117A1728Filter;
import net.miatech.beans.PX117A1729Filter;
import net.miatech.beans.PX117S01A1728Filter;
import net.miatech.beans.PX117S03A1728Filter;
import net.miatech.beans.PX117S04A1728Filter;
import net.miatech.beans.PX117S2A1728Filter;
import net.miatech.beans.SQP00790Filter;
import net.miatech.beans.SQP00791Filter;
import net.miatech.beans.SQP00792Filter;
import net.miatech.beans.SQP00793Filter;
import net.miatech.beans.SQP00794Filter;
import net.miatech.beans.SQP00795Filter;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.FOBDAO;
import net.miatech.praxis.dao.sales.PercentCommissionDAO;

/**
 *
 * @author lmendoza
 */
public class FOBLogic {

    private final FOBDAO fobDAO = new FOBDAO();

    public void setSession(IServerSession ss) {
        fobDAO.setSession(ss);

    }

    public List<PX117A1728Filter> loadPX117A1728(PX117A1728Filter filter) throws SQLException, Exception {
        return fobDAO.loadPX117A1728(filter);
    }

    public List<PX117A1729Filter> loadPX117A1729(PX117A1729Filter filter) throws SQLException, Exception {
        return fobDAO.loadPX117A1729(filter);
    }

    public PX117S2A1728Filter setPX117S2A1728(PX117S2A1728Filter filter) throws SQLException, Exception {
        return fobDAO.setPX117S2A1728(filter);
    }

    public List<PX117S04A1728Filter> loadPX117S04A1728(PX117S04A1728Filter filter) throws SQLException, Exception {
        return fobDAO.loadPX117S04A1728(filter);
    }

    public PX117S04A1728Filter loadDataEnvioMail(PX117S04A1728Filter filter) throws SQLException, Exception {
        return fobDAO.loadDataEnvioMail(filter);
    }
    
     public PX117S03A1728Filter loadPX117S03A1728(PX117S03A1728Filter filter) throws SQLException, Exception {
        return fobDAO.loadPX117S03A1728(filter);
    }
     
     public PX117S01A1728Filter setPX117S01A1728(PX117S01A1728Filter filter) throws SQLException, Exception {
        return fobDAO.setPX117S01A1728(filter);
    }
//     NEW. VH
    public List<PX117A1729Filter> loadSQP02647(PX117A1729Filter filter) throws SQLException, Exception {
        return fobDAO.loadSQP02647(filter);
    }           
}
