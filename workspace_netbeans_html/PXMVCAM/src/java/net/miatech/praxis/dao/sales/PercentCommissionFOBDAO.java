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
import net.miatech.beans.PX105S01A1742Filter;
import net.miatech.beans.SQP00132Filter;
import net.miatech.beans.SQP00647Filter;
import net.miatech.beans.SQP00651Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class PercentCommissionFOBDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public PercentCommissionFOBDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public PercentCommissionFOBDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX105S01A1742Filter> loadPX105S01A1742(PX105S01A1742Filter filter) throws SQLException, Exception {
        List<PX105S01A1742Filter> lstRtn = new ArrayList<>(0);
        PX105S01A1742Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX105S01A1742(?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1742CCUST);
            cstmt01.setString(2, filter.IN_A1742CODEA);
            cstmt01.setDouble(3, filter.IN_A1742COMM);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX105S01A1742Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1742CCUST = rs01.getString("A1742CCUST");
                objRtn.A1742CODEA = rs01.getString("A1742CODEA");
                objRtn.A1742DESCR = rs01.getString("A1742DESCR").trim();
                objRtn.A1742COMM = rs01.getDouble("A1742COMM");
                objRtn.A1742FORMA = rs01.getString("A1742FORMA");
                objRtn.A1742MCARR = rs01.getString("A1742MCARR");
                objRtn.A1742FBASI = rs01.getString("A1742FBASI");
                objRtn.A1742CLASS = rs01.getString("A1742CLASS");
                objRtn.A1742CODE = rs01.getString("A1742CODE");
                objRtn.A1742SCODE = rs01.getString("A1742SCODE");
                objRtn.A1742MOPAY = rs01.getString("A1742MOPAY");

                objRtn.A1742TPASS = rs01.getString("A1742TPASS");
                objRtn.A1742ACODE = rs01.getString("A1742ACODE");
                objRtn.A1742CLASX = rs01.getString("A1742CLASX");
                objRtn.A1742CODEX = rs01.getString("A1742CODEX");
                objRtn.A1742SCODX = rs01.getString("A1742SCODX");
                objRtn.A1742ANCIL = rs01.getString("A1742ANCIL");
                objRtn.A1742TOUR = rs01.getString("A1742TOUR");

                objRtn.A1742FINIV = rs01.getString("A1742FINIV");
                objRtn.A1742FFINV = rs01.getString("A1742FFINV");

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

    /* Acuerdos de Franquicias Comisiones FOB
     */
    public List<SQP00132Filter> getSQP00132Filter(SQP00132Filter filter) throws SQLException, Exception {
        List<SQP00132Filter> lstRtn = new ArrayList<>(0);
        SQP00132Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP00132(?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.VP_A1874CCUST);
            cstmt01.setString(2, filter.VP_A1874IATA);
            cstmt01.setString(3, filter.VP_A1874CODEA);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00132Filter();
                objRtn.A1874CCUST = rs01.getString("A1874CCUST");
                objRtn.A1874IATA = rs01.getString("A1874IATA");
                objRtn.A1874CODEA = rs01.getString("A1874CODEA");
                objRtn.A1874DESCR = rs01.getString("A1874DESCR");
                objRtn.A1874FORMA = rs01.getString("A1874FORMA");
                objRtn.A1874CLASX = rs01.getString("A1874CLASX");
                objRtn.A1874CODEX = rs01.getString("A1874CODEX");
                objRtn.A1874SCODX = rs01.getString("A1874SCODX");
                objRtn.A1874MCARR = rs01.getString("A1874MCARR");
                objRtn.A1874TPASS = rs01.getString("A1874TPASS");
                objRtn.A1874ACODE = rs01.getString("A1874ACODE");
                objRtn.A1874FBASI = rs01.getString("A1874FBASI");
                objRtn.A1874CLASS = rs01.getString("A1874CLASS");
                objRtn.A1874CODE = rs01.getString("A1874CODE");
                objRtn.A1874SCODE = rs01.getString("A1874SCODE");
                objRtn.A1874MOPAY = rs01.getString("A1874MOPAY");
                objRtn.A1874ANCIL = rs01.getString("A1874ANCIL");
                objRtn.A1874COMM = rs01.getDouble("A1874COMM");
                objRtn.A1874FINIV = rs01.getString("A1874FINIV");
                objRtn.A1874FFINV = rs01.getString("A1874FFINV");
                objRtn.A1874REGIS = rs01.getString("A1874REGIS");
                objRtn.A1874FREGI = rs01.getString("A1874FREGI");
                objRtn.A1874HREGI = rs01.getString("A1874HREGI");
                objRtn.A1874REGVI = rs01.getString("A1874REGVI");
                objRtn.A1874FREVI = rs01.getString("A1874FREVI");
                objRtn.A1874HREVI = rs01.getString("A1874HREVI");
                objRtn.A003KEY3 = rs01.getString("A003KEY3");
                objRtn.A1874TOUR = rs01.getString("A1874TOUR");

                objRtn.A1874TDOC = rs01.getString("A1874TDOC");
                objRtn.A1874TRNCU = rs01.getString("A1874TRNCU");
                objRtn.A1874TDESI = rs01.getString("A1874TDESI");
                objRtn.A1874ODPCP = rs01.getString("A1874ODPCP");
                objRtn.A1874FBASX = rs01.getString("A1874FBASX");
                objRtn.A1874IATAX = rs01.getString("A1874IATAX");

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

    public String get_PX112S03A1757(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String lstRtn = "";

        String SQLCLL01 = "{CALL PX112S03A1757(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.VARCHAR);
            cstmt01.setString(1, VP_OPTION);
            cstmt01.setString(2, VP_PARAM);
            cstmt01.execute();
            lstRtn = cstmt01.getString(3);

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

    public SQP00651Filter setSQP00651(SQP00651Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP00651(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(23, Types.VARCHAR);
            cstmt.registerOutParameter(24, Types.VARCHAR);

            cstmt.setString(1, filter.OPCION);
            cstmt.setString(2, filter.A1874IATA);
            cstmt.setString(3, filter.A1874CCUST);
            cstmt.setString(4, filter.A1874CODEA);
            cstmt.setString(5, filter.A1874DESCR);
            cstmt.setString(6, filter.A1874FORMA);
            cstmt.setString(7, filter.A1874CLASX);
            cstmt.setString(8, filter.A1874CODEX);
            cstmt.setString(9, filter.A1874SCODX);
            cstmt.setString(10, filter.A1874MCARR);
            cstmt.setString(11, filter.A1874TPASS);
            cstmt.setString(12, filter.A1874ACODE);
            cstmt.setString(13, filter.A1874TOUR);
            cstmt.setString(14, filter.A1874FBASI);
            cstmt.setString(15, filter.A1874CLASS);
            cstmt.setString(16, filter.A1874CODE);
            cstmt.setString(17, filter.A1874SCODE);
            cstmt.setString(18, filter.A1874MOPAY);
            cstmt.setString(19, filter.A1874ANCIL);
            cstmt.setDouble(20, filter.A1874COMM);
            cstmt.setString(21, filter.A1874FINIV);
            cstmt.setString(22, filter.A1874FFINV);
            //cstmt.setString22, filter.OU_SQLCODE);
            //cstmt.setString(23, filter.OU_MESSAGE);

            cstmt.execute();

            filter.dbException.SQLCODE = cstmt.getString(23);
            filter.dbException.MESSAGE = cstmt.getString(24);
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
    public SQP00647Filter setSQP00647(SQP00647Filter filter)throws SQLException, Exception{
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP00647(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(22, Types.VARCHAR);
            cstmt.registerOutParameter(23, Types.VARCHAR);

            cstmt.setString(1, filter.OPCION);
            cstmt.setString(2, filter.A1742CCUST);
            cstmt.setString(3, filter.A1742CODEA);
            cstmt.setString(4, filter.A1742DESCR);
            cstmt.setString(5, filter.A1742FORMA);
            cstmt.setString(6, filter.A1742CLASX);
            cstmt.setString(7, filter.A1742CODEX);
            cstmt.setString(8, filter.A1742SCODX);
            cstmt.setString(9, filter.A1742MCARR);
            cstmt.setString(10, filter.A1742TPASS);
            cstmt.setString(11, filter.A1742ACODE);
            cstmt.setString(12, filter.A1742TOUR);
            cstmt.setString(13, filter.A1742FBASI);
            cstmt.setString(14, filter.A1742CLASS);
            cstmt.setString(15, filter.A1742CODE);
            cstmt.setString(16, filter.A1742SCODE);
            cstmt.setString(17, filter.A1742MOPAY);
            cstmt.setString(18, filter.A1742ANCIL);
            cstmt.setDouble(19, filter.A1742COMM);
            cstmt.setString(20, filter.A1742FINIV);
            cstmt.setString(21, filter.A1742FFINV);
            //cstmt.setString(22, filter.OU_SQLCODE);
            //cstmt.setString(23, filter.OU_MESSAGE);
            
            cstmt.execute();
            
            filter.dbException.SQLCODE = cstmt.getString(22);
            filter.dbException.MESSAGE = cstmt.getString(23);
        } finally {
            if (cstmt != null) {                
                try { 
                    cstmt.close(); 
                } catch(SQLException e) { 
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
   }
}
