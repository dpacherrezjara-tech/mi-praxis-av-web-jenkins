/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.EmailControlDAO;
import net.miatech.praxis.payment.filter.MPF248Filter;


/**
 *
 * @author ftorres
 */
public class EmailControlLogic {
    
    
    
    private final EmailControlDAO eCo = new EmailControlDAO();
    
    
     public void setSession(IServerSession ss){
        eCo.setSession(ss);
    }
     
     
     

     
     
     public List<MPF248Filter> searchEmailControl(MPF248Filter filter) throws SQLException, Exception {
        return eCo.searchEmailControl(filter);
    }
     
     
//      public String searchEmailControl(MPF248Filter filter) throws SQLException, Exception {
//        return eCo.searchEmailControl(filter);
//    }
//    
     
        public List<MPF248Filter> searchEmailControlDetail(MPF248Filter filter) throws SQLException, Exception {
        return eCo.searchEmailControlDetail(filter);
    }
        
        //
     
    
           
     
      public String mantenimientoMPF248(MPF248Filter filter) throws SQLException, Exception {
        return eCo.mantenimientoMPF248(filter);
    }
    
    
    
}
