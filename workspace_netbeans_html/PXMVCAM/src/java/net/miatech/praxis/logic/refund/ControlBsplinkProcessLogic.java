/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.refund;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.refund.ControlBsplinkProcessDAO;
import net.miatech.praxis.payment.filter.MPF116Filter;
import net.miatech.praxis.refund.filter.A3096Filter;

/**
 *
 * @author ftorres
 */
public class ControlBsplinkProcessLogic {
    
    
    private final ControlBsplinkProcessDAO ctrlBspLink = new ControlBsplinkProcessDAO();
    
    
     public void setSession(IServerSession ss){
        ctrlBspLink.setSession(ss);
    }
     
     
     
//     
//     public List<MPF116Filter> loadPX692LISTAR_SCHEDULE_MPF116(MPF116Filter filter) throws SQLException, Exception {
//        return ctrlBspLink.loadPX692LISTAR_SCHEDULE_MPF116(filter);
//
//    }
     
     
     public List<A3096Filter> loadRFS0034(A3096Filter filter) {
        return this.ctrlBspLink.loadRFS0034(filter);
    }
     
     
     public List<A3096Filter> RFS0035(A3096Filter filter) {
        return this.ctrlBspLink.RFS0035(filter);
    }
     
     
     
       public List<A3096Filter> RFS0036(A3096Filter filter) {
        return this.ctrlBspLink.RFS0036(filter);
    }
     
     
     

    
    
}
