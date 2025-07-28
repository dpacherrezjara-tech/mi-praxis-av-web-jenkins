/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.dao.payments.MerchantNumberDAO;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2354Filter;

/**
 *
 * @author lmendoza
 */
public class MerchantNumberLogic {

    private final MerchantNumberDAO MerchantNumberDAO = new MerchantNumberDAO();

    public void setSession(IServerSession ss) {
        MerchantNumberDAO.setSession(ss);
    }

    public List<A2280Filter> loadPX265SQP00660(A2280Filter filter) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX265SQP00660(filter);
    }

   
   public String loadPX267SQP00672(A2280Filter filter, String option) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX267SQP00672(filter, option);
    }
    public A2280Filter loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX267SQP00673(filter);
    } 
    
    public String loadPX265SQP00661(A2280Filter filter, String option) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX265SQP00661(filter, option);
    }
    
    public A2280Filter loadPX265SQP00662(A2280Filter filter) throws Exception {
        return MerchantNumberDAO.loadPX265SQP00662(filter);
    }
    
    public List<A2354Filter> loadPX305SQP00933(A2354Filter filter) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX305SQP00933(filter);
    }
    
    public List<A2354Filter> loadPX305SQP04580(A2354Filter filter) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX305SQP04580(filter);
    }
    
    public List<A003> loadPX305SQP04435(String IATA) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX305SQP04435(IATA);
    }
    
    public List<A4202> loadPX305SQP04415(String MERCHN) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX305SQP04415(MERCHN);
    }
    
    public String loadPX305SQP00934(A2354Filter filter, String option) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX305SQP00934(filter, option);
    }
    
    public String loadPX305SQP00934_INSERT(A2354Filter filter, String option) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX305SQP00934_INSERT(filter, option);
    }
    
    public A2354Filter loadPX305SQP00935(A2354Filter filter) throws Exception {
        return MerchantNumberDAO.loadPX305SQP00935(filter);
    }
    
    public List<A2354Filter> loadPX305SQP00938(A2354Filter filter) throws Exception {
        return MerchantNumberDAO.loadPX305SQP00938(filter);
    }
    
    public List<A2354Filter> loadPX305SQP00939(A2354Filter filter) throws Exception {
        return MerchantNumberDAO.loadPX305SQP00939(filter);
    }
    
    public List<A2354Filter> loadPX305SQP00940(A2354Filter filter) throws Exception {
        return MerchantNumberDAO.loadPX305SQP00940(filter);
    }
    
    public String loadPX305SQP00941(List<A2354Filter> lst,int contador,String option) throws SQLException, Exception {
        return MerchantNumberDAO.loadPX305SQP00941(lst,contador,option);
    }
    
    public String load_MPS114(A2354Filter filterNew,A2354Filter filterOld, String option) throws SQLException, Exception {
        return MerchantNumberDAO.load_MPS114(filterNew, filterOld, option);
    }
    
    public List<A2354Filter> load_MPS115(A2354Filter filter) throws SQLException, Exception {
        return MerchantNumberDAO.load_MPS115(filter);
    }
    
    public String load_MPS116(A2354Filter filterNew,String merchant, String option) throws SQLException, Exception {
        return MerchantNumberDAO.load_MPS116(filterNew, merchant, option);
    }
    
    public String load_MPS265(A2354Filter filterNew) throws SQLException, Exception {
        return MerchantNumberDAO.load_MPS265(filterNew);
    }
    
    
}
