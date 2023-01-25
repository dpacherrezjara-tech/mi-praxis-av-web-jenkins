/*
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : ConciliationASRDAO                                *
 * Created on : 21-09-2016, 19:26:25                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 21-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX031S02PXF050Filter;
import net.miatech.beans.PX031S03A1530Filter;
import net.miatech.beans.PX108S02PXF053Filter;
import net.miatech.beans.PX108S03A1530Filter;
import net.miatech.beans.PXF051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.PXF053;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author rmayta
 */
public class ConciliationASRDAO {
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public ConciliationASRDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    /**
     *
     * @param ss
     */
    public ConciliationASRDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    public List<PXF051Filter> loadPXF051(PXF051Filter filter) throws SQLException, Exception {
        Statement stmt = null;
        ResultSet rst = null;
        PXF051Filter file;
        List<PXF051Filter> lstData = new ArrayList<PXF051Filter>(0);
        String SQLWRE = "", SQLWRE_COLUMN = "", SQLWRE_DATE_FROM = "", SQLWRE_DATE_TO = "";
        boolean bolWhereDate = false, bolWhereDateBewteen = false;

        if (filter.filterType.equals("FREPOR")) {
            if (!filter.yearFrom.equals("0000") || !filter.monthFrom.equals("00") || !filter.dayFrom.equals("00")
                    || !filter.yearTo.equals("0000") || !filter.monthTo.equals("00") || !filter.dayTo.equals("00")) {
                bolWhereDate = true;
                if (filter.yearFrom.equals(filter.yearTo) && filter.monthFrom.equals(filter.monthTo) && filter.dayFrom.equals(filter.dayTo)) {
                    if (!filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && !filter.dayFrom.equals("00")) {           //YYYYMMDD
                        SQLWRE_COLUMN = "FREPOR";
                        SQLWRE_DATE_FROM = filter.yearFrom + filter.monthFrom + filter.dayFrom;
                    } else if (!filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {     //YYYYMM
                        SQLWRE_COLUMN = "SUBSTRING(FREPOR, 1, 6)";
                        SQLWRE_DATE_FROM = filter.yearFrom + filter.monthFrom;
                    } else if (!filter.yearFrom.equals("0000") && filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {      //YYYY
                        SQLWRE_COLUMN = "SUBSTRING(FREPOR, 1, 4)";
                        SQLWRE_DATE_FROM = filter.yearFrom;
                    } else if (filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {      //YYYYDD
                        SQLWRE_COLUMN = "CONCAT(SUBSTRING(FREPOR, 1, 4), SUBSTRING(FREPOR, 6, 8))";
                        SQLWRE_DATE_FROM = filter.yearFrom + filter.dayFrom;
                    } else if (filter.yearFrom.equals("0000") && !filter.monthFrom.equals("00") && filter.dayFrom.equals("00")) {      //MMDD
                        SQLWRE_COLUMN = "CONCAT(SUBSTRING(FREPOR, 4, 6), SUBSTRING(FREPOR, 6, 8))";
                        SQLWRE_DATE_FROM = filter.monthFrom + filter.dayFrom;
                    }
                } else {
                    bolWhereDateBewteen = true;
                    SQLWRE_COLUMN = "FREPOR";
                    SQLWRE_DATE_FROM = filter.yearFrom + filter.monthFrom + filter.dayFrom;
                    SQLWRE_DATE_TO = ((filter.yearTo.equals("0000")) ? "9999" : filter.yearTo) + ((filter.monthTo.equals("00")) ? "12" : filter.monthTo) + ((filter.dayTo.equals("00")) ? "31" : filter.dayTo);
                }
            }
            if (bolWhereDate) {
                if (bolWhereDateBewteen) {
                    SQLWRE += " AND " + SQLWRE_COLUMN + " BETWEEN '" + SQLWRE_DATE_FROM + "' AND '" + SQLWRE_DATE_TO + "'";
                } else {
                    SQLWRE += " AND " + SQLWRE_COLUMN + " = '" + SQLWRE_DATE_FROM + "'";
                }
            }
            if (!filter.WKSTAT.isEmpty()) {
                SQLWRE += " AND (WKSTAT = '" + filter.WKSTAT + "' OR STATION = '" + filter.WKSTAT + "' OR CODE = '" + filter.WKSTAT + "')";
            }
            if (filter.PSTATE != 0) {
                SQLWRE += " AND PSTATE = " + filter.PSTATE;
            }
            if (!filter.ST.equals("ALL")) {
                if (filter.ST.equals("EMPTY")) {
                    SQLWRE += " AND ST = ''";
                } else {
                    SQLWRE += " AND ST = '" + filter.ST + "'";
                }
            }
            if (!filter.SAMT.equals("ALL")) {
                if (filter.SAMT.equals("EMPTY")) {
                    SQLWRE += " AND SAMT = ''";
                } else if (filter.SAMT.equals("N")) {
                    SQLWRE += " AND SAMT IN ('" + filter.SAMT + "','')";
                } else if (filter.SAMT.equals("Y")) {
                    SQLWRE += " AND SAMT = '" + filter.SAMT + "'";
                }
            }
        }

        String SQLQRY = "SELECT "
                + "CCUST, WKSTAT, FREPOR, SEC, BSEC, PSTATE, SEQ,"
                + "STATION, CODE, OPDT, OPTM, ST, CLDT, CLTM, XTDT, XTTM, XTST,"
                + "VOIDS, FTRANS, TTRANS, IVSADIFF,"
                + "MANUP, FTRANSP,"
                + "SUM(A1720_FA_SUM) AS TTRANSP,"
                + "SAMT, COMENT,"
                + "USRC, DATC, TIMC, CRTC, USRM, DATM, TIMM, CRTM"
                + " FROM ("
                + "SELECT CCUST, WKSTAT, RTRIM(FREPOR) AS FREPOR, SEC, BSEC, PSTATE, SEQ,"
                + "STATION, CODE, OPDT, OPTM, ST, CLDT, CLTM, XTDT, XTTM, XTST,"
                + "VOIDS, RTRIM(FTRANS) AS FTRANS, TTRANS, (XTST - TTRANS) AS IVSADIFF,"
                + "RTRIM(MANUP) AS MANUP, RTRIM(FTRANSP) AS FTRANSP,"
                + "IFNULL(A1720_FA_SUM,0) AS A1720_FA_SUM,"
                + "RTRIM(SAMT) AS SAMT, RTRIM(COMENT) AS COMENT,"
                + "USRC, DATC, TIMC, CRTC, RTRIM(USRM) AS USRM, RTRIM(DATM) AS DATM, RTRIM(TIMM) AS TIMM, RTRIM(CRTM) AS CRTM"
                + " FROM " + session.getMainLibrary() + ".PXF051"
                + " LEFT JOIN ("
                + "                            SELECT A1530CCUST AS A1530CCUST_FA,A1530CSABR AS A1530CSABR_FA,A1530FDESD AS A1530FPROG_FA,A1530AGENT, A1530MDA AS A1530MDA_FA,A1530GRUPO,("
                + "                                    SELECT (IFNULL(SUM(A1720QTRSA),0) + IFNULL(SUM(A1720QTRRF),0)) FROM " + session.getMainLibrary() + ".A1720 WHERE A1720CCUST=A1530CCUST AND A1720TIPO='FA' AND A1720GRUPO=A1530GRUPO"
                + "                                ) AS A1720_FA_SUM"
                + "                            FROM " + session.getMainLibrary() + ".A1530"
                + "                        ) AS TMPTBL_A1530_A1720_TV"
                + "                            ON (A1530CCUST_FA=CCUST AND A1530AGENT=STATION AND A1530FPROG_FA=FREPOR)"
                + " WHERE CCUST = '" + session.getUserView().getCustomerInfo().CCUST + "'" + SQLWRE
                + ") AS TMPTABLE "
                + "                GROUP BY "
                + "CCUST, WKSTAT, FREPOR, SEC, BSEC, PSTATE, SEQ,"
                + "STATION, CODE, OPDT, OPTM, ST, CLDT, CLTM, XTDT, XTTM, XTST,"
                + "VOIDS, FTRANS, TTRANS, IVSADIFF,"
                + "MANUP, FTRANSP,SAMT,COMENT,"
                + "USRC, DATC, TIMC, CRTC, USRM, DATM, TIMM, CRTM"
                + " ORDER BY FREPOR DESC, SEQ ASC, IVSADIFF DESC, PSTATE ASC, CODE ASC, ST ASC";

        session.getCNXIBMDB2().open();
        try {
            stmt = session.getCNXIBMDB2().getConnection().createStatement();
            rst = stmt.executeQuery(SQLQRY);
            while (rst.next()) {
                file = new PXF051Filter();
                file.CCUST = rst.getString("CCUST");
                file.WKSTAT = rst.getString("WKSTAT");
                file.FREPOR = rst.getString("FREPOR");
                file.SEC = rst.getInt("SEC");
                file.BSEC = rst.getInt("BSEC");
                file.PSTATE = rst.getInt("PSTATE");
                file.SEQ = rst.getString("SEQ");
                file.STATION = rst.getString("STATION");
                file.CODE = rst.getString("CODE");
                file.OPDT = rst.getString("OPDT");
                file.OPTM = rst.getString("OPTM");
                file.ST = rst.getString("ST");
                file.CLDT = rst.getString("CLDT");
                file.CLTM = rst.getString("CLTM");
                file.XTDT = rst.getString("XTDT");
                file.XTTM = rst.getString("XTTM");
                file.XTST = rst.getInt("XTST");
                file.VOIDS = rst.getInt("VOIDS");
                file.FTRANS = rst.getString("FTRANS");
                file.TTRANS = rst.getInt("TTRANS");
                file.MANUP = rst.getString("MANUP");
                file.FTRANSP = rst.getString("FTRANSP");
                file.TTRANSP = rst.getInt("TTRANSP"); //--.
                file.SAMT = rst.getString("SAMT");
                file.COMENT = rst.getString("COMENT");
                file.diffTransactions = rst.getInt("XTST") - rst.getInt("TTRANSP");
                file.processState = file.diffTransactions != 0 ? "DIFF" : "MATCH";
                file.userLastModify = rst.getString("USRM").equals("") ? rst.getString("USRC") : rst.getString("USRM");
                file.dateLastModify = rst.getString("DATM").equals("") ? rst.getString("DATC") : rst.getString("DATM");
                file.USRC = rst.getString("USRC");
                file.DATC = rst.getString("DATC");
                file.TIMC = rst.getString("TIMC");
                file.CRTC = rst.getString("CRTC");
                file.USRM = rst.getString("USRM");
                file.DATM = rst.getString("DATM");
                file.TIMM = rst.getString("TIMM");
                file.CRTM = rst.getString("CRTM");

                lstData.add(file);
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            stmt.close();

        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                stmt.close();
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }
        return lstData;
    }

    public void insertPXF051(PXF051Filter filter) throws SQLException, Exception {
        PreparedStatement pstmt02 = null;

        String SQLQRY02 = "INSERT INTO " + session.getMainLibrary() + ".PXF051 (CCUST,WKSTAT,FREPOR,SEC,BSEC,"
                + "PSTATE,SEQ,STATION,CODE,OPDT,OPTM,ST,CLDT,CLTM,XTDT,XTTM,XTST,VOIDS,FTRANS,TTRANS,COMENT,USRC,DATC,TIMC,CRTC)"
                + " VALUES (?,?,?,"
                + "((SELECT IFNULL(MAX(SEC), 0) FROM " + session.getMainLibrary() + ".PXF051 WHERE CCUST = ? AND WKSTAT = ? AND FREPOR = ?) + 1),"
                + "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        session.getCNXIBMDB2().open();
        try {
            pstmt02 = session.getCNXIBMDB2().getConnection().prepareStatement(SQLQRY02);
            pstmt02.setString(1, session.getUserView().getCustomerInfo().CCUST);            //sessionVar.getAirClientCode()
            pstmt02.setString(2, filter.WKSTAT);
            pstmt02.setString(3, filter.FREPOR);

            pstmt02.setString(4, session.getUserView().getCustomerInfo().CCUST);            //sessionVar.getAirClientCode()
            pstmt02.setString(5, filter.WKSTAT);
            pstmt02.setString(6, filter.FREPOR);

            pstmt02.setInt(7, 0);
            pstmt02.setInt(8, filter.PSTATE);
            pstmt02.setString(9, filter.SEQ);
            pstmt02.setString(10, filter.STATION);
            pstmt02.setString(11, filter.CODE);
            pstmt02.setString(12, filter.OPDT);
            pstmt02.setString(13, filter.OPTM);
            pstmt02.setString(14, filter.ST);
            pstmt02.setString(15, filter.CLDT);
            pstmt02.setString(16, filter.CLTM);
            pstmt02.setString(17, filter.XTDT);
            pstmt02.setString(18, filter.XTTM);
            pstmt02.setInt(19, filter.XTST);
            pstmt02.setInt(20, filter.VOIDS);
            pstmt02.setString(21, filter.FTRANS);
            pstmt02.setInt(22, filter.TTRANS);
            pstmt02.setString(23, filter.COMENT);

            pstmt02.setString(24, session.getUserView().getUserInfo().USR);
            pstmt02.setString(25, today.getTime(TimeFormatToday.DATE_YYYYMMDD));
            pstmt02.setString(26, today.getTime(TimeFormatToday.TIME_HHMMSS));
            pstmt02.setString(27, workStation.getHostAddress());

            pstmt02.addBatch();
            pstmt02.executeBatch();

        } finally {
            if (pstmt02 != null) {
                pstmt02.close();
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }
    }

    public void updatePXF051(PXF051Filter filter) throws SQLException, Exception {
        PreparedStatement pstmt01 = null;
        String SQLQRY01 = "UPDATE " + session.getMainLibrary() + ".PXF051 SET"
                + " BSEC = ?, PSTATE = ?, SEQ = ?, STATION = ?, CODE = ?, OPDT = ?, OPTM = ?, ST = ?, "
                + "CLDT = ?, CLTM = ?, XTDT = ?, XTTM = ?, XTST = ?, VOIDS = ?, FTRANS = ?, TTRANS = ?, MANUP='X', COMENT = ?,"
                + " USRM = ?, DATM = ?, TIMM = ?, CRTM = ?"
                + " WHERE CCUST = ? AND WKSTAT = ? AND FREPOR = ? AND SEC = ?";

        session.getCNXIBMDB2().open();
        try {
            pstmt01 = session.getCNXIBMDB2().getConnection().prepareStatement(SQLQRY01);

            pstmt01.setInt(1, filter.BSEC);
            pstmt01.setInt(2, filter.PSTATE);
            pstmt01.setString(3, filter.SEQ);
            pstmt01.setString(4, filter.STATION);
            pstmt01.setString(5, filter.CODE);
            pstmt01.setString(6, filter.OPDT);
            pstmt01.setString(7, filter.OPTM);
            pstmt01.setString(8, filter.ST);
            pstmt01.setString(9, filter.CLDT);
            pstmt01.setString(10, filter.CLTM);
            pstmt01.setString(11, filter.XTDT);
            pstmt01.setString(12, filter.XTTM);
            pstmt01.setInt(13, filter.XTST);
            pstmt01.setInt(14, filter.VOIDS);
            pstmt01.setString(15, filter.FTRANS);
            pstmt01.setInt(16, filter.TTRANS);
            pstmt01.setString(17, filter.COMENT);

            pstmt01.setString(18, session.getUserView().getUserInfo().USR);
            pstmt01.setString(19, today.getTime(TimeFormatToday.DATE_YYYYMMDD));
            pstmt01.setString(20, today.getTime(TimeFormatToday.TIME_HHMMSS));
            pstmt01.setString(21, workStation.getHostAddress());

            pstmt01.setString(22, session.getUserView().getCustomerInfo().CCUST);
            pstmt01.setString(23, filter.WKSTAT);
            pstmt01.setString(24, filter.FREPOR);
            pstmt01.setInt(25, filter.SEC);

            pstmt01.executeUpdate();
        } finally {
            if (pstmt01 != null) {
                pstmt01.close();
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }
    }
    
    public List<PX108S02PXF053Filter> loadPX108S02PXF053(PX108S02PXF053Filter filter) throws SQLException, Exception {
        List<PX108S02PXF053Filter> lstRtn = new ArrayList<PX108S02PXF053Filter>(0);
        PX108S02PXF053Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX108S02PXF053(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_WKSTAT);
            cstmt01.setString(3, filter.IN_FREPOR_FROM);
            cstmt01.setString(4, filter.IN_FREPOR_TO);
            cstmt01.setString(5, filter.IN_MDA);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX108S02PXF053Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.WKSTAT = rs01.getString("WKSTAT");
                objRtn.FREPOR = rs01.getString("FREPOR");
                objRtn.MDA = rs01.getString("MDA");
                objRtn.HDTE = rs01.getString("HDTE");
                objRtn.HNAME = rs01.getString("HNAME");
                objRtn.HSTATUS = rs01.getString("HSTATUS");
                objRtn.SCASH = rs01.getDouble("SCASH");
                objRtn.SCREDIT = rs01.getDouble("SCREDIT");
                objRtn.SEXCHA = rs01.getDouble("SEXCHA");
                objRtn.STVOUCHER = rs01.getDouble("STVOUCHER");
                objRtn.RCASH = rs01.getDouble("RCASH");
                objRtn.RCREDIT = rs01.getDouble("RCREDIT");
                objRtn.REXCHA = rs01.getDouble("REXCHA");
                objRtn.RTVOUCHER = rs01.getDouble("RTVOUCHER");
                objRtn.NCASH = rs01.getDouble("NCASH");
                objRtn.NCREDIT = rs01.getDouble("NCREDIT");
                objRtn.NEXCHA = rs01.getDouble("NEXCHA");
                objRtn.NTVOUCHER = rs01.getDouble("NTVOUCHER");
                objRtn.TCASH = rs01.getDouble("TCASH");
                objRtn.TCREDIT = rs01.getDouble("TCREDIT");
                objRtn.TEXCHA = rs01.getDouble("TEXCHA");
                objRtn.TTVOUCHER = rs01.getDouble("TTVOUCHER");
                objRtn.STOTAL = rs01.getDouble("STOTAL");
                objRtn.RTOTAL = rs01.getDouble("RTOTAL");
                objRtn.NTOTAL = rs01.getDouble("NTOTAL");
                objRtn.TTOTAL = rs01.getDouble("TTOTAL");

                objRtn.A1530_A1720_CA_SUM = rs01.getDouble("A1530_A1720_CA_SUM");
                objRtn.A1530_A1720_CC_SUM = rs01.getDouble("A1530_A1720_CC_SUM");
                objRtn.A1530_A1720_EX_SUM = rs01.getDouble("A1530_A1720_EX_SUM");
                objRtn.A1530_A1720_TV_SUM = rs01.getDouble("A1530_A1720_TV_SUM");

                objRtn.STATUS = rs01.getString("STATUS");
                objRtn.STATUS_RECORD = "";
                
//                if (objRtn.WKSTAT.equals("86977085")){
//                    objRtn.STATUS_RECORD = "";
//                }
                
                double intA1530_A1720_CA_SUM = rs01.getDouble("SCASH") - rs01.getDouble("RCASH");                
                double intA1530_A1720_CC_SUM = rs01.getDouble("SCREDIT") -  rs01.getDouble("RCREDIT");    
                intA1530_A1720_CA_SUM = fijarNumero(intA1530_A1720_CA_SUM,2);
                intA1530_A1720_CC_SUM = fijarNumero(intA1530_A1720_CC_SUM,2);
                
                double diff_CA_SUM = intA1530_A1720_CA_SUM - rs01.getDouble("A1530_A1720_CA_SUM"); 
                double diff_CC_SUM = intA1530_A1720_CC_SUM - rs01.getDouble("A1530_A1720_CC_SUM");
                diff_CA_SUM = fijarNumero(diff_CA_SUM,2);
                diff_CC_SUM = fijarNumero(diff_CC_SUM,2);
                
                switch (objRtn.STATUS) {
                    case "A":
                        objRtn.STATUS_RECORD = "MATCH"; //MATCH AUTOMATIC.
                        break;
                    case "M":
                        objRtn.STATUS_RECORD = "MATCH"; //MATCH MANUAL.
                        break;
                    case "D":
                        objRtn.STATUS_RECORD = "DIFF"; //DIFFERENCE.
                        break;
                    case "": //CALCULATE.
                        if ( diff_CA_SUM == 0 && diff_CC_SUM == 0 ){
                                objRtn.STATUS_RECORD = "MATCH";                            
                        } else {
                            objRtn.STATUS_RECORD = "DIFF";
                        }
                        break;
                    default:
                        objRtn.STATUS_RECORD = objRtn.STATUS;
                }
                        
                objRtn.COMENT = rs01.getString("COMENT");

                objRtn.USRC = rs01.getString("USRC");
                objRtn.DATC = rs01.getString("DATC");
                objRtn.TIMC = rs01.getString("TIMC");
                objRtn.CRTC = rs01.getString("CRTC");
                objRtn.USRM = rs01.getString("USRM");
                objRtn.DATM = rs01.getString("DATM");
                objRtn.userLastModify = rs01.getString("USRM").equals("") ? rs01.getString("USRC") : rs01.getString("USRM");
                objRtn.dateLastModify = rs01.getString("DATM").equals("") ? rs01.getString("DATC") : rs01.getString("DATM");
                objRtn.TIMM = rs01.getString("TIMM");
                objRtn.CRTM = rs01.getString("CRTM");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    public static double fijarNumero(double numero, int digitos) {
        double resultado;
        resultado = numero * Math.pow(10, digitos);
        resultado = Math.round(resultado);
        resultado = resultado/Math.pow(10, digitos);
        return resultado;
    }
    public List<PX031S03A1530Filter> loadPX031S03A1530(PX031S03A1530Filter filter) throws SQLException, Exception {
        List<PX031S03A1530Filter> lstRtn = new ArrayList<PX031S03A1530Filter>(0);
        PX031S03A1530Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX031S03A1530(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_TFILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_WKSTAT);
            cstmt01.setString(4, filter.IN_FPROCE);
            cstmt01.setString(5, filter.IN_FREPOR);
            cstmt01.setString(6, filter.IN_GROUP);
            cstmt01.setInt(7, filter.IN_NROID);
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
                objRtn = new PX031S03A1530Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.A1530CCUST = rs01.getString("A1530CCUST");
                objRtn.A1530AGENT = rs01.getString("A1530AGENT");
                objRtn.A1530FDESD = rs01.getString("A1530FDESD");
                objRtn.A1530MDA = rs01.getString("A1530MDA");
                objRtn.A1530GRUPO = rs01.getString("A1530GRUPO");                                
                objRtn.HDTE = rs01.getString("HDTE");
                objRtn.HNAME = rs01.getString("HNAME");
                objRtn.HSTATUS = rs01.getString("HSTATUS");
                objRtn.SCASH = rs01.getDouble("SCASH");
                objRtn.SCREDIT = rs01.getDouble("SCREDIT");
                objRtn.SEXCHA = rs01.getDouble("SEXCHA");
                objRtn.STVOUCHER = rs01.getDouble("STVOUCHER");
                objRtn.RCASH = rs01.getDouble("RCASH");
                objRtn.RCREDIT = rs01.getDouble("RCREDIT");
                objRtn.REXCHA = rs01.getDouble("REXCHA");
                objRtn.RTVOUCHER = rs01.getDouble("RTVOUCHER");
                objRtn.NCASH = rs01.getDouble("NCASH");
                objRtn.NCREDIT = rs01.getDouble("NCREDIT");
                objRtn.NEXCHA = rs01.getDouble("NEXCHA");
                objRtn.NTVOUCHER = rs01.getDouble("NTVOUCHER");
                objRtn.TCASH = rs01.getDouble("TCASH");
                objRtn.TCREDIT = rs01.getDouble("TCREDIT");
                objRtn.TEXCHA = rs01.getDouble("TEXCHA");
                objRtn.TTVOUCHER = rs01.getDouble("NTVOUCHER");
                objRtn.A1530_A1720_CA_SUM = rs01.getDouble("A1530_A1720_CA_SUM");
                objRtn.A1530_A1720_CC_SUM = rs01.getDouble("A1530_A1720_CC_SUM");
                objRtn.A1530_A1720_EX_SUM = rs01.getDouble("A1530_A1720_EX_SUM");
                objRtn.A1530_A1720_TV_SUM = rs01.getDouble("A1530_A1720_TV_SUM");
                objRtn.A1530USRIN = rs01.getString("A1530USRIN");
                objRtn.A1530FECIN = rs01.getString("A1530FECIN");
                objRtn.A1530USRAC = rs01.getString("A1530USRAC");
                objRtn.A1530FECAC = rs01.getString("A1530FECAC");
                objRtn.STATUS = rs01.getString("STATUS").trim(); //new
                objRtn.COMENT = rs01.getString("COMENT").trim(); //new
                // PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    public List<PX108S03A1530Filter> loadPX108S03A1530(PX108S03A1530Filter filter) throws SQLException, Exception {
        List<PX108S03A1530Filter> lstRtn = new ArrayList<PX108S03A1530Filter>(0);
        PX108S03A1530Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX108S03A1530(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_CSABR);
            cstmt01.setString(3, filter.IN_FPROG);
            cstmt01.setString(4, filter.IN_MDA);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX108S03A1530Filter();
                objRtn.A1530CCUST = rs01.getString("A1530CCUST");
                objRtn.A1530CSABR = rs01.getString("A1530CSABR");
                objRtn.A1530FPROG = rs01.getString("A1530FPROG");
                objRtn.A1530MDA = rs01.getString("A1530MDA");
                objRtn.TTYPE = rs01.getString("TTYPE");
                objRtn.A1530GRUPO = rs01.getString("A1530GRUPO");
                objRtn.A1720STIPO = rs01.getString("A1720STIPO");
                objRtn.A1720_AMT = rs01.getDouble("A1720_AMT");
                
                if(objRtn.A1720_AMT > 0) lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    public void loadSQP00275(PXF053 filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP00275(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.WKSTAT);
            cstmt01.setString(3, filter.FREPOR);
            cstmt01.setString(4, filter.MDA);
            cstmt01.setString(5, filter.HDTE);
            cstmt01.setString(6, filter.HNAME);
            cstmt01.setString(7, filter.HSTATUS);
            cstmt01.setDouble(8, filter.SCASH);
            cstmt01.setDouble(9, filter.SCREDIT);
            cstmt01.setDouble(10, filter.RCASH);
            cstmt01.setDouble(11, filter.RCREDIT);
            cstmt01.setString(12, filter.STATUS);
            cstmt01.setString(13, filter.COMENT);  
            cstmt01.execute();
        } finally {
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
    }
    public List<PX031S02PXF050Filter> loadPX031S02PXF050(PX031S02PXF050Filter filter) throws SQLException, Exception {
        List<PX031S02PXF050Filter> lstRtn = new ArrayList<PX031S02PXF050Filter>(0);
        PX031S02PXF050Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX031S02PXF050(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_WKSTAT);
            cstmt01.setString(3, filter.IN_FREPOR);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX031S02PXF050Filter();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.WKSTAT = rs01.getString("WKSTAT");
                objRtn.FREPOR = rs01.getString("FREPOR");
                objRtn.BSEC = rs01.getInt("BSEC");
                objRtn.RECOR = rs01.getString("RECOR");
                objRtn.USRC = rs01.getString("USRC");
                objRtn.DATC = rs01.getString("DATC");
                objRtn.TIMC = rs01.getString("TIMC");
                objRtn.CRTC = rs01.getString("CRTC");
                objRtn.USRM = rs01.getString("USRM");
                objRtn.DATM = rs01.getString("DATM");
                objRtn.TIMM = rs01.getString("TIMM");
                objRtn.CRTM = rs01.getString("CRTM");

                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
}
