/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.CintaValidationDAO;
import net.miatech.praxis.dao.payments.EmailControlDAO;
import net.miatech.praxis.payment.filter.A1348Filter;
import net.miatech.praxis.payment.filter.MPF248Filter;

/**
 *
 * @author ftorres
 */
public class CintaValidationLogic {
    
    
        private final CintaValidationDAO cintaVal = new CintaValidationDAO();
    
    
     public void setSession(IServerSession ss){
        cintaVal.setSession(ss);
    }
     
     
     

     
     
     public List<A1348Filter> searchCintaValidation(A1348Filter filter) throws SQLException, Exception {
        return cintaVal.searchCintaValidation(filter);
    }
     
     
      public List<A1348Filter> searchDetail(A1348Filter filter) throws SQLException, Exception {
        return cintaVal.searchDetail(filter);
    }
     
     
    
    
    
    
}
