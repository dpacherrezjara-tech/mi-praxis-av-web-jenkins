/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A4719Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.DownloadThePaymentFilesDAO;

/**
 *
 * @author zperez
 */
public class DownloadThePaymentFilesLogic {

    private DownloadThePaymentFilesDAO objDAO = new DownloadThePaymentFilesDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A4719Filter> DowloadFilesPayment(A4719Filter filter) throws SQLException, Exception {
        return objDAO.DowloadFilesPayment(filter);
    }

}
