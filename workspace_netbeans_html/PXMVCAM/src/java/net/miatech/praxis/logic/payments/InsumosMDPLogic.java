///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.InsumosMDPDAO;
import net.miatech.praxis.payment.filter.A2353Filter;

/**
 *
 * @author lmendoza
 */
public class InsumosMDPLogic {

    private final InsumosMDPDAO InsumosMDPDAO = new InsumosMDPDAO();

    public void setSession(IServerSession ss) {
        InsumosMDPDAO.setSession(ss);
    }
    
    
    public List<A2353Filter> loadPX285SQP00827_InsumosMDPDAO(A2353Filter filter) throws SQLException, Exception {
        return InsumosMDPDAO.loadPX285SQP00827_InsumosMDPDAO(filter);
    }
    

}


