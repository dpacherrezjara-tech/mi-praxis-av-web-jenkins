/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP04482Filter;
import net.miatech.beans.SQP04483Filter;
import net.miatech.beans.SQP04491Filter;
import net.miatech.beans.SQP04492Filter;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class VouchersIssuedVersusClaimsDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public List<SQP04482Filter> getSQP04482Filter(SQP04482Filter filter) throws SQLException, Exception {
        List<SQP04482Filter> lstRtn = new ArrayList<SQP04482Filter>(0);
        SQP04482Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP04482(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FILTER);
            cstmt01.setString(3, filter.VP_TIPO);
            cstmt01.setString(4, filter.VP_Ticket);
            cstmt01.setString(5, filter.VP_Fecha1);
            cstmt01.setString(6, filter.VP_Fecha2);
            cstmt01.setString(7, filter.VP_StatusFormateo);

            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04482Filter();
                objRtn.A4213CCUST = rs01.getString("A4213CCUST");
                objRtn.A4213CIA = rs01.getString("A4213CIA");
                objRtn.A4213FORMA = rs01.getString("A4213FORMA");
                objRtn.A4213SERIE = rs01.getString("A4213SERIE");
                objRtn.A4213FECVT = rs01.getString("A4213FECVT");
                objRtn.A4213SEQVO = rs01.getString("A4213SEQVO");
                objRtn.A4213MONED = rs01.getString("A4213MONED");
                objRtn.A4213AMOUN = rs01.getDouble("A4213AMOUN");
                objRtn.A4213AGENT = rs01.getString("A4213AGENT");
                objRtn.A4213TSTAT = rs01.getString("A4213TSTAT");
                objRtn.A4213ITEMC = rs01.getString("A4213ITEMC");
                objRtn.A4213CIATK = rs01.getString("A4213CIATK");
                objRtn.A4213FORTK = rs01.getString("A4213FORTK");
                objRtn.A4213SERTK = rs01.getString("A4213SERTK");
                objRtn.A4213FEMIS = rs01.getString("A4213FEMIS");
                objRtn.A4213SEQV = rs01.getString("A4213SEQV");
                objRtn.A4213CUPON = rs01.getString("A4213CUPON");
                objRtn.A4213AMOTK = rs01.getDouble("A4213AMOTK");
                objRtn.A4213MDATK = rs01.getString("A4213MDATK");
                objRtn.A4213TARIF = rs01.getDouble("A4213TARIF");
                objRtn.A4213TFOP = rs01.getDouble("A4213TFOP");
                objRtn.A4213PAX = rs01.getString("A4213PAX");
                objRtn.A4213FLG = rs01.getString("A4213FLG");
                objRtn.A4213STAF = rs01.getString("A4213STAF");
                objRtn.A4213DATF = rs01.getString("A4213DATF");
                objRtn.A4213TIMF = rs01.getString("A4213TIMF");
                objRtn.A4213USRIN = rs01.getString("A4213USRIN");
                objRtn.A4213FECIN = rs01.getString("A4213FECIN");
                objRtn.A4213HORIN = rs01.getString("A4213HORIN");
                objRtn.A4213USRAC = rs01.getString("A4213USRAC");
                objRtn.A4213FECAC = rs01.getString("A4213FECAC");
                objRtn.A4213HORAC = rs01.getString("A4213HORAC");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

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
    
    public SQP04483Filter setSQP04483Filter(SQP04483Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP04483(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.VARCHAR);
            
            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.A4213CIA);
            cstmt.setString(4, filter.A4213FORMA);
            cstmt.setString(5, filter.A4213SERIE);
            cstmt.setString(6, filter.A4213FECVT);
            cstmt.setString(7, filter.A4213SEQVO);
            cstmt.setString(8, filter.A4213MONED);
            cstmt.setDouble(9, filter.A4213AMOUN);
            cstmt.setString(10, filter.A4213AGENT);
            cstmt.setString(11, filter.A4213ITEMC);
            cstmt.setString(12, filter.VP_JSON_LIST_TICKET);            
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(13);
            filter.dbException.MESSAGE = cstmt.getString(14);
                                    
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
        return filter;
    }
    
    public List<SQP04491Filter> getSQP04491Filter(SQP04491Filter filter) throws SQLException, Exception {
        List<SQP04491Filter> lstRtn = new ArrayList<SQP04491Filter>(0);
        SQP04491Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP04491(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(8, Types.INTEGER);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//            cstmt01.registerOutParameter(10, Types.INTEGER);
//            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A720CIA);
            cstmt01.setString(3, filter.VP_A720FORMA);
            cstmt01.setString(4, filter.VP_A720SERIE);
            cstmt01.setString(5, filter.VP_A720FECVTA);  
            cstmt01.setString(6, filter.VP_A720CUPONES);  
//            cstmt01.setInt(8, filter.page.PAGNUM);
//            cstmt01.setInt(9, filter.page.PAGROW);
//            cstmt01.setInt(10, filter.page.TOTPAG);
//            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();
//            filter.page.PAGNUM = cstmt01.getInt(8);
//            filter.page.PAGROW = cstmt01.getInt(9);
//            filter.page.TOTPAG = cstmt01.getInt(10);
//            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04491Filter();
                objRtn.A720CIA = rs01.getString("A720CIA");
                objRtn.A720FORMA = rs01.getString("A720FORMA");
                objRtn.A720SERIE = rs01.getString("A720SERIE");
                objRtn.A720SEQ = rs01.getString("A720SEQ");
                objRtn.A720TDOC = rs01.getString("A720TDOC");
                objRtn.A720PAX = rs01.getString("A720PAX");
                objRtn.A720FECVTA = rs01.getString("A720FECVTA");                
                objRtn.A720FLAG = rs01.getString("A720FLAG");                
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720CPUI = rs01.getString("A720CPUI");
                objRtn.A720GRUPO = rs01.getString("A720GRUPO");
                objRtn.A720USOS = rs01.getString("A720USOS");
                objRtn.A720TFOP = rs01.getDouble("A720TFOP");
                objRtn.A720TFOPRV = rs01.getDouble("A720TFOPRV");
                objRtn.A720CUPON_NF = rs01.getString("A720CUPON_NF").trim();
                
//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

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
    public List<SQP04492Filter> getSQP04492Filter(SQP04492Filter filter) throws SQLException, Exception {
        List<SQP04492Filter> lstRtn = new ArrayList<SQP04492Filter>(0);
        SQP04492Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP04492(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
//            cstmt01.registerOutParameter(8, Types.INTEGER);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//            cstmt01.registerOutParameter(10, Types.INTEGER);
//            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A4213CIA);
            cstmt01.setString(3, filter.VP_A4213FORMA);
            cstmt01.setString(4, filter.VP_A4213SERIE);
            cstmt01.setString(5, filter.VP_A4213SEQVO);  
//            cstmt01.setInt(8, filter.page.PAGNUM);
//            cstmt01.setInt(9, filter.page.PAGROW);
//            cstmt01.setInt(10, filter.page.TOTPAG);
//            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();
//            filter.page.PAGNUM = cstmt01.getInt(8);
//            filter.page.PAGROW = cstmt01.getInt(9);
//            filter.page.TOTPAG = cstmt01.getInt(10);
//            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04492Filter();
                objRtn.A4213CCUST = rs01.getString("A4213CCUST");
                objRtn.A4213CIA = rs01.getString("A4213CIA");
                objRtn.A4213FORMA = rs01.getString("A4213FORMA");
                objRtn.A4213SERIE = rs01.getString("A4213SERIE");                
                objRtn.A4213FECVT = rs01.getString("A4213FECVT");                
                objRtn.A4213ITEMC = rs01.getString("A4213ITEMC");
                objRtn.A4213CIATK = rs01.getString("A4213CIATK");
                objRtn.A4213FORTK = rs01.getString("A4213FORTK");                
                objRtn.A4213SERTK = rs01.getString("A4213SERTK");
                objRtn.A4213TICKET= rs01.getString("A4213CIATK")+rs01.getString("A4213FORTK")+rs01.getString("A4213SERTK");  
                
                objRtn.A4213FEMIS = rs01.getString("A4213FEMIS");
                objRtn.A4213SEQV = rs01.getString("A4213SEQV");
                objRtn.A4213CUPON = rs01.getString("A4213CUPON");                
                objRtn.A4213AMOTK = rs01.getDouble("A4213AMOTK");
                objRtn.A4213MDATK = rs01.getString("A4213MDATK");
                objRtn.A4213TARIF = rs01.getDouble("A4213TARIF");
                objRtn.A4213PAX = rs01.getString("A4213PAX");
                objRtn.A4213TDOC = rs01.getString("A4213TDOC");
                objRtn.A4213FLG = rs01.getString("A4213FLG");
                
                objRtn.A4213TFOP = rs01.getDouble("A4213TFOP");
                objRtn.A4213TFOPR = rs01.getDouble("A4213TFOPR");
                objRtn.A4213GRUPO = rs01.getString("A4213GRUPO");
                objRtn.A4213CPUI = rs01.getString("A4213CPUI");
                                
//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

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
    
}
