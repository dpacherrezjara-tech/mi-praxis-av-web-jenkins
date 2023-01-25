/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP02299Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.SpainInvoiceFormDAO;
import net.miatech.praxis.payment.filter.SQP02255Filter;

/**
 *
 * @author zperez
 */
public class SpainInvoiceFormLogic {

    private SpainInvoiceFormDAO SpainInvoice = new SpainInvoiceFormDAO();

    public void setSession(IServerSession ss) {
        SpainInvoice.setSession(ss);
    }

    public List<SQP02255Filter> search(SQP02255Filter filter) throws SQLException, Exception {
        return SpainInvoice.search(filter);
    }
    public List<SQP02299Filter> searchMaster(SQP02299Filter filter) throws SQLException, Exception {
        return SpainInvoice.searchMaster(filter);
    }
    public List<SQP02299Filter> searchMasterFG(SQP02299Filter filter) throws SQLException, Exception {
        return SpainInvoice.searchMasterFG(filter);
    }
    public SQP02299Filter setMasterInvoice(SQP02299Filter filter) throws SQLException, Exception {
        return SpainInvoice.setMasterInvoice(filter);
    }
    public SQP02299Filter setMasterInvoiceFG(SQP02299Filter filter) throws SQLException, Exception {
        return SpainInvoice.setMasterInvoiceFG(filter);
    }

}
