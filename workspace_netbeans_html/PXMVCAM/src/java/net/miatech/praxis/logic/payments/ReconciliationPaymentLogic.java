/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReconciliationPaymentDAO;
import net.miatech.praxis.payment.filter.A4113Filter;
import net.miatech.praxis.payment.filter.A4114Filter;
import net.miatech.praxis.payment.filter.A4115Filter;
import net.miatech.praxis.payment.filter.A4116Filter;
import net.miatech.praxis.payment.filter.A4117Filter;
import net.miatech.praxis.payment.filter.A4118Filter;
import net.miatech.praxis.payment.filter.A4124Filter;

/**
 *
 * @author lmendoza
 */
public class ReconciliationPaymentLogic {

    private final ReconciliationPaymentDAO ReconciliationPaymentDAO = new ReconciliationPaymentDAO();

    public void setSession(IServerSession ss) {
        ReconciliationPaymentDAO.setSession(ss);
    }

    public List<A4113Filter> loadPX606SQP04692(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04692(filter);
    }

    public List<A4113Filter> loadPX606SQP04693(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04693(filter);
    }

    public List<A4113Filter> loadPX606SQP04329(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04329(filter);
    }

    public List<A4113Filter> loadPX606SQP04330(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04330(filter);
    }

    public List<A4115Filter> loadPX606SQP04269(A4115Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04269(filter);
    }

    public List<A4116Filter> loadPX606SQP04270(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04270(filter);
    }

    public List<A4116Filter> loadPX606SQP04471(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04471(filter);
    }

    public List<A4117Filter> loadPX606SQP04278(A4117Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04278(filter);
    }

    public List<A4118Filter> loadPX606SQP04279(A4118Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04279(filter);
    }

    public List<A4118Filter> loadPX606SQP04376(A4118Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04376(filter);
    }

    public List<A4116Filter> loadPX606SQP04695(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04695(filter);
    }

    public List<A4114Filter> loadPX606SQP04571(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04571(filter);
    }

    public List<A4116Filter> loadPX606SQP04694(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04694(filter);
    }

    public List<A4116Filter> loadPX606SQP04721(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04721(filter);
    }

    public List<A4116Filter> loadPX606SQP04698(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04698(filter);
    }
    
    public List<A4116Filter> loadPX606SQP04619(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04619(filter);
    }

    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadSQP00697(filter);
    }

    public List<A4116Filter> loadPX606SQP04697(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04697(filter);
    }

    public List<A4116Filter> loadPX606SQP04696(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04696(filter);
    }

    public A4116Filter loadPX606SQP04720(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04720(filter);
    }

    public A4118Filter loadPX606SQP04466(A4118Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04466(filter);
    }

    public String loadPX606SQP04360(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04360(filter);
    }

    public String loadPX606SQP04723(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04723(filter);
    }
    
    public String loadPX606SQP04728(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04728(filter);
    }

    public String loadPX606SQP04469(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04469(filter);
    }

    public List<A4116Filter> loadPX606SQP04420(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04420(filter);
    }

    public List<A4116Filter> loadPX606SQP04414(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04414(filter);
    }

    public List<A4116Filter> loadPX606SQP04465(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04465(filter);
    }

    public List<A4116Filter> loadPX606SQP04569(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04569(filter);
    }
    
    public List<A4116Filter> loadPX606SQP04617(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04617(filter);
    }

    public List<A4116Filter> loadPX606SQP04570(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04570(filter);
    }

    public List<A4116Filter> loadPX606SQP04722(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04722(filter);
    }

    public List<A4116Filter> loadPX606SQP04754(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04754(filter);
    }

    public List<A4116Filter> loadPX606SQP04463(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04463(filter);
    }

    public List<A4116Filter> loadPX606SQP04470(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04470(filter);
    }
    //-----------------------------------------------------------------------------------------
}
