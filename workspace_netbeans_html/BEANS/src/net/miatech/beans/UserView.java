/*
 * UserView.java
 *
 * Created on 05 de Febrero de 2010, 15:58 PM
 */

package net.miatech.beans;

import java.io.Serializable;
import net.miatech.praxis.INF001;
import net.miatech.praxis.INF020;

/**
 *
 * @author  rmayta
 */
public class UserView implements Serializable {
    
    private INF001 userInfo;
    private INF020 customerInfo;
    private S0010INF020Filter customerInfoComplete;
    
    public UserView() {
        
    }

    public INF001 getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(INF001 userInfo) {
        this.userInfo = userInfo;
    }

    public INF020 getCustomerInfo() {
        return customerInfo;
    }
    
    public S0010INF020Filter getCustomerInfoComplete() {
        return customerInfoComplete;
    }

    public void setCustomerInfoComplete(S0010INF020Filter customerInfoComplete) {
        this.customerInfoComplete = customerInfoComplete;
        this.customerInfo = customerInfoComplete.fileINF020;
    }
}
