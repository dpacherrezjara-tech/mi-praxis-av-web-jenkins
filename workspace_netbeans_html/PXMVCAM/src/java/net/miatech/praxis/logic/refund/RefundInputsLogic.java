/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.refund;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.refund.ControlBsplinkProcessDAO;
import net.miatech.praxis.dao.refund.RefundInputsDAO;
import net.miatech.praxis.payment.filter.MPF116Filter;
import net.miatech.praxis.refund.A2745;
import net.miatech.praxis.refund.filter.A3096Filter;

/**
 *
 * @author ftorres
 */
public class RefundInputsLogic {
    
    
    private final RefundInputsDAO rfndInput = new RefundInputsDAO();
    
    
     public void setSession(IServerSession ss){
        rfndInput.setSession(ss);
    }
     

     
     
     public List<A2745> obtenerLstControlV1(A2745 filter) throws Exception {
        return this.rfndInput.obtenerLstControlV1(filter);
    }
     
     public List<A2745> getListTktDetail(A2745 filter) throws Exception {
        return this.rfndInput.getListTktDetail(filter);
    }
    
     
      public List<A2745> getListTktDetailAll(A2745 filter) throws Exception {
        return this.rfndInput.getListTktDetailAll(filter);
    }
     
     

    
    
}
