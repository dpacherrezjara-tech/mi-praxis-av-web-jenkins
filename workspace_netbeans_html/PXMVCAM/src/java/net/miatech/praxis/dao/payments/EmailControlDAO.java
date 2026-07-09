/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.MPF248Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author ftorres
 */
public class EmailControlDAO {
    
    
    
    
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");
    
    
        public EmailControlDAO() {
    }
        
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public EmailControlDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    
    //Creamos la primera lista para llenar la grilla principal
    
    public List<MPF248Filter> searchEmailControl(MPF248Filter filter)throws SQLException, Exception {
        
        
        
        List<MPF248Filter> listaData = new ArrayList<>();
        MPF248Filter bean;
        
        
        String SQL = "{CALL PRAXISMP.MPS636(?, ?, ?, ?, ?)}";
        
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        
        
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            // para la paginacion
            cstmt.registerOutParameter(2, Types.INTEGER);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);

            // los de entrada
    
           // cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(1, filter.IN_PROCESS.trim());
            cstmt.setInt(2, filter.page.PAGNUM);
            cstmt.setInt(3, filter.page.PAGROW);
            cstmt.setInt(4, filter.page.TOTPAG);
            cstmt.setInt(5, filter.page.TOTROW);

            cstmt.execute();

            // se actualiza paginacion
            filter.page.PAGNUM = cstmt.getInt(2);
            filter.page.PAGROW = cstmt.getInt(3);
            filter.page.TOTPAG = cstmt.getInt(4);
            filter.page.TOTROW = cstmt.getInt(5);

            rst = cstmt.getResultSet();

            while (rst != null && rst.next()) {
                bean = new MPF248Filter();

                bean.ID = rst.getString("ID").trim();
                bean.PROCESS = rst.getString("PROCESS").trim();
                bean.TOTAL_EMAILS = rst.getInt("TOTAL_EMAILS");
                bean.TOTAL_TO = rst.getInt("TOTAL_TO");
                bean.TOTAL_CC = rst.getInt("TOTAL_CC");
                bean.TOTAL_BCC = rst.getInt("TOTAL_BCC");
                


                // Copiar paginación en cada bean si es necesario
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                listaData.add(bean);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException ignored) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException ignored) {
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return listaData;
        
        
    }
    
    ////DETAIL
    
    public List<MPF248Filter> searchEmailControlDetail(MPF248Filter filter)throws SQLException, Exception {
        
        
        
        List<MPF248Filter> listaData = new ArrayList<>();
        MPF248Filter bean;
        
        
        String SQL = "{CALL PRAXISMP.MPS637(?, ?, ?, ?, ?)}";
        
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        
        
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            // para la paginacion
            cstmt.registerOutParameter(2, Types.INTEGER);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);

            // los de entrada
    
           // cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(1, filter.IN_PROCESS.trim());
            cstmt.setInt(2, filter.page.PAGNUM);
            cstmt.setInt(3, filter.page.PAGROW);
            cstmt.setInt(4, filter.page.TOTPAG);
            cstmt.setInt(5, filter.page.TOTROW);

            cstmt.execute();

            // se actualiza paginacion
            filter.page.PAGNUM = cstmt.getInt(2);
            filter.page.PAGROW = cstmt.getInt(3);
            filter.page.TOTPAG = cstmt.getInt(4);
            filter.page.TOTROW = cstmt.getInt(5);

            rst = cstmt.getResultSet();

            while (rst != null && rst.next()) {
                bean = new MPF248Filter();

               
                bean.PROCESS = rst.getString("PROCESS").trim();
                bean.EMAIL = rst.getString("EMAIL").trim();
                bean.ROL = rst.getString("ROLE").trim();
                bean.PTYPE = rst.getString("TYPE").trim();
                bean.STATUS = rst.getString("STATUS").trim();
                bean.TRAN = rst.getString("TRAN").trim();
                
                               //// del sistema
                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");

                


                // Copiar paginación en cada bean si es necesario
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                listaData.add(bean);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException ignored) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException ignored) {
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return listaData;
        
        
    }
    
    ///
    
    
//    
//    public String MPF116UPDATE_PAYMENT_SCHEDULE(MPF116Filter filter) throws SQLException, Exception {
//    String message = "Update successful.";
//    CallableStatement cstmt = null;
//    Connection cnx = null;
//
//    String SQL = "{CALL PRAXISMP.MPS347(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//
//    try {
//        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//        cstmt = cnx.prepareCall(SQL);
//        
//        cstmt.registerOutParameter(15, Types.VARCHAR);
//        
//
//        cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
//        cstmt.setString(2, filter.SAGENT.trim());
//        cstmt.setString(3, filter.SUBFTE.trim());
//        cstmt.setString(4, filter.SCOUNTRY.trim());
//        cstmt.setString(5, filter.NAMEAG.trim());
//        cstmt.setString(6, filter.TVENTA.trim());
//        cstmt.setString(7, filter.AGROUPD.trim());
//        cstmt.setString(8, filter.DFREQPAY.trim());
//        cstmt.setString(9, filter.FPAGO.trim());
//        cstmt.setString(10, filter.QTYPAGO.trim());
//        cstmt.setInt(11, filter.QTYDPOS);
//        cstmt.setInt(12, filter.QTYDPRE);
//        cstmt.setString(13, filter.DIAPAGO.trim());
//        
//
//        cstmt.setString(14, session.getUserView().getUserInfo().USR);
//        cstmt.setString(15, "");
//        
//        
//        cstmt.execute();
//        
//        message = cstmt.getString(15);
//
//    } catch (Exception e) {
//        e.printStackTrace();
//        message = e.getMessage();
//    } finally {
//        if (cstmt != null) 
//            try {
//                cstmt.close();
//            } catch (SQLException e) {
//            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//        }
//        session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//        pasarGarbageCollector();
//    }
//
//    return message;
//}

    
    
    public String mantenimientoMPF248(MPF248Filter filter) throws SQLException, Exception {
    String message = "Update successful.";
    CallableStatement cstmt = null;
    Connection cnx = null;

    String SQL = "{CALL PRAXISMP.MPS638(?,?,?,?,?,?,?,?)}";

    try {
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        cstmt = cnx.prepareCall(SQL);
        
        cstmt.registerOutParameter(8, Types.VARCHAR);
        

        //cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
        cstmt.setString(1, filter.IN_OPTION.trim());
        cstmt.setString(2, filter.PROCESS.trim());
        cstmt.setString(3, filter.TRAN.trim());
        cstmt.setString(4, filter.EMAIL.trim());
        cstmt.setString(5, filter.ROL.trim());
        cstmt.setString(6, filter.PTYPE.trim());
        cstmt.setString(7, filter.STATUS.trim());
   
        

        //cstmt.setString(14, session.getUserView().getUserInfo().USR);
        cstmt.setString(8, "");
        
        
        cstmt.execute();
        
        message = cstmt.getString(8);

     } catch (Exception e) {
        e.printStackTrace();
        message = e.getMessage();
    } finally {
        if (cstmt != null) 
            try {
                cstmt.close();
            } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        }
        session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        pasarGarbageCollector();
    }

    return message;
}

    
    
    ////////////////combo process ///
    
        public List<MPF248Filter> searchProcessList(MPF248Filter filter) throws SQLException, Exception {

        List<MPF248Filter> lstProcess = new ArrayList<>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.MPS639()}";

        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                MPF248Filter item = new MPF248Filter();

                item.PROCESS = rst.getString("PROCESS").trim();

                lstProcess.add(item);
            }

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                }
            }

            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                }
            }

            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
        }

        return lstProcess;
    }
    
    
    
}
