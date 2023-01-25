/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00801Filter;
import net.miatech.beans.SQP00802Filter;
import net.miatech.beans.SQP00804Filter;
import net.miatech.beans.SQP00806Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.InvoiceCommissionConsortiaDAO;
import net.miatech.praxis.dao.sales.PercentCommissionDAO;

/**
 *
 * @author lmendoza
 */
public class InvoiceCommissionConsortiaLogic {

    private final InvoiceCommissionConsortiaDAO invoiceCommissionConsortiaDAO = new InvoiceCommissionConsortiaDAO();

    public void setSession(IServerSession ss) {
        invoiceCommissionConsortiaDAO.setSession(ss);

    }

    public List<SQP00801Filter> loadPX112S01A1757(SQP00801Filter filter) throws SQLException, Exception {
        return invoiceCommissionConsortiaDAO.loadPX112S01A1757(filter);
    }

    public String get_PX112S03A1757(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        return invoiceCommissionConsortiaDAO.get_PX112S03A1757(VP_OPTION, VP_PARAM);
    }

    public SQP00802Filter setPX112S02A1757(SQP00802Filter filter) throws SQLException, Exception {
        return invoiceCommissionConsortiaDAO.setPX112S02A1757(filter);
    }
    //    NEW. VH
      public List<SQP00804Filter> loadPX112S01A1728(SQP00804Filter filter) throws SQLException, Exception {
        return invoiceCommissionConsortiaDAO.loadPX112S01A1728(filter);
    }
    
    public String subirExcel(ArrayList<SQP00802Filter> filter, String nameFile) throws SQLException, Exception {
        return invoiceCommissionConsortiaDAO.subirExcel(filter, nameFile);
    }
}
