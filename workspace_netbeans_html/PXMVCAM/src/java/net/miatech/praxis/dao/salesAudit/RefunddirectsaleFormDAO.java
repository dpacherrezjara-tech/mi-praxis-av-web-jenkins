/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2728Filter;
import net.miatech.beans.SaleAudit.SQP00957Filter;
import net.miatech.beans.SaleAudit.SQP00964Filter;
import net.miatech.beans.SaleAudit.SQP00976Filter;
import net.miatech.beans.SaleAudit.SQP00977Filter;
import net.miatech.beans.SaleAudit.SQP01064Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RefunddirectsaleFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RefunddirectsaleFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RefunddirectsaleFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00957Filter> search(SQP00957Filter filter) throws SQLException, Exception {
        List<SQP00957Filter> lstRtn = new ArrayList<SQP00957Filter>(0);
        SQP00957Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00963(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PAIS);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_FORMA);
            cstmt01.setString(7, filter.VP_SERIE);
            cstmt01.setString(8, filter.VP_TYPE);
            cstmt01.setString(9, filter.VP_SEQ);
            cstmt01.setString(10, filter.VP_OPCION);

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00957Filter();
                objRtn.A2554CIAI = rs01.getString("A2554CIAI");
                objRtn.A2554FRMAI = rs01.getString("A2554FRMAI");
                objRtn.A2554SRIEI = rs01.getString("A2554SRIEI");
                objRtn.A2554FVTA = rs01.getString("A2554FVTA");
                objRtn.A2554TRNCU = rs01.getString("A2554TRNCU");
                objRtn.A2554AGTIA = rs01.getString("A2554AGTIA");
                objRtn.A2554AGENT = rs01.getString("A2554AGENT");
                objRtn.A2554COMTO = rs01.getDouble("A2554COMTO");
                objRtn.A2554MCOM = rs01.getString("A2554MCOM");
                objRtn.A2554SCMTO = rs01.getDouble("A2554SCMTO");
                objRtn.A2554SMCOM = rs01.getString("A2554SMCOM");
                objRtn.A2554TTXC = rs01.getDouble("A2554TTXC");
                objRtn.A2554CFOP = rs01.getString("A2554CFOP");
                objRtn.A2554TFOP = rs01.getString("A2554TFOP");
                objRtn.A2554TTARJ = rs01.getString("A2554TTARJ");
                objRtn.A2554NREF = rs01.getString("A2554NREF");
                objRtn.A2554CLAS1 = rs01.getString("A2554CLAS1");
                objRtn.A2554CLAS2 = rs01.getString("A2554CLAS2");
                objRtn.A2554CLAS3 = rs01.getString("A2554CLAS3");
                objRtn.A2554CLAS4 = rs01.getString("A2554CLAS4");
                objRtn.A2554FBAS1 = rs01.getString("A2554FBAS1");
                objRtn.A2554FBAS2 = rs01.getString("A2554FBAS2");
                objRtn.A2554FBAS3 = rs01.getString("A2554FBAS3");
                objRtn.A2554FBAS4 = rs01.getString("A2554FBAS4");
                objRtn.A2554PVTA = rs01.getString("A2554PVTA");
                objRtn.A2554AGTE = rs01.getString("A2554AGTE");
                objRtn.A2554ARPI = rs01.getString("A2554ARPI");
                objRtn.A2554PAX = rs01.getString("A2554PAX");
                objRtn.A2554TPAX = rs01.getString("A2554TPAX");
                objRtn.A2554PNR = rs01.getString("A2554PNR");
                objRtn.A2554ESTPD = rs01.getString("A2554ESTPD");
                objRtn.ITINERARIO = rs01.getString("ITINERARIO");
                objRtn.A2554EST = rs01.getInt("A2554EST");
                objRtn.A2554NLOTE = rs01.getString("A2554NLOTE");
                objRtn.A2554TVTA = rs01.getString("A2554TVTA");
                objRtn.A2554CDIT = rs01.getString("A2554CDIT");
                objRtn.A2554CHEQ = rs01.getString("A2554CHEQ");
                objRtn.A2554FLAG = rs01.getString("A2554FLAG");

                objRtn.A2554CHARG = rs01.getDouble("A2554CHARG");
                objRtn.A2554IVACH = rs01.getDouble("A2554IVACH");
                objRtn.A2554NETO = rs01.getDouble("A2554NETO");

                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public List<SQP00964Filter> searchExch1(SQP00964Filter filter) throws SQLException, Exception {
        List<SQP00964Filter> lstRtn = new ArrayList<SQP00964Filter>(0);
        SQP00964Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00963(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PAIS);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_FORMA);
            cstmt01.setString(7, filter.VP_SERIE);
            cstmt01.setString(8, filter.VP_TYPE);
            cstmt01.setString(9, filter.VP_SEQ);
            cstmt01.setString(10, filter.VP_OPCION);

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00964Filter();
                objRtn.A2556CIAI = rs01.getString("A2556CIAI");
                objRtn.A2556FRMAI = rs01.getString("A2556FRMAI");
                objRtn.A2556SRIEI = rs01.getString("A2556SRIEI");
                objRtn.A2556TRNCU = rs01.getString("A2556TRNCU");
                objRtn.A2556AGTIA = rs01.getString("A2556AGTIA");
                objRtn.A2556AGENT = rs01.getString("A2556AGENT");
                objRtn.A2556FVTA = rs01.getString("A2556FVTA");
                objRtn.A2556COMIS = rs01.getDouble("A2556COMIS");
                objRtn.A2556MCOM = rs01.getString("A2556MCOM");
                objRtn.A2556CTSCM = rs01.getDouble("A2556CTSCM");
                objRtn.A2556SMCOM = rs01.getString("A2556SMCOM");
                objRtn.A2556TTXC = rs01.getDouble("A2556TTXC");
                objRtn.A2556NLOTE = rs01.getString("A2556NLOTE");
                objRtn.A2556CFOP = rs01.getString("A2556CFOP");
                objRtn.A2556TFOP = rs01.getString("A2556TFOP");
                objRtn.A2556TTARJ = rs01.getString("A2556TTARJ");
                objRtn.A2556NREF = rs01.getString("A2556NREF");
                objRtn.A2556CLAS1 = rs01.getString("A2556CLAS1");
                objRtn.A2556CLAS2 = rs01.getString("A2556CLAS2");
                objRtn.A2556CLAS3 = rs01.getString("A2556CLAS3");
                objRtn.A2556CLAS4 = rs01.getString("A2556CLAS4");
                objRtn.A2556FBAS1 = rs01.getString("A2556FBAS1");
                objRtn.A2556FBAS2 = rs01.getString("A2556FBAS2");
                objRtn.A2556FBAS3 = rs01.getString("A2556FBAS3");
                objRtn.A2556FBAS4 = rs01.getString("A2556FBAS4");
                objRtn.ITINERARIO = rs01.getString("ITINERARIO");
                objRtn.A2556PVTA = rs01.getString("A2556PVTA");
                objRtn.A2556AGTE = rs01.getString("A2556AGTE");
                objRtn.A2556ARPI = rs01.getString("A2556ARPI");
                objRtn.A2556PAX = rs01.getString("A2556PAX");
                objRtn.A2556TPAX = rs01.getString("A2556TPAX");
                objRtn.A2556PNR = rs01.getString("A2556PNR");
                objRtn.A2556ESTPD = rs01.getString("A2556ESTPD");
                objRtn.A2556CIA2 = rs01.getString("A2556CIA2");
                objRtn.A2556FRMA2 = rs01.getString("A2556FRMA2");
                objRtn.A2556SRIE2 = rs01.getString("A2556SRIE2");
                objRtn.A2556FVTA2 = rs01.getString("A2556FVTA2");
                objRtn.A2556COMI2 = rs01.getDouble("A2556COMI2");
                objRtn.A2556SMCO2 = rs01.getString("A2556SMCO2");
                objRtn.A2556TSCM2 = rs01.getDouble("A2556TSCM2");
                objRtn.A2556MCOM = rs01.getString("A2556MCOM");
                objRtn.A2556TTX2 = rs01.getDouble("A2556TTX2");
                objRtn.ITINERARIORIG = rs01.getString("ITINERARIORIG");
                objRtn.A2556TVTA = rs01.getString("A2556TVTA");
                objRtn.A2556CDIT = rs01.getString("A2556CDIT");
                objRtn.A2556CHEQ = rs01.getString("A2556CHEQ");
                objRtn.A2556FLAG = rs01.getString("A2556FLAG");

                objRtn.A2556CHARG = rs01.getDouble("A2556CHARG");
                objRtn.A2556IVACH = rs01.getDouble("A2556IVACH");
                objRtn.A2556NETO = rs01.getDouble("A2556NETO");

                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public List<SQP00976Filter> searchExch2(SQP00976Filter filter) throws SQLException, Exception {
        List<SQP00976Filter> lstRtn = new ArrayList<SQP00976Filter>(0);
        SQP00976Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00963(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PAIS);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_FORMA);
            cstmt01.setString(7, filter.VP_SERIE);
            cstmt01.setString(8, filter.VP_TYPE);
            cstmt01.setString(9, filter.VP_SEQ);
            cstmt01.setString(10, filter.VP_OPCION);

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00976Filter();
                objRtn.A2557CIAI = rs01.getString("A2557CIAI");
                objRtn.A2557FRMAI = rs01.getString("A2557FRMAI");
                objRtn.A2557SRIEI = rs01.getString("A2557SRIEI");
                objRtn.A2557TRNCU = rs01.getString("A2557TRNCU");
                objRtn.A2557AGTIA = rs01.getString("A2557AGTIA");
                objRtn.A2557AGENT = rs01.getString("A2557AGENT");
                objRtn.A2557FVTA = rs01.getString("A2557FVTA");
                objRtn.A2557COMIS = rs01.getDouble("A2557COMIS");
                objRtn.A2557MCOM = rs01.getString("A2557MCOM");
                objRtn.A2557CTSCM = rs01.getDouble("A2557CTSCM");
                objRtn.A2557SMCOM = rs01.getString("A2557SMCOM");
                objRtn.A2557TTXC = rs01.getDouble("A2557TTXC");
                objRtn.A2557NLOTE = rs01.getString("A2557NLOTE");
                objRtn.A2557CFOP = rs01.getString("A2557CFOP");
                objRtn.A2557TFOP = rs01.getString("A2557TFOP");
                objRtn.A2557TTARJ = rs01.getString("A2557TTARJ");
                objRtn.A2557NREF = rs01.getString("A2557NREF");
                objRtn.A2557CLAS1 = rs01.getString("A2557CLAS1");
                objRtn.A2557CLAS2 = rs01.getString("A2557CLAS2");
                objRtn.A2557CLAS3 = rs01.getString("A2557CLAS3");
                objRtn.A2557CLAS4 = rs01.getString("A2557CLAS4");
                objRtn.A2557FBAS1 = rs01.getString("A2557FBAS1");
                objRtn.A2557FBAS2 = rs01.getString("A2557FBAS2");
                objRtn.A2557FBAS3 = rs01.getString("A2557FBAS3");
                objRtn.A2557FBAS4 = rs01.getString("A2557FBAS4");
                objRtn.ITINERARIO = rs01.getString("ITINERARIO");
                objRtn.A2557PVTA = rs01.getString("A2557PVTA");
                objRtn.A2557AGTE = rs01.getString("A2557AGTE");
                objRtn.A2557ARPI = rs01.getString("A2557ARPI");
                objRtn.A2557PAX = rs01.getString("A2557PAX");
                objRtn.A2557TPAX = rs01.getString("A2557TPAX");
                objRtn.A2557PNR = rs01.getString("A2557PNR");
                objRtn.A2557ESTPD = rs01.getString("A2557ESTPD");
                objRtn.A2557CIA2 = rs01.getString("A2557CIA2");
                objRtn.A2557FRMA2 = rs01.getString("A2557FRMA2");
                objRtn.A2557SRIE2 = rs01.getString("A2557SRIE2");
                objRtn.A2557FVTA2 = rs01.getString("A2557FVTA2");
                objRtn.A2557COMI2 = rs01.getDouble("A2557COMI2");
                objRtn.A2557SMCO2 = rs01.getString("A2557SMCO2");
                objRtn.A2557TSCM2 = rs01.getDouble("A2557TSCM2");
                objRtn.A2557MCOM = rs01.getString("A2557MCOM");
                objRtn.A2557TTX2 = rs01.getDouble("A2557TTX2");
                objRtn.ITINERARIORIG = rs01.getString("ITINERARIORIG");
                objRtn.A2557TVTA = rs01.getString("A2557TVTA");
                objRtn.A2557CDIT = rs01.getString("A2557CDIT");
                objRtn.A2557CHEQ = rs01.getString("A2557CHEQ");
                objRtn.A2557FLAG = rs01.getString("A2557FLAG");

                objRtn.A2557CHARG = rs01.getDouble("A2557CHARG");
                objRtn.A2557IVACH = rs01.getDouble("A2557IVACH");
                objRtn.A2557NETO = rs01.getDouble("A2557NETO");

                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public String ProcesarSale(SQP00957Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP00957(?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PAIS", filter.VP_PAIS);
            cs.setString("IN_DATEFROM", filter.VP_DATEFROM);
            cs.setString("IN_DATETO", filter.VP_DATETO);
            cs.setString("IN_CIA", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FORMA", filter.VP_FORMA);
            cs.setString("IN_SERIE", filter.VP_SERIE);
            cs.setString("IN_TYPE", filter.VP_TYPE);
            cs.setString("IN_SEQ", filter.VP_SEQ);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_OPCION", filter.VP_OPCION);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String ProcesarExch1(SQP00964Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP00964(?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PAIS", filter.VP_PAIS);
            cs.setString("IN_DATEFROM", filter.VP_DATEFROM);
            cs.setString("IN_DATETO", filter.VP_DATETO);
            cs.setString("IN_CIA", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FORMA", filter.VP_FORMA);
            cs.setString("IN_SERIE", filter.VP_SERIE);
            cs.setString("IN_TYPE", filter.VP_TYPE);
            cs.setString("IN_SEQ", filter.VP_SEQ);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_OPCION", filter.VP_OPCION);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String ProcesarExch2(SQP00976Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP00976(?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PAIS", filter.VP_PAIS);
            cs.setString("IN_DATEFROM", filter.VP_DATEFROM);
            cs.setString("IN_DATETO", filter.VP_DATETO);
            cs.setString("IN_CIA", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FORMA", filter.VP_FORMA);
            cs.setString("IN_SERIE", filter.VP_SERIE);
            cs.setString("IN_TYPE", filter.VP_TYPE);
            cs.setString("IN_SEQ", filter.VP_SEQ);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_OPCION", filter.VP_OPCION);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String ProcesarTKTATOS(SQP00977Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP00977(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PAIS", filter.VP_PAIS);
            cs.setString("IN_DATEFROM", filter.VP_DATEFROM);
            cs.setString("IN_DATETO", filter.VP_DATETO);
            cs.setString("IN_CIA", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FORMA", filter.VP_FORMA);
            cs.setString("IN_SERIE", filter.VP_SERIE);
            cs.setString("IN_TYPE", filter.VP_TYPE);
            cs.setString("IN_SEQ", filter.VP_SEQ);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_OPCION", filter.VP_OPCION);
            cs.setString("IN_IATA", filter.VP_IATA);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public List<SQP00977Filter> searchTKTATOS(SQP00977Filter filter) throws SQLException, Exception {
        List<SQP00977Filter> lstRtn = new ArrayList<SQP00977Filter>(0);
        SQP00977Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00963(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PAIS);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_FORMA);
            cstmt01.setString(7, filter.VP_SERIE);
            cstmt01.setString(8, filter.VP_TYPE);
            cstmt01.setString(9, filter.VP_SEQ);
            cstmt01.setString(10, filter.VP_OPCION);

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00977Filter();
                objRtn.A2558CCUST = rs01.getString("A2558CCUST");
                objRtn.A2558CIA = rs01.getString("A2558CIA");
                objRtn.A2558FORMA = rs01.getString("A2558FORMA");
                objRtn.A2558SERIE = rs01.getString("A2558SERIE");
                objRtn.A2558FUENT = rs01.getString("A2558FUENT");
                objRtn.A2558SFUEN = rs01.getString("A2558SFUEN");
                objRtn.A2558TRNCU = rs01.getString("A2558TRNCU");
                objRtn.A2558AGTIA = rs01.getString("A2558AGTIA");
                objRtn.A2558AGENT = rs01.getString("A2558AGENT");
                objRtn.A2558FBRI1 = rs01.getString("A2558FBRI1");
                objRtn.A2558FBRI2 = rs01.getString("A2558FBRI2");
                objRtn.A2558FBRI3 = rs01.getString("A2558FBRI3");
                objRtn.A2558FBRI4 = rs01.getString("A2558FBRI4");
                objRtn.A2558CLAS1 = rs01.getString("A2558CLAS1");
                objRtn.A2558CLAS2 = rs01.getString("A2558CLAS2");
                objRtn.A2558CLAS3 = rs01.getString("A2558CLAS3");
                objRtn.A2558CLAS4 = rs01.getString("A2558CLAS4");
                objRtn.A2558FVTA = rs01.getString("A2558FVTA");
                objRtn.A2558CFOP = rs01.getString("A2558CFOP");
                objRtn.A2558TFOP = rs01.getString("A2558TFOP");
                objRtn.A2558TTARJ = rs01.getString("A2558TTARJ");
                objRtn.A2558NREF = rs01.getString("A2558NREF");
                objRtn.A2558PAX = rs01.getString("A2558PAX");
                objRtn.A2558TPAX = rs01.getString("A2558TPAX");
                objRtn.A2558CDIT = rs01.getString("A2558CDIT");
                objRtn.A2558PVTA = rs01.getString("A2558PVTA");
                objRtn.A2558ARPI = rs01.getString("A2558ARPI");
                objRtn.A2558MDA = rs01.getString("A2558MDA");
                objRtn.A2558TRIFA = rs01.getDouble("A2558TRIFA");
                objRtn.A2558TTCOM = rs01.getDouble("A2558TTCOM");
                objRtn.A2558TTAX = rs01.getDouble("A2558TTAX");
                objRtn.A2558NLOTE = rs01.getString("A2558NLOTE");
                objRtn.A2558TVTA = rs01.getString("A2558TVTA");
                objRtn.A2558FLAG = rs01.getString("A2558FLAG");
                objRtn.A2558CHEQ = rs01.getString("A2558CHEQ");
                objRtn.A2558PNR = rs01.getString("A2558PNR");
                objRtn.A2558TDOC = rs01.getString("A2558TDOC");
                objRtn.A2558ADC = rs01.getDouble("A2558ADC");
                objRtn.A2558NSEQ = rs01.getString("A2558NSEQ");
                objRtn.A2558REGIS = rs01.getString("A2558REGIS");
                objRtn.A2558FREGI = rs01.getString("A2558FREGI");
                objRtn.A2558HREGI = rs01.getString("A2558HREGI");
                objRtn.ITINERARIO = rs01.getString("ITINERARIO");

                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public String ProcesarTKTIATAS(A2728Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP01044(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PAIS", filter.VP_PAIS);
            cs.setString("IN_DATEFROM", filter.VP_DATEFROM);
            cs.setString("IN_DATETO", filter.VP_DATETO);
            cs.setString("IN_CIA", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FORMA", filter.VP_FORMA);
            cs.setString("IN_SERIE", filter.VP_SERIE);
            cs.setString("IN_TYPE", filter.VP_TYPE);
            cs.setString("IN_SEQ", filter.VP_SEQ);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_OPCION", filter.VP_OPCION);
            cs.setString("IN_IATA", filter.VP_IATA);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public List<A2728Filter> searchTKTIATAS(A2728Filter filter) throws SQLException, Exception {
        List<A2728Filter> lstRtn = new ArrayList<A2728Filter>(0);
        A2728Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00963(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PAIS);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_FORMA);
            cstmt01.setString(7, filter.VP_SERIE);
            cstmt01.setString(8, filter.VP_TYPE);
            cstmt01.setString(9, filter.VP_SEQ);
            cstmt01.setString(10, filter.VP_OPCION);

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2728Filter();
                objRtn.A2728TRNCU = rs01.getString("A2728TRNCU");
                objRtn.A2728FUENT = rs01.getString("A2728FUENT");
                objRtn.A2728SFUEN = rs01.getString("A2728SFUEN");
                objRtn.A2728AGTIA = rs01.getString("A2728AGTIA");
                objRtn.A2728AGENT = rs01.getString("A2728AGENT");
                objRtn.A2728CIA = rs01.getString("A2728CIA");
                objRtn.A2728FORMA = rs01.getString("A2728FORMA");
                objRtn.A2728SERIE = rs01.getString("A2728SERIE");
                objRtn.A2728FBAS1 = rs01.getString("A2728FBAS1");
                objRtn.A2728FBAS2 = rs01.getString("A2728FBAS2");
                objRtn.A2728FBAS3 = rs01.getString("A2728FBAS3");
                objRtn.A2728FBAS4 = rs01.getString("A2728FBAS4");
                objRtn.A2728TFOP = rs01.getString("A2728TFOP");
                objRtn.A2728TTARJ = rs01.getString("A2728TTARJ");
                objRtn.A2728NREF = rs01.getString("A2728NREF");
                objRtn.A2728PAX = rs01.getString("A2728PAX");
                objRtn.A2728TPAX = rs01.getString("A2728TPAX");
                objRtn.A2728CDIT = rs01.getString("A2728CDIT");
                objRtn.A2728FVTA = rs01.getString("A2728FVTA");
                objRtn.A2728PVTA = rs01.getString("A2728PVTA");
                objRtn.A2728ARPI = rs01.getString("A2728ARPI");
                objRtn.A2728FRCA = rs01.getString("A2728FRCA");
                objRtn.A2728CFOP = rs01.getString("A2728CFOP");
                objRtn.A2728PNR = rs01.getString("A2728PNR");
                objRtn.A2728AGTE = rs01.getString("A2728AGTE");
                objRtn.A2728REST = rs01.getString("A2728REST");
                objRtn.A2728TDOC = rs01.getString("A2728TDOC");
                objRtn.A2728MDA = rs01.getString("A2728MDA");
                objRtn.A2728FARE = rs01.getDouble("A2728FARE");
                objRtn.A2728TTAX = rs01.getDouble("A2728TTAX");
                objRtn.A2728TTCOM = rs01.getDouble("A2728FARE") + rs01.getDouble("A2728TTAX");
                objRtn.A2728ETCU1 = rs01.getString("A2728ETCU1");
                objRtn.A2728ETCU2 = rs01.getString("A2728ETCU2");
                objRtn.A2728ETCU3 = rs01.getString("A2728ETCU3");
                objRtn.A2728ETCU4 = rs01.getString("A2728ETCU4");
                objRtn.A2728TVTA = rs01.getString("A2728TVTA");
                objRtn.A2728FLAG = rs01.getString("A2728FLAG");
                objRtn.A2728CHEQ = rs01.getString("A2728CHEQ");
                objRtn.A2728PNR = rs01.getString("A2728PNR");
                objRtn.A2728ADC = rs01.getDouble("A2728ADC");
                objRtn.A2728NSEQ = rs01.getString("A2728NSEQ");
                objRtn.A2728NLOTE = rs01.getString("A2728NLOTE");
                objRtn.A2728REGIS = rs01.getString("A2728REGIS");
                objRtn.A2728FREGI = rs01.getString("A2728FREGI");
                objRtn.A2728RUTA0 = rs01.getString("ITINERARIO");
                objRtn.A2728NADM = rs01.getString("A2728NADM");

                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public List<SQP01064Filter> searchRefund(SQP00957Filter filter) throws SQLException, Exception {
        List<SQP01064Filter> lstRtn = new ArrayList<SQP01064Filter>(0);
        SQP01064Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01410(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_DATEFROM);
            cstmt01.setString(3, filter.VP_DATETO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01064Filter();

                objRtn.A720AIRLIN = rs01.getString("CCUST");
                objRtn.A720TRNCU = rs01.getString("TRNC");
                objRtn.FUENT = rs01.getString("FUENTRF");
                objRtn.SUBFU = rs01.getString("SUBFURF");
                objRtn.A720AGENTE = rs01.getString("AGENTRF");
                objRtn.NAGENTE = rs01.getString("NAGENTE");
                objRtn.A720CIA = rs01.getString("CIARF");
                objRtn.A720FORMA = rs01.getString("FORMARF");
                objRtn.A720SERIE = rs01.getString("SERIERF");
                objRtn.A720CIUVTA = rs01.getString("CIUDRF");
                objRtn.A720PAIVTA = rs01.getString("PAIVTA");
                objRtn.FPROC = rs01.getString("FPROCRF");
                objRtn.A720MONEDA = rs01.getString("MDARF");
                objRtn.CUPON1 = rs01.getString("CPN1");
                objRtn.CUPON2 = rs01.getString("CPN2");
                objRtn.CUPON3 = rs01.getString("CPN3");
                objRtn.CUPON4 = rs01.getString("CPN4");
                objRtn.FUENTVTA = rs01.getString("FUENTVTA");
                objRtn.SUBFUVTA = rs01.getString("SUBFUVTA");
                objRtn.AGENTVTA = rs01.getString("AGENTVTA");
                objRtn.NAGENTVTA = rs01.getString("NAGENTVTA");
                objRtn.A720FECVTA = rs01.getString("FECVTA");

                objRtn.A720TDOC = rs01.getString("TDOC");
                objRtn.A720COMMIS = rs01.getDouble("COMMIS");
                objRtn.A720MDACM = rs01.getString("MDACOM");
                objRtn.A720SCM = rs01.getDouble("SCOM");
                objRtn.A720MDACOM = rs01.getString("MDASCOM");

                objRtn.A720LRRCM1 = rs01.getDouble("COMM1");
                objRtn.A720LRRCM2 = rs01.getDouble("COMM2");
                objRtn.A720LRRCM3 = rs01.getDouble("COMM3");
                objRtn.A720LRRCM4 = rs01.getDouble("COMM4");
                objRtn.A720SCM1 = rs01.getDouble("SCOM1");
                objRtn.A720SCM2 = rs01.getDouble("SCOM2");
                objRtn.A720SCM3 = rs01.getDouble("SCOM3");
                objRtn.A720SCM4 = rs01.getDouble("SCOM4");
                objRtn.A720TPTKT = rs01.getString("TKT");

                objRtn.A720PAX = rs01.getString("PAX");
                objRtn.A720DCHEQ = rs01.getString("DCHEQ");
                objRtn.TOCA1 = rs01.getDouble("TOCA1");
                objRtn.TOCA2 = rs01.getDouble("TOCA2");
                objRtn.TOCA3 = rs01.getDouble("TOCA3");
                objRtn.TOCA4 = rs01.getDouble("TOCA4");
                objRtn.CARGO = rs01.getDouble("CARGO");
                objRtn.IVA = rs01.getDouble("IVA");
                objRtn.NETO = rs01.getDouble("NETO");
                objRtn.NLOTE = rs01.getString("NLOTE");
                objRtn.TOTREGIS = rs01.getInt("TOTREGIS");

                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public List<SQP01064Filter> ProcesarRefund(SQP00957Filter filter) throws SQLException, Exception {
        List<SQP01064Filter> lstRtn = new ArrayList<SQP01064Filter>(0);
        SQP01064Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01409(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_DATEFROM);
            cstmt01.setString(3, filter.VP_DATETO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                if (!rs01.getString("VMESSAGE").equals("")) {
                    objRtn = new SQP01064Filter();
                    objRtn.VL_MENSAJE = rs01.getString("VMESSAGE");
                    lstRtn.add(objRtn);
                } else {
                    objRtn = new SQP01064Filter();

                    objRtn.A720AIRLIN = rs01.getString("CCUST");
                    objRtn.A720TRNCU = rs01.getString("TRNC");
                    objRtn.FUENT = rs01.getString("FUENTRF");
                    objRtn.SUBFU = rs01.getString("SUBFURF");
                    objRtn.A720AGENTE = rs01.getString("AGENTRF");
                    objRtn.NAGENTE = rs01.getString("NAGENTE");
                    objRtn.A720CIA = rs01.getString("CIARF");
                    objRtn.A720FORMA = rs01.getString("FORMARF");
                    objRtn.A720SERIE = rs01.getString("SERIERF");
                    objRtn.A720CIUVTA = rs01.getString("CIUDRF");
                    objRtn.A720PAIVTA = rs01.getString("PAIVTA");
                    objRtn.FPROC = rs01.getString("FPROCRF");
                    objRtn.A720MONEDA = rs01.getString("MDARF");
                    objRtn.CUPON1 = rs01.getString("CPN1");
                    objRtn.CUPON2 = rs01.getString("CPN2");
                    objRtn.CUPON3 = rs01.getString("CPN3");
                    objRtn.CUPON4 = rs01.getString("CPN4");
                    objRtn.FUENTVTA = rs01.getString("FUENTVTA");
                    objRtn.SUBFUVTA = rs01.getString("SUBFUVTA");
                    objRtn.AGENTVTA = rs01.getString("AGENTVTA");
                    objRtn.NAGENTVTA = rs01.getString("NAGENTVTA");
                    objRtn.A720FECVTA = rs01.getString("FECVTA");

                    objRtn.A720TDOC = rs01.getString("TDOC");
                    objRtn.A720COMMIS = rs01.getDouble("COMMIS");
                    objRtn.A720MDACM = rs01.getString("MDACOM");
                    objRtn.A720SCM = rs01.getDouble("SCOM");
                    objRtn.A720MDACOM = rs01.getString("MDASCOM");

                    objRtn.A720LRRCM1 = rs01.getDouble("COMM1");
                    objRtn.A720LRRCM2 = rs01.getDouble("COMM2");
                    objRtn.A720LRRCM3 = rs01.getDouble("COMM3");
                    objRtn.A720LRRCM4 = rs01.getDouble("COMM4");
                    objRtn.A720SCM1 = rs01.getDouble("SCOM1");
                    objRtn.A720SCM2 = rs01.getDouble("SCOM2");
                    objRtn.A720SCM3 = rs01.getDouble("SCOM3");
                    objRtn.A720SCM4 = rs01.getDouble("SCOM4");

                    objRtn.A720PAX = rs01.getString("PAX");
                    objRtn.A720DCHEQ = rs01.getString("DCHEQ");
                    objRtn.TOCA1 = rs01.getDouble("TOCA1");
                    objRtn.TOCA2 = rs01.getDouble("TOCA2");
                    objRtn.TOCA3 = rs01.getDouble("TOCA3");
                    objRtn.TOCA4 = rs01.getDouble("TOCA4");
                    objRtn.CARGO = rs01.getDouble("CARGO");
                    objRtn.IVA = rs01.getDouble("IVA");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.A720TPTKT = rs01.getString("TKT");
                    objRtn.NLOTE = rs01.getString("NLOTE");

                    objRtn.TOTREGIS = rs01.getInt("TOTREGIS");
                    lstRtn.add(objRtn);
                }

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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
