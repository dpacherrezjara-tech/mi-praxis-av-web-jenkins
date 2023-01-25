/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import net.miatech.beans.A1952Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CatalogueFlightDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CatalogueFlightDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CatalogueFlightDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1952Filter> loadPX244SQP00244(A1952Filter filter) throws SQLException, Exception {

        List<A1952Filter> lstObjetos = new ArrayList<>(0);
        A1952Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00244_1(?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TYPE);
            cstmt.setString(3, filter.IN_NFLIGHT);
            cstmt.setString(4, filter.IN_CARRIER);
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
                beanTkt = new A1952Filter();
                beanTkt.NFLIGHT = rst.getString("NFLIGHT");
                beanTkt.CARRIER = rst.getString("CARRIER");
                beanTkt.NFLIGMKT = rst.getString("NFLIGMKT");
                beanTkt.CARRIMKT = rst.getString("CARRIMKT");
                beanTkt.FREQ = rst.getString("FREQ");
                beanTkt.EQUIPO = rst.getString("EQUIPO");
                if (rst.getString("TOPER").equals("D")) {
                    beanTkt.TOPER = "Domestic";
                } else if (rst.getString("TOPER").equals("I")) {
                    beanTkt.TOPER = "International";
                } else {
                    beanTkt.TOPER = " ";
                }
                if (rst.getString("TFLIGH").equals("J")) {
                    beanTkt.TFLIGH = "Scheduled";
                } else if (rst.getString("TFLIGH").equals("C")) {
                    beanTkt.TFLIGH = "Charter";
                } else {
                    beanTkt.TFLIGH = " ";
                }
                beanTkt.NFLIGHTH = rst.getString("NFLIGHTH");
                beanTkt.CARRIERH = rst.getString("CARRIERH");

                beanTkt.USCR = rst.getString("USCR").trim();
                beanTkt.FECR = rst.getString("FECR").trim();
                beanTkt.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                beanTkt.USUP = rst.getString("USUP").trim();
                beanTkt.FEUP = rst.getString("FEUP").trim();
                beanTkt.HOUP = Functions.ConvertedTime(rst.getString("HOUP").trim());

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstObjetos.add(beanTkt);
            }

        } catch (Exception e) {
            e.getMessage();
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

        return lstObjetos;
    }

    public String loadPX244SQP00244VALID(A1952Filter filter, String flag) throws SQLException, Exception {

        CallableStatement cs = null;
        String strSQL;
        String msj = "";

        Connection cnx = null;
        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00244VALID(?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(7, Types.VARCHAR);
            System.out.println("Parametros que ingresan al st : ");
            System.out.println("NFLIGHT : " + filter.NFLIGHT.trim());
            System.out.println("CARRIER : " + filter.CARRIER.trim());
            System.out.println("NFLIGMKT : " + filter.NFLIGMKT.trim());
            System.out.println("CARRIMKT : " + filter.CARRIMKT.trim());

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.NFLIGHT.trim());
            cs.setString(3, filter.CARRIER.trim());
            cs.setString(4, filter.NFLIGMKT.trim());
            cs.setString(5, filter.CARRIMKT.trim());
            cs.setString(6, flag.trim());
            cs.setString(7, "");

            cs.execute();

            //Obteniendo el mensaje de error ===================================    
            if (cs.getString(7) != null) {
                msj = cs.getString(7).trim();
                System.out.println("Mensaje en el DAO : " + msj);
            }

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }

    public String loadPX244SQP00244ENTRY(A1952Filter filter, String strOption) {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "Operation was successful.";
        CallableStatement cstmt = null;
        Connection cnx = null;
        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00244ENTRY(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            System.out.println("Datos ingresantes al Entry");
            System.out.println("NFLIGHT : " + filter.NFLIGHT.trim());
            System.out.println("CARRIER : " + filter.CARRIER.trim());
            System.out.println("NFLIGMKT : " + filter.NFLIGMKT.trim());
            System.out.println("CARRIMKT : " + filter.CARRIMKT.trim());
            System.out.println("FREQ : " + filter.FREQ.trim());
            System.out.println("EQUIPO : " + filter.EQUIPO.trim());
            System.out.println("TOPER : " + filter.TOPER.trim());
            System.out.println("TFLIGH : " + filter.TFLIGH.trim());
            System.out.println("NFLIGHTH : " + filter.NFLIGHTH.trim());
            System.out.println("CARRIERH : " + filter.CARRIERH.trim());

            cstmt.setString(1, strOption.trim());
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.NFLIGHT.trim());
            cstmt.setString(4, filter.CARRIER.trim());
            cstmt.setString(5, filter.NFLIGMKT.trim());
            cstmt.setString(6, filter.CARRIMKT.trim());
            cstmt.setString(7, filter.FREQ.trim());
            cstmt.setString(8, filter.EQUIPO.trim());
            cstmt.setString(9, filter.TOPER.trim());
            cstmt.setString(10, filter.TFLIGH.trim());
            cstmt.setString(11, filter.NFLIGHTH.trim());
            cstmt.setString(12, filter.CARRIERH.trim());

            cstmt.setString(13, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(14, Functions.getFechaActual());
            cstmt.setString(15, Functions.getHoraActual());

            cstmt.execute();
           

        } catch (SQLException sqle) {          
             if (sqle.getMessage().contains("duplica")) {
                strMsj = "Duplicated row";
            }

        } catch (Exception e) {           
             if (e.getMessage().contains("duplicada")) {
                strMsj = "Duplicated row";
            }
        } finally {
            try {
                if (cstmt != null) {
                    try {
                        cstmt.close();
                    } catch (SQLException e) {
                        try {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        } catch (Exception ex) {
                            java.util.logging.Logger.getLogger(CatalogueFlightDAO.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
                pasarGarbageCollector();
            } catch (Exception ex) {
                java.util.logging.Logger.getLogger(CatalogueFlightDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return strMsj;
    }

}
