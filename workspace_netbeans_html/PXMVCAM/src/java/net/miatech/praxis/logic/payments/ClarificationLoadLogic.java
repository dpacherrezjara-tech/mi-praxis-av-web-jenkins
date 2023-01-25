/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1686Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ClarificationLoadDAO;
import net.miatech.praxis.payment.filter.A2331Filter;

/**
 *
 * @author 
 */
public class ClarificationLoadLogic {

    private final ClarificationLoadDAO ClarificationLoadDAO = new ClarificationLoadDAO();

    public void setSession(IServerSession ss) {
        ClarificationLoadDAO.setSession(ss);

    }
    
    public String loadPX413SQP02535(List<String> listaExcelString , String strBanco, int fil, String horaActual) throws SQLException, IOException, Exception {
        return ClarificationLoadDAO.loadPX413SQP02535(listaExcelString,strBanco,fil,horaActual);
    }
    
    public String loadPX413PRO10570(String strBanco, String strHora, String type_file) throws SQLException, Exception {
        return ClarificationLoadDAO.loadPX413PRO10570(strBanco, strHora,type_file);
    }
    
    public String loadPX413SQP03598(List<A1686Filter> lstExcel) throws SQLException, IOException, Exception {
        return ClarificationLoadDAO.loadPX413SQP03598(lstExcel);
    }
    
    // ------------------------ Upload ------------------------
    
    public String loadPX413SQP01999(List lstExcel, String strBanco, String strHora) throws SQLException, Exception {
        return ClarificationLoadDAO.loadPX413SQP01999(lstExcel, strBanco, strHora);
    }
    
    public String loadPX413PRO10577(String strBanco, String strHora) throws SQLException, Exception {
        return ClarificationLoadDAO.loadPX413PRO10577(strBanco, strHora);
    }
    
    public String loadPX413SQP01977(List lstExcel, String strBanco, String strHora) throws SQLException, Exception {
        return ClarificationLoadDAO.loadPX413SQP01977(lstExcel, strBanco, strHora);
    }
    
    // ------------------------ Search ------------------------
    public List<A1686Filter> loadPX264SQP00665(A1686Filter filter, String consulta) throws SQLException, Exception {
        return ClarificationLoadDAO.loadPX264SQP00665(filter, consulta);
    }
}
