/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.SalesComplementAmexDAO;
import net.miatech.praxis.payment.filter.A4124Filter;
import net.miatech.praxis.payment.filter.A4166Filter;
import net.miatech.praxis.payment.filter.A4164Filter;

/**
 *
 * @author ctarazona
 */
public class SalesComplementAmexLogic {

    private final SalesComplementAmexDAO SalesComplementAmexDAO = new SalesComplementAmexDAO();

    public void setSession(IServerSession ss) {
        SalesComplementAmexDAO.setSession(ss);
    }

    public List<A4124Filter> loadPX585SQP04354(A4124Filter filter) throws SQLException, Exception {
        return SalesComplementAmexDAO.loadPX585SQP04354(filter);

    }
    
    public List<A4164Filter> loadPX585SQP04433(A4164Filter filter) throws SQLException, Exception {
        return SalesComplementAmexDAO.loadPX585SQP04433(filter);

    }

    public List<A4166Filter> loadPX585SQP04355(A4166Filter filter) throws SQLException, Exception {
        return SalesComplementAmexDAO.loadPX585SQP04355(filter);

    }

    public List<A4166Filter> loadPX585SQP04356(A4166Filter filter) throws SQLException, Exception {
        return SalesComplementAmexDAO.loadPX585SQP04356(filter);

    }

    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        return SalesComplementAmexDAO.loadSQP00697(filter);
    }

}
