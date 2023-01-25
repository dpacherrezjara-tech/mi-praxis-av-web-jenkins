/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1737Filter;
import net.miatech.beans.A2462Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.dao.flown.AverageFareEMDDAO;
import net.miatech.praxis.dao.flown.MultilegTableDAO;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A1737;

/**
 *
 * @author lmendoza
 */
public class AverageFareEMDLogic {

    private AverageFareEMDDAO averageFareEMDDAO = new AverageFareEMDDAO();
   

    public void setSession(IServerSession ss) {
        averageFareEMDDAO.setSession(ss);
        
    }

    public List<A2462Filter> loadPX275SQP00759(A2462Filter filter) throws SQLException, Exception {
        return averageFareEMDDAO.loadPX275SQP00759(filter);
    }
    
    public String loadPX275SQP00760(A2462Filter filter, String option) throws SQLException, Exception {
        return averageFareEMDDAO.loadPX275SQP00760(filter, option);
    }
}
