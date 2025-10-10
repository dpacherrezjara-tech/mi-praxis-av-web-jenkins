/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ErrorControlModuleDAO;
import net.miatech.praxis.payment.entities.MPF122Filter;
import net.miatech.praxis.payment.filter.A4451Filter;

/**
 *
 * @author ftorres
 */
public class ErrorControlModuleLogic {
    
    
    private final ErrorControlModuleDAO errorControl = new ErrorControlModuleDAO();
    
    
     public void setSession(IServerSession ss){
        errorControl.setSession(ss);
    }
     
     
     
     
          
     public List<MPF122Filter> listarErrorControlMPF122(MPF122Filter filter) throws SQLException, Exception {
        return errorControl.listarErrorControlMPF122(filter);

    }
     
     
        public String callStoreMPS210(String codpro,String prda) throws SQLException, Exception {
            return errorControl.callStoreMPS210(codpro, prda);
        }
    
    
    
}
