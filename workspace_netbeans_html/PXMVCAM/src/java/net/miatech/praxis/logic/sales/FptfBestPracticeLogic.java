/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A722;
import net.miatech.praxis.dao.sales.FptfABestPracticeDAO;

/**
 *
 * @author lmendoza
 */
public class FptfBestPracticeLogic {

    private final FptfABestPracticeDAO fptfABestPracticeDAO = new FptfABestPracticeDAO();

    public void setSession(IServerSession ss) {
        fptfABestPracticeDAO.setSession(ss);
    }

    public List loadFormaReport(A722 filter) throws SQLException, Exception {
        return fptfABestPracticeDAO.loadFormaReport(filter);
    }
    
     public A722 loadA722CompleteData( A722 filter)throws SQLException, Exception {
        return  fptfABestPracticeDAO.loadA722CompleteData(filter);
    }
}
