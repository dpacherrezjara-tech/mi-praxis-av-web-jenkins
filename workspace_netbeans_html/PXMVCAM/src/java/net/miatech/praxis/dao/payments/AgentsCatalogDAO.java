/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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
import net.miatech.praxis.payment.filter.MPF106Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class AgentsCatalogDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AgentsCatalogDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AgentsCatalogDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF106Filter> loadPX616SQP04941(MPF106Filter filter) throws SQLException, Exception {

        List<MPF106Filter> lstData = new ArrayList<MPF106Filter>(0);
        MPF106Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04941(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_CAGENCY.trim());
            cstmt.setString(3, filter.COUNTRY.trim());            

            cstmt.setInt(4, filter.page.PAGNUM);
            cstmt.setInt(5, filter.page.PAGROW);
            cstmt.setInt(6, filter.page.TOTPAG);
            cstmt.setInt(7, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(4);
            filter.page.PAGROW = cstmt.getInt(5);
            filter.page.TOTPAG = cstmt.getInt(6);
            filter.page.TOTROW = cstmt.getInt(7);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF106Filter();
                bean.RN = rst.getLong("RN");
                bean.COUNTRY = rst.getString("COUNTRY").trim();
                bean.CAGENCY = rst.getString("CAGENCY").trim();
                bean.CANAL = rst.getString("CANAL").trim();
                bean.NAMEA = rst.getString("NAMEA").trim();
                bean.CITY = rst.getString("CITY").trim();
                bean.NEGOC = rst.getString("NEGOC").trim();
                if(rst.getString("NEGOC").trim().equals("1")){
                    bean.descNEGOC = "PASAJES";
                }else if(rst.getString("NEGOC").trim().equals("2")){
                    bean.descNEGOC = "CARGA";
                }else if(rst.getString("NEGOC").trim().equals("3")){
                    bean.descNEGOC = "CORREO";
                }
                bean.TERMI = rst.getString("TERMI").trim();
                bean.CONTAC = rst.getString("CONTAC").trim();
                bean.EMAILS = rst.getString("EMAILS").trim();
                bean.NPHONE = rst.getString("NPHONE").trim();

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

    public String loadPX616SQP04942(MPF106Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04942(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.COUNTRY.trim());
            cstmt.setString(4, filter.CAGENCY.trim());
            cstmt.setString(5, filter.NAMEA.trim());
            cstmt.setString(6, filter.CANAL.trim());
            cstmt.setString(7, filter.CITY.trim());
            cstmt.setString(8, filter.NEGOC.trim());
            cstmt.setString(9, filter.TERMI.trim());
            cstmt.setString(10, filter.CONTAC.trim());
            cstmt.setString(11, filter.EMAILS.trim());
            cstmt.setString(12, filter.NPHONE.trim());
            cstmt.setString(13, filter.NEW_CAGENCY.trim());

            cstmt.setString(14, session.getUserView().getUserInfo().USR);
            cstmt.setString(15, Functions.getFechaActual());
            cstmt.setString(16, Functions.getHoraActual());
            cstmt.execute();

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

        return strMsj;

    }

    public MPF106Filter loadPX616SQP04943(MPF106Filter filter) throws SQLException, Exception {

        MPF106Filter objRtn = new MPF106Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04943(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CAGENCY.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
                objRtn.CAGENCY = rs01.getString("CAGENCY").trim();
                objRtn.NAMEA = rs01.getString("NAMEA").trim();
                objRtn.CANAL = rs01.getString("CANAL").trim();
                objRtn.CITY = rs01.getString("CITY").trim();
                objRtn.NEGOC = rs01.getString("NEGOC").trim();
                objRtn.TERMI = rs01.getString("TERMI").trim();
                objRtn.CONTAC = rs01.getString("CONTAC").trim();
                objRtn.EMAILS = rs01.getString("EMAILS").trim();
                objRtn.NPHONE = rs01.getString("NPHONE").trim();

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.PGMCR = rs01.getString("PGMCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");
                objRtn.PGMUP = rs01.getString("PGMUP");

                //lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
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

        return objRtn;
    }
    
    public List<MPF106Filter>  loadPX616SQP04943Citys(MPF106Filter filter) throws SQLException, Exception {

        MPF106Filter objRtn = new MPF106Filter();
        List<MPF106Filter> lstData = new ArrayList<MPF106Filter>(0);
        
//        MPF106Filter objRtn0;
//        objRtn0 = new MPF106Filter();
//        objRtn0.CODE = "";
//        objRtn0.NAME = "All";
//        lstData.add(objRtn0);
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04943CITY(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.COUNTRY.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new MPF106Filter();
                objRtn.CODE = rs01.getString("CODE").trim();
                objRtn.NAME = rs01.getString("NAME").trim();
                
                lstData.add(objRtn);
            }
            rs01.close();
        } catch (Exception e) {
            e.getMessage();
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

        return lstData;
    }

}
