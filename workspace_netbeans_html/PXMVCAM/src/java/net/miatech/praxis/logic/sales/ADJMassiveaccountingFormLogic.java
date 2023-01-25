/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A3344Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.ADJMassiveaccountingFormDAO;

/**
 *
 * @author zperez
 */
public class ADJMassiveaccountingFormLogic {

    public ADJMassiveaccountingFormDAO ADJMassiveDAO = new ADJMassiveaccountingFormDAO();

    public void setSession(IServerSession ss) {
        ADJMassiveDAO.setSession(ss);

    }
     public List<A3344Filter> search(A3344Filter filter) throws SQLException, Exception {
        return ADJMassiveDAO.search(filter);
    }
    public List<A3344Filter> ListAdjmassive(A3344Filter filter) throws SQLException, Exception {
        return ADJMassiveDAO.ListAdjmassive(filter);
    }

    public String subirExcel(ArrayList<A3344Filter> filter, String strOption, String nameFile) throws SQLException, Exception {
        return ADJMassiveDAO.subirExcel(filter, strOption, nameFile);
    }

    public String insertTKT(ArrayList<A3344Filter> filter) throws SQLException, Exception {
        return ADJMassiveDAO.insertTKT(filter);
    }

    public A3344Filter lst_delete(A3344Filter filter) throws SQLException, Exception {
        return ADJMassiveDAO.lstdelete(filter);
    }

}
