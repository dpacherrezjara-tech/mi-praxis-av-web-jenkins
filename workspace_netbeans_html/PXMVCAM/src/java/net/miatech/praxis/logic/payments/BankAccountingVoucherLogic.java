/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.BankAccountingVoucherDAO;
import net.miatech.praxis.payment.A2364;

/**
 *
 * @author jtorres
 */
public class BankAccountingVoucherLogic {
    
    private BankAccountingVoucherDAO bankAccountingVoucherDAO = new BankAccountingVoucherDAO();

    public void setSession(IServerSession ss) {
        bankAccountingVoucherDAO.setSession(ss);
    }

    public List<A2364> loadPX491SQP02837(A2364 filter) throws SQLException, Exception {
        return bankAccountingVoucherDAO.loadPX491SQP02837(filter);
    }

    public List<A2364> loadPX491SQP02880(A2364 filter) throws SQLException, Exception {
        return bankAccountingVoucherDAO.loadPX491SQP02880(filter);
    }

    public List<A2364> loadPX491SQP03447(A2364 filter) throws SQLException, Exception {
        return bankAccountingVoucherDAO.loadPX491SQP03447(filter);
    }
     
    public List<A2364> loadPX491SQP02838(A2364 filter) throws SQLException, Exception {
        return bankAccountingVoucherDAO.loadPX491SQP02838(filter);
    }

       public List<A2364> loadPX491SQP03448(A2364 filter) throws SQLException, Exception {
        return bankAccountingVoucherDAO.loadPX491SQP03448(filter);
    }
    
     public List<A2364> loadPX491SQP02882(A2364 filter) throws SQLException, Exception {
        return bankAccountingVoucherDAO.loadPX491SQP02882(filter);
    }

    public List<A2364> loadPX491SQP02882POLI(A2364 filter) throws SQLException, Exception {
        return bankAccountingVoucherDAO.loadPX491SQP02882POLI(filter);
    }

    public HashMap loadPX491SQP0491XX1(A2364 filter) throws SQLException, Exception {
        return bankAccountingVoucherDAO.loadPX491SQP0491XX1(filter);
    }
     public HashMap loadPX491SQP0491XX2(A2364 filter) throws SQLException, Exception {
        return bankAccountingVoucherDAO.loadPX491SQP0491XX2(filter);
    }
    
}
