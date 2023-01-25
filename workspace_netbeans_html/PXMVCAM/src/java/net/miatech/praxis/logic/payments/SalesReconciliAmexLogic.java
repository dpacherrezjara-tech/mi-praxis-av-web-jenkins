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
import net.miatech.praxis.dao.payments.SalesReconciliAmexDAO;
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
public class SalesReconciliAmexLogic {

    private final SalesReconciliAmexDAO SalesReconciliAmexDAO = new SalesReconciliAmexDAO();

    public void setSession(IServerSession ss) {
        SalesReconciliAmexDAO.setSession(ss);
    }

    public List<A4113Filter> loadPX570SQP04378(A4113Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04378(filter);
    }

    public List<A4113Filter> loadPX570SQP04257(A4113Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04257(filter);
    }

    public List<A4113Filter> loadPX570SQP04329(A4113Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04329(filter);
    }

    public List<A4113Filter> loadPX570SQP04330(A4113Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04330(filter);
    }

    public List<A4115Filter> loadPX570SQP04269(A4115Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04269(filter);
    }

    public List<A4116Filter> loadPX570SQP04270(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04270(filter);
    }

    public List<A4116Filter> loadPX570SQP04471(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04471(filter);
    }

    public List<A4117Filter> loadPX570SQP04278(A4117Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04278(filter);
    }

    public List<A4118Filter> loadPX570SQP04279(A4118Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04279(filter);
    }

    public List<A4118Filter> loadPX570SQP04376(A4118Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04376(filter);
    }

    public List<A4116Filter> loadPX570SQP04275(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04275(filter);
    }

    public List<A4114Filter> loadPX570SQP04571(A4113Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04571(filter);
    }

    public List<A4116Filter> loadPX570SQP04328(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04328(filter);
    }

    public List<A4116Filter> loadPX570SQP04284(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04284(filter);
    }

    public List<A4116Filter> loadPX570SQP04377(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04377(filter);
    }
    
    public List<A4116Filter> loadPX570SQP04619(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04619(filter);
    }

    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadSQP00697(filter);
    }

    public List<A4116Filter> loadPX570SQP04357(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04357(filter);
    }

    public List<A4116Filter> loadPX570SQP04468(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04468(filter);
    }

    public A4116Filter loadPX570SQP04359(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04359(filter);
    }

    public A4118Filter loadPX570SQP04466(A4118Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04466(filter);
    }

    public String loadPX570SQP04360(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04360(filter);
    }

    public String loadPX570SQP04361(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04361(filter);
    }
    
    public String loadPX570SQP04636(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04636(filter);
    }
    
    public String loadPX570SQP04729(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04729(filter);
    }

    public String loadPX570SQP04469(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04469(filter);
    }

    public List<A4116Filter> loadPX570SQP04420(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04420(filter);
    }

    public List<A4116Filter> loadPX570SQP04414(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04414(filter);
    }

    public List<A4116Filter> loadPX570SQP04465(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04465(filter);
    }

    public List<A4116Filter> loadPX570SQP04569(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04569(filter);
    }
    
    public List<A4116Filter> loadPX570SQP04617(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04617(filter);
    }

    public List<A4116Filter> loadPX570SQP04570(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04570(filter);
    }

    public List<A4116Filter> loadPX570SQP04395(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04395(filter);
    }

    public List<A4116Filter> loadPX570SQP04455(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04455(filter);
    }

    public List<A4116Filter> loadPX570SQP04463(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04463(filter);
    }

    public List<A4116Filter> loadPX570SQP04470(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04470(filter);
    }
    //-----------------------------------------------------------------------------------------
}
