/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX112S01A1728Filter;
import net.miatech.beans.PX112S01A1757Filter;
import net.miatech.beans.PX112S02A1757Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.InvoiceCommissionFOBDAO;

/**
 *
 * @author lmendoza
 */
public class InvoiceCommissionFOBLogic {

    private final InvoiceCommissionFOBDAO invoiceCommissionFOBDAO = new InvoiceCommissionFOBDAO();

    public void setSession(IServerSession ss) {
        invoiceCommissionFOBDAO.setSession(ss);

    }

    public List<PX112S01A1757Filter> loadPX112S01A1757(PX112S01A1757Filter filter) throws SQLException, Exception {
        return invoiceCommissionFOBDAO.loadPX112S01A1757(filter);
    }

    public String get_PX112S03A1757(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        return invoiceCommissionFOBDAO.get_PX112S03A1757(VP_OPTION, VP_PARAM);
    }

    public PX112S02A1757Filter setPX112S02A1757(PX112S02A1757Filter filter) throws SQLException, Exception {
        return invoiceCommissionFOBDAO.setPX112S02A1757(filter);
    }
//    NEW. VH
      public List<PX112S01A1728Filter> loadPX112S01A1728(PX112S01A1728Filter filter) throws SQLException, Exception {
        return invoiceCommissionFOBDAO.loadPX112S01A1728(filter);
    }
    
    public String subirExcel(ArrayList<PX112S02A1757Filter> filter, String nameFile) throws SQLException, Exception {
        return invoiceCommissionFOBDAO.subirExcel(filter, nameFile);
    }
    
}
