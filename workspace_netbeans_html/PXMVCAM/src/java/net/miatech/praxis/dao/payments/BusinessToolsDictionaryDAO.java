/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import net.miatech.praxis.dao.interline.*;
import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.payments.MerchantNumberDAO.pasarGarbageCollector;
import static net.miatech.praxis.dao.payments.TableMessageDAO.pasarGarbageCollector;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2353Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class BusinessToolsDictionaryDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BusinessToolsDictionaryDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BusinessToolsDictionaryDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2353Filter> loadPX643MPS079(A2353Filter filter) throws SQLException, Exception {

        List<A2353Filter> lstData = new ArrayList<A2353Filter>(0);
        A2353Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS079(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            //cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(1, filter.IN_SOURCEF.trim());
            cstmt.setString(2, filter.IN_TABNAME.trim());
            cstmt.setString(3, filter.IN_DESCRIPT.trim());
            cstmt.setString(4, filter.IN_SYSTFIELD.trim());

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A2353Filter();
                bean.SOURCEF = rst.getString("SOURCEF").trim();
                bean.TABNAME = rst.getString("TABNAME").trim();
                bean.USERFIELD = rst.getString("USERFIELD").trim();
                bean.DESCRIPT = rst.getString("DESCRIPT").trim();
                bean.QTYREG = rst.getInt("QTYREG");

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<A2353Filter> loadPX643MPS079D(A2353Filter filter) throws SQLException, Exception {

        A2353Filter objRtn = new A2353Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<A2353Filter> lstRtn = new ArrayList<A2353Filter>(0);
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS079D(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.TABNAME.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2353Filter();
                objRtn.TABNAME = rs01.getString("TABNAME").trim();
                objRtn.SOURCEF = rs01.getString("SOURCEF").trim();
                objRtn.USERFIELD = rs01.getString("USERFIELD").trim();
                objRtn.DESCRIPT = rs01.getString("DESCRIPT").trim();
                objRtn.SYSTFIELD = rs01.getString("SYSTFIELD").trim();
                objRtn.LENGHTF = rs01.getString("LENGHTF").trim();
                objRtn.DATATYPE = rs01.getString("DATATYPE").trim();
                objRtn.ORDERSEL = rs01.getString("ORDERSEL").trim();

                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public String loadPX643MPS079AP(A2353Filter filter, String option) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA MPF109.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;
        int QTYCP = 0,QTYEX = 0;
        String TABLA = filter.TABNAME.trim();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL00 = "{CALL " + session.getMainLibrary() + ".MPS079QTY(?)}";

        Connection cnx0 = null;
        try {
            cnx0 = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx0.prepareCall(SQLCLL00);

            cstmt01.setString(1, filter.TABNAME.trim());
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                QTYEX = rs01.getInt("QTY_EX");
                QTYCP = rs01.getInt("QTY_CP");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        
        
        
        
        
        
        if(QTYEX != 0){
            if(QTYEX == 0){
                System.out.println("Se crea tabla");
                
                String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS079BT(?,?,?,?,?)}";

            Connection cnx = null;
            try {
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt = cnx.prepareCall(SQLCLL01);

                cstmt.setString(1, filter.TABLA.trim());
                cstmt.setString(2, filter.DESCR.trim());
                cstmt.setString(3, session.getUserView().getUserInfo().USR);
                cstmt.setString(4, Functions.getFechaActual());
                cstmt.setString(5, Functions.getHoraActual());

                cstmt.execute();
                cstmt.close();

            } catch (Exception e) {
                e.printStackTrace();
                strMsj = e.getMessage();
            } finally {
                if (cstmt != null) {
                    try {
                        cstmt.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
                pasarGarbageCollector();
            }
            }else{
                System.out.println("La tabla " + TABLA + " está cargada");
                strMsj = "La tabla " + TABLA + " ya está cargada";
            }
        }else{
            System.out.println("La tabla " + TABLA + " no existe");
            strMsj = "La tabla " + TABLA + " no existe";
        }
        
        return strMsj;
    }

    public String loadPX633MPS012(A2353Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2284.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".MPS012(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // LLAMA AL PROCEDURE

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.APLIC.trim());
            cstmt.setString(4, filter.INPNAME.trim());
            cstmt.setString(5, filter.TABLA.trim());
            cstmt.setString(6, filter.NETDIR.trim());
            cstmt.setString(7, filter.INPDESC.trim());
            cstmt.setString(8, filter.STAT.trim());
            cstmt.setString(9, filter.INPEXTE.trim());
            cstmt.setString(10, filter.OUTNAME.trim());
            cstmt.setString(11, filter.FASE.trim());
            cstmt.setString(12, filter.INPTYPE.trim());
            cstmt.setString(13, filter.FECPROC.trim());
            cstmt.setString(14, filter.DENV.trim());
            cstmt.setInt(15, filter.QTYREG);
            cstmt.setString(16, filter.LIBNAME.trim());
            cstmt.setString(17, filter.SEQNUM.trim());

            cstmt.setString(18, session.getUserView().getUserInfo().USR);
            cstmt.setString(19, Functions.getFechaActual());
            cstmt.setString(20, Functions.getHoraActual());
            cstmt.execute(); // se ejcuta

        } catch (Exception e) {
            //e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;
    }

    public List<A2353Filter> loadPX643MPS079AP(A2353Filter filter) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
