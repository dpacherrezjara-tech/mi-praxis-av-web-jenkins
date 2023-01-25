/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A2560Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.ADMManualFormDAO;

/**
 *
 * @author zperez
 */
public class ADMManualFormLogic {

    private ADMManualFormDAO ADMManualDAO = new ADMManualFormDAO();

    public void setSession(IServerSession ss) {
        ADMManualDAO.setSession(ss);
    }

    public List<SQP00911Filter> search(SQP00911Filter filter) throws SQLException, Exception {
        return ADMManualDAO.search(filter);
    }

    public SQP00911Filter SearchDataACMADM(SQP00911Filter filter) throws SQLException, Exception {
        return ADMManualDAO.SearchDataACMADM(filter);
    }
    public List<A1673Filter> SearchDataCalcuImpuestos(A1673Filter filter) throws SQLException, Exception {
        return ADMManualDAO.SearchDataCalcuImpuestos(filter);
    }
    public List<A2560Filter> SearchADManualRazon(A2560Filter filter) throws SQLException, Exception {
        return ADMManualDAO.SearchADManualRazon(filter);
    }
    public String ProcesaManualADM(SQP00911Filter filter,String lstaTaxes,String lstarazones) throws SQLException, Exception {
        return ADMManualDAO.ProcesaManualADM(filter, lstaTaxes,lstarazones);
    }
    public String insertTKTManual(ArrayList<SQP00911Filter> filter) throws SQLException, Exception {
        return ADMManualDAO.insertTKTManual(filter);
    }
    public String DeleteADMMANUAL(SQP00911Filter filter) throws SQLException, Exception {
        return ADMManualDAO.DeleteADMMANUAL(filter);
    }

}
