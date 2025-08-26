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
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.MPF116Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author ftorres
 */
public class PaymentScheduleDAO {
    
    
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");
    
    
        public PaymentScheduleDAO() {
    }
        
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public PaymentScheduleDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    
    //Creamos la primera lista para llenar la grilla principal
    
    public List<MPF116Filter> loadPX692LISTAR_SCHEDULE_MPF116(MPF116Filter filter)throws SQLException, Exception {
        
        
        
        List<MPF116Filter> listaData = new ArrayList<>();
        MPF116Filter bean;
        
        
        String SQL = "{CALL PRAXISMP.LISTAR_SCHEDULE_MPF116(?, ?, ?, ?, ?, ?,?,?)}";
        
        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;
        
        
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);

            // para la paginacion
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            // los de entrada
    
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_SAGENT.trim());
            cstmt.setString(3, filter.IN_AGROUPD.trim());
            cstmt.setString(4, filter.SCOUNTRY.trim());
            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            // se actualiza paginacion
            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();

            while (rst != null && rst.next()) {
                bean = new MPF116Filter();

                bean.SAGENT = rst.getString("SAGENT");
                bean.SCOUNTRY = rst.getString("SCOUNTRY");
                bean.NAMEAG = rst.getString("NAMEAG");
                bean.TVENTA = rst.getString("TVENTA");
                bean.AGROUPD = rst.getString("AGROUPD");

                bean.SUBFTE = rst.getString("SUBFTE");
                bean.DFREQPAY = rst.getString("DFREQPAY");
                bean.FPAGO = rst.getString("FPAGO");
                bean.QTYPAGO = rst.getString("QTYPAGO");
                bean.QTYDPOS = rst.getInt("QTYDPOS");
                bean.DIAPAGO = rst.getString("DIAPAGO");
                bean.IN_DESCCOUNTRY = rst.getString("DESCCOUNTRY");
                bean.QTYDPRE = rst.getInt("QTYDPRE");







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
    
    
    
    ////////////////combo paises ///
    
    
    
    public List<MPF116Filter> loadPRAXISMPLISTAR_PAISES_CBO(MPF116Filter filter) throws SQLException, Exception {

        List<MPF116Filter> lstPaises = new ArrayList<MPF116Filter>(0);
        
        MPF116Filter item;
        
        item = new MPF116Filter();
        item.SCOUNTRY = "";
        item.DESCCOUNTRY = "ALL";
        lstPaises.add(item);



        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.LISTAR_PAISES_CBO()}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.execute();

            rst = cstmt.getResultSet();

             while (rst.next()) {
            item = new MPF116Filter();
            item.SCOUNTRY = rst.getString("SCOUNTRY").trim();
            item.DESCCOUNTRY = item.SCOUNTRY + " - "+ rst.getString("DESCCOUNTRY").trim();
            lstPaises.add(item);
        }
            rst.close();



            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (rst != null) try {
                    rst.close();
                } catch (SQLException e) {
                }
                if (cstmt != null) try {
                    cstmt.close();
                } catch (SQLException e) {
                }
                if (cnx != null) {
                    session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
                }
            }

            return lstPaises;

    
    }
    
    
    /////UPDATE 
    
       
    public String MPF116UPDATE_PAYMENT_SCHEDULE(MPF116Filter filter) throws SQLException, Exception {
    String message = "Update successful.";
    CallableStatement cstmt = null;
    Connection cnx = null;

    String SQL = "{CALL PRAXISMP.UPDATE_PAYMENT_SCHEDULE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

    try {
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        cstmt = cnx.prepareCall(SQL);
        
        cstmt.registerOutParameter(15, Types.VARCHAR);
        

        cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
        cstmt.setString(2, filter.SAGENT.trim());
        cstmt.setString(3, filter.SUBFTE.trim());
        cstmt.setString(4, filter.SCOUNTRY.trim());
        cstmt.setString(5, filter.NAMEAG.trim());
        cstmt.setString(6, filter.TVENTA.trim());
        cstmt.setString(7, filter.AGROUPD.trim());
        cstmt.setString(8, filter.DFREQPAY.trim());
        cstmt.setString(9, filter.FPAGO.trim());
        cstmt.setString(10, filter.QTYPAGO.trim());
        cstmt.setInt(11, filter.QTYDPOS);
        cstmt.setInt(12, filter.QTYDPRE);
        cstmt.setString(13, filter.DIAPAGO.trim());
        

        cstmt.setString(14, session.getUserView().getUserInfo().USR);
        cstmt.setString(15, "");
        
        
        cstmt.execute();
        
        message = cstmt.getString(15);

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



    
}
