/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.PaymentScheduleDAO;
import net.miatech.praxis.payment.filter.MPF116Filter;

/**
 *
 * @author ftorres
 */
public class PaymentScheduleLogic {
    
    
    private final PaymentScheduleDAO paySchedule = new PaymentScheduleDAO();
    
    
     public void setSession(IServerSession ss){
        paySchedule.setSession(ss);
    }
     
     
     
     
     public List<MPF116Filter> loadPX692LISTAR_SCHEDULE_MPF116(MPF116Filter filter) throws SQLException, Exception {
        return paySchedule.loadPX692LISTAR_SCHEDULE_MPF116(filter);

    }
     
     
     public List<MPF116Filter> loadPRAXISMPLISTAR_PAISES_CBO(MPF116Filter filter) throws SQLException, Exception {
        return paySchedule.loadPRAXISMPLISTAR_PAISES_CBO(filter);
    }
     
     
      public String MPF116UPDATE_PAYMENT_SCHEDULE(MPF116Filter filter) throws SQLException, Exception {
        return paySchedule.MPF116UPDATE_PAYMENT_SCHEDULE(filter);
    }
    
    
    
}
