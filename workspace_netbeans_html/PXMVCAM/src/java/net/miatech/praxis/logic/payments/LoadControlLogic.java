///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package net.miatech.praxis.logic.payments;
//
//import net.miatech.praxis.logic.interline.*;
//import java.sql.SQLException;
//import java.util.HashMap;
//import java.util.List;
//import net.miatech.beans.spring.implement.IServerSession;
//import net.miatech.praxis.dao.interline.ReasonCodeReportDAO;
//import net.miatech.praxis.dao.payments.LoadControlDAO;
//import net.miatech.praxis.interline.filter.SFI021Filter;
//import net.miatech.praxis.payment.filter.A2280Filter;
//import net.miatech.praxis.payment.filter.A2287Filter;
//import net.miatech.praxis.payment.filter.A2290Filter;
//import net.miatech.praxis.payment.filter.A2353Filter;
//import net.miatech.praxis.payment.filter.A2354Filter;
//
///**
// *
// * @author lmendoza
// */
//public class LoadControlLogic {
//
//    private final LoadControlDAO LoadControlDAO = new LoadControlDAO();
//
//    public void setSession(IServerSession ss) {
//        LoadControlDAO.setSession(ss);
//
//    }
//
////    public List<A2280Filter> loadPX265SQP00660(A2280Filter filter) throws SQLException, Exception {
////        return LoadControlDAO.loadPX265SQP00660(filter);
////    }
//
//   
////   public String loadPX267SQP00672(A2280Filter filter, String option) throws SQLException, Exception {
////        return LoadControlDAO.loadPX267SQP00672(filter, option);
////    }
////    public A2280Filter loadPX267SQP00673(A2280Filter filter) throws SQLException, Exception {
////        return LoadControlDAO.loadPX267SQP00673(filter);
////    } 
////    
////    public String loadPX265SQP00661(A2280Filter filter, String option) throws SQLException, Exception {
////        return LoadControlDAO.loadPX265SQP00661(filter, option);
////    }
////    
////    public A2280Filter loadPX265SQP00662(A2280Filter filter) throws Exception {
////        return LoadControlDAO.loadPX265SQP00662(filter);
////    }
////    
////    public List<A2354Filter> loadPX305SQP00933(A2354Filter filter) throws SQLException, Exception {
////        return LoadControlDAO.loadPX305SQP00933(filter);
////    }
////    
////    public String loadPX305SQP00934(A2354Filter filter, String option) throws SQLException, Exception {
////        return LoadControlDAO.loadPX305SQP00934(filter, option);
////    }
////    
////    public A2354Filter loadPX305SQP00935(A2354Filter filter) throws Exception {
////        return LoadControlDAO.loadPX305SQP00935(filter);
////    }
//    
//    public List<A2353Filter> loadPX285SQP00827_LOADCONTROL(A2353Filter filter) throws SQLException, Exception {
//        return LoadControlDAO.loadPX285SQP00827_LOADCONTROL(filter);
//    }
//    
////    public String loadPX285SQP00828(A2353Filter filter, String option) throws SQLException, Exception {
////        return LoadControlDAO.loadPX285SQP00828(filter, option);
////    }
////    
////    public A2353Filter loadPX285SQP00829(A2353Filter filter) throws Exception {
////        return LoadControlDAO.loadPX285SQP00829(filter);
////    }
//
//}
