/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A2850Filter;
import net.miatech.beans.PX019S01A025Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.PaymentNotificationReportDAO;

/**
 *
 * @author lmendoza
 */
public class PaymentNotificationReportLogic {

    private final PaymentNotificationReportDAO paymentNotificationReportDAO = new PaymentNotificationReportDAO();

    public void setSession(IServerSession ss) {
        paymentNotificationReportDAO.setSession(ss);

    }

    public List<A2850Filter> SQP01877(A2850Filter filter) throws SQLException, Exception {
        return paymentNotificationReportDAO.SQP01877(filter);
    }

}
