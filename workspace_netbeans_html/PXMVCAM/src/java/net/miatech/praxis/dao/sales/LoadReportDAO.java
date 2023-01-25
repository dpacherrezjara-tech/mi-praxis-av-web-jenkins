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
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX108S02PXF053Filter;
import net.miatech.beans.PXF051Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jmeiggs
 */
public class LoadReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public LoadReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LoadReportDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PXF051Filter> loadPXF051(PXF051Filter filter) throws SQLException, Exception {
        List<PXF051Filter> lstRtn = new ArrayList<>(0);
        PXF051Filter file;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03800(?,?,?,?,?,?,?,?,?,?,?)}";
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, filter.WKSTAT);
            cstmt01.setInt(5, filter.PSTATE);
            cstmt01.setString(6, filter.ST);
            cstmt01.setString(7, filter.SAMT);
            cstmt01.setInt(8, -1);
            cstmt01.setInt(9, -1);
            cstmt01.setInt(10, -1);
            cstmt01.setInt(11, -1);

            cstmt01.execute();
            /*
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);
            */
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                file = new PXF051Filter();
                file.item = rs01.getInt("RN");
                file.CCUST = rs01.getString("CCUST");
                file.WKSTAT = rs01.getString("WKSTAT");
                file.FREPOR = rs01.getString("FREPOR");
                file.SEC = rs01.getInt("SEC");
                file.BSEC = rs01.getInt("BSEC");
                file.PSTATE = rs01.getInt("PSTATE");
                file.SEQ = rs01.getString("SEQ");
                file.STATION = rs01.getString("STATION");
                file.CODE = rs01.getString("CODE");
                file.OPDT = rs01.getString("OPDT");
                file.OPTM = rs01.getString("OPTM");
                file.ST = rs01.getString("ST");
                file.CLDT = rs01.getString("CLDT");
                file.CLTM = rs01.getString("CLTM");
                file.XTDT = rs01.getString("XTDT");
                file.XTTM = rs01.getString("XTTM");
                file.XTST = rs01.getInt("XTST");
                file.VOIDS = rs01.getInt("VOIDS");
                file.FTRANS = rs01.getString("FTRANS");
                file.TTRANS = rs01.getInt("TTRANS");
                file.MANUP = rs01.getString("MANUP");
                file.FTRANSP = rs01.getString("FTRANSP");
                file.TTRANSP = rs01.getInt("TTRANSP"); //--.
                file.SAMT = rs01.getString("SAMT");
                if(file.SAMT.equals("")){
                    file.SAMT = "N";
                }
                file.COMENT = rs01.getString("COMENT");
                file.diffTransactions = rs01.getInt("IVSADIFF");
                file.USRC = rs01.getString("USRC");
                file.DATC = rs01.getString("DATC");
                file.TIMC = rs01.getString("TIMC");
                file.CRTC = rs01.getString("CRTC");
                file.USRM = rs01.getString("USRM");
                file.DATM = rs01.getString("DATM");
                file.TIMM = rs01.getString("TIMM");
                file.CRTM = rs01.getString("CRTM");
                switch (file.PSTATE) {
                    case 1:
                        file.processState = "INTERACT";
                        break;
                    case 2:
                        file.processState = "MATCH";
                        break;
                    case 3:
                        file.processState = "AVRA";
                        break;
                }
                file.userLastModify = file.USRM.equals("") ? file.USRC : file.USRM;
		file.dateLastModify = file.DATM.equals("") ? file.DATC : file.DATM;
                /*
                file.page.PAGNUM = filter.page.PAGNUM;
                file.page.PAGROW = filter.page.PAGROW;
                file.page.TOTPAG = filter.page.TOTPAG;
                file.page.TOTROW = filter.page.TOTROW;
                */
                lstRtn.add(file);
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            //session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<PX108S02PXF053Filter> loadPX108S02PXF053(PX108S02PXF053Filter filter) throws SQLException, Exception {
        List<PX108S02PXF053Filter> lstRtn = new ArrayList<>(0);
        PX108S02PXF053Filter file;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX108S02PXF053(?,?,?,?,?,?,?,?,?)}";
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.WKSTAT);
            cstmt01.setString(3, filter.IN_FREPOR_FROM);
            cstmt01.setString(4, filter.IN_FREPOR_TO);
            cstmt01.setString(5, filter.IN_MDA);
            cstmt01.setInt(6, -1);
            cstmt01.setInt(7, -1);
            cstmt01.setInt(8, -1);
            cstmt01.setInt(9, -1);

            cstmt01.execute();
            /*
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);
            */
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                file = new PX108S02PXF053Filter();
                file.RN = rs01.getLong("RN");
                file.CCUST = rs01.getString("CCUST");
                file.WKSTAT = rs01.getString("WKSTAT");
                file.FREPOR = rs01.getString("FREPOR");
                file.MDA = rs01.getString("MDA");
                file.HDTE = rs01.getString("HDTE");
                file.HNAME = rs01.getString("HNAME");
                file.HSTATUS = rs01.getString("HSTATUS");
                file.SCASH = rs01.getDouble("SCASH");
                file.SCREDIT = rs01.getDouble("SCREDIT");
                file.SEXCHA = rs01.getDouble("SEXCHA");
                file.STVOUCHER = rs01.getDouble("STVOUCHER");
                file.RCASH = rs01.getDouble("RCASH");
                file.RCREDIT = rs01.getDouble("RCREDIT");
                file.REXCHA = rs01.getDouble("REXCHA");
                file.RTVOUCHER = rs01.getDouble("RTVOUCHER");
                file.NCASH = rs01.getDouble("NCASH");
                file.NCREDIT = rs01.getDouble("NCREDIT");
                file.NEXCHA = rs01.getDouble("NEXCHA");
                file.NTVOUCHER = rs01.getDouble("NTVOUCHER");
                file.TCASH = rs01.getDouble("TCASH");
                file.TCREDIT = rs01.getDouble("TCREDIT");
                file.TEXCHA = rs01.getDouble("TEXCHA");
                file.TTVOUCHER = rs01.getDouble("TTVOUCHER");
                file.STOTAL = rs01.getDouble("STOTAL");
                file.RTOTAL = rs01.getDouble("RTOTAL");
                file.NTOTAL = rs01.getDouble("NTOTAL");
                file.TTOTAL = rs01.getDouble("TTOTAL");

                file.A1530_A1720_CA_SUM = rs01.getDouble("A1530_A1720_CA_SUM");
                file.A1530_A1720_CC_SUM = rs01.getDouble("A1530_A1720_CC_SUM");
                file.A1530_A1720_EX_SUM = rs01.getDouble("A1530_A1720_EX_SUM");
                file.A1530_A1720_TV_SUM = rs01.getDouble("A1530_A1720_TV_SUM");

                file.STATUS = rs01.getString("STATUS");
                file.COMENT = rs01.getString("COMENT");
                
                file.USRC = rs01.getString("USRC");
                file.DATC = rs01.getString("DATC");
                file.TIMC = rs01.getString("TIMC");
                file.CRTC = rs01.getString("CRTC");
                file.USRM = rs01.getString("USRM");
                file.DATM = rs01.getString("DATM");
                file.TIMM = rs01.getString("TIMM");
                file.CRTM = rs01.getString("CRTM");
                /*file.page.PAGNUM = filter.page.PAGNUM;
                file.page.PAGROW = filter.page.PAGROW;
                file.page.TOTPAG = filter.page.TOTPAG;
                file.page.TOTROW = filter.page.TOTROW;*/
                lstRtn.add(file);
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            //session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return lstRtn;
    }

}
